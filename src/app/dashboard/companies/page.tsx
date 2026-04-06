"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, Archive, Edit2, Loader2, ArrowUpDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Company = {
  id: string;
  company_name: string;
  founder_name: string;
  contact_email: string;
  industry: string;
  monthly_budget: number;
  stage: string;
  date_added: string;
};

// Form values
type FormData = {
  company_name: string;
  founder_name: string;
  contact_email: string;
  contact_linkedin?: string;
  website?: string;
  industry: string;
  monthly_budget: number;
  stage: string;
  how_we_met?: string;
  notes?: string;
  date_added: string;
};

const STAGES = ["Prospecting", "Contacted", "Shortlisting Influencers", "Campaign Live", "Complete", "Archived"];
const INDUSTRIES = ["Tech", "Health & Wellness", "Fitness", "Consumer Goods", "Gaming", "Fintech", "Fashion", "Food & Beverage", "Other"];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      stage: "Prospecting",
      industry: "Tech",
      date_added: new Date().toISOString().split('T')[0]
    }
  });

  const loadCompanies = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("companies")
      .select("id, company_name, founder_name, contact_email, industry, monthly_budget, stage, date_added")
      .order("created_at", { ascending: false });
      
    if (error) {
      toast.error("Failed to load companies");
    } else {
      setCompanies(data || []);
      setFilteredCompanies(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = companies;
    if (searchTerm) {
      result = result.filter(c => 
        c.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.founder_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (stageFilter !== "All") {
      result = result.filter(c => c.stage === stageFilter);
    }
    setFilteredCompanies(result);
  }, [searchTerm, stageFilter, companies]);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("companies").insert([data]);
    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.success("Company added successfully!");
      setIsDrawerOpen(false);
      reset();
      loadCompanies();
    }
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'Campaign Live': return 'bg-brand-lime/20 border-brand-lime/30 text-brand-lime';
      case 'Complete': return 'bg-brand-purple/20 border-brand-purple/30 text-brand-purple-light';
      case 'Prospecting': return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
      case 'Archived': return 'bg-red-500/10 border-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
    }
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
              placeholder="Search companies..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <select 
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="appearance-none bg-[#0D0D14] border border-white/10 rounded-xl pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            >
              <option value="All">All Stages</option>
              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-purple text-white px-5 py-2 rounded-xl font-medium btn-glow"
        >
          <Plus size={18} /> Add Company
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1A1A27] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0D0D14] text-[#94A3B8] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-white">Company Name <ArrowUpDown size={14}/></th>
                <th className="px-6 py-4 font-medium">Founder</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Date Added</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#94A3B8]">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                    Loading companies...
                  </td>
                </tr>
              ) : filteredCompanies.length === 0 ? (
                 <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#94A3B8]">
                    No companies found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-bold text-white hover:text-brand-purple cursor-pointer transition-colors" onClick={() => alert('Detail page to be built!')}>
                      {c.company_name}
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">{c.founder_name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-[#94A3B8]">{c.industry}</span>
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">${c.monthly_budget?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${getStageColor(c.stage)}`}>
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#475569]">{c.date_added}</td>
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

      {/* Add Company Drawer */}
      <SlideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Add New Company"
        width="w-[85vw] sm:w-[480px]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#94A3B8]">Company Name *</label>
            <input required {...register("company_name")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#94A3B8]">Founder / Contact Name *</label>
            <input required {...register("founder_name")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#94A3B8]">Contact Email *</label>
            <input required type="email" {...register("contact_email")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Industry *</label>
                <select required {...register("industry")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple">
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Monthly Budget ($) *</label>
                <input required type="number" min="0" {...register("monthly_budget", { valueAsNumber: true })} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" />
             </div>
          </div>

          <div className="space-y-1">
              <label className="text-sm font-medium text-[#94A3B8]">Current Stage *</label>
              <select required {...register("stage")} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple">
                {STAGES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#94A3B8]">Notes (Optional)</label>
            <textarea {...register("notes")} rows={4} className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" />
          </div>

          <div className="pt-6 flex gap-3">
             <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-medium transition-colors">Cancel</button>
             <button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl font-medium btn-glow flex justify-center items-center">
               {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Save Company"}
             </button>
          </div>
        </form>
      </SlideDrawer>

    </div>
  );
}
