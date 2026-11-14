"use client";
import { useState } from "react";
import Familia from "./Familia";
import { IcSeta, IcWhats } from "./Icone";
import Rola from "./Rola";
import { fmt, fotoPeca, itens, totalPecas, wa, type Item } from "@/lib/dados";

type Fam = Item["fam"];
// Colunas fixas por grupo: cada coluna guarda sempre a mesma grandeza, na mesma unidade.
// Na vedação, "Rendimento" é o da parede na espessura do próprio bloco (a outra posição aparece no detalhe).
const COLUNAS: Record<Fam, { rot: string; pega: (it: Item) => string | undefined }[]> = {
  Estrutural: [
    { rot: "Resistência", pega: (it) => spec(it, "Resistência") },
    { rot: "Rendimento", pega: (it) => spec(it, "Rendimento") },
    { rot: "Peso por peça", pega: (it) => spec(it, "Peso") },
  ],
  Vedação: [
    { rot: "Rendimento", pega: (it) => spec(it, "Rendimento") ?? spec(it, "Parede") },
    { rot: "Peso por peça", pega: (it) => spec(it, "Peso") },
    { rot: "Carga aprox.", pega: (it) => spec(it, "Carga") },
  ],
};
function spec(it: Item, inicio: string) { return it.specs.find(([k]) => k.startsWith(inicio))?.[1]; }

// Uma linha da tabela: foto, medidas, as 3 colunas do grupo e a cotação. O detalhe abre ali mesmo.
function Linha({ it, aberta, alterna }: { it: Item; aberta: boolean; alterna: () => void }) {
  const nome = `${fmt(it.dim[0])} × ${it.dim[1]} × ${it.dim[2]}`;
  const tipo = it.fam === "Estrutural" ? "estrutural" : "de vedação";
  const cotar = wa(`Olá! Vim pelo site da Incargel e gostaria de uma cotação do bloco ${tipo} ${nome} cm (linha ${it.linha}).`);
  const idDet = `det-${it.id}`;
  return (
    <li className={`lin${aberta ? " aberta" : ""}`}>
      <div className="lin-row">
        <img className="lin-foto" src={fotoPeca(it.pecas[0].img)} alt={`Bloco ${tipo} ${nome} cm`} width={120} height={120} loading="lazy" decoding="async" />
        <div className="lin-nome">
          <span className="mono lin-cod">Linha {it.linha}</span>
          <h4 className="mono">{nome}<small>cm</small></h4>
        </div>
        <dl className="lin-d">
          {COLUNAS[it.fam].map((c) => <div key={c.rot}><dt>{c.rot}</dt><dd className="mono">{c.pega(it) ?? "—"}</dd></div>)}
        </dl>
        <div className="lin-a">
          <a className="bt bt-sm" href={cotar} target="_blank" rel="noopener noreferrer" aria-label={`Cotar o bloco ${nome} no WhatsApp`}><Rola><IcWhats size={16} />Cotar</Rola></a>
          <button type="button" className="lin-mais" onClick={alterna} aria-expanded={aberta} aria-controls={idDet}>
            {aberta ? "Fechar" : `Detalhes e ${it.pecas.length} peças`}
            <IcSeta size={14} dir={aberta ? "cima" : "baixo"} />
          </button>
        </div>
      </div>
      <div id={idDet} hidden={!aberta}>{aberta && <Familia it={it} />}</div>
    </li>
  );
}

export default function Catalogo() {
  const [aberta, setAberta] = useState<string | null>(null);
  const grupos = [
    { f: "Estrutural" as const, t: "Estruturais", s: "a própria parede sustenta a obra" },
    { f: "Vedação" as const, t: "Vedação", s: "a parede fecha os vãos entre vigas e pilares" },
  ];

  return (
    <section id="blocos" className="cat">
      <header className="cat-h">
        <h2>Escolha o bloco.</h2>
        <p className="cat-p">{itens.length} linhas e {totalPecas} peças, lado a lado. Compare os dados, cote direto ou abra a linha para ver o desenho técnico e todas as peças da família.</p>
      </header>

      {grupos.map((g) => {
        const lista = itens.filter((i) => i.fam === g.f);
        return (
          <div key={g.f} className="grupo">
            <h3 className="grupo-t">{g.t} <small>{lista.length} linhas · {g.s}</small></h3>
            {/* cabeçalho da planilha: as unidades aparecem uma vez, não em cada célula */}
            <div className="lin-head" aria-hidden>
              <span />
              <span>Linha e medidas</span>
              <span className="lin-head-d">{COLUNAS[g.f].map((c) => <span key={c.rot}>{c.rot}</span>)}</span>
              <span />
            </div>
            <ul className="tabela">
              {lista.map((it) => (
                <Linha key={it.id} it={it} aberta={aberta === it.id} alterna={() => setAberta(aberta === it.id ? null : it.id)} />
              ))}
            </ul>
          </div>
        );
      })}
      <p className="aviso">Imagens e dados da apresentação institucional da Incargel. Na vedação, o rendimento é o da parede na espessura do bloco; a outra posição está no detalhe da linha.</p>
    </section>
  );
}
