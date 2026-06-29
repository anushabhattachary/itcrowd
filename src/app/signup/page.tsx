"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Zap, Building2, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";

type SignupRole = "business" | "influencer";

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
    <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center font-[family-name:var(--font-inter)] text-white p-6 selection:bg-brand-purple/30">
      <Toaster position="top-center" />

      <div className="flex items-center justify-center gap-1 mb-8">
        <span className="text-3xl font-extrabold tracking-tight font-[family-name:var(--font-syne)] flex items-center">
          ItCrowd <Zap className="ml-1 text-brand-purple" size={24} fill="currentColor" />
        </span>
      </div>

      <div className="w-full max-w-[460px] bg-[#1A1A27] border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl shadow-black/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50" />

        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-[#94A3B8] text-sm">Join ItCrowd as a business or a creator.</p>
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
              className={`flex flex-col items-start gap-1 p-4 rounded-xl border transition-all text-left ${
                role === opt.value
                  ? "bg-brand-purple/15 border-brand-purple/40"
                  : "bg-[#0D0D14] border-white/10 hover:border-white/20"
              }`}
            >
              <opt.icon size={18} className={role === opt.value ? "text-brand-purple-light" : "text-[#94A3B8]"} />
              <span className="text-sm font-semibold">{opt.label}</span>
              <span className="text-[11px] text-[#475569]">{opt.desc}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple"
              placeholder="Jordan Smith"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple"
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-purple text-white py-3 px-4 rounded-xl font-semibold hover:bg-brand-purple-light transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Create account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-[#94A3B8]">
        Already have an account?{" "}
        <a href="/login" className="text-brand-purple hover:text-brand-purple-light font-semibold transition-colors">
          Sign in
        </a>
      </p>
    </div>
  );
}
