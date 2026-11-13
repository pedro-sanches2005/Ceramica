"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import BlocoIso from "./BlocoIso";
import Palavras from "./Palavras";
import GuiaRolagem from "./GuiaRolagem";
import { useCelular } from "@/lib/useCelular";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const cel = useCelular();
  const reduz = useReducedMotion() || cel; // no celular o bloco já aparece pronto, sem cena de rolagem
  const { scrollYProgress: sp } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const prof = useTransform(sp, [0.03, 0.72], [0.02, 1]);
  const a = useTransform(sp, [0.28, 0.38], [0, 1]);
  const b = useTransform(sp, [0.48, 0.58], [0, 1]);
  const c = useTransform(sp, [0.66, 0.76], [0, 1]);
  const guia = useTransform(sp, [0, 0.78], [0, 1]); // o bloco fica completo por volta de 78%

  return (
    <div ref={ref} className="hero-wrap" id="topo">
      <section className="hero">
        <div className="hero-in">
          <div className="hero-txt">
            <span className="kick mono">Cerâmica · Itu/SP · há mais de 20 anos</span>
            <h1><Palavras texto="Bloco que" /><br /><em><Palavras texto="segura a obra." de={2} /></em></h1>
            <p>Blocos cerâmicos estruturais e de vedação, fabricados em linha automatizada e forno túnel, conforme as normas ABNT NBR 15270 e 15575.</p>
            <div className="cta">
              <a className="bt" href="#blocos">Ver os blocos</a>
              <a className="bt ln" href="#paginacao">Paginar minha parede</a>
            </div>
          </div>
          <div className="hero-art">
            <BlocoIso dim={[14, 19, 29]} cel={[3, 3]} prof={reduz ? undefined : prof} />
            <div className="leituras mono">
              <motion.span style={{ opacity: reduz ? 1 : a }}>14 × 19 × 29 cm</motion.span>
              <motion.span style={{ opacity: reduz ? 1 : b }}>6 MPa</motion.span>
              <motion.span style={{ opacity: reduz ? 1 : c }}>16,5 pçs/m²</motion.span>
            </div>
          </div>
        </div>
        {!reduz && <GuiaRolagem p={guia} texto="Role para montar o bloco" />}
      </section>
    </div>
  );
}
