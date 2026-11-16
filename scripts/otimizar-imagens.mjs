// Gera versões WebP das imagens do site (os originais PNG/JPG continuam na pasta, intactos).
// Rodar de novo sempre que trocar ou adicionar uma imagem:  node scripts/otimizar-imagens.mjs
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const kb = (n) => `${Math.round(n / 1024)} KB`;
let antes = 0, depois = 0;

async function converter(pasta, { largura, qualidade, alfa }) {
  const dir = path.join(raiz, pasta);
  for (const nome of await readdir(dir)) {
    if (!/\.(png|jpe?g)$/i.test(nome)) continue;
    const origem = path.join(dir, nome);
    const destino = origem.replace(/\.(png|jpe?g)$/i, ".webp");
    await sharp(origem)
      .resize({ width: largura, withoutEnlargement: true }) // nunca amplia
      .webp({ quality: qualidade, alphaQuality: alfa ? 90 : undefined, effort: 6, smartSubsample: true })
      .toFile(destino);
    const a = (await stat(origem)).size, d = (await stat(destino)).size;
    antes += a; depois += d;
  }
}

// recortes das peças: aparecem a no máximo ~210 px de largura → 420 px cobre telas de alta densidade
await converter("pecas", { largura: 420, qualidade: 80, alfa: true });
// fotos da fábrica: já são 615 px; só recomprime
await converter("fabrica", { largura: 615, qualidade: 78, alfa: false });
console.log(`antes ${kb(antes)} → depois ${kb(depois)} (${Math.round((1 - depois / antes) * 100)}% menor)`);
