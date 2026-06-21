"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────
// VisitTracker — her sayfa görüntülemesini arka planda kaydeder.
// Kök layout'a bir kez konur, tüm sayfalarda otomatik çalışır.
//
// Tasarım: sayfa render edildikten SONRA (useEffect) çağrılır,
// keepalive ile gönderilir → kullanıcı sayfadan çıksa bile kayıt düşer.
// Hata olursa sessizce yutulur, kullanıcı hiç etkilenmez.
// ─────────────────────────────────────────────────────────────

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Admin ve api yollarını kaydetme (gürültü olmasın)
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    // Yoldan dil kodunu çıkar (örn. /en/... → "en")
    const seg = pathname.split("/").filter(Boolean);
    const locale = seg[0] ?? null;

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          type: "visit",
          path: pathname,
          locale,
          referrer: document.referrer || null,
        }),
      }).catch(() => {
        // sessizce yut
      });
    } catch {
      // sessizce yut
    }
  }, [pathname]);

  return null;
}
