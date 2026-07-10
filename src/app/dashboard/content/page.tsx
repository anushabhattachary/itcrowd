"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Upload,
  Search,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Check,
  RefreshCw,
  Loader2,
  Download,
  Clock,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useAccount } from "@/lib/account-context";
import SlideDrawer from "@/components/ui/SlideDrawer";

type FileType = "Photo" | "Video" | "Document";
type Status = "Pending" | "Approved" | "Revision Requested";

interface ContentRow {
  id: string;
  campaign_id: string;
  company_id: string;
  influencer_id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_type: FileType;
  category: string | null;
  status: Status;
  revision_notes: string | null;
  created_at: string;
  campaigns?: { campaign_name: string } | null;
  influencers?: { full_name: string; handle: string } | null;
}

interface CampaignOption {
  campaignId: string;
  companyId: string;
  name: string;
}

const STATUS_STYLES: Record<Status, string> = {
  Approved: "bg-emerald-50 border-emerald-200 text-emerald-700",
  Pending: "bg-amber-50 border-amber-200 text-amber-700",
  "Revision Requested": "bg-red-50 border-red-200 text-red-700",
};

const STATUS_ICON: Record<Status, React.ComponentType<{ size?: number; className?: string }>> = {
  Approved: Check,
  Pending: Clock,
  "Revision Requested": AlertCircle,
};

const TYPE_ICON: Record<FileType, React.ComponentType<{ size?: number; className?: string }>> = {
  Photo: ImageIcon,
  Video: VideoIcon,
  Document: FileText,
};

