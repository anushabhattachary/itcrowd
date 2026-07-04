"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Users,
  Sparkles,
  Briefcase,
  CheckCircle2,
  Clock,
  FileVideo,
  Loader2,
  TrendingUp,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAccount } from "@/lib/account-context";

// ---------- Types ----------

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
  accent: string; // tailwind text color class for the icon
}

interface RecentContentRow {
  id: string;
  title: string | null;
  status: string | null;
  created_at: string;
}

interface AdminRecentCompany {
  id: string;
  company_name: string | null;
  created_at: string;
  stage: string | null;
}

interface AdminRecentInfluencer {
  id: string;
  handle: string | null;
  created_at: string;
}

interface AdminMetricsResponse {
  metrics: {
    activeCompanies: number;
    networkInfluencers: number;
    activeCampaigns: number;
    dealsClosed: number;
  };
  recentActivity: {
    companies: AdminRecentCompany[] | null;
    influencers: AdminRecentInfluencer[] | null;
  };
}

type ActivityItem =
  | { id: string; kind: "company"; label: string; sub: string; created_at: string }
  | { id: string; kind: "influencer"; label: string; sub: string; created_at: string };

// ---------- Helpers ----------

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function statusBadgeClasses(status: string | null): string {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Revision Requested":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-[#887C71]/10 text-[#5F5D4D] border-[#887C71]/20";
  }
}

// ---------- Component ----------

