// Schema.org JSON-LD — Google rich results + AI platformları için yapılandırılmış veri.
// Sunucu tarafında render edilir (SEO için ideal).

const BASE = "https://www.mediwayturkey.com";

// Ana sayfa: Organization + WebSite schema
export function HomeSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "MediWayTurkey",
        url: BASE,
        description:
          "Health tourism marketplace connecting international patients with verified hair transplant, dental and aesthetic providers in Turkey. Free for patients, no commission.",
        areaServed: "TR",
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "MediWayTurkey",
        publisher: { "@id": `${BASE}/#organization` },
        inLanguage: "en",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Liste sayfası: tedavi + şehir için Service + BreadcrumbList
export function ListingSchema({
  treatmentName,
  cityName,
  treatmentSlug,
  citySlug,
  locale,
}: {
  treatmentName: string;
  cityName: string;
  treatmentSlug: string;
  citySlug: string;
  locale: string;
}) {
  const pageUrl = `${BASE}/${locale}/${treatmentSlug}/${citySlug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${treatmentName} in ${cityName}, Turkey`,
        serviceType: treatmentName,
        areaServed: { "@type": "City", name: cityName },
        provider: {
          "@type": "Organization",
          name: "MediWayTurkey",
          url: BASE,
        },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/${locale}` },
          { "@type": "ListItem", position: 2, name: treatmentName, item: pageUrl },
          { "@type": "ListItem", position: 3, name: cityName, item: pageUrl },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
