"use client";
import { useEffect, useState } from "react";

// true em telas estreitas: lá as cenas de rolagem viram layout estático.
// O CSS já empilha tudo pela mesma media query; este hook só desliga o que é JS (transformações, guias).
export const CELULAR = "(max-width: 760px)";

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
