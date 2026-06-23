"use client";

import { useState } from "react";
import { 
  Activity, 
  Users, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  Video, 
  Camera, 
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";

export default function ClientDashboardHome() {
  const [businessInfo] = useState({
    name: "Glow Fitness Studio",
    niche: "Local Boutique Gym",
    location: "Atlanta, GA",
  });

  // Mock metrics
  const stats = [
    { label: "Active Campaigns", value: "3", icon: Activity, change: "+1 this month", isNeutral: false },
    { label: "Total Reach", value: "124.8K", icon: TrendingUp, change: "+18.2% vs last month", isNeutral: false },
    { label: "Total Engagement", value: "8.4%", icon: Sparkles, change: "+0.6% vs industry avg", isNeutral: false },
    { label: "Content Delivered", value: "48 assets", icon: Award, change: "Photos & Videos", isNeutral: true },
    { label: "Upcoming Deliverables", value: "6 pending", icon: Clock, change: "Due this week", isNeutral: true },
    { label: "Next Creator Visit", value: "June 10", icon: Calendar, change: "Tomorrow at 2:00 PM", isNeutral: false },
  ];

  // Creator network snapshot
  const creatorSnapshot = [
    { type: "NIL Athletes Used", count: 4, icon: Users, color: "from-brand-purple to-brand-purple-light" },
    { type: "Influencers Used", count: 6, icon: Sparkles, color: "from-pink-500 to-rose-400" },
    { type: "Photographers Used", count: 2, icon: Camera, color: "from-brand-lime to-emerald-400" },
    { type: "Videographers Used", count: 1, icon: Video, color: "from-blue-500 to-indigo-400" },
  ];

  // Recent activity feed
  const activities = [
    {
      id: 1,
      type: "content",
      badge: "New Content Uploaded",
      badgeColor: "bg-brand-lime/10 text-brand-lime border-brand-lime/20",
      description: "Videographer Zach uploaded 4 raw TikTok drafts for the 'Summer Sweat Challenge'.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "published",
      badge: "Post Published",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description: "Athlete Jordan Carter posted a brand endorsement Reel on Instagram.",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "approval",
      badge: "Campaign Approval",
      badgeColor: "bg-brand-purple/10 text-brand-purple-light border-brand-purple/20",
      description: "You approved the content brief for 'Glow Fitness Grand Opening V2'.",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "milestone",
      badge: "Upcoming Milestone",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      description: "Next scheduled photographer visit at Midtown location on Wednesday.",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Banner */}
<<<<<<< HEAD
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FFFFFF] to-[#FBF6EF] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
=======
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1A1A27] to-[#111118] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
        <div className="space-y-2 relative z-10">
          <span className="text-xs font-semibold text-brand-purple-light uppercase tracking-wider">Client Command Center</span>
          <h1 className="text-3xl font-extrabold text-white font-[family-name:var(--font-syne)]">
            Welcome back, {businessInfo.name}! ⚡️
          </h1>
<<<<<<< HEAD
          <p className="text-[#8A7F6E] text-sm">
=======
          <p className="text-[#94A3B8] text-sm">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            Managing marketing campaigns and creators across your locations from one central operations hub.
          </p>
        </div>
        
        {/* Next Visit Quick Check */}
<<<<<<< HEAD
        <div className="bg-[#F3EBE0]/80 backdrop-blur border border-white/10 rounded-2xl p-4 flex items-center gap-4 shrink-0 relative z-10 hover:border-brand-purple/40 transition-colors">
=======
        <div className="bg-[#0D0D14]/80 backdrop-blur border border-white/10 rounded-2xl p-4 flex items-center gap-4 shrink-0 relative z-10 hover:border-brand-purple/40 transition-colors">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
          <div className="w-10 h-10 rounded-xl bg-brand-purple/15 flex items-center justify-center text-brand-purple-light shadow-md shadow-brand-purple/10">
            <Calendar size={20} />
          </div>
          <div>
<<<<<<< HEAD
            <span className="text-[10px] text-[#6B5F4F] font-bold uppercase block tracking-wider">Next Creator Visit</span>
            <span className="text-sm font-bold text-white block">Tomorrow · 2:00 PM</span>
            <span className="text-xs text-[#8A7F6E] block">Midtown Studio photoshoot</span>
=======
            <span className="text-[10px] text-[#475569] font-bold uppercase block tracking-wider">Next Creator Visit</span>
            <span className="text-sm font-bold text-white block">Tomorrow · 2:00 PM</span>
            <span className="text-xs text-[#94A3B8] block">Midtown Studio photoshoot</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
          </div>
        </div>
        
        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div 
            key={i} 
<<<<<<< HEAD
            className="bg-[#FFFFFF] border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col justify-between group hover:border-white/10 transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-semibold text-[#8A7F6E] uppercase tracking-wider line-clamp-1">{stat.label}</span>
=======
            className="bg-[#1A1A27] border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col justify-between group hover:border-white/10 transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider line-clamp-1">{stat.label}</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              <span className="p-1.5 bg-white/5 rounded-lg text-brand-purple-light group-hover:bg-brand-purple/15 transition-colors">
                <stat.icon size={14} />
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-syne)]">{stat.value}</span>
<<<<<<< HEAD
              <span className={`text-[10px] block font-medium ${stat.isNeutral ? "text-[#6B5F4F]" : "text-brand-lime"}`}>
=======
              <span className={`text-[10px] block font-medium ${stat.isNeutral ? "text-[#475569]" : "text-brand-lime"}`}>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Creator Snapshot & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Creator Network Snapshot */}
