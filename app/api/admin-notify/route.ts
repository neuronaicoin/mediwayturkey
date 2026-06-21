import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAdminToken, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";
import { LOCALE_CODES } from "@/lib/data/languages";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { ALL_POSTS } from "@/lib/data/blog";
import { getAllPublishedProviderIds } from "@/lib/providers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mediwayturkey.com";
const INDEXNOW_SECRET = process.env.INDEXNOW_SECRET ?? "";

export async function POST() {
  // Güvenlik: sadece admin
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  // ─── HATA AYIKLAMA: ortam kontrolü ───
  const debug = {
    hasSecret: INDEXNOW_SECRET.length > 0,
    secretLength: INDEXNOW_SECRET.length,
    siteUrl: SITE_URL,
  };

  // URL'leri topla
  let urls: string[] = [];
  try {
    for (const locale of LOCALE_CODES) {
      urls.push(`${SITE_URL}/${locale}`);
      urls.push(`${SITE_URL}/${locale}/blog`);
      for (const tr of ACTIVE_TREATMENTS) {
        for (const city of ACTIVE_CITIES) {
          urls.push(`${SITE_URL}/${locale}/${tr.slug}/${city.slug}`);
        }
      }
    }
    for (const post of ALL_POSTS) {
      urls.push(`${SITE_URL}/${post.locale}/blog/${post.slug}`);
    }
    const providerIds = await getAllPublishedProviderIds();
    for (const { id } of providerIds) {
      for (const locale of LOCALE_CODES) {
        urls.push(`${SITE_URL}/${locale}/provider/${id}`);
      }
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "URL toplama hatasi: " + String(err), debug },
      { status: 500 }
    );
  }

  // IndexNow motoruna gönder
  try {
    const res = await fetch(`${SITE_URL}/api/indexnow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls, secret: INDEXNOW_SECRET }),
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text.slice(0, 500) };
    }

    return NextResponse.json({
      ok: res.ok,
      submitted: urls.length,
      indexnowStatus: res.status,
      indexnowResponse: data,
      debug,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "IndexNow cagrisi basarisiz: " + String(err), debug },
      { status: 500 }
    );
  }
}
