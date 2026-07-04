"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import A from "@/lib/assets";

const inputCls =
  "w-full px-5 py-3.5 rounded-2xl bg-[#F7F6F5] text-[#141413] placeholder-[#9E948B] border focus:outline-none focus:ring-2 focus:ring-[#141413]/60 transition-all font-sans";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success("Welcome back!");
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid email or password");
        toast.error(data.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
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

        {/* Login card */}
        <div className="w-full bg-white rounded-3xl shadow-[0_24px_60px_-24px_rgba(20,20,19,0.18)] p-8 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-normal leading-[1.1] text-[#141413] font-heading">
              Welcome <span className="font-accent italic">back</span>
            </h1>
            <p className="mt-2 text-sm text-[#887C71] font-sans">
              Sign in to your ItCrowd dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#141413] font-sans">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputCls} ${error ? "border-red-500" : "border-[#141413]/10"}`}
                placeholder="you@company.com"
                required
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
                  className={`${inputCls} pr-12 ${error ? "border-red-500" : "border-[#141413]/10"}`}
                  placeholder="••••••••"
                  required
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

            {error && (
              <p className="text-sm text-red-600 font-medium font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#141413] text-white font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60 flex justify-center items-center font-sans"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-[#887C71] font-sans">
          New to ItCrowd?{" "}
          <Link
            href="/signup"
            className="text-[#141413] font-medium hover:text-[#5F5D4D] transition-colors"
          >
            Create an account
          </Link>
        </p>
        <p className="mt-3 text-xs text-[#9E948B] font-sans">
          ItCrowd LLC · Businesses &amp; Creators
        </p>
      </motion.div>
    </div>
  );
}
