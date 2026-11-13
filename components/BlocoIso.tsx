"use client";
import { MotionValue, motion, useMotionValue, useTransform } from "framer-motion";
import { fmt } from "@/lib/dados";

type Props = { dim: [number, number, number]; cel: [number, number]; prof?: MotionValue<number>; cotas?: boolean };

// Desenho técnico do bloco em perspectiva. `prof` (0 a 1) é o quanto do comprimento já "saiu": a rolagem puxa o bloco.
export default function BlocoIso({ dim, cel, prof, cotas = true }: Props) {
  const [w, h, l] = dim;
  const fixo = useMotionValue(1);
  const p = prof ?? fixo;
  const s = Math.min(300 / (w + 0.433 * l), 230 / (h + 0.25 * l));
  const W = w * s, H = h * s, DX = l * 0.433 * s, DY = l * 0.25 * s;
  const x0 = 76, y0 = DY + 34;
  const vw = x0 + W + DX + 96, vh = y0 + H + 84;

  const topo = useTransform(p, (v) => `${x0},${y0} ${x0 + W},${y0} ${x0 + W + DX * v},${y0 - DY * v} ${x0 + DX * v},${y0 - DY * v}`);
  const lado = useTransform(p, (v) => `${x0 + W},${y0} ${x0 + W + DX * v},${y0 - DY * v} ${x0 + W + DX * v},${y0 + H - DY * v} ${x0 + W},${y0 + H}`);
  const lx2 = useTransform(p, (v) => x0 + W + DX * v + 12);
  const ly2 = useTransform(p, (v) => y0 + H - DY * v + 16);
  const opL = useTransform(p, [0.92, 1], [0, 1]);

  const [cols, rows] = cel;
  const m = 0.9 * s, t = 0.7 * s;
  const hw = (W - 2 * m - (cols - 1) * t) / cols, hh = (H - 2 * m - (rows - 1) * t) / rows;
  const furos = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      furos.push(<rect key={`${r}${c}`} x={x0 + m + c * (hw + t)} y={y0 + m + r * (hh + t)} width={hw} height={hh} rx={1.5} fill="#15181A" fillOpacity={0.8} />);

  const yw = y0 + H + 24, xh = x0 - 24;
  const tx = { fontFamily: "var(--font-mono), monospace", fontSize: 15, fill: "currentColor", stroke: "none" } as const;

  return (
    <svg className="iso" viewBox={`0 0 ${vw} ${vh}`} role="img" aria-label={`Desenho esquemático do bloco ${fmt(w)} por ${h} por ${l} centímetros`}>
      <g stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
        <motion.polygon points={topo} fill="var(--brasa2)" />
        <motion.polygon points={lado} fill="var(--brasaD)" />
        <rect x={x0} y={y0} width={W} height={H} fill="var(--brasa)" />
        <g stroke="none">{furos}</g>
      </g>
      {cotas && (
        <g stroke="currentColor" strokeWidth={1.2} fill="none">
          <path d={`M${x0} ${yw}H${x0 + W}M${x0} ${yw - 6}V${yw + 6}M${x0 + W} ${yw - 6}V${yw + 6}`} />
          <text x={x0 + W / 2} y={yw + 22} textAnchor="middle" style={tx}>{fmt(w)}</text>
          <path d={`M${xh} ${y0}V${y0 + H}M${xh - 6} ${y0}H${xh + 6}M${xh - 6} ${y0 + H}H${xh + 6}`} />
          <text x={xh - 10} y={y0 + H / 2 + 5} textAnchor="end" style={tx}>{h}</text>
          <motion.line x1={x0 + W + 12} y1={y0 + H + 16} x2={lx2} y2={ly2} />
          <motion.text x={lx2} y={ly2} dx={10} dy={5} style={{ ...tx, opacity: opL }}>{l}</motion.text>
        </g>
      )}
    </svg>
  );
}
