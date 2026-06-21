import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ─────────────────────────────────────────────────────────────
// /api/admin-login
// POST { password } → şifre doğruysa 30 günlük imzalı çerez koyar.
// DELETE → çıkış (çerezi siler).
//
// Çerez değeri: HMAC imzası (ADMIN_PASSWORD ile). Sahte çerez üretilemez.
// httpOnly → JavaScript erişemez (XSS koruması).
// ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const COOKIE_NAME = "mw_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 gün

// Çerez için imza üretir (şifrenin kendisini çereze koymayız)
function makeToken(): string {
  return crypto
    .createHmac("sha256", ADMIN_PASSWORD)
    .update("mw_admin_session_v1")
    .digest("hex");
}

// Bir çerez değerinin geçerli olup olmadığını kontrol eder (route'lar kullanır)
export function isValidAdminToken(token: string | undefined): boolean {
  if (!ADMIN_PASSWORD || !token) return false;
  const expected = makeToken();
  // Zamanlama saldırısına karşı sabit süreli karşılaştırma
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD not configured." },
      { status: 500 }
    );
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof body.password !== "string" || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
