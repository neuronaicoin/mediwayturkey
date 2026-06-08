import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { ListingResults, type ListingProvider } from "@/components/ListingResults";
import { getDictionary } from "@/lib/i18n";
import { getTreatment } from "@/lib/data/treatments";
import { getCity } from "@/lib/data/cities";
import { getProvidersForListing } from "@/lib/providers";
import { ListingSchema } from "@/components/SchemaOrg";

// Her ziyarette canlı veri çek (statik cache yok) — yeni provider'lar anında görünür
export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  // Client component'e hafifletilmiş veri hazırla
  const providers: ListingProvider[] = results.map(({ provider, treatment, coverPhoto }) => ({
    id: provider.id,
    business_name: provider.business_name,
    plan: provider.plan,
    is_verified: provider.is_verified,
    languages: provider.languages ?? [],
    districts: provider.districts ?? [],
    techValues: treatment ? Object.values(treatment.details).flat() : [],
    coverPhoto,
  }));

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
        <ListingResults
          locale={locale}
          cityName={city.name}
          citySlug={city.slug}
          providers={providers}
          filterGroups={tr.fields}
          districts={city.districts}
          labels={{
            filters: t.list.filters,
            resultsFound: t.list.resultsFound,
            verified: t.list.verified,
          }}
        />
      </div>
    </main>
  );
}
