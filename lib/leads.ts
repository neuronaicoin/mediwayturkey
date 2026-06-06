import { supabase } from "@/lib/supabase";
import { distributeLead } from "@/lib/leadDistribution";

export interface NewLead {
  patient_name: string;
  whatsapp_country_code: string;
  whatsapp: string;
  treatment_slug: string;
  city_slug: string;
  details: Record<string, string>;
  locale: string;
  consent: boolean;
}

// Lead'i Supabase'e kaydeder + hemen 6 provider'a dağıtır. Başarılıysa true döner.
export async function submitLead(lead: NewLead): Promise<boolean> {
  const { data, error } = await supabase
    .from("leads")
    .insert([lead])
    .select("id")
    .single();

  if (error || !data) {
    console.error("Lead submit error:", error?.message);
    return false;
  }

  // Lead kaydedildi — hemen dağıt (4 premium + 2 standart)
  const leadId = (data as { id: string }).id;
  await distributeLead(leadId, lead.treatment_slug, lead.city_slug);

  return true;
}
