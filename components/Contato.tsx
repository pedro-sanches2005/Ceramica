"use client";
import { EMAIL, FONES, MAPS, wa } from "@/lib/dados";

export default function Contato() {
  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const texto =
      `Olá! Vim pelo site da Incargel e gostaria de uma cotação.\n\n` +
      `Nome: ${f.get("nome")}\nTelefone: ${f.get("tel")}\nCidade: ${f.get("cidade")}\n\n${f.get("msg")}`;
    window.open(wa(texto), "_blank", "noopener,noreferrer");
  }
  return (
    <section id="contato" className="ct">
      <div className="ct-in">
        <div>
          <span className="kick mono">Contato</span>
          <h2>Vamos orçar<br />a sua obra?</h2>
          <p className="ct-p">Entregamos em todo o Estado de São Paulo (frete sob consulta).</p>
          <dl className="ct-d mono">
            <div><dt>Telefones</dt><dd>{FONES.map((f) => <a key={f.tel} href={`tel:${f.tel}`}>{f.label}</a>)}</dd></div>
            <div><dt>E-mail</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt>Atendimento</dt><dd>Segunda a sexta, 7h30 às 18h<br />Sábado, 7h30 às 12h</dd></div>
            <div><dt>Endereço</dt><dd>Estrada do Jacú, s/n · Bairro Itaim<br />Itu/SP · CEP 13.310-220<br /><a href={MAPS} target="_blank" rel="noopener noreferrer">Abrir no mapa ↗</a></dd></div>
          </dl>
        </div>
        <form className="ct-f" onSubmit={enviar}>
          <label>Nome<input name="nome" required autoComplete="name" /></label>
          <label>Telefone<input name="tel" type="tel" inputMode="tel" required autoComplete="tel" /></label>
          <label>Cidade<input name="cidade" required autoComplete="address-level2" /></label>
          <label>O que você precisa?<textarea name="msg" rows={4} required placeholder="Bloco, quantidade, prazo…" /></label>
          <button className="bt" type="submit">Enviar pelo WhatsApp</button>
        </form>
      </div>
      <footer className="rod mono"><span>© Incargel · Indústria de Cerâmica · Itu/SP</span><a href="#topo">Voltar ao topo ↑</a></footer>
    </section>
  );
}
