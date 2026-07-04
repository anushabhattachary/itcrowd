"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle2 } from "lucide-react";

interface BusinessFormData {
  name: string;
  companyName: string;
  timeToMarket: string;
  hasWebsite: "Yes" | "No";
  websiteLink: string;
  targetNiche: string;
  brandRep: string;
  budget: string;
  deliverable: string;
  goal: string;
}

const inputBase =
  "w-full px-5 py-3.5 rounded-2xl bg-white text-[#141413] placeholder-[#9E948B] border focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";

export default function JoinAsBusinessPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BusinessFormData>({
    defaultValues: { hasWebsite: "Yes" },
  });

  const hasWebsite = watch("hasWebsite");

  const onSubmit = async (data: BusinessFormData) => {
    setSubmitError("");

    try {
      const res = await fetch("/api/submit-business-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          companyName: data.companyName,
          timeToMarket: data.timeToMarket,
          hasWebsite: data.hasWebsite,
          websiteLink: data.hasWebsite === "Yes" ? data.websiteLink : "",
          targetNiche: data.targetNiche,
          brandRep: data.brandRep,
          budget: data.budget,
          deliverable: data.deliverable,
          goal: data.goal,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setIsSuccess(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      setSubmitError("Network error — please check your connection and try again.");
    }
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
            For businesses
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] font-heading max-w-[760px]"
          >
            Let&apos;s build your{" "}
            <span className="font-accent italic">campaign.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-6 text-white/70 text-lg md:text-xl leading-snug max-w-[560px] font-sans"
          >
            Tell us about your business and what you&apos;re looking for —
            we&apos;ll take it from there. No commitment, just a conversation.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[700px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-normal leading-[1.1] text-neutral-900 font-heading">
              Business <span className="font-accent italic">interest</span> form
            </h2>
            <p className="mt-4 text-neutral-500 max-w-lg mx-auto text-lg leading-snug font-sans">
              This helps us understand your budget, target audience, and goals
              so we can match you with the right creators.
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-12 text-center"
              style={{ backgroundColor: "#7D756E1C" }}
            >
              <CheckCircle2 className="mx-auto text-[#5F5D4D]" size={48} />
              <h3 className="mt-4 text-2xl font-medium text-[#141413] font-heading">
                You&apos;re in!
              </h3>
              <p className="mt-2 text-neutral-500 font-sans">
                We&apos;ll review your info and reach out within 24 hours. Talk
                soon. 🚀
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
                  Your Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your name"
                  className={`${inputBase} ${errors.name ? "border-red-500" : "border-transparent"}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.name.message}</p>
                )}
              </div>

              {/* Company name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Business Name
                </label>
                <input
                  {...register("companyName", { required: "Business name is required" })}
                  type="text"
                  placeholder="Your business name"
                  className={`${inputBase} ${errors.companyName ? "border-red-500" : "border-transparent"}`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-600 font-sans">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Time to market */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  When was your business established? (or how long have you been
                  operating?)
                </label>
                <input
                  {...register("timeToMarket", { required: "This field is required" })}
                  type="text"
                  placeholder="e.g. Founded in 2023"
                  className={`${inputBase} ${errors.timeToMarket ? "border-red-500" : "border-transparent"}`}
                />
                {errors.timeToMarket && (
                  <p className="mt-1 text-xs text-red-600 font-sans">
                    {errors.timeToMarket.message}
                  </p>
                )}
              </div>

              {/* Has website */}
              <div>
                <label className="block text-sm font-medium mb-3 text-[#141413] font-sans">
                  Do you have a website?
                </label>
                <div className="flex gap-3">
                  {(["Yes", "No"] as const).map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 text-center py-3 rounded-2xl cursor-pointer transition-all text-sm font-medium font-sans ${
                        hasWebsite === opt
                          ? "bg-[#141413] text-white"
                          : "bg-white text-[#887C71] hover:text-[#141413]"
                      }`}
                    >
                      <input
                        {...register("hasWebsite")}
                        type="radio"
                        value={opt}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Website link (conditional) */}
              {hasWebsite === "Yes" && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                    Business website link
                  </label>
                  <input
                    {...register("websiteLink", {
                      required: hasWebsite === "Yes" ? "Website link is required" : false,
                    })}
                    type="url"
                    placeholder="https://yourbusiness.com"
                    className={`${inputBase} ${errors.websiteLink ? "border-red-500" : "border-transparent"}`}
                  />
                  {errors.websiteLink && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {errors.websiteLink.message}
                    </p>
                  )}
                </div>
              )}

              {/* Target niche */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  What niche do you want to target?
                </label>
                <input
                  {...register("targetNiche", { required: "This field is required" })}
                  type="text"
                  placeholder="e.g. Fitness, Tech, Fashion..."
                  className={`${inputBase} ${errors.targetNiche ? "border-red-500" : "border-transparent"}`}
                />
                {errors.targetNiche && (
                  <p className="mt-1 text-xs text-red-600 font-sans">
                    {errors.targetNiche.message}
                  </p>
                )}
              </div>

              {/* Brand rep */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Who do you see representing your brand?
                </label>
                <input
                  {...register("brandRep", { required: "This field is required" })}
                  type="text"
                  placeholder="e.g. Local athletes, food creators..."
                  className={`${inputBase} ${errors.brandRep ? "border-red-500" : "border-transparent"}`}
                />
                {errors.brandRep && (
                  <p className="mt-1 text-xs text-red-600 font-sans">
                    {errors.brandRep.message}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Monthly Budget (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E948B] font-medium font-sans">
                    $
                  </span>
                  <input
                    {...register("budget", { required: "Budget is required" })}
                    type="number"
                    min="0"
                    placeholder="1000"
                    className={`${inputBase} pl-9 ${errors.budget ? "border-red-500" : "border-transparent"}`}
                  />
                </div>
                {errors.budget && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.budget.message}</p>
                )}
              </div>

              {/* Deliverable */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  What deliverable do you want from the creator?
                </label>
                <textarea
                  {...register("deliverable", { required: "This field is required" })}
                  rows={4}
                  placeholder="e.g. Two Reels a month and a story series..."
                  className={`${inputBase} resize-none ${errors.deliverable ? "border-red-500" : "border-transparent"}`}
                />
                {errors.deliverable && (
                  <p className="mt-1 text-xs text-red-600 font-sans">
                    {errors.deliverable.message}
                  </p>
                )}
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  What is a goal your business has in the next 6 months?
                </label>
                <textarea
                  {...register("goal", { required: "This field is required" })}
                  rows={4}
                  placeholder="Tell us briefly..."
                  className={`${inputBase} resize-none ${errors.goal ? "border-red-500" : "border-transparent"}`}
                />
                {errors.goal && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.goal.message}</p>
                )}
              </div>

              {/* Submit */}
              <div>
                {submitError && (
                  <p className="text-red-600 text-sm mb-4 text-center font-sans">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#141413] text-white text-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-70 font-sans"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    "Submit My Interest →"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
