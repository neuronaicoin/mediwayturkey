import type { MetadataRoute } from "next";
import { LOCALE_CODES } from "@/lib/data/languages";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";

const BASE_URL = "https://www.mediwayturkey.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALE_CODES) {
    // Ana sayfa (her dil)
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.8,
    });

    // Tedavi × şehir kombinasyonları (programmatic SEO)
    for (const tr of ACTIVE_TREATMENTS) {
      for (const city of ACTIVE_CITIES) {
        entries.push({
          url: `${BASE_URL}/${locale}/${tr.slug}/${city.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