<<<<<<< HEAD
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Creator Network Snapshot</h2>
              <p className="text-xs text-[#8A7F6E] mt-0.5">Summary of creators deployed for your brand campaign campaigns</p>
=======
        <div className="lg:col-span-8 bg-[#1A1A27] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Creator Network Snapshot</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">Summary of creators deployed for your brand campaign campaigns</p>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            </div>
            <span className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white font-medium">All Campaigns</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {creatorSnapshot.map((c, i) => (
              <div 
                key={i} 
<<<<<<< HEAD
                className="bg-[#F3EBE0] border border-white/5 rounded-2xl p-5 text-center group hover:border-brand-purple/30 transition-all relative overflow-hidden"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-tr ${c.color} p-0.5 shadow-lg shadow-black/40`}>
                  <div className="w-full h-full bg-[#F3EBE0] rounded-full flex items-center justify-center text-white">
=======
                className="bg-[#0D0D14] border border-white/5 rounded-2xl p-5 text-center group hover:border-brand-purple/30 transition-all relative overflow-hidden"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-tr ${c.color} p-0.5 shadow-lg shadow-black/40`}>
                  <div className="w-full h-full bg-[#0D0D14] rounded-full flex items-center justify-center text-white">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <c.icon size={18} className="text-brand-purple-light" />
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-white font-[family-name:var(--font-syne)] block">{c.count}</span>
<<<<<<< HEAD
                <span className="text-xs text-[#8A7F6E] block mt-1 font-medium">{c.type}</span>
=======
                <span className="text-xs text-[#94A3B8] block mt-1 font-medium">{c.type}</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Actions */}
<<<<<<< HEAD
        <div className="lg:col-span-4 bg-gradient-to-b from-[#FFFFFF] to-[#FBF6EF] border border-[#B75C3A]/20 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Campaign Shortcuts</h2>
            <div className="space-y-3">
              <Link href="/dashboard/messages" className="flex items-center justify-between p-3 bg-[#F3EBE0] border border-white/5 hover:border-[#B75C3A]/50 rounded-xl transition-all group">
=======
        <div className="lg:col-span-4 bg-gradient-to-b from-[#1A1A27] to-[#111118] border border-[#7C3AED]/20 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Campaign Shortcuts</h2>
            <div className="space-y-3">
              <Link href="/dashboard/messages" className="flex items-center justify-between p-3 bg-[#0D0D14] border border-white/5 hover:border-[#7C3AED]/50 rounded-xl transition-all group">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple-light">
                    <MessageSquare size={16} />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white block">Review Creative Assets</span>
