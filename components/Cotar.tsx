"use client";
import { wa } from "@/lib/dados";
import { useOrcamento } from "@/lib/orcamento";
import { IcWhats } from "./Icone";
import Rola from "./Rola";

const MSG = "Olá! Vim pelo site da Incargel e gostaria de uma cotação.";

// Botão "Cotar" da página inteira (topo, hero, menu, rodapé).
// Orçamento vazio: abre o WhatsApp com a mensagem padrão, como antes.
// Com peças escolhidas: abre o painel do orçamento, para a lista não ficar para trás.
export default function Cotar({ className = "bt", curto = false, icone, onClick }: {
  className?: string; curto?: boolean; icone?: number; onClick?: () => void;
}) {
  const { itens, abrir } = useOrcamento();
  const n = itens.length;
  const rotulo = curto ? (n ? `Cotar (${n})` : "Cotar") : "Cotar no WhatsApp";
  const corpo = <Rola><IcWhats size={icone} />{rotulo}</Rola>;

  if (n > 0) {
    return (
      <button type="button" className={className}
        aria-label={`Revisar o orçamento (${n} ${n === 1 ? "item" : "itens"}) e enviar no WhatsApp`}
        onClick={() => { onClick?.(); abrir(); }}>
        {corpo}
      </button>
    );
  }
  return (
    <a className={className} target="_blank" rel="noopener noreferrer" href={wa(MSG)}
      aria-label={curto ? "Cotar no WhatsApp" : undefined} onClick={onClick}>
      {corpo}
    </a>
  );
}
