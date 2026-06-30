"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAccount } from "@/lib/account-context";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Loader2,
  FileText,
  CheckCircle2,
  Clock,
  Layers,
  Eye,
  BarChart3,
} from "lucide-react";

interface ContentRow {
  id: string;
  file_type: "Photo" | "Video" | "Document" | null;
  status: "Pending" | "Approved" | "Revision Requested" | null;
  created_at: string;
  campaign_id: string | null;
  engagement: Record<string, number> | null;
}

const PURPLE = "#7C3AED";
const LIME = "#A3E635";

const tooltipStyle = {
  backgroundColor: "#1A1A27",
  borderColor: "#ffffff10",
  borderRadius: "12px",
  color: "#fff",
};

export default function ReportsPage() {
  const account = useAccount();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);

      let contentQuery = supabase
        .from("content")
        .select("id, file_type, status, created_at, campaign_id, engagement");
      let campaignQuery = supabase
        .from("campaigns")
        .select("id", { count: "exact", head: true });

      if (account.role === "business" && account.companyId) {
        contentQuery = contentQuery.eq("company_id", account.companyId);
        campaignQuery = campaignQuery.eq("company_id", account.companyId);
      } else if (account.role === "influencer" && account.influencerId) {
        contentQuery = contentQuery.eq("influencer_id", account.influencerId);
        // Influencers see campaigns tied to their content below instead.
      }

      const [contentRes, campaignRes] = await Promise.all([
        contentQuery,
        campaignQuery,
      ]);

      if (!active) return;

      const data = (contentRes.data ?? []) as ContentRow[];
      setRows(data);

      if (account.role === "influencer") {
        // Count distinct campaigns appearing in this influencer's content.
        const distinct = new Set(
          data.map((r) => r.campaign_id).filter((c): c is string => Boolean(c))
        );
        setCampaignCount(distinct.size);
      } else {
        setCampaignCount(campaignRes.count ?? 0);
      }

      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [account.role, account.companyId, account.influencerId]);

  const stats = useMemo(() => {
    const total = rows.length;
    const approved = rows.filter((r) => r.status === "Approved").length;
    const pending = rows.filter((r) => r.status === "Pending").length;
    return { total, approved, pending };
  }, [rows]);

  const byFileType = useMemo(() => {
    const order: Array<ContentRow["file_type"]> = ["Photo", "Video", "Document"];
    const counts = new Map<string, number>();
    for (const r of rows) {
      if (!r.file_type) continue;
      counts.set(r.file_type, (counts.get(r.file_type) ?? 0) + 1);
    }
    return order
      .filter((t): t is "Photo" | "Video" | "Document" => t !== null)
      .map((t) => ({ name: t, count: counts.get(t) ?? 0 }));
  }, [rows]);

  const byStatus = useMemo(() => {
    const order: Array<NonNullable<ContentRow["status"]>> = [
      "Approved",
      "Pending",
      "Revision Requested",
    ];
    const counts = new Map<string, number>();
    for (const r of rows) {
      if (!r.status) continue;
      counts.set(r.status, (counts.get(r.status) ?? 0) + 1);
    }
    return order.map((s) => ({ name: s, count: counts.get(s) ?? 0 }));
  }, [rows]);

  const overTime = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) {
      if (!r.created_at) continue;
      const d = new Date(r.created_at);
      if (Number.isNaN(d.getTime())) continue;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {
        const [year, month] = key.split("-");
        const label = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
          "en-US",
          { month: "short", year: "2-digit" }
        );
        return { date: label, count };
      });
  }, [rows]);

  const engagementTotals = useMemo(() => {
    const totals = new Map<string, number>();
    for (const r of rows) {
      if (!r.engagement) continue;
      for (const [key, value] of Object.entries(r.engagement)) {
        if (typeof value === "number" && !Number.isNaN(value)) {
          totals.set(key, (totals.get(key) ?? 0) + value);
        }
      }
    }
    return Array.from(totals.entries()).map(([label, value]) => ({ label, value }));
  }, [rows]);

  const formatNumber = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-brand-purple" size={32} />
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Content",
      value: stats.total,
      icon: FileText,
      color: "text-brand-purple-light",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      color: "text-brand-lime",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-blue-400",
    },
    {
      label: "Campaigns",
      value: campaignCount,
      icon: Layers,
      color: "text-brand-purple-light",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-[family-name:var(--font-syne)]">
          Performance Reports
        </h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Real-time analytics derived from your content and campaigns.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-[#1A1A27] border border-white/5 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center py-20">
          <div className="p-4 bg-white/5 rounded-2xl text-[#475569]">
            <BarChart3 size={36} />
          </div>
          <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] mt-4">
            No data yet
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-sm">
            Once content starts flowing through your campaigns, analytics and
            performance trends will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="bg-[#1A1A27] border border-white/5 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                    {card.label}
                  </span>
                  <span className={`p-1.5 bg-white/5 rounded-lg ${card.color}`}>
                    <card.icon size={14} />
                  </span>
                </div>
                <span className="text-2xl font-bold text-white font-[family-name:var(--font-syne)] mt-4">
                  {card.value}
                </span>
              </div>
            ))}
          </div>

          {/* Engagement totals (if present) */}
          {engagementTotals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {engagementTotals.map((e) => (
                <div
                  key={e.label}
                  className="bg-[#1A1A27] border border-white/5 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                      Total {e.label}
                    </span>
                    <span className="p-1.5 bg-white/5 rounded-lg text-brand-lime">
                      <Eye size={14} />
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-white font-[family-name:var(--font-syne)] mt-4">
                    {formatNumber(e.value)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Charts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By file type */}
            <div className="bg-[#1A1A27] border border-white/5 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">
                Content by Type
              </h2>
              <p className="text-xs text-[#94A3B8] mt-0.5 mb-4">
                Breakdown of deliverables by file type
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={byFileType} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip
                    cursor={{ fill: "#ffffff05" }}
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#fff", fontSize: "12px" }}
                  />
                  <Bar dataKey="count" fill={PURPLE} radius={[6, 6, 0, 0]} name="Content" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* By status */}
            <div className="bg-[#1A1A27] border border-white/5 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">
                Content by Status
              </h2>
              <p className="text-xs text-[#94A3B8] mt-0.5 mb-4">
                Approval pipeline distribution
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={byStatus} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip
                    cursor={{ fill: "#ffffff05" }}
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#fff", fontSize: "12px" }}
                  />
                  <Bar dataKey="count" fill={LIME} radius={[6, 6, 0, 0]} name="Content" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Over time */}
          <div className="bg-[#1A1A27] border border-white/5 rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">
              Content Created Over Time
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5 mb-4">
              Volume of content created, grouped by month
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={overTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PURPLE} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={PURPLE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <RechartsTooltip
                  cursor={{ fill: "#ffffff05" }}
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#fff", fontSize: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke={PURPLE}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  name="Content"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
