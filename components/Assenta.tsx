"use client";
import { useEffect, useRef, type ReactNode } from "react";

// Lista cujos tijolinhos são assentados um a um na primeira vez que ela aparece na tela.
// Sem JavaScript (ou antes de carregar) a lista já aparece completa: o estado "espera" só é ligado aqui.
export default function Assenta({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.dataset.assenta = "espera";
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      el.dataset.assenta = "feito";
      io.disconnect();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <ul ref={ref} className={className}>{children}</ul>;
}
