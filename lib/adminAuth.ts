import crypto from "crypto";

// ─────────────────────────────────────────────────────────────
// Admin oturum token yardımcıları.
// Route dosyasından AYRI tutulur (Next.js route dosyaları sadece
// GET/POST/DELETE gibi alanları export edebilir, yardımcı fonksiyon edemez).
// ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export const ADMIN_COOKIE_NAME = "mw_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 gün

// Çerez için imza üretir (şifrenin kendisini çereze koymayız)
export function makeAdminToken(): string {
  return crypto
    .createHmac("sha256", ADMIN_PASSWORD)
    .update("mw_admin_session_v1")
    .digest("hex");
}

// Şifre doğru mu?
export function isCorrectPassword(password: unknown): boolean {
  return (
    typeof password === "string" &&
    ADMIN_PASSWORD.length > 0 &&
    password === ADMIN_PASSWORD
  );
}

// Bir çerez değeri geçerli mi? (zamanlama saldırısına dayanıklı karşılaştırma)
export function isValidAdminToken(token: string | undefined): boolean {
  if (!ADMIN_PASSWORD || !token) return false;
  const expected = makeAdminToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
