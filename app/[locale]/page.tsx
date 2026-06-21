import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { TreatmentCard } from "@/components/TreatmentCard";
import { CityCard } from "@/components/CityCard";
import { AiEntry } from "@/components/AiEntry";
import { HomeSchema } from "@/components/SchemaOrg";
import { ContactForm } from "@/components/ContactForm";
import { LanguagePicker } from "@/components/LanguagePicker";
import { getDictionary } from "@/lib/i18n";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { getLanguage } from "@/lib/data/languages";

function IconHair() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 21c-1-5 0-10 3-14M11 21c0-6 1-11 4-15M15 21c1-5 2.5-9 4-11"
        stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="5.5" cy="20.5" r="1.2" fill="#fbbf24" />
      <circle cx="9.5" cy="20.5" r="1.2" fill="#fbbf24" />
      <circle cx="13.5" cy="20.5" r="1.2" fill="#fbbf24" />
      <circle cx="17.5" cy="20.5" r="1.2" fill="#fbbf24" />
    </svg>
  );
}
function IconDental() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3c-3 0-5 1.5-6.5 1.5S3 3.8 3 6c0 3 1 6 2 9 .6 1.8 1 3.5 2 3.5s1.2-2 1.5-4c.2-1.5.7-2.5 1.5-2.5s1.3 1 1.5 2.5c.3 2 .5 4 1.5 4s1.4-1.7 2-3.5c1-3 2-6 2-9 0-2.2-1-1.5-2.5-1.5S15 3 12 3Z"
        stroke="#0a2540" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconAesthetics() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4c1.5 2.5 1.5 4.5 0 7-1.5-2.5-1.5-4.5 0-7Z" fill="#fbbf24" />
      <path d="M5 8c2.5.5 4 1.8 5 4-2.7.3-4.5-.5-6-2.5M19 8c-2.5.5-4 1.8-5 4 2.7.3 4.5-.5 6-2.5"
        stroke="#0a2540" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 15c1 1.5 1.7 3 3 5 1.3-2 2-3.5 3-5" stroke="#0a2540" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const TREATMENT_ICONS: Record<string, () => JSX.Element> = {
  hair: IconHair,
  dental: IconDental,
  aesthetics: IconAesthetics,
};

