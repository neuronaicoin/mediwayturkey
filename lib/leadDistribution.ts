import { supabase } from "@/lib/supabase";

// ───────────────────────────────────────────────────────────
// LEAD DAĞITIMI — 4 premium + 2 standart = 6 provider
// Boş slot diğer tarafa kayar (premium az ise standart tamamlar, tersi de).
// Lead kaydedildikten hemen sonra çağrılır.
// ───────────────────────────────────────────────────────────

const TOTAL_SLOTS = 6;
const PREMIUM_SLOTS = 4;
const STANDARD_SLOTS = 2;

interface EligibleProvider {
  id: string;
  plan: string;
}

export async function distributeLead(
  leadId: string,
  treatmentSlug: string,
  citySlug: string
): Promise<number> {
  // 1) Bu tedaviyi sunan provider id'lerini bul
  const { data: treatmentRows } = await supabase
    .from("provider_treatments")
    .select("provider_id")
    .eq("treatment_slug", treatmentSlug);

  if (!treatmentRows || treatmentRows.length === 0) return 0;

  const ids = (treatmentRows as { provider_id: string }[]).map((t) => t.provider_id);

  // 2) Yayında + bu şehirde olan provider'ları çek
  const { data: providers } = await supabase
    .from("providers")
    .select("id, plan")
    .in("id", ids)
    .eq("is_published", true)
    .contains("cities", [citySlug]);

  if (!providers || providers.length === 0) return 0;

  const all = providers as EligibleProvider[];
  const premium = shuffle(all.filter((p) => p.plan === "premium"));
  const standard = shuffle(all.filter((p) => p.plan !== "premium"));

  // 3) 4 premium + 2 standart seç, boş slot diğer tarafa kaysın
  const chosen: EligibleProvider[] = [];

  const premiumTaken = premium.slice(0, PREMIUM_SLOTS);
  const standardTaken = standard.slice(0, STANDARD_SLOTS);
  chosen.push(...premiumTaken, ...standardTaken);

  // Boş slotları doldur (toplam 6'ya tamamla)
  if (chosen.length < TOTAL_SLOTS) {
    const remainingPremium = premium.slice(PREMIUM_SLOTS);
    const remainingStandard = standard.slice(STANDARD_SLOTS);
    const filler = shuffle([...remainingPremium, ...remainingStandard]);
    for (const p of filler) {
      if (chosen.length >= TOTAL_SLOTS) break;
      chosen.push(p);
    }
  }

  if (chosen.length === 0) return 0;

  // 4) lead_distributions tablosuna yaz
  const rows = chosen.map((p) => ({
    lead_id: leadId,
    provider_id: p.id,
    plan_at_time: p.plan,
    is_contacted: false,
  }));

  const { error } = await supabase.from("lead_distributions").insert(rows);
  if (error) {
    console.error("distributeLead error:", error.message);
    return 0;
  }
  return rows.length;
}

// Basit karıştırma (adil rotasyon — her seferinde farklı provider'lar)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ───────────────────────────────────────────────────────────
// Provider'ın kendi lead'lerini çek (panel için)
// ───────────────────────────────────────────────────────────

export interface ProviderLead {
  distribution_id: string;
  is_contacted: boolean;
  created_at: string;
  patient_name: string;
  whatsapp_country_code: string;
  whatsapp: string;
  treatment_slug: string;
  city_slug: string;
  details: Record<string, string>;
}

export async function getProviderLeads(providerId: string): Promise<ProviderLead[]> {
  const { data, error } = await supabase
    .from("lead_distributions")
    .select("id, is_contacted, lead_id, leads(created_at, patient_name, whatsapp_country_code, whatsapp, treatment_slug, city_slug, details)")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("getProviderLeads error:", error?.message);
    return [];
  }

  // Supabase join sonucunu düz yapıya çevir
  const result: ProviderLead[] = [];
  for (const row of data as any[]) {
    const lead = row.leads;
    if (!lead) continue;
    result.push({
      distribution_id: row.id,
      is_contacted: row.is_contacted,
      created_at: lead.created_at,
      patient_name: lead.patient_name,
      whatsapp_country_code: lead.whatsapp_country_code,
      whatsapp: lead.whatsapp,
      treatment_slug: lead.treatment_slug,
      city_slug: lead.city_slug,
      details: lead.details ?? {},
    });
  }
  return result;
}

// Lead'i "iletişime geçildi" olarak işaretle
export async function markContacted(distributionId: string): Promise<boolean> {
  const { error } = await supabase
    .from("lead_distributions")
    .update({ is_contacted: true })
    .eq("id", distributionId);
  return !error;
}
