// ───────────────────────────────────────────────────────────
// i18n YÜKLEYİCİ
// Tüm diller bağlı. Bir dil eksik/bulunamazsa İngilizce'ye düşer.
// ───────────────────────────────────────────────────────────

import { en, type Dictionary } from "./en";
import { tr } from "./tr";
import { de } from "./de";
import { ar } from "./ar";
import { fr } from "./fr";
import { es } from "./es";
import { it } from "./it";
import { nl } from "./nl";
import { el } from "./el";
import { ro } from "./ro";
import { bg } from "./bg";
import { sq } from "./sq";
import { sr } from "./sr";

const DICTIONARIES: Record<string, Dictionary> = {
  en, tr, de, ar, fr, es, it, nl, el, ro, bg, sq, sr,
};

export function getDictionary(locale: string): Dictionary {
  return DICTIONARIES[locale] ?? en;
}

export type { Dictionary };
