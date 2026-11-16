"use client";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FONES, wa } from "@/lib/dados";
import { IcSeta, IcWhats } from "./Icone";
import Cotar from "./Cotar";

// Ícone de cada seção: todos no mesmo traço (1.6, pontas quadradas), grade de 28 px,
// tinta sobre o mesmo quadrado kraft, para as quatro miniaturas lerem como uma família.
const tr = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "miter" as const, strokeLinecap: "square" as const };
const Ic = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 28 28" width="32" height="32" aria-hidden>{children}</svg>
);

const links: { h: string; t: string; mini: ReactNode }[] = [
  // galpão com telhado em serra e a chaminé do forno
  { h: "#processo", t: "Fábrica", mini: <Ic><path {...tr} d="M3 24V14l6-4v4l6-4v4l6-4v14H3Z" /><path {...tr} d="M21 24V4h3v20" /><path {...tr} d="M7 20h3M13 20h3" /></Ic> },
  // bloco cerâmico em perspectiva, com os furos na face de cima
  { h: "#blocos", t: "Blocos", mini: <Ic><path {...tr} d="M4 11l9-5 11 5v10l-11 5-9-5V11Z" /><path {...tr} d="M4 11l9 5 11-5M13 16v10" /><path {...tr} d="M9 10.6l2.5-1.4 2.5 1.4-2.5 1.4ZM15 9l2.5-1.4 2.5 1.4-2.5 1.4Z" /></Ic> },
  // parede em amarração com a régua de medida embaixo
  { h: "#paginacao", t: "Calcular parede", mini: <Ic><path {...tr} d="M3 4h22v15H3Z" /><path {...tr} d="M3 9h22M3 14h22M10 4v5M18 4v5M6 9v5M14 9v5M22 9v5M10 14v5M18 14v5" /><path {...tr} d="M3 23h22M3 21.5v3M25 21.5v3" /></Ic> },
  // balão do WhatsApp, o mesmo desenho dos botões de cotação
  { h: "#contato", t: "Contato", mini: <IcWhats size={26} /> },
];

// Menu do celular: um painel que desce do topo no tamanho do conteúdo (a página escurece atrás).
// Cada destino tem a miniatura da própria seção; embaixo, horário e telefones para tocar.
export default function Menu() {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    if (!aberto) return;
    const html = document.documentElement; const ov = html.style.overflow;
    html.style.overflow = "hidden";
    const t = (e: KeyboardEvent) => { if (e.key === "Escape") setAberto(false); };
    window.addEventListener("keydown", t);
    return () => { html.style.overflow = ov; window.removeEventListener("keydown", t); };
  }, [aberto]);

  return (
    <>
      <button type="button" className={`menu-b${aberto ? " on" : ""}`} onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto} aria-controls="menu-cel" aria-label={aberto ? "Fechar menu" : "Abrir menu"}>
        <i /><i />
      </button>
      <AnimatePresence>
        {aberto && (
          <motion.div className="menu-ov" onClick={() => setAberto(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.nav id="menu-cel" className="menu-cel" data-lenis-prevent aria-label="Menu" onClick={(e) => e.stopPropagation()}
              initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 420, damping: 40 }}>
              <ul className="menu-l">
                {links.map((l) => (
                  <li key={l.h}>
                    <a href={l.h} onClick={() => setAberto(false)}>
                      <span className="menu-mini">{l.mini}</span>
                      <span className="menu-t">{l.t}</span>
                      <IcSeta size={18} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="menu-p">
                <p className="menu-h"><b>Atendimento</b> Segunda a sexta, 7h30 às 18h · Sábado, 7h30 às 12h</p>
                <div className="menu-fones">
                  {FONES.slice(0, 2).map((f) => <a key={f.tel} href={`tel:${f.tel}`}>{f.label}</a>)}
                  {/* o número que atende no WhatsApp, por escrito (o Cotar abaixo abre a conversa) */}
                  <a className="menu-zap" href={wa()} target="_blank" rel="noopener noreferrer"><IcWhats size={16} />WhatsApp {FONES[2].label}</a>
                </div>
                <Cotar onClick={() => setAberto(false)} />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
