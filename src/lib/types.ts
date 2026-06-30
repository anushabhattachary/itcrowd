// Shared domain types aligned with the Supabase schema.

export type Role = "admin" | "business" | "influencer";

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
  avatar_url: string | null;
  email: string;
  status: "active" | "pending" | "suspended";
  created_at: string;
  updated_at: string;
}

// Resolved context for the signed-in user, including their linked entity.
export interface AccountContext {
  userId: string;
  profile: Profile;
  companyId: string | null; // set for business accounts
  influencerId: string | null; // set for influencer (creator) accounts
  onboarded: boolean;
}
