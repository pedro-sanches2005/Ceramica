// A comparação é um laudo de ensaio preso à carga: resultados datilografados numa grade,
// a fonte citada e as observações nos campos de baixo. Nenhum número maior que o título.
const itens = [
  { o: "Custo total da obra com alvenaria estrutural", v: "até 20% menor" },
  { o: "Água por m² de parede", v: "65% menos" },
  { o: "Gases de efeito estufa, bloco a bloco", v: "83% menos" },
  { o: "Gases de efeito estufa, parede pronta", v: "66% menos" },
  { o: "Recursos naturais não renováveis", v: "43% menos" },
];

const obs = [
  { t: "Forno movido a serragem", d: "O forno túnel queima só material de reaproveitamento: sobras da indústria moveleira que iriam para o lixão viram energia térmica, no lugar de gás e óleo." },
  { t: "Projetos com a ACERVIR", d: "A Incargel mantém projetos permanentes de recuperação ambiental com a ACERVIR, aprovados pelos órgãos oficiais. Daí o selo Empresa Amiga da Natureza." },
  { t: "Natural e reciclável", d: "Feito de terra, água, ar e fogo, sem aditivos insalubres." },
];

export default function Impacto() {
  return (
    <section className="imp">
      <h2>O que muda quando a parede é cerâmica</h2>
      <article className="laudo">
        <dl className="laudo-cab">
          <div><dt>Comparação</dt><dd className="mono">Bloco cerâmico × bloco de concreto</dd></div>
        </dl>
        <table className="laudo-t">
          <caption>Resultados</caption>
          <thead><tr><th scope="col">Item avaliado</th><th scope="col">Cerâmica</th></tr></thead>
          <tbody>
            {itens.map((x) => (
              <tr key={x.o}><th scope="row">{x.o}</th><td className="mono">{x.v}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="laudo-obs">
          {obs.map((x) => (
            <div key={x.t}>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
        <p className="laudo-fonte">Fonte: apresentação institucional da Incargel. O item de custo se refere à obra em alvenaria estrutural; os demais comparam com o bloco de concreto.</p>
      </article>
    </section>
  );
}
