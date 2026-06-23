"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  Link as LinkIcon, 
  Image,
  MessageSquare,
  TrendingUp,
  Settings, 
  Plus, 
  Bell, 
  LogOut,
  Sparkles,
  Lock,
  Compass,
  CalendarDays,
  ShoppingBag
} from "lucide-react";
import { Toaster } from "react-hot-toast";

const navItems = [
  { icon: BarChart3, label: "Overview", href: "/dashboard" },
  { icon: LinkIcon, label: "Campaigns", href: "/dashboard/campaigns" },
  { icon: Image, label: "Content Library", href: "/dashboard/content" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: TrendingUp, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const comingSoonItems = [
  { icon: CalendarDays, label: "Book Campaign" },
  { icon: Compass, label: "Creator Network" },
  { icon: ShoppingBag, label: "Marketplace" },
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
    if (pathname === "/dashboard") return "Dashboard Overview";
    const segment = pathname.split("/").filter(Boolean)[1];
    if (!segment) return "Dashboard Overview";
    if (segment === "campaigns") return "Campaign Management";
    if (segment === "content") return "Content Library";
    if (segment === "messages") return "Messaging & Support";
    if (segment === "reports") return "Performance Reports";
    if (segment === "settings") return "Business Profile";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <div className="flex bg-[#F3EBE0] min-h-screen text-white font-[family-name:var(--font-inter)] selection:bg-brand-purple/30">
      <Toaster position="top-right" />

      {/* Sidebar - Fixed 240px */}
      <aside className="w-[240px] fixed top-0 bottom-0 left-0 bg-[#FBF6EF] border-r border-white/5 flex flex-col z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-1 group">
             <span className="text-xl font-extrabold tracking-tight font-[family-name:var(--font-syne)] flex items-center">
                ItCrowd <span className="ml-1 text-brand-purple">⚡️</span>
              </span>
          </Link>
        </div>

        <nav className="flex-1 mt-4 space-y-6 overflow-y-auto px-4 pb-4">
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-semibold tracking-wider text-[#6B5F4F] uppercase">Manage</span>
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? "bg-brand-purple/15 text-brand-purple-light border-l-2 border-brand-purple"
                      : "text-[#8A7F6E] hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                  }`}
                >
                  <item.icon size={16} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            <span className="px-2 text-[10px] font-semibold tracking-wider text-[#6B5F4F] uppercase">Coming Soon</span>
            {comingSoonItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[#6B5F4F] cursor-not-allowed opacity-60"
              >
                <div className="flex items-center">
                  <item.icon size={16} className="mr-3 text-[#6B5F4F]" />
                  <span>{item.label}</span>
                </div>
                <Lock size={12} className="text-[#6B5F4F]" />
              </div>
            ))}
          </div>
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
                className="text-xs text-[#6B5F4F] hover:text-red-400 text-left flex items-center mt-0.5 transition-colors"
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
        <header className="h-[72px] sticky top-0 z-10 bg-[#F3EBE0]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold font-[family-name:var(--font-syne)]">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative text-[#8A7F6E] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
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