function treatmentSubtitle(slug: string): string {
  const map: Record<string, string> = {
    "hair-transplant": "FUE \u00b7 DHI \u00b7 Sapphire",
    dental: "Implants \u00b7 Veneers \u00b7 Smile",
    aesthetics: "Face \u00b7 Body \u00b7 Skin",
  };
  return map[slug] ?? "";
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  const locale = params.locale;

  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <HomeSchema />
      <header className="bg-navy">
        <div className="max-w-container mx-auto px-4 sm:px-5 py-4 flex items-center justify-between gap-2">
          <Link href={`/${locale}`} className="leading-none flex-shrink-0">
            <span className="font-display text-3xl sm:text-3xl font-semibold text-white tracking-tight">
              Medi<span className="text-gold">Way</span>
            </span>
            <span className="block font-display text-[11px] sm:text-[10px] font-medium text-navy-muted tracking-[4px]">
              {t.brandSuffix}
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguagePicker locale={locale} />
            <Link href={`/${locale}/blog`}
              className="hidden sm:inline text-sm text-sky hover:text-white transition">
              {t.nav.blog}
            </Link>
            <Link href={`/${locale}/login`}
              className="text-xs sm:text-sm text-sky hover:text-white transition whitespace-nowrap">
              Sign in
            </Link>
            <Link href={`/${locale}/list-your-business`}
              className="text-xs sm:text-sm text-navy bg-gold px-3 sm:px-3.5 py-2 rounded-md font-semibold hover:brightness-105 transition whitespace-nowrap">
              {t.nav.listBusiness}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-navy pb-12 sm:pb-16">
        <div className="max-w-container mx-auto px-5 pt-8 text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            {t.hero.headline}
          </h1>
          <p className="text-sm text-navy-muted mt-3">{t.hero.trustLine}</p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-5 mt-4 sm:-mt-9 w-full">
        <SearchBar locale={locale} labels={{ treatment: t.hero.treatmentLabel, city: t.hero.cityLabel, search: t.hero.searchButton }} />
      </div>

      <div className="max-w-container mx-auto px-5 mt-4 w-full">
        <AiEntry locale={locale} label={t.ai.entry} />
      </div>

      <section className="max-w-container mx-auto px-5 mt-8 w-full">
        <h2 className="font-display text-xl font-semibold text-navy mb-4 text-center">{t.sections.searchTreatment}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ACTIVE_TREATMENTS.map((tr) => {
            const Icon = TREATMENT_ICONS[tr.icon] ?? IconHair;
            return (
              <TreatmentCard
                key={tr.slug}
                locale={locale}
                treatmentSlug={tr.slug}
                treatmentName={tr.name}
                subtitle={treatmentSubtitle(tr.slug)}
                icon={<Icon />}
              />
            );
          })}
        </div>
      </section>

      <section className="max-w-container mx-auto px-5 mt-8 w-full">
        <h2 className="font-display text-lg font-semibold text-navy mb-4">{t.sections.popularDestinations}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ACTIVE_CITIES.map((c, i) => (
            <CityCard
              key={c.slug}
              locale={locale}
              citySlug={c.slug}
              cityName={c.name}
              gradientTo={["#21405e", "#2a5168", "#26485f", "#1c3a55", "#234862", "#1e4058"][i % 6]}
            />
          ))}
        </div>
      </section>

      <section className="max-w-container mx-auto px-5 mt-8 mb-14 w-full">
        <h2 className="font-display text-lg font-semibold text-navy mb-4">{t.sections.howItWorks}</h2>
        <div className="bg-navy rounded-xl py-5 px-4 flex justify-around text-center">
          <div className="flex flex-col items-center gap-1.5">
            <SearchIcon gold />
            <span className="text-xs text-white font-semibold">1. {t.sections.step1}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <CompareIcon />
            <span className="text-xs text-white font-semibold">2. {t.sections.step2}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ChatIcon />
            <span className="text-xs text-white font-semibold">3. {t.sections.step3}</span>
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-5 mb-14 w-full">
        <ContactForm />
      </section>

      <footer className="bg-navy mt-auto">
        <div className="max-w-container mx-auto px-5 py-8 text-center">
          <span className="font-display text-lg font-semibold text-white">
            Medi<span className="text-gold">Way</span>
          </span>
          <p className="text-xs text-navy-muted mt-2">{t.hero.trustLine}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-[12px]">
            <Link href={`/${locale}/about`} className="text-navy-muted hover:text-white transition">About</Link>
            <Link href={`/${locale}/contact`} className="text-navy-muted hover:text-white transition">Contact</Link>
            <Link href={`/${locale}/faq`} className="text-navy-muted hover:text-white transition">FAQ</Link>
            <Link href={`/${locale}/blog`} className="text-navy-muted hover:text-white transition">Blog</Link>
            <Link href={`/${locale}/terms`} className="text-navy-muted hover:text-white transition">Terms</Link>
            <Link href={`/${locale}/privacy`} className="text-navy-muted hover:text-white transition">Privacy</Link>
          </div>
          <p className="text-[11px] text-navy-muted/60 mt-3">
            {"\u00a9"} {new Date().getFullYear()} MediWayTurkey. {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

function SearchIcon({ gold }: { gold?: boolean }) {
  const c = gold ? "#fbbf24" : "currentColor";
  const s = gold ? "20" : "16";
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.8" /><path d="m20 20-3.5-3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function CompareIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="7" height="14" rx="1.5" stroke="#fbbf24" strokeWidth="1.8" /><rect x="14" y="5" width="7" height="14" rx="1.5" stroke="#fbbf24" strokeWidth="1.8" /></svg>;
}
function ChatIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5Z" stroke="#fbbf24" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}
