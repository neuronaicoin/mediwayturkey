import { createClient } from "@supabase/supabase-js";

// Railway'e eklediğimiz env değişkenlerinden okur.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Tarayıcı + sunucu tarafında kullanılabilen genel client (publishable key).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
