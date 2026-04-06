"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center font-[family-name:var(--font-inter)] text-white p-6 selection:bg-brand-purple/30">
      <Toaster position="top-center" />
      
      {/* Wordmark */}
      <div className="flex items-center justify-center gap-1 mb-8">
        <span className="text-3xl font-extrabold tracking-tight font-[family-name:var(--font-syne)] flex items-center">
          ItCrowd <Zap className="ml-1 text-brand-purple" size={24} fill="currentColor" />
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-[#1A1A27] border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl shadow-black/50 relative overflow-hidden">
        {/* Subtle purple gradient at top of card */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50" />
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back 👋</h1>
          <p className="text-[#94A3B8] text-sm">ItCrowd Internal Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
              placeholder="admin@itcrowd.io"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-purple text-white py-3 px-4 rounded-xl font-semibold hover:bg-brand-purple-light hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs text-[#475569]">
        ItCrowd LLC · Internal Use Only
      </p>
    </div>
  );
}
