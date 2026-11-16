"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import GuiaRolagem from "./GuiaRolagem";
import { IcSeta } from "./Icone";
import { useCelular } from "@/lib/useCelular";

const est = [
  { n: "01", t: "Matéria-prima", f: "aerea.webp", a: "Vista aérea da fábrica da Incargel em Itu, com a jazida ao fundo",
    d: "Argila das jazidas que se veem atrás da fábrica. O bloco cerâmico nasce de elementos da natureza e não usa aditivos insalubres." },
  { n: "02", t: "Linha automatizada", f: "robo.webp", a: "Robô industrial empilhando blocos cerâmicos na linha de produção",
    d: "Produção totalmente automatizada, com tecnologia europeia, e robôs que aumentam a produtividade e a qualidade." },
  { n: "03", t: "Forno túnel", f: "forno.webp", a: "Vagoneta carregada de blocos na entrada do forno túnel",
    d: "A temperatura é controlada ao longo de toda a queima, o que garante queima uniforme, padrão dimensional e resistência. A energia vem de sobras da indústria moveleira (serragem)." },
  { n: "04", t: "Laboratório e normas", f: "controle.webp", a: "Painel de controle da linha de produção ao lado dos blocos",
    d: "Laboratório próprio para ensaios, e produtos conforme ABNT NBR 15270 e 15575. Certificada pelo PSQ, o Programa Setorial da Qualidade." },
  { n: "05", t: "Entrega na obra", f: "blocos.webp", a: "Pilhas de blocos cerâmicos prontos para a expedição",
    d: "Pronta entrega e atendimento em todo o Estado de São Paulo, com frete sob consulta. A equipe visita a sua obra." },
];
const recorte = (f: string) => (f === "aerea.webp" ? " recorte" : "");

// O tijolinho "chega" num marco um pouco antes de ficar exatamente em cima dele (6% do trecho).
const CHEGOU = 0.06;
export const etapaDe = (v: number, n: number) => Math.max(0, Math.min(n - 1, Math.floor(v * (n - 1) + CHEGOU)));

// Tijolinho que anda pela linha: a face do bloco cerâmico com os furos, assentado sobre o trilho.
function Tijolinho() {
  return (
    <svg viewBox="0 0 34 20" width="46" height="27" aria-hidden>
      <rect x="1" y="1" width="32" height="18" rx="1.5" fill="var(--brasa)" stroke="var(--tinta)" strokeWidth="2" />
      {[5, 12.5, 20, 27.5].map((x) => <rect key={x} x={x - 2.2} y="5" width="4.4" height="10" rx=".8" fill="var(--tinta)" opacity=".75" />)}
    </svg>
  );
}

// Desktop: a rolagem vertical leva o tijolinho pela linha; cada etapa aparece inteira
// quando ele chega no marco dela (antes, o trilho deslizava junto e mostrava duas etapas pela metade).
function LinhaDesktop({ ativo }: { ativo: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduz = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5, restDelta: 0.0005 });
  const pos = useTransform(sp, [0, 1], ["0%", "100%"]);
  const [etapa, setEtapa] = useState(0);
  useMotionValueEvent(sp, "change", (v) => setEtapa(etapaDe(v, est.length)));
  // a seta do guia "Role para avançar" só quica com a seção na tela
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => el.toggleAttribute("data-parado", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // clicar num marco leva a rolagem até a etapa dele (o tijolinho para em cima do marco)
  function irEtapa(i: number) {
    const el = ref.current; if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + (i / (est.length - 1)) * (el.offsetHeight - window.innerHeight);
    const lenis = (window as Window & { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: reduz ? "auto" : "smooth" });
  }
  return (
    <div ref={ref} className="linha-wrap">
      <section className="linha">
        <header className="linha-h">
          <h2>Do barro à obra</h2>
          <a className="linha-pular" href="#blocos">Pular para os blocos <IcSeta size={14} dir="baixo" /></a>
        </header>
        <motion.div className="trilha" initial={false}
          animate={ativo ? { x: `${-etapa * 100}vw` } : undefined}
          transition={reduz ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 28, mass: 0.9 }}>
          {est.map((e, i) => (
            <article key={e.n} className="painel" inert={ativo && i !== etapa} aria-hidden={ativo && i !== etapa}>
              <div className="painel-txt">
                <b className="num">{e.n}</b>
                <h3>{e.t}</h3>
                <p>{e.d}</p>
              </div>
              <figure className={`foto${recorte(e.f)}`}>
                <img src={`/fabrica/${e.f}`} alt={e.a} width={615} height={410} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </motion.div>
        <div className="rail">
          {est.map((e, i) => (
            <button key={e.n} type="button" className={i <= etapa ? "on" : undefined} style={{ left: `${(i / (est.length - 1)) * 100}%` }}
              onClick={() => irEtapa(i)} aria-label={`Etapa ${e.n}: ${e.t}`} aria-current={i === etapa ? "step" : undefined} />
          ))}
          <motion.span className="peca" style={{ left: pos }} aria-hidden><Tijolinho /></motion.span>
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
    <section className="lc">
      <header className="lc-h">
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
              <img src={`/fabrica/${e.f}`} alt={e.a} width={615} height={410} loading="lazy" decoding="async" />
              <b>{e.n}</b>
            </figure>
            <div className="lc-txt">
              <h3>{e.t}</h3>
              <p>{e.d}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="lc-nav">
        <button type="button" onClick={() => ir(idx - 1)} disabled={idx === 0} aria-label="Etapa anterior"><IcSeta size={16} dir="esq" /></button>
        <span><b>{est[idx].n}</b> / {String(est.length).padStart(2, "0")} · {est[idx].t}</span>
        <button type="button" onClick={() => ir(idx + 1)} disabled={idx === est.length - 1} aria-label="Próxima etapa"><IcSeta size={16} /></button>
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
