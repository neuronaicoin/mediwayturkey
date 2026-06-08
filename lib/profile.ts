import { supabase } from "@/lib/supabase";

// Profil kaydetme için tip
export interface ProfileData {
  business_name: string;
  business_type: string;
  cities: string[];
  districts: string[];
  languages: string[];
  phone_country_code: string;
  phone: string;
  whatsapp_country_code: string;
  whatsapp: string;
  website: string;
  bio: string;
}

// Tedavi seçimi: { "hair-transplant": { "technique": ["fue","dhi"] }, ... }
export type TreatmentSelection = Record<string, Record<string, string[]>>;

// Mevcut profili oku (dashboard formu için)
export async function loadProfile(providerId: string): Promise<{
  profile: Partial<ProfileData> & { is_published?: boolean };
  treatments: TreatmentSelection;
  photos: { id: string; url: string }[];
} | null> {
  const { data: prov } = await supabase
    .from("providers")
    .select("*")
    .eq("id", providerId)
    .single();

  if (!prov) return null;

  const { data: trts } = await supabase
    .from("provider_treatments")
    .select("treatment_slug, details")
    .eq("provider_id", providerId);

  const { data: pics } = await supabase
    .from("provider_photos")
    .select("id, url")
    .eq("provider_id", providerId)
    .order("sort_order");

  const treatments: TreatmentSelection = {};
  for (const t of (trts ?? []) as { treatment_slug: string; details: Record<string, string[]> }[]) {
    treatments[t.treatment_slug] = t.details ?? {};
  }

  return {
    profile: prov as Partial<ProfileData> & { is_published?: boolean },
    treatments,
    photos: (pics as { id: string; url: string }[]) ?? [],
  };
}

// Profili kaydet (temel bilgiler)
export async function saveProfile(
  providerId: string,
  data: ProfileData
): Promise<boolean> {
  const { error } = await supabase
    .from("providers")
    .update({
      business_name: data.business_name,
      business_type: data.business_type,
      cities: data.cities,
      districts: data.districts,
      languages: data.languages,
      phone_country_code: data.phone_country_code,
      phone: data.phone,
      whatsapp_country_code: data.whatsapp_country_code,
      whatsapp: data.whatsapp,
      website: data.website,
      bio: data.bio,
    })
    .eq("id", providerId);
  if (error) {
    console.error("saveProfile error:", error.message);
    return false;
  }
  return true;
}

// Tedavi seçimlerini kaydet (önce sil, sonra ekle — temiz senkron)
export async function saveTreatments(
  providerId: string,
  selection: TreatmentSelection
): Promise<boolean> {
  // Mevcutları sil
  await supabase.from("provider_treatments").delete().eq("provider_id", providerId);

  const rows = Object.entries(selection).map(([slug, details]) => ({
    provider_id: providerId,
    treatment_slug: slug,
    details,
  }));

  if (rows.length === 0) return true;

  const { error } = await supabase.from("provider_treatments").insert(rows);
  if (error) {
    console.error("saveTreatments error:", error.message);
    return false;
  }
  return true;
}

// Fotoğraf yükle (Storage'a) + provider_photos'a kaydet
export async function uploadPhoto(
  providerId: string,
  file: File,
  sortOrder: number
): Promise<string | null> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${providerId}/${Date.now()}-${sortOrder}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("provider-photos")
    .upload(path, file, { upsert: false });

  if (upErr) {
    console.error("uploadPhoto error:", upErr.message);
    return null;
  }

  const { data: pub } = supabase.storage.from("provider-photos").getPublicUrl(path);
  const url = pub.publicUrl;

  const { error: dbErr } = await supabase
    .from("provider_photos")
    .insert([{ provider_id: providerId, url, sort_order: sortOrder }]);

  if (dbErr) {
    console.error("photo db error:", dbErr.message);
    return null;
  }
  return url;
}

// Fotoğraf sil
export async function deletePhoto(photoId: string): Promise<boolean> {
  const { error } = await supabase.from("provider_photos").delete().eq("id", photoId);
  return !error;
}

// Yayına al / yayından kaldır
export async function setPublished(providerId: string, published: boolean): Promise<boolean> {
  const { error } = await supabase
    .from("providers")
    .update({ is_published: published })
    .eq("id", providerId);
  return !error;
}
