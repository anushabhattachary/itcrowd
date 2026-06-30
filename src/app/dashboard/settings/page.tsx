"use client";

import { useState, useEffect } from "react";
import { Loader2, Building2, User, Phone, Sparkles, ShieldCheck, Info } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAccount } from "@/lib/account-context";
import toast from "react-hot-toast";

// ---- State shapes -----------------------------------------------------------

interface CompanyForm {
  company_name: string;
  industry: string;
  website: string;
}

interface BusinessDetailsForm {
  job_title: string;
  phone: string;
}

interface InfluencerForm {
  full_name: string;
  handle: string;
  platform: string;
  niche: string;
  follower_count: string; // stored as string in the input, parsed on save
  deal_preference: "Cash" | "Equity" | "Both";
}

interface InfluencerContactForm {
  phone: string;
}

interface AdminForm {
  full_name: string;
}

// ---- Shared UI tokens -------------------------------------------------------

const cardClass =
  "bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6";
const labelClass =
  "text-xs font-bold text-[#94A3B8] uppercase tracking-wider block mb-1.5";
const inputClass =
  "w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple";
const buttonClass =
  "bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl px-5 py-2.5 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2";
const headingClass =
  "text-lg font-bold text-white font-[family-name:var(--font-syne)] flex items-center gap-2";

