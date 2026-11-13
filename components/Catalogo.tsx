"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlocoIso from "./BlocoIso";
import Familia from "./Familia";
import { fmt, fotoPeca, itens, totalPecas, wa, type Item } from "@/lib/dados";

type Fam = "Estrutural" | "Vedação";

function Card({ it, n, onFamilia }: { it: Item; n: number; onFamilia: (it: Item) => void }) {
  const [virado, setVirado] = useState(false);
  const nome = `${fmt(it.dim[0])} × ${it.dim[1]} × ${it.dim[2]}`;
  const tipo = it.fam === "Estrutural" ? "estrutural" : "de vedação";
  const cotar = wa(`Olá! Vim pelo site da Incargel e gostaria de uma cotação do bloco ${tipo} ${nome} cm (linha ${it.linha}).`);
  const extras = it.pecas.slice(1);

  return (
    <motion.article className={`card${virado ? " virado" : ""}`}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: n * 0.06, ease: [0.2, 0.8, 0.2, 1] }}>
      <div className="card-in">
        {/* frente: o bloco */}
        <div className="face frente" inert={virado}>
          <header className="card-t mono"><b>{String(n + 1).padStart(2, "0")}</b><span>Linha {it.linha}</span></header>
          <div className="card-foto">
            <img src={fotoPeca(it.pecas[0].img)} alt={`Bloco ${tipo} ${nome} cm da Incargel`} loading="lazy" decoding="async" />
          </div>
          <h3 className="mono">{nome}<small>cm</small></h3>
          <p className="card-k mono">{it.specs.slice(0, 2).map(([, v]) => v).join(" · ")}</p>
          {/* miniaturas da família: um convite para abrir a ficha completa */}
          <button type="button" className="card-fam" onClick={() => onFamilia(it)} aria-label={`Ver a família completa da linha ${it.linha}, ${it.pecas.length} peças`}>
            <span className="card-mini" aria-hidden>
              {extras.slice(0, 4).map((p) => <img key={p.img} src={fotoPeca(p.img)} alt="" loading="lazy" />)}
            </span>
            <span className="mono">+{extras.length} peças da linha</span>
            <i aria-hidden>→</i>
          </button>
          <div className="card-a">
            <button type="button" className="bt bt-sm" onClick={() => setVirado(true)} aria-label={`Ver medidas do bloco ${nome}`}>Ver medidas</button>
            <a className="card-z mono" href={cotar} target="_blank" rel="noopener noreferrer">Cotar ↗</a>
          </div>
        </div>

        {/* verso: desenho técnico com as cotas */}
        <div className="face verso" inert={!virado}>
          <header className="card-t mono"><b>{String(n + 1).padStart(2, "0")}</b><span>Medidas em cm</span></header>
          <div className="card-iso"><BlocoIso dim={it.dim} cel={it.cel} /></div>
          <dl className="card-s mono">
            {it.specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
          <div className="card-a">
            <button type="button" className="bt bt-sm ln" onClick={() => setVirado(false)}>← Ver bloco</button>
            <button type="button" className="card-z mono" onClick={() => onFamilia(it)}>Família ({it.pecas.length}) →</button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Catalogo() {
  const [fam, setFam] = useState<Fam>("Estrutural");
  const [aberta, setAberta] = useState<Item | null>(null);
  const fechar = useCallback(() => setAberta(null), []);
  const lista = itens.filter((i) => i.fam === fam);
  const trilho = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [mexeu, setMexeu] = useState(false);

  // qual card está no centro do carrossel
  function rolou() {
    const el = trilho.current; if (!el) return;
    const filhos = Array.from(el.children) as HTMLElement[];
    if (!filhos.length) return;
    const meio = el.scrollLeft + el.clientWidth / 2;
    let melhor = 0, dist = Infinity;
    filhos.forEach((f, i) => { const d = Math.abs(f.offsetLeft + f.offsetWidth / 2 - meio); if (d < dist) { dist = d; melhor = i; } });
    setIdx(melhor);
    if (el.scrollLeft > 20) setMexeu(true);
  }
  function ir(i: number) {
    const el = trilho.current; const f = el?.children[i] as HTMLElement | undefined;
    if (el && f) el.scrollTo({ left: f.offsetLeft - (el.clientWidth - f.offsetWidth) / 2, behavior: "smooth" });
  }
  useEffect(() => { trilho.current?.scrollTo({ left: 0 }); setIdx(0); }, [fam]);

  return (
    <section id="blocos" className="cat">
      <header className="cat-h">
        <div>
          <span className="kick mono">Catálogo técnico · {totalPecas} peças</span>
          <h2>Escolha o bloco.<br /><em>Veja o que ele entrega.</em></h2>
        </div>
        <div className="seg" role="group" aria-label="Tipo de bloco">
          {(["Estrutural", "Vedação"] as const).map((f) => (
            <button key={f} aria-pressed={fam === f} onClick={() => setFam(f)}>
              {f === "Estrutural" ? "Estruturais" : "Vedação"}
              <small className="mono">{itens.filter((i) => i.fam === f).reduce((s, i) => s + i.pecas.length, 0)}</small>
            </button>
          ))}
        </div>
      </header>

      {/* no celular vira carrossel de arrastar para o lado (scroll-snap); no desktop é grade */}
      <div className="cards" ref={trilho} onScroll={rolou}>
        <AnimatePresence mode="popLayout">
          {lista.map((it, n) => <Card key={it.id} it={it} n={n} onFamilia={setAberta} />)}
        </AnimatePresence>
      </div>
      <div className="cards-nav" aria-hidden>
        <span className="mono"><b>{String(idx + 1).padStart(2, "0")}</b> / {String(lista.length).padStart(2, "0")}</span>
        <span className="cards-dots">
          {lista.map((it, i) => <i key={it.id} className={i === idx ? "on" : ""} onClick={() => ir(i)} />)}
        </span>
        <span className={`cards-dica mono${mexeu ? " some" : ""}`}>Arraste <i>→</i></span>
      </div>
      <p className="aviso mono">Imagens e dados da apresentação institucional da Incargel.</p>

      <AnimatePresence>{aberta && <Familia key={aberta.id} it={aberta} onClose={fechar} />}</AnimatePresence>
    </section>
  );
}
