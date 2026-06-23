import { createClient } from "@supabase/supabase-js";

<<<<<<< HEAD
// TEMPORARY DEBUG - REMOVE AFTER TESTING!
console.log("🔍 Checking environment variables:");
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing");

=======
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
<<<<<<< HEAD
  throw new Error("🚨 Supabase credentials missing! Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
=======
  console.warn("Supabase credentials missing. Dashboard data will fail to load.");
}

export const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseKey || "placeholder");
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
