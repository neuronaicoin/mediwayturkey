import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// SUNUCU TARAFI Supabase client (secret key ile).
//
// ⚠️ Bu dosya ASLA tarayıcıya gitmemeli. Sadece server-side kodda
// import edilmeli (API routes, server components, server actions).
// Secret key RLS'i bypass eder — tüm tablolara tam erişim verir.
//
// SUPABASE_SECRET_KEY env değişkeni Railway'de tanımlı olmalı.
// NEXT_PUBLIC_ ön eki YOK — bu yüzden tarayıcıya sızmaz.
// ─────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY ?? "";

export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
