import Hero from "@/components/Hero";
import Linha from "@/components/Linha";
import Catalogo from "@/components/Catalogo";
import Modulador from "@/components/Modulador";
import Impacto from "@/components/Impacto";
import Compromissos from "@/components/Compromissos";
import Contato from "@/components/Contato";
import Marca from "@/components/Marca";
import Menu from "@/components/Menu";
import { wa } from "@/lib/dados";

export default function Home() {
  return (
    <main>
      <header className="top">
        <a className="marca" href="#topo" aria-label="Incargel, início">
          <Marca />
          <span>INCARGEL<small className="mono">Indústria de cerâmica</small></span>
        </a>
        <nav aria-label="Seções">
          <a href="#processo">Fábrica</a>
          <a href="#blocos">Blocos</a>
          <a href="#paginacao">Paginação</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="bt bt-sm" target="_blank" rel="noopener noreferrer"
          href={wa("Olá! Vim pelo site da Incargel e gostaria de uma cotação.")}>Cotação</a>
        <Menu />
      </header>
      <Hero />
      <Linha />
      <Catalogo />
      <Modulador />
      <Impacto />
      <Compromissos />
      <Contato />
    </main>
  );
}
