"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface ProviderInfo {
  business_name: string;
  plan: string;
  subscription_status: string;
  is_published: boolean;
  trial_ends_at: string | null;
}

export function DashboardClient({ locale }: { locale: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<ProviderInfo | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        router.push(`/${locale}/login`);
        return;
      }
      if (!active) return;
      setEmail(session.user.email ?? "");

      const { data: prov } = await supabase
        .from("providers")
        .select("business_name, plan, subscription_status, is_published, trial_ends_at")
        .eq("id", session.user.id)
        .single();

      if (active) {
        setProvider((prov as ProviderInfo) ?? null);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [locale, router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push(`/${locale}`);
  }

  function trialDaysLeft(): number | null {
    if (!provider?.trial_ends_at) return null;
    const end = new Date(provider.trial_ends_at).getTime();
    const now = Date.now();
    const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }

  if (loading) {
    return (
      <div className="max-w-container mx-auto px-5 py-16 text-center text-sm text-slate-body">
        Loading...
      </div>
    );
  }

  const days = trialDaysLeft();

  return (
    <div className="max-w-container mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">
            {provider?.business_name ?? "Your business"}
          </h1>
          <p className="text-xs text-slate-body mt-1">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs border border-gray-300 text-navy px-3 py-2 rounded-lg hover:bg-sky transition"
        >
          Log out
        </button>
      </div>

      {/* Durum kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400">Plan</div>
          <div className="text-base font-semibold text-navy capitalize">
            {provider?.plan ?? "standard"}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400">Free trial</div>
          <div className="text-base font-semibold text-emerald-trust">
            {days !== null ? `${days} days left` : "Active"}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400">Status</div>
          <div className="text-base font-semibold text-navy">
            {provider?.is_published ? "Published" : "Draft"}
          </div>
        </div>
      </div>

      {/* Profil tamamlama uyarısı */}
      {!provider?.is_published && (
        <div className="bg-gold-tint border border-gold/40 rounded-xl p-5 text-center">
          <p className="text-sm text-navy font-semibold mb-1">
            Your profile isn't live yet
          </p>
          <p className="text-xs text-slate-body">
            Add your treatments and photos to get published and start receiving patient leads.
            (Profile setup coming in the next step.)
          </p>
        </div>
      )}
    </div>
  );
}
