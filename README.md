# Incargel — Landing page

Landing page da Incargel (blocos cerâmicos estruturais e de vedação, Itu/SP).
Next.js 15 (App Router) + React 19 + TypeScript + Framer Motion + Lenis.

## Rodar localmente

Requer Node.js 18.18+ (testado com Node 24).

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

## Estrutura

```
ceramica-incargel/
├── app/
│   ├── layout.tsx      # HTML raiz, fontes (Archivo, IBM Plex Mono), metadados/SEO
│   ├── page.tsx        # ARQUIVO PRINCIPAL: cabeçalho + ordem das seções
│   ├── globals.css     # todo o estilo do site
│   └── icon.svg        # favicon
├── components/         # uma seção/peça de UI por arquivo
│   ├── Hero.tsx         # abertura
│   ├── Linha.tsx        # "Fábrica": trilho horizontal com as fotos do processo
│   ├── Catalogo.tsx     # "Blocos": cards das linhas
│   ├── Familia.tsx      #   painel com as peças de cada linha
│   ├── Modulador.tsx    # "Paginação": simulador de parede
│   ├── Impacto.tsx      # comparação cerâmica × concreto
│   ├── Compromissos.tsx
│   ├── Contato.tsx
│   ├── Menu.tsx         # menu mobile
│   ├── Marca.tsx        # logo SVG
│   ├── BlocoIso.tsx     # desenho isométrico do bloco
│   ├── Icone.tsx        # ícones desenhados (WhatsApp, seta)
│   ├── NotaCotacao.tsx  # linha "abre o WhatsApp… / ou ligue" sob os botões de cotação
│   ├── SmoothScroll.tsx # rolagem suave
├── lib/
│   ├── dados.ts        # CONTEÚDO: telefones, WhatsApp, e-mail, catálogo de blocos
│   └── useCelular.ts   # hook de breakpoint mobile (760px)
└── public/             # assets servidos a partir de "/"
    ├── fabrica/        # fotos da fábrica  -> /fabrica/<nome>.jpg  (usadas em Linha.tsx)
    └── pecas/          # fotos das peças   -> /pecas/<id>.png      (via fotoPeca() em lib/dados.ts)
```

## Onde editar

- **Contatos, WhatsApp, catálogo de blocos:** `lib/dados.ts`
- **Ordem das seções / cabeçalho:** `app/page.tsx`
- **Cores, tipografia, layout:** `app/globals.css`
- **Nova foto de peça:** salve em `public/pecas/<id>.png` e referencie `"<id>"` em `lib/dados.ts`.
- Imports usam o alias `@/` (raiz do projeto), configurado em `tsconfig.json`.
