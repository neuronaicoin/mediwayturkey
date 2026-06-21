"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/data/languages";

interface Props {
  locale: string;
  open: boolean;
  onClose: () => void;
}

function swapLocale(pathname: string | null, current: string, next: string): string {
  if (!pathname) return `/${next}`;
  if (pathname === `/${current}`) return `/${next}`;
  if (pathname.startsWith(`/${current}/`)) {
    return `/${next}/${pathname.slice(current.length + 2)}`;
  }
  return `/${next}`;
}

export function MenuSheet({ locale, open, onClose }: Props) {
  const pathname = usePathname();
  const t = getDictionary(locale);

  if (!open) return null;

  const base = `/${locale}`;

  const links = [
    { href: `${base}/list-your-business`, label: t.nav.listBusiness, icon: "building" },
    { href: `${base}/about`, label: "About", icon: "info" },
    { href: `${base}/contact`, label: "Contact", icon: "mail" },
    { href: `${base}/blog`, label: t.nav.blog, icon: "book" },
    { href: `${base}/faq`, label: "FAQ", icon: "help" },
    { href: `${base}/login`, label: "Log in", icon: "user" },
    { href: `${base}/privacy`, label: "Privacy", icon: "shield" },
    { href: `${base}/terms`, label: "Terms", icon: "file" },
  ];

  function icon(name: string) {
    const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#0c2d4f", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    switch (name) {
      case "building": return <svg {...common}><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 21V9h4a1 1 0 0 1 1 1v11M3 21h18M7 7h2M7 11h2M7 15h2" /></svg>;
      case "info": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>;
      case "mail": return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
      case "book": return <svg {...common}><path d="M4 19V5a1 1 0 0 1 1-1h13v15H5a1 1 0 0 0-1 1 1 1 0 0 0 1 1h13" /></svg>;
      case "help": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01" /></svg>;
      case "user": return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
      case "shield": return <svg {...common}><path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" /></svg>;
      case "file": return <svg {...common}><path d="M6 2h8l4 4v16H6V2Z" /><path d="M14 2v4h4M9 13h6M9 17h6" /></svg>;
      default: return null;
    }
  }

  return (
    <div className="sm:hidden fixed top-0 left-0 right-0 z-[60] bg-cream flex flex-col" style={{ bottom: "84px" }}>
      {/* Üst başlık + geri tuşu */}
      <div className="bg-navy px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
        <button onClick={onClose} aria-label="Back" className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-medium text-base flex-1">{t.mobile.menu}</span>
        <button onClick={onClose} aria-label="Close" className="text-white/80 text-xl leading-none">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Dil seçimi — KUTU içinde, dış lacivert çizgi */}
        <div className="bg-white border-[1.5px] border-navy rounded-2xl p-3.5 mb-4">
          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-medium mb-2.5">{t.mobile.language}</div>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((l) => (
              <Link
                key={l.code}
                href={swapLocale(pathname, locale, l.code)}
                onClick={onClose}
                className={`text-xs px-3 py-1.5 rounded-full border ${
                  l.code === locale ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-300"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Sayfa linkleri — dış lacivert çizgili kutular */}
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="w-full bg-white border-[1.5px] border-navy rounded-2xl p-3.5 mb-2.5 flex items-center gap-3"
          >
            <span className="flex-shrink-0">{icon(item.icon)}</span>
            <span className="flex-1 text-[15px] text-navy font-medium">{item.label}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
