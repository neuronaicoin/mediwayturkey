import Link from "next/link";

// Yeni statik sayfalar (about, contact, privacy, terms, faq) için ortak header + footer.
// Footer linkleri tek yerden yönetilir.

export function SiteHeader({ locale }: { locale: string }) {
  return (
    <header className="bg-navy">
      <div className="max-w-container mx-auto px-4 sm:px-5 py-4 flex items-center justify-between gap-2">
        <Link href={`/${locale}`} className="leading-none flex-shrink-0">
          <span className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Medi<span className="text-gold">Way</span>
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href={`/${locale}/blog`}
            className="hidden sm:inline text-sm text-sky hover:text-white transition">
            Blog
          </Link>
          <Link href={`/${locale}/login`}
            className="text-xs sm:text-sm text-sky hover:text-white transition whitespace-nowrap">
            Sign in
          </Link>
          <Link href={`/${locale}/list-your-business`}
            className="text-xs sm:text-sm text-navy bg-gold px-3 sm:px-3.5 py-2 rounded-md font-semibold hover:brightness-105 transition whitespace-nowrap">
            List your business
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: string }) {
  const col = "flex flex-col gap-2";
  const head = "text-white font-semibold text-sm mb-1";
  const link = "text-[13px] text-navy-muted hover:text-white transition";
  return (
    <footer className="bg-navy mt-auto">
      <div className="max-w-container mx-auto px-5 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className={col}>
            <span className={head}>Treatments</span>
            <Link className={link} href={`/${locale}/hair-transplant/istanbul`}>Hair Transplant</Link>
            <Link className={link} href={`/${locale}/dental/istanbul`}>Dental Treatment</Link>
            <Link className={link} href={`/${locale}/aesthetics/istanbul`}>Aesthetics</Link>
          </div>
          <div className={col}>
            <span className={head}>Resources</span>
            <Link className={link} href={`/${locale}/blog`}>Blog &amp; Guides</Link>
            <Link className={link} href={`/${locale}/faq`}>FAQ</Link>
            <Link className={link} href={`/${locale}/list-your-business`}>For Providers</Link>
          </div>
          <div className={col}>
            <span className={head}>Company</span>
            <Link className={link} href={`/${locale}/about`}>About</Link>
            <Link className={link} href={`/${locale}/contact`}>Contact</Link>
          </div>
          <div className={col}>
            <span className={head}>Legal</span>
            <Link className={link} href={`/${locale}/terms`}>Terms of Service</Link>
            <Link className={link} href={`/${locale}/privacy`}>Privacy Policy</Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <span className="font-display text-lg font-semibold text-white">
            Medi<span className="text-gold">Way</span>
          </span>
          <p className="text-[11px] text-navy-muted/60 mt-2">
            {"\u00a9"} {new Date().getFullYear()} MediWayTurkey. Free for patients. No commission.
          </p>
        </div>
      </div>
    </footer>
  );
}
