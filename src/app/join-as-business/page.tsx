"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle2 } from "lucide-react";

interface BusinessFormData {
  name: string;
  phone: string;
}

const inputBase =
  "w-full px-5 py-3.5 rounded-2xl bg-white text-[#141413] placeholder-[#9E948B] border focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";

export default function JoinAsBusinessPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessFormData>();

  const onSubmit = async (data: BusinessFormData) => {
    setSubmitError("");

    try {
      const res = await fetch("/api/submit-business-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
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
      setSubmitError("Network error. Please check your connection and try again.");
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
            Leave your name and number and we&apos;ll take it from there.
            No commitment, just a conversation.
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
              Two fields and you&apos;re done. We&apos;ll call you to talk
              goals, budget, and the right creators for your brand.
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#141413] font-sans">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+()\d\s.-]{7,20}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(404) 555-0123"
                  className={`${inputBase} ${errors.phone ? "border-red-500" : "border-transparent"}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.phone.message}</p>
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
