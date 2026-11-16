// Rola até uma seção com a mesma inércia do resto da página (Lenis); sem ele, rolagem nativa.
type ComLenis = Window & { __lenis?: { scrollTo: (alvo: HTMLElement) => void } };

export function irPara(id: string) {
  const alvo = document.getElementById(id);
  if (!alvo) return;
  const lenis = (window as ComLenis).__lenis;
  if (lenis) lenis.scrollTo(alvo);
  else alvo.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

// "Calcular parede com esta linha": a calculadora troca para a linha e a página desce até ela.
export function calcularComLinha(linha: string) {
  window.dispatchEvent(new CustomEvent("incargel:linha", { detail: linha }));
  // espera um quadro: a ficha da família pode estar fechando e devolvendo a rolagem
  requestAnimationFrame(() => requestAnimationFrame(() => irPara("paginacao")));
}
