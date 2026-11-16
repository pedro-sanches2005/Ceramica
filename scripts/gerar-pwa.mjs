// Gera os ícones do app (Android/iPhone) e as telas de abertura do iPhone a partir do símbolo da marca
// (o mesmo desenho do components/Marca.tsx, sobre o cal da página).
// Rodar de novo só se o símbolo mudar:  node scripts/gerar-pwa.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const dir = path.join(pub, "app");
await mkdir(dir, { recursive: true });

const CAL = "#EFE7D8", BRASA = "#C9622F", BRASA2 = "#E08A55";

// fundo cheio + símbolo centralizado ocupando `escala` da largura do quadro
function svg(w, h, escala) {
  const mw = w * escala, mh = (mw * 26) / 40, x = (w - mw) / 2, y = (h - mh) / 2, k = mw / 40;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${CAL}"/>
  <g transform="translate(${x} ${y}) scale(${k})">
    <rect x="0" y="9" width="9" height="7" rx="2" fill="${BRASA2}" opacity=".55"/>
    <rect x="27" y="1" width="10" height="7" rx="2" fill="${BRASA2}" opacity=".55"/>
    <rect x="31" y="17" width="9" height="7" rx="2" fill="${BRASA2}" opacity=".55"/>
    <rect x="4" y="3" width="32" height="20" rx="5" fill="${BRASA2}" opacity=".7"/>
    <rect x="8" y="6" width="24" height="14" rx="4" fill="${BRASA}"/>
  </g></svg>`);
}
const png = (nome, w, h, escala) => sharp(svg(w, h, escala)).png({ compressionLevel: 9 }).toFile(path.join(dir, nome));

// Android: ícone comum ("any") e o recortável ("maskable": o sistema corta em círculo/gota,
// então o símbolo fica dentro dos 80% centrais, a zona segura)
for (const s of [192, 512]) {
  await png(`icone-${s}.png`, s, s, 0.7);
  await png(`icone-mask-${s}.png`, s, s, 0.56);
}
// iPhone/iPad: 180 px, quadrado cheio (o iOS arredonda os cantos sozinho)
await png("apple-touch-icon.png", 180, 180, 0.7);

// Telas de abertura do iPhone/iPad (largura × altura em pontos CSS, densidade)
export const telas = [
  [440, 956, 3], [402, 874, 3], // 16 Pro Max, 16 Pro
  [430, 932, 3], [393, 852, 3], // 14/15 Pro Max e Plus, 14/15/16 Pro e 15/16
  [428, 926, 3], [390, 844, 3], // 12/13/14 Pro Max e Plus, 12/13/14
  [375, 812, 3], [414, 896, 3], // X/XS/11 Pro/mini, XS Max/11 Pro Max
  [414, 896, 2], [375, 667, 2], // XR/11, SE 2/3 e 6/7/8
  [414, 736, 3], [320, 568, 2], // 6/7/8 Plus, SE 1
  [744, 1133, 2], [820, 1180, 2], [834, 1194, 2], [1024, 1366, 2], // iPads
];
for (const [w, h, d] of telas) await png(`abertura-${w}x${h}@${d}.png`, w * d, h * d, Math.min(0.32, 160 / w));
console.log(`ícones e ${telas.length} telas de abertura gerados em public/app`);
