// Service worker da Incargel: abre na hora quem volta ao site e mantém a página funcionando sem sinal
// (canteiro de obra costuma ter internet fraca). Troque VERSAO para descartar o cache antigo.
const VERSAO = "incargel-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(["/"])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // WhatsApp, mapas etc. passam direto

  // Página: sempre tenta a rede (conteúdo novo); sem sinal, usa a última cópia salva.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((r) => { const copia = r.clone(); caches.open(VERSAO).then((c) => c.put("/", copia)); return r; })
        .catch(() => caches.match("/"))
    );
    return;
  }

  // Arquivos com nome versionado (JS, CSS, fontes) e imagens: cache primeiro, rede se faltar.
  if (/^\/(_next\/static|pecas|fabrica|app)\//.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((r) => {
        if (r.ok) { const copia = r.clone(); caches.open(VERSAO).then((c) => c.put(req, copia)); }
        return r;
      }))
    );
  }
});
