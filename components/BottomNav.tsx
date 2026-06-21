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
// Search → SearchFlow · Ask AI → AiAssistant · Saved → SavedSheet · Menu → MenuSheet
// Sadece mobilde görünür. Admin sayfasında gizli.
// ─────────────────────────────────────────────────────────────

export function BottomNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = getDictionary(locale);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  const base = `/${locale}`;
  const isHome = pathname === base || pathname === `${base}/`;

  function iconColor(active: boolean) {
    return active ? "#0c2d4f" : "#8a8a82";
  }

  return (
    <>
      <SearchFlow locale={locale} open={searchOpen} onClose={() => setSearchOpen(false)} />
      {aiOpen && <AiAssistant locale={locale} onClose={() => setAiOpen(false)} />}
      <MenuSheet locale={locale} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SavedSheet locale={locale} open={savedOpen} onClose={() => setSavedOpen(false)} />

      <nav
        className="sm:hidden fixed bottom-2 left-2 right-2 h-16 bg-white border-[1.5px] border-navy rounded-2xl flex items-stretch overflow-hidden z-50"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        {/* Home */}
        <Link href={base} className="flex-1 flex flex-col items-center justify-center gap-0.5">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={iconColor(isHome)} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: iconColor(isHome) }}>{t.mobile.home}</span>
        </Link>

        {/* Search */}
        <button onClick={() => setSearchOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 border-l border-gray-100">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8a8a82" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: "#8a8a82" }}>{t.mobile.search}</span>
        </button>

        {/* Ask AI */}
        <button onClick={() => setAiOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 border-l border-r border-gray-100 bg-[#fdf6e8]">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#f0ad2f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: "#ba7517" }}>{t.mobile.askAI}</span>
        </button>

        {/* Saved — açar */}
        <button onClick={() => setSavedOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8a8a82" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: "#8a8a82" }}>{t.mobile.saved}</span>
        </button>

        {/* Menu */}
        <button onClick={() => setMenuOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 border-l border-gray-100">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8a8a82" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[9px] font-medium" style={{ color: "#8a8a82" }}>{t.mobile.menu}</span>
        </button>
      </nav>
    </>
  );
}
