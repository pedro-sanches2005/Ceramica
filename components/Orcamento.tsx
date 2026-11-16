"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IcWhats } from "./Icone";
import Qtd from "./Qtd";
import Rola from "./Rola";
import { FONES, fotoPeca, wa } from "@/lib/dados";
import { mensagemOrcamento, useOrcamento, type Cliente } from "@/lib/orcamento";
import { podeLembrarCliente } from "@/lib/consentimento";

// Barra fixa embaixo quando há itens + painel lateral para revisar e enviar pelo WhatsApp.
export default function Orcamento() {
  const { itens, limpar, aberto, abrir, fechar } = useOrcamento();
  // dados do cliente: lembrados no navegador só se o visitante permitiu "Preferências"
  const [cli, setCli] = useState<Cliente>({ nome: "", tel: "", email: "", cidade: "", obs: "" });
  useEffect(() => {
    if (!podeLembrarCliente()) return;
    try { const s = localStorage.getItem("incargel-cliente"); if (s) setCli((c) => ({ ...c, ...JSON.parse(s), obs: "" })); } catch { /* sem dados salvos */ }
  }, []);
  const muda = (k: keyof Cliente) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCli((c) => ({ ...c, [k]: e.target.value }));
  const [enviado, setEnviado] = useState<{ url: string; bloqueado: boolean } | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const total = itens.reduce((s, i) => s + i.qtd, 0);

  useEffect(() => {
    if (!aberto) return;
    const html = document.documentElement; const ov = html.style.overflow;
    html.style.overflow = "hidden";
    fecharRef.current?.focus();
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape") fechar(); };
    window.addEventListener("keydown", tecla);
    return () => { html.style.overflow = ov; window.removeEventListener("keydown", tecla); };
  }, [aberto, fechar]);
  useEffect(() => { if (itens.length === 0) setEnviado(null); }, [itens.length]);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // "required" aceita só espaços; nome e telefone precisam ter conteúdo de verdade
    for (const k of ["nome", "tel"] as const) {
      const el = form.elements.namedItem(k) as HTMLInputElement;
      el.setCustomValidity(cli[k].trim() ? "" : "Preencha este campo.");
    }
    if (!form.reportValidity()) return;
    if (podeLembrarCliente()) {
      try { const { obs: _obs, ...guardar } = cli; void _obs; localStorage.setItem("incargel-cliente", JSON.stringify(guardar)); } catch { /* segue sem salvar */ }
    }
    const url = wa(mensagemOrcamento(itens, cli));
    const janela = window.open(url, "_blank", "noopener,noreferrer");
    setEnviado({ url, bloqueado: !janela });
  }

  return (
    <>
      <AnimatePresence>
        {itens.length > 0 && !aberto && (
          <motion.div className="orc-barra" role="region" aria-label="Orçamento"
            initial={{ y: "120%" }} animate={{ y: 0 }} exit={{ y: "120%" }} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
            <p><b>{itens.length} {itens.length === 1 ? "item" : "itens"}</b> no orçamento · {total.toLocaleString("pt-BR")} peças</p>
            <button type="button" className="bt bt-sm" onClick={abrir}><Rola>Revisar e enviar</Rola></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aberto && (
          <motion.div className="orc-ov" data-lenis-prevent onClick={fechar}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.aside className="orc" role="dialog" aria-modal="true" aria-labelledby="orc-t" onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 34 }}>
              <header className="orc-h">
                <h2 id="orc-t">Seu orçamento</h2>
                <button ref={fecharRef} type="button" className="orc-x" onClick={fechar} aria-label="Fechar orçamento">
                  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden><path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="2.2" /></svg>
                </button>
              </header>

              {itens.length === 0 ? (
                <p className="orc-vazio">Nenhum bloco ainda. Escolha as quantidades no catálogo ou no cálculo da parede.</p>
              ) : (
                <>
                  <ul className="orc-lista">
                    {itens.map((i) => (
                      <li key={i.id}>
                        <img src={fotoPeca(i.img)} alt="" width={48} height={48} />
                        <div className="orc-nome"><b>{i.nome}</b><span className="mono">{i.dim} cm · linha {i.linha}</span></div>
                        <Qtd item={i} compacto />
                      </li>
                    ))}
                  </ul>
                  <form className="orc-form" onSubmit={enviar} onInput={(e) => (e.target as HTMLInputElement).setCustomValidity?.("")}>
                  <div className="orc-f">
                    <label>Nome<input name="nome" value={cli.nome} onChange={muda("nome")} required autoComplete="name" /></label>
                    <label>Telefone / WhatsApp<input name="tel" type="tel" inputMode="tel" value={cli.tel} onChange={muda("tel")} required autoComplete="tel" /></label>
                    <label>E-mail (opcional)<input name="email" type="email" value={cli.email} onChange={muda("email")} autoComplete="email" /></label>
                    <label>Cidade da obra<input name="cidade" value={cli.cidade} onChange={muda("cidade")} autoComplete="address-level2" /></label>
                    <label>Observações (prazo, entrega…)<textarea rows={2} value={cli.obs} onChange={muda("obs")} /></label>
                  </div>
                  <footer className="orc-r">
                    <p className="orc-tot">{total.toLocaleString("pt-BR")} peças em {itens.length} {itens.length === 1 ? "item" : "itens"}</p>
                    <button type="submit" className="bt"><Rola><IcWhats />Enviar orçamento no WhatsApp</Rola></button>
                    {enviado ? (
                      <p className="orc-ok" role="status">
                        {enviado.bloqueado ? "O navegador bloqueou a nova aba. " : "Abrimos o WhatsApp com o seu orçamento. "}
                        <a href={enviado.url} target="_blank" rel="noopener noreferrer">{enviado.bloqueado ? "Abrir o WhatsApp" : "Não abriu? Toque aqui"}</a>
                        {" "}ou ligue <a href={`tel:${FONES[0].tel}`}>{FONES[0].label}</a>.
                      </p>
                    ) : (
                      <p className="orc-nota">Abre o WhatsApp com a lista pronta. A equipe confirma preço, frete e prazo.</p>
                    )}
                    <button type="button" className="orc-limpar" onClick={limpar}>Limpar orçamento</button>
                  </footer>
                  </form>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
