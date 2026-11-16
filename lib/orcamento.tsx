"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Orçamento montado no site: o visitante escolhe quantas peças de cada bloco quiser
// e manda tudo numa mensagem só pelo WhatsApp. Fica salvo no navegador (localStorage).
export type ItemOrc = { id: string; nome: string; dim: string; linha: string; img: string; qtd: number };

type Ctx = {
  itens: ItemOrc[];
  qtd: (id: string) => number;
  definir: (item: Omit<ItemOrc, "qtd">, qtd: number) => void;
  somar: (item: Omit<ItemOrc, "qtd">, qtd: number) => void;
  limpar: () => void;
  repor: (itens: ItemOrc[]) => void; // desfaz o "Limpar orçamento"
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
};

const OrcCtx = createContext<Ctx | null>(null);
const CHAVE = "incargel-orcamento";
export const MAX = 999999;
export const AVISO_MAX = "Máximo de 999.999 peças por item. Para mais, fale com a gente.";

export function OrcamentoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemOrc[]>([]);
  const [aberto, setAberto] = useState(false);
  const [lido, setLido] = useState(false);

  // carrega o que a pessoa já tinha montado
  useEffect(() => {
    try {
      const s = localStorage.getItem(CHAVE);
      if (s) setItens((JSON.parse(s) as ItemOrc[]).filter((i) => i && i.id && i.qtd > 0));
    } catch { /* orçamento corrompido: começa vazio */ }
    setLido(true);
  }, []);
  useEffect(() => {
    if (!lido) return;
    try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch { /* sem armazenamento: segue só na memória */ }
  }, [itens, lido]);

  const definir = useCallback((item: Omit<ItemOrc, "qtd">, qtd: number) => {
    const n = Math.max(0, Math.min(MAX, Math.round(qtd) || 0));
    setItens((atual) => {
      const resto = atual.filter((i) => i.id !== item.id);
      if (n === 0) return resto;
      const idx = atual.findIndex((i) => i.id === item.id);
      const novo = { ...item, qtd: n };
      if (idx < 0) return [...atual, novo];
      const copia = [...atual]; copia[idx] = novo; return copia;
    });
  }, []);
  // soma (ou subtrai, com qtd negativa); a peça sai do orçamento se chegar a zero
  const somar = useCallback((item: Omit<ItemOrc, "qtd">, qtd: number) => {
    setItens((atual) => {
      const idx = atual.findIndex((i) => i.id === item.id);
      if (idx < 0) return qtd > 0 ? [...atual, { ...item, qtd: Math.min(MAX, qtd) }] : atual;
      const n = Math.min(MAX, atual[idx].qtd + qtd);
      if (n <= 0) return atual.filter((i) => i.id !== item.id);
      const copia = [...atual]; copia[idx] = { ...copia[idx], qtd: n }; return copia;
    });
  }, []);

  // funções estáveis: quem depende delas (o painel, que trava a rolagem e põe o foco no "fechar")
  // não pode reagir a cada mudança de quantidade
  const limpar = useCallback(() => setItens([]), []);
  const repor = useCallback((lista: ItemOrc[]) => setItens(lista), []);
  const abrir = useCallback(() => setAberto(true), []);
  const fechar = useCallback(() => setAberto(false), []);

  const valor = useMemo<Ctx>(() => ({
    itens,
    qtd: (id) => itens.find((i) => i.id === id)?.qtd ?? 0,
    definir, somar, limpar, repor,
    aberto, abrir, fechar,
  }), [itens, aberto, definir, somar, limpar, repor, abrir, fechar]);

  return <OrcCtx.Provider value={valor}>{children}</OrcCtx.Provider>;
}

export function useOrcamento() {
  const c = useContext(OrcCtx);
  if (!c) throw new Error("useOrcamento fora do OrcamentoProvider");
  return c;
}

// Texto da mensagem do WhatsApp com todos os itens
export type Cliente = { nome: string; tel: string; email: string; cidade: string; obs: string };

// Uma linha por peça, igual em todas as mensagens que levam o orçamento.
export const linhasItens = (itens: ItemOrc[]) =>
  itens.map((i) => `• ${i.qtd.toLocaleString("pt-BR")} × ${i.nome} ${i.dim} cm (linha ${i.linha})`);

// Telefone com DDD: pelo menos 10 dígitos (fixo) ou 11 (celular); aceita +55, parênteses e traços.
export const AVISO_TEL = "Confira o número com DDD, por exemplo (11) 98383-1253.";
export const EXEMPLO_TEL = "(11) 9xxxx-xxxx";
// O que falta em cada campo (no lugar do genérico "Preencha este campo.")
export const AVISO_VAZIO = {
  nome: "Informe seu nome.",
  tel: "Informe um telefone para a equipe responder.",
  cidade: "Informe a cidade da obra para calcularmos o frete.",
  msg: "Conte o que você precisa: bloco, quantidade ou prazo.",
} as const;
export const telValido = (t: string) => t.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "").length >= 10;

// Dados do cliente no topo (fácil de identificar quem pediu), depois a lista de peças.
// Campos opcionais vazios não aparecem na mensagem.
export function mensagemOrcamento(itens: ItemOrc[], c: Cliente) {
  const linhas = linhasItens(itens);
  const dados = [
    `Nome: ${c.nome.trim()}`,
    `Telefone/WhatsApp: ${c.tel.trim()}`,
    c.email.trim() ? `E-mail: ${c.email.trim()}` : "",
    c.cidade.trim() ? `Cidade da obra: ${c.cidade.trim()}` : "",
  ].filter(Boolean);
  return (
    `Olá! Vim pelo site da Incargel e gostaria de um orçamento.\n\n${dados.join("\n")}\n\n${linhas.join("\n")}` +
    (c.obs.trim() ? `\n\nObservações: ${c.obs.trim()}` : "")
  );
}
