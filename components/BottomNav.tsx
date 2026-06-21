"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

// ─────────────────────────────────────────────────────────────
// Mobil alt navigasyon barı (Home · Search · Ask AI · Saved · Menu)
// Sadece mobilde görünür (sm: ve üstünde gizli).
// Her sayfada sabit altta durur. Metinler kullanıcının diline göre gelir.
// ─────────────────────────────────────────────────────────────

export function BottomNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = getDictionary(locale);

  // Admin sayfasında alt bar gösterme
  if (pathname?.startsWith("/admin")) return null;

  const base = `/${locale}`;

  // Aktif sekme kontrolü
  const isHome = pathname === base || pathname === `${base}/`;
  const isBlog = pathname?.startsWith(`${base}/blog`);
  const isListBusiness = pathname?.startsWith(`${base}/list-your-business`);

  const items = [
    {
      key: "home",
      label: t.mobile.home,
      href: base,
      active: isHome,
      icon: (
        <path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
      ),
    },
    {
      key: "search",
      label: t.mobile.search,
      href: base,
      active: false,
      icon: (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </>
      ),
    },
    {
      key: "ai",
      label: t.mobile.askAI,
      href: `${base}#ai`,
      active: false,
      highlight: true,
      icon: (
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      ),
    },
    {
      key: "saved",
      label: t.mobile.saved,
      href: base,
      active: false,
      icon: (
        <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
      ),
    },
    {
      key: "menu",
      label: t.mobile.menu,
      href: `${base}/blog`,
      active: isBlog || isListBusiness,
      icon: (
        <>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </>
      ),
    },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-2 left-2 right-2 h-16 bg-white border-[1.5px] border-navy rounded-2xl flex items-stretch overflow-hidden z-50"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
    >
      {items.map((item, i) => (
        <Link
          key={item.key}
          href={item.href}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            i > 0 ? "border-l border-gray-100" : ""
          } ${item.highlight ? "bg-[#fdf6e8]" : ""}`}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke={item.highlight ? "#f0ad2f" : item.active ? "#0c2d4f" : "#8a8a82"}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {item.icon}
          </svg>
          <span
            className="text-[9px] font-medium"
            style={{
              color: item.highlight ? "#ba7517" : item.active ? "#0c2d4f" : "#8a8a82",
            }}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
