import { getDictionary } from "@/lib/i18n";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { LANGUAGES } from "@/lib/data/languages";

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);

  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-navy px-6 py-4 flex items-center justify-between">
        <div className="leading-none">
          <span className="font-display text-2xl font-semibold text-white tracking-tight">
            Medi<span className="text-gold">Way</span>
          </span>
          <span className="block font-display text-[8px] font-medium text-navy-muted tracking-[3px]">
            {t.brandSuffix}
          </span>
        </div>
        <span className="text-xs text-white bg-gold px-3 py-1.5 rounded-md font-semibold">
          {t.nav.listBusiness}
        </span>
      </header>

      <section className="max-w-container mx-auto px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold text-navy mb-3">
          {t.hero.headline}
        </h1>
        <p className="text-sm text-slate-body mb-10">{t.hero.trustLine}</p>

        <div className="inline-block text-left bg-white border border-gold rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gold-deep font-semibold mb-4">
            ✓ Skeleton is live — system check
          </p>
          <ul className="space-y-2 text-sm text-slate-body">
            <li>
              <strong>{LANGUAGES.length}</strong> languages configured (active:{" "}
              {LANGUAGES.filter((l) => l.active).length})
            </li>
            <li>
              <strong>{ACTIVE_TREATMENTS.length}</strong> treatments:{" "}
              {ACTIVE_TREATMENTS.map((tr) => tr.shortName).join(", ")}
            </li>
            <li>
              <strong>{ACTIVE_CITIES.length}</strong> cities:{" "}
              {ACTIVE_CITIES.map((c) => c.name).join(", ")}
            </li>
            <li>Current locale: <strong>{params.locale}</strong></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
