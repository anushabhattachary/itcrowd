"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import type { Role } from "@/lib/types";
import A from "@/lib/assets";

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
          p_deal_preference: "Cash",
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
      <div className="min-h-screen bg-[#F1F0EF] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#887C71]" size={28} />
      </div>
    );
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-2xl bg-[#F7F6F5] text-[#141413] placeholder-[#9E948B] border border-[#141413]/10 focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";
  const labelCls = "block text-sm font-medium text-[#141413] font-sans";

  return (
    <div className="min-h-screen bg-[#F1F0EF] flex flex-col items-center justify-center p-6 relative">
      <Toaster position="top-center" />

      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 text-sm text-[#887C71] hover:text-[#141413] transition-colors font-sans"
      >
        &larr; Back to itcrowd
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg flex flex-col items-center"
      >
        {/* Brand */}
        <Link href="/" aria-label="ItCrowd home" className="flex items-center gap-3 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={A.logoDark} alt="" aria-hidden="true" className="w-9 h-9" />
          <span className="text-2xl font-medium text-[#141413] font-heading">ItCrowd</span>
        </Link>

        {/* Onboarding card */}
        <div className="w-full bg-white rounded-3xl shadow-[0_24px_60px_-24px_rgba(20,20,19,0.18)] p-8 md:p-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#887C71] font-sans">
            One last step
          </span>
          <h1 className="mt-3 text-3xl font-normal leading-[1.1] text-[#141413] font-heading">
            {role === "business" ? (
              <>
                Set up your <span className="font-accent italic">business</span>
              </>
            ) : (
              <>
                Set up your <span className="font-accent italic">creator</span> profile
              </>
            )}
          </h1>
          <p className="mt-2 mb-7 text-sm text-[#887C71] font-sans">
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
                <div className="space-y-2">
                  <label className={labelCls}>Niche</label>
                  <input value={niche} onChange={(e) => setNiche(e.target.value)} className={inputCls} placeholder="Fitness" />
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
              className="w-full py-4 rounded-2xl bg-[#141413] text-white font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60 flex justify-center items-center gap-2 font-sans"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : (<>Go to dashboard <ArrowRight size={18} /></>)}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
