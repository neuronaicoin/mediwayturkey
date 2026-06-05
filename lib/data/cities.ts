// ───────────────────────────────────────────────────────────
// ŞEHİRLER — Modüler yapı
// Yeni şehir eklemek için: CITIES dizisine bir nesne ekle.
// slug = URL'de kullanılır (/hair-transplant/istanbul).
// districts = opsiyonel filtre + programmatic SEO sayfaları.
// ───────────────────────────────────────────────────────────

export interface City {
  slug: string; // URL: istanbul, antalya ...
  name: string; // Görünen ad: Istanbul
  districts: { slug: string; name: string }[]; // İlçeler (opsiyonel)
  active: boolean;
}

export const CITIES: City[] = [
  {
    slug: "istanbul",
    name: "Istanbul",
    active: true,
    districts: [
      { slug: "sisli", name: "Şişli" },
      { slug: "kadikoy", name: "Kadıköy" },
      { slug: "besiktas", name: "Beşiktaş" },
      { slug: "atasehir", name: "Ataşehir" },
      { slug: "bakirkoy", name: "Bakırköy" },
    ],
  },
  { slug: "antalya", name: "Antalya", active: true, districts: [] },
  { slug: "izmir", name: "Izmir", active: true, districts: [] },
  { slug: "ankara", name: "Ankara", active: true, districts: [] },
  { slug: "bursa", name: "Bursa", active: true, districts: [] },
  { slug: "cappadocia", name: "Cappadocia", active: true, districts: [] },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export const ACTIVE_CITIES = CITIES.filter((c) => c.active);
