"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function SignupForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {
    setError("");
    if (!businessName.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);

    // 1) Supabase Auth ile hesap oluştur
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (authError) {
      setLoading(false);
      setError(authError.message);
      return;
    }

    // 2) providers tablosuna temel kayıt (auth user id ile bağ)
    const userId = data.user?.id;
    if (userId) {
      const { error: dbError } = await supabase.from("providers").insert([
        {
          id: userId,
          email: email.trim(),
          business_name: businessName.trim(),
          business_type: "clinic",
          is_published: false,
        },
      ]);
      if (dbError) {
        // Auth oluştu ama profil yazılamadı — yine de devam, panelde tamamlanır
        console.error("Provider insert error:", dbError.message);
      }
    }

    setLoading(false);
    router.push(`/${locale}/dashboard`);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md mx-auto">
      <h1 className="font-display text-xl font-semibold text-navy mb-1">
        List your business
      </h1>
      <p className="text-sm text-slate-body mb-5">
        Create your account. First month free, no card required.
      </p>

      <label className="block text-xs font-medium text-navy mb-1">Business name</label>
      <input
        value={businessName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
        placeholder="e.g. Estetik Hair Clinic"
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:border-gold mb-3"
      />

      <label className="block text-xs font-medium text-navy mb-1">Email</label>
      <input
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        type="email"
        placeholder="you@clinic.com"
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:border-gold mb-3"
      />

      <label className="block text-xs font-medium text-navy mb-1">Password</label>
      <input
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        type="password"
        placeholder="At least 6 characters"
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:border-gold mb-4"
      />

      {error && <div className="text-xs text-red-500 mb-3">{error}</div>}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy-light transition disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-xs text-center text-slate-body mt-4">
        Already have an account?{" "}
        <a href={`/${locale}/login`} className="text-navy font-semibold underline">
          Log in
        </a>
      </p>
    </div>
  );
}
