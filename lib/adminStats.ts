import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ─────────────────────────────────────────────────────────────
// Admin panel istatistikleri (sunucu tarafı, secret key ile).
// Tüm sayımlar/özetler tek bir fonksiyonda toplanır.
// ─────────────────────────────────────────────────────────────

export interface AdminStats {
  providers: {
    total: number;
    published: number;
    verified: number;
    byType: { label: string; count: number }[];
  };
  searches: {
    total: number;
    last7days: number;
    topTreatments: { label: string; count: number }[];
    topCities: { label: string; count: number }[];
    topCountries: { label: string; count: number }[];
    recent: { treatment: string | null; city: string | null; country: string | null; created_at: string }[];
  };
  visits: {
    total: number;
    last7days: number;
    topCountries: { label: string; count: number }[];
    topPaths: { label: string; count: number }[];
  };
}

// Bir metin dizisini say ve en çoktan aza sırala
function tally(values: (string | null | undefined)[], limit = 8): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getAdminStats(): Promise<AdminStats> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // ─── PROVIDERS ───
  const { data: providerRows } = await supabaseAdmin
    .from("providers")
    .select("business_type, is_published, is_verified");

  const providers = providerRows ?? [];
  const publishedProviders = providers.filter((p) => p.is_published);

  // ─── SEARCHES ───
  const { data: searchRows } = await supabaseAdmin
    .from("search_log")
    .select("treatment, city, country, created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  const searches = searchRows ?? [];
  const recentSearches = searches.slice(0, 20).map((s) => ({
    treatment: s.treatment ?? null,
    city: s.city ?? null,
    country: s.country ?? null,
    created_at: s.created_at as string,
  }));

  // ─── VISITS ───
  const { data: visitRows } = await supabaseAdmin
    .from("page_visit")
    .select("path, country, created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  const visits = visitRows ?? [];

  return {
    providers: {
      total: providers.length,
      published: publishedProviders.length,
      verified: providers.filter((p) => p.is_verified).length,
      byType: tally(providers.map((p) => p.business_type)),
    },
    searches: {
      total: searches.length,
      last7days: searches.filter((s) => (s.created_at as string) >= sevenDaysAgo).length,
      topTreatments: tally(searches.map((s) => s.treatment)),
      topCities: tally(searches.map((s) => s.city)),
      topCountries: tally(searches.map((s) => s.country)),
      recent: recentSearches,
    },
    visits: {
      total: visits.length,
      last7days: visits.filter((v) => (v.created_at as string) >= sevenDaysAgo).length,
      topCountries: tally(visits.map((v) => v.country)),
      topPaths: tally(visits.map((v) => v.path), 10),
    },
  };
}
