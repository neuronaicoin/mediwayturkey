import type { MetadataRoute } from "next";
import { LOCALE_CODES } from "@/lib/data/languages";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { ALL_POSTS } from "@/lib/data/blog";
import { getAllPublishedProviderIds } from "@/lib/providers";

const BASE_URL = "https://www.mediwayturkey.com";

// Sitemap dinamik (veritabanından provider çeker). Saatte bir tazelenir;
// yeni klinik en geç 1 saatte sitemap'e girer (anında için IndexNow kullanılır).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

    // Blog liste sayfası (her dil)
    entries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Blog yazıları (kendi dillerinde)
  for (const post of ALL_POSTS) {
    entries.push({
      url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Provider (klinik) sayfaları — yayınlanmış tüm provider'lar, her dilde.
  // Yeni klinik üye olup yayınlandığında otomatik sitemap'e girer.
  const providerIds = await getAllPublishedProviderIds();
  for (const { id } of providerIds) {
    for (const locale of LOCALE_CODES) {
      entries.push({
        url: `${BASE_URL}/${locale}/provider/${id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
