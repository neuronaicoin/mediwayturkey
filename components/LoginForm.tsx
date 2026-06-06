"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function LoginForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.push(`/${locale}/dashboard`);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md mx-auto">
      <h1 className="font-display text-xl font-semibold text-navy mb-5">Log in</h1>

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
        placeholder="Your password"
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:border-gold mb-4"
      />

      {error && <div className="text-xs text-red-500 mb-3">{error}</div>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy-light transition disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="text-xs text-center text-slate-body mt-4">
        New here?{" "}
        <a href={`/${locale}/list-your-business`} className="text-navy font-semibold underline">
          Create an account
        </a>
      </p>
    </div>
  );
}
