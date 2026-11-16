import Assenta from "./Assenta";
// Compromissos: afirmações grandes com o tijolinho, os selos de qualidade com as imagens oficiais
// e a dica em destaque tipográfico. Nada de papel imitado.
const dif = [
  ["Não atrasamos", "a sua entrega"],
  ["Produtos a", "pronta entrega"],
  ["Visitamos", "a sua obra"],
  ["Consultoria", "Incargel"],
  ["Desempenho", "ABNT NBR 15575"],
];

// Selos de qualidade: imagens e textos da página "Empresa" do site atual da Incargel
const selos = [
  {
    img: "/selos/acervir-florestal.webp", w: 182, h: 182, alt: "Selo Empresa Amiga da Natureza, ACERVIR Florestal, associado",
    t: "Selo “Empresa Amiga da Natureza”",
    d: "A Cerâmica Incargel se preocupa com a natureza e sabe que ter atitudes responsáveis e preocupação ecológica é fundamental. Pensando nisso, a Incargel mantém projetos permanentes junto à ACERVIR, de recuperação ambiental, aprovados pelos órgãos oficiais. Ainda, utiliza em seu forno túnel apenas matéria de reaproveitamento, resultante de sobras da indústria moveleira (serragem), impedindo assim que sejam descartadas inapropriadamente nos lixões comuns, gerando energia térmica e economizando outros combustíveis, como o gás e o óleo.",
  },
  {
    img: "/selos/premio-quality.webp", w: 137, h: 180, alt: "Medalha Prêmio Quality Brasil 2017",
    t: "Prêmio Quality",
    d: "Buscando a contínua excelência, a Cerâmica Incargel é certificada pelo Prêmio Quality, no segmento industrial/fabricação de produtos cerâmicos, pela excelente qualidade e tecnologia empregada em seus produtos, pelo respeito para com seus clientes, fornecedores e colaboradores.",
  },
  {
    img: "/selos/anicer.webp", w: 154, h: 102, alt: "Logotipo da ANICER, Associação Nacional da Indústria Cerâmica",
    t: "Nossas linhas atendem à norma de desempenho ABNT NBR 15575 e ABNT NBR 15270",
    d: "A ABNT NBR 15270 é a norma técnica de blocos cerâmicos que se dá pela verificação da existência de conformidade na determinação das características dimensionais, geométricas, de identificação (carimbo), físicas e mecânicas dos blocos cerâmicos de vedação.",
    d2: "A ABNT NBR 15575 estabelece parâmetros técnicos para vários requisitos importantes de uma edificação. Para que uma empresa consiga atingir esses requisitos de desempenho em seus produtos, são realizados diversos ensaios em laboratório; esses resultados são obtidos a partir de determinadas condições de execução do elemento construtivo (parede), as quais, quando reproduzidas em campo, visam atingir o resultado esperado.",
  },
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

      <div className="selos-q">
        <h3>Selos de qualidade</h3>
        <ul>
          {selos.map((x) => (
            <li key={x.t}>
              <div className="selo-img"><img src={x.img} alt={x.alt} width={x.w} height={x.h} loading="lazy" decoding="async" /></div>
              <div>
                <h4>{x.t}</h4>
                <p>{x.d}</p>
                {x.d2 && <p>{x.d2}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="comp-g">
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
