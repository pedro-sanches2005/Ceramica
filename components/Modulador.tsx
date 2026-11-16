"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fmt, itens, modulos, type Modulo } from "@/lib/dados";
import { useOrcamento, type ItemOrc } from "@/lib/orcamento";
import { IcMais } from "./Icone";
import { carregar } from "@/lib/carregar";
import Rola from "./Rola";

const J = 1;  // junta de argamassa, cm
// altura de uma fiada: bloco (19 cm na maioria das linhas, 14 cm na 11,5 × 24) + junta
const alturaFiada = (m: Modulo) => (m.h ?? 19) + J;

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
  const n = Math.max(1, Math.floor((H + J) / alturaFiada(m)));
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

// Comprimento "modulado": as duas fiadas (a que começa com inteiro e a que começa com meio) fecham sem corte.
// Procura o mais próximo abaixo e acima; vale para qualquer linha, inclusive a 11,5 × 24.
const MIN_L = 60, MAX_L = 1000;
const semCorte = (L: number, m: Modulo) => [false, true].every((impar) => !fiada(L, m, impar).some((q) => q.t === "corte"));
function sugestoes(L: number, m: Modulo) {
  if (semCorte(L, m)) return [];
  let baixo = 0, cima = 0;
  for (let v = L - 1; v >= Math.max(MIN_L, m.l); v--) if (semCorte(v, m)) { baixo = v; break; }
  for (let v = L + 1; v <= MAX_L; v++) if (semCorte(v, m)) { cima = v; break; }
  return [baixo, cima].filter(Boolean);
}
// a medida sem corte mais próxima (usada quando a linha chega do catálogo)
function maisProxima(L: number, m: Modulo) {
  if (semCorte(L, m)) return L;
  const s = sugestoes(L, m);
  return s.length ? s.reduce((a, b) => (Math.abs(b - L) < Math.abs(a - L) ? b : a)) : L;
}

// Contagem em casas fixas, como número estampado na carga: só o dígito que mudou troca (e cai).
// Três casas cobrem qualquer parede do simulador (até 10 m × 3,2 m).
function Digitos({ n }: { n: number }) {
  const s = String(Math.min(999, n)).padStart(3, "0");
  return (
    <span className="dig" aria-label={String(n)}>
      {s.split("").map((d, i) => (
        <span key={i} className={n < 10 ** (2 - i) && i < 2 ? "dig-c zero" : "dig-c"} aria-hidden>
          <span key={d} className="dig-d">{d}</span>
        </span>
      ))}
    </span>
  );
}

