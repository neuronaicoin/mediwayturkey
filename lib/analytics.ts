import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ─────────────────────────────────────────────────────────────
// Analitik log fonksiyonları (sunucu tarafı).
//
// Tasarım ilkesi: log YAZMA hiçbir zaman siteyi bozmamalı.
// Bir hata olursa sessizce yutulur (kullanıcı etkilenmez), sadece
// sunucu konsoluna yazılır. Analitik, asıl işlevden daha önemli değildir.
// ─────────────────────────────────────────────────────────────

export interface SearchLogInput {
  treatment?: string | null;
  city?: string | null;
  query?: string | null;
  locale?: string | null;
  country?: string | null;
}

export async function logSearch(input: SearchLogInput): Promise<void> {
  try {
    await supabaseAdmin.from("search_log").insert({
      treatment: input.treatment ?? null,
      city: input.city ?? null,
      query: input.query ?? null,
      locale: input.locale ?? null,
      country: input.country ?? null,
    });
  } catch (err) {
    console.error("[logSearch] failed:", err);
  }
}

export interface PageVisitInput {
  path?: string | null;
  locale?: string | null;
  country?: string | null;
  referrer?: string | null;
}

export async function logPageVisit(input: PageVisitInput): Promise<void> {
  try {
    await supabaseAdmin.from("page_visit").insert({
      path: input.path ?? null,
      locale: input.locale ?? null,
      country: input.country ?? null,
      referrer: input.referrer ?? null,
    });
  } catch (err) {
    console.error("[logPageVisit] failed:", err);
  }
}
