"use client";
import { useEffect, useState } from "react";

// true em telas estreitas OU baixas (celular deitado): lá a cena de rolagem da fábrica vira carrossel,
// porque uma cena presa de 100svh não cabe em ~390px de altura.
// O CSS usa a mesma media query (globals.css, bloco "fábrica no celular"); este hook só desliga o que é JS.
export const CELULAR = "(max-width: 760px), (max-height: 500px) and (orientation: landscape)";

export function useCelular() {
  const [cel, setCel] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(CELULAR);
    const f = () => setCel(mq.matches);
    f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return cel;
}
