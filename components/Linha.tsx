"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import GuiaRolagem from "./GuiaRolagem";
import { useCelular } from "@/lib/useCelular";

const est = [
  { n: "01", t: "Matéria-prima", f: "aerea.jpg", a: "Vista aérea da fábrica da Incargel em Itu, com a jazida ao fundo",
    d: "Jazidas de matérias-primas de altíssima qualidade. O bloco cerâmico nasce de elementos da natureza e não usa aditivos insalubres." },
  { n: "02", t: "Linha automatizada", f: "robo.jpg", a: "Robô industrial empilhando blocos cerâmicos na linha de produção",
    d: "Produção totalmente automatizada, com tecnologia europeia, e robôs que aumentam a produtividade e a qualidade." },
  { n: "03", t: "Forno túnel", f: "forno.jpg", a: "Vagoneta carregada de blocos na entrada do forno túnel",
    d: "Forno de última geração com domínio total da temperatura: queima uniforme, padrão dimensional e resistência. A energia vem de sobras da indústria moveleira (serragem)." },
  { n: "04", t: "Laboratório e normas", f: "controle.jpg", a: "Painel de controle da linha de produção ao lado dos blocos",
    d: "Laboratório altamente equipado e produtos conforme ABNT NBR 15270 e 15575. Certificada pelo PSQ, o Programa Setorial da Qualidade." },
  { n: "05", t: "Entrega na obra", f: "blocos.jpg", a: "Pilhas de blocos cerâmicos prontos para a expedição",
    d: "Pronta entrega e atendimento em todo o Estado de São Paulo, com frete sob consulta. A equipe visita a sua obra." },
];
const recorte = (f: string) => (f === "aerea.jpg" ? " recorte" : "");

// Desktop: a rolagem vertical empurra o trilho para o lado.
function LinhaDesktop({ ativo }: { ativo: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // mola leve: o trilho persegue a rolagem em vez de pular junto com cada "tique" da roda do mouse
  const sp = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35, restDelta: 0.0005 });
  const x = useTransform(sp, (v) => `translate3d(${-v * (est.length - 1) * 100}vw,0,0)`);
  const pos = useTransform(sp, [0, 1], ["0%", "100%"]);
  return (
    <div ref={ref} className="linha-wrap">
      <section className="linha claro">
        <header className="linha-h">
          <span className="kick mono">Processo · Itu/SP</span>
          <h2>Do barro à obra</h2>
        </header>
        <motion.div className="trilha" style={ativo ? { transform: x } : undefined}>
          {est.map((e) => (
            <article key={e.n} className="painel">
              <div className="painel-txt">
                <b className="num mono">{e.n}</b>
                <h3>{e.t}</h3>
                <p>{e.d}</p>
              </div>
              <figure className={`foto${recorte(e.f)}`}>
                <img src={`/fabrica/${e.f}`} alt={e.a} width={615} height={410} decoding="async" />
              </figure>
            </article>
          ))}
        </motion.div>
        <div className="rail" aria-hidden>
          {est.map((e, i) => <i key={e.n} style={{ left: `${(i / (est.length - 1)) * 100}%` }} />)}
          <motion.span className="peca" style={{ left: pos }} />
        </div>
        {ativo && <GuiaRolagem p={sp} texto="Role para avançar" passos={est.length} />}
      </section>
    </div>
  );
}

// Celular: carrossel de etapas no estilo "stories". Quem manda é o dedo (scroll-snap nativo);
// a etapa ativa ganha destaque: a foto assenta, o número sobe e o texto entra.
function LinhaCelular() {
  const trilho = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  function rolou() {
    const el = trilho.current; if (!el) return;
    const meio = el.scrollLeft + el.clientWidth / 2;
    let m = 0, d = Infinity;
    Array.from(el.children).forEach((c, i) => { const f = c as HTMLElement; const x = Math.abs(f.offsetLeft + f.offsetWidth / 2 - meio); if (x < d) { d = x; m = i; } });
    setIdx(m);
  }
  function ir(i: number) {
    const el = trilho.current; const f = el?.children[Math.max(0, Math.min(est.length - 1, i))] as HTMLElement | undefined;
    if (el && f) el.scrollTo({ left: f.offsetLeft - (el.clientWidth - f.offsetWidth) / 2, behavior: "smooth" });
  }

  return (
    <section className="lc claro">
      <header className="lc-h">
        <span className="kick mono">Processo · Itu/SP</span>
        <h2>Do barro à obra</h2>
      </header>

      <div className="lc-seg" role="tablist" aria-label="Etapas do processo">
        {est.map((e, i) => (
          <button key={e.n} type="button" role="tab" aria-selected={i === idx} aria-label={`Etapa ${e.n}: ${e.t}`}
            className={i < idx ? "feito" : i === idx ? "on" : ""} onClick={() => ir(i)}>
            <i />
          </button>
        ))}
      </div>

      <div className="lc-trilho" ref={trilho} onScroll={rolou}>
        {est.map((e, i) => (
          <article key={e.n} className={`lc-card${i === idx ? " on" : ""}`} aria-hidden={i !== idx}>
            <figure className={`lc-foto${recorte(e.f)}`}>
              <img src={`/fabrica/${e.f}`} alt={e.a} width={615} height={410} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              <b className="mono">{e.n}</b>
            </figure>
            <div className="lc-txt">
              <h3>{e.t}</h3>
              <p>{e.d}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="lc-nav">
        <button type="button" onClick={() => ir(idx - 1)} disabled={idx === 0} aria-label="Etapa anterior">←</button>
        <span className="mono"><b>{est[idx].n}</b> / {String(est.length).padStart(2, "0")} · {est[idx].t}</span>
        <button type="button" onClick={() => ir(idx + 1)} disabled={idx === est.length - 1} aria-label="Próxima etapa">→</button>
      </div>
    </section>
  );
}

export default function Linha() {
  const cel = useCelular();
  // As duas versões vão no HTML; o CSS mostra uma por tamanho de tela (sem "pulo" ao carregar).
  return (
    <div id="processo">
      <LinhaDesktop ativo={!cel} />
      <LinhaCelular />
    </div>
  );
}
