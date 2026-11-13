"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fotoPeca, wa, type Item } from "@/lib/dados";

// Ficha da linha inteira: todas as peças da família, com medidas, dados e cotação por peça.
export default function Familia({ it, onClose }: { it: Item; onClose: () => void }) {
  const fechar = useRef<HTMLButtonElement>(null);
  const tipo = it.fam === "Estrutural" ? "estrutural" : "de vedação";

  useEffect(() => {
    const antes = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const ov = html.style.overflow;
    html.style.overflow = "hidden";
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", tecla);
    return () => { html.style.overflow = ov; window.removeEventListener("keydown", tecla); antes?.focus?.(); };
  }, [onClose]);

  const tudo = wa(
    `Olá! Vim pelo site da Incargel e gostaria de uma cotação da linha ${tipo} ${it.linha}:\n\n` +
    it.pecas.map((p) => `• ${p.nome} ${p.dim} cm: ___ peças`).join("\n") +
    `\n\nCidade da obra: `
  );

  return (
    <motion.div className="fam-ov" data-lenis-prevent onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div className="fam" role="dialog" aria-modal="true" aria-labelledby={`fam-${it.id}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}>
        <header className="fam-h">
          <div>
            <span className="kick mono">{it.fam} · Linha {it.linha}</span>
            <h2 id={`fam-${it.id}`}>Família completa <em className="mono">{it.pecas.length} peças</em></h2>
          </div>
          <button ref={fechar} type="button" className="fam-x" onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden><path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="2.2" /></svg>
          </button>
        </header>

        <div className="fam-sc">
          <ul className="fam-g">
            {it.pecas.map((p, i) => (
              <motion.li key={p.img} className="peca-t"
                initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.045, ease: [0.2, 0.8, 0.2, 1] }}>
                <div className="peca-f">
                  <b className="mono">{String(i + 1).padStart(2, "0")}</b>
                  <img src={fotoPeca(p.img)} alt={`${p.nome} ${p.dim} cm`} loading="lazy" decoding="async" />
                </div>
                <div className="peca-i">
                  <h3>{p.nome}</h3>
                  <p className="mono">{p.dim} <small>cm</small></p>
                  {p.specs.length > 0 && (
                    <dl className="mono">{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  )}
                  <a className="card-z mono" target="_blank" rel="noopener noreferrer"
                    href={wa(`Olá! Vim pelo site da Incargel e gostaria de uma cotação: ${p.nome.toLowerCase()} ${p.dim} cm (linha ${tipo} ${it.linha}).`)}>
                    Cotar esta peça ↗
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <footer className="fam-r">
          <p className="mono">Monte o pedido da linha inteira: a mensagem já sai com todas as peças listadas.</p>
          <a className="bt" target="_blank" rel="noopener noreferrer" href={tudo}>Cotar a família {it.linha}</a>
        </footer>
      </motion.div>
    </motion.div>
  );
}
