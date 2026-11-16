import Hero from "@/components/Hero";
import Linha from "@/components/Linha";
import Catalogo from "@/components/Catalogo";
import Modulador from "@/components/Modulador";
import Impacto from "@/components/Impacto";
import Compromissos from "@/components/Compromissos";
import Contato from "@/components/Contato";
import Marca from "@/components/Marca";
import Menu from "@/components/Menu";
import { IcWhats } from "@/components/Icone";
import Rola from "@/components/Rola";
import { wa } from "@/lib/dados";
import { OrcamentoProvider } from "@/lib/orcamento";
import Orcamento from "@/components/Orcamento";
import Privacidade from "@/components/Privacidade";

export default function Home() {
  return (
    <OrcamentoProvider>
    <main>
      <header className="top">
        <a className="marca" href="#topo" aria-label="Incargel, início">
          <Marca />
          <span>INCARGEL<small>Indústria de cerâmica · Itu/SP</small></span>
        </a>
        <nav className="nav-d" aria-label="Seções">
          <a href="#processo">Fábrica</a>
          <a href="#blocos">Blocos</a>
          <a href="#paginacao">Calcular parede</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="bt bt-sm" target="_blank" rel="noopener noreferrer" aria-label="Cotar no WhatsApp"
          href={wa("Olá! Vim pelo site da Incargel e gostaria de uma cotação.")}><Rola><IcWhats size={16} />Cotar</Rola></a>
        <Menu />
      </header>
      <Hero />
      <Linha />
      <Catalogo />
      <Modulador />
      <Impacto />
      <Compromissos />
      <Contato />
      <Orcamento />
      <Privacidade />
    </main>
    </OrcamentoProvider>
  );
}
