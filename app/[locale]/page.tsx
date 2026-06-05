import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { LANGUAGES, getLanguage } from "@/lib/data/languages";

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
  const lang = getLanguage(locale);
  const firstTreatment = ACTIVE_TREATMENTS[0];
  const firstCity = ACTIVE_CITIES[0];

  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <header className="bg-navy">
        <div className="max-w-container mx-auto px-5 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="leading-none">
            <span className="font-display text-3xl font-semibold text-white tracking-tight">
              Medi<span className="text-gold">Way</span>
            </span>
            <span className="block font-display text-[10px] font-medium text-navy-muted tracking-[4px]">
              {t.brandSuffix}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <details className="relative">
              <summary className="list-none cursor-pointer text-sm text-sky flex items-center gap-1.5">
                <GlobeIcon />
                {lang?.label ?? "English"}
              </summary>
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-1.5 w-44 z-20 max-h-72 overflow-auto">
                {LANGUAGES.map((l) => (
                  <Link key={l.code} href={`/${l.code}`}
                    className="block px-4 py-1.5 text-sm text-navy hover:bg-sky">
                    {l.label}
                  </Link>
                ))}
              </div>
            </details>
            <Link href={`/${locale}/list-your-business`}
              className="text-xs sm:text-sm text-navy bg-gold px-3.5 py-2 rounded-md font-semibold hover:brightness-105 transition">
              {t.nav.listBusiness}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-navy pb-16">
        <div className="max-w-container mx-auto px-5 pt-8 text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            {t.hero.headline}
          </h1>
          <p className="text-sm text-navy-muted mt-3">{t.hero.trustLine}</p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-5 -mt-9 w-full">
        <form action={`/${locale}/${firstTreatment.slug}/${firstCity.slug}`}
          className="bg-white border-2 border-gold rounded-2xl p-2.5 flex flex-col sm:flex-row gap-2 shadow-xl">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:border-r border-gray-100">
            <StethoscopeIcon />
            <div className="text-left flex-1">
              <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">{t.hero.treatmentLabel}</div>
              <select name="treatment" defaultValue={firstTreatment.slug}
                className="w-full text-base text-navy font-semibold bg-transparent outline-none cursor-pointer">
                {ACTIVE_TREATMENTS.map((tr) => (
                  <option key={tr.slug} value={tr.slug}>{tr.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:border-r border-gray-100">
            <PinIcon />
            <div className="text-left flex-1">
              <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">{t.hero.cityLabel}</div>
              <select name="city" defaultValue={firstCity.slug}
                className="w-full text-base text-navy font-semibold bg-transparent outline-none cursor-pointer">
                {ACTIVE_CITIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit"
            className="bg-navy text-white flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base font-semibold hover:bg-navy-light transition">
            <SearchIcon /> {t.hero.searchButton}
          </button>
        </form>
      </div>

      <div className="max-w-container mx-auto px-5 mt-4 w-full">
        <button className="w-full bg-gold-tint border border-gold/40 rounded-xl px-4 py-3 flex items-center gap-3 text-left hover:brightness-[0.99] transition">
          <span className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
            <SparkIcon />
          </span>
          <span className="flex-1 text-sm text-navy font-semibold">{t.ai.entry}</span>
          <ArrowIcon />
        </button>
      </div>

      <section className="max-w-container mx-auto px-5 mt-8 w-full">
        <h2 className="font-display text-lg font-semibold text-navy mb-4">{t.sections.searchTreatment}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ACTIVE_TREATMENTS.map((tr) => {
            const Icon = TREATMENT_ICONS[tr.icon] ?? IconHair;
            return (
              <Link key={tr.slug} href={`/${locale}/${tr.slug}/${firstCity.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md hover:border-gold transition">
                <div className="flex justify-center mb-2"><Icon /></div>
                <div className="text-sm font-semibold text-navy">{tr.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{treatmentSubtitle(tr.slug)}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-container mx-auto px-5 mt-8 w-full">
        <h2 className="font-display text-lg font-semibold text-navy mb-4">{t.sections.popularDestinations}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ACTIVE_CITIES.map((c, i) => (
            <Link key={c.slug} href={`/${locale}/${firstTreatment.slug}/${c.slug}`}
              className="rounded-xl h-28 flex items-center justify-center p-3 hover:brightness-110 transition"
              style={{ background: `linear-gradient(135deg, #0a2540, ${["#21405e", "#2a5168", "#26485f", "#1c3a55", "#234862", "#1e4058"][i % 6]})` }}>
              <span className="text-white text-lg font-semibold tracking-wide">{c.name}</span>
            </Link>
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

      <footer className="bg-navy mt-auto">
        <div className="max-w-container mx-auto px-5 py-8 text-center">
          <span className="font-display text-lg font-semibold text-white">
            Medi<span className="text-gold">Way</span>
          </span>
          <p className="text-xs text-navy-muted mt-2">{t.hero.trustLine}</p>
          <p className="text-[11px] text-navy-muted/60 mt-3">
            {"\u00a9"} {new Date().getFullYear()} MediWayTurkey. {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

function GlobeIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.6" /></svg>;
}
function StethoscopeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 3v5a4 4 0 0 0 8 0V3" stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" /><path d="M9 12v3a5 5 0 0 0 10 0v-2" stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" /><circle cx="19" cy="11" r="2" stroke="#0a2540" strokeWidth="1.6" /></svg>;
}
function PinIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="#0a2540" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.5" stroke="#0a2540" strokeWidth="1.6" /></svg>;
}
function SearchIcon({ gold }: { gold?: boolean }) {
  const c = gold ? "#fbbf24" : "currentColor";
  const s = gold ? "20" : "16";
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.8" /><path d="m20 20-3.5-3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function SparkIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="#fbbf24" /></svg>;
}
function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="#0a2540" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CompareIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="7" height="14" rx="1.5" stroke="#fbbf24" strokeWidth="1.8" /><rect x="14" y="5" width="7" height="14" rx="1.5" stroke="#fbbf24" strokeWidth="1.8" /></svg>;
}
function ChatIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5Z" stroke="#fbbf24" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}
