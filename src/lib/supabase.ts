import { createClient } from "@supabase/supabase-js";

// TEMPORARY DEBUG - REMOVE AFTER TESTING!
console.log("🔍 Checking environment variables:");
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("🚨 Supabase credentials missing! Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);