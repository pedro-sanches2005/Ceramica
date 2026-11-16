"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Qtd from "./Qtd";
import Rola from "./Rola";
import { cargaDe, desenhoPeca, fotoPeca, type Item, type Peca } from "@/lib/dados";
import BlocoIso from "./BlocoIso";
import { useOrcamento } from "@/lib/orcamento";
import { calcularComLinha } from "@/lib/ir";
import { IcSeta } from "./Icone";

// Uma peça da ficha: foto ou desenho técnico com as cotas dela ("Ver medidas"), que se monta animado.
function PecaFicha({ it, p }: { it: Item; p: Peca }) {
  const [medidas, setMedidas] = useState(false);
  const d = desenhoPeca(it, p);
  return (
    <li className="peca-t">
      <div className={`peca-f${medidas ? " iso-on" : ""}`}>
        {medidas
          ? <BlocoIso dim={d.dim} cel={d.cel} furo={d.furo} forma={d.forma} baixa={d.baixa} ativo />
          : <img src={fotoPeca(p.img)} alt={`${p.nome} ${p.dim} cm`} loading="lazy" decoding="async" />}
      </div>
      <div className="peca-i">
        <h3>{p.nome}</h3>
        <p className="mono">{p.dim} <small>cm</small></p>
        {p.specs.length > 0 && (
          <dl>{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="mono">{v}</dd></div>)}</dl>
        )}
        <button type="button" className="card-z peca-z" onClick={() => setMedidas((v) => !v)} aria-pressed={medidas}
          aria-label={medidas ? `Ver a foto de ${p.nome} ${p.dim} cm` : `Ver as medidas de ${p.nome} ${p.dim} cm`}>
          {medidas ? "Ver peça" : "Ver medidas"}
        </button>
        <div className="peca-q"><Qtd item={{ id: p.img, nome: p.nome, dim: p.dim, linha: it.linha, img: p.img }} compacto carga={cargaDe(p.specs)} /></div>
      </div>
    </li>
  );
}

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
    return () => { html.style.overflow = ov; window.removeEventListener("keydown", tecla); antes?.focus?.({ preventScroll: true }); };
  }, [onClose]);

  return (
    <motion.div className="fam-ov" data-lenis-prevent onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div className="fam" role="dialog" aria-modal="true" aria-labelledby={`fam-${it.id}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}>
        <header className="fam-h">
          <div className="fam-t">
            <h2 id={`fam-${it.id}`}>Linha {it.fam === "Estrutural" ? "estrutural" : "de vedação"} {it.linha} <em>{it.pecas.length} peças</em></h2>
            {/* no celular o atalho da calculadora fica aqui em cima, para o rodapé caber numa linha */}
            <button type="button" className="card-calc fam-calc-topo" onClick={() => { onClose(); calcularComLinha(it.id); }}>
              Calcular parede com esta linha <IcSeta size={14} />
            </button>
          </div>
          <button ref={fechar} type="button" className="fam-x" onClick={onClose} aria-label={`Fechar a ficha da linha ${it.linha}`}>
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden><path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="2.2" /></svg>
          </button>
        </header>

        <div className="fam-sc">
          <ul className="fam-g">
            {it.pecas.map((p) => <PecaFicha key={p.img} it={it} p={p} />)}
          </ul>
        </div>

        <footer className="fam-r">
          <p>Escolha a quantidade de cada peça; tudo vai para o mesmo orçamento e sai numa mensagem só no WhatsApp.</p>
          <button type="button" className="card-calc fam-calc-pe" onClick={() => { onClose(); calcularComLinha(it.id); }}>
            Calcular parede com esta linha <IcSeta size={14} />
          </button>
          <button type="button" className="bt" onClick={() => { onClose(); abrir(); }} disabled={itens.length === 0}>
            <Rola>Revisar e enviar{itens.length > 0 ? ` (${itens.length})` : ""}</Rola>
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}
