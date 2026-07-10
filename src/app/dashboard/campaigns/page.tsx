"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Users,
  Megaphone,
  Building2,
  CheckCircle2,
  Award,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAccount } from "@/lib/account-context";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CampaignStatus =
  | "Matching"
  | "Outreach Sent"
  | "Negotiating"
  | "Campaign Live"
  | "Completed";

type DealType = "Cash" | "Equity" | "Both" | null;

const STATUSES: CampaignStatus[] = [
  "Matching",
  "Outreach Sent",
  "Negotiating",
  "Campaign Live",
  "Completed",
];

const DEAL_TYPES: Exclude<DealType, null>[] = ["Cash", "Equity", "Both"];

// ----- Row shapes returned by the Supabase queries -----
type CompanyOption = {
  id: string;
  company_name: string;
};

type AdminCampaign = {
  id: string;
  campaign_name: string;
  deal_type: DealType;
  status: CampaignStatus;
  start_date: string | null;
  end_date: string | null;
  companies: { company_name: string } | null;
};

type AttachedInfluencer = {
  influencer_id: string;
  influencers: { full_name: string; handle: string } | null;
};

type BusinessCampaign = {
  id: string;
  campaign_name: string;
  status: CampaignStatus;
  posts_per_month_target: number;
  campaign_influencers: AttachedInfluencer[];
};

type InfluencerCampaignRow = {
  campaign_id: string;
  campaigns:
    | {
        id: string;
        campaign_name: string;
        status: CampaignStatus;
        companies: { company_name: string } | null;
      }
    | null;
};

type CampaignFormData = {
  campaign_name: string;
  company_id: string;
  deal_type: "" | Exclude<DealType, null>;
  status: CampaignStatus;
  posts_per_month_target: number;
  notes?: string;
};

