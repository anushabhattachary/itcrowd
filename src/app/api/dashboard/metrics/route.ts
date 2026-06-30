import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Admin overview metrics. RLS restricts these tables to admins, so this route
// returns meaningful counts only for an authenticated admin session.
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const [companiesRes, influencersRes, campaignsRes, closedDealsRes] = await Promise.all([
      supabase.from("companies").select("id", { count: "exact", head: true }).eq("stage", "Campaign Live"),
      supabase.from("influencers").select("id", { count: "exact", head: true }),
      supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("status", "Campaign Live"),
      supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("status", "Completed"),
    ]);

    const { data: recentComp } = await supabase
      .from("companies")
      .select("id, company_name, created_at, stage")
      .order("created_at", { ascending: false })
      .limit(5);
    const { data: recentInfl } = await supabase
      .from("influencers")
      .select("id, handle, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    return Response.json({
      metrics: {
        activeCompanies: companiesRes.count || 0,
        networkInfluencers: influencersRes.count || 0,
        activeCampaigns: campaignsRes.count || 0,
        dealsClosed: closedDealsRes.count || 0,
      },
      recentActivity: { companies: recentComp, influencers: recentInfl },
    });
  } catch {
    return Response.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
