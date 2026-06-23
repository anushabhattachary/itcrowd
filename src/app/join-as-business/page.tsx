"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function JoinAsBusinessPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeToMarket, setTimeToMarket] = useState("");
  const [hasWebsite, setHasWebsite] = useState("Yes");
  const [websiteLink, setWebsiteLink] = useState("");
  const [targetNiche, setTargetNiche] = useState("");
  const [brandRep, setBrandRep] = useState("");
  const [budget, setBudget] = useState("");
  const [deliverable, setDeliverable] = useState("");
  const [goal, setGoal] = useState("");

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/submit-business-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          companyName,
          timeToMarket,
          hasWebsite,
          websiteLink: hasWebsite === "Yes" ? websiteLink : "",
          targetNiche,
          brandRep,
          budget,
          deliverable,
          goal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <main className="min-h-screen bg-[#F3EBE0] pt-24 pb-20 px-6 font-[family-name:var(--font-inter)] text-white">
=======
      <main className="min-h-screen bg-[#0D0D14] pt-24 pb-20 px-6 font-[family-name:var(--font-inter)] text-white">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-in fade-in duration-500">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light text-xs font-bold tracking-wider mb-6">
            FOR BUSINESSES
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-[family-name:var(--font-syne)]">
            Let&apos;s Build Your Campaign.
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Tell us about your business and what you&apos;re looking for — we&apos;ll take it from there. No commitment, just a conversation.
          </p>
        </div>

        {/* Form Card */}
<<<<<<< HEAD
        <div className="max-w-[680px] mx-auto bg-[#FFFFFF] rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {isSuccess ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <CheckCircle2 className="text-[#7C7B4D] w-20 h-20 mb-6" />
=======
        <div className="max-w-[680px] mx-auto bg-[#1A1A27] rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {isSuccess ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <CheckCircle2 className="text-[#A3E635] w-20 h-20 mb-6" />
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              <h2 className="text-3xl font-bold text-white mb-4">You&apos;re in!</h2>
              <p className="text-slate-300 text-lg">
                We&apos;ll review your info and reach out within 24 hours. Talk soon. 🚀
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 border-b border-white/10 pb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Business Interest Form</h2>
                <p className="text-slate-400 text-sm">
                  This helps us understand your budget, target audience, and goals so we can match you with the right creators.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Business Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">When was your business established? (or how long have you been operating?)</label>
                  <input
                    type="text"
                    required
                    value={timeToMarket}
                    onChange={(e) => setTimeToMarket(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">Do you have a website?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value="Yes"
                        checked={hasWebsite === "Yes"}
                        onChange={(e) => setHasWebsite(e.target.value)}
                        className="accent-brand-purple w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-300">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value="No"
                        checked={hasWebsite === "No"}
                        onChange={(e) => setHasWebsite(e.target.value)}
                        className="accent-brand-purple w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-300">No</span>
                    </label>
                  </div>
                </div>

                {hasWebsite === "Yes" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Business website link</label>
                    <input
                      type="url"
                      required={hasWebsite === "Yes"}
                      value={websiteLink}
                      onChange={(e) => setWebsiteLink(e.target.value)}
<<<<<<< HEAD
                      className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                      className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">What niche do you want to target?</label>
                  <input
                    type="text"
                    required
                    value={targetNiche}
                    onChange={(e) => setTargetNiche(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Who do you see representing your brand?</label>
                  <input
                    type="text"
                    required
                    value={brandRep}
                    onChange={(e) => setBrandRep(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Monthly Budget (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input
                      type="number"
                      min="0"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
<<<<<<< HEAD
                      className="w-full bg-[#F3EBE0] border border-[#FFFFFF] rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
=======
                      className="w-full bg-[#0D0D14] border border-[#1A1A27] rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">What deliverable do you want from the creator?</label>
                  <textarea
                    required
                    rows={4}
                    value={deliverable}
                    onChange={(e) => setDeliverable(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-y"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-y"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">What is a goal your business has in the next 6 months?</label>
                  <textarea
                    required
                    rows={4}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
<<<<<<< HEAD
                    className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-y"
=======
                    className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-y"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  />
                </div>

                <div className="pt-4">
                  {submitError && (
                    <p className="text-red-400 text-sm mb-4 text-center">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
<<<<<<< HEAD
                    className="w-full bg-[#B75C3A] text-white py-4 px-6 rounded-xl text-lg font-bold hover:bg-[#6D28D9] active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center shadow-lg shadow-brand-purple/20"
=======
                    className="w-full bg-[#7C3AED] text-white py-4 px-6 rounded-xl text-lg font-bold hover:bg-[#6D28D9] active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center shadow-lg shadow-brand-purple/20"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Submit My Interest →"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