<<<<<<< HEAD
                    <span className="text-[10px] text-[#8A7F6E] block">2 drafts waiting for approval</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#6B5F4F] group-hover:text-brand-purple-light transition-colors" />
              </Link>

              <Link href="/dashboard/content" className="flex items-center justify-between p-3 bg-[#F3EBE0] border border-white/5 hover:border-brand-lime/50 rounded-xl transition-all group">
=======
                    <span className="text-[10px] text-[#94A3B8] block">2 drafts waiting for approval</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#475569] group-hover:text-brand-purple-light transition-colors" />
              </Link>

              <Link href="/dashboard/content" className="flex items-center justify-between p-3 bg-[#0D0D14] border border-white/5 hover:border-brand-lime/50 rounded-xl transition-all group">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-lime/10 rounded-lg text-brand-lime">
                    <Camera size={16} />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white block">Browse Content Library</span>
<<<<<<< HEAD
                    <span className="text-[10px] text-[#8A7F6E] block">Download your campaign photos</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#6B5F4F] group-hover:text-brand-lime transition-colors" />
=======
                    <span className="text-[10px] text-[#94A3B8] block">Download your campaign photos</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#475569] group-hover:text-brand-lime transition-colors" />
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 relative z-10">
            <Link 
              href="/dashboard/campaigns" 
              className="w-full flex items-center justify-center gap-1 bg-brand-purple text-white py-3 px-4 rounded-xl text-xs font-bold btn-glow"
            >
              Go to Campaigns <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-purple/5 blur-3xl rounded-full" />
        </div>
      </div>

      {/* Recent Activity Feed & Detailed Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Feed */}
<<<<<<< HEAD
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Recent Activity</h2>
              <p className="text-xs text-[#8A7F6E] mt-0.5">Chronological feed of creator activities and milestones</p>
            </div>
            <span className="text-xs text-[#6B5F4F] font-bold uppercase tracking-wider">Live Updates</span>
=======
        <div className="lg:col-span-8 bg-[#1A1A27] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Recent Activity</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">Chronological feed of creator activities and milestones</p>
            </div>
            <span className="text-xs text-[#475569] font-bold uppercase tracking-wider">Live Updates</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
          </div>

          <div className="space-y-6">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-4 items-start group">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-purple mt-2 shrink-0 group-hover:scale-125 transition-transform" />
<<<<<<< HEAD
                <div className="flex-1 bg-[#F3EBE0]/60 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
=======
                <div className="flex-1 bg-[#0D0D14]/60 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border inline-block ${act.badgeColor}`}>
                      {act.badge}
                    </span>
<<<<<<< HEAD
                    <span className="text-[10px] text-[#6B5F4F] font-medium flex items-center gap-1">
=======
                    <span className="text-[10px] text-[#475569] font-medium flex items-center gap-1">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      <Clock size={10} /> {act.time}
                    </span>
                  </div>
                  <p className="text-sm text-white/95 leading-relaxed">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Active Campaigns Snapshot */}
<<<<<<< HEAD
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Campaign Progress</h2>
            <p className="text-xs text-[#8A7F6E]">Ongoing marketing pipelines running this month</p>
=======
        <div className="lg:col-span-4 bg-[#1A1A27] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Campaign Progress</h2>
            <p className="text-xs text-[#94A3B8]">Ongoing marketing pipelines running this month</p>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            
            <div className="space-y-4 pt-2">
              {[
                { name: "Summer Sweat Challenge", progress: 66, color: "bg-brand-purple" },
                { name: "Midtown Studio Grand Opening", progress: 100, color: "bg-brand-lime" },
                { name: "NIL Athlete Endorsements", progress: 40, color: "bg-blue-500" }
              ].map((c, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white line-clamp-1">{c.name}</span>
<<<<<<< HEAD
                    <span className="text-[#8A7F6E]">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F3EBE0] rounded-full overflow-hidden">
=======
                    <span className="text-[#94A3B8]">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0D0D14] rounded-full overflow-hidden">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <div className={`h-full ${c.color} rounded-full transition-all duration-500`} style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6">
            <Link 
              href="/dashboard/reports" 
              className="w-full flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all border border-white/5"
            >
              View Performance Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
