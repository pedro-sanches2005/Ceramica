import type { ReactNode } from "react";

/**
 * Rótulo dos botões. Antes o texto "rolava" no hover (efeito de biblioteca);
 * agora o texto fica parado e quem anda é o fundo: os blocos são assentados um a um,
 * como uma fiada (veja .bt::before em globals.css). O nome ficou para não mexer em todos os botões.
 */
export default function Rola({ children }: { children: ReactNode }) {
  return <span className="rola">{children}</span>;
}
