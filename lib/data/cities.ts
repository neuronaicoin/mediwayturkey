// ───────────────────────────────────────────────────────────
// ŞEHİRLER — Modüler yapı
// Yeni şehir eklemek için: CITIES dizisine bir nesne ekle.
// slug = URL'de kullanılır (/hair-transplant/istanbul).
// districts = opsiyonel filtre. İstanbul için yaka (Avrupa/Anadolu).
// ───────────────────────────────────────────────────────────
export interface City {
  slug: string; // URL: istanbul, antalya ...
  name: string; // Görünen ad: Istanbul
  districts: { slug: string; name: string }[]; // Bölge/yaka (opsiyonel)
  active: boolean;
}
export const CITIES: City[] = [
  {
    slug: "istanbul",
    name: "Istanbul",
    active: true,
    districts: [
      { slug: "europe", name: "European Side" },
      { slug: "asia", name: "Asian Side" },
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
