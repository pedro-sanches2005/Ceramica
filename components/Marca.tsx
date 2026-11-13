// Símbolo inspirado no logo da Incargel: a face do bloco na frente, peças mais claras ao fundo.
export default function Marca({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 26" width={size} height={(size * 26) / 40} aria-hidden>
      <rect x="0" y="9" width="9" height="7" rx="2" fill="var(--brasa2)" opacity=".55" />
      <rect x="27" y="1" width="10" height="7" rx="2" fill="var(--brasa2)" opacity=".55" />
      <rect x="31" y="17" width="9" height="7" rx="2" fill="var(--brasa2)" opacity=".55" />
      <rect x="4" y="3" width="32" height="20" rx="5" fill="var(--brasa2)" opacity=".7" />
      <rect x="8" y="6" width="24" height="14" rx="4" fill="var(--brasa)" />
    </svg>
  );
}
