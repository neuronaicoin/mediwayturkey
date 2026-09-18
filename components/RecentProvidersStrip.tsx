import Link from "next/link";
import { getRecentPublishedProviders } from "@/lib/providers";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";

interface Props {
  locale: string;
}

// Yeni katılan (gerçek, yayınlanmış) provider'ları gösteren, sürekli
// yatayda kayan bir şerit. Az provider varken bile boş görünmesin diye
// sona her zaman "Yerinizi alın" kartı eklenir — sayı arttıkça şerit
// otomatik uzar, ekstra bir değişiklik gerekmez.
export async function RecentProvidersStrip({ locale }: Props) {
  const providers = await getRecentPublishedProviders(12);

  // Hiç yayınlanmış provider yoksa, bölümü tamamen gizle —
  // boş bir şerit göstermek "buraya gelen"e daha kötü görünür.
  if (providers.length === 0) return null;

  function treatmentName(slug: string | null) {
    if (!slug) return null;
    return ACTIVE_TREATMENTS.find((t) => t.slug === slug)?.shortName ?? null;
  }

  const cards = providers.map((p) => (
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
        {treatmentName(p.treatmentSlug) && (
          <div className="text-[10.5px] text-slate-soft truncate mt-0.5">
            {treatmentName(p.treatmentSlug)}
          </div>
        )}
      </div>
    </Link>
  ));

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
      </div>
      <style>{`
        .rp-scroll{display:flex;align-items:stretch;width:max-content;animation:rpscroll 30s linear infinite;padding:0 20px}
        .rp-scroll:hover{animation-play-state:paused}
        @keyframes rpscroll{to{transform:translateX(-50%)}}
      `}</style>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="rp-scroll">{loop}</div>
      </div>
    </section>
  );
}
