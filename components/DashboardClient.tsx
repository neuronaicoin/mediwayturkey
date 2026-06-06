"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProfileEditor } from "@/components/ProfileEditor";
import { loadProfile, type ProfileData, type TreatmentSelection } from "@/lib/profile";

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
  const [providerId, setProviderId] = useState("");
  const [provider, setProvider] = useState<ProviderInfo | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  const [initialProfile, setInitialProfile] = useState<Partial<ProfileData>>({});
  const [initialTreatments, setInitialTreatments] = useState<TreatmentSelection>({});
  const [initialPhotos, setInitialPhotos] = useState<{ id: string; url: string }[]>([]);

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
      setProviderId(session.user.id);

      const { data: prov } = await supabase
        .from("providers")
        .select("business_name, plan, subscription_status, is_published, trial_ends_at")
        .eq("id", session.user.id)
        .single();

      if (active && prov) {
        const p = prov as ProviderInfo;
        setProvider(p);
        setIsPublished(p.is_published);
      }

      const loaded = await loadProfile(session.user.id);
      if (active && loaded) {
        setInitialProfile(loaded.profile);
        setInitialTreatments(loaded.treatments);
        setInitialPhotos(loaded.photos);
      }

      if (active) setLoading(false);
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
    const days = Math.ceil((end - Date.now()) / (1000 * 60 * 60 * 24));
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
        <button onClick={handleLogout}
          className="text-xs border border-gray-300 text-navy px-3 py-2 rounded-lg hover:bg-sky transition">
          Log out
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400">Plan</div>
          <div className="text-base font-semibold text-navy capitalize">{provider?.plan ?? "standard"}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400">Free trial</div>
          <div className="text-base font-semibold text-emerald-trust">
            {days !== null ? `${days} days left` : "Active"}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400">Status</div>
          <div className="text-base font-semibold text-navy">{isPublished ? "Published" : "Draft"}</div>
        </div>
      </div>

      {isPublished && (
        <div className="bg-emerald-trust/10 border border-emerald-trust/30 rounded-xl p-3 mb-5 text-center">
          <p className="text-xs text-navy font-medium">
            Your profile is live and can receive patient leads.
          </p>
        </div>
      )}

      <ProfileEditor
        providerId={providerId}
        initialProfile={initialProfile}
        initialTreatments={initialTreatments}
        initialPhotos={initialPhotos}
        onPublishedChange={setIsPublished}
      />
    </div>
  );
}
