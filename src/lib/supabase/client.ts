import { createBrowserClient } from "@supabase/ssr";

// Browser (Client Component) Supabase client. Reads/writes the auth cookie
// automatically, so RLS sees the signed-in user's JWT.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
