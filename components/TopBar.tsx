import Link from "next/link";

// Liste ve profil sayfalarında kullanılan sade üst bar.
export function TopBar({ locale }: { locale: string }) {
  return (
    <header className="bg-navy">
      <div className="max-w-container mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link href={`/${locale}`} className="leading-none">
          <span className="font-display text-xl font-semibold text-white tracking-tight">
            Medi<span className="text-gold">Way</span>
          </span>
        </Link>
        <Link
          href={`/${locale}/list-your-business`}
          className="text-xs sm:text-sm text-navy bg-gold px-3.5 py-2 rounded-md font-semibold hover:brightness-105 transition"
        >
          List your business
        </Link>
      </div>
    </header>
  );
}
