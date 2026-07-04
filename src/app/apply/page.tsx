"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

const inputBase =
  "w-full px-5 py-3.5 rounded-2xl bg-white text-[#141413] placeholder-[#9E948B] border focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplyData>();

  const equityInterest = watch("equityInterest");

  const onSubmit = async (data: ApplyData) => {
    // Persist into the Supabase intake table so admins can review + convert
    // the application into a creator account.
    const { error } = await supabase.from("influencer_applications").insert({
      full_name: data.name,
      email: data.email,
      handle: data.handle,
      platform: data.platform,
      follower_range: data.followers,
      niche: data.niche,
      why_join: data.why,
      equity_interest: data.equityInterest,
    });
    if (error) {
      console.error("Application submit failed:", error.message);
    }
    setSubmitted(true);
  };

  return (
    <>
      {/* Dark mini-hero */}
      <section className="dark-surface relative bg-[#141413] text-white p-6 md:p-12 pb-16 md:pb-24 overflow-hidden">
        <Navbar theme="dark" entrance="fade" />

        <div className="w-full max-w-[1360px] mx-auto mt-16 md:mt-24">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="block text-sm uppercase tracking-[0.2em] text-[#9E948B] font-sans"
          >
            Join our network
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] font-heading max-w-[760px]"
          >
            Apply as a <span className="font-accent italic">creator.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-6 text-white/70 text-lg md:text-xl leading-snug max-w-[560px] font-sans"
          >
            Fill out the form below and our team will review your application
            within 48 hours. We work with micro and macro creators — what
            matters most is engagement and niche fit.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[700px] mx-auto px-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-12 text-center"
              style={{ backgroundColor: "#7D756E1C" }}
            >
              <CheckCircle className="mx-auto text-[#5F5D4D]" size={48} />
              <h3 className="mt-4 text-2xl font-medium text-[#141413] font-heading">
                Application Received!
              </h3>
              <p className="mt-2 text-neutral-500 font-sans">
                We&apos;ll review your profile and get back to you within 48
                hours. 🎉
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl p-8 md:p-10 space-y-6"
              style={{ backgroundColor: "#7D756E1C" }}
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Required" })}
                  type="text"
                  placeholder="Your name"
                  className={`${inputBase} ${errors.name ? "border-red-500" : "border-transparent"}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className={`${inputBase} ${errors.email ? "border-red-500" : "border-transparent"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.email.message}</p>
                )}
              </div>

              {/* Social handle */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Primary Social Handle
                </label>
                <input
                  {...register("handle", { required: "Required" })}
                  type="text"
                  placeholder="@yourhandle"
                  className={`${inputBase} ${errors.handle ? "border-red-500" : "border-transparent"}`}
                />
                {errors.handle && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.handle.message}</p>
                )}
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Primary Platform
                </label>
                <select
                  {...register("platform", { required: "Required" })}
                  className={`${inputBase} ${errors.platform ? "border-red-500" : "border-transparent"}`}
                >
                  <option value="">Select...</option>
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.platform && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.platform.message}</p>
                )}
              </div>

              {/* Follower count */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Follower Count
                </label>
                <select
                  {...register("followers", { required: "Required" })}
                  className={`${inputBase} ${errors.followers ? "border-red-500" : "border-transparent"}`}
                >
                  <option value="">Select...</option>
                  {followerRanges.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.followers && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.followers.message}</p>
                )}
              </div>

              {/* Niche */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Your Niche
                </label>
                <input
                  {...register("niche", { required: "Required" })}
                  type="text"
                  placeholder="e.g. Fitness, Tech, Fashion..."
                  className={`${inputBase} ${errors.niche ? "border-red-500" : "border-transparent"}`}
                />
                {errors.niche && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.niche.message}</p>
                )}
              </div>

              {/* Why */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Why do you want to join ItCrowd?
                </label>
                <textarea
                  {...register("why")}
                  rows={3}
                  placeholder="Tell us briefly..."
                  className={`${inputBase} border-transparent resize-none`}
                />
              </div>

              {/* Equity interest */}
              <div>
                <label className="block text-sm font-medium mb-3 text-[#141413] font-sans">
                  Interested in equity deals?
                </label>
                <div className="flex gap-3">
                  {["Yes", "Maybe", "Cash only"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 text-center py-3 rounded-2xl cursor-pointer transition-all text-sm font-medium font-sans ${
                        equityInterest === opt
                          ? "bg-[#141413] text-white"
                          : "bg-white text-[#887C71] hover:text-[#141413]"
                      }`}
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

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#141413] text-white text-lg font-medium hover:bg-neutral-800 transition-colors font-sans"
              >
                Submit Application
                <Send size={18} />
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
