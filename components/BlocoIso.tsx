"use client";
import { useEffect } from "react";
import { MotionValue, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { fmt } from "@/lib/dados";

// furo "v" = vertical (blocos estruturais e de furo vertical: os furos aparecem na face de cima)
// furo "h" = horizontal (vedação comum: os furos atravessam o comprimento e aparecem na face da ponta)
// forma "u" = canaleta (perfil em U, sem furos); "j" = canaleta J (uma das paredes é baixa: `baixa` cm)
export type Forma = "bloco" | "u" | "j";
type Props = {
  dim: [number, number, number]; cel: [number, number]; furo?: "v" | "h";
  forma?: Forma; baixa?: number;
  prof?: MotionValue<number>; cotas?: boolean;
  // animado: quando `ativo` vira true, o desenho se monta: face da frente com as cotas, a peça sai em
  // profundidade e a cota do comprimento entra no fim
  ativo?: boolean;
};

// Desenho técnico da peça em perspectiva, com as cotas em centímetros.
export default function BlocoIso({ dim, cel, furo = "h", forma = "bloco", baixa = 7, prof, cotas = true, ativo }: Props) {
  const [w, h, l] = dim;
  const reduz = useReducedMotion();
  const animado = ativo !== undefined;
  const interno = useMotionValue(animado && !reduz ? 0 : 1);
  useEffect(() => {
    if (!animado) return;
    if (reduz) { interno.set(1); return; }
    if (!ativo) { interno.set(0); return; }
    const c = animate(interno, 1, { duration: 0.9, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] });
    return () => c.stop();
  }, [ativo, animado, reduz, interno]);
  const p = prof ?? interno;

  const s = Math.min(300 / (w + 0.433 * l), 230 / (h + 0.25 * l));
  const W = w * s, H = h * s, DX = l * 0.433 * s, DY = l * 0.25 * s;
  const x0 = forma === "j" ? 112 : 76, y0 = DY + 34;
  const vw = x0 + W + DX + 96, vh = y0 + H + 84;
  // desloca um ponto da face da frente para o fundo, conforme a profundidade v (0 a 1)
  const fundo = (x: number, y: number, v: number) => `${x + DX * v},${y - DY * v}`;
  const quad = (x1: number, y1: number, x2: number, y2: number) => (v: number) =>
    `${x1},${y1} ${x2},${y2} ${fundo(x2, y2, v)} ${fundo(x1, y1, v)}`;

  const lado = useTransform(p, quad(x0 + W, y0, x0 + W, y0 + H));
  const lx2 = useTransform(p, (v) => x0 + W + DX * v + 12);
  const ly2 = useTransform(p, (v) => y0 + H - DY * v + 16);
  const opL = useTransform(p, [0.92, 1], [0, 1]);
  const opF = useTransform(p, (v) => (animado ? Math.min(1, v * 4) : 1)); // cotas da frente entram primeiro

  const m = 0.9 * s, t = 0.7 * s;
  const canal = forma !== "bloco";
  // canaleta: paredes de ~2 cm e fundo de ~2,5 cm
  const tw = Math.min(2 * s, W * 0.22), tb = Math.min(2.5 * s, H * 0.35);
  const yl = forma === "j" ? y0 + H - Math.min(baixa, h) * s : y0; // topo da parede esquerda (baixa na J)
  const yf = y0 + H - tb; // altura do fundo da canaleta

  const topo = useTransform(p, quad(x0, y0, x0 + W, y0));
  const topoEsq = useTransform(p, quad(x0, yl, x0 + tw, yl));
  const topoDir = useTransform(p, quad(x0 + W - tw, y0, x0 + W, y0));
  const piso = useTransform(p, quad(x0 + tw, yf, x0 + W - tw, yf));
  const faceInt = useTransform(p, quad(x0 + tw, yl, x0 + tw, yf)); // lado de dentro da parede esquerda

  // furo horizontal: grade de furos na face da ponta (largura × altura)
  const furosH = [];
  if (!canal && furo === "h") {
    const [cols, rows] = cel;
    const hw = (W - 2 * m - (cols - 1) * t) / cols, hh = (H - 2 * m - (rows - 1) * t) / rows;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        furosH.push(<rect key={`${r}${c}`} x={x0 + m + c * (hw + t)} y={y0 + m + r * (hh + t)} width={hw} height={hh} rx={1.5} fill="#15181A" fillOpacity={0.8} />);
  }
  // furo vertical: células grandes ao longo do comprimento, desenhadas sobre a face de cima
  const nCel = l >= 34 ? 3 : 2;
  const pa = 2.2 / w;
  const pb = 2.2 / l, sep = 2.6 / l;
  const celula = (i: number) => {
    const b1 = pb + i * ((1 - 2 * pb + sep) / nCel), b2 = b1 + (1 - 2 * pb + sep) / nCel - sep;
    return (v: number) => {
      const pt = (a: number, b: number) => `${x0 + a * W + b * DX * v},${y0 - b * DY * v}`;
      return [pt(pa, b1), pt(1 - pa, b1), pt(1 - pa, b2), pt(pa, b2)].join(" ");
    };
  };
  const furosV = !canal && furo === "v" ? Array.from({ length: nCel }, (_, i) => celula(i)) : [];

  // perfil da frente: retângulo (bloco) ou U/J (canaleta)
  const frente = canal
    ? `M${x0} ${yl}H${x0 + tw}V${yf}H${x0 + W - tw}V${y0}H${x0 + W}V${y0 + H}H${x0}Z`
    : `M${x0} ${y0}H${x0 + W}V${y0 + H}H${x0}Z`;

  const yw = y0 + H + 24, xh = x0 - 24, xb = x0 - 64;
  // cotas legíveis em qualquer tamanho de card: a letra acompanha a largura do desenho
  const tx = { fontFamily: "var(--font-tipo), monospace", fontSize: Math.round(Math.max(17, vw / 20)), fontWeight: 700, fill: "currentColor", stroke: "none" } as const;
  const nome = forma === "bloco" ? "da peça" : "da canaleta";

  return (
    <svg className="iso" viewBox={`0 0 ${vw} ${vh}`} role="img"
      aria-label={`Desenho esquemático ${nome}: ${fmt(w)} por ${fmt(h)} por ${fmt(l)} centímetros${forma === "j" ? `, parede baixa de ${fmt(baixa)}` : ""}`}>
      <g stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
        {canal ? (
          <>
            <motion.polygon points={piso} fill="var(--brasa2)" />
            <motion.polygon points={faceInt} fill="var(--brasaD)" />
            <motion.polygon points={topoEsq} fill="var(--brasa2)" />
            <motion.polygon points={topoDir} fill="var(--brasa2)" />
          </>
        ) : (
          <motion.polygon points={topo} fill="var(--brasa2)" />
        )}
        <motion.polygon points={lado} fill="var(--brasaD)" />
        <path d={frente} fill="var(--brasa)" />
        <g stroke="none">{furosH}</g>
        <g stroke="none">{furosV.map((f, i) => <Celula key={i} p={p} pontos={f} />)}</g>
      </g>
      {cotas && (
        <g stroke="currentColor" strokeWidth={1.2} fill="none">
          <motion.g style={{ opacity: opF }}>
            <path d={`M${x0} ${yw}H${x0 + W}M${x0} ${yw - 6}V${yw + 6}M${x0 + W} ${yw - 6}V${yw + 6}`} />
            <text x={x0 + W / 2} y={yw + 22} textAnchor="middle" style={tx}>{fmt(w)}</text>
            <path d={`M${xh} ${y0}V${y0 + H}M${xh - 6} ${y0}H${xh + 6}M${xh - 6} ${y0 + H}H${xh + 6}`} />
            <text x={xh - 10} y={y0 + H / 2 + 5} textAnchor="end" style={tx}>{fmt(h)}</text>
            {forma === "j" && (
              <>
                <path d={`M${xb} ${yl}V${y0 + H}M${xb - 6} ${yl}H${xb + 6}M${xb - 6} ${y0 + H}H${xb + 6}`} />
                <text x={xb - 10} y={(yl + y0 + H) / 2 + 5} textAnchor="end" style={tx}>{fmt(baixa)}</text>
              </>
            )}
          </motion.g>
          {/* a cota do comprimento só aparece com a peça completa (antes virava um traço solto) */}
          <motion.line x1={x0 + W + 12} y1={y0 + H + 16} x2={lx2} y2={ly2} style={{ opacity: opL }} />
          <motion.text x={lx2} y={ly2} dx={10} dy={5} style={{ ...tx, opacity: opL }}>{fmt(l)}</motion.text>
        </g>
      )}
    </svg>
  );
}

// Uma célula de furo vertical: o polígono segue a profundidade do bloco.
function Celula({ p, pontos }: { p: MotionValue<number>; pontos: (v: number) => string }) {
  const pts = useTransform(p, pontos);
  return <motion.polygon points={pts} fill="#15181A" fillOpacity={0.82} />;
}
