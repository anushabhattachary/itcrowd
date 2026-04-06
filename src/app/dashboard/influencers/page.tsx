"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, Archive, Edit2, Loader2, ArrowUpDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Influencer = {
  id: string;
  full_name: string;
  handle: string;
  platform: string;
  follower_count: number;
  niche: string;
  deal_preference: string;
  status: string;
  date_added: string;
};

type FormData = {
  full_name: string;
  handle: string;
  platform: string;
  other_platforms?: string;
  follower_count: number;
  niche: string;
  contact_email: string;
  deal_preference: string;
  monthly_rate?: number;
  status: string;
  notes?: string;
  date_added: string;
};

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter/X", "Multi-platform"];
const NICHES = ["Tech", "Health & Wellness", "Fitness", "Consumer Goods", "Gaming", "Fintech", "Fashion", "Food & Beverage", "Other"];
const STATUSES = ["Active in Network", "Pending", "Not Interested", "Archived"];
const DEAL_TYPES = ["Cash", "Equity", "Both"];

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      platform: "Instagram",
      niche: "Fitness",
      status: "Pending",
      deal_preference: "Both",
      date_added: new Date().toISOString().split('T')[0]
    }
  });

  const loadInfluencers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("influencers")
      .select("id, full_name, handle, platform, follower_count, niche, deal_preference, status, date_added")
      .order("created_at", { ascending: false });
      
    if (error) {
      toast.error("Failed to load influencers");
    } else {
      setInfluencers(data || []);
      setFilteredInfluencers(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadInfluencers();
  }, []);

  useEffect(() => {
    let result = influencers;
    if (searchTerm) {
      result = result.filter(i => 
        i.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "All") {
      result = result.filter(i => i.status === statusFilter);
    }
    setFilteredInfluencers(result);
  }, [searchTerm, statusFilter, influencers]);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("influencers").insert([data]);
    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.success("Influencer added to network!");
      setIsDrawerOpen(false);
      reset();
      loadInfluencers();
    }
  };

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#1A1A27] p-4 rounded-2xl border border-white/5 shadow-xl">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="text" 
              placeholder="Search handle or name..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#0D0D14] border border-white/10 rounded-xl pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-purple text-white px-5 py-2 rounded-xl font-medium btn-glow"
        >
          <Plus size={18} /> Add Influencer
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1A1A27] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0D0D14] text-[#94A3B8] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-white">Handle / Name <ArrowUpDown size={14}/></th>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Followers</th>
                <th className="px-6 py-4 font-medium">Niche</th>
                <th className="px-6 py-4 font-medium">Deal Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#94A3B8]">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                    Loading influencers...
                  </td>
                </tr>
              ) : filteredInfluencers.length === 0 ? (
                 <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#94A3B8]">
                    No influencers found.
                  </td>
                </tr>
              ) : (
                filteredInfluencers.map(i => (
                  <tr key={i.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 cursor-pointer" onClick={() => alert('Detail page to be built!')}>
                      <div className="font-bold text-white hover:text-brand-purple transition-colors">{i.handle}</div>
                      <div className="text-xs text-[#94A3B8]">{i.full_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white">{i.platform}</span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatFollowers(i.follower_count)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-[#94A3B8]">{i.niche}</span>
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">{i.deal_preference}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${
                        i.status === 'Active in Network' ? 'bg-brand-lime/20 border-brand-lime/30 text-brand-lime' :
                        i.status === 'Pending' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
                        'bg-gray-500/20 border-gray-500/30 text-gray-300'
                      }`}>
                        {i.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-[#94A3B8] hover:text-white rounded hover:bg-white/10"><Edit2 size={16} /></button>
                        <button className="p-1.5 text-[#94A3B8] hover:text-red-400 rounded hover:bg-red-400/10"><Archive size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Influencer Drawer */}
      <SlideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Add into Network"
        width="w-[85vw] sm:w-[500px]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Full Name *</label>
              <input required {...register("full_name")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Handle *</label>
              <input required placeholder="@username" {...register("handle")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Platform *</label>
                <select required {...register("platform")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white">
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Followers *</label>
                <input required type="number" min="0" {...register("follower_count", { valueAsNumber: true })} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white" />
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#94A3B8]">Content Niche *</label>
            <select required {...register("niche")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white">
              {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#94A3B8]">Contact Email *</label>
            <input required type="email" {...register("contact_email")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white" />
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
            <h4 className="font-semibold text-white">Deal Structuring</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                  <label className="text-sm text-[#94A3B8]">Preference *</label>
                  <select required {...register("deal_preference")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-3 py-2 text-white">
                    {DEAL_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-sm text-[#94A3B8]">Expected Rate (Optional)</label>
                  <input type="number" placeholder="$ / post" {...register("monthly_rate", { valueAsNumber: true })} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Status *</label>
              <select required {...register("status")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
          </div>

          <div className="pt-6 flex gap-3">
             <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-medium">Cancel</button>
             <button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl font-medium btn-glow flex justify-center items-center">
               {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Save Influencer"}
             </button>
          </div>
        </form>
      </SlideDrawer>

    </div>
  );
}
