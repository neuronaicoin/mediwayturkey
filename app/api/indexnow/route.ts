import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
// IndexNow motoru
// POST /api/indexnow
// Body: { urls: string[], secret: string }
//
// Verilen URL'leri Bing ve Yandex'in IndexNow uçlarına bildirir.
// (Google IndexNow KULLANMAZ — Google için sitemap + Search Console gerekir.)
//
// secret: INDEXNOW_SECRET env değişkeniyle eşleşmeli. Kötüye kullanımı önler.
// ─────────────────────────────────────────────────────────────

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "db66538cc8be421583a14cbd2ece23dd";
const INDEXNOW_SECRET = process.env.INDEXNOW_SECRET ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mediwayturkey.com";
const HOST = "www.mediwayturkey.com";

// IndexNow uçları. Bing ve Yandex IndexNow protokolünü destekler;
// birine gönderim hepsiyle paylaşılır ama doğrudan ikisine de gönderiyoruz.
const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export async function POST(request: NextRequest) {
  // Güvenlik: secret kontrolü
  if (!INDEXNOW_SECRET) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_SECRET not configured on server." },
      { status: 500 }
    );
  }

  let body: { urls?: unknown; secret?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.secret !== INDEXNOW_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  // URL doğrulama
  const rawUrls = Array.isArray(body.urls) ? body.urls : [];
  const urls = rawUrls
    .filter((u): u is string => typeof u === "string")
    .map((u) => u.trim())
    .filter((u) => u.startsWith(SITE_URL)); // sadece kendi domainimiz

  if (urls.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No valid URLs (must start with site URL)." },
      { status: 400 }
    );
  }

  // IndexNow tek istekte max 10.000 URL kabul eder; biz güvenli kalalım.
  const urlList = urls.slice(0, 10000);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  // Tüm uçlara paralel gönder. Biri başarısız olsa da diğerleri denenir.
  const results = await Promise.allSettled(
    ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      }).then((res) => ({ endpoint, status: res.status }))
    )
  );

  const summary = results.map((r) =>
    r.status === "fulfilled"
      ? { endpoint: r.value.endpoint, status: r.value.status, ok: r.value.status < 400 }
      : { endpoint: "unknown", status: 0, ok: false, error: String(r.reason) }
  );

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    endpoints: summary,
  });
}
