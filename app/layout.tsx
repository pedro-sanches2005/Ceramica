import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, Big_Shoulders_Stencil, Courier_Prime } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import RegistraApp from "@/components/RegistraApp";
import { SITE } from "@/lib/dados";

// Big Shoulders: títulos condensados, como marcação de carga. Stencil: a palavra estampada a spray.
// Courier Prime: os valores datilografados na etiqueta. Archivo: o texto corrido.
// só os pesos usados; stencil e Courier aparecem abaixo da primeira tela, então não atrasam o carregamento (preload: false)
const titulo = Big_Shoulders({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-titulo" });
const stencil = Big_Shoulders_Stencil({ subsets: ["latin"], weight: ["900"], variable: "--font-stencil", preload: false });
const texto = Archivo({ subsets: ["latin"], variable: "--font-texto" });
const tipo = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-tipo", preload: false });

// mesmas telas geradas por scripts/gerar-pwa.mjs (largura × altura em pontos, densidade)
const telas: [number, number, number][] = [
  [440, 956, 3], [402, 874, 3], [430, 932, 3], [393, 852, 3], [428, 926, 3], [390, 844, 3],
  [375, 812, 3], [414, 896, 3], [414, 896, 2], [375, 667, 2], [414, 736, 3], [320, 568, 2],
  [744, 1133, 2], [820, 1180, 2], [834, 1194, 2], [1024, 1366, 2],
];

const desc = "Blocos cerâmicos estruturais e de vedação fabricados em Itu/SP, com entrega em todo o Estado de São Paulo. ABNT NBR 15270 e 15575.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  // prévia do link no WhatsApp, Google e redes (public/og.png, 1200 × 630)
  openGraph: {
    type: "website", locale: "pt_BR", url: "/", siteName: "Incargel",
    title: "Incargel | Bloco que segura a obra",
    description: desc,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Incargel: bloco que segura a obra. Blocos cerâmicos estruturais e de vedação em Itu/SP" }],
  },
  twitter: { card: "summary_large_image", title: "Incargel | Bloco que segura a obra", description: desc, images: ["/og.png"] },
  title: "Incargel | Blocos cerâmicos estruturais e de vedação em Itu/SP",
  description: desc,
  applicationName: "Incargel",
  // ícone da aba (svg nítido + ico para navegadores antigos) e o do iPhone; declarar "icons" desliga o automático do Next
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "16x16 32x32 48x48" }],
    apple: [{ url: "/app/apple-touch-icon.png", sizes: "180x180" }],
  },
  // iPhone: abre em tela cheia pela Tela de Início, com a tela de abertura certa para cada aparelho
  appleWebApp: {
    capable: true,
    title: "Incargel",
    statusBarStyle: "default",
    startupImage: telas.map(([w, h, d]) => ({
      url: `/app/abertura-${w}x${h}@${d}.png`,
      media: `(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${d}) and (orientation: portrait)`,
    })),
  },
  // medidas como "14 × 19 × 29" não viram links de telefone no iPhone
  formatDetection: { telephone: false },
};
// width=device-width e escala 1 (padrão do Next); o zoom com os dedos continua liberado
export const viewport: Viewport = { themeColor: "#B4532C", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${titulo.variable} ${stencil.variable} ${texto.variable} ${tipo.variable}`}>
        <SmoothScroll />
        <RegistraApp />
        {children}
      </body>
    </html>
  );
}
