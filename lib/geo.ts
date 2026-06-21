// ─────────────────────────────────────────────────────────────
// IP → ülke tespiti (sunucu tarafı).
// Bedava servis: ipapi.co (ayda ~30.000 sorgu ücretsiz, anahtar gerektirmez).
//
// Tasarım: hata/zaman aşımı olursa null döner, asla çökmez.
// Ülke bilgisi "olsa iyi olur" bir veridir, kritik değildir.
// ─────────────────────────────────────────────────────────────

// Gelen istekten ziyaretçinin gerçek IP'sini çıkarır.
export function getClientIp(headers: Headers): string | null {
  // x-forwarded-for: "gerçek-ip, proxy-ip, ..." → ilki ziyaretçidir
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

// IP'den ülke kodunu (TR, DE, FR...) bulur. Bulamazsa null.
export async function getCountryFromIp(ip: string | null): Promise<string | null> {
  if (!ip) return null;

  // Yerel/özel IP'leri atla (localhost, test)
  if (
    ip === "127.0.0.1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip === "::1"
  ) {
    return null;
  }

  try {
    // 2 saniye zaman aşımı — yavaş servis siteyi yavaşlatmasın
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: controller.signal,
      headers: { "User-Agent": "MediWayTurkey/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const country = (await res.text()).trim();
    // Geçerli 2 harfli ülke kodu mu kontrol et
    if (/^[A-Z]{2}$/.test(country)) {
      return country;
    }
    return null;
  } catch {
    return null;
  }
}
