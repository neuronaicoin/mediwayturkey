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
import { HeroRotator } from "@/components/HeroRotator";

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

// Ana sayfa FAQ — fiyat, güvenlik, süreç odaklı 4 soru (tam liste /faq sayfasında)
const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Is MediWayTurkey free for patients?",
    a: "Yes. MediWayTurkey is completely free for patients and takes no commission on any treatment. Providers pay a subscription to be listed, so there is no markup added to your treatment.",
  },
  {
    q: "Why is treatment in Turkey more affordable?",
    a: "Lower operating costs and strong local competition mean prices are often far lower than in Western Europe, without a drop in quality at serious providers. Many offer all-inclusive packages covering hotel and transfers.",
  },
  {
    q: "How do I know a provider is trustworthy?",
    a: "We verify providers on the platform, but you should still do your own checks: ask who performs the procedure, request real before-and-after photos, get the package contents in writing, and notice how clearly they communicate.",
  },
  {
    q: "How do I contact a provider?",
    a: "Choose a treatment and city, browse and compare verified providers, then contact your chosen provider directly — usually via WhatsApp. There is no middleman in the conversation.",
  },
];

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  const locale = params.locale;

  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <HomeSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOME_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <header className="bg-navy">
        <div className="max-w-container mx-auto px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-1.5 sm:gap-2">
          <Link href={`/${locale}`} className="leading-none flex-shrink-0">
            <span className="font-display text-xl sm:text-3xl font-semibold text-white tracking-tight">
              Medi<span className="text-gold">Way</span>
            </span>
            <span className="hidden sm:block font-display text-[10px] font-medium text-navy-muted tracking-[4px]">
              {t.brandSuffix}
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-4 min-w-0">
            <span className="border border-gold/50 rounded-full px-1.5 sm:px-2.5 py-1 flex-shrink-0">
              <LanguagePicker locale={locale} />
            </span>
            <Link href={`/${locale}/blog`}
              className="hidden sm:inline text-sm text-sky hover:text-white transition border border-gold/50 rounded-full px-3 py-1 flex-shrink-0">
              {t.nav.blog}
            </Link>
            <Link href={`/${locale}/login`}
              className="text-[11px] sm:text-sm text-sky hover:text-white transition whitespace-nowrap border border-gold/50 rounded-full px-2 sm:px-3 py-1 flex-shrink-0">
              Sign in
            </Link>
            <Link href={`/${locale}/list-your-business`}
              className="text-[11px] sm:text-sm text-navy bg-gold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-md font-semibold hover:brightness-105 transition whitespace-nowrap flex-shrink-0">
              <span className="sm:hidden">List</span>
              <span className="hidden sm:inline">{t.nav.listBusiness}</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative bg-navy pb-6 sm:pb-8 overflow-hidden">
        {/* Zarif arka plan deseni — dış görsele bağımlı değil, her zaman yüklenir */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-[0.14]"
            style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 68%)" }}
          />
          <div
            className="absolute -bottom-32 -left-20 w-[380px] h-[380px] rounded-full opacity-[0.10]"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 68%)" }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#fbbf24" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-container mx-auto px-5 pt-6 sm:pt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-gold/30 rounded-full px-4 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[10px] sm:text-xs font-semibold text-gold tracking-wide uppercase">Turkey&apos;s Trusted Medical Network</span>
          </div>
          <HeroRotator />
          <div className="w-14 h-[3px] bg-gold rounded-full mx-auto mt-3" />
        </div>
      </section>

      <div className="max-w-container mx-auto px-5 mt-4 w-full">
        <SearchBar locale={locale} labels={{ treatment: t.hero.treatmentLabel, city: t.hero.cityLabel, search: t.hero.searchButton }} />
      </div>

      <div className="max-w-container mx-auto px-5 mt-4 w-full">
        <AiEntry locale={locale} label={t.ai.entry} />
      </div>

      <section className="max-w-container mx-auto px-5 mt-8 w-full">
        <div className="text-center mb-4">
          <span className="inline-block bg-gold-tint border border-gold/60 rounded-full px-4 py-1.5">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-deep">{t.sections.searchTreatment}</h2>
          </span>
        </div>
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
        <div className="text-center mb-4">
          <span className="inline-block bg-gold-tint border border-gold/60 rounded-full px-4 py-1.5">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-deep">{t.sections.popularDestinations}</h2>
          </span>
        </div>
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
        <div className="text-center mb-5">
          <span className="inline-block bg-gold-tint border border-gold/60 rounded-full px-4 py-1.5">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-deep">{t.sections.howItWorks}</h2>
          </span>
        </div>
        <div className="relative bg-navy rounded-2xl py-8 px-5 sm:px-8 overflow-hidden">
          {/* zarif arka plan dekoru */}
          <div
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-[0.10] pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 68%)" }}
          />
          <div className="relative grid grid-cols-3 gap-2 sm:gap-4">
            {/* bağlantı çizgisi — kutucukların arkasında, ortadan geçiyor */}
            <div className="absolute top-6 left-[16.5%] right-[16.5%] h-[2px] bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10" />

            {[
              { label: t.sections.step1, Icon: SearchIcon },
              { label: t.sections.step2, Icon: CompareIcon },
              { label: t.sections.step3, Icon: ChatIcon },
            ].map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-[0_0_0_5px_#0a2540]">
                  <s.Icon gold={false} navy />
                </div>
                <span className="text-[10px] font-bold text-gold mt-2.5 tracking-wide">STEP {i + 1}</span>
                <span className="text-xs sm:text-sm text-white font-semibold mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-5 mt-8 mb-14 w-full">
        <div className="text-center mb-4">
          <span className="inline-block bg-gold-tint border border-gold/60 rounded-full px-4 py-1.5">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-deep">Common questions</h2>
          </span>
        </div>
        <div className="space-y-2.5 max-w-2xl mx-auto">
          {HOME_FAQS.map((f, i) => (
            <details key={i} className="bg-white rounded-xl border border-navy/10 p-4 group">
              <summary className="list-none cursor-pointer font-semibold text-navy text-sm flex items-center justify-between gap-3">
                {f.q}
                <span className="text-gold text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-navy/70 leading-relaxed text-[13.5px] mt-2.5">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href={`/${locale}/faq`} className="text-sm text-navy-muted hover:text-gold-deep transition font-medium">
            See all questions →
          </Link>
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

function SearchIcon({ gold, navy }: { gold?: boolean; navy?: boolean }) {
  const c = navy ? "#0a2540" : gold ? "#fbbf24" : "currentColor";
  const s = "20";
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.8" /><path d="m20 20-3.5-3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function CompareIcon({ navy }: { navy?: boolean } = {}) {
  const c = navy ? "#0a2540" : "#fbbf24";
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="7" height="14" rx="1.5" stroke={c} strokeWidth="1.8" /><rect x="14" y="5" width="7" height="14" rx="1.5" stroke={c} strokeWidth="1.8" /></svg>;
}
function ChatIcon({ navy }: { navy?: boolean } = {}) {
  const c = navy ? "#0a2540" : "#fbbf24";
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}
