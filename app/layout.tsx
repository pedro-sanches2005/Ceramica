import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, Big_Shoulders_Stencil, Courier_Prime } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Big Shoulders: títulos condensados, como marcação de carga. Stencil: a palavra estampada a spray.
// Courier Prime: os valores datilografados na etiqueta. Archivo: o texto corrido.
const titulo = Big_Shoulders({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--font-titulo" });
const stencil = Big_Shoulders_Stencil({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-stencil" });
const texto = Archivo({ subsets: ["latin"], variable: "--font-texto" });
const tipo = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-tipo" });

export const metadata: Metadata = {
  title: "Incargel | Blocos cerâmicos estruturais e de vedação em Itu/SP",
  description: "Blocos cerâmicos estruturais e de vedação fabricados em Itu/SP, com entrega em todo o Estado de São Paulo. ABNT NBR 15270 e 15575.",
};
export const viewport: Viewport = { themeColor: "#B4532C", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${titulo.variable} ${stencil.variable} ${texto.variable} ${tipo.variable}`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
