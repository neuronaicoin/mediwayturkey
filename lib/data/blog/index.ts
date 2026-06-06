// ───────────────────────────────────────────────────────────
// BLOG INDEX — tüm yazıları toplar
// Yeni yazı eklemek için: dosyayı import et + ALL_POSTS'a ekle.
// ───────────────────────────────────────────────────────────

import type { BlogPost } from "./types";
import { post as hairTransplantTurkeyCost2026 } from "./hair-transplant-turkey-cost-2026";

export const ALL_POSTS: BlogPost[] = [
  hairTransplantTurkeyCost2026,
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
