"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FONES, wa } from "@/lib/dados";

const links = [
  { h: "#processo", t: "Fábrica" },
  { h: "#blocos", t: "Blocos" },
  { h: "#paginacao", t: "Paginação" },
  { h: "#contato", t: "Contato" },
];

// Menu do celular: tela cheia, links grandes para o polegar.
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
          <motion.nav id="menu-cel" className="menu-cel" data-lenis-prevent aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}>
            <ol>
              {links.map((l, i) => (
                <motion.li key={l.h} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.06, duration: 0.45 }}>
                  <a href={l.h} onClick={() => setAberto(false)}><small className="mono">{String(i + 1).padStart(2, "0")}</small>{l.t}</a>
                </motion.li>
              ))}
            </ol>
            <motion.div className="menu-p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <a className="bt" target="_blank" rel="noopener noreferrer" href={wa("Olá! Vim pelo site da Incargel e gostaria de uma cotação.")}>Pedir cotação</a>
              <p className="mono">{FONES.slice(0, 2).map((f) => <a key={f.tel} href={`tel:${f.tel}`}>{f.label}</a>)}</p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
