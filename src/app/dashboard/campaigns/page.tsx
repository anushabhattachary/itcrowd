"use client";

import { useState } from "react";
import { 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  PauseCircle, 
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Award,
  Video,
  Camera,
  Layers,
  ArrowRight,
  Plus
} from "lucide-react";
import SlideDrawer from "@/components/ui/SlideDrawer";

// Mock Campaign Type
interface CreatorDeliverable {
  creatorName: string;
  creatorType: "Athlete" | "Influencer" | "Photographer" | "Videographer";
  deliverableType: string;
  status: "Completed" | "Pending Approval" | "In Production" | "Not Started";
  date: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "Active" | "Completed" | "Pending" | "Paused";
  brief: string;
  creatorTypes: ("Athlete" | "Influencer" | "Photographer" | "Videographer")[];
  assignedCreators: { name: string; initials: string; role: string }[];
  deliverablesProgress: { completed: number; total: number };
  timeline: { start: string; end: string };
  performance: { reach: string; engagement: string; impressions: string };
  deliverables: CreatorDeliverable[];
}

export default function ClientCampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Mock campaigns data
  const campaigns: Campaign[] = [
    {
      id: "c1",
      name: "Summer Sweat Challenge",
      status: "Active",
      brief: "Promoting Glow Fitness Midtown's summer memberships by highlighting high-intensity interval workouts, creator visits, and refreshing post-workout routines. Goal is local brand familiarity and lead generation.",
      creatorTypes: ["Athlete", "Influencer", "Videographer"],
      assignedCreators: [
        { name: "Jordan Carter", initials: "JC", role: "NIL Athlete" },
        { name: "Sophia Martinez", initials: "SM", role: "Influencer" },
        { name: "Zach Miller", initials: "ZM", role: "Videographer" }
      ],
      deliverablesProgress: { completed: 4, total: 6 },
      timeline: { start: "Jun 1, 2026", end: "Jul 15, 2026" },
      performance: { reach: "45.2K", engagement: "9.2%", impressions: "72.4K" },
      deliverables: [
        { creatorName: "Jordan Carter", creatorType: "Athlete", deliverableType: "Instagram Reel", status: "Completed", date: "Jun 8, 2026" },
        { creatorName: "Jordan Carter", creatorType: "Athlete", deliverableType: "Instagram Reel", status: "Pending Approval", date: "Jun 29, 2026" },
        { creatorName: "Sophia Martinez", creatorType: "Influencer", deliverableType: "Instagram Carousel", status: "Completed", date: "Jun 3, 2026" },
        { creatorName: "Sophia Martinez", creatorType: "Influencer", deliverableType: "Instagram Stories (Set of 3)", status: "Completed", date: "Jun 15, 2026" },
        { creatorName: "Zach Miller", creatorType: "Videographer", deliverableType: "TikTok Promo Video", status: "Completed", date: "Jun 22, 2026" },
        { creatorName: "Zach Miller", creatorType: "Videographer", deliverableType: "Summer sweat compilation", status: "In Production", date: "Jul 5, 2026" }
      ]
    },
    {
      id: "c2",
      name: "Midtown Studio Grand Opening",
      status: "Completed",
      brief: "Celebrating the launch of the new Midtown boutique studio location. Deployed local lifestyle influencers and professional photographers to showcase the physical space, amenities, and grand opening launch party.",
      creatorTypes: ["Influencer", "Photographer"],
      assignedCreators: [
        { name: "Emma Watson", initials: "EW", role: "Influencer" },
        { name: "Liam Davis", initials: "LD", role: "Photographer" }
      ],
      deliverablesProgress: { completed: 8, total: 8 },
      timeline: { start: "May 1, 2026", end: "May 28, 2026" },
      performance: { reach: "68.5K", engagement: "8.7%", impressions: "112.9K" },
      deliverables: [
        { creatorName: "Emma Watson", creatorType: "Influencer", deliverableType: "Grand Opening Reel", status: "Completed", date: "May 15, 2026" },
        { creatorName: "Emma Watson", creatorType: "Influencer", deliverableType: "Post-workout routine Carousel", status: "Completed", date: "May 20, 2026" },
        { creatorName: "Emma Watson", creatorType: "Influencer", deliverableType: "Studio Tour Video", status: "Completed", date: "May 22, 2026" },
        { creatorName: "Liam Davis", creatorType: "Photographer", deliverableType: "Grand Opening event photos (25 assets)", status: "Completed", date: "May 15, 2026" },
        { creatorName: "Liam Davis", creatorType: "Photographer", deliverableType: "Studio interior photography (15 assets)", status: "Completed", date: "May 10, 2026" },
        { creatorName: "Liam Davis", creatorType: "Photographer", deliverableType: "Trainer profile portraits (10 assets)", status: "Completed", date: "May 12, 2026" },
        { creatorName: "Emma Watson", creatorType: "Influencer", deliverableType: "Stories Q&A on membership promo", status: "Completed", date: "May 25, 2026" },
        { creatorName: "Liam Davis", creatorType: "Photographer", deliverableType: "Action workout shots", status: "Completed", date: "May 28, 2026" }
      ]
    },
    {
      id: "c3",
      name: "Athlete Fall Kickoff Campaign",
      status: "Pending",
      brief: "Connecting local college student-athletes to Glow Fitness for the upcoming fall semester. Focus on students returning to campus, student discount memberships, and athlete training routines at our facilities.",
      creatorTypes: ["Athlete", "Videographer"],
      assignedCreators: [
        { name: "Marcus Harris", initials: "MH", role: "NIL Athlete" },
        { name: "Chloe Bennett", initials: "CB", role: "Videographer" }
      ],
      deliverablesProgress: { completed: 0, total: 4 },
      timeline: { start: "Aug 15, 2026", end: "Sep 30, 2026" },
      performance: { reach: "0", engagement: "0%", impressions: "0" },
      deliverables: [
        { creatorName: "Marcus Harris", creatorType: "Athlete", deliverableType: "Instagram Reel: Workout prep", status: "Not Started", date: "Aug 20, 2026" },
        { creatorName: "Marcus Harris", creatorType: "Athlete", deliverableType: "Instagram Reel: Back-to-class routine", status: "Not Started", date: "Sep 5, 2026" },
        { creatorName: "Chloe Bennett", creatorType: "Videographer", deliverableType: "Promo video: Gym facilities tour", status: "Not Started", date: "Aug 15, 2026" },
        { creatorName: "Chloe Bennett", creatorType: "Videographer", deliverableType: "Instagram Reel compilation", status: "Not Started", date: "Sep 20, 2026" }
      ]
    },
    {
      id: "c4",
      name: "Winter Chill Recovery Program",
      status: "Paused",
      brief: "Focusing on physical recovery, mindfulness, cold plunges, and recovery routines during the colder months. Designed to retain members post-New Years resolutions peak.",
      creatorTypes: ["Influencer", "Photographer"],
      assignedCreators: [
        { name: "Sophia Martinez", initials: "SM", role: "Influencer" },
        { name: "Liam Davis", initials: "LD", role: "Photographer" }
      ],
      deliverablesProgress: { completed: 1, total: 4 },
      timeline: { start: "Jan 5, 2026", end: "Feb 15, 2026" },
      performance: { reach: "11.1K", engagement: "6.5%", impressions: "18.3K" },
      deliverables: [
        { creatorName: "Sophia Martinez", creatorType: "Influencer", deliverableType: "Recovery routine Vlog", status: "Completed", date: "Jan 10, 2026" },
        { creatorName: "Sophia Martinez", creatorType: "Influencer", deliverableType: "Cold plunge challenge Stories", status: "In Production", date: "Jan 25, 2026" },
        { creatorName: "Liam Davis", creatorType: "Photographer", deliverableType: "Yoga class photoshoot (15 assets)", status: "Not Started", date: "Jan 30, 2026" },
        { creatorName: "Liam Davis", creatorType: "Photographer", deliverableType: "Sauna session photography (10 assets)", status: "Not Started", date: "Feb 5, 2026" }
      ]
    }
  ];

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "Active":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-semibold rounded-full"><CheckCircle2 size={12} /> Active</span>;
      case "Completed":
