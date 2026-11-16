"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Qtd from "./Qtd";
import Rola from "./Rola";
import { fotoPeca, type Item } from "@/lib/dados";
import { useOrcamento } from "@/lib/orcamento";

// Ficha da linha inteira (versão do main): todas as peças da família, com medidas e dados.
// Em cada peça, a quantidade vai direto para o orçamento.
export default function Familia({ it, onClose }: { it: Item; onClose: () => void }) {
  const fechar = useRef<HTMLButtonElement>(null);
  const { itens, abrir } = useOrcamento();

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

  return (
    <motion.div className="fam-ov" data-lenis-prevent onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div className="fam" role="dialog" aria-modal="true" aria-labelledby={`fam-${it.id}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}>
        <header className="fam-h">
          <h2 id={`fam-${it.id}`}>Linha {it.fam === "Estrutural" ? "estrutural" : "de vedação"} {it.linha} <em>{it.pecas.length} peças</em></h2>
          <button ref={fechar} type="button" className="fam-x" onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden><path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="2.2" /></svg>
          </button>
        </header>

        <div className="fam-sc">
          <ul className="fam-g">
            {it.pecas.map((p) => (
              <li key={p.img} className="peca-t">
                <div className="peca-f">
                  <img src={fotoPeca(p.img)} alt={`${p.nome} ${p.dim} cm`} loading="lazy" decoding="async" />
                </div>
                <div className="peca-i">
                  <h3>{p.nome}</h3>
                  <p className="mono">{p.dim} <small>cm</small></p>
                  {p.specs.length > 0 && (
                    <dl>{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="mono">{v}</dd></div>)}</dl>
                  )}
                  <div className="peca-q"><Qtd item={{ id: p.img, nome: p.nome, dim: p.dim, linha: it.linha, img: p.img }} compacto /></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="fam-r">
          <p>Escolha a quantidade de cada peça; tudo vai para o mesmo orçamento e sai numa mensagem só no WhatsApp.</p>
          <button type="button" className="bt" onClick={() => { onClose(); abrir(); }} disabled={itens.length === 0}>
            <Rola>Ver orçamento{itens.length > 0 ? ` (${itens.length})` : ""}</Rola>
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}
