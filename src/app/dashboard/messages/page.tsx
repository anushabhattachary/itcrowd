"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Plus, Loader2, MessageSquare, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useAccount } from "@/lib/account-context";
import SlideDrawer from "@/components/ui/SlideDrawer";

interface Thread {
  id: string;
  campaign_id: string | null;
  company_id: string | null;
  influencer_id: string | null;
  subject: string;
  thread_type: string;
  status: string;
  created_at: string;
  companies?: { company_name: string } | null;
  influencers?: { full_name: string; handle: string } | null;
  campaigns?: { campaign_name: string } | null;
}

interface Message {
  id: string;
  thread_id: string;
  sender_profile_id: string | null;
  body: string;
  created_at: string;
}

interface CampaignLite {
  id: string;
  campaign_name: string;
  company_id: string;
}

interface CreatorLite {
  id: string;
  full_name: string;
}

export default function MessagesPage() {
  const account = useAccount();
  const isBusiness = account.role === "business";
  const isCreator = account.role === "influencer";

  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // New conversation drawer
  const [newOpen, setNewOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignLite[]>([]);
  const [creators, setCreators] = useState<CreatorLite[]>([]);
  const [nCampaign, setNCampaign] = useState("");
  const [nCreator, setNCreator] = useState("");
  const [nSubject, setNSubject] = useState("");
  const [creating, setCreating] = useState(false);

  const counterpartName = useCallback(
    (t: Thread) => {
      if (isCreator) return t.companies?.company_name ?? "Business";
      if (isBusiness)
        return t.influencers
          ? `${t.influencers.full_name}${t.influencers.handle ? ` · ${t.influencers.handle}` : ""}`
          : "Creator";
      // admin
      return `${t.companies?.company_name ?? "Business"} ↔ ${t.influencers?.full_name ?? "Creator"}`;
    },
    [isCreator, isBusiness]
  );

  const loadThreads = useCallback(async () => {
    setLoadingThreads(true);
    let q = supabase
      .from("threads")
      .select(
        "*, companies(company_name), influencers(full_name, handle), campaigns(campaign_name)"
      )
      .order("created_at", { ascending: false });

    if (isBusiness) {
      if (!account.companyId) {
        setThreads([]);
        setLoadingThreads(false);
        return;
      }
      q = q.eq("company_id", account.companyId);
    } else if (isCreator) {
      if (!account.influencerId) {
        setThreads([]);
        setLoadingThreads(false);
        return;
      }
      q = q.eq("influencer_id", account.influencerId);
    } else {
      q = q.limit(100);
    }

    const { data, error } = await q;
    if (error) {
      toast.error("Failed to load conversations");
      setLoadingThreads(false);
      return;
    }
    const rows = (data as Thread[]) || [];
    setThreads(rows);
    setActiveId((cur) => cur ?? rows[0]?.id ?? null);
    setLoadingThreads(false);
  }, [account.companyId, account.influencerId, isBusiness, isCreator]);

  const loadMessages = useCallback(async (threadId: string) => {
    setLoadingMsgs(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });
    if (!error) setMessages((data as Message[]) || []);
    setLoadingMsgs(false);
  }, []);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  useEffect(() => {
    if (activeId) loadMessages(activeId);
  }, [activeId, loadMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Populate the new-conversation drawer
  useEffect(() => {
    if (!newOpen) return;
    (async () => {
      if (isBusiness && account.companyId) {
        const { data } = await supabase
          .from("campaigns")
          .select("id, campaign_name, company_id")
          .eq("company_id", account.companyId);
        setCampaigns((data as CampaignLite[]) || []);
      } else if (isCreator && account.influencerId) {
        const { data } = await supabase
          .from("campaign_influencers")
          .select("campaigns(id, campaign_name, company_id)")
          .eq("influencer_id", account.influencerId);
        const list: CampaignLite[] = [];
        for (const row of (data as unknown as Array<{
          campaigns: CampaignLite | null;
        }>) || []) {
          if (row.campaigns) list.push(row.campaigns);
        }
        setCampaigns(list);
      }
    })();
  }, [newOpen, isBusiness, isCreator, account.companyId, account.influencerId]);

  // When a business picks a campaign, load creators attached to it
  useEffect(() => {
    if (!isBusiness || !nCampaign) {
      setCreators([]);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("campaign_influencers")
        .select("influencers(id, full_name)")
        .eq("campaign_id", nCampaign);
      const list: CreatorLite[] = [];
      for (const row of (data as unknown as Array<{ influencers: CreatorLite | null }>) || []) {
        if (row.influencers) list.push(row.influencers);
      }
      setCreators(list);
    })();
  }, [isBusiness, nCampaign]);

  const createConversation = async () => {
    if (!nCampaign || !nSubject.trim()) {
      toast.error("Pick a campaign and add a subject");
      return;
    }
    const campaign = campaigns.find((c) => c.id === nCampaign);
    if (!campaign) return;

    const companyId = isBusiness ? account.companyId : campaign.company_id;
    const influencerId = isCreator ? account.influencerId : nCreator;
    if (!companyId || !influencerId) {
      toast.error(isBusiness ? "Pick a creator" : "Missing account context");
      return;
    }

    setCreating(true);
    try {
      // Reuse an existing thread for this trio if present
      const { data: existing } = await supabase
        .from("threads")
        .select("id")
        .eq("company_id", companyId)
        .eq("influencer_id", influencerId)
        .eq("campaign_id", nCampaign)
        .maybeSingle();

      let threadId = existing?.id as string | undefined;
      if (!threadId) {
        const { data: inserted, error } = await supabase
          .from("threads")
          .insert({
            company_id: companyId,
            influencer_id: influencerId,
            campaign_id: nCampaign,
            subject: nSubject.trim(),
            thread_type: "campaign",
          })
          .select("id")
          .single();
        if (error) throw error;
        threadId = inserted.id;
      }

      toast.success("Conversation ready");
      setNewOpen(false);
      setNCampaign("");
      setNCreator("");
      setNSubject("");
      await loadThreads();
      if (threadId) setActiveId(threadId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not start conversation";
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  };

  const send = async () => {
    if (!draft.trim() || !activeId) return;
    setSending(true);
    const body = draft.trim();
    setDraft("");
    const { error } = await supabase.from("messages").insert({
      thread_id: activeId,
      sender_profile_id: account.userId,
      body,
    });
    if (error) {
      toast.error("Message failed to send");
      setDraft(body);
    } else {
      await loadMessages(activeId);
    }
    setSending(false);
  };

  const activeThread = threads.find((t) => t.id === activeId) || null;

  return (
    <div className="flex gap-4 h-[calc(100vh-140px)]">
      {/* Thread list */}
      <div className="w-[300px] shrink-0 bg-white border border-[#141413]/8 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#141413]/8 flex items-center justify-between">
          <span className="font-medium text-[#141413] font-heading">Conversations</span>
          {(isBusiness || isCreator) && (
            <button
              onClick={() => setNewOpen(true)}
              className="p-1.5 rounded-lg bg-[#141413] text-white hover:bg-neutral-800 transition-colors"
              title="New conversation"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingThreads ? (
            <div className="p-6 text-center text-[#887C71]">
              <Loader2 className="animate-spin mx-auto" size={20} />
            </div>
          ) : threads.length === 0 ? (
            <div className="p-6 text-center text-sm text-[#887C71]">
              No conversations yet.
            </div>
          ) : (
            threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full text-left px-4 py-3 border-b border-[#141413]/8 transition-colors ${
                  t.id === activeId ? "bg-[#F1F0EF]" : "hover:bg-[#F1F0EF]/60"
                }`}
              >
                <p className="text-sm font-medium text-[#141413] truncate">{counterpartName(t)}</p>
                <p className="text-xs text-[#887C71] truncate">{t.subject}</p>
                <p className="text-[10px] text-[#9E948B] mt-0.5 truncate">
                  {t.campaigns?.campaign_name ?? "General"}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 bg-white border border-[#141413]/8 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        {!activeThread ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[#9E948B]">
            <MessageSquare size={40} className="mb-3" />
            <p className="text-sm">Select or start a conversation.</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-[#141413]/8 flex items-center justify-between">
              <div>
                <p className="font-medium text-[#141413]">{counterpartName(activeThread)}</p>
                <p className="text-xs text-[#887C71]">
                  {activeThread.subject}
                  {activeThread.campaigns?.campaign_name
                    ? ` · ${activeThread.campaigns.campaign_name}`
                    : ""}
                </p>
              </div>
              <button
                onClick={() => activeId && loadMessages(activeId)}
                className="p-2 text-[#887C71] hover:text-[#141413] rounded-lg hover:bg-[#141413]/5 transition-colors"
                title="Refresh"
              >
                <RefreshCw size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {loadingMsgs ? (
                <div className="text-center text-[#887C71]">
                  <Loader2 className="animate-spin mx-auto" size={20} />
                </div>
              ) : messages.length === 0 ? (
                <p className="text-center text-sm text-[#9E948B] mt-6">
                  No messages yet — say hello 👋
                </p>
              ) : (
                messages.map((m) => {
                  const mine = m.sender_profile_id === account.userId;
                  return (
                    <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                          mine
                            ? "bg-[#141413] text-white rounded-br-sm"
                            : "bg-[#F1F0EF] border border-[#141413]/8 text-[#141413] rounded-bl-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{m.body}</p>
                        <p className={`text-[10px] mt-1 ${mine ? "text-white/60" : "text-[#887C71]"}`}>
                          {new Date(m.created_at).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 border-t border-[#141413]/8 flex items-center gap-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Type a message…"
                className="flex-1 bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-sm text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
              />
              <button
                onClick={send}
                disabled={sending || !draft.trim()}
                className="bg-[#141413] hover:bg-neutral-800 text-white rounded-2xl p-2.5 transition-colors disabled:opacity-50"
              >
                {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* New conversation */}
      <SlideDrawer
        isOpen={newOpen}
        onClose={() => setNewOpen(false)}
        title="New Conversation"
        width="w-[85vw] sm:w-[440px]"
      >
        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Campaign *</label>
            <select
              value={nCampaign}
              onChange={(e) => setNCampaign(e.target.value)}
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            >
              <option value="">Select a campaign…</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.campaign_name}
                </option>
              ))}
            </select>
          </div>

          {isBusiness && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#5F5D4D]">Creator *</label>
              <select
                value={nCreator}
                onChange={(e) => setNCreator(e.target.value)}
                className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
                disabled={!nCampaign}
              >
                <option value="">{nCampaign ? "Select a creator…" : "Pick a campaign first"}</option>
                {creators.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Subject *</label>
            <input
              value={nSubject}
              onChange={(e) => setNSubject(e.target.value)}
              placeholder="e.g. Kickoff & brand guidelines"
              className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            />
          </div>

          <button
            onClick={createConversation}
            disabled={creating}
            className="w-full bg-[#141413] hover:bg-neutral-800 text-white rounded-2xl py-3 font-medium transition-colors flex justify-center items-center disabled:opacity-60"
          >
            {creating ? <Loader2 className="animate-spin" size={18} /> : "Start Conversation"}
          </button>
        </div>
      </SlideDrawer>
    </div>
  );
}
