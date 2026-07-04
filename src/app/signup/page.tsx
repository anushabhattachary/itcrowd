"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Building2, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import A from "@/lib/assets";

type SignupRole = "business" | "influencer";

const inputCls =
  "w-full px-5 py-3.5 rounded-2xl bg-[#F7F6F5] text-[#141413] placeholder-[#9E948B] border border-[#141413]/10 focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<SignupRole>("business");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      toast.success("Welcome to ItCrowd!");
      router.push("/onboarding");
      router.refresh();
    } else {
      toast.success("Account created! Check your email to confirm, then sign in.");
      router.push("/login");
    }
  };

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
        className="w-full max-w-md flex flex-col items-center"
      >
        {/* Brand */}
        <Link href="/" aria-label="ItCrowd home" className="flex items-center gap-3 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={A.logoDark} alt="" aria-hidden="true" className="w-9 h-9" />
          <span className="text-2xl font-medium text-[#141413] font-heading">ItCrowd</span>
        </Link>

        {/* Signup card */}
        <div className="w-full bg-white rounded-3xl shadow-[0_24px_60px_-24px_rgba(20,20,19,0.18)] p-8 md:p-10">
          <div className="mb-7">
            <h1 className="text-3xl font-normal leading-[1.1] text-[#141413] font-heading">
              Create your <span className="font-accent italic">account</span>
            </h1>
            <p className="mt-2 text-sm text-[#887C71] font-sans">
              Join ItCrowd as a business or a creator.
            </p>
          </div>

          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {([
              { value: "business", label: "Business", icon: Building2, desc: "Run campaigns" },
              { value: "influencer", label: "Creator", icon: Sparkles, desc: "Get deals" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRole(opt.value)}
                className={`flex flex-col items-start gap-1 p-4 rounded-2xl transition-all text-left font-sans ${
                  role === opt.value
                    ? "bg-[#141413] text-white"
                    : "bg-white text-[#887C71] border border-[#141413]/10 hover:text-[#141413]"
                }`}
              >
                <opt.icon
                  size={18}
                  className={role === opt.value ? "text-white" : "text-[#9E948B]"}
                />
                <span className="text-sm font-medium">{opt.label}</span>
                <span
                  className={`text-[11px] ${
                    role === opt.value ? "text-white/60" : "text-[#9E948B]"
                  }`}
                >
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#141413] font-sans">
                Full name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputCls}
                placeholder="Jordan Smith"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#141413] font-sans">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputCls}
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#141413] font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${inputCls} pr-12`}
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E948B] hover:text-[#141413] transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#141413] text-white font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60 flex justify-center items-center font-sans"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-[#887C71] font-sans">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#141413] font-medium hover:text-[#5F5D4D] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
