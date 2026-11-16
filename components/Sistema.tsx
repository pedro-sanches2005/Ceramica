import Galeria, { type Foto } from "./Galeria";

// Sistema construtivo (conteúdo e desenhos da página incargel.com.br/sistema-construtivo).
// Os dois desenhos técnicos abrem em tela cheia para dar para ler as cotas e os nomes das peças.
const desenhos: Foto[] = [
  {
    p: "/sistema/modulacao-primeira-fiada.webp", g: "/sistema/modulacao-primeira-fiada.webp", w: 1160, h: 521,
    alt: "Modulação da primeira fiada utilizando o bloco 14 × 19 × 29: casa em perspectiva e planta com a posição de cada bloco",
    legenda: "Modulação da primeira fiada · bloco 14 × 19 × 29",
  },
  {
    p: "/sistema/detalhes-construtivos.webp", g: "/sistema/detalhes-construtivos.webp", w: 1000, h: 618,
    alt: "Detalhes construtivos com o bloco 14 × 19 × 29: graute, canaleta J e apoio para laje, bloco hidráulico, verga e contraverga e amarrações",
    legenda: "Detalhes construtivos · bloco 14 × 19 × 29",
  },
];

export default function Sistema() {
  return (
    <section id="sistema" className="sis">
      <header className="sis-h">
        <h2>Sistema construtivo</h2>
        <p className="sis-sub">Blocos estruturais</p>
        <ul className="sis-frases">
          <li>O futuro da construção já começou.</li>
          <li>A tecnologia Incargel não tem limitações.</li>
        </ul>
        <p>A Cerâmica Incargel possui forno túnel de última geração, permitindo os mais elevados índices de eficiência, produtividade, homogeneidade e qualidade, colocando a Incargel à frente no desenvolvimento de produtos diferenciados para atender as necessidades atuais e futuras do mercado.</p>
      </header>
      <Galeria fotos={desenhos} desenho rotulo="Desenhos do sistema construtivo" />
      <p className="aviso">Toque no desenho para ampliar.</p>
    </section>
  );
}
