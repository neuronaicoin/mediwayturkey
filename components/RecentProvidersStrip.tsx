import Link from "next/link";
import { getRecentPublishedProviders } from "@/lib/providers";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { ProviderCarousel } from "@/components/ProviderCarousel";

interface Props {
  locale: string;
}

// Yeni katılan (gerçek, yayınlanmış) provider'ları gösteren şerit.
// Hem otomatik kayar hem kullanıcı elle kaydırabilir (ProviderCarousel).
// Her kartın altında provider'ın kayıt sırasında girdiği gerçek
// kategori + şehir bilgisi gösterilir.
export async function RecentProvidersStrip({ locale }: Props) {
  const providers = await getRecentPublishedProviders(12);

  // Hiç yayınlanmış provider yoksa, bölümü tamamen gizle —
  // boş bir şerit göstermek "buraya gelen"e daha kötü görünür.
  if (providers.length === 0) return null;

  function treatmentName(slug: string | null) {
    if (!slug) return null;
    return ACTIVE_TREATMENTS.find((t) => t.slug === slug)?.shortName ?? null;
  }
  function cityNames(slugs: string[]) {
    if (!slugs || slugs.length === 0) return null;
    const names = slugs
      .map((s) => ACTIVE_CITIES.find((c) => c.slug === s)?.name)
      .filter(Boolean);
    if (names.length === 0) return null;
    return names.slice(0, 2).join(", ") + (names.length > 2 ? ` +${names.length - 2}` : "");
  }

  const cards = providers.map((p) => {
    const tName = treatmentName(p.treatmentSlug);
    const cNames = cityNames(p.cities);
    return (
      <Link
        key={p.id}
        href={`/${locale}/provider/${p.id}`}
        className="flex-shrink-0 w-40 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md active:scale-[0.97] transition-all overflow-hidden mr-3"
      >
        <div className="w-full h-24 bg-gold-tint flex items-center justify-center overflow-hidden">
          {p.coverPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.coverPhoto} alt={p.businessName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-display font-bold text-gold-deep">
              {p.businessName.charAt(0)}
            </span>
          )}
        </div>
        <div className="p-2.5">
          <div className="text-[12px] font-semibold text-navy truncate">{p.businessName}</div>
          {tName && <div className="text-[10.5px] text-slate-soft truncate mt-0.5">{tName}</div>}
          {cNames && (
            <div className="text-[9.5px] text-gold-deep truncate mt-0.5 flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" fill="#c9a84c" />
              </svg>
              {cNames}
            </div>
          )}
        </div>
      </Link>
    );
  });

  // Sona her zaman eklenen katılım daveti kartı
  const joinCard = (
    <Link
      key="join-cta"
      href={`/${locale}/list-your-business`}
      className="flex-shrink-0 w-40 bg-navy rounded-2xl flex flex-col items-center justify-center text-center p-3 active:scale-[0.97] transition-transform mr-3"
    >
      <span className="text-gold text-2xl leading-none mb-1">+</span>
      <span className="text-[12px] font-semibold text-white leading-tight">Your clinic could be here</span>
      <span className="text-[10.5px] text-gold-tint mt-1">Join free →</span>
    </Link>
  );

  const allCards = [...cards, joinCard];
  // Az karttayken bile akıcı dönsün diye listeyi ikiye katlıyoruz.
  const loop = [...allCards, ...allCards];

  return (
    <section className="mt-10 w-full">
      <div className="text-center mb-5 px-5">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">Recently joined</h2>
        <div className="w-10 h-[3px] bg-gold rounded-full mx-auto mt-2.5" />
        <p className="text-[11px] text-slate-soft mt-1.5">Swipe to browse →</p>
      </div>
      <ProviderCarousel>{loop}</ProviderCarousel>
    </section>
  );
}
