"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVENTO, lerConsentimento, salvarConsentimento } from "@/lib/consentimento";

// Aviso de privacidade ao abrir o site (aparece só até a pessoa escolher).
// "Personalizar" abre as categorias; a escolha fica guardada no navegador.
export default function Privacidade() {
  const [aberto, setAberto] = useState(false);
  const [detalhe, setDetalhe] = useState(false);
  const [pref, setPref] = useState(false);

  useEffect(() => {
    if (!lerConsentimento()) setAberto(true);
    // permite reabrir de outro lugar (ex.: link "Privacidade" no rodapé)
    const reabrir = () => { setPref(lerConsentimento()?.preferencias ?? false); setDetalhe(true); setAberto(true); };
    window.addEventListener("incargel:privacidade-abrir", reabrir);
    return () => window.removeEventListener("incargel:privacidade-abrir", reabrir);
  }, []);
  useEffect(() => {
    const f = () => setAberto(false);
    window.addEventListener(EVENTO, f);
    return () => window.removeEventListener(EVENTO, f);
  }, []);

  return (
    <AnimatePresence>
      {aberto && (
        <motion.section className="priv" role="dialog" aria-modal="false" aria-labelledby="priv-t" aria-describedby="priv-d"
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.6 } }}
          exit={{ y: "120%", opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}>
          <div className="priv-txt">
            <h2 id="priv-t">Sua privacidade na Incargel</h2>
            <p id="priv-d">Guardamos neste navegador o orçamento que você monta. Se você permitir, também lembramos seus dados de contato para não precisar digitar de novo. Não usamos medição de navegação.</p>
            {detalhe && (
              <div className="priv-cat">
                <label className="priv-op">
                  <input type="checkbox" checked disabled />
                  <span><b>Necessários</b>Orçamento em montagem. Sempre ativo.</span>
                </label>
                <label className="priv-op">
                  <input type="checkbox" checked={pref} onChange={(e) => setPref(e.target.checked)} />
                  <span><b>Preferências</b>Lembrar nome, telefone, e-mail e cidade do orçamento.</span>
                </label>
              </div>
            )}
          </div>
          <div className="priv-a">
            <button type="button" className="priv-b" onClick={() => salvarConsentimento(false)}>Somente necessários</button>
            {detalhe ? (
              <button type="button" className="priv-b" onClick={() => salvarConsentimento(pref)}>Salvar escolha</button>
            ) : (
              <button type="button" className="priv-b" onClick={() => setDetalhe(true)}>Personalizar</button>
            )}
            <button type="button" className="priv-b on" onClick={() => salvarConsentimento(true)}>Aceitar todos</button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
