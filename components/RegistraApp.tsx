"use client";
import { useEffect } from "react";

// Registra o service worker só em produção (no "npm run dev" ele atrapalharia o recarregamento).
export default function RegistraApp() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const registrar = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    // depois do carregamento, para não disputar banda com a primeira tela
    if (document.readyState === "complete") registrar();
    else window.addEventListener("load", registrar, { once: true });
  }, []);
  return null;
}
