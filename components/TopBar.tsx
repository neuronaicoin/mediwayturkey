import Link from "next/link";
import { BackButton } from "@/components/BackButton";

// Liste ve profil sayfalarında kullanılan sade üst bar.
export function TopBar({ locale }: { locale: string }) {
  return (
    <header className="bg-navy">
      <div className="max-w-container mx-auto px-5 py-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <BackButton />
          <Link href={`/${locale}`} className="leading-none flex-shrink-0">
            <span className="font-display text-xl font-semibold text-white tracking-tight">
              Medi<span className="text-gold">Way</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/${locale}/blog`}
            className="text-xs sm:text-sm text-sky hover:text-white transition"
          >
            Blog
          </Link>
          <Link
            href={`/${locale}/login`}
            className="text-xs sm:text-sm text-sky hover:text-white transition"
          >
            Log in
          </Link>
          <Link
            href={`/${locale}/list-your-business`}
            className="text-xs sm:text-sm text-navy bg-gold px-3 sm:px-3.5 py-2 rounded-md font-semibold hover:brightness-105 transition whitespace-nowrap"
          >
            List your business
          </Link>
        </div>
      </div>
    </header>
  );
}
