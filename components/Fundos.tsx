"use client";
import { useEffect, useRef } from "react";

// Fundos desenhados a partir do próprio produto (no lugar dos efeitos de biblioteca).
// Medidas reais: bloco 29 × 19 cm + junta de 1 cm = módulo 30 × 20, na escala 2 px por cm.

// Hero: parede em amarração (as fiadas desencontradas meio bloco), em traço fino.
// Ao abrir, as fiadas se assentam de baixo para cima; depois a parede corre devagar para a direita,
// como carga na esteira. Fora da tela a esteira para (não gasta bateria).
// a esteira só anda enquanto o fundo está na tela
function useParaForaDaTela() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => el.toggleAttribute("data-parado", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function ParedeFundo() {
  const ref = useParaForaDaTela();
  return (
    <div ref={ref} className="fundo-parede" aria-hidden>
      <svg className="fundo-esteira" width="100%" height="100%">
        <defs>
          <pattern id="fiadas" width="120" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 .5H120M0 40.5H120M.5 0V40M60.5 0V40M30.5 40V80M90.5 40V80" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fiadas)" />
      </svg>
    </div>
  );
}

// Contato: a face do bloco cerâmico com os furos, em amarração, quase sumindo no fundo escuro.
function Face({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="1" y="1" width="56" height="36" rx="2" />
      {[0, 1, 2].map((c) => [0, 1].map((l) => (
        <rect key={`${c}${l}`} x={7 + c * 16} y={7 + l * 13} width="12" height="10" rx="1.2" />
      )))}
    </g>
  );
}
// Também corre devagar para a direita, como a parede do hero (a página abre e fecha com a mesma esteira).
export function FurosFundo() {
  const ref = useParaForaDaTela();
  return (
    <div ref={ref} className="fundo-furos" aria-hidden>
      <svg className="fundo-esteira lenta" width="100%" height="100%">
        <defs>
          <pattern id="furos" width="120" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              <Face x={1} y={1} /><Face x={61} y={1} />
              <Face x={-29} y={41} /><Face x={31} y={41} /><Face x={91} y={41} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#furos)" />
      </svg>
    </div>
  );
}
