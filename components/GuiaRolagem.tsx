"use client";
import { useState } from "react";
import { MotionValue, motion, useMotionValueEvent, useTransform } from "framer-motion";

// Guia das cenas controladas pela rolagem: anel de progresso + instrução.
// Ao completar, troca para "pronto" e some, para não poluir a tela.
export default function GuiaRolagem({ p, texto, passos }: { p: MotionValue<number>; texto: string; passos?: number }) {
  const [fim, setFim] = useState(false);
  const [passo, setPasso] = useState(1);
  useMotionValueEvent(p, "change", (v) => {
    setFim(v > 0.985);
    if (passos) setPasso(Math.min(passos, Math.round(v * (passos - 1)) + 1));
  });
  const traco = useTransform(p, (v) => 75.4 * (1 - Math.min(1, Math.max(0, v))));
  return (
    <motion.div className={`guia${fim ? " fim" : ""}`} aria-hidden>
      <svg viewBox="0 0 28 28" width="28" height="28">
        <circle cx="14" cy="14" r="12" className="guia-trilho" />
        <motion.circle cx="14" cy="14" r="12" className="guia-anel" strokeDasharray="75.4" style={{ strokeDashoffset: traco }} />
        {fim
          ? <path className="guia-seta" d="M8.5 14.5l3.8 3.8 7.2-8" />
          : <path className="guia-seta" d="M14 8v11M9.5 14.5L14 19l4.5-4.5" />}
      </svg>
      <span className="mono">
        {fim ? "Pronto" : texto}
        {passos && !fim && <b> · {String(passo).padStart(2, "0")}/{String(passos).padStart(2, "0")}</b>}
      </span>
    </motion.div>
  );
}
