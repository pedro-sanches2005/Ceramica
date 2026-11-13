import { Fragment } from "react";

// Revelar palavra por palavra: cada palavra sobe de dentro de uma "janela" com atraso próprio.
export default function Palavras({ texto, de = 0 }: { texto: string; de?: number }) {
  return (
    <>
      {texto.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="pw"><span style={{ "--i": de + i } as React.CSSProperties}>{w}</span></span>{" "}
        </Fragment>
      ))}
    </>
  );
}
