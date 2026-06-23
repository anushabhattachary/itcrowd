import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // We get simple counts for the dashboard
    const [companiesRes, influencersRes, campaignsRes, closedDealsRes] = await Promise.all([
      supabase.from("companies").select("id", { count: "exact", head: true }).eq("stage", "Campaign Live"),
      supabase.from("influencers").select("id", { count: "exact", head: true }),
      supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("status", "Campaign Live"),
      // Completed deals this month: logic is simple, completed deals all time for now as placeholder for chart
      supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("status", "Completed")
    ]);

    // Format for recent activity (last 10 total active items merged roughly)
    const { data: recentComp } = await supabase.from("companies").select("id, company_name, created_at, stage").order("created_at", { ascending: false }).limit(5);
    const { data: recentInfl } = await supabase.from("influencers").select("id, handle, created_at").order("created_at", { ascending: false }).limit(5);

    return Response.json({
      metrics: {
        activeCompanies: companiesRes.count || 0,
        networkInfluencers: influencersRes.count || 0,
        activeCampaigns: campaignsRes.count || 0,
        dealsClosed: closedDealsRes.count || 0,
      },
      recentActivity: { companies: recentComp, influencers: recentInfl }
    });
  } catch (e) {
    return Response.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
