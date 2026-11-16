import type { MetadataRoute } from "next";

// Manifesto do app: permite "Instalar app" no Android (Chrome/Samsung) e "Adicionar à Tela de Início" no iPhone.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Incargel · Blocos cerâmicos",
    short_name: "Incargel",
    description: "Blocos cerâmicos estruturais e de vedação fabricados em Itu/SP. Monte o orçamento e envie pelo WhatsApp.",
    lang: "pt-BR",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#EFE7D8",
    theme_color: "#B4532C",
    categories: ["business", "shopping"],
    icons: [
      { src: "/app/icone-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/app/icone-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/app/icone-mask-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/app/icone-mask-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Escolher blocos", short_name: "Blocos", url: "/#blocos", icons: [{ src: "/app/icone-192.png", sizes: "192x192" }] },
      { name: "Calcular parede", short_name: "Calcular", url: "/#paginacao", icons: [{ src: "/app/icone-192.png", sizes: "192x192" }] },
    ],
  };
}
