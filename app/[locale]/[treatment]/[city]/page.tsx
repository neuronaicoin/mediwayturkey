import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { getDictionary } from "@/lib/i18n";
import { getTreatment, ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { getCity, ACTIVE_CITIES } from "@/lib/data/cities";
import { getProvidersForListing } from "@/lib/providers";
import { ListingSchema } from "@/components/SchemaOrg";

interface PageParams {
  params: { locale: string; treatment: string; city: string };
}

// ─── SEO: her tedavi×şehir için başlık/açıklama ───
export function generateMetadata({ params }: PageParams): Metadata {
  const tr = getTreatment(params.treatment);
  const city = getCity(params.city);
  if (!tr || !city) return { title: "MediWayTurkey" };
  const title = `${tr.name} in ${city.name} — Compare Clinics | MediWayTurkey`;
  const description = `Compare verified ${tr.name.toLowerCase()} clinics in ${city.name}, Turkey. Free for patients, no commission. Connect directly with trusted providers.`;
  return { title, description };
}

export default async function ListingPage({ params }: PageParams) {
  const { locale } = params;
  const t = getDictionary(locale);
  const tr = getTreatment(params.treatment);
  const city = getCity(params.city);

  if (!tr || !city) notFound();

  const results = await getProvidersForListing(params.treatment, params.city);

  // Bu tedavinin filtre alanları (modüler — saç teknikleri, diş branşları)
  const filterGroups = tr.fields;

  return (
    <main className="min-h-screen bg-cream font-body">
      <ListingSchema
        treatmentName={tr.name}
        cityName={city.name}
        treatmentSlug={params.treatment}
        citySlug={params.city}
        locale={locale}
      />
      <TopBar locale={locale} />

      {/* Arama özeti çubuğu */}
      <div className="bg-navy/95 border-b border-white/10">
        <div className="max-w-container mx-auto px-5 py-3 flex items-center gap-2 text-sm text-white">
          <span className="font-semibold">{tr.name}</span>
          <span className="text-navy-muted">in</span>
          <span className="font-semibold">{city.name}</span>
        </div>
      </div>

      <div className="max-w-container mx-auto px-5 py-4">
        <p className="text-sm text-slate-body mb-4">
          {tr.name} in {city.name} —{" "}
          <span className="text-navy font-semibold">
            {results.length} {t.list.resultsFound}
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-5">
          {/* ─── FİLTRE PANELİ ─── */}
          <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
            <div className="text-base font-semibold text-navy mb-4">{t.list.filters}</div>

            {/* Tedaviye özel alanlar (Technique, Branch, ...) */}
            {filterGroups.map((g) => (
              <div key={g.key} className="mb-4">
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  {g.label}
                </div>
                {g.options.slice(0, 6).map((o) => (
                  <label key={o.slug} className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-navy" /> {o.name}
                  </label>
                ))}
              </div>
            ))}

            {/* Package */}
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                {t.list.package}
              </div>
              <label className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                <input type="checkbox" className="accent-navy" /> {t.list.transfer}
              </label>
              <label className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                <input type="checkbox" className="accent-navy" /> {t.list.accommodation}
              </label>
            </div>

            {/* District (şehrin ilçeleri varsa) */}
            {city.districts.length > 0 && (
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  {t.list.district}
                </div>
                {city.districts.map((d) => (
                  <label key={d.slug} className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-navy" /> {d.name}
                  </label>
                ))}
              </div>
            )}
          </aside>

          {/* ─── SONUÇLAR ─── */}
          <section className="flex flex-col gap-3">
            {results.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
                <p className="text-sm text-slate-body">
                  No providers listed here yet. New clinics are joining soon.
                </p>
              </div>
            ) : (
              results.map(({ provider, treatment }) => {
                const isPremium = provider.plan === "premium";
                const techValues: string[] = treatment
                  ? Object.values(treatment.details).flat()
                  : [];
                return (
                  <Link
                    key={provider.id}
                    href={`/${locale}/provider/${provider.id}`}
                    className={`bg-white rounded-xl p-3 flex gap-3 transition hover:shadow-md ${
                      isPremium ? "border-2 border-gold" : "border border-gray-200"
                    }`}
                  >
                    <div className="w-20 h-20 bg-sky rounded-lg flex-shrink-0 relative">
                      {isPremium && (
                        <span className="absolute top-1 left-1 bg-gold text-navy text-[8px] font-bold px-1.5 py-0.5 rounded">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-navy">{provider.business_name}</div>
                      {provider.is_verified && (
                        <div className="text-[10px] text-emerald-trust mt-0.5">
                          ✓ {t.list.verified}
                        </div>
                      )}
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {city.name}
                        {provider.languages.length > 0 &&
                          " · " + provider.languages.map((l) => l.toUpperCase()).join(" · ")}
                      </div>
                      {techValues.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {techValues.slice(0, 4).map((v) => (
                            <span key={v} className="text-[9px] bg-sky text-navy px-2 py-0.5 rounded">
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