// ----- Shared helpers -----
function statusBadgeClasses(status: CampaignStatus): string {
  switch (status) {
    case "Campaign Live":
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
    case "Completed":
      return "bg-[#141413]/5 border-[#141413]/15 text-[#141413]";
    case "Matching":
      return "bg-[#887C71]/10 border-[#887C71]/20 text-[#5F5D4D]";
    default:
      return "bg-amber-50 border-amber-200 text-amber-700";
  }
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${statusBadgeClasses(
        status
      )}`}
    >
      {status === "Campaign Live" ? (
        <CheckCircle2 size={12} />
      ) : status === "Completed" ? (
        <Award size={12} />
      ) : null}
      {status}
    </span>
  );
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(value: string | null): string {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString();
}

function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-medium text-[#141413] font-heading">
          {title}
        </h1>
        <p className="text-sm text-[#887C71] mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-[#887C71]">
      <Loader2 className="animate-spin mb-3" size={28} />
      <span className="text-sm">Loading campaigns…</span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm py-20 px-6 text-center">
      <Megaphone className="mx-auto mb-3 text-[#9E948B]" size={32} />
      <p className="text-sm text-[#887C71]">{message}</p>
    </div>
  );
}

// =====================================================================
// ADMIN VIEW
// =====================================================================
function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>([]);
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CampaignFormData>({
    defaultValues: {
      campaign_name: "",
      company_id: "",
      deal_type: "",
      status: "Matching",
      posts_per_month_target: 2,
      notes: "",
    },
  });

  const loadCampaigns = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("campaigns")
      .select("*, companies(company_name)")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load campaigns");
    } else {
      setCampaigns((data ?? []) as AdminCampaign[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let active = true;
    const init = async () => {
      const [campaignRes, companyRes] = await Promise.all([
        supabase
          .from("campaigns")
          .select("*, companies(company_name)")
          .order("created_at", { ascending: false }),
        supabase.from("companies").select("id, company_name"),
      ]);
      if (!active) return;
      if (campaignRes.error) {
        toast.error("Failed to load campaigns");
      } else {
        setCampaigns((campaignRes.data ?? []) as AdminCampaign[]);
      }
      if (!companyRes.error) {
        setCompanies((companyRes.data ?? []) as CompanyOption[]);
      }
      setIsLoading(false);
    };
    init();
    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (form: CampaignFormData) => {
    const payload = {
      campaign_name: form.campaign_name,
      company_id: form.company_id,
      deal_type: form.deal_type === "" ? null : form.deal_type,
      status: form.status,
      posts_per_month_target: form.posts_per_month_target,
      notes: form.notes || null,
    };
    const { error } = await supabase.from("campaigns").insert([payload]);
    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }
    toast.success("Campaign created!");
    setIsDrawerOpen(false);
    reset();
    loadCampaigns();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaigns"
        subtitle="Every campaign across all businesses."
        action={
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#141413] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-2xl font-medium transition-colors"
          >
            <Plus size={18} /> Add Campaign
          </button>
        }
      />

      <div className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F1F0EF]/60 text-xs uppercase tracking-wider text-[#887C71] border-b border-[#141413]/8">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Deal Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Start</th>
                <th className="px-6 py-4 font-medium">End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141413]/8">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-[#887C71]">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                    Loading campaigns…
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-[#887C71]">
                    No campaigns yet. Create your first one.
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F1F0EF]/60 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#141413]">
                      {c.campaign_name}
                    </td>
                    <td className="px-6 py-4 text-[#887C71]">
                      {c.companies?.company_name ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-[#887C71]">
                      {c.deal_type ?? "-"}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-[#9E948B]">
                      {formatDate(c.start_date)}
                    </td>
                    <td className="px-6 py-4 text-[#9E948B]">
                      {formatDate(c.end_date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add New Campaign"
        width="w-[85vw] sm:w-[480px]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#887C71]">
              Campaign Name *
            </label>
            <input
              required
              {...register("campaign_name")}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#887C71]">Company *</label>
            <select
              required
              {...register("company_id")}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            >
              <option value="">Select a company…</option>
              {companies.map((co) => (
                <option key={co.id} value={co.id}>
                  {co.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#887C71]">
                Deal Type
              </label>
              <select
                {...register("deal_type")}
                className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
              >
                <option value="">None</option>
                {DEAL_TYPES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#887C71]">
                Posts / Month
              </label>
              <input
                type="number"
                min="0"
                {...register("posts_per_month_target", { valueAsNumber: true })}
                className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#887C71]">Status *</label>
            <select
              required
              {...register("status")}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#887C71]">
              Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            />
          </div>

          <div className="pt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 px-4 py-3 border border-[#141413]/15 hover:bg-[#F1F0EF] rounded-2xl font-medium transition-colors text-[#141413]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#141413] hover:bg-neutral-800 text-white rounded-2xl font-medium transition-colors flex justify-center items-center py-3"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Save Campaign"
              )}
            </button>
          </div>
        </form>
      </SlideDrawer>
    </div>
  );
}

// =====================================================================
// BUSINESS VIEW
// =====================================================================
function BusinessCampaigns({ companyId }: { companyId: string | null }) {
  const [campaigns, setCampaigns] = useState<BusinessCampaign[]>([]);
  const [contentCounts, setContentCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(companyId !== null);

  useEffect(() => {
    if (!companyId) return;
    let active = true;
    const load = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("campaigns")
        .select(
          "*, campaign_influencers(influencer_id, influencers(full_name, handle))"
        )
        .eq("company_id", companyId)
        .order("created_at", { ascending: false });

      if (!active) return;
      if (error) {
        toast.error("Failed to load campaigns");
        setIsLoading(false);
        return;
      }

      const rows = (data ?? []) as BusinessCampaign[];
      setCampaigns(rows);

      const ids = rows.map((r) => r.id);
      if (ids.length > 0) {
        const { data: contentRows } = await supabase
          .from("content")
          .select("campaign_id")
          .in("campaign_id", ids);
        if (active && contentRows) {
          const counts: Record<string, number> = {};
          for (const row of contentRows as { campaign_id: string }[]) {
            counts[row.campaign_id] = (counts[row.campaign_id] ?? 0) + 1;
          }
          setContentCounts(counts);
        }
      }
      setIsLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [companyId]);

  if (!companyId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Campaigns"
          subtitle="Track your creator activations."
        />
        <EmptyState message="No company is linked to your account yet." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Campaigns"
        subtitle="Track your creator activations and deliverables."
      />

      {isLoading ? (
        <LoadingState />
      ) : campaigns.length === 0 ? (
        <EmptyState message="You don't have any campaigns yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((c) => {
            const creators = c.campaign_influencers ?? [];
            const target = c.posts_per_month_target || 0;
            const done = contentCounts[c.id] ?? 0;
            const percent =
              target > 0 ? Math.min(100, Math.round((done / target) * 100)) : 0;
            return (
              <div
                key={c.id}
                className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm p-6 flex flex-col gap-5"
              >
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-lg font-medium text-[#141413] font-heading">
                    {c.campaign_name}
                  </h3>
                  <StatusBadge status={c.status} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#887C71]">Deliverables</span>
                    <span className="text-[#141413]">
                      {done}/{target}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F1F0EF] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        c.status === "Completed"
                          ? "bg-emerald-600"
                          : "bg-[#141413]"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#9E948B]" />
                    {creators.length === 0 ? (
                      <span className="text-xs text-[#9E948B]">
                        No creators attached
                      </span>
                    ) : (
                      <div className="flex -space-x-2">
                        {creators.slice(0, 5).map((ci) => {
                          const name = ci.influencers?.full_name ?? "Creator";
                          const handle = ci.influencers?.handle ?? "";
                          return (
                            <div
                              key={ci.influencer_id}
                              title={handle ? `${name} (${handle})` : name}
                              className="w-7 h-7 rounded-full bg-[#141413] border-2 border-white flex items-center justify-center text-[10px] font-medium text-white"
                            >
                              {initialsOf(name)}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {creators.length > 0 && (
                    <span className="text-xs text-[#887C71]">
                      {creators.length} creator
                      {creators.length === 1 ? "" : "s"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =====================================================================
// INFLUENCER VIEW
// =====================================================================
function InfluencerCampaigns({
  influencerId,
}: {
  influencerId: string | null;
}) {
  const [rows, setRows] = useState<InfluencerCampaignRow[]>([]);
  const [isLoading, setIsLoading] = useState(influencerId !== null);

  useEffect(() => {
    if (!influencerId) return;
    let active = true;
    const load = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("campaign_influencers")
        .select("campaign_id, campaigns(*, companies(company_name))")
        .eq("influencer_id", influencerId);

      if (!active) return;
      if (error) {
        toast.error("Failed to load campaigns");
      } else {
        setRows((data ?? []) as unknown as InfluencerCampaignRow[]);
      }
      setIsLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [influencerId]);

  if (!influencerId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Campaigns"
          subtitle="Campaigns you're part of."
        />
        <EmptyState message="No creator profile is linked to your account yet." />
      </div>
    );
  }

  const campaigns = rows
    .map((r) => r.campaigns)
    .filter((c): c is NonNullable<InfluencerCampaignRow["campaigns"]> => !!c);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Campaigns"
        subtitle="Campaigns you're attached to."
      />

      {isLoading ? (
        <LoadingState />
      ) : campaigns.length === 0 ? (
        <EmptyState message="You're not attached to any campaigns yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#141413]/8 rounded-2xl shadow-sm p-6 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-lg font-medium text-[#141413] font-heading">
                  {c.campaign_name}
                </h3>
                <StatusBadge status={c.status} />
              </div>
              <div className="flex items-center gap-2 text-sm text-[#887C71]">
                <Building2 size={14} className="text-[#9E948B]" />
                {c.companies?.company_name ?? "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =====================================================================
// ROOT
// =====================================================================
export default function CampaignsPage() {
  const { role, companyId, influencerId } = useAccount();

  if (role === "admin") return <AdminCampaigns />;
  if (role === "business") return <BusinessCampaigns companyId={companyId} />;
  return <InfluencerCampaigns influencerId={influencerId} />;
}
