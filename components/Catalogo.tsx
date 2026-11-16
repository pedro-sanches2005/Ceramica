"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlocoIso from "./BlocoIso";
import Familia from "./Familia";
import Qtd from "./Qtd";
import { Mark, MarkerText } from "./MarkerText";
import { IcSeta } from "./Icone";
import { cargaDe, fmt, fotoPeca, furoDe, itens, totalPecas, type Item } from "@/lib/dados";
import { calcularComLinha } from "@/lib/ir";

type Fam = "Estrutural" | "Vedação";

// Card da linha (versão do main): bloco na frente, desenho técnico no verso, família completa ao lado.
// A quantidade escolhida vai para o orçamento.
function Card({ it, n, onFamilia }: { it: Item; n: number; onFamilia: (it: Item) => void }) {
  const [virado, setVirado] = useState(false);
  const nome = `${fmt(it.dim[0])} × ${it.dim[1]} × ${it.dim[2]}`;
  const tipo = it.fam === "Estrutural" ? "estrutural" : "de vedação";
  const extras = it.pecas.slice(1);
  const principal = it.pecas[0];
  const item = { id: principal.img, nome: principal.nome, dim: principal.dim, linha: it.linha, img: principal.img };

  return (
    <motion.article className={`card${virado ? " virado" : ""}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}>
      <div className="card-in">
        {/* frente: o bloco */}
        <div className="face frente" inert={virado}>
          <header className="card-t"><b className="mono">Linha {it.linha}</b><span>{it.fam}</span></header>
          <div className="card-foto">
            <img src={fotoPeca(principal.img)} alt={`Bloco ${tipo} ${nome} cm da Incargel`} loading="lazy" decoding="async" />
          </div>
          <h3 className="mono">{nome}<small>cm</small></h3>
          <p className="card-k mono">{it.specs.slice(0, 2).map(([, v]) => v).join(" · ")}</p>
          <button type="button" className="card-fam" onClick={() => onFamilia(it)} aria-label={`Ver a família completa da linha ${it.linha}, ${it.pecas.length} peças`}>
            <span className="card-mini" aria-hidden>
              {extras.slice(0, 4).map((p) => <img key={p.img} src={fotoPeca(p.img)} alt="" loading="lazy" />)}
            </span>
            <span className="card-fam-t">+{extras.length} peças da linha</span>
            <IcSeta className="card-fam-s" />
          </button>
          <div className="card-q"><Qtd item={item} carga={cargaDe(principal.specs)} /></div>
          <button type="button" className="card-z" onClick={() => setVirado(true)} aria-label={`Ver medidas do bloco ${nome}`}>Ver medidas</button>
        </div>

        {/* verso: desenho técnico com as cotas */}
        <div className="face verso" inert={!virado}>
          <header className="card-t"><b className="mono">Linha {it.linha}</b><span>Medidas em cm</span></header>
          <div className="card-iso"><BlocoIso dim={it.dim} cel={it.cel} furo={furoDe(it)} ativo={virado} /></div>
          <dl className="card-s">
            {it.specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd className="mono">{v}</dd></div>))}
          </dl>
          <div className="card-a">
            <button type="button" className="bt bt-sm ln" onClick={() => setVirado(false)}><IcSeta dir="esq" />Ver bloco</button>
            <button type="button" className="card-z" onClick={() => onFamilia(it)}>Ver as {it.pecas.length} peças</button>
          </div>
          <button type="button" className="card-calc" onClick={() => calcularComLinha(it.id)}>
            Calcular parede com esta linha <IcSeta size={14} />
          </button>
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

  // qual card está no centro do carrossel (celular)
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
          <MarkerText as="h2">Escolha o <Mark type="circle" color="var(--barro2)">bloco</Mark>.</MarkerText>
          <p className="cat-p">{itens.length} linhas, {totalPecas} peças. <b>Estrutural</b>: a própria parede sustenta a obra. <b>Vedação</b>: a parede fecha os vãos entre vigas e pilares.</p>
        </div>
        <div className="seg" role="group" aria-label="Tipo de bloco">
          {(["Estrutural", "Vedação"] as const).map((f) => (
            <button key={f} aria-pressed={fam === f} onClick={() => setFam(f)}>
              {/* indicador que desliza entre as opções (Swipe Tabs do KokonutUI: mola 420/38) */}
              {fam === f && <motion.span layoutId="seg-ind" className="seg-ind" transition={{ type: "spring", stiffness: 420, damping: 38 }} />}
              <span className="seg-t">{f === "Estrutural" ? "Estruturais" : "Vedação"}
              <small>{itens.filter((i) => i.fam === f).length} linhas</small></span>
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
          {/* atalho para o toque (o arraste continua sendo o caminho principal); fora da ordem do Tab */}
          {lista.map((it, i) => <button type="button" tabIndex={-1} key={it.id} className={i === idx ? "on" : ""} onClick={() => ir(i)} />)}
        </span>
        <span className={`cards-dica${mexeu ? " some" : ""}`}>Arraste <IcSeta size={12} /></span>
      </div>
      <p className="aviso">Imagens e dados da apresentação institucional da Incargel.</p>

      <AnimatePresence>{aberta && <Familia key={aberta.id} it={aberta} onClose={fechar} />}</AnimatePresence>
    </section>
  );
}
