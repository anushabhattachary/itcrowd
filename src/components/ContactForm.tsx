"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  role: "startup" | "influencer";
  company: string;
  challenge: string;
  budget: string;
}

const startupBudgets = ["Under $500", "$500–$1K", "$1K–$2K", "$2K+"];
const influencerFollowers = [
  "Under 10K",
  "10K–50K",
  "50K–200K",
  "200K+",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { role: "startup" },
  });

  const role = watch("role");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[700px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
            Let&apos;s Talk
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)]">
            Tell Us About Yourself
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Whether you&apos;re a startup looking to grow or an influencer ready
            to get matched — fill this out and we&apos;ll be in touch within 24
            hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <CheckCircle className="mx-auto text-brand-lime" size={48} />
            <h3 className="mt-4 text-2xl font-bold font-[family-name:var(--font-syne)]">
              You&apos;re in!
            </h3>
            <p className="mt-2 text-muted">
              We&apos;ll be in touch within 24 hours. 🚀
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-8 md:p-10 space-y-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your name"
                className={`w-full px-4 py-3 rounded-xl bg-background border text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all ${
                  errors.name ? "border-red-400" : "border-white/10"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-background border text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all ${
                  errors.email ? "border-red-400" : "border-white/10"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role radio */}
            <div>
              <label className="block text-sm font-medium mb-3">
                I am a...
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 text-center py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                    role === "startup"
                      ? "border-brand-purple bg-brand-purple/10 text-brand-purple-light"
                      : "border-white/10 text-muted hover:border-white/20"
                  }`}
                >
                  <input
                    {...register("role")}
                    type="radio"
                    value="startup"
                    className="sr-only"
                  />
                  Startup Founder
                </label>
                <label
                  className={`flex-1 text-center py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                    role === "influencer"
                      ? "border-brand-purple bg-brand-purple/10 text-brand-purple-light"
                      : "border-white/10 text-muted hover:border-white/20"
                  }`}
                >
                  <input
                    {...register("role")}
                    type="radio"
                    value="influencer"
                    className="sr-only"
                  />
                  Influencer / Creator
                </label>
              </div>
            </div>

            {/* Company / Handle */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {role === "startup" ? "Company Name" : "Social Handle"}
              </label>
              <input
                {...register("company", { required: "This field is required" })}
                type="text"
                placeholder={
                  role === "startup" ? "Your startup name" : "@yourhandle"
                }
                className={`w-full px-4 py-3 rounded-xl bg-background border text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all ${
                  errors.company ? "border-red-400" : "border-white/10"
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Challenge */}
            <div>
              <label className="block text-sm font-medium mb-2">
                What&apos;s your biggest challenge right now?
              </label>
              <textarea
                {...register("challenge")}
                rows={3}
                placeholder="Tell us briefly..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all resize-none"
              />
            </div>

            {/* Budget / Follower count */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {role === "startup" ? "Monthly Budget" : "Follower Count"}
              </label>
              <select
                {...register("budget", {
                  required: "Please select an option",
                })}
                className={`w-full px-4 py-3 rounded-xl bg-background border text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all ${
                  errors.budget ? "border-red-400" : "border-white/10"
                }`}
              >
                <option value="" className="bg-background">
                  Select...
                </option>
                {(role === "startup" ? startupBudgets : influencerFollowers).map(
                  (opt) => (
                    <option key={opt} value={opt} className="bg-background">
                      {opt}
                    </option>
                  )
                )}
              </select>
              {errors.budget && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.budget.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-purple text-white text-lg font-semibold btn-glow"
            >
              Send It
              <Send size={18} />
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
