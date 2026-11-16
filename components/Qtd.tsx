"use client";
import { useEffect, useState } from "react";
import { AVISO_MAX, MAX, useOrcamento, type ItemOrc } from "@/lib/orcamento";
import { IcLixo, IcMais, IcMenos } from "./Icone";
import { carregar } from "@/lib/carregar";

// Seletor de quantidade ligado ao orçamento. Com 0 mostra "Adicionar ao orçamento" (entra com `inicial` peças,
// blocos se compram aos centos); depois vira − [quantidade] +, que anda de 1 em 1, com o número editável.
// O − nunca tira o produto sem querer: em 1 peça ele vira a lixeira ("Excluir produto").
// `carga`: peças numa carga aproximada (revenda compra por caminhão); quando existe, aparece "+ 1 carga".
export default function Qtd({ item, inicial = 100, compacto = false, carga }: { item: Omit<ItemOrc, "qtd">; inicial?: number; compacto?: boolean; carga?: number }) {
  const { qtd, definir } = useOrcamento();
  const n = qtd(item.id);
  const [txt, setTxt] = useState(String(n));
  useEffect(() => setTxt(String(n)), [n]);
  // passou do limite: avisa em vez de cortar o número calado
  const [estourou, setEstourou] = useState(false);
  useEffect(() => {
    if (!estourou) return;
    const t = setTimeout(() => setEstourou(false), 4000);
    return () => clearTimeout(t);
  }, [estourou]);
  const rotulo = `${item.nome} ${item.dim} cm`;
  const aplicar = (v: number) => { if (v > MAX) setEstourou(true); definir(item, v); };

  if (n === 0) {
    return (
      <button type="button" className={`qtd-add${compacto ? " sm" : ""}`} onClick={(e) => { carregar(e.currentTarget); definir(item, inicial); }} aria-label={`Adicionar ${inicial} peças de ${rotulo} ao orçamento`}>
        {/* no celular, dentro da ficha, fica só "Adicionar" para caber numa linha */}
        <IcMais size={14} />Adicionar<span className="qtd-add-r"> ao orçamento</span>
      </button>
    );
  }
  const ultima = n <= 1;
  return (
    <>
    <div className={`qtd${compacto ? " sm" : ""}`} role="group" aria-label={`Quantidade de ${rotulo} no orçamento`}>
      <button type="button" className={ultima ? "qtd-lixo" : undefined} onClick={() => definir(item, n - 1)}
        aria-label={ultima ? `Excluir ${rotulo} do orçamento` : "Tirar 1 peça"} title={ultima ? "Excluir produto" : undefined}>
        {ultima ? <IcLixo /> : <IcMenos />}
      </button>
      <input inputMode="numeric" value={txt} aria-label={`Peças de ${rotulo}`}
        onChange={(e) => setTxt(e.target.value.replace(/\D/g, ""))}
        onBlur={() => aplicar(Number(txt) || 0)}
        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }} />
      <button type="button" onClick={() => aplicar(n + 1)} aria-label="Somar 1 peça"><IcMais /></button>
      <p className="qtd-max" role="status">{estourou ? AVISO_MAX : ""}</p>
    </div>
    {carga ? (
      <button type="button" className="qtd-carga" onClick={(e) => { carregar(e.currentTarget); aplicar(n + carga); }}
        aria-label={`Somar 1 carga (${carga.toLocaleString("pt-BR")} peças) de ${rotulo}`}>
        <IcMais size={12} />1 carga <span className="mono">({carga.toLocaleString("pt-BR")} pçs)</span>
      </button>
    ) : null}
    </>
  );
}
