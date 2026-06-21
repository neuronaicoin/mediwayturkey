import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { ProviderSchema } from "@/components/SchemaOrg";
import { getDictionary } from "@/lib/i18n";
import { getTreatment } from "@/lib/data/treatments";
import { getCity } from "@/lib/data/cities";
import { getProviderById } from "@/lib/providers";

const BASE = "https://www.mediwayturkey.com";

interface PageParams {
  params: { locale: string; id: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const data = await getProviderById(params.id);
  if (!data) return { title: "MediWayTurkey" };

  const { provider, photos } = data;
  const cityNames = provider.cities.map((c) => getCity(c)?.name ?? c).join(", ");

  const title = `${provider.business_name} | MediWayTurkey`;
  const description =
    provider.bio?.slice(0, 155) ??
    `${provider.business_name} — verified health provider in ${cityNames || "Turkey"}.`;

  const shareImage = photos.length > 0 ? photos[0].url : `${BASE}/og-image.png`;
  const pageUrl = `${BASE}/${params.locale}/provider/${params.id}`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "MediWayTurkey",
      type: "profile",
      images: [{ url: shareImage, width: 1200, height: 630, alt: provider.business_name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function ProviderPage({ params }: PageParams) {
  const { locale } = params;
  const t = getDictionary(locale);
  const data = await getProviderById(params.id);

  if (!data) notFound();

  const { provider, treatments, photos, packages } = data;
  const cityNames = provider.cities
    .map((c) => getCity(c)?.name ?? c)
    .join(", ");

  return (
    <main className="min-h-screen bg-cream font-body">
      <ProviderSchema
        id={provider.id}
        businessName={provider.business_name}
        businessType={provider.business_type}
        bio={provider.bio}
        cityNames={cityNames}
        languages={provider.languages}
        email={provider.email}
        whatsapp={provider.whatsapp}
        whatsappCountryCode={provider.whatsapp_country_code}
        website={provider.website}
        image={photos.length > 0 ? photos[0].url : null}
        isVerified={provider.is_verified}
        locale={locale}
      />
      <TopBar locale={locale} />

      <div className="max-w-container mx-auto px-5 py-5">
        {/* ─── FOTOĞRAF GALERİSİ ─── */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-48 mb-4 rounded-xl overflow-hidden">
            {photos.slice(0, 5).map((p, i) => (
              <div
                key={p.id}
                className={`bg-sky bg-cover bg-center ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                style={{ backgroundImage: `url(${p.url})` }}
              />
            ))}
          </div>
        ) : (
          <div className="h-40 bg-sky rounded-xl mb-4 flex items-center justify-center text-sm text-slate-body">
            No photos yet
          </div>
        )}

        {/* ─── BAŞLIK ─── */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-xl font-semibold text-navy">
                {provider.business_name}
              </h1>
              {provider.is_verified && (
                <div className="text-[11px] text-emerald-trust mt-1">✓ {t.list.verified}</div>
              )}
              <div className="text-[11px] text-gray-500 mt-1">{cityNames}</div>
            </div>
          </div>

          {/* Tedaviler */}
          <div className="flex flex-wrap gap-1.5 my-3">
            {treatments.map((tr) => {
              const meta = getTreatment(tr.treatment_slug);
              return (
                <span key={tr.id} className="text-[11px] bg-sky text-navy px-2.5 py-1 rounded">
                  {meta?.name ?? tr.treatment_slug}
                </span>
              );
            })}
            {provider.languages.length > 0 && (
              <span className="text-[11px] bg-sky text-navy px-2.5 py-1 rounded">
                {provider.languages.map((l) => l.toUpperCase()).join(" · ")}
              </span>
            )}
          </div>

          {/* Bio */}
          {provider.bio && (
            <p className="text-sm text-slate-body leading-relaxed border-t border-gray-100 pt-3">
              {provider.bio}
            </p>
          )}

          {/* Tedavi detayları (teknikler, branşlar) */}
          {treatments.map((tr) => {
            const values = Object.values(tr.details).flat();
            if (values.length === 0) return null;
            const meta = getTreatment(tr.treatment_slug);
            return (
              <div key={tr.id} className="mt-4">
                <div className="text-sm font-semibold text-navy mb-2">
                  {meta?.name} — {t.profile.techniques}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {values.map((v) => (
                    <span key={v} className="text-[11px] border border-gray-200 text-navy px-2.5 py-1 rounded">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Paketler */}
          {packages.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-semibold text-navy mb-2">{t.profile.packages}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="flex-1 border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-navy">{pkg.name}</div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      {pkg.includes.join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* İletişim */}
          <div className="flex flex-col sm:flex-row gap-2 mt-5">
            {provider.whatsapp && (
              <a
                href={`https://wa.me/${(provider.whatsapp_country_code ?? "").replace("+", "")}${provider.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm bg-navy text-white py-2.5 rounded-lg font-semibold hover:bg-navy-light transition"
              >
                {t.profile.whatsapp}
              </a>
            )}
            <a
              href={`mailto:${provider.email}`}
              className="flex-1 text-center text-sm bg-white border border-navy text-navy py-2.5 rounded-lg font-semibold hover:bg-sky transition"
            >
              {t.profile.email}
            </a>
            {provider.website && (
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm bg-white border border-gray-300 text-navy py-2.5 rounded-lg font-semibold hover:bg-sky transition"
              >
                {t.profile.website}
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
