"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Send } from "lucide-react";

interface ApplyData {
  name: string;
  email: string;
  handle: string;
  platform: string;
  followers: string;
  niche: string;
  why: string;
  equityInterest: string;
}

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter/X", "Other"];
const followerRanges = ["Under 10K", "10K–50K", "50K–200K", "200K+"];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyData>();

  const onSubmit = (data: ApplyData) => {
    console.log("Application submitted:", data);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40">
        <div className="max-w-[650px] mx-auto px-6">
          <span className="text-sm uppercase tracking-[0.2em] text-brand-lime font-semibold">
            Join Our Network
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)]">
            Apply as an Influencer
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            Fill out the form below and our team will review your application
            within 48 hours. We work with micro and macro influencers — what
            matters most is engagement and niche fit.
          </p>

          {submitted ? (
            <div className="mt-12 glass-card p-12 text-center">
              <CheckCircle className="mx-auto text-brand-lime" size={48} />
              <h3 className="mt-4 text-2xl font-bold font-[family-name:var(--font-syne)]">
                Application Received!
              </h3>
              <p className="mt-2 text-muted">
                We&apos;ll review your profile and get back to you within 48
                hours. 🎉
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 glass-card p-8 md:p-10 space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Required" })}
                  className={`w-full px-4 py-3 rounded-xl bg-background border text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 ${
                    errors.name ? "border-red-400" : "border-white/10"
                  }`}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl bg-background border text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 ${
                    errors.email ? "border-red-400" : "border-white/10"
                  }`}
                  placeholder="you@example.com"
                />
              </div>

              {/* Social handle */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Social Handle
                </label>
                <input
                  {...register("handle", { required: "Required" })}
                  className={`w-full px-4 py-3 rounded-xl bg-background border text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 ${
                    errors.handle ? "border-red-400" : "border-white/10"
                  }`}
                  placeholder="@yourhandle"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Platform
                </label>
                <select
                  {...register("platform", { required: "Required" })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                >
                  <option value="">Select...</option>
                  {platforms.map((p) => (
                    <option key={p} value={p} className="bg-background">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Follower count */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Follower Count
                </label>
                <select
                  {...register("followers", { required: "Required" })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                >
                  <option value="">Select...</option>
                  {followerRanges.map((r) => (
                    <option key={r} value={r} className="bg-background">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Niche */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Niche
                </label>
                <input
                  {...register("niche", { required: "Required" })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                  placeholder="e.g. Fitness, Tech, Fashion..."
                />
              </div>

              {/* Why */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Why do you want to join ItCrowd?
                </label>
                <textarea
                  {...register("why")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 resize-none"
                  placeholder="Tell us briefly..."
                />
              </div>

              {/* Equity interest */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Interested in equity deals?
                </label>
                <div className="flex gap-3">
                  {["Yes", "Maybe", "Cash only"].map((opt) => (
                    <label
                      key={opt}
                      className="flex-1 text-center py-3 rounded-xl border border-white/10 cursor-pointer text-sm text-muted hover:border-brand-purple/30 has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/10 has-[:checked]:text-brand-purple-light transition-all"
                    >
                      <input
                        {...register("equityInterest")}
                        type="radio"
                        value={opt}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-purple text-white text-lg font-semibold btn-glow"
              >
                Submit Application
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
