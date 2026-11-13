const dif = [
  ["Não atrasamos", "a sua entrega"],
  ["Produtos a", "pronta entrega"],
  ["Visitamos", "a sua obra"],
  ["Consultoria", "Incargel"],
  ["Desempenho", "ABNT NBR 15575"],
];

export default function Compromissos() {
  return (
    <section className="comp claro">
      <header>
        <span className="kick mono">Compromissos</span>
        <h2>O que você pode cobrar da gente.</h2>
      </header>
      <ol className="dif">
        {dif.map(([a, b], i) => (
          <li key={a}><b className="mono">{String(i + 1).padStart(2, "0")}</b><span>{a}<br /><em>{b}</em></span></li>
        ))}
      </ol>
      <div className="comp-g">
        <article>
          <h3>Selos e certificações</h3>
          <ul>
            <li>PSQ, Programa Setorial da Qualidade (Ministério das Cidades)</li>
            <li>Prêmio Quality, segmento industrial / fabricação de produtos cerâmicos</li>
            <li>Selo Empresa Amiga da Natureza, com projetos permanentes junto à ACERVIR</li>
            <li>Normas ABNT NBR 15270 e ABNT NBR 15575</li>
          </ul>
        </article>
        <article>
          <h3>Apoio técnico</h3>
          <p>Apoio técnico e treinamento de mão de obra para a sua equipe de obra, desde que os blocos sejam comprados com a Incargel. Blocos modulados permitem saber a quantidade exata de peças da obra.</p>
        </article>
        <article className="dica-box">
          <h3>Dica Incargel</h3>
          <p>Antes de comprar, confira se o bloco segue a portaria 127 do Inmetro: paredes externas com no mínimo 7 mm e internas com no mínimo 6 mm.</p>
          <p>Tijolo muito barato costuma ser menor, e aí você gasta mais peças, mais mão de obra e mais massa para fazer a mesma parede.</p>
        </article>
      </div>
    </section>
  );
}
