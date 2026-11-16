// Gera public/favicon.ico (16, 32 e 48 px) a partir de app/icon.svg, o mesmo desenho da aba.
// Alguns navegadores e leitores de link pedem /favicon.ico direto, mesmo com o icon.svg.
// Rodar de novo só se o ícone mudar:  node scripts/gerar-favicon.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svg = await readFile(path.join(raiz, "app", "icon.svg"));
const tamanhos = [16, 32, 48];
const pngs = await Promise.all(tamanhos.map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer()));

// ICO com PNG embutido: cabeçalho (6 bytes) + uma entrada de 16 bytes por tamanho + as imagens
const cab = Buffer.alloc(6); cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(pngs.length, 4);
let pos = 6 + 16 * pngs.length;
const entradas = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(tamanhos[i] % 256, 0); e.writeUInt8(tamanhos[i] % 256, 1);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8); e.writeUInt32LE(pos, 12);
  pos += png.length;
  return e;
});
await writeFile(path.join(raiz, "public", "favicon.ico"), Buffer.concat([cab, ...entradas, ...pngs]));
console.log("public/favicon.ico gerado");
