"use client";
import BlocoIso from "./BlocoIso";
import { IcSeta, IcWhats } from "./Icone";
import Rola from "./Rola";
import { fotoPeca, furoDe, modulos, wa, type Item } from "@/lib/dados";

// Detalhe que abre dentro da própria linha do catálogo (sem janela por cima):
// desenho técnico com todos os dados, a lista de peças da família e os dois atalhos da compra.
export default function Familia({ it }: { it: Item }) {
  const tipo = it.fam === "Estrutural" ? "estrutural" : "de vedação";
  const temSimulador = modulos.some((m) => m.id === it.id);
  const tudo = wa(
    `Olá! Vim pelo site da Incargel e gostaria de uma cotação da linha ${tipo} ${it.linha}:\n\n` +
    it.pecas.map((p) => `• ${p.nome} ${p.dim} cm: ___ peças`).join("\n") +
    `\n\nCidade da obra: `
  );
  // o simulador escuta este aviso e já abre com a linha escolhida
  const calcular = () => window.dispatchEvent(new CustomEvent("incargel:linha", { detail: it.id }));

  return (
    <div className="lin-det">
      <div className="lin-tec">
        <div className="lin-iso"><BlocoIso dim={it.dim} cel={it.cel} furo={furoDe(it)} /></div>
      </div>

      <div className="lin-pecas">
        <h4>Família da linha {it.linha} <span className="mono">{it.pecas.length} peças</span></h4>
        <ul>
          {it.pecas.map((p) => (
            <li key={p.img}>
              <img src={fotoPeca(p.img)} alt={`${p.nome} ${p.dim} cm`} width={56} height={56} loading="lazy" decoding="async" />
              <div className="pc-nome">
                <b>{p.nome}</b>
                <span className="mono">{p.dim} cm</span>
              </div>
              {p.specs.length > 0 ? (
                <dl className="pc-d">{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="mono">{v}</dd></div>)}</dl>
              ) : (
                <span className="pc-d mono" aria-label="sem dados adicionais">—</span>
              )}
              <a className="card-z" target="_blank" rel="noopener noreferrer"
                href={wa(`Olá! Vim pelo site da Incargel e gostaria de uma cotação: ${p.nome.toLowerCase()} ${p.dim} cm (linha ${tipo} ${it.linha}).`)}
                aria-label={`Cotar ${p.nome} ${p.dim} cm no WhatsApp`}>
                <IcWhats size={15} />Cotar
              </a>
            </li>
          ))}
        </ul>
        <div className="lin-acoes">
          <a className="bt" target="_blank" rel="noopener noreferrer" href={tudo}><Rola><IcWhats />Cotar a linha inteira</Rola></a>
          {temSimulador && (
            <a className="bt ln" href="#paginacao" onClick={calcular}><Rola>Calcular parede com esta linha <IcSeta size={16} dir="baixo" /></Rola></a>
          )}
        </div>
      </div>
    </div>
  );
}
