import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { TreatmentCard } from "@/components/TreatmentCard";
import { CityCard } from "@/components/CityCard";
import { AiEntry } from "@/components/AiEntry";
import { LiveInfoTicker } from "@/components/LiveInfoTicker";
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
function IconEye() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12c2.5-4.5 6-7 10-7s7.5 2.5 10 7c-2.5 4.5-6 7-10 7s-7.5-2.5-10-7Z"
        stroke="#0a2540" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" fill="#fbbf24" />
    </svg>
  );
}
function IconBariatric() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3c0 2.5-2 3.5-2 7 0 4 2.5 7 6 7s6-3 6-7c0-2-.7-3-1.5-4"
        stroke="#0a2540" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3c.8.8 1.2 1.6 1.2 2.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 12c1 1.2 2 1.2 3 0" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IconIvf() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="10" r="5.5" stroke="#0a2540" strokeWidth="1.5" />
      <path d="M12 15.5V21M9 18.5h6" stroke="#0a2540" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="10" r="1.6" fill="#fbbf24" />
    </svg>
  );
}
function IconOrthopedics() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.5 5.5a2.2 2.2 0 1 1 3 3L9 8l7 7 .5-.5a2.2 2.2 0 1 1 3 3 2.2 2.2 0 0 1-3-3L16 14 9 7l-.5.5a2.2 2.2 0 0 1-3-3Z"
        stroke="#0a2540" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <circle cx="6.3" cy="6.3" r="1" fill="#fbbf24" />
      <circle cx="17.7" cy="17.7" r="1" fill="#fbbf24" />
    </svg>
  );
}
function IconCardiology() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20.5c-5-3.2-9-6.7-9-11A5 5 0 0 1 12 6a5 5 0 0 1 9 3.5c0 4.3-4 7.8-9 11Z"
        stroke="#0a2540" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4.5 12h3l1.5-3 2 5 1.5-2.5h7" stroke="#fbbf24" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheckup() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="#0a2540" strokeWidth="1.5" />
      <path d="M9 3.5h6v2H9z" fill="#0a2540" />
      <path d="M8 13l2.5 2.5L16 10" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconOncology() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3c0 3 1.5 4.5 3 6 1.5-1.5 3-3 3-6" stroke="#0a2540" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9c-3 2-5 5-4.5 8.5C8 20 10 21 12 21s4-1 4.5-3.5C17 14 15 11 12 9Z"
        stroke="#0a2540" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="15" r="1.4" fill="#fbbf24" />
    </svg>
  );
}
const TREATMENT_ICONS: Record<string, () => JSX.Element> = {
  hair: IconHair,
  dental: IconDental,
  aesthetics: IconAesthetics,
  eye: IconEye,
  bariatric: IconBariatric,
  ivf: IconIvf,
  orthopedics: IconOrthopedics,
  cardiology: IconCardiology,
  checkup: IconCheckup,
  oncology: IconOncology,
};

function treatmentSubtitle(slug: string): string {
  const map: Record<string, string> = {
    "hair-transplant": "FUE \u00b7 DHI \u00b7 Sapphire",
    dental: "Implants \u00b7 Veneers \u00b7 Smile",
    aesthetics: "Face \u00b7 Body \u00b7 Skin",
    "eye-surgery": "LASIK \u00b7 Cataract \u00b7 PRK",
    bariatric: "Sleeve \u00b7 Bypass \u00b7 Balloon",
    ivf: "IVF \u00b7 ICSI \u00b7 Egg donation",
    orthopedics: "Knee \u00b7 Hip \u00b7 Spine",
    cardiology: "Bypass \u00b7 Valve \u00b7 Stent",
    checkup: "Basic \u00b7 Comprehensive \u00b7 Executive",
    oncology: "Chemo \u00b7 Radio \u00b7 Surgery",
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
            <Link href={`/${locale}/list-your-business`}
              className="text-[11px] sm:text-sm text-navy bg-gold px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-md font-semibold hover:brightness-105 transition whitespace-nowrap flex-shrink-0">
              <span className="sm:hidden">List Business</span>
              <span className="hidden sm:inline">{t.nav.listBusiness}</span>
            </Link>
            <span className="border border-gold/50 rounded-full px-1.5 sm:px-2.5 py-1 flex-shrink-0">
              <LanguagePicker locale={locale} />
            </span>
            <Link href={`/${locale}/blog`}
              className="hidden sm:inline text-sm text-sky hover:text-white transition border border-gold/50 rounded-full px-3 py-1 flex-shrink-0">
              {t.nav.blog}
            </Link>
            <Link href={`/${locale}/login`}
              className="hidden sm:inline text-sm text-sky hover:text-white transition whitespace-nowrap border border-gold/50 rounded-full px-3 py-1 flex-shrink-0">
              Sign in
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

      {/* Arama karti - hero'nun disinda. Mobilde form dikey (uzun) oldugu icin
          bindirme yapmiyoruz (normal akista, kucuk bosluk); sadece masaustunde
          (form tek satir, kisa) hero uzerine hafifce biniyor. */}
      <div className="relative z-10 max-w-container mx-auto px-5 mt-4 sm:-mt-9 w-full">
        <SearchBar locale={locale} labels={{ treatment: t.hero.treatmentLabel, city: t.hero.cityLabel, search: t.hero.searchButton }} />
      </div>

      <div className="max-w-container mx-auto px-5 mt-4 w-full">
        <AiEntry locale={locale} label={t.ai.entry} />
      </div>

      <LiveInfoTicker />

      <section className="max-w-container mx-auto px-5 mt-10 w-full">
        <div className="text-center mb-5">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">{t.sections.searchTreatment}</h2>
          <div className="w-10 h-[3px] bg-gold rounded-full mx-auto mt-2.5" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {ACTIVE_TREATMENTS.map((tr) => {
            const Icon = TREATMENT_ICONS[tr.icon] ?? IconHair;
            const tag = tr.slug === "hair-transplant" || tr.slug === "dental" ? "Popular" : undefined;
            return (
              <TreatmentCard
                key={tr.slug}
                locale={locale}
                treatmentSlug={tr.slug}
                treatmentName={tr.name}
                subtitle={treatmentSubtitle(tr.slug)}
                icon={<Icon />}
                tag={tag}
              />
            );
          })}
        </div>
      </section>

      <section className="max-w-container mx-auto px-5 mt-10 w-full">
        <div className="text-center mb-5">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">{t.sections.popularDestinations}</h2>
          <div className="w-10 h-[3px] bg-gold rounded-full mx-auto mt-2.5" />
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

      <section className="max-w-container mx-auto px-5 mt-10 mb-14 w-full">
        <div className="text-center mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">{t.sections.howItWorks}</h2>
          <div className="w-10 h-[3px] bg-gold rounded-full mx-auto mt-2.5" />
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
        <div className="text-center mb-5">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">Common questions</h2>
          <div className="w-10 h-[3px] bg-gold rounded-full mx-auto mt-2.5" />
        </div>
        <div className="space-y-2 max-w-2xl mx-auto">
          {HOME_FAQS.map((f, i) => (
            <details key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm open:shadow-md open:border-gold/40 p-4 group transition-shadow">
              <summary className="list-none cursor-pointer font-semibold text-navy text-[13.5px] flex items-center justify-between gap-3 active:scale-[0.99] transition-transform">
                {f.q}
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-tint flex items-center justify-center text-gold-deep text-base group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-soft leading-relaxed text-[13px] mt-3 pr-8">{f.a}</p>
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
