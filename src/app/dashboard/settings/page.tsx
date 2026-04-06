"use client";

import { Download, Info, Mail, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@itcrowd.io";

  // CSV Export utility
  const downloadCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      toast.error("No data to export");
      return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            let fieldData = row[fieldName];
            // Basic formatting to handle commas and newlines in cells
            if (fieldData === null || fieldData === undefined) {
              fieldData = "";
            } else if (typeof fieldData === "object") {
              fieldData = JSON.stringify(fieldData);
            } else {
              fieldData = String(fieldData);
            }
            return `"${fieldData.replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async (table: string) => {
    const toastId = toast.loading(`Exporting ${table}...`);
    try {
      const { data, error } = await supabase.from(table).select("*");
      if (error) throw error;
      downloadCSV(data, `${table}_export_${new Date().toISOString().split("T")[0]}.csv`);
      toast.success(`${table} exported successfully!`, { id: toastId });
    } catch (e: any) {
      toast.error(`Failed to export ${table}: ${e.message}`, { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Profile Section */}
      <section className="bg-[#1A1A27] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User className="text-brand-purple" size={20} />
            Administrator Profile
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-[#94A3B8] block mb-2">Name</label>
              <div className="bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white font-medium cursor-not-allowed opacity-80">
                Anusha Bhattacharya
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#94A3B8] block mb-2">Email Access</label>
              <div className="bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white font-medium cursor-not-allowed opacity-80 flex justify-between items-center">
                <span>{adminEmail}</span>
                <Mail size={16} className="text-[#94A3B8]" />
              </div>
            </div>
          </div>
          
          <div className="bg-brand-purple/10 border border-brand-purple/20 p-4 rounded-xl flex items-start gap-3">
             <Info className="text-brand-purple-light shrink-0 mt-0.5" size={18} />
             <div className="text-sm text-brand-purple-light/90">
               <strong>Want to change your password?</strong>
               <p className="mt-1">For security reasons, your authentication is driven by environment variables. To change your password, update the <code>ADMIN_PASSWORD</code> environment variable in your Vercel project settings and redeploy.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Data Management Section */}
      <section className="bg-[#1A1A27] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Download className="text-brand-purple" size={20} />
            Data Export
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1">Export your complete Supabase tables to CSV format.</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={() => handleExport("companies")}
              className="flex items-center justify-center gap-2 bg-[#0D0D14] border border-white/10 hover:border-brand-purple/50 px-4 py-4 rounded-xl transition-all hover:bg-brand-purple/5 text-sm font-medium"
            >
              <Download size={16} />
              Export Companies
            </button>
            <button 
              onClick={() => handleExport("influencers")}
              className="flex items-center justify-center gap-2 bg-[#0D0D14] border border-white/10 hover:border-brand-purple/50 px-4 py-4 rounded-xl transition-all hover:bg-brand-purple/5 text-sm font-medium"
            >
              <Download size={16} />
              Export Influencers
            </button>
            <button 
              onClick={() => handleExport("campaigns")}
              className="flex items-center justify-center gap-2 bg-[#0D0D14] border border-white/10 hover:border-brand-purple/50 px-4 py-4 rounded-xl transition-all hover:bg-brand-purple/5 text-sm font-medium"
            >
              <Download size={16} />
              Export Campaigns
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="text-center py-6 text-sm text-[#475569]">
        <p className="font-semibold text-[#94A3B8]">ItCrowd Internal Dashboard v1.0</p>
        <p className="mt-1">Built with Next.js 14, Tailwind CSS, and Supabase.</p>
      </section>

    </div>
  );
}
