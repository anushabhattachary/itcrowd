"use client";

import { useEffect, useState } from "react";
import { Plus, Copy, Mail, MessageSquare, Link, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// DndKit for drag and drop
import { DndContext, DragOverlay, closestCorners, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Campaign = {
  id: string;
  campaign_name: string;
  deal_type: string;
  status: string;
  company_id: string;
  posts_per_month_target: number;
};

const COLUMNS = [
  { id: "Matching", title: "Matching", color: "border-brand-purple" },
  { id: "Outreach Sent", title: "Outreach Sent", color: "border-blue-500" },
  { id: "Negotiating", title: "Negotiating", color: "border-yellow-500" },
  { id: "Campaign Live", title: "Campaign Live", color: "border-brand-lime" },
  { id: "Completed", title: "Completed", color: "border-gray-500" },
];

const TEMPLATES = [
  {
    id: "t1",
    title: "Startup Outreach (LinkedIn)",
    icon: MessageSquare,
    text: "Hey [Name]! My name is Anusha, I'm a GT student. I'm reaching out to founders and CEOs to get insight into early business needs and what a business needs to grow explosively. I would love to chat — let me know if you have time!"
  },
  {
    id: "t2",
    title: "Influencer Outreach (Email)",
    icon: Mail,
    text: "Hi [Name]! My name is Anusha Bhattacharya. I run ItCrowd, a startup that connects influencers with early-stage startups. We facilitate deals that allow influencers to earn cash and equity. I have a few startups that would blend really well with your brand — let me know if that sounds interesting!"
  },
  {
    id: "t3",
    title: "Influencer Shortlist to Startup",
    icon: Link,
    text: "Hi [Founder Name], great news — I've put together a shortlist of [X] influencers who I think would be a great fit for [Company]. I've attached their profiles, follower counts, and rates. Take a look and let me know who catches your eye — and we'll get the ball rolling from there!"
  }
];

function SortableCampaignCard({ campaign }: { campaign: Campaign }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: campaign.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-[#1A1A27] border border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors shadow-sm">
      <div className="font-bold text-white mb-1">{campaign.campaign_name}</div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-[#94A3B8]">{campaign.deal_type}</span>
        <span className="text-xs text-[#94A3B8]">{campaign.posts_per_month_target} posts/mo</span>
      </div>
    </div>
  );
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm();

  const loadData = async () => {
    setIsLoading(true);
    const [cRes, cmpRes] = await Promise.all([
      supabase.from("campaigns").select("*").order("created_at", { ascending: false }),
      supabase.from("companies").select("id, company_name")
    ]);
    setCampaigns(cRes.data || []);
    setCompanies(cmpRes.data || []);
    setIsLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (e: any) => setActiveDragId(e.active.id);

  const handleDragEnd = async (e: any) => {
    setActiveDragId(null);
    const { active, over } = e;
    if (!over) return;

    // over.id can be a column ID or another card ID
    const activeId = active.id;
    const overId = over.id;

    const activeCampaign = campaigns.find(c => c.id === activeId);
    if (!activeCampaign) return;

    let targetStatus = "";
    if (COLUMNS.find(c => c.id === overId)) {
      targetStatus = overId; // Dropped on empty column area
    } else {
      const overCampaign = campaigns.find(c => c.id === overId);
      if (overCampaign) targetStatus = overCampaign.status; // Dropped on another card
    }

    if (targetStatus && targetStatus !== activeCampaign.status) {
      // Optimistic update
      setCampaigns(prev => prev.map(c => c.id === activeId ? { ...c, status: targetStatus } : c));
      
      const { error } = await supabase.from("campaigns").update({ status: targetStatus }).eq("id", activeId);
      if (error) {
        toast.error("Failed to move campaign");
        loadData(); // Revert
      }
    }
  };

  const onSubmit = async (data: any) => {
    // Generate simple name if none
    if (!data.campaign_name) {
      const c = companies.find(c => c.id === data.company_id);
      data.campaign_name = `${c?.company_name || 'Startup'} Campaign`;
    }
    const { error } = await supabase.from("campaigns").insert([data]);
    if (error) toast.error("Error creating campaign");
    else {
      toast.success("Campaign created");
      setIsDrawerOpen(false);
      reset();
      loadData();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-10 flex flex-col h-[calc(100vh-120px)]">
      
      {/* Kanban Board Area */}
      <div className="flex-1 flex flex-col bg-[#1A1A27]/50 rounded-2xl border border-white/5 p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-[family-name:var(--font-syne)] text-white">Campaign Pipeline</h2>
          <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-xl font-medium btn-glow text-sm">
            <Plus size={16} /> New Campaign
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex justify-center items-center"><Loader2 className="animate-spin text-brand-purple" size={32} /></div>
        ) : (
          <div className="flex-1 overflow-x-auto">
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className="flex gap-4 h-full min-w-max pb-4">
                {COLUMNS.map(col => {
                  const colCampaigns = campaigns.filter(c => c.status === col.id);
                  return (
                    <div key={col.id} className="w-[300px] flex flex-col bg-[#0D0D14] rounded-2xl border border-white/5 shrink-0 h-full max-h-[600px]">
                      <div className={`p-4 border-b-2 ${col.color} bg-[#1A1A27] rounded-t-2xl`}>
                        <h3 className="font-bold text-white flex justify-between">
                          {col.title} <span className="text-[#94A3B8] font-normal">{colCampaigns.length}</span>
                        </h3>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <SortableContext items={colCampaigns.map(c => c.id)} strategy={verticalListSortingStrategy}>
                          {colCampaigns.map(campaign => (
                            <SortableCampaignCard key={campaign.id} campaign={campaign} />
                          ))}
                        </SortableContext>
                      </div>
                    </div>
                  );
                })}
              </div>
              <DragOverlay>
                {activeDragId ? (
                  <div className="bg-[#1A1A27] border border-brand-purple rounded-xl p-4 shadow-2xl rotate-2 opacity-90 scale-105">
                     <div className="font-bold text-white mb-1">{campaigns.find(c => c.id === activeDragId)?.campaign_name}</div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        )}
      </div>

      {/* Email Templates Section */}
      <div className="shrink-0">
        <h2 className="text-lg font-bold text-white mb-4">Quick-Copy Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEMPLATES.map(t => (
            <div key={t.id} className="bg-[#1A1A27] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <t.icon size={16} className="text-brand-purple" /> {t.title}
                </div>
                <button onClick={() => handleCopy(t.text)} className="p-1.5 bg-white/5 hover:bg-brand-purple hover:text-white rounded-lg text-[#94A3B8] transition-colors" title="Copy">
                  <Copy size={14} />
                </button>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-4 flex-1">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Campaign Drawer */}
      <SlideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create Campaign">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Select Startup *</label>
              <select required {...register("company_id")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white">
                <option value="">-- Choose Company --</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
           </div>
           
           <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Deal Type *</label>
              <select required {...register("deal_type")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white">
                <option value="Cash">Cash</option>
                <option value="Equity">Equity</option>
                <option value="Both">Both</option>
              </select>
           </div>

           <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Initial Status *</label>
              <select required {...register("status")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white">
                {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
           </div>

          <div className="pt-6 flex gap-3">
             <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-medium">Cancel</button>
             <button type="submit" className="flex-1 bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl font-medium btn-glow">Save</button>
          </div>
        </form>
      </SlideDrawer>
    </div>
  );
}