export default function ContentPage() {
  const account = useAccount();
  const isCreator = account.role === "influencer";
  const isBusiness = account.role === "business";

  const [items, setItems] = useState<ContentRow[]>([]);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");

  // Upload drawer (creators)
  const [uploadOpen, setUploadOpen] = useState(false);
  const [campaignOptions, setCampaignOptions] = useState<CampaignOption[]>([]);
  const [uCampaign, setUCampaign] = useState("");
  const [uTitle, setUTitle] = useState("");
  const [uType, setUType] = useState<FileType>("Photo");
  const [uFile, setUFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Revision modal (businesses)
  const [revisionFor, setRevisionFor] = useState<ContentRow | null>(null);
  const [revisionNotes, setRevisionNotes] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("content")
      .select("*, campaigns(campaign_name), influencers(full_name, handle)")
      .order("created_at", { ascending: false });

    if (isCreator) {
      if (!account.influencerId) {
        setItems([]);
        setLoading(false);
        return;
      }
      query = query.eq("influencer_id", account.influencerId);
    } else if (isBusiness) {
      if (!account.companyId) {
        setItems([]);
        setLoading(false);
        return;
      }
      query = query.eq("company_id", account.companyId);
    }

    const { data, error } = await query;
    if (error) {
      toast.error("Failed to load content");
      setLoading(false);
      return;
    }
    const rows = (data as ContentRow[]) || [];
    setItems(rows);

    // Generate signed URLs for previews/downloads (private bucket).
    const paths = rows.map((r) => r.file_url).filter((p): p is string => !!p);
    if (paths.length) {
      const { data: signed } = await supabase.storage
        .from("content")
        .createSignedUrls(paths, 3600);
      if (signed) {
        const map: Record<string, string> = {};
        signed.forEach((s) => {
          if (s.path && s.signedUrl) map[s.path] = s.signedUrl;
        });
        setSignedUrls(map);
      }
    }
    setLoading(false);
  }, [account.companyId, account.influencerId, isBusiness, isCreator]);

  useEffect(() => {
    load();
  }, [load]);

  // Load the creator's attachable campaigns for the upload form.
  useEffect(() => {
    if (!isCreator || !account.influencerId) return;
    (async () => {
      const { data } = await supabase
        .from("campaign_influencers")
        .select("campaign_id, campaigns(id, campaign_name, company_id)")
        .eq("influencer_id", account.influencerId);
      if (data) {
        const opts: CampaignOption[] = [];
        for (const row of data as unknown as Array<{
          campaign_id: string;
          campaigns: { id: string; campaign_name: string; company_id: string } | null;
        }>) {
          if (row.campaigns) {
            opts.push({
              campaignId: row.campaigns.id,
              companyId: row.campaigns.company_id,
              name: row.campaigns.campaign_name,
            });
          }
        }
        setCampaignOptions(opts);
      }
    })();
  }, [isCreator, account.influencerId]);

  const filtered = useMemo(() => {
    return items.filter((r) => {
      if (statusFilter !== "All" && r.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${r.title} ${r.influencers?.full_name ?? ""} ${r.campaigns?.campaign_name ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, statusFilter, search]);

  const handleUpload = async () => {
    if (!account.influencerId) return;
    if (!uCampaign || !uTitle.trim() || !uFile) {
      toast.error("Pick a campaign, add a title, and choose a file");
      return;
    }
    const opt = campaignOptions.find((o) => o.campaignId === uCampaign);
    if (!opt) {
      toast.error("Invalid campaign");
      return;
    }
    setUploading(true);
    const toastId = toast.loading("Uploading content…");
    try {
      const safeName = uFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${opt.campaignId}/${account.influencerId}-${new Date().getTime()}-${safeName}`;
      const { error: upErr } = await supabase.storage.from("content").upload(path, uFile);
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("content").insert({
        campaign_id: opt.campaignId,
        company_id: opt.companyId,
        influencer_id: account.influencerId,
        title: uTitle.trim(),
        file_url: path,
        file_type: uType,
        status: "Pending",
      });
      if (insErr) throw insErr;

      toast.success("Uploaded! The business can now see it.", { id: toastId });
      setUploadOpen(false);
      setUTitle("");
      setUFile(null);
      setUCampaign("");
      setUType("Photo");
      load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      toast.error(msg, { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const setStatus = async (row: ContentRow, status: Status, notes?: string) => {
    const { error } = await supabase
      .from("content")
      .update({ status, revision_notes: notes ?? null })
      .eq("id", row.id);
    if (error) {
      toast.error("Update failed");
      return;
    }
    toast.success(status === "Approved" ? "Approved" : "Revision requested");
    setItems((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, status, revision_notes: notes ?? null } : r))
    );
  };

  const openFile = (row: ContentRow) => {
    const url = row.file_url ? signedUrls[row.file_url] : undefined;
    if (url) window.open(url, "_blank");
    else toast.error("File link unavailable");
  };

  const submitRevision = async () => {
    if (!revisionFor) return;
    await setStatus(revisionFor, "Revision Requested", revisionNotes.trim() || undefined);
    setRevisionFor(null);
    setRevisionNotes("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-medium text-[#141413] font-heading">
            {isCreator ? "My Content" : "Content Library"}
          </h1>
          <p className="text-sm text-[#887C71] mt-1">
            {isCreator
              ? "Upload deliverables. They appear instantly in the business's library."
              : isBusiness
              ? "Every asset your creators produce, in one place. Approve or request changes."
              : "All content across campaigns (oversight)."}
          </p>
        </div>
        {isCreator && (
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#141413] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-2xl font-medium transition-colors"
          >
            <Upload size={18} /> Upload Content
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-[#141413]/8 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#887C71]" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, creator, campaign…"
            className="w-full bg-white border border-[#141413]/10 rounded-xl pl-10 pr-4 py-2 text-sm text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | Status)}
          className="bg-white border border-[#141413]/10 rounded-xl px-4 py-2 text-sm text-[#141413] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Revision Requested">Revision Requested</option>
        </select>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[#5F5D4D] hover:text-[#141413] border border-[#141413]/15 rounded-xl hover:bg-[#F1F0EF] transition-colors"
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-[#887C71]">
          <Loader2 className="animate-spin mx-auto mb-3" size={26} /> Loading content…
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-[#887C71] bg-white rounded-2xl border border-[#141413]/8 shadow-sm">
          {isCreator
            ? "No uploads yet. Hit “Upload Content” to add your first deliverable."
            : "No content yet. Once your creators upload, it shows up here automatically."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((row) => {
            const TypeIcon = TYPE_ICON[row.file_type];
            const StatusIcon = STATUS_ICON[row.status];
            const thumb = row.file_url ? signedUrls[row.file_url] : undefined;
            return (
              <div
                key={row.id}
                className="bg-white border border-[#141413]/8 rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative h-40 bg-[#F1F0EF] flex items-center justify-center">
                  {row.file_type === "Photo" && thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt={row.title} className="w-full h-full object-cover" />
                  ) : (
                    <TypeIcon size={36} className="text-[#9E948B]" />
                  )}
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full border text-[10px] font-medium flex items-center gap-1 ${STATUS_STYLES[row.status]}`}
                  >
                    <StatusIcon size={11} /> {row.status}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-medium text-[#141413] text-sm leading-snug">{row.title}</h3>
                  <p className="text-xs text-[#887C71] mt-1">
                    {row.influencers?.full_name ?? "Creator"}
                    {row.influencers?.handle ? ` · ${row.influencers.handle}` : ""}
                  </p>
                  <p className="text-xs text-[#9E948B] mt-0.5">
                    {row.campaigns?.campaign_name ?? "Campaign"} ·{" "}
                    {new Date(row.created_at).toLocaleDateString()}
                  </p>

                  {row.status === "Revision Requested" && row.revision_notes && (
                    <p className="text-xs text-red-700 mt-2 bg-red-50 border border-red-200 rounded-lg p-2">
                      “{row.revision_notes}”
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-[#141413]/8 flex items-center gap-2">
                    <button
                      onClick={() => openFile(row)}
                      className="flex items-center gap-1 text-xs text-[#887C71] hover:text-[#141413] transition-colors"
                    >
                      <Download size={14} /> View
                    </button>
                    {isBusiness && row.status !== "Approved" && (
                      <button
                        onClick={() => setStatus(row, "Approved")}
                        className="ml-auto flex items-center gap-1 text-xs text-emerald-700 hover:opacity-80 transition-opacity"
                      >
                        <Check size={14} /> Approve
                      </button>
                    )}
                    {isBusiness && row.status !== "Revision Requested" && (
                      <button
                        onClick={() => {
                          setRevisionFor(row);
                          setRevisionNotes("");
                        }}
                        className={`${row.status === "Approved" ? "ml-auto" : ""} flex items-center gap-1 text-xs text-amber-700 hover:opacity-80 transition-opacity`}
                      >
                        <AlertCircle size={14} /> Revise
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload drawer (creators) */}
      <SlideDrawer
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload Content"
        width="w-[85vw] sm:w-[460px]"
      >
        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Campaign *</label>
            <select
              value={uCampaign}
              onChange={(e) => setUCampaign(e.target.value)}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            >
              <option value="">Select a campaign…</option>
              {campaignOptions.map((o) => (
                <option key={o.campaignId} value={o.campaignId}>
                  {o.name}
                </option>
              ))}
            </select>
            {campaignOptions.length === 0 && (
              <p className="text-xs text-[#9E948B]">
                You&apos;re not attached to any campaigns yet.
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Title *</label>
            <input
              value={uTitle}
              onChange={(e) => setUTitle(e.target.value)}
              placeholder="e.g. Summer Reel, Draft 1"
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Type *</label>
            <select
              value={uType}
              onChange={(e) => setUType(e.target.value as FileType)}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            >
              <option value="Photo">Photo</option>
              <option value="Video">Video</option>
              <option value="Document">Document</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">File *</label>
            <input
              type="file"
              onChange={(e) => setUFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-[#887C71] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#141413] file:text-white file:cursor-pointer"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={() => setUploadOpen(false)}
              className="flex-1 px-4 py-3 border border-[#141413]/15 hover:bg-[#F1F0EF] rounded-2xl font-medium transition-colors text-[#141413]"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1 bg-[#141413] hover:bg-neutral-800 text-white rounded-2xl font-medium transition-colors flex justify-center items-center disabled:opacity-60"
            >
              {uploading ? <Loader2 className="animate-spin" size={18} /> : "Upload"}
            </button>
          </div>
        </div>
      </SlideDrawer>

      {/* Revision modal (businesses) */}
      <SlideDrawer
        isOpen={!!revisionFor}
        onClose={() => setRevisionFor(null)}
        title="Request a Revision"
        width="w-[85vw] sm:w-[420px]"
      >
        <div className="space-y-5">
          <p className="text-sm text-[#887C71]">
            Let the creator know what to change for{" "}
            <span className="text-[#141413] font-medium">{revisionFor?.title}</span>.
          </p>
          <textarea
            value={revisionNotes}
            onChange={(e) => setRevisionNotes(e.target.value)}
            rows={5}
            placeholder="e.g. Please brighten the intro and add the logo at the end."
            className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
          />
          <button
            onClick={submitRevision}
            className="w-full bg-[#141413] hover:bg-neutral-800 text-white rounded-2xl py-3 font-medium transition-colors"
          >
            Send Revision Request
          </button>
        </div>
      </SlideDrawer>
    </div>
  );
}
