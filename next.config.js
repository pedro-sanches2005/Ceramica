/** @type {import("next").NextConfig} */
module.exports = {
  // permite gerar a build de produção numa pasta separada (ex.: NEXT_DIST_DIR=.next-prod) sem mexer no "npm run dev"
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  compress: true,
  async headers() {
    // imagens e fontes mudam de nome quando mudam: podem ficar em cache por 1 ano no navegador e na CDN
    return [
      { source: "/pecas/:f*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/fabrica/:f*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/app/:f*", headers: [{ key: "Cache-Control", value: "public, max-age=604800" }] },
      // o service worker nunca fica em cache: assim uma versão nova do site chega na próxima visita
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Content-Type", value: "application/javascript; charset=utf-8" }] },
    ];
  },
};
