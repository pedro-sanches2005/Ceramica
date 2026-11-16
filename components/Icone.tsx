// Ícones desenhados (traço único, herdam a cor do texto). Substituem as setas de texto ↗ → ←.
type P = { size?: number; className?: string };

// Balão do WhatsApp: avisa, antes do clique, que a cotação abre lá.
export function IcWhats({ size = 18, className }: P) {
  return (
    <svg className={`ic${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" width={size} height={size} aria-hidden fill="none">
      <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M9.1 7.9c.3 0 .6 0 .8.5l.9 2c.1.3 0 .5-.1.7l-.6.7c-.1.2-.2.4 0 .6.6 1 1.6 2 2.7 2.6.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.9.9c.3.1.4.3.4.5 0 .5-.2 1.2-.7 1.6-.5.4-1.4.6-2.3.3-1.9-.6-4.3-2.6-5.3-4.6-.5-1-.6-2-.2-2.8.3-.6.8-1 1.3-1h.2Z" fill="currentColor" />
    </svg>
  );
}

// Mais e menos: traço quadrado, mesma espessura da seta (no lugar dos caracteres "+" e "−").
export function IcMais({ size = 16, className }: P) {
  return (
    <svg className={`ic${className ? ` ${className}` : ""}`} viewBox="0 0 16 16" width={size} height={size} aria-hidden fill="none">
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
export function IcMenos({ size = 16, className }: P) {
  return (
    <svg className={`ic${className ? ` ${className}` : ""}`} viewBox="0 0 16 16" width={size} height={size} aria-hidden fill="none">
      <path d="M2.5 8h11" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

// Lixeira: excluir o produto do orçamento (mesmo traço quadrado do mais e menos).
export function IcLixo({ size = 16, className }: P) {
  return (
    <svg className={`ic${className ? ` ${className}` : ""}`} viewBox="0 0 16 16" width={size} height={size} aria-hidden fill="none">
      <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.7 9.5h6.6L12 4M6.8 6.5v4.5M9.2 6.5v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

// Seta reta; "dir" gira o mesmo desenho.
export function IcSeta({ size = 14, dir = "dir", className }: P & { dir?: "dir" | "esq" | "cima" | "baixo" }) {
  const rot = { dir: 0, baixo: 90, esq: 180, cima: 270 }[dir];
  return (
    <svg className={`ic${className ? ` ${className}` : ""}`} viewBox="0 0 16 16" width={size} height={size} aria-hidden fill="none"
      style={rot ? { transform: `rotate(${rot}deg)` } : undefined}>
      <path d="M2.5 8h10.5M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}
