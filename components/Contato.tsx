"use client";
import { useState } from "react";
import { EMAIL, FONES, MAPS, wa } from "@/lib/dados";
import { IcWhats, IcSeta } from "./Icone";
import NotaCotacao from "./NotaCotacao";
import Marca from "./Marca";
import Rola from "./Rola";

export default function Contato() {
  // depois do envio: guarda o link para reabrir caso o navegador tenha bloqueado a nova aba
  const [enviado, setEnviado] = useState<{ url: string; bloqueado: boolean } | null>(null);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    // "required" aceita só espaços; aqui o campo precisa ter conteúdo de verdade
    for (const campo of ["nome", "tel", "cidade", "msg"]) {
      const el = form.elements.namedItem(campo) as HTMLInputElement | HTMLTextAreaElement;
      const vazio = !String(f.get(campo) ?? "").trim();
      el.setCustomValidity(vazio ? "Preencha este campo." : "");
    }
    if (!form.reportValidity()) return;
    const texto =
      `Olá! Vim pelo site da Incargel e gostaria de uma cotação.\n\n` +
      `Nome: ${String(f.get("nome")).trim()}\nTelefone: ${String(f.get("tel")).trim()}\nCidade: ${String(f.get("cidade")).trim()}\n\n${String(f.get("msg")).trim()}`;
    const url = wa(texto);
    const janela = window.open(url, "_blank", "noopener,noreferrer");
    setEnviado({ url, bloqueado: !janela });
  }
  // limpa o aviso de campo vazio assim que a pessoa volta a digitar
  const limpa = (e: React.FormEvent<HTMLFormElement>) => (e.target as HTMLInputElement).setCustomValidity?.("");

  return (
    <section id="contato" className="ct escuro">
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
        <form className="ct-f" onSubmit={enviar} onInput={limpa}>
          <label>Nome<input name="nome" required autoComplete="name" /></label>
          <label>Telefone<input name="tel" type="tel" inputMode="tel" required autoComplete="tel" /></label>
          <label>Cidade da obra<input name="cidade" required autoComplete="address-level2" /></label>
          <label>O que você precisa?<textarea name="msg" rows={4} required placeholder="Bloco, quantidade, prazo…" /></label>
          <button className="bt" type="submit"><Rola><IcWhats />Cotar no WhatsApp</Rola></button>
          {enviado ? (
            <p className="ct-ok" role="status">
              {enviado.bloqueado ? "O navegador bloqueou a nova aba. " : "Abrimos o WhatsApp numa nova aba com a sua mensagem. "}
              <a href={enviado.url} target="_blank" rel="noopener noreferrer">{enviado.bloqueado ? "Abrir o WhatsApp" : "Não abriu? Toque aqui"}</a>
              {" "}ou ligue <a href={`tel:${FONES[0].tel}`}>{FONES[0].label}</a>.
            </p>
          ) : (
            <NotaCotacao />
          )}
        </form>
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
            <a href="#contato">Contato</a>
          </nav>
          <a className="bt" target="_blank" rel="noopener noreferrer"
            href={wa("Olá! Vim pelo site da Incargel e gostaria de uma cotação.")}><Rola><IcWhats />Cotar no WhatsApp</Rola></a>
        </div>
        <p className="carimbo" aria-hidden>INCARGEL</p>
        <div className="rod-base"><span>© Incargel · Indústria de Cerâmica · Itu/SP</span><a href="#topo">Voltar ao topo <IcSeta size={12} dir="cima" /></a></div>
      </footer>
    </section>
  );
}