export default function DashboardOverview() {
  const account = useAccount();
  const { role, displayName, companyId, influencerId } = account;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentContent, setRecentContent] = useState<RecentContentRow[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadAdmin() {
      const res = await fetch("/api/dashboard/metrics");
      if (!res.ok) throw new Error("Failed to load metrics");
      const data = (await res.json()) as AdminMetricsResponse;
      if (cancelled) return;

      const m = data.metrics;
      setStats([
        { label: "Active Companies", value: m.activeCompanies, icon: Building2, accent: "text-[#5F5D4D]" },
        { label: "Network Influencers", value: m.networkInfluencers, icon: Users, accent: "text-[#5F5D4D]" },
        { label: "Active Campaigns", value: m.activeCampaigns, icon: Activity, accent: "text-[#5F5D4D]" },
        { label: "Deals Closed", value: m.dealsClosed, icon: TrendingUp, accent: "text-[#5F5D4D]" },
      ]);

      const companies = data.recentActivity.companies ?? [];
      const influencers = data.recentActivity.influencers ?? [];
      const combined: ActivityItem[] = [
        ...companies.map<ActivityItem>((c) => ({
          id: `company-${c.id}`,
          kind: "company",
          label: c.company_name ?? "New company",
          sub: c.stage ? `Stage: ${c.stage}` : "Company onboarded",
          created_at: c.created_at,
        })),
        ...influencers.map<ActivityItem>((i) => ({
          id: `influencer-${i.id}`,
          kind: "influencer",
          label: i.handle ? `@${i.handle}` : "New influencer",
          sub: "Joined the network",
          created_at: i.created_at,
        })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setRecentActivity(combined.slice(0, 8));
    }

    async function loadBusiness() {
      if (!companyId) {
        setStats([]);
        setRecentContent([]);
        return;
      }

      const [campaignsRes, activeCampaignsRes, contentRes, pendingRes, recentRes] = await Promise.all([
        supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("company_id", companyId),
        supabase
          .from("campaigns")
          .select("id", { count: "exact", head: true })
          .eq("company_id", companyId)
          .eq("status", "Campaign Live"),
        supabase.from("content").select("id", { count: "exact", head: true }).eq("company_id", companyId),
        supabase
          .from("content")
          .select("id", { count: "exact", head: true })
          .eq("company_id", companyId)
          .eq("status", "Pending"),
        supabase
          .from("content")
          .select("id,title,status,created_at")
          .eq("company_id", companyId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (cancelled) return;

      setStats([
        { label: "Total Campaigns", value: campaignsRes.count ?? 0, icon: Briefcase, accent: "text-[#5F5D4D]" },
        { label: "Active Campaigns", value: activeCampaignsRes.count ?? 0, icon: Activity, accent: "text-[#5F5D4D]" },
        { label: "Content Items", value: contentRes.count ?? 0, icon: FileVideo, accent: "text-[#5F5D4D]" },
        { label: "Pending Approvals", value: pendingRes.count ?? 0, icon: Clock, accent: "text-amber-600" },
      ]);

      setRecentContent((recentRes.data as RecentContentRow[] | null) ?? []);
    }

    async function loadInfluencer() {
      if (!influencerId) {
        setStats([]);
        setRecentContent([]);
        return;
      }

      const [assignedRes, uploadedRes, approvedRes, pendingRes, recentRes] = await Promise.all([
        supabase
          .from("campaign_influencers")
          .select("id", { count: "exact", head: true })
          .eq("influencer_id", influencerId),
        supabase.from("content").select("id", { count: "exact", head: true }).eq("influencer_id", influencerId),
        supabase
          .from("content")
          .select("id", { count: "exact", head: true })
          .eq("influencer_id", influencerId)
          .eq("status", "Approved"),
        supabase
          .from("content")
          .select("id", { count: "exact", head: true })
          .eq("influencer_id", influencerId)
          .eq("status", "Pending"),
        supabase
          .from("content")
          .select("id,title,status,created_at")
          .eq("influencer_id", influencerId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (cancelled) return;

      setStats([
        { label: "Campaigns Assigned", value: assignedRes.count ?? 0, icon: Briefcase, accent: "text-[#5F5D4D]" },
        { label: "Content Uploaded", value: uploadedRes.count ?? 0, icon: FileVideo, accent: "text-[#5F5D4D]" },
        { label: "Approved", value: approvedRes.count ?? 0, icon: CheckCircle2, accent: "text-[#5F5D4D]" },
        { label: "Pending", value: pendingRes.count ?? 0, icon: Clock, accent: "text-amber-600" },
      ]);

      setRecentContent((recentRes.data as RecentContentRow[] | null) ?? []);
    }

    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (role === "admin") {
          await loadAdmin();
        } else if (role === "business") {
          await loadBusiness();
        } else {
          await loadInfluencer();
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong loading your dashboard.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [role, companyId, influencerId]);

  const showActivityFeed = role === "admin";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white border border-[#141413]/8 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-medium text-[#887C71] uppercase tracking-wider">
            {role === "admin" ? "Admin Overview" : role === "business" ? "Client Command Center" : "Creator Hub"}
          </span>
          <h1 className="text-3xl font-medium text-[#141413] font-heading">
            Welcome back, {displayName}
          </h1>
          <p className="text-[#887C71] text-sm">
            {role === "admin"
              ? "A live snapshot of your network, campaigns, and deal flow."
              : role === "business"
                ? "Track your campaigns and review creator content from one hub."
                : "Manage your assignments and keep your content moving."}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-[#887C71]">
          <Loader2 className="animate-spin text-[#5F5D4D]" size={28} />
          <span className="text-sm">Loading your dashboard…</span>
        </div>
      ) : error ? (
        <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm text-red-700 font-medium">{error}</p>
          <p className="text-xs text-[#887C71] mt-1">Please refresh the page or try again shortly.</p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm p-6 flex flex-col justify-between group hover:border-[#141413]/15 transition-all hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-medium text-[#887C71] uppercase tracking-wider">{stat.label}</span>
                  <span className={`p-1.5 bg-[#F1F0EF] rounded-lg ${stat.accent} group-hover:bg-[#141413]/10 transition-colors`}>
                    <stat.icon size={16} />
                  </span>
                </div>
                <span className="mt-4 text-3xl font-medium text-[#141413] font-heading">
                  {stat.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Recent list */}
          {showActivityFeed ? (
            <div className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-[#141413] font-heading">Recent activity</h2>
                <p className="text-xs text-[#887C71] mt-0.5">Latest companies and influencers across the network</p>
              </div>

              {recentActivity.length === 0 ? (
                <p className="text-sm text-[#887C71] py-8 text-center">No recent activity yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-[#F1F0EF]/60 border border-[#141413]/8 rounded-xl p-4 hover:border-[#141413]/15 transition-colors"
                    >
                      <span
                        className={`p-2 rounded-lg ${
                          item.kind === "company"
                            ? "bg-[#141413]/5 text-[#5F5D4D]"
                            : "bg-[#887C71]/10 text-[#887C71]"
                        }`}
                      >
                        {item.kind === "company" ? <Building2 size={16} /> : <Sparkles size={16} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#141413] truncate">{item.label}</p>
                        <p className="text-xs text-[#887C71] truncate">{item.sub}</p>
                      </div>
                      <span className="text-[10px] text-[#9E948B] font-medium flex items-center gap-1 shrink-0">
                        <Clock size={10} /> {timeAgo(item.created_at)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-[#141413] font-heading">Recent content</h2>
                <p className="text-xs text-[#887C71] mt-0.5">Your 5 most recently added content items</p>
              </div>

              {recentContent.length === 0 ? (
                <p className="text-sm text-[#887C71] py-8 text-center">No content yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentContent.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center gap-4 bg-[#F1F0EF]/60 border border-[#141413]/8 rounded-xl p-4 hover:border-[#141413]/15 transition-colors"
                    >
                      <span className="p-2 rounded-lg bg-[#141413]/5 text-[#5F5D4D]">
                        <FileVideo size={16} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#141413] truncate">{row.title ?? "Untitled content"}</p>
                        <p className="text-xs text-[#9E948B]">{timeAgo(row.created_at)}</p>
                      </div>
                      <span
                        className={`text-[10px] font-medium uppercase px-2 py-0.5 rounded-md border shrink-0 ${statusBadgeClasses(
                          row.status
                        )}`}
                      >
                        {row.status ?? "Unknown"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
