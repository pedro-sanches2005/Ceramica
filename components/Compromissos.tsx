import Assenta from "./Assenta";
// Compromissos: afirmações grandes com o visto, selos numa tabela com quem os concede
// e a dica em destaque tipográfico. Nada de papel imitado.
const dif = [
  ["Não atrasamos", "a sua entrega"],
  ["Produtos a", "pronta entrega"],
  ["Visitamos", "a sua obra"],
  ["Consultoria", "Incargel"],
  ["Desempenho", "ABNT NBR 15575"],
];

const selos = [
  { t: "PSQ", s: "Programa Setorial da Qualidade · Ministério das Cidades" },
  { t: "Prêmio Quality", s: "Segmento industrial / fabricação de produtos cerâmicos" },
  { t: "Empresa Amiga da Natureza", s: "Projetos permanentes junto à ACERVIR" },
  { t: "ABNT NBR 15270 e 15575", s: "Normas técnicas atendidas" },
];

export default function Compromissos() {
  return (
    <section className="comp">
      <h2>O que você pode cobrar da gente.</h2>
      <Assenta className="confere">
        {dif.map(([a, b], i) => (
          <li key={a} style={{ "--i": i } as React.CSSProperties}>
            {/* no lugar do ✓: a face do bloco, como peça conferida na carga */}
            <svg className="visto" viewBox="0 0 34 20" width="46" height="27" aria-hidden>
              <rect x="1" y="1" width="32" height="18" rx="1.5" fill="var(--brasa)" stroke="var(--tinta)" strokeWidth="2" />
              {[5, 12.5, 20, 27.5].map((x) => <rect key={x} x={x - 2.2} y="5" width="4.4" height="10" rx=".8" fill="var(--tinta)" opacity=".75" />)}
            </svg>
            <span>{a} {b}</span>
          </li>
        ))}
      </Assenta>

      <div className="comp-g">
        <div>
          <h3>Selos e certificações</h3>
          <dl className="selos">
            {selos.map((x) => <div key={x.t}><dt>{x.t}</dt><dd>{x.s}</dd></div>)}
          </dl>
        </div>
        <div>
          <h3>Apoio técnico</h3>
          <p>Apoio técnico e treinamento de mão de obra para a sua equipe de obra, desde que os blocos sejam comprados com a Incargel. Blocos modulados permitem saber a quantidade exata de peças da obra.</p>
        </div>
        <aside className="dica">
          <h3>Dica Incargel</h3>
          <p className="dica-l">Antes de comprar, confira se o bloco segue a portaria 127 do Inmetro: paredes externas com no mínimo 7 mm e internas com no mínimo 6 mm.</p>
          <p>Tijolo muito barato costuma ser menor, e aí você gasta mais peças, mais mão de obra e mais massa para fazer a mesma parede.</p>
        </aside>
      </div>
    </section>
  );
}
