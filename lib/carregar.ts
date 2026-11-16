// "Carregar o bloco": quando uma peça entra no orçamento, um tijolinho sai do botão e voa num arco
// até onde o orçamento está (o "Cotar (N)" do topo, ou o "Revisar e enviar (N)" da ficha aberta),
// que dá uma batida ao receber. Sem voo para quem pediu menos movimento: só a batida (de cor).

const TIJOLO = `<svg viewBox="0 0 34 20" width="34" height="20" aria-hidden="true">
<rect x="1" y="1" width="32" height="18" rx="1.5" fill="#C9622F" stroke="#1C1A17" stroke-width="2"/>
${[5, 12.5, 20, 27.5].map((x) => `<rect x="${x - 2.2}" y="5" width="4.4" height="10" rx=".8" fill="#1C1A17" opacity=".75"/>`).join("")}
</svg>`;

function destino(): HTMLElement | null {
  return document.querySelector<HTMLElement>(".fam-r .bt") ?? document.querySelector<HTMLElement>(".top .bt-sm");
}

function bate(el: HTMLElement) {
  el.classList.remove("bate");
  void el.offsetWidth; // reinicia a animação se vier outra peça logo em seguida
  el.classList.add("bate");
  setTimeout(() => el.classList.remove("bate"), 520);
}

export function carregar(origem: Element | null) {
  if (typeof window === "undefined" || !origem) return;
  // mede o botão já no clique: ele pode virar o seletor de quantidade no próximo quadro
  const a = origem.getBoundingClientRect();
  // espera o React desenhar o número novo no destino antes de bater
  requestAnimationFrame(() => {
    const alvo = destino();
    if (!alvo) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const b = alvo.getBoundingClientRect();
    if (reduz || !a.width || !b.width) { bate(alvo); return; }

    const t = document.createElement("div");
    t.className = "voo";
    t.innerHTML = TIJOLO;
    document.body.appendChild(t);
    const x0 = a.left + a.width / 2 - 17, y0 = a.top + a.height / 2 - 10;
    const x1 = b.left + b.width / 2 - 17, y1 = b.top + b.height / 2 - 10;
    // altura do arco: sobe acima dos dois pontos, mas nunca sai da tela (o "Cotar" fica colado no topo)
    const topo = Math.max(8, Math.min(y0, y1) - Math.max(60, Math.abs(x1 - x0) * 0.18));
    const anim = t.animate(
      [
        { transform: `translate(${x0}px,${y0}px) rotate(0deg) scale(1)`, opacity: 1 },
        { transform: `translate(${(x0 + x1) / 2}px,${topo}px) rotate(-14deg) scale(1.15)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${x1}px,${y1}px) rotate(0deg) scale(.55)`, opacity: 0.2 },
      ],
      { duration: 640, easing: "cubic-bezier(.45,0,.2,1)" },
    );
    const fim = () => { t.remove(); bate(alvo); };
    anim.onfinish = fim;
    anim.oncancel = () => t.remove();
  });
}
