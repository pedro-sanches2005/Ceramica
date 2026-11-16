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
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
};

const OrcCtx = createContext<Ctx | null>(null);
const CHAVE = "incargel-orcamento";
const MAX = 999999;

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
  const somar = useCallback((item: Omit<ItemOrc, "qtd">, qtd: number) => {
    setItens((atual) => {
      const idx = atual.findIndex((i) => i.id === item.id);
      if (idx < 0) return qtd > 0 ? [...atual, { ...item, qtd: Math.min(MAX, qtd) }] : atual;
      const copia = [...atual]; copia[idx] = { ...copia[idx], qtd: Math.min(MAX, copia[idx].qtd + qtd) }; return copia;
    });
  }, []);

  const valor = useMemo<Ctx>(() => ({
    itens,
    qtd: (id) => itens.find((i) => i.id === id)?.qtd ?? 0,
    definir, somar,
    limpar: () => setItens([]),
    aberto,
    abrir: () => setAberto(true),
    fechar: () => setAberto(false),
  }), [itens, aberto, definir, somar]);

  return <OrcCtx.Provider value={valor}>{children}</OrcCtx.Provider>;
}

export function useOrcamento() {
  const c = useContext(OrcCtx);
  if (!c) throw new Error("useOrcamento fora do OrcamentoProvider");
  return c;
}

// Texto da mensagem do WhatsApp com todos os itens
export type Cliente = { nome: string; tel: string; email: string; cidade: string; obs: string };

// Dados do cliente no topo (fácil de identificar quem pediu), depois a lista de peças.
export function mensagemOrcamento(itens: ItemOrc[], c: Cliente) {
  const linhas = itens.map((i) => `• ${i.qtd.toLocaleString("pt-BR")} × ${i.nome} ${i.dim} cm (linha ${i.linha})`);
  const dados = [
    `Nome: ${c.nome.trim()}`,
    `Telefone/WhatsApp: ${c.tel.trim()}`,
    c.email.trim() ? `E-mail: ${c.email.trim()}` : "",
    `Cidade da obra: ${c.cidade.trim() || "___"}`,
  ].filter(Boolean);
  return (
    `Olá! Vim pelo site da Incargel e gostaria de um orçamento.\n\n${dados.join("\n")}\n\n${linhas.join("\n")}` +
    (c.obs.trim() ? `\n\nObservações: ${c.obs.trim()}` : "")
  );
}
