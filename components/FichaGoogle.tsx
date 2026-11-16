import { EMAIL, FONES, MAPS, SITE, itens } from "@/lib/dados";

// Ficha da empresa para o Google (dados estruturados schema.org): endereço, horário, telefones,
// área de entrega e as linhas de blocos. Ajuda a aparecer em "bloco cerâmico Itu" e no Maps.
// Só repete o que já está escrito na página.
export default function FichaGoogle() {
  const [lat, lng] = MAPS.split("q=")[1].split(",").map(Number);
  const dados = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE}/#empresa`,
    name: "Incargel · Indústria de Cerâmica",
    description: "Blocos cerâmicos estruturais e de vedação fabricados em Itu/SP, com entrega em todo o Estado de São Paulo. ABNT NBR 15270 e 15575.",
    url: `${SITE}/`,
    image: `${SITE}/og.png`,
    logo: `${SITE}/app/icone-512.png`,
    email: EMAIL,
    telephone: FONES[0].tel,
    address: { "@type": "PostalAddress", streetAddress: "Estrada do Jacú, s/n · Bairro Itaim", addressLocality: "Itu", addressRegion: "SP", postalCode: "13310-220", addressCountry: "BR" },
    geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
    hasMap: MAPS,
    areaServed: { "@type": "State", name: "São Paulo" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:30", closes: "12:00" },
    ],
    contactPoint: FONES.map((f) => ({ "@type": "ContactPoint", telephone: f.tel, contactType: "sales", areaServed: "BR", availableLanguage: "Portuguese" })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Blocos cerâmicos",
      itemListElement: itens.map((i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: `Bloco ${i.fam === "Estrutural" ? "estrutural" : "de vedação"} linha ${i.linha}`, description: `${i.pecas[0].dim} cm` },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
