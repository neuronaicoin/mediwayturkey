// ───────────────────────────────────────────────────────────
// BLOG INDEX — tüm yazıları toplar
// Yeni yazı eklemek için: dosyayı import et + ALL_POSTS'a ekle.
// ───────────────────────────────────────────────────────────

import type { BlogPost } from "./types";
import { post as hairTransplantTurkeyCost2026 } from "./hair-transplant-turkey-cost-2026";
import { post as dentalTreatmentTurkeyCost2026 } from "./dental-treatment-turkey-cost-2026";
import { post as plasticSurgeryTurkeyCost2026 } from "./plastic-surgery-turkey-cost-2026";
import { post as isMedicalTourismTurkeySafe } from "./is-medical-tourism-turkey-safe";
import { post as fueVsDhiHairTransplant } from "./fue-vs-dhi-hair-transplant";
import { post as greffeCheveuxTurquiePrix2026 } from "./greffe-cheveux-turquie-prix-2026";
import { post as greffeCheveuxIstanbulCliniques } from "./greffe-cheveux-istanbul-cliniques";
import { post as soinsDentairesTurquiePrix2026 } from "./soins-dentaires-turquie-prix-2026";

export const ALL_POSTS: BlogPost[] = [
  hairTransplantTurkeyCost2026,
  dentalTreatmentTurkeyCost2026,
  plasticSurgeryTurkeyCost2026,
  isMedicalTourismTurkeySafe,
  fueVsDhiHairTransplant,
  greffeCheveuxTurquiePrix2026,
  greffeCheveuxIstanbulCliniques,
  soinsDentairesTurquiePrix2026,
];

// Bir dile ait yayınlanmış yazılar (en yeni önce)
export function getPostsByLocale(locale: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.locale === locale).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

// Tek yazı (slug + locale)
export function getPost(locale: string, slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.locale === locale && p.slug === slug);
}

// Sitemap + statik üretim için tüm (locale, slug) çiftleri
export function getAllPostParams(): { locale: string; slug: string }[] {
  return ALL_POSTS.map((p) => ({ locale: p.locale, slug: p.slug }));
}

export type { BlogPost };
