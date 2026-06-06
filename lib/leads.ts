import { supabase } from "@/lib/supabase";

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

// Lead'i Supabase'e kaydeder. Başarılıysa true döner.
export async function submitLead(lead: NewLead): Promise<boolean> {
  const { error } = await supabase.from("leads").insert([lead]);
  if (error) {
    console.error("Lead submit error:", error.message);
    return false;
  }
  return true;
}