function SaveButton({ saving }: { saving: boolean }) {
  return (
    <button type="submit" disabled={saving} className={buttonClass}>
      {saving && <Loader2 size={16} className="animate-spin" />}
      Save changes
    </button>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24 text-[#94A3B8]">
      <Loader2 size={28} className="animate-spin text-brand-purple-light" />
    </div>
  );
}

function OnboardingNotice() {
  return (
    <div className={cardClass}>
      <div className="flex items-start gap-3">
        <Info size={18} className="text-brand-purple-light shrink-0 mt-0.5" />
        <p className="text-sm text-[#94A3B8]">Complete onboarding first.</p>
      </div>
    </div>
  );
}

// ---- Business -------------------------------------------------------------

function BusinessSettings({
  companyId,
  userId,
}: {
  companyId: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [savingCompany, setSavingCompany] = useState(false);
  const [savingDetails, setSavingDetails] = useState(false);

  const [company, setCompany] = useState<CompanyForm>({
    company_name: "",
    industry: "",
    website: "",
  });
  const [details, setDetails] = useState<BusinessDetailsForm>({
    job_title: "",
    phone: "",
  });

  useEffect(() => {
    let active = true;
    async function load() {
      const [companyRes, profileRes] = await Promise.all([
        supabase
          .from("companies")
          .select("company_name, industry, website")
          .eq("id", companyId)
          .maybeSingle(),
        supabase
          .from("business_profiles")
          .select("job_title, phone")
          .eq("id", userId)
          .maybeSingle(),
      ]);
      if (!active) return;
      if (companyRes.error || profileRes.error) {
        toast.error("Failed to load your settings.");
      }
      if (companyRes.data) {
        setCompany({
          company_name: companyRes.data.company_name ?? "",
          industry: companyRes.data.industry ?? "",
          website: companyRes.data.website ?? "",
        });
      }
      if (profileRes.data) {
        setDetails({
          job_title: profileRes.data.job_title ?? "",
          phone: profileRes.data.phone ?? "",
        });
      }
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [companyId, userId]);

  async function saveCompany(e: React.FormEvent) {
    e.preventDefault();
    setSavingCompany(true);
    const { error } = await supabase
      .from("companies")
      .update({
        company_name: company.company_name,
        industry: company.industry,
        website: company.website,
      })
      .eq("id", companyId);
    setSavingCompany(false);
    if (error) toast.error("Could not save company details.");
    else toast.success("Company details updated.");
  }

  async function saveDetails(e: React.FormEvent) {
    e.preventDefault();
    setSavingDetails(true);
    const { error } = await supabase
      .from("business_profiles")
      .update({ job_title: details.job_title, phone: details.phone })
      .eq("id", userId);
    setSavingDetails(false);
    if (error) toast.error("Could not save your details.");
    else toast.success("Your details updated.");
  }

  if (loading) return <LoadingState />;

  return (
    <>
      <form onSubmit={saveCompany} className={cardClass}>
        <h2 className={headingClass}>
          <Building2 size={18} className="text-brand-purple-light" />
          Business Profile
        </h2>
        <div>
          <label className={labelClass}>Company name</label>
          <input
            type="text"
            value={company.company_name}
            onChange={(e) =>
              setCompany({ ...company, company_name: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Industry</label>
          <input
            type="text"
            value={company.industry}
            onChange={(e) =>
              setCompany({ ...company, industry: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input
            type="url"
            value={company.website}
            onChange={(e) =>
              setCompany({ ...company, website: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div className="flex justify-end">
          <SaveButton saving={savingCompany} />
        </div>
      </form>

      <form onSubmit={saveDetails} className={cardClass}>
        <h2 className={headingClass}>
          <User size={18} className="text-brand-purple-light" />
          Your details
        </h2>
        <div>
          <label className={labelClass}>Job title</label>
          <input
            type="text"
            value={details.job_title}
            onChange={(e) =>
              setDetails({ ...details, job_title: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="flex justify-end">
          <SaveButton saving={savingDetails} />
        </div>
      </form>
    </>
  );
}

// ---- Influencer -----------------------------------------------------------

function InfluencerSettings({
  influencerId,
  userId,
}: {
  influencerId: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [savingCreator, setSavingCreator] = useState(false);
  const [savingContact, setSavingContact] = useState(false);

  const [creator, setCreator] = useState<InfluencerForm>({
    full_name: "",
    handle: "",
    platform: "",
    niche: "",
    follower_count: "",
    deal_preference: "Cash",
  });
  const [contact, setContact] = useState<InfluencerContactForm>({ phone: "" });

  useEffect(() => {
    let active = true;
    async function load() {
      const [creatorRes, profileRes] = await Promise.all([
        supabase
          .from("influencers")
          .select(
            "full_name, handle, platform, niche, follower_count, deal_preference"
          )
          .eq("id", influencerId)
          .maybeSingle(),
        supabase
          .from("influencer_profiles")
          .select("phone")
          .eq("id", userId)
          .maybeSingle(),
      ]);
      if (!active) return;
      if (creatorRes.error || profileRes.error) {
        toast.error("Failed to load your settings.");
      }
      if (creatorRes.data) {
        const pref = creatorRes.data.deal_preference;
        setCreator({
          full_name: creatorRes.data.full_name ?? "",
          handle: creatorRes.data.handle ?? "",
          platform: creatorRes.data.platform ?? "",
          niche: creatorRes.data.niche ?? "",
          follower_count:
            creatorRes.data.follower_count != null
              ? String(creatorRes.data.follower_count)
              : "",
          deal_preference:
            pref === "Cash" || pref === "Equity" || pref === "Both"
              ? pref
              : "Cash",
        });
      }
      if (profileRes.data) {
        setContact({ phone: profileRes.data.phone ?? "" });
      }
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [influencerId, userId]);

  async function saveCreator(e: React.FormEvent) {
    e.preventDefault();
    setSavingCreator(true);
    const parsedFollowers = parseInt(creator.follower_count, 10);
    const { error } = await supabase
      .from("influencers")
      .update({
        full_name: creator.full_name,
        handle: creator.handle,
        platform: creator.platform,
        niche: creator.niche,
        follower_count: Number.isNaN(parsedFollowers) ? 0 : parsedFollowers,
        deal_preference: creator.deal_preference,
      })
      .eq("id", influencerId);
    setSavingCreator(false);
    if (error) toast.error("Could not save creator details.");
    else toast.success("Creator details updated.");
  }

  async function saveContact(e: React.FormEvent) {
    e.preventDefault();
    setSavingContact(true);
    const { error } = await supabase
      .from("influencer_profiles")
      .update({ phone: contact.phone })
      .eq("id", userId);
    setSavingContact(false);
    if (error) toast.error("Could not save contact details.");
    else toast.success("Contact details updated.");
  }

  if (loading) return <LoadingState />;

  return (
    <>
      <form onSubmit={saveCreator} className={cardClass}>
        <h2 className={headingClass}>
          <Sparkles size={18} className="text-brand-purple-light" />
          Creator details
        </h2>
        <div>
          <label className={labelClass}>Full name</label>
          <input
            type="text"
            value={creator.full_name}
            onChange={(e) =>
              setCreator({ ...creator, full_name: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Handle</label>
          <input
            type="text"
            value={creator.handle}
            onChange={(e) => setCreator({ ...creator, handle: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Platform</label>
          <input
            type="text"
            value={creator.platform}
            onChange={(e) =>
              setCreator({ ...creator, platform: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Niche</label>
          <input
            type="text"
            value={creator.niche}
            onChange={(e) => setCreator({ ...creator, niche: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Follower count</label>
          <input
            type="number"
            min={0}
            value={creator.follower_count}
            onChange={(e) =>
              setCreator({ ...creator, follower_count: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Deal preference</label>
          <select
            value={creator.deal_preference}
            onChange={(e) =>
              setCreator({
                ...creator,
                deal_preference: e.target.value as InfluencerForm["deal_preference"],
              })
            }
            className={inputClass}
          >
            <option value="Cash">Cash</option>
            <option value="Equity">Equity</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="flex justify-end">
          <SaveButton saving={savingCreator} />
        </div>
      </form>

      <form onSubmit={saveContact} className={cardClass}>
        <h2 className={headingClass}>
          <Phone size={18} className="text-brand-purple-light" />
          Contact
        </h2>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => setContact({ phone: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="flex justify-end">
          <SaveButton saving={savingContact} />
        </div>
      </form>
    </>
  );
}

// ---- Admin ----------------------------------------------------------------

function AdminSettings({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AdminForm>({ full_name: "" });

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .maybeSingle();
      if (!active) return;
      if (error) toast.error("Failed to load your settings.");
      if (data) setForm({ full_name: data.full_name ?? "" });
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [userId]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: form.full_name })
      .eq("id", userId);
    setSaving(false);
    if (error) toast.error("Could not save your details.");
    else toast.success("Account updated.");
  }

  if (loading) return <LoadingState />;

  return (
    <form onSubmit={save} className={cardClass}>
      <h2 className={headingClass}>
        <ShieldCheck size={18} className="text-brand-purple-light" />
        Account
      </h2>
      <div>
        <label className={labelClass}>Full name</label>
        <input
          type="text"
          value={form.full_name}
          onChange={(e) => setForm({ full_name: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="flex justify-end">
        <SaveButton saving={saving} />
      </div>
    </form>
  );
}

// ---- Page -----------------------------------------------------------------

export default function SettingsPage() {
  const { userId, role, companyId, influencerId } = useAccount();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-syne)]">
          Settings
        </h1>
        <p className="text-sm text-[#94A3B8]">
          Manage your profile and account information.
        </p>
      </div>

      {role === "business" &&
        (companyId ? (
          <BusinessSettings companyId={companyId} userId={userId} />
        ) : (
          <OnboardingNotice />
        ))}

      {role === "influencer" &&
        (influencerId ? (
          <InfluencerSettings influencerId={influencerId} userId={userId} />
        ) : (
          <OnboardingNotice />
        ))}

      {role === "admin" && <AdminSettings userId={userId} />}
    </div>
  );
}
