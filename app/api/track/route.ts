import { NextRequest, NextResponse } from "next/server";
import { getClientIp, getCountryFromIp } from "@/lib/geo";
import { logPageVisit, logSearch } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────
// /api/track — hafif analitik kayıt ucu.
// Tarayıcı sayfa yüklendikten SONRA arka planda çağırır (kullanıcı beklemez).
//
// Body:
//   { type: "visit", path, locale, referrer }
//   { type: "search", treatment, city, query, locale }
//
// Ülke, ziyaretçinin IP'sinden sunucu tarafında bulunur.
// ─────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Ülke tespiti (hata olsa null döner)
  const ip = getClientIp(request.headers);
  const country = await getCountryFromIp(ip);

  const type = body.type;

  if (type === "visit") {
    await logPageVisit({
      path: typeof body.path === "string" ? body.path : null,
      locale: typeof body.locale === "string" ? body.locale : null,
      country,
      referrer: typeof body.referrer === "string" ? body.referrer : null,
    });
    return NextResponse.json({ ok: true });
  }

  if (type === "search") {
    await logSearch({
      treatment: typeof body.treatment === "string" ? body.treatment : null,
      city: typeof body.city === "string" ? body.city : null,
      query: typeof body.query === "string" ? body.query : null,
      locale: typeof body.locale === "string" ? body.locale : null,
      country,
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Unknown type." }, { status: 400 });
}
