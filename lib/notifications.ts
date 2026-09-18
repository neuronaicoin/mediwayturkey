import { supabase } from "@/lib/supabase";

// Bu provider'a dağıtılmış lead'lerden, EN SON görülme zamanından
// (last_notifications_seen_at) sonra gelenlerin sayısını döner.
// Hiç görülmemişse (null), tüm lead'ler "okunmamış" sayılır.
export async function getUnreadLeadCount(providerId: string): Promise<number> {
  const { data: prov } = await supabase
    .from("providers")
    .select("last_notifications_seen_at")
    .eq("id", providerId)
    .single();

  const lastSeen = (prov as { last_notifications_seen_at: string | null } | null)
    ?.last_notifications_seen_at;

  let query = supabase
    .from("lead_distributions")
    .select("id", { count: "exact", head: true })
    .eq("provider_id", providerId);

  if (lastSeen) {
    query = query.gt("created_at", lastSeen);
  }

  const { count } = await query;
  return count ?? 0;
}

// En son lead_distributions.created_at değerini döner (yeni lead algılamak için
// dashboard açıkken periyodik kontrolde kullanılır).
export async function getLatestLeadTimestamp(providerId: string): Promise<string | null> {
  const { data } = await supabase
    .from("lead_distributions")
    .select("created_at")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return (data as { created_at: string } | null)?.created_at ?? null;
}

// Zile basıldığında çağrılır — "görüldü" zamanını şimdi olarak işaretler.
export async function markNotificationsSeen(providerId: string): Promise<boolean> {
  const { error } = await supabase
    .from("providers")
    .update({ last_notifications_seen_at: new Date().toISOString() })
    .eq("id", providerId);
  return !error;
}
