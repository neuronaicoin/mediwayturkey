// ───────────────────────────────────────────────────────────
// i18n YÜKLEYİCİ
// Aktif olmayan / henüz çevrilmemiş diller İngilizce'ye düşer.
// Yeni dil çevrilince: import et + DICTIONARIES'e ekle.
// ───────────────────────────────────────────────────────────

import { en, type Dictionary } from "./en";

// Çevrildikçe buraya eklenecek:
// import { de } from "./de";
// import { ar } from "./ar";

const DICTIONARIES: Record<string, Dictionary> = {
  en,
};

export function getDictionary(locale: string): Dictionary {
  return DICTIONARIES[locale] ?? en;
}

export type { Dictionary };
