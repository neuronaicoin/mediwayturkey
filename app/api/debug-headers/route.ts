import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
// GEÇİCİ TEST ROUTE — ülke tespiti için.
// /api/debug-headers adresine girince, Railway'in gönderdiği tüm
// header'ları JSON olarak gösterir. İçinde ülke bilgisi var mı bakacağız.
//
// ⚠️ TEST BİTİNCE BU DOSYAYI SİL. Header'ları dışarı açmak güvenlik için
// kalıcı olmamalı.
// ─────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Ülke bilgisi taşıyabilecek bilinen header'ları ayrıca öne çıkar
  const possibleCountryHeaders = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country-code",
    "x-geo-country",
    "x-railway-ip-country",
    "x-forwarded-for",
    "x-real-ip",
  ];

  const countryHints: Record<string, string | null> = {};
  for (const h of possibleCountryHeaders) {
    countryHints[h] = request.headers.get(h);
  }

  return NextResponse.json(
    {
      message: "Bu header'lari kontrol et. Icinde ulke kodu (TR, DE, FR...) var mi bak.",
      countryHints,
      allHeaders: headers,
    },
    { status: 200 }
  );
}
