// ───────────────────────────────────────────────────────────
// ARAYÜZ ÇEVİRİLERİ — İngilizce (ana)
// Yeni dil eklemek için: bu dosyayı kopyala (örn. de.ts),
// değerleri çevir, lib/i18n/index.ts'e ekle.
// İçerik (klinik bio vb.) DEĞİL — sadece arayüz metinleri.
// ───────────────────────────────────────────────────────────

export const en = {
  brand: "MediWay",
  brandSuffix: "TURKEY",

  nav: {
    listBusiness: "List your business",
    blog: "Guides",
    howItWorks: "How it works",
  },

  hero: {
    headline: "Search, find & compare top health providers in Turkey",
    trustLine: "Free for patients · No commission · Verified providers",
    treatmentLabel: "Treatment",
    cityLabel: "City",
    searchButton: "Search",
  },

  ai: {
    entry: "Let our AI assistant guide you",
    assistantName: "MediWay Assistant",
    online: "Online",
    connectButton: "Connect me with providers",
    consent:
      "I agree my details may be shared with suitable providers so they can contact me.",
    privacyPolicy: "Privacy policy",
    footnote: "Free · No commission · Your info goes only to matched providers",
    namePlaceholder: "Your name",
    whatsappPlaceholder: "WhatsApp number",
  },

  sections: {
    searchTreatment: "Search treatment",
    popularDestinations: "Popular destinations",
    howItWorks: "How it works",
    step1: "Search",
    step2: "Compare",
    step3: "Connect",
  },

  list: {
    resultsFound: "providers found",
    filters: "Filters",
    technique: "Technique",
    package: "Package",
    language: "Language",
    district: "District",
    transfer: "Transfer",
    accommodation: "Accommodation",
    contact: "Contact",
    viewProfile: "View profile",
    verified: "Verified provider",
    more: "more",
  },

  profile: {
    back: "Back to results",
    reviews: "reviews",
    techniques: "Techniques",
    packages: "Packages",
    whatsapp: "WhatsApp",
    email: "Email",
    website: "Website",
  },

  footer: {
    forPatients: "For patients",
    forProviders: "For providers",
    company: "Company",
    legal: "Legal",
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;
