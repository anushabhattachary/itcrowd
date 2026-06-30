import { createBrowserClient } from "@supabase/ssr";

// Shared browser Supabase client (singleton) used by Client Components.
// Backed by @supabase/ssr so it reads the auth cookie and RLS sees the user.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
