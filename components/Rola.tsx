import type { ReactNode } from "react";

/**
 * Rótulo que "rola" ao passar o mouse, adaptado do Slide Text Button do KokonutUI
 * (@kokonut-labs · MIT · https://kokonutui.com · https://github.com/kokonut-labs/kokonutui).
 * As duas cópias dividem a mesma célula de grid; a de baixo sobe no hover/foco.
 * O texto é sempre o mesmo (nenhuma cópia nova): a segunda é só visual, escondida de leitores de tela.
 * O estilo está em globals.css (.rola).
 */
export default function Rola({ children }: { children: ReactNode }) {
  return (
    <span className="rola">
      <span className="rola-a">{children}</span>
      <span className="rola-b" aria-hidden="true">{children}</span>
    </span>
  );
}
