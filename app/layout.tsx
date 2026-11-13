import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Incargel | Blocos cerâmicos estruturais e de vedação em Itu/SP",
  description: "Blocos cerâmicos estruturais e de vedação fabricados em Itu/SP, com entrega em todo o Estado de São Paulo. ABNT NBR 15270 e 15575.",
};
export const viewport: Viewport = { themeColor: "#15181A", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${mono.variable}`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
