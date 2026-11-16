"use client";
import { useState } from "react";
import { EMAIL, FONES, MAPS, wa } from "@/lib/dados";
import { AVISO_TEL, AVISO_VAZIO, EXEMPLO_TEL, linhasItens, telValido, useOrcamento } from "@/lib/orcamento";
import Cotar from "./Cotar";
import { IcWhats, IcSeta } from "./Icone";
import NotaCotacao from "./NotaCotacao";
import Marca from "./Marca";
import Rola from "./Rola";
import { FurosFundo } from "./Fundos";

export default function Contato() {
  const { itens, abrir } = useOrcamento();
  // depois do envio: guarda o link para reabrir caso o navegador tenha bloqueado a nova aba
  const [enviado, setEnviado] = useState<{ url: string; bloqueado: boolean } | null>(null);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    // "required" aceita só espaços; aqui o campo precisa ter conteúdo de verdade
    // com peças no orçamento, a lista já diz o que a pessoa precisa: a mensagem vira opcional
    for (const campo of ["nome", "tel", "cidade", "msg"] as const) {
      const el = form.elements.namedItem(campo) as HTMLInputElement | HTMLTextAreaElement;
      const valor = String(f.get(campo) ?? "").trim();
      const exigido = campo !== "msg" || itens.length === 0;
      el.setCustomValidity(exigido && !valor ? AVISO_VAZIO[campo] : campo === "tel" && !telValido(valor) ? AVISO_TEL : "");
    }
    if (!form.reportValidity()) return;
    const msg = String(f.get("msg")).trim();
    const texto =
      `Olá! Vim pelo site da Incargel e gostaria de uma cotação.\n\n` +
      `Nome: ${String(f.get("nome")).trim()}\nTelefone: ${String(f.get("tel")).trim()}\nCidade: ${String(f.get("cidade")).trim()}` +
      (itens.length ? `\n\n${linhasItens(itens).join("\n")}` : "") +
      (msg ? `\n\n${msg}` : "");
    const url = wa(texto);
    const janela = window.open(url, "_blank", "noopener,noreferrer");
    setEnviado({ url, bloqueado: !janela });
  }
  // limpa o aviso de campo vazio assim que a pessoa volta a digitar
  const limpa = (e: React.FormEvent<HTMLFormElement>) => (e.target as HTMLInputElement).setCustomValidity?.("");

  return (
    <section id="contato" className="ct escuro">
      {/* faces do bloco com os furos cobrindo a seção inteira, do topo ao rodapé; o conteúdo fica por cima */}
      <FurosFundo />
      <div className="df ct-pontos">
      <div className="ct-in">
        <div>
          <h2>Vamos orçar<br />a sua obra?</h2>
          <p className="ct-p">Entregamos em todo o Estado de São Paulo (frete sob consulta).</p>
          <dl className="ct-d">
            <div><dt>Telefones</dt><dd>{FONES.map((f) => <a key={f.tel} href={`tel:${f.tel}`}>{f.label}</a>)}</dd></div>
            <div><dt>E-mail</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt>Atendimento</dt><dd>Segunda a sexta, 7h30 às 18h<br />Sábado, 7h30 às 12h</dd></div>
            <div><dt>Endereço</dt><dd>Estrada do Jacú, s/n · Bairro Itaim<br />Itu/SP · CEP 13.310-220<br /><a href={MAPS} target="_blank" rel="noopener noreferrer">Abrir no mapa <IcSeta size={12} className="ic-diag" /></a></dd></div>
          </dl>
        </div>
        {itens.length > 0 ? (
          // com peças escolhidas, o envio é um só: o painel do orçamento (nada de segundo formulário com outras regras)
          <div className="ct-f ct-resumo">
            <p className="ct-lista">Sua lista de peças ({itens.length} {itens.length === 1 ? "item" : "itens"})</p>
            <ul>
              {itens.map((i) => (
                <li key={i.id}><b className="mono">{i.qtd.toLocaleString("pt-BR")}</b> {i.nome} <span className="mono">{i.dim} cm · linha {i.linha}</span></li>
              ))}
            </ul>
            <button type="button" className="bt" onClick={abrir}><Rola><IcWhats />Revisar e enviar</Rola></button>
            <NotaCotacao />
          </div>
        ) : (
          // noValidate: quem valida é o enviar(), com a mensagem certa para cada campo
          <form className="ct-f" onSubmit={enviar} onInput={limpa} noValidate>
            <label>Nome<input name="nome" required autoComplete="name" /></label>
            <label>Telefone / WhatsApp<input name="tel" type="tel" inputMode="tel" required autoComplete="tel" placeholder={EXEMPLO_TEL} /></label>
            <label>Cidade da obra<input name="cidade" required autoComplete="address-level2" /></label>
            <label>O que você precisa?<textarea name="msg" rows={4} required placeholder="Bloco, quantidade, prazo…" /></label>
            <button className="bt" type="submit"><Rola><IcWhats />Cotar no WhatsApp</Rola></button>
            {enviado ? (
              <p className="ct-ok" role="status">
                {enviado.bloqueado ? "O navegador bloqueou a nova aba. " : "Abrimos o WhatsApp com a sua mensagem. Toque em enviar lá para a equipe receber. "}
                <a href={enviado.url} target="_blank" rel="noopener noreferrer">{enviado.bloqueado ? "Abrir o WhatsApp" : "Não abriu? Toque aqui"}</a>
                {" "}ou ligue <a href={`tel:${FONES[0].tel}`}>{FONES[0].label}</a>.
              </p>
            ) : (
              <NotaCotacao />
            )}
          </form>
        )}
      </div>
      </div>
      {/* rodapé: marca, navegação e cotação; a palavra INCARGEL em estêncil fecha a página como o nome na lateral da carga */}
      <footer className="rod">
        <div className="rod-top">
          <a className="rod-marca" href="#topo" aria-label="Incargel, início">
            <Marca size={42} />
            <span>INCARGEL<small>Indústria de cerâmica · Itu/SP</small></span>
          </a>
          <nav className="rod-nav" aria-label="Rodapé">
            <a href="#processo">Fábrica</a>
            <a href="#blocos">Blocos</a>
            <a href="#paginacao">Calcular parede</a>
            <a href="#sistema">Sistema construtivo</a>
            <a href="#tecnologia">Tecnologia</a>
            <a href="#contato">Contato</a>
          </nav>
          <Cotar />
        </div>
        <p className="carimbo" aria-hidden>INCARGEL</p>
        <div className="rod-base"><span>© Incargel · Indústria de Cerâmica · Itu/SP · <button type="button" className="rod-priv" onClick={() => window.dispatchEvent(new Event("incargel:privacidade-abrir"))}>Privacidade</button></span><a href="#topo">Voltar ao topo <IcSeta size={12} dir="cima" /></a></div>
      </footer>
    </section>
  );
}
