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

// Provider profili: MedicalBusiness — Google rich results + AI motorları için.
// Yalnızca gerçekten var olan alanlar yazılır (uydurma alan = geçersiz schema).
export function ProviderSchema({
  id,
  businessName,
  businessType,
  bio,
  cityNames,
  languages,
  email,
  whatsapp,
  whatsappCountryCode,
  website,
  image,
  isVerified,
  locale,
}: {
  id: string;
  businessName: string;
  businessType: string;
  bio: string | null;
  cityNames: string;
  languages: string[];
  email: string;
  whatsapp: string | null;
  whatsappCountryCode: string | null;
  website: string | null;
  image: string | null;
  isVerified: boolean;
  locale: string;
}) {
  const pageUrl = `${BASE}/${locale}/provider/${id}`;
  const phone = whatsapp ? `${whatsappCountryCode ?? ""}${whatsapp}` : undefined;

  const node: Record<string, unknown> = {
    "@type": "MedicalBusiness",
    "@id": `${pageUrl}#business`,
    name: businessName,
    url: pageUrl,
    email,
    areaServed: { "@type": "Country", name: "Turkey" },
    address: {
      "@type": "PostalAddress",
      addressLocality: cityNames,
      addressCountry: "TR",
    },
  };

  if (bio) node.description = bio.slice(0, 300);
  if (image) node.image = image;
  if (phone) node.telephone = phone;
  if (website) node.sameAs = [website];
  if (languages.length > 0) {
    node.availableLanguage = languages.map((l) => l.toUpperCase());
  }
  if (businessType) node.medicalSpecialty = businessType;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      node,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/${locale}` },
          { "@type": "ListItem", position: 2, name: businessName, item: pageUrl },
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
