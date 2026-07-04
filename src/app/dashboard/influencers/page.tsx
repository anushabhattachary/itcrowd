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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let active = true;
    const init = async () => {
      const { data, error } = await supabase
        .from("influencers")
        .select("id, full_name, handle, platform, follower_count, niche, deal_preference, status, date_added")
        .order("created_at", { ascending: false });
        
      if (!active) return;
      if (error) {
        toast.error("Failed to load influencers");
      } else {
        setInfluencers(data || []);
      }
      setIsLoading(false);
    };
    init();
    return () => { active = false; };
  }, []);

  // Filter influencers directly during render
  const filteredInfluencers = influencers.filter((i) => {
    const matchesSearch = !searchTerm || 
      i.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[#141413]/8 shadow-sm">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#887C71]" size={18} />
            <input 
              type="text" 
              placeholder="Search handle or name..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#141413]/10 rounded-xl pl-10 pr-4 py-2 text-sm text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            />
          </div>
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#887C71]" size={18} />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-[#141413]/10 rounded-xl pl-10 pr-8 py-2 text-sm text-[#141413] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#141413] hover:bg-neutral-800 text-white px-5 py-2 rounded-2xl font-medium transition-colors"
        >
          <Plus size={18} /> Add Influencer
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#141413]/8 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F1F0EF]/60 text-xs uppercase tracking-wider text-[#887C71] border-b border-[#141413]/8">
              <tr>
                <th className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-[#141413]">Handle / Name <ArrowUpDown size={14}/></th>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Followers</th>
                <th className="px-6 py-4 font-medium">Niche</th>
                <th className="px-6 py-4 font-medium">Deal Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141413]/8">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#887C71]">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                    Loading influencers...
                  </td>
                </tr>
              ) : filteredInfluencers.length === 0 ? (
                 <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#887C71]">
                    No influencers found.
                  </td>
                </tr>
              ) : (
                filteredInfluencers.map(i => (
                  <tr key={i.id} className="hover:bg-[#F1F0EF]/60 transition-colors group">
                    <td className="px-6 py-4 cursor-pointer" onClick={() => alert('Detail page to be built!')}>
                      <div className="font-medium text-[#141413] hover:text-[#5F5D4D] transition-colors">{i.handle}</div>
                      <div className="text-xs text-[#887C71]">{i.full_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-[#887C71]/10 border border-[#887C71]/20 text-xs text-[#141413]">{i.platform}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#141413]">
                      {formatFollowers(i.follower_count)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-[#887C71]/10 border border-[#887C71]/20 text-xs text-[#5F5D4D]">{i.niche}</span>
                    </td>
                    <td className="px-6 py-4 text-[#887C71]">{i.deal_preference}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full border text-xs font-medium ${
                        i.status === 'Active in Network' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                        i.status === 'Pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                        'bg-[#887C71]/10 border-[#887C71]/20 text-[#5F5D4D]'
                      }`}>
                        {i.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-[#887C71] hover:text-[#141413] rounded hover:bg-[#141413]/10"><Edit2 size={16} /></button>
                        <button className="p-1.5 text-[#887C71] hover:text-red-600 rounded hover:bg-red-50"><Archive size={16} /></button>
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
              <label className="text-sm font-medium text-[#5F5D4D]">Full Name *</label>
              <input required {...register("full_name")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#5F5D4D]">Handle *</label>
              <input required placeholder="@username" {...register("handle")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-sm font-medium text-[#5F5D4D]">Platform *</label>
                <select required {...register("platform")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none">
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-sm font-medium text-[#5F5D4D]">Followers *</label>
                <input required type="number" min="0" {...register("follower_count", { valueAsNumber: true })} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none" />
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Content Niche *</label>
            <select required {...register("niche")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none">
              {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#5F5D4D]">Contact Email *</label>
            <input required type="email" {...register("contact_email")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none" />
          </div>

          <div className="p-4 bg-[#F1F0EF] border border-[#141413]/10 rounded-xl space-y-4">
            <h4 className="font-medium text-[#141413]">Deal Structuring</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                  <label className="text-sm text-[#887C71]">Preference *</label>
                  <select required {...register("deal_preference")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-3 py-2 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none">
                    {DEAL_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-sm text-[#887C71]">Expected Rate (Optional)</label>
                  <input type="number" placeholder="$ / post" {...register("monthly_rate", { valueAsNumber: true })} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-3 py-2 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
              <label className="text-sm font-medium text-[#5F5D4D]">Status *</label>
              <select required {...register("status")} className="w-full bg-white border border-[#141413]/10 rounded-2xl px-4 py-2.5 text-[#141413] placeholder-[#9E948B] focus:ring-2 focus:ring-[#141413]/60 focus:outline-none">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
          </div>

          <div className="pt-6 flex gap-3">
             <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-3 border border-[#141413]/15 hover:bg-[#F1F0EF] rounded-2xl font-medium text-[#141413]">Cancel</button>
             <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#141413] hover:bg-neutral-800 text-white rounded-2xl font-medium transition-colors flex justify-center items-center">
               {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Save Influencer"}
             </button>
          </div>
        </form>
      </SlideDrawer>

    </div>
  );
}