const m2 = (cm: number) => (cm / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Modulador() {
  const reduz = useReducedMotion();
  // a parede já chega montada; só as fiadas que entram depois (linha ou altura trocada) caem no lugar
  const montado = useRef(false);
  useEffect(() => { montado.current = true; }, []);
  // "Calcular parede com esta linha" no catálogo: troca a linha aqui
  useEffect(() => {
    const ouvir = (e: Event) => {
      const novo = (e as CustomEvent<string>).detail;
      const mod = modulos.find((x) => x.id === novo);
      if (!mod) return;
      setId(novo);
      // arredonda o comprimento para a medida modulada mais próxima dessa linha: a parede fecha sem corte
      setL((atual) => maisProxima(atual, mod));
    };
    window.addEventListener("incargel:linha", ouvir);
    return () => window.removeEventListener("incargel:linha", ouvir);
  }, []);
  const [id, setId] = useState("e1429");
  // começa numa medida modulada (fecha sem corte); o vermelho aparece só quando a pessoa ajusta
  const [L, setL] = useState(344);
  const [H, setH] = useState(260);
  const [cinta, setCinta] = useState(true);
  const m = modulos.find((x) => x.id === id)!;
  const { n, linhas, conta } = useMemo(() => paginar(L, H, m, cinta), [L, H, m, cinta]);
  const sug = sugestoes(L, m);
  const fh = alturaFiada(m), hb = m.h ?? 19;
  const alto = n * fh - J;
  // As peças da parede vão para o mesmo orçamento do catálogo.
  // Adicionar de novo SUBSTITUI a parede anterior (não soma em dobro); o resto do orçamento fica como está.
  const orc = useOrcamento();
  const contribuicao = useRef<{ item: ItemOrc; q: number }[]>([]);
  const [adicionada, setAdicionada] = useState<string | null>(null); // resumo da última parede posta no orçamento
  const chaveParede = `${id}-${L}-${H}-${cinta}`;
  const [chaveAdicionada, setChaveAdicionada] = useState("");
  function addOrcamento() {
    const linha = itens.find((x) => x.id === m.id);
    if (!linha) return;
    const achar = (f: (img: string, nome: string) => boolean) => linha.pecas.find((p) => f(p.img, p.nome));
    const inteiro = linha.pecas[0], meio = achar((_, nome) => nome.startsWith("Meio bloco")), canaleta = achar((img) => img.endsWith("canaleta-u"));
    // peça cortada sai de um bloco: de um meio quando o pedaço cabe nele, senão de um inteiro
    const cortes = linhas.flat().filter((q) => q.t === "corte");
    const corteMeio = meio ? cortes.filter((q) => q.c <= m.meio).length : 0;
    const corteInt = cortes.length - corteMeio;

    // o que esta parede pede, somando por peça
    const pede = new Map<string, { item: ItemOrc; q: number }>();
    const soma = (p: (typeof linha.pecas)[number] | undefined, q: number) => {
      if (!p || q <= 0) return;
      const atual = pede.get(p.img);
      pede.set(p.img, { item: { id: p.img, nome: p.nome, dim: p.dim, linha: linha.linha, img: p.img, qtd: 0 }, q: (atual?.q ?? 0) + q });
    };
    soma(inteiro, conta.int + corteInt);
    soma(meio, conta.meio + corteMeio);
    soma(canaleta, conta.u);

    // Adicionar de novo troca a parede anterior pela nova, sem apagar o que a pessoa mudou à mão:
    // cada peça fica com (quantidade atual + diferença entre parede nova e antiga), e nunca menos do que a parede pede.
    const antes = new Map(contribuicao.current.map((c) => [c.item.id, c]));
    antes.forEach(({ item, q }, idPeca) => { if (!pede.has(idPeca)) orc.definir(item, Math.max(0, orc.qtd(idPeca) - q)); });
    pede.forEach(({ item, q }, idPeca) => { orc.definir(item, Math.max(orc.qtd(idPeca) + q - (antes.get(idPeca)?.q ?? 0), q)); });
    contribuicao.current = [...pede.values()];

    const partes = [
      `${conta.int} ${conta.int === 1 ? "inteiro" : "inteiros"}`,
      conta.meio ? `${conta.meio} ${conta.meio === 1 ? "meio" : "meios"}` : "",
      conta.u ? `${conta.u} ${conta.u === 1 ? "canaleta" : "canaletas"}` : "",
      corteInt ? `+${corteInt} ${corteInt === 1 ? "inteiro" : "inteiros"} para corte` : "",
      corteMeio ? `+${corteMeio} ${corteMeio === 1 ? "meio" : "meios"} para corte` : "",
    ].filter(Boolean);
    setAdicionada(`Parede no orçamento: ${partes.join(", ")}`);
    setChaveAdicionada(chaveParede);
  }
  const nomeInt = `${fmt(m.w)}×${hb}×${m.l}`, nomeMeio = `${fmt(m.w)}×${hb}×${m.meio}`;

  return (
    <section id="paginacao" className="mod">
      <header className="mod-h">
        <h2>Desenhe a parede.<br /><em>A gente conta bloco por bloco.</em></h2>
        <p>Bloco modulado não é estimativa por metro quadrado: dá para saber a quantidade exata de peças, fiada por fiada. Ajuste a parede e veja onde entra cada inteiro, cada meio bloco e se vai sobrar corte.</p>
      </header>

      <div className="mod-in">
        <form className="mod-f" onSubmit={(e) => e.preventDefault()}>
          <label>Linha
            <select value={id} onChange={(e) => setId(e.target.value)}>
              {(["Estrutural", "Vedação"] as const).map((f) => (
                <optgroup key={f} label={f}>
                  {modulos.filter((x) => x.fam === f).map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <label>
            <span className="mod-lv">Comprimento <b>{m2(L)} m</b></span>
            <input type="range" min={60} max={1000} step={1} value={L} onChange={(e) => setL(+e.target.value)} />
          </label>
          <label>
            <span className="mod-lv">Altura <b>{m2(H)} m</b></span>
            <input type="range" min={60} max={320} step={1} value={H} onChange={(e) => setH(+e.target.value)} />
          </label>
          {m.u && (
            <label className="mod-ck">
              <input type="checkbox" checked={cinta} onChange={(e) => setCinta(e.target.checked)} />
              Última fiada em canaleta U (cinta)
            </label>
          )}

          <dl className="mod-c">
            <div><dt><i className="sw int" />Inteiros {nomeInt}</dt><dd><Digitos n={conta.int} /></dd></div>
            <div><dt><i className="sw meio" />Meios {nomeMeio}</dt><dd><Digitos n={conta.meio} /></dd></div>
            {m.u && cinta && <div><dt><i className="sw u" />Canaletas U</dt><dd><Digitos n={conta.u} /></dd></div>}
            <div className={conta.corte ? "ruim" : ""}><dt><i className="sw corte" />Peças cortadas</dt><dd><Digitos n={conta.corte} /></dd></div>
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

          <p className="mod-aviso">Conta para parede corrida, com juntas de 1 cm, sem portas, janelas ou encontros. Para o projeto completo, a equipe Incargel faz a modulação com você.</p>
          <button type="button" className="bt" onClick={(e) => { carregar(e.currentTarget); addOrcamento(); }}><Rola><IcMais size={16} />Adicionar parede ao orçamento</Rola></button>
          {/* confirma o que entrou; some quando a parede muda (aí o botão substitui a anterior) */}
          <p className="mod-ok" role="status">{adicionada && chaveAdicionada === chaveParede ? adicionada : ""}</p>
          <p className="nota-cot">A parede entra no mesmo orçamento do catálogo. Você revisa e envia tudo de uma vez.</p>
        </form>

        <div className="mod-art">
          <svg viewBox={`-6 -6 ${L + 12} ${alto + 22}`} role="img"
            aria-label={`Paginação de uma parede de ${m2(L)} por ${m2(alto)} metros com ${n} fiadas`}>
            <defs>
              <pattern id="hach" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="6" height="6" fill="var(--papel)" /><line x1="0" y1="0" x2="0" y2="6" stroke="var(--corte)" strokeWidth="3" />
              </pattern>
            </defs>
            {linhas.map((f, i) => (
              <motion.g key={`${id}-${i}`}
                initial={reduz || !montado.current ? false : { opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}>
                {f.map((q) => (
                  <rect key={q.x} className={`pc ${q.t}`} x={q.x} y={(n - 1 - i) * fh} width={q.c} height={hb} rx={0.8} />
                ))}
              </motion.g>
            ))}
            <g className="mod-cota mono">
              <path d={`M0 ${alto + 12}H${L}M0 ${alto + 7}V${alto + 17}M${L} ${alto + 7}V${alto + 17}`} />
            </g>
          </svg>
          {/* a cota fica em texto de verdade: legível em qualquer largura (dentro do SVG ela encolhia junto) */}
          <p className="mod-cota-t">{m2(L)} m × {m2(alto)} m · {n} fiadas</p>
        </div>
      </div>
    </section>
  );
}
