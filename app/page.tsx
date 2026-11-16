import Hero from "@/components/Hero";
import Linha from "@/components/Linha";
import Catalogo from "@/components/Catalogo";
import Modulador from "@/components/Modulador";
import Impacto from "@/components/Impacto";
import Sistema from "@/components/Sistema";
import Tecnologia from "@/components/Tecnologia";
import Compromissos from "@/components/Compromissos";
import Contato from "@/components/Contato";
import Marca from "@/components/Marca";
import Menu from "@/components/Menu";
import Cotar from "@/components/Cotar";
import { OrcamentoProvider } from "@/lib/orcamento";
import Orcamento from "@/components/Orcamento";
import Privacidade from "@/components/Privacidade";
import FichaGoogle from "@/components/FichaGoogle";

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
          <a href="#sistema">Sistema construtivo</a>
          <a href="#tecnologia">Tecnologia</a>
          <a href="#contato">Contato</a>
        </nav>
        <Cotar className="bt bt-sm" curto icone={16} />
        <Menu />
      </header>
      <Hero />
      <Linha />
      <Catalogo />
      <Modulador />
      <Sistema />
      <Impacto />
      <Tecnologia />
      <Compromissos />
      <Contato />
      <Orcamento />
      <Privacidade />
      <FichaGoogle />
    </main>
    </OrcamentoProvider>
  );
}
