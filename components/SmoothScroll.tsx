"use client";
import { useEffect } from "react";
import Lenis from "lenis";

// Rolagem com inércia: o conteúdo persegue a roda do mouse em vez de saltar.
// No iPhone/Android o toque continua nativo (já tem inércia do sistema).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // links como href="#catalogo" deslizam até a seção com a mesma inércia
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const h = a.getAttribute("href") ?? "";
      if (h === "#") { e.preventDefault(); lenis.scrollTo(0); return; }
      const alvo = document.querySelector<HTMLElement>(h);
      if (alvo) { e.preventDefault(); lenis.scrollTo(alvo, { offset: -8 }); history.replaceState(null, "", h); }
    };
    document.addEventListener("click", onClick);

    return () => { cancelAnimationFrame(raf); document.removeEventListener("click", onClick); lenis.destroy(); };
  }, []);
  return null;
}
