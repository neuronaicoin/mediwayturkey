import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MediWayTurkey — Links",
  description:
    "Quick links to MediWayTurkey: compare verified health providers in Turkey for hair transplant, dental and aesthetic treatments, plus guides and provider listing.",
};

type LinkItem = { label: string; href: string; emoji: string; external?: boolean };

const LINKS: LinkItem[] = [
  { emoji: "🌐", label: "Ana Sayfa / Home", href: "/" },
  { emoji: "💇", label: "Saç Ekimi / Hair Transplant", href: "/hair-transplant/istanbul" },
  { emoji: "🦷", label: "Diş Tedavisi / Dental", href: "/dental/istanbul" },
  { emoji: "✨", label: "Estetik / Aesthetics", href: "/aesthetics/istanbul" },
  { emoji: "📋", label: "Rehberler & Blog / Guides", href: "/blog" },
  { emoji: "🏥", label: "Sağlık Kuruluşları İçin / For Providers", href: "/list-your-business" },
  { emoji: "❓", label: "SSS / FAQ", href: "/faq" },
];

export default function LinksPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const base = `/${locale}`;

  return (
    <main className="min-h-screen bg-navy font-body flex flex-col items-center px-5 py-12">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo */}
        <Link href={base} className="leading-none mb-2">
          <span className="font-display text-4xl font-semibold text-white tracking-tight">
            Medi<span className="text-gold">Way</span>
          </span>
        </Link>
        <span className="font-display text-[11px] font-medium text-navy-muted tracking-[5px] mb-4">
          TURKEY
        </span>

        {/* Tagline */}
        <p className="text-sm text-navy-muted text-center mb-8 max-w-xs">
          Compare verified health providers in Turkey · Free for patients · No commission
        </p>

        {/* Links */}
        <div className="w-full flex flex-col gap-3">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={`${base}${item.href === "/" ? "" : item.href}`}
              className="w-full bg-white/5 hover:bg-gold hover:text-navy border border-white/15 rounded-xl px-5 py-4 flex items-center gap-3 text-white transition group"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="flex-1 text-center font-semibold text-[15px]">{item.label}</span>
              <span className="opacity-0 group-hover:opacity-100 transition">→</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="text-[11px] text-navy-muted/60 mt-10 text-center">
          © {new Date().getFullYear()} MediWayTurkey
        </p>
      </div>
    </main>
  );
}
