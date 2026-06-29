import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AccountContext, Profile } from "@/lib/types";

// Authenticated user (validated against Supabase Auth, not just the cookie).
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

// Full account context: profile + linked company/influencer + onboarding status.
export const getAccountContext = cache(
  async (): Promise<AccountContext | null> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single<Profile>();
    if (!profile) return null;

    let companyId: string | null = null;
    let influencerId: string | null = null;
    let onboarded = true; // admins are always "onboarded"

    if (profile.role === "business") {
      const { data: bp } = await supabase
        .from("business_profiles")
        .select("company_id, onboarding_complete")
        .eq("id", user.id)
        .maybeSingle();
      companyId = bp?.company_id ?? null;
      onboarded = !!bp?.onboarding_complete;
    } else if (profile.role === "influencer") {
      const { data: ip } = await supabase
        .from("influencer_profiles")
        .select("influencer_id, onboarding_complete")
        .eq("id", user.id)
        .maybeSingle();
      influencerId = ip?.influencer_id ?? null;
      onboarded = !!ip?.onboarding_complete;
    }

    return { userId: user.id, profile, companyId, influencerId, onboarded };
  }
);

// Require a signed-in, fully-onboarded user for dashboard routes.
export async function requireOnboarded(): Promise<AccountContext> {
  const ctx = await getAccountContext();
  if (!ctx) redirect("/login");
  if (!ctx.onboarded) redirect("/onboarding");
  return ctx;
}
