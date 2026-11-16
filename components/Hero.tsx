import { IcWhats } from "./Icone";
import NotaCotacao from "./NotaCotacao";
import Rola from "./Rola";
import TopoBackground from "./TopoBackground";
import { wa } from "@/lib/dados";

// Primeira tela: curvas de nível vivas (Topo Background do KokonutUI) no fundo, lembrando o relevo da jazida;
// o conteúdo vem sempre por cima. Textos e foto são os mesmos de antes.
export default function Hero() {
  return (
    <section className="hero" id="topo">
      <TopoBackground className="hero-topo" interval={0.075} speed={0.8}>
        <div className="hero-in">
          <div className="hero-txt">
            <h1>Bloco que segura a obra.</h1>
            <p className="hero-lead">Blocos cerâmicos estruturais e de vedação, fabricados em Itu/SP há mais de 20 anos, em linha automatizada e forno túnel.</p>
            <p className="hero-norma"><span>ABNT NBR 15270 e 15575</span><span>Entrega em todo o Estado de SP</span></p>
            <div className="cta">
              <a className="bt" target="_blank" rel="noopener noreferrer"
                href={wa("Olá! Vim pelo site da Incargel e gostaria de uma cotação.")}><Rola><IcWhats />Cotar no WhatsApp</Rola></a>
              <a className="bt ln" href="#paginacao"><Rola>Calcular minha parede</Rola></a>
            </div>
            <NotaCotacao />
          </div>
          <figure className="hero-foto">
            <img src="/fabrica/blocos.webp" alt="Pilhas de blocos cerâmicos da Incargel prontos para a expedição" width={615} height={410} decoding="async" fetchPriority="high" />
            <figcaption>Blocos prontos para a expedição · Itu/SP</figcaption>
          </figure>
        </div>
      </TopoBackground>
    </section>
  );
}
