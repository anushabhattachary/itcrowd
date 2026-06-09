"use client";

import { useState } from "react";
import { 
  User, 
  MapPin, 
  Sparkles, 
  CreditCard, 
  Globe, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  FileText,
  Upload,
  Info,
  Share2
} from "lucide-react";
import toast from "react-hot-toast";

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface Location {
  id: string;
  name: string;
  address: string;
}

export default function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Form State
  const [businessInfo, setBusinessInfo] = useState({
    name: "Glow Fitness Studio",
    industry: "Health & Wellness",
    website: "https://glowfitness.com",
    address: "1055 Peachtree St NE, Atlanta, GA 30309"
  });

  const [socials, setSocials] = useState({
    instagram: "glowfitness_atl",
    tiktok: "glowfitness_official",
    facebook: "glowfitnessatl"
  });

  const [campaignPreferences, setCampaignPreferences] = useState({
    preferredCreators: ["Athlete", "Influencer", "Videographer"],
    contentStyle: "Energetic, educational, community-focused, and highly visual.",
    marketingGoal: "Local awareness, brand familiarity, and gym membership inquiries."
  });

  const [locations, setLocations] = useState<Location[]>([
    { id: "loc1", name: "Midtown Studio", address: "1055 Peachtree St NE, Atlanta, GA 30309" },
    { id: "loc2", name: "Buckhead Location", address: "3280 Peachtree Rd, Atlanta, GA 30326" }
  ]);

  const [newLocName, setNewLocName] = useState("");
  const [newLocAddress, setNewLocAddress] = useState("");

  const [brandKit, setBrandKit] = useState({
    primaryColor: "#7C3AED",
    secondaryColor: "#A3E635",
    fontFamily: "Inter, sans-serif",
    logoUploaded: true
  });

  const invoices = [
    { id: "inv-101", date: "June 1, 2026", amount: "$1,500.00", status: "Paid" },
    { id: "inv-100", date: "May 1, 2026", amount: "$1,500.00", status: "Paid" },
    { id: "inv-099", date: "April 1, 2026", amount: "$1,500.00", status: "Paid" }
  ];

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Business information updated successfully!");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Campaign preferences and brand kit updated!");
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocName.trim() === "" || newLocAddress.trim() === "") {
      toast.error("Please fill in location details");
      return;
    }
    const newLoc: Location = {
      id: `loc-${Date.now()}`,
      name: newLocName,
      address: newLocAddress
    };
    setLocations((prev) => [...prev, newLoc]);
    setNewLocName("");
    setNewLocAddress("");
    toast.success("Business location added successfully!");
  };

  const handleRemoveLocation = (id: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    toast.success("Location removed.");
  };

  const handleDownloadInvoice = (id: string) => {
    const toastId = toast.loading(`Downloading Invoice ${id}...`);
    setTimeout(() => {
      toast.success("Invoice PDF downloaded!", { id: toastId });
    }, 1000);
  };

  const handlePrefCreatorToggle = (type: string) => {
    setCampaignPreferences(prev => {
      const exists = prev.preferredCreators.includes(type);
      const updated = exists 
        ? prev.preferredCreators.filter(t => t !== type)
        : [...prev.preferredCreators, type];
      return { ...prev, preferredCreators: updated };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/5 scrollbar-thin">
        {[
          { id: "profile", label: "Profile & Socials", icon: User },
          { id: "brandkit", label: "Brand Kit & Preferences", icon: Sparkles },
          { id: "locations", label: "Locations Manager", icon: MapPin },
          { id: "billing", label: "Billing & Invoices", icon: CreditCard }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl border transition-all shrink-0 ${
              activeTab === tab.id
                ? "bg-brand-purple/15 text-brand-purple-light border-brand-purple/30"
                : "bg-[#0D0D14] text-[#94A3B8] border-white/5 hover:border-white/10 hover:text-white"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content areas */}
      
      {/* TAB 1: PROFILE & SOCIALS */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Business Profile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Business Name *</label>
                <input
                  required
                  type="text"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({...businessInfo, name: e.target.value})}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Industry *</label>
                <input
                  required
                  type="text"
                  value={businessInfo.industry}
                  onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" size={14} />
                  <input
                    type="url"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo({...businessInfo, website: e.target.value})}
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Primary Headquarters Address *</label>
                <input
                  required
                  type="text"
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Social Media Connections
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 p-4 bg-[#0D0D14] border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <InstagramIcon size={20} className="text-pink-500" />
                  <div>
                    <span className="text-xs font-bold text-white block">Instagram Link</span>
                    <span className="text-[10px] text-brand-lime block">Connected as @{socials.instagram}</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toast.success("Instagram synced successfully.")}
                  className="text-xs font-semibold px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white"
                >
                  Sync Link
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 p-4 bg-[#0D0D14] border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Share2 size={20} className="text-blue-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">TikTok Link</span>
                    <span className="text-[10px] text-brand-lime block">Connected as @{socials.tiktok}</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toast.success("TikTok synced successfully.")}
                  className="text-xs font-semibold px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white"
                >
                  Sync Link
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 p-4 bg-[#0D0D14] border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <FacebookIcon size={20} className="text-[#1877F2]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Facebook Business Manager</span>
                    <span className="text-[10px] text-[#475569] block">Not connected</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toast.success("Facebook Business Manager linked!")}
                  className="text-xs font-semibold px-3 py-1.5 bg-brand-purple text-white rounded-lg hover:bg-brand-purple-light"
                >
                  Connect page
                </button>
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button type="submit" className="bg-brand-purple text-white px-6 py-3 rounded-xl font-bold text-xs btn-glow">
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: BRAND KIT & PREFERENCES */}
      {activeTab === "brandkit" && (
        <form onSubmit={handleSavePreferences} className="space-y-6">
          
          {/* Brand Guidelines */}
          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Brand Guidelines & Identity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">Primary Brand Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={brandKit.primaryColor}
                    onChange={(e) => setBrandKit({...brandKit, primaryColor: e.target.value})}
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs text-white uppercase font-mono">{brandKit.primaryColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">Secondary Accent Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={brandKit.secondaryColor}
                    onChange={(e) => setBrandKit({...brandKit, secondaryColor: e.target.value})}
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs text-white uppercase font-mono">{brandKit.secondaryColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">Brand Logo File</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#94A3B8] bg-brand-purple/10 px-3 py-2 rounded-lg border border-brand-purple/20 text-brand-purple-light font-semibold">
                    {brandKit.logoUploaded ? "Glow_Logo_Main.png" : "No logo uploaded"}
                  </span>
                  <button 
                    type="button"
                    onClick={() => toast.success("Logo uploaded successfully!")}
                    className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 text-white"
                  >
                    <Upload size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Campaign Preferences */}
          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Campaign & Creator Preferences
            </h2>

            <div className="space-y-5">
              {/* Creator Checklist */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">Preferred Creator Types</label>
                <div className="flex flex-wrap gap-3">
                  {["Athlete", "Influencer", "Photographer", "Videographer"].map((type) => {
                    const isChecked = campaignPreferences.preferredCreators.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handlePrefCreatorToggle(type)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          isChecked 
                            ? "bg-brand-purple/15 text-brand-purple-light border-brand-purple/30"
                            : "bg-[#0D0D14] text-[#94A3B8] border-white/5 hover:border-white/10"
                        }`}
                      >
                        {isChecked && "✓ "} {type}s
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Content Tone / Aesthetic Guidelines</label>
                <textarea
                  rows={3}
                  value={campaignPreferences.contentStyle}
                  onChange={(e) => setCampaignPreferences({...campaignPreferences, contentStyle: e.target.value})}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#475569] focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Primary Marketing Goals</label>
                <input
                  type="text"
                  value={campaignPreferences.marketingGoal}
                  onChange={(e) => setCampaignPreferences({...campaignPreferences, marketingGoal: e.target.value})}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button type="submit" className="bg-brand-purple text-white px-6 py-3 rounded-xl font-bold text-xs btn-glow">
              Save Preferences
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: LOCATIONS MANAGER */}
      {activeTab === "locations" && (
        <div className="space-y-6">
          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Registered Locations
            </h2>
            <p className="text-xs text-[#94A3B8]">List of locations where creators are permitted to visit and shoot materials.</p>

            <div className="space-y-3">
              {locations.map((loc) => (
                <div key={loc.id} className="flex justify-between items-center bg-[#0D0D14] border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-brand-purple-light shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white block">{loc.name}</span>
                      <span className="text-[10px] text-[#94A3B8] block">{loc.address}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveLocation(loc.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/10 text-[#475569] hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                    title="Remove location"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Add Location Form */}
          <form onSubmit={handleAddLocation} className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-[family-name:var(--font-syne)]">Add New Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Location Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Downtown Studio"
                  value={newLocName}
                  onChange={(e) => setNewLocName(e.target.value)}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Address *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 50 Park Pl NE, Atlanta, GA 30303"
                  value={newLocAddress}
                  onChange={(e) => setNewLocAddress(e.target.value)}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-brand-purple text-white px-4 py-2 rounded-xl font-semibold text-xs btn-glow flex items-center gap-1">
                <Plus size={14} /> Add Location
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: BILLING & PLAN */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          
          {/* Plan Details */}
          <section className="bg-gradient-to-r from-[#1A1A27] to-[#111118] border border-brand-purple/20 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] text-brand-purple-light font-extrabold uppercase tracking-wider">Current Account Tier</span>
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Brand Growth Tier</h2>
              <p className="text-xs text-[#94A3B8]">Custom plan: Up to 5 campaigns, NIL Athletes connection, and professional photo/video shoots.</p>
            </div>
            <div className="text-right shrink-0 relative z-10 bg-[#0D0D14] border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-[#475569] font-bold block uppercase tracking-wider">Monthly Retainer</span>
              <span className="text-xl font-bold text-white block">$1,500 / mo</span>
              <span className="text-[9px] text-[#475569] block mt-0.5">Next Renewal: July 1, 2026</span>
            </div>
            
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-brand-purple/5 blur-3xl rounded-full" />
          </section>

          {/* Payment Method */}
          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Payment Method
            </h2>
            <div className="flex items-center justify-between p-4 bg-[#0D0D14] border border-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <CreditCard size={18} className="text-brand-purple-light" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Visa Card ending in 4242</span>
                  <span className="text-[10px] text-[#475569] block">Expires 12/2028</span>
                </div>
              </div>
              <button 
                onClick={() => toast.success("Billing portal opened.")}
                className="text-xs font-semibold px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white"
              >
                Update Card
              </button>
            </div>
          </section>

          {/* Invoice History */}
          <section className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] border-b border-white/5 pb-4">
              Invoice History
            </h2>
            
            <div className="divide-y divide-white/5">
              {invoices.map((inv) => (
                <div key={inv.id} className="py-3 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[#475569]" />
                    <div>
                      <span className="font-semibold text-white block">{inv.id}</span>
                      <span className="text-[10px] text-[#475569] block">{inv.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-white">{inv.amount}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-brand-lime/10 border border-brand-lime/20 text-brand-lime font-bold rounded">
                      {inv.status}
                    </span>
                    <button 
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#94A3B8] transition-colors"
                      title="Download Invoice"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* Footer support prompt */}
      <div className="bg-[#1A1A27]/50 border border-white/5 p-4 rounded-xl flex items-center gap-3">
        <Info size={16} className="text-brand-purple-light shrink-0" />
        <p className="text-xs text-[#94A3B8]">
          Need help changing your billing plan or modifying settings? Get in touch with our team via the 
          <a href="/dashboard/messages" className="text-brand-purple-light hover:underline ml-1 font-semibold">Messaging Center</a>.
        </p>
      </div>

    </div>
  );
}
