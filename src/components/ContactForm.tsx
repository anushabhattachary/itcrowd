"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  role: "business" | "influencer";
  company: string;
  challenge: string;
  budget: string;
}

const businessBudgets = ["Under $500", "$500-$1K", "$1K-$2K", "$2K+"];
const influencerFollowers = [
  "Under 10K",
  "10K-50K",
  "50K-200K",
  "200K+",
];

const inputBase =
  "w-full px-5 py-3.5 rounded-2xl bg-white text-[#141413] placeholder-[#9E948B] border focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { role: "business" },
  });

  const role = watch("role");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="max-w-[700px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#887C71] font-sans">
            Let&apos;s talk
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-normal leading-[1.1] text-neutral-900 font-heading">
            Tell us about <span className="font-accent italic">yourself</span>
          </h2>
          <p className="mt-4 text-neutral-500 max-w-lg mx-auto text-lg leading-snug font-sans">
            Whether you&apos;re a business looking to grow or a creator ready to
            get matched, fill this out and we&apos;ll be in touch within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl p-12 text-center"
            style={{ backgroundColor: "#7D756E1C" }}
          >
            <CheckCircle className="mx-auto text-[#5F5D4D]" size={48} />
            <h3 className="mt-4 text-2xl font-medium text-[#141413] font-heading">
              You&apos;re in!
            </h3>
            <p className="mt-2 text-neutral-500 font-sans">
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
            className="rounded-3xl p-8 md:p-10 space-y-6"
            style={{ backgroundColor: "#7D756E1C" }}
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                Full Name
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">Email</label>
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
                className={`${inputBase} ${errors.email ? "border-red-500" : "border-transparent"}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-sans">{errors.email.message}</p>
              )}
            </div>

            {/* Role radio */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#141413] font-sans">
                I am a...
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 text-center py-3 rounded-2xl cursor-pointer transition-all text-sm font-medium font-sans ${
                    role === "business"
                      ? "bg-[#141413] text-white"
                      : "bg-white text-[#887C71] hover:text-[#141413]"
                  }`}
                >
                  <input {...register("role")} type="radio" value="business" className="sr-only" />
                  Business Owner
                </label>
                <label
                  className={`flex-1 text-center py-3 rounded-2xl cursor-pointer transition-all text-sm font-medium font-sans ${
                    role === "influencer"
                      ? "bg-[#141413] text-white"
                      : "bg-white text-[#887C71] hover:text-[#141413]"
                  }`}
                >
                  <input {...register("role")} type="radio" value="influencer" className="sr-only" />
                  Influencer / Creator
                </label>
              </div>
            </div>

            {/* Company / Handle */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                {role === "business" ? "Business Name" : "Social Handle"}
              </label>
              <input
                {...register("company", { required: "This field is required" })}
                type="text"
                placeholder={role === "business" ? "Your business name" : "@yourhandle"}
                className={`${inputBase} ${errors.company ? "border-red-500" : "border-transparent"}`}
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-600 font-sans">{errors.company.message}</p>
              )}
            </div>

            {/* Challenge */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                What&apos;s your biggest challenge right now?
              </label>
              <textarea
                {...register("challenge")}
                rows={3}
                placeholder="Tell us briefly..."
                className={`${inputBase} border-transparent resize-none`}
              />
            </div>

            {/* Budget / Follower count */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                {role === "business" ? "Monthly Budget" : "Follower Count"}
              </label>
              <select
                {...register("budget", { required: "Please select an option" })}
                className={`${inputBase} ${errors.budget ? "border-red-500" : "border-transparent"}`}
              >
                <option value="">Select...</option>
                {(role === "business" ? businessBudgets : influencerFollowers).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="mt-1 text-xs text-red-600 font-sans">{errors.budget.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#141413] text-white text-lg font-medium hover:bg-neutral-800 transition-colors font-sans"
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
