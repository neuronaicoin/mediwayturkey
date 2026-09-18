// Next.js otomatik Suspense fallback'i — sayfa/veri yüklenirken gösterilir.
// Gerçek ana sayfanın yapısını (hero + arama + kart gridi) taklit eder.
export default function Loading() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header iskeleti */}
      <div className="h-[60px] bg-navy" />

      {/* Hero iskeleti */}
      <div className="bg-navy px-5 pt-8 pb-16">
        <div className="max-w-container mx-auto flex flex-col items-center gap-3">
          <div className="h-6 w-40 rounded-full bg-white/10 animate-pulse" />
          <div className="h-8 w-64 rounded-lg bg-white/10 animate-pulse mt-2" />
          <div className="h-8 w-48 rounded-lg bg-white/10 animate-pulse" />
        </div>
      </div>

      {/* Arama kartı iskeleti */}
      <div className="max-w-container mx-auto px-5 -mt-9 relative z-10">
        <div className="h-16 rounded-2xl bg-white shadow-md animate-pulse" />
      </div>

      {/* AI buton iskeleti */}
      <div className="max-w-container mx-auto px-5 mt-4">
        <div className="h-16 rounded-2xl bg-white/60 animate-pulse" />
      </div>

      {/* Kategori kartları iskeleti */}
      <div className="max-w-container mx-auto px-5 mt-10">
        <div className="h-6 w-40 rounded bg-gray-200 animate-pulse mx-auto" />
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[60px] rounded-2xl bg-white border border-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
