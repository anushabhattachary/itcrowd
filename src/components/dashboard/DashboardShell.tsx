"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Building2,
  Users,
  Link as LinkIcon,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  Settings,
  Sparkles,
  Bell,
  LogOut,
  Star,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import type { Role } from "@/lib/types";
import { useAccount } from "@/lib/account-context";

interface NavItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
}

const NAV: Record<Role, NavItem[]> = {
  admin: [
    { icon: BarChart3, label: "Overview", href: "/dashboard" },
    { icon: Building2, label: "Companies", href: "/dashboard/companies" },
    { icon: Users, label: "Creators", href: "/dashboard/influencers" },
    { icon: LinkIcon, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: ImageIcon, label: "Content", href: "/dashboard/content" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Star, label: "Highlights", href: "/dashboard/highlights" },
    { icon: TrendingUp, label: "Reports", href: "/dashboard/reports" },
  ],
  business: [
    { icon: BarChart3, label: "Overview", href: "/dashboard" },
    { icon: LinkIcon, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: ImageIcon, label: "Content Library", href: "/dashboard/content" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: TrendingUp, label: "Reports", href: "/dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ],
  influencer: [
    { icon: BarChart3, label: "Overview", href: "/dashboard" },
    { icon: LinkIcon, label: "My Campaigns", href: "/dashboard/campaigns" },
    { icon: ImageIcon, label: "Content", href: "/dashboard/content" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Settings, label: "Profile", href: "/dashboard/settings" },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  business: "Business",
  influencer: "Creator",
};

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const account = useAccount();
  const navItems = NAV[account.role];

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const getPageTitle = () => {
    const segment = pathname.split("/").filter(Boolean)[1];
    if (!segment) return "Overview";
    const match = navItems.find((n) => n.href.endsWith(segment));
    return match?.label ?? segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const initial = (account.displayName || account.email || "?").charAt(0).toUpperCase();

  return (
    <div className="flex bg-[#0D0D14] min-h-screen text-white font-[family-name:var(--font-inter)] selection:bg-brand-purple/30">
      <Toaster position="top-right" />

      <aside className="w-[240px] fixed top-0 bottom-0 left-0 bg-[#111118] border-r border-white/5 flex flex-col z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-1 group">
            <span className="text-xl font-extrabold tracking-tight font-[family-name:var(--font-syne)] flex items-center">
              ItCrowd <span className="ml-1 text-brand-purple">⚡️</span>
            </span>
          </Link>
          <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-brand-purple-light uppercase">
            <Sparkles size={10} /> {ROLE_LABEL[account.role]}
          </span>
        </div>

        <nav className="flex-1 mt-2 space-y-1 overflow-y-auto px-4 pb-4">
          <span className="px-2 text-[10px] font-semibold tracking-wider text-[#475569] uppercase">Manage</span>
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? "bg-brand-purple/15 text-brand-purple-light border-l-2 border-brand-purple"
                    : "text-[#94A3B8] hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                }`}
              >
                <item.icon size={16} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-sm font-bold shadow-[0_0_10px_rgba(124,58,237,0.4)]">
              {initial}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{account.displayName || account.email}</span>
              <button
                onClick={handleSignOut}
                className="text-xs text-[#475569] hover:text-red-400 text-left flex items-center mt-0.5 transition-colors"
              >
                Sign Out <LogOut size={10} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <header className="h-[72px] sticky top-0 z-10 bg-[#0D0D14]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold font-[family-name:var(--font-syne)]">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            {account.status === "pending" && (
              <span className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Pending review
              </span>
            )}
            <button className="relative text-[#94A3B8] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-purple rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
