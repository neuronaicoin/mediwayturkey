// ───────────────────────────────────────────────────────────
// DİLLER — Modüler yapı
// Yeni dil eklemek için: aşağıdaki diziye bir satır ekle.
// "active: false" olan diller arayüzde görünür ama içeriği
// henüz İngilizce'den çevrilmemiş olabilir (kademeli doldurma).
// ───────────────────────────────────────────────────────────

export interface Language {
  code: string; // URL'de kullanılır: /en, /de ...
  label: string; // Dil seçicide görünen ad (kendi dilinde)
  englishLabel: string; // Yönetim için İngilizce ad
  dir: "ltr" | "rtl"; // Arapça = rtl
  active: boolean; // İçerik çevirisi hazır mı (SEO için)
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", englishLabel: "English", dir: "ltr", active: true },
  { code: "de", label: "Deutsch", englishLabel: "German", dir: "ltr", active: false },
  { code: "ar", label: "العربية", englishLabel: "Arabic", dir: "rtl", active: false },
  { code: "fr", label: "Français", englishLabel: "French", dir: "ltr", active: false },
  { code: "es", label: "Español", englishLabel: "Spanish", dir: "ltr", active: false },
  { code: "it", label: "Italiano", englishLabel: "Italian", dir: "ltr", active: false },
  { code: "nl", label: "Nederlands", englishLabel: "Dutch", dir: "ltr", active: false },
  { code: "el", label: "Ελληνικά", englishLabel: "Greek", dir: "ltr", active: false },
  { code: "ro", label: "Română", englishLabel: "Romanian", dir: "ltr", active: false },
  { code: "bg", label: "Български", englishLabel: "Bulgarian", dir: "ltr", active: false },
  { code: "sq", label: "Shqip", englishLabel: "Albanian", dir: "ltr", active: false },
  { code: "sr", label: "Srpski", englishLabel: "Serbian", dir: "ltr", active: false },
];

export const DEFAULT_LOCALE = "en";

export const LOCALE_CODES = LANGUAGES.map((l) => l.code);

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code);
}

export function isValidLocale(code: string): boolean {
  return LOCALE_CODES.includes(code);
}
