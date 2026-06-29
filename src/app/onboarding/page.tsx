"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Zap, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import type { Role } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Business fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Creator fields
  const [fullName, setFullName] = useState("");
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [niche, setNiche] = useState("");
  const [followers, setFollowers] = useState("");
  const [dealPref, setDealPref] = useState("Both");

  // Shared
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", user.id)
        .single();
      if (!profile) {
        router.push("/login");
        return;
      }
      if (profile.role === "admin") {
        router.push("/dashboard");
        return;
      }
      setRole(profile.role as Role);
      setFullName(profile.full_name ?? "");
      setLoading(false);
    })();
  }, [router]);

  const finish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (role === "business") {
        const { error } = await supabase.rpc("complete_business_onboarding", {
          p_company_name: companyName,
          p_industry: industry,
          p_website: website || null,
          p_job_title: jobTitle || null,
          p_phone: phone || null,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.rpc("complete_influencer_onboarding", {
          p_full_name: fullName,
          p_handle: handle,
          p_platform: platform,
          p_niche: niche,
          p_follower_count: parseInt(followers, 10) || 0,
          p_deal_preference: dealPref,
          p_phone: phone || null,
        });
        if (error) throw error;
      }
      toast.success("You're all set!");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center text-white">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );
  }

  const inputCls =
    "w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple";
  const labelCls = "text-sm font-medium text-[#94A3B8]";

  return (
    <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center font-[family-name:var(--font-inter)] text-white p-6 selection:bg-brand-purple/30">
      <Toaster position="top-center" />

      <div className="flex items-center gap-1 mb-6">
        <span className="text-2xl font-extrabold tracking-tight font-[family-name:var(--font-syne)] flex items-center">
          ItCrowd <Zap className="ml-1 text-brand-purple" size={20} fill="currentColor" />
        </span>
      </div>

      <div className="w-full max-w-[520px] bg-[#1A1A27] border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl">
        <h1 className="text-2xl font-bold mb-1 font-[family-name:var(--font-syne)]">
          {role === "business" ? "Set up your business" : "Set up your creator profile"}
        </h1>
        <p className="text-[#94A3B8] text-sm mb-7">
          {role === "business"
            ? "A few details so we can match you with the right creators."
            : "Tell businesses who you are and how you like to work."}
        </p>

        <form onSubmit={finish} className="space-y-5">
          {role === "business" ? (
            <>
              <div className="space-y-2">
                <label className={labelCls}>Business name *</label>
                <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputCls} placeholder="Glow Fitness Studio" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelCls}>Industry</label>
                  <input value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputCls} placeholder="Health & Wellness" />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Your role</label>
                  <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={inputCls} placeholder="Founder" />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Website</label>
                <input value={website} onChange={(e) => setWebsite(e.target.value)} className={inputCls} placeholder="https://" />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelCls}>Full name *</label>
                  <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Handle *</label>
                  <input required value={handle} onChange={(e) => setHandle(e.target.value)} className={inputCls} placeholder="@yourhandle" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelCls}>Platform</label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputCls}>
                    {["Instagram", "TikTok", "YouTube", "Twitter/X", "Other"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Follower count</label>
                  <input type="number" min="0" value={followers} onChange={(e) => setFollowers(e.target.value)} className={inputCls} placeholder="10000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelCls}>Niche</label>
                  <input value={niche} onChange={(e) => setNiche(e.target.value)} className={inputCls} placeholder="Fitness" />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Deal preference</label>
                  <select value={dealPref} onChange={(e) => setDealPref(e.target.value)} className={inputCls}>
                    {["Cash", "Equity", "Both"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className={labelCls}>Phone (optional)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand-purple text-white py-3 px-4 rounded-xl font-semibold hover:bg-brand-purple-light transition-all disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : (<>Go to dashboard <ArrowRight size={18} /></>)}
          </button>
        </form>
      </div>
    </div>
  );
}
