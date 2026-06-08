import { supabase } from "@/lib/supabase";
// ─── Tipler (veritabanı satırlarıyla eşleşir) ───
export interface ProviderRow {
  id: string;
  business_name: string;
  business_type: string;
  whatsapp_country_code: string | null;
  whatsapp: string | null;
  email: string;
  website: string | null;
  bio: string | null;
  cities: string[];
  districts: string[];
  languages: string[];
  plan: string;
  is_verified: boolean;
  is_published: boolean;
}
export interface ProviderTreatmentRow {
  id: string;
  provider_id: string;
  treatment_slug: string;
  details: Record<string, string[]>;
}
export interface ProviderPhotoRow {
  id: string;
  provider_id: string;
  url: string;
  sort_order: number;
}
export interface ProviderPackageRow {
  id: string;
  provider_id: string;
  treatment_slug: string | null;
  name: string;
  includes: string[];
}
// Liste için: bir tedavi + şehirdeki yayınlanmış provider'lar.
// Premium önce gelir (sıralama). Veritabanı boşsa boş dizi döner (hata vermez).
// coverPhoto: her provider'ın ilk (kapak) fotoğrafı, liste kartında gösterilir.
export async function getProvidersForListing(
  treatmentSlug: string,
  citySlug: string
): Promise<
  {
    provider: ProviderRow;
    treatment: ProviderTreatmentRow | null;
    coverPhoto: string | null;
  }[]
> {
  // 1) Bu tedaviyi sunan provider id'lerini bul
  const { data: treatmentRows, error: tErr } = await supabase
    .from("provider_treatments")
    .select("*")
    .eq("treatment_slug", treatmentSlug);
  if (tErr || !treatmentRows || treatmentRows.length === 0) return [];
  const rows = treatmentRows as ProviderTreatmentRow[];
  const providerIds = rows.map((t) => t.provider_id);
  // 2) Bu provider'lardan yayınlanmış + bu şehirde olanları çek
  const { data: providers, error: pErr } = await supabase
    .from("providers")
    .select("*")
    .in("id", providerIds)
    .eq("is_published", true)
    .contains("cities", [citySlug]);
  if (pErr || !providers) return [];
  const providerList = providers as ProviderRow[];

  // 3) Bu provider'ların kapak fotoğraflarını (sort_order = 0, ilk foto) çek
  const ids = providerList.map((p) => p.id);
  const photoMap: Record<string, string> = {};
  if (ids.length > 0) {
    const { data: photos } = await supabase
      .from("provider_photos")
      .select("provider_id, url, sort_order")
      .in("provider_id", ids)
      .order("sort_order");
    for (const ph of (photos as ProviderPhotoRow[]) ?? []) {
      // Her provider için ilk (en düşük sort_order) fotoğrafı tut
      if (!photoMap[ph.provider_id]) {
        photoMap[ph.provider_id] = ph.url;
      }
    }
  }

  // 4) Premium önce sıralaması
  const sorted = providerList.sort((a, b) => {
    if (a.plan === b.plan) return 0;
    return a.plan === "premium" ? -1 : 1;
  });
  // 5) Her provider'a o tedavi satırını + kapak fotoğrafını eşle
  return sorted.map((provider) => ({
    provider,
    treatment: rows.find((t) => t.provider_id === provider.id) ?? null,
    coverPhoto: photoMap[provider.id] ?? null,
  }));
}
// Profil için: tek provider + tüm ilişkili verileri
export async function getProviderById(id: string): Promise<{
  provider: ProviderRow;
  treatments: ProviderTreatmentRow[];
  photos: ProviderPhotoRow[];
  packages: ProviderPackageRow[];
} | null> {
  const { data: provider, error } = await supabase
    .from("providers")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();
  if (error || !provider) return null;
  const [{ data: treatments }, { data: photos }, { data: packages }] =
    await Promise.all([
      supabase.from("provider_treatments").select("*").eq("provider_id", id),
      supabase
        .from("provider_photos")
        .select("*")
        .eq("provider_id", id)
        .order("sort_order"),
      supabase.from("provider_packages").select("*").eq("provider_id", id),
    ]);
  return {
    provider: provider as ProviderRow,
    treatments: (treatments as ProviderTreatmentRow[]) ?? [],
    photos: (photos as ProviderPhotoRow[]) ?? [],
    packages: (packages as ProviderPackageRow[]) ?? [],
  };
}
