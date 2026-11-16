"use client";
import { useEffect, useRef, useState } from "react";
import { IcSeta } from "./Icone";

export type Foto = { p: string; g: string; alt: string; legenda?: string; w: number; h: number };

// Fotos e desenhos que abrem em tela cheia (para ler o desenho técnico ou ver a foto grande).
// <dialog> nativo: Esc fecha, o foco fica preso dentro, e ← → passam as fotos.
// `inicial`: quantas aparecem antes do "Ver todas"; `desenho`: miniaturas grandes, sem corte (desenhos técnicos).
export default function Galeria({ fotos, inicial, desenho = false, rotulo }: { fotos: Foto[]; inicial?: number; desenho?: boolean; rotulo: string }) {
  const [todas, setTodas] = useState(!inicial || inicial >= fotos.length);
  const [aberta, setAberta] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const visiveis = todas ? fotos : fotos.slice(0, inicial);

  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (aberta === null) { if (d.open) d.close(); return; }
    if (!d.open) d.showModal();
    const html = document.documentElement; const ov = html.style.overflow;
    html.style.overflow = "hidden";
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setAberta((i) => (i === null ? i : (i + 1) % fotos.length));
      if (e.key === "ArrowLeft") setAberta((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length));
    };
    window.addEventListener("keydown", tecla);
    return () => { html.style.overflow = ov; window.removeEventListener("keydown", tecla); };
  }, [aberta, fotos.length]);

  const f = aberta !== null ? fotos[aberta] : null;
  return (
    <>
      <ul className={`gal${desenho ? " gal-des" : ""}`} aria-label={rotulo}>
        {visiveis.map((x, i) => (
          <li key={x.g}>
            <button type="button" onClick={() => setAberta(i)} aria-label={`Ampliar: ${x.alt}`}>
              <img src={x.p} alt={x.alt} width={x.w} height={x.h} loading="lazy" decoding="async" />
            </button>
            {x.legenda && <p className="gal-leg">{x.legenda}</p>}
          </li>
        ))}
      </ul>
      {!todas && (
        <button type="button" className="bt ln gal-mais" onClick={() => setTodas(true)}>
          Ver todas as {fotos.length} fotos
        </button>
      )}
      <dialog ref={dlg} className="gal-dlg" data-lenis-prevent aria-label={f?.alt ?? rotulo}
        onClose={() => setAberta(null)} onClick={(e) => { if (e.target === e.currentTarget) setAberta(null); }}>
        {f && (
          <figure>
            <img src={f.g} alt={f.alt} />
            <figcaption>
              <span>{f.legenda ?? f.alt}</span>
              {fotos.length > 1 && <span className="mono">{String((aberta ?? 0) + 1).padStart(2, "0")} / {String(fotos.length).padStart(2, "0")}</span>}
            </figcaption>
          </figure>
        )}
        <button type="button" className="gal-x" onClick={() => setAberta(null)} aria-label="Fechar">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden><path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="2.2" /></svg>
        </button>
        {fotos.length > 1 && (
          <>
            <button type="button" className="gal-n ant" onClick={() => setAberta((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length))} aria-label="Foto anterior"><IcSeta size={18} dir="esq" /></button>
            <button type="button" className="gal-n prx" onClick={() => setAberta((i) => (i === null ? i : (i + 1) % fotos.length))} aria-label="Próxima foto"><IcSeta size={18} /></button>
          </>
        )}
      </dialog>
    </>
  );
}
