"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  Building2, 
  Users, 
  Link as LinkIcon, 
  Settings, 
  Plus, 
  Bell, 
  LogOut
} from "lucide-react";
import { Toaster } from "react-hot-toast";

const navItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: Building2, label: "Companies", href: "/dashboard/companies" },
  { icon: Users, label: "Influencers", href: "/dashboard/influencers" },
  { icon: LinkIcon, label: "Campaigns", href: "/dashboard/campaigns" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  // Format page title from pathname
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    const segment = pathname.split("/").filter(Boolean)[1];
    if (!segment) return "Overview";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <div className="flex bg-[#0D0D14] min-h-screen text-white font-[family-name:var(--font-inter)] selection:bg-brand-purple/30">
      <Toaster position="top-right" />

      {/* Sidebar - Fixed 240px */}
      <aside className="w-[240px] fixed top-0 bottom-0 left-0 bg-[#111118] border-r border-white/5 flex flex-col z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-1 group">
             <span className="text-xl font-extrabold tracking-tight font-[family-name:var(--font-syne)] flex items-center">
                ItCrowd <span className="ml-1 text-brand-purple">⚡️</span>
              </span>
          </Link>
        </div>

        <nav className="flex-1 mt-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-purple/15 text-brand-purple border-l-4 border-brand-purple"
                    : "text-[#94A3B8] hover:bg-white/5 hover:text-white border-l-4 border-transparent"
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-sm font-bold shadow-[0_0_10px_rgba(124,58,237,0.4)]">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Anusha</span>
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

      {/* Main Content Area */}
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-[72px] sticky top-0 z-10 bg-[#0D0D14]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold font-[family-name:var(--font-syne)]">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative text-[#94A3B8] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Bell size={20} />
              {/* Fake notification dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-purple rounded-full"></span>
            </button>
            
            {/* The global + button that will trigger different contexts depending on page */}
            {/* We will implement specific + buttons on each page, but this global one provides standard layout */}
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105 hover:bg-brand-purple-light transition-all">
               <Plus size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
