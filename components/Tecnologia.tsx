import Galeria, { type Foto } from "./Galeria";

// Tecnologia (conteúdo, fotos e galeria da página incargel.com.br/tecnologia).
const itens = [
  "Queima com domínio total da temperatura, assegurando uniformidade na queima, no padrão dimensional e resistência de seus produtos.",
  "Linha de produção totalmente automatizada, com tecnologia europeia (centro mais avançado em cerâmica do mundo), assegurando o domínio da qualidade do produto final.",
  "Laboratório altamente equipado.",
  "Jazidas de matérias-primas de alta qualidade.",
  "Produtos em conformidade com ABNT NBR 15575 e ABNT NBR 15270.",
  "Na Cerâmica Incargel todas as etapas são controladas cuidadosamente, desde a preparação da matéria-prima, passando pela produção, secagem, fornos para queima, carregamento e entrega.",
];

// as 28 fotos da galeria do site atual, na mesma ordem
const descr = [
  "Blocos crus nas prateleiras de secagem", "Painel da extrusora na linha de produção", "Blocos saindo da linha de produção",
  "Blocos na esteira da linha", "Pilhas de blocos prontos no galpão", "Galpão de produção", "Máquina de corte dos blocos",
  "Blocos na esteira de corte", "Equipamentos da linha de produção", "Vagonetas carregadas na entrada do forno túnel",
  "Blocos empilhados no forno túnel", "Robôs na linha automatizada", "Robô empilhando blocos", "Linha de corte e transporte",
  "Painel de controle da produção", "Sala de controle da fábrica", "Robô industrial empilhando blocos", "Robô empilhador na linha",
  "Robô ao lado das pilhas de blocos", "Robô na linha de produção", "Linha de produção automatizada", "Blocos na linha de produção",
  "Vista da linha de produção", "Galpão com a linha automatizada", "Laboratório da Incargel", "Ensaio de blocos no laboratório",
  "Medição de bloco com paquímetro no laboratório", "Vista aérea da fábrica da Incargel em Itu",
];
const galeria: Foto[] = descr.map((alt, i) => ({ p: `/tecnologia/galeria/foto-${i + 1}-p.webp`, g: `/tecnologia/galeria/foto-${i + 1}.webp`, alt, w: 320, h: 213 }));

export default function Tecnologia() {
  return (
    <section id="tecnologia" className="tec">
      <div className="tec-in">
        <div className="tec-txt">
          <h2>Tecnologia</h2>
          <h3>A tecnologia de classe mundial da Cerâmica Incargel</h3>
          <p>A Cerâmica Incargel possui forno túnel de última geração, permitindo os mais elevados índices de eficiência, produtividade, homogeneidade e qualidade, colocando a Incargel à frente no desenvolvimento de produtos diferenciados para atender as necessidades atuais e futuras do mercado.</p>
          <p className="tec-l">Em tecnologia a Incargel sempre está um passo à frente.</p>
        </div>
        <figure className="tec-foto">
          <img src="/tecnologia/producao.webp" alt="Produção de blocos cerâmicos na fábrica da Incargel" width={538} height={409} loading="lazy" decoding="async" />
        </figure>
      </div>
      <div className="tec-in inv">
        <figure className="tec-foto">
          <img src="/tecnologia/robos.webp" alt="Robô industrial na linha automatizada da Incargel" width={538} height={409} loading="lazy" decoding="async" />
        </figure>
        <div className="tec-txt">
          <h3>Robôs que aumentam a produtividade e a qualidade</h3>
          <ul className="tec-lista">{itens.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
      <Galeria fotos={galeria} inicial={8} rotulo="Galeria de fotos da fábrica" />
    </section>
  );
}
