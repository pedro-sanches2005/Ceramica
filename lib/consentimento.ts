// Escolha de privacidade do visitante. Categorias reais do site:
// - necessarios: o orçamento em montagem (sempre ligado; sem ele o orçamento some ao recarregar)
// - preferencias: lembrar nome, telefone, e-mail e cidade do formulário de orçamento
// O site não usa medição de navegação; se um dia usar, adicione uma categoria aqui.
export type Consentimento = { preferencias: boolean; data: string };
const CHAVE = "incargel-privacidade";
export const EVENTO = "incargel:privacidade";

export function lerConsentimento(): Consentimento | null {
  try { const s = localStorage.getItem(CHAVE); return s ? (JSON.parse(s) as Consentimento) : null; } catch { return null; }
}

export function salvarConsentimento(preferencias: boolean) {
  const c: Consentimento = { preferencias, data: new Date().toISOString() };
  try { localStorage.setItem(CHAVE, JSON.stringify(c)); } catch { /* sem armazenamento */ }
  // sem permissão de preferências, apaga o que já estava lembrado
  if (!preferencias) { try { localStorage.removeItem("incargel-cliente"); } catch { /* nada */ } }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: c }));
}

export function podeLembrarCliente() { return lerConsentimento()?.preferencias === true; }
