"use client";
import { useEffect, useState } from "react";
import { useOrcamento, type ItemOrc } from "@/lib/orcamento";
import { IcMais, IcMenos } from "./Icone";

// Seletor de quantidade ligado ao orçamento. Com 0 mostra "Adicionar ao orçamento";
// depois vira − [quantidade] +, com o número editável.
// `passo` é quanto cada clique soma (blocos se compram aos centos).
export default function Qtd({ item, passo = 100, compacto = false }: { item: Omit<ItemOrc, "qtd">; passo?: number; compacto?: boolean }) {
  const { qtd, definir } = useOrcamento();
  const n = qtd(item.id);
  const [txt, setTxt] = useState(String(n));
  useEffect(() => setTxt(String(n)), [n]);
  const rotulo = `${item.nome} ${item.dim} cm`;

  if (n === 0) {
    return (
      <button type="button" className={`qtd-add${compacto ? " sm" : ""}`} onClick={() => definir(item, passo)} aria-label={`Adicionar ${passo} peças de ${rotulo} ao orçamento`}>
        <IcMais size={14} />Adicionar ao orçamento
      </button>
    );
  }
  return (
    <div className={`qtd${compacto ? " sm" : ""}`} role="group" aria-label={`Quantidade de ${rotulo} no orçamento`}>
      <button type="button" onClick={() => definir(item, n - passo)} aria-label={`Menos ${passo}`}><IcMenos /></button>
      <input inputMode="numeric" value={txt} aria-label={`Peças de ${rotulo}`}
        onChange={(e) => setTxt(e.target.value.replace(/\D/g, ""))}
        onBlur={() => definir(item, Number(txt) || 0)}
        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }} />
      <button type="button" onClick={() => definir(item, n + passo)} aria-label={`Mais ${passo}`}><IcMais /></button>
    </div>
  );
}
