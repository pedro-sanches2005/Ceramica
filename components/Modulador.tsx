"use client";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fmt, modulos, wa, type Modulo } from "@/lib/dados";

const J = 1;  // junta de argamassa, cm
const FH = 20; // altura de uma fiada: bloco de 19 cm + junta

type Peca = { x: number; c: number; t: "int" | "meio" | "corte" | "u" };
type Fiada = Peca[];

// Monta uma fiada: as ímpares começam com meio bloco para desencontrar as juntas (amarração).
function fiada(L: number, m: Modulo, impar: boolean): Fiada {
  const M = m.l + J;
  const p: Fiada = [];
  let x = 0;
  if (impar && m.meio <= L) { p.push({ x, c: m.meio, t: "meio" }); x += m.meio + J; }
  while (x + m.l <= L) { p.push({ x, c: m.l, t: "int" }); x += M; }
  if (x + m.meio <= L) { p.push({ x, c: m.meio, t: "meio" }); x += m.meio + J; }
  const r = L - x;
  if (r >= 1) p.push({ x, c: r, t: "corte" });
  return p;
}

function paginar(L: number, H: number, m: Modulo, cinta: boolean) {
  const n = Math.max(1, Math.floor((H + J) / FH));
  const linhas: Fiada[] = [];
  for (let i = 0; i < n; i++) {
    let f = fiada(L, m, i % 2 === 1);
    if (cinta && m.u && i === n - 1) f = f.map((q) => (q.t === "int" ? { ...q, t: "u" } : q));
    linhas.push(f);
  }
  const conta = { int: 0, meio: 0, corte: 0, u: 0 };
  linhas.flat().forEach((q) => conta[q.t]++);
  return { n, linhas, conta };
}

// Comprimentos "modulados" (múltiplos do meio módulo, menos uma junta) não pedem nenhum corte.
function sugestoes(L: number, m: Modulo) {
  const passo = m.meio + J;
  const k = (L + J) / passo;
  const baixo = Math.floor(k) * passo - J, cima = Math.ceil(k) * passo - J;
  return baixo === cima ? [] : [baixo, cima].filter((v) => v >= m.l);
}

const m2 = (cm: number) => (cm / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Modulador() {
  const reduz = useReducedMotion();
  const [id, setId] = useState("e1429");
  const [L, setL] = useState(340);
  const [H, setH] = useState(260);
  const [cinta, setCinta] = useState(true);
  const m = modulos.find((x) => x.id === id)!;
  const { n, linhas, conta } = useMemo(() => paginar(L, H, m, cinta), [L, H, m, cinta]);
  const sug = sugestoes(L, m);
  const alto = n * FH - J;
  const nomeInt = `${fmt(m.w)}×19×${m.l}`, nomeMeio = `${fmt(m.w)}×19×${m.meio}`;

  const msg =
    `Olá! Fiz a paginação de uma parede no site da Incargel.\n\n` +
    `Linha: ${m.nome}\nParede: ${m2(L)} m × ${m2(alto)} m (${n} fiadas)\n\n` +
    `Blocos inteiros ${nomeInt}: ${conta.int}\nMeios blocos ${nomeMeio}: ${conta.meio}\n` +
    (conta.u ? `Canaletas U: ${conta.u}\n` : "") +
    (conta.corte ? `Peças cortadas: ${conta.corte}\n` : "") +
    `\nPode me passar uma cotação?`;

  return (
    <section id="paginacao" className="mod">
      <header className="mod-h">
        <span className="kick mono">Paginação de parede</span>
        <h2>Desenhe a parede.<br /><em>A gente conta bloco por bloco.</em></h2>
        <p>Bloco modulado não é estimativa por metro quadrado: dá para saber a quantidade exata de peças, fiada por fiada. Ajuste a parede e veja onde entra cada inteiro, cada meio bloco e se vai sobrar corte.</p>
      </header>

      <div className="mod-in">
        <form className="mod-f" onSubmit={(e) => e.preventDefault()}>
          <label className="mono">Linha
            <select value={id} onChange={(e) => setId(e.target.value)}>
              {(["Estrutural", "Vedação"] as const).map((f) => (
                <optgroup key={f} label={f}>
                  {modulos.filter((x) => x.fam === f).map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="mono">
            <span className="mod-lv">Comprimento <b>{m2(L)} m</b></span>
            <input type="range" min={60} max={1000} step={1} value={L} onChange={(e) => setL(+e.target.value)} />
          </label>
          <label className="mono">
            <span className="mod-lv">Altura <b>{m2(H)} m</b></span>
            <input type="range" min={60} max={320} step={1} value={H} onChange={(e) => setH(+e.target.value)} />
          </label>
          {m.u && (
            <label className="mod-ck mono">
              <input type="checkbox" checked={cinta} onChange={(e) => setCinta(e.target.checked)} />
              Última fiada em canaleta U (cinta)
            </label>
          )}

          <dl className="mod-c mono">
            <div><dt><i className="sw int" />Inteiros {nomeInt}</dt><dd>{conta.int}</dd></div>
            <div><dt><i className="sw meio" />Meios {nomeMeio}</dt><dd>{conta.meio}</dd></div>
            {m.u && cinta && <div><dt><i className="sw u" />Canaletas U</dt><dd>{conta.u}</dd></div>}
            <div className={conta.corte ? "ruim" : ""}><dt><i className="sw corte" />Peças cortadas</dt><dd>{conta.corte}</dd></div>
          </dl>

          {sug.length > 0 && conta.corte > 0 ? (
            <p className="mod-dica">
              Com {sug.map((s, i) => (
                <span key={s}>{i > 0 && " ou "}<button type="button" onClick={() => setL(s)}>{m2(s)} m</button></span>
              ))} a parede fecha sem nenhum corte.
            </p>
          ) : (
            <p className="mod-dica ok">Medida modulada: nenhum bloco cortado.</p>
          )}

          <a className="bt" target="_blank" rel="noopener noreferrer" href={wa(msg)}>Cotar esta parede</a>
        </form>

        <div className="mod-art">
          <svg viewBox={`-6 -6 ${L + 12} ${alto + 26 + Math.max(10, L / 36)}`} role="img"
            aria-label={`Paginação de uma parede de ${m2(L)} por ${m2(alto)} metros com ${n} fiadas`}>
            <defs>
              <pattern id="hach" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="6" height="6" fill="var(--g)" /><line x1="0" y1="0" x2="0" y2="6" stroke="#E5484D" strokeWidth="3" />
              </pattern>
            </defs>
            {linhas.map((f, i) => (
              <motion.g key={`${id}-${i}`}
                initial={reduz ? false : { opacity: 0, y: -14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}>
                {f.map((q) => (
                  <rect key={q.x} className={`pc ${q.t}`} x={q.x} y={(n - 1 - i) * FH} width={q.c} height={19} rx={0.8} />
                ))}
              </motion.g>
            ))}
            <g className="mod-cota mono">
              <path d={`M0 ${alto + 12}H${L}M0 ${alto + 7}V${alto + 17}M${L} ${alto + 7}V${alto + 17}`} />
              <text x={L / 2} y={alto + 28} textAnchor="middle" style={{ fontSize: Math.max(10, L / 36) }}>{m2(L)} m · {n} fiadas</text>
            </g>
          </svg>
          <p className="aviso mono">Parede corrida, juntas de 1 cm, sem portas, janelas ou encontros. Para o projeto completo, a equipe Incargel faz a modulação com você.</p>
        </div>
      </div>
    </section>
  );
}
