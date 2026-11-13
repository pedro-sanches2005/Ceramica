"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

function Num({ to, pre = "" }: { to: number; pre?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const vis = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!vis) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [vis, to]);
  return <span ref={ref}>{pre}{v}%</span>;
}

const nums = [
  { to: 20, pre: "até ", t: "de redução no custo total da obra com alvenaria estrutural" },
  { to: 65, t: "menos água por m² de parede do que o bloco de concreto" },
  { to: 83, t: "menos gases de efeito estufa que os blocos de concreto" },
  { to: 43, t: "menos recursos naturais não renováveis que os blocos de concreto" },
];

export default function Impacto() {
  return (
    <section className="imp">
      <header>
        <span className="kick mono">Por que cerâmica</span>
        <h2>Obra mais econômica.<br />Parede mais leve para o planeta.</h2>
      </header>
      <div className="imp-g">
        {nums.map((n) => (
          <div key={n.to}><b><Num to={n.to} pre={n.pre} /></b><p>{n.t}</p></div>
        ))}
      </div>
      <div className="nat">
        <article>
          <h3>Forno movido a serragem</h3>
          <p>O forno túnel queima só material de reaproveitamento: sobras da indústria moveleira que iriam para o lixão viram energia térmica, no lugar de gás e óleo.</p>
        </article>
        <article>
          <h3>Projetos com a ACERVIR</h3>
          <p>A Incargel mantém projetos permanentes de recuperação ambiental com a ACERVIR, aprovados pelos órgãos oficiais. Daí o selo Empresa Amiga da Natureza.</p>
        </article>
        <article>
          <h3>100% natural e reciclável</h3>
          <p>Feito de terra, água, ar e fogo, sem aditivos insalubres. E, comparadas às de concreto, as paredes cerâmicas têm impacto 66% menor na emissão de gases de efeito estufa.</p>
        </article>
      </div>
      <p className="aviso mono">Números da apresentação institucional da Incargel.</p>
    </section>
  );
}