<<<<<<< HEAD
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[#8A7F6E] text-xs font-semibold rounded-full"><Award size={12} /> Completed</span>;
=======
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[#94A3B8] text-xs font-semibold rounded-full"><Award size={12} /> Completed</span>;
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
      case "Pending":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full"><Clock size={12} /> Pending</span>;
      case "Paused":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-full"><PauseCircle size={12} /> Paused</span>;
    }
  };

  const getCreatorTypeIcon = (type: "Athlete" | "Influencer" | "Photographer" | "Videographer") => {
    switch (type) {
      case "Athlete":
        return <span title="NIL Athlete"><Users size={12} /></span>;
      case "Influencer":
        return <span title="Influencer"><Sparkles size={12} /></span>;
      case "Photographer":
        return <span title="Photographer"><Camera size={12} /></span>;
      case "Videographer":
        return <span title="Videographer"><Video size={12} /></span>;
    }
  };

  const openCampaignDetail = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-[family-name:var(--font-syne)]">Marketing Campaigns</h1>
<<<<<<< HEAD
          <p className="text-sm text-[#8A7F6E] mt-1">Manage, approve, and track creator activations for your business.</p>
=======
          <p className="text-sm text-[#94A3B8] mt-1">Manage, approve, and track creator activations for your business.</p>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
        </div>

        {/* Quick action for support */}
        <button 
          onClick={() => window.location.href = "/dashboard/messages"} 
          className="flex items-center justify-center gap-2 bg-brand-purple text-white px-4 py-2.5 rounded-xl font-medium btn-glow text-sm"
        >
          <Plus size={16} /> Request New Campaign
        </button>
      </div>

      {/* Campaigns List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((c) => {
          const progressPercent = Math.round((c.deliverablesProgress.completed / c.deliverablesProgress.total) * 100) || 0;
          return (
            <div 
              key={c.id}
              onClick={() => openCampaignDetail(c)}
<<<<<<< HEAD
              className="bg-[#FFFFFF] border border-white/5 hover:border-brand-purple/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between cursor-pointer group transition-all hover:-translate-y-0.5 hover:shadow-brand-purple/5 relative"
=======
              className="bg-[#1A1A27] border border-white/5 hover:border-brand-purple/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between cursor-pointer group transition-all hover:-translate-y-0.5 hover:shadow-brand-purple/5 relative"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            >
              {/* Top Row */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  {getStatusBadge(c.status)}
<<<<<<< HEAD
                  <div className="flex items-center gap-1.5 text-xs text-[#6B5F4F]">
=======
                  <div className="flex items-center gap-1.5 text-xs text-[#475569]">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <Calendar size={12} />
                    <span>{c.timeline.start} - {c.timeline.end}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-purple-light transition-colors font-[family-name:var(--font-syne)]">
                    {c.name}
                  </h3>
<<<<<<< HEAD
                  <p className="text-xs text-[#8A7F6E] line-clamp-2 leading-relaxed">
=======
                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    {c.brief}
                  </p>
                </div>
              </div>

              {/* Middle Section: Progress and Creators */}
              <div className="my-6 space-y-4">
                {/* Deliverables Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
<<<<<<< HEAD
                    <span className="text-[#8A7F6E]">Deliverables Progress</span>
                    <span className="text-white">{c.deliverablesProgress.completed}/{c.deliverablesProgress.total}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F3EBE0] rounded-full overflow-hidden">
=======
                    <span className="text-[#94A3B8]">Deliverables Progress</span>
                    <span className="text-white">{c.deliverablesProgress.completed}/{c.deliverablesProgress.total}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0D0D14] rounded-full overflow-hidden">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${c.status === 'Completed' ? 'bg-brand-lime' : 'bg-brand-purple'}`} 
                      style={{ width: `${progressPercent}%` }} 
                    />
                  </div>
                </div>

                {/* Assigned Creators with avatar group */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center">
<<<<<<< HEAD
                    <span className="text-xs text-[#6B5F4F] font-bold mr-2 uppercase tracking-wider">Creators</span>
=======
                    <span className="text-xs text-[#475569] font-bold mr-2 uppercase tracking-wider">Creators</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <div className="flex -space-x-2">
                      {c.assignedCreators.map((cr, idx) => (
                        <div 
                          key={idx} 
                          title={`${cr.name} (${cr.role})`}
<<<<<<< HEAD
                          className="w-7 h-7 rounded-full bg-brand-purple/90 border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-black/30"
=======
                          className="w-7 h-7 rounded-full bg-brand-purple/90 border-2 border-[#1A1A27] flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-black/30"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                        >
                          {cr.initials}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Creator Types Involved */}
                  <div className="flex items-center gap-1.5">
                    {c.creatorTypes.map((type, idx) => (
                      <span 
                        key={idx}
<<<<<<< HEAD
                        className="p-1 bg-[#F3EBE0] border border-white/5 rounded text-[#8A7F6E] flex items-center justify-center hover:text-white transition-colors"
=======
                        className="p-1 bg-[#0D0D14] border border-white/5 rounded text-[#94A3B8] flex items-center justify-center hover:text-white transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      >
                        {getCreatorTypeIcon(type)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Performance Summary & Chevron */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                {c.status !== "Pending" ? (
                  <div className="flex gap-4">
                    <div>
<<<<<<< HEAD
                      <span className="text-[10px] text-[#6B5F4F] font-bold uppercase block tracking-wider">Est. Reach</span>
=======
                      <span className="text-[10px] text-[#475569] font-bold uppercase block tracking-wider">Est. Reach</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      <span className="text-sm font-bold text-white flex items-center gap-1">
                        <TrendingUp size={12} className="text-brand-lime" /> {c.performance.reach}
                      </span>
                    </div>
                    <div>
<<<<<<< HEAD
                      <span className="text-[10px] text-[#6B5F4F] font-bold uppercase block tracking-wider">Engagement</span>
=======
                      <span className="text-[10px] text-[#475569] font-bold uppercase block tracking-wider">Engagement</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      <span className="text-sm font-bold text-white">
                        {c.performance.engagement}
                      </span>
                    </div>
                  </div>
                ) : (
<<<<<<< HEAD
                  <span className="text-xs text-[#6B5F4F] font-medium italic">Pending kickoff approval</span>
=======
                  <span className="text-xs text-[#475569] font-medium italic">Pending kickoff approval</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                )}
                
                <span className="text-xs font-semibold text-brand-purple-light flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Detail <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Detail SlideDrawer */}
      <SlideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={selectedCampaign?.name || "Campaign Details"}
        width="max-w-xl"
      >
        {selectedCampaign && (
          <div className="space-y-8">
            
            {/* Quick Badges */}
<<<<<<< HEAD
            <div className="flex justify-between items-center bg-[#FFFFFF] border border-white/5 p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Campaign Status</span>
                <div className="mt-1">{getStatusBadge(selectedCampaign.status)}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Active Dates</span>
=======
            <div className="flex justify-between items-center bg-[#1A1A27] border border-white/5 p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-[#475569] font-bold uppercase tracking-wider block">Campaign Status</span>
                <div className="mt-1">{getStatusBadge(selectedCampaign.status)}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#475569] font-bold uppercase tracking-wider block">Active Dates</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <span className="text-sm font-semibold text-white block mt-1">{selectedCampaign.timeline.start} - {selectedCampaign.timeline.end}</span>
              </div>
            </div>

            {/* Campaign Brief */}
            <div className="space-y-2">
<<<<<<< HEAD
              <h3 className="text-xs font-bold text-[#6B5F4F] uppercase tracking-wider">Campaign Brief</h3>
              <p className="text-sm text-[#8A7F6E] leading-relaxed bg-[#F3EBE0]/80 p-4 border border-white/5 rounded-xl">
=======
              <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Campaign Brief</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed bg-[#0D0D14]/80 p-4 border border-white/5 rounded-xl">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                {selectedCampaign.brief}
              </p>
            </div>

            {/* Campaign Analytics */}
            {selectedCampaign.status !== "Pending" && (
              <div className="space-y-3">
<<<<<<< HEAD
                <h3 className="text-xs font-bold text-[#6B5F4F] uppercase tracking-wider">Campaign Analytics Summary</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#FFFFFF] border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-[#8A7F6E] block">Est. Reach</span>
                    <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{selectedCampaign.performance.reach}</span>
                  </div>
                  <div className="bg-[#FFFFFF] border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-[#8A7F6E] block">Impressions</span>
                    <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{selectedCampaign.performance.impressions}</span>
                  </div>
                  <div className="bg-[#FFFFFF] border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-[#8A7F6E] block">Engagement</span>
=======
                <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Campaign Analytics Summary</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#1A1A27] border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-[#94A3B8] block">Est. Reach</span>
                    <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{selectedCampaign.performance.reach}</span>
                  </div>
                  <div className="bg-[#1A1A27] border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-[#94A3B8] block">Impressions</span>
                    <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{selectedCampaign.performance.impressions}</span>
                  </div>
                  <div className="bg-[#1A1A27] border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-[#94A3B8] block">Engagement</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{selectedCampaign.performance.engagement}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Assigned Creators Detail */}
            <div className="space-y-3">
<<<<<<< HEAD
              <h3 className="text-xs font-bold text-[#6B5F4F] uppercase tracking-wider">Deployed Creators</h3>
              <div className="space-y-2">
                {selectedCampaign.assignedCreators.map((cr, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#FFFFFF] border border-white/5 p-3 rounded-xl">
=======
              <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Deployed Creators</h3>
              <div className="space-y-2">
                {selectedCampaign.assignedCreators.map((cr, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#1A1A27] border border-white/5 p-3 rounded-xl">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-xs font-bold text-white">
                        {cr.initials}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white block">{cr.name}</span>
<<<<<<< HEAD
                        <span className="text-xs text-[#8A7F6E] block">{cr.role}</span>
=======
                        <span className="text-xs text-[#94A3B8] block">{cr.role}</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      </div>
                    </div>
                    
                    {/* Visual filter categories indicator */}
<<<<<<< HEAD
                    <span className="text-[10px] px-2 py-0.5 bg-[#F3EBE0] border border-white/5 rounded text-[#8A7F6E] font-medium">
=======
                    <span className="text-[10px] px-2 py-0.5 bg-[#0D0D14] border border-white/5 rounded text-[#94A3B8] font-medium">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      Active Creator
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables List / Schedule */}
            <div className="space-y-3">
<<<<<<< HEAD
              <h3 className="text-xs font-bold text-[#6B5F4F] uppercase tracking-wider">Content Deliverables & Schedule</h3>
=======
              <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Content Deliverables & Schedule</h3>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              <div className="space-y-3">
                {selectedCampaign.deliverables.map((del, idx) => {
                  const getStatusStyle = (status: CreatorDeliverable["status"]) => {
                    switch (status) {
                      case "Completed":
                        return "bg-brand-lime/10 text-brand-lime border-brand-lime/20";
                      case "Pending Approval":
                        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
                      case "In Production":
                        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
                      case "Not Started":
<<<<<<< HEAD
                        return "bg-white/5 text-[#6B5F4F] border-white/10";
=======
                        return "bg-white/5 text-[#475569] border-white/10";
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    }
                  };

                  return (
                    <div key={idx} className="border-b border-white/5 pb-3 last:border-b-0 flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{del.deliverableType}</span>
<<<<<<< HEAD
                          <span className="text-[10px] text-[#6B5F4F]">by {del.creatorName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#8A7F6E]">
=======
                          <span className="text-[10px] text-[#475569]">by {del.creatorName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                          <Calendar size={10} />
                          <span>Post Target Date: {del.date}</span>
                        </div>
                      </div>

                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${getStatusStyle(del.status)}`}>
                        {del.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick approval action if any deliverables are pending */}
            {selectedCampaign.deliverables.some(d => d.status === "Pending Approval") && (
<<<<<<< HEAD
              <div className="bg-[#B75C3A]/10 border border-[#B75C3A]/20 p-4 rounded-2xl flex flex-col gap-3">
=======
              <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 p-4 rounded-2xl flex flex-col gap-3">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <div className="flex items-start gap-2 text-sm text-[#EDEDED]">
                  <AlertCircle size={16} className="text-brand-purple-light shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-purple-light">Creative Assets Awaiting Review</span>
<<<<<<< HEAD
                    <span className="text-xs text-[#8A7F6E] block mt-0.5">
=======
                    <span className="text-xs text-[#94A3B8] block mt-0.5">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      You have 1 deliverable awaiting review in this campaign. Go to messages to review drafts and give feedback.
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    window.location.href = "/dashboard/messages";
                  }} 
                  className="bg-brand-purple text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-brand-purple-light transition-all flex items-center justify-center gap-1.5 self-end"
                >
                  Open Messaging Center <ArrowRight size={12} />
                </button>
              </div>
            )}

            {/* Drawer close button */}
            <div className="pt-4 flex gap-3">
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all"
              >
                Close Details
              </button>
            </div>
            
          </div>
        )}
      </SlideDrawer>

    </div>
  );
}
