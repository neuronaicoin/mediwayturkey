"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { SearchFlow } from "@/components/SearchFlow";
import { AiAssistant } from "@/components/AiAssistant";
import { MenuSheet } from "@/components/MenuSheet";
import { SavedSheet } from "@/components/SavedSheet";

// ─────────────────────────────────────────────────────────────
// Mobil alt navigasyon barı (Home · Search · Ask AI · Saved · Menu)
// - Her ikon sarı çizgilerle bölünmüş kutucukta
// - Aktif ikon sarı, pasif gri
// - Açılır sayfalar alt barı KAPATMAZ; bar hep görünür
// - Admin sayfasında gizli
// ─────────────────────────────────────────────────────────────

const GOLD = "#f0ad2f";
const GOLD_TEXT = "#ba7517";
const GRAY = "#8a8a82";

export function BottomNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = getDictionary(locale);
  const [active, setActive] = useState<null | "search" | "ai" | "saved" | "menu">(null);

  if (pathname?.startsWith("/admin")) return null;

  const base = `/${locale}`;
  const isHome = (pathname === base || pathname === `${base}/`) && active === null;

  function color(on: boolean) {
    return on ? GOLD : GRAY;
  }
  function textColor(on: boolean) {
    return on ? GOLD_TEXT : GRAY;
  }

  const divider = "border-l-[1.5px] border-[#f0ad2f]/40";

  return (
    <>
      <SearchFlow locale={locale} open={active === "search"} onClose={() => setActive(null)} />
      <MenuSheet locale={locale} open={active === "menu"} onClose={() => setActive(null)} />
      <SavedSheet locale={locale} open={active === "saved"} onClose={() => setActive(null)} />

      {/* Ask AI — sadece asistan, alt bar görünür kalır */}
      {active === "ai" && (
        <div className="sm:hidden fixed top-0 left-0 right-0 z-[60] flex flex-col" style={{ bottom: "84px" }}>
          <AiAssistant locale={locale} onClose={() => setActive(null)} embedded />
        </div>
      )}

      <nav
        className="sm:hidden fixed bottom-2 left-2 right-2 h-16 bg-white border-[1.5px] border-navy rounded-2xl flex items-stretch overflow-hidden z-[70]"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}
      >
        {/* Home */}
        <Link
          href={base}
          onClick={() => setActive(null)}
          className="flex-1 flex flex-col items-center justify-center gap-0.5"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color(isHome)} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: textColor(isHome) }}>{t.mobile.home}</span>
        </Link>

        {/* Search */}
        <button
          onClick={() => setActive(active === "search" ? null : "search")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${divider}`}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color(active === "search")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: textColor(active === "search") }}>{t.mobile.search}</span>
        </button>

        {/* Ask AI */}
        <button
          onClick={() => setActive(active === "ai" ? null : "ai")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${divider}`}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color(active === "ai")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: textColor(active === "ai") }}>{t.mobile.askAI}</span>
        </button>

        {/* Saved */}
        <button
          onClick={() => setActive(active === "saved" ? null : "saved")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${divider}`}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color(active === "saved")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: textColor(active === "saved") }}>{t.mobile.saved}</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => setActive(active === "menu" ? null : "menu")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${divider}`}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color(active === "menu")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: textColor(active === "menu") }}>{t.mobile.menu}</span>
        </button>
      </nav>
    </>
  );
}
