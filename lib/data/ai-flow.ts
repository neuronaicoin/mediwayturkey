// ───────────────────────────────────────────────────────────
// AI ASİSTAN AKIŞI — buton tabanlı, modüler
// Her tedavi için sorular burada tanımlı. Yeni tedavi eklenince
// buraya bir blok eklenir. Gerçek AI API'si yok (maliyetsiz).
// ───────────────────────────────────────────────────────────

export interface AiStep {
  key: string; // cevap bu anahtarla saklanır
  question: string; // İngilizce soru (ileride çevrilebilir)
  options: { value: string; label: string }[];
}

// Tedaviye özel detay soruları (tedavi + şehir sorulduktan SONRA)
export const AI_DETAIL_STEPS: Record<string, AiStep[]> = {
  "hair-transplant": [
    {
      key: "grafts",
      question: "Roughly how many grafts are you considering?",
      options: [
        { value: "1000-2000", label: "1000–2000" },
        { value: "2000-3500", label: "2000–3500" },
        { value: "3500+", label: "3500+" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
  dental: [
    {
      key: "treatment_type",
      question: "Which dental treatment are you interested in?",
      options: [
        { value: "implant", label: "Implants" },
        { value: "veneers", label: "Veneers / Hollywood Smile" },
        { value: "general", label: "General" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      key: "teeth_count",
      question: "How many teeth?",
      options: [
        { value: "1-3", label: "1–3" },
        { value: "4-8", label: "4–8" },
        { value: "full", label: "Full mouth" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
  aesthetics: [
    {
      key: "area",
      question: "Which area are you interested in?",
      options: [
        { value: "face", label: "Face" },
        { value: "body", label: "Body" },
        { value: "breast", label: "Breast" },
        { value: "skin", label: "Skin" },
      ],
    },
  ],
};

// Tüm tedaviler için ortak son soru: zamanlama
export const AI_TIMING_STEP: AiStep = {
  key: "timing",
  question: "When are you planning to have it done?",
  options: [
    { value: "1-month", label: "Within 1 month" },
    { value: "1-3-months", label: "1–3 months" },
  ],
};

// Sık kullanılan ülke kodları (WhatsApp için)
export const COUNTRY_CODES = [
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+1", flag: "🇺🇸", name: "USA/Canada" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
];
