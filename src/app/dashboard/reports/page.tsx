"use client";

import { useState } from "react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Award, 
  Users, 
  DollarSign, 
  Sparkles, 
  Download, 
  Calendar,
  Layers
} from "lucide-react";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("30days");
  const [activeCreatorSegment, setActiveCreatorSegment] = useState<string>("athlete");

  // Mock reach/engagement chart data
  const reachData = [
    { date: "Jun 1", reach: 12000, engagement: 8.1 },
    { date: "Jun 2", reach: 15400, engagement: 8.4 },
    { date: "Jun 3", reach: 21000, engagement: 9.0 },
    { date: "Jun 4", reach: 18500, engagement: 8.7 },
    { date: "Jun 5", reach: 25400, engagement: 9.2 },
    { date: "Jun 6", reach: 32000, engagement: 9.5 },
    { date: "Jun 7", reach: 28000, engagement: 9.1 },
    { date: "Jun 8", reach: 35200, engagement: 9.6 }
  ];

  // Creator types breakdown
  const segments = {
    athlete: {
      title: "NIL Athletes Performance",
      count: 4,
      totalReach: "78.2K",
      avgEngagement: "9.4%",
      topAsset: "Jordan Carter - Reel",
      metricName: "Likes/Shares",
      metricVal: "8.4K",
      notes: "NIL athletes drive the highest engagement rates among local student demographics."
    },
    influencer: {
      title: "Lifestyle Influencers Performance",
      count: 6,
      totalReach: "46.6K",
      avgEngagement: "8.1%",
      topAsset: "Sophia Martinez - Carousel",
      metricName: "Post Saves",
      metricVal: "1.2K",
      notes: "Influencers excel at aesthetic tours and membership recommendation coupon codes."
    },
    photographer: {
      title: "Professional Photography Metrics",
      count: 2,
      totalReach: "N/A",
      avgEngagement: "100% On-time",
      topAsset: "Liam Davis - Studio Interior Shoot",
      metricName: "Assets Delivered",
      metricVal: "50 photos",
      notes: "Photographers deliver high-res brand kit assets used for website and social profiles."
    },
    videographer: {
      title: "Professional Video Production",
      count: 1,
      totalReach: "N/A",
      avgEngagement: "98% Score",
      topAsset: "Zach Miller - Summer Challenge Reel",
      metricName: "Videos Delivered",
      metricVal: "6 video drafts",
      notes: "Videographers produce highly dynamic video compilation files for local ad campaigns."
    }
  };

  const currentSegment = segments[activeCreatorSegment as keyof typeof segments] || segments.athlete;

  const handleExportReport = () => {
    const toastId = toast.loading("Generating PDF Report...");
    setTimeout(() => {
      toast.success("Performance Report PDF downloaded successfully!", { id: toastId });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Page Title & Exports */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-[family-name:var(--font-syne)]">Performance Reports</h1>
          <p className="text-sm text-[#8A7F6E] mt-1">Simple, actionable results compiled from your creator marketing activations.</p>
        </div>

        <button 
          onClick={handleExportReport}
          className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-white/10 hover:border-brand-purple/50 text-white px-4 py-2.5 rounded-xl font-medium transition-all hover:bg-brand-purple/5 text-sm"
        >
          <Download size={16} /> Download Summary PDF
        </button>
      </div>

      {/* Filter panel */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[#FFFFFF] border border-white/5 p-4 rounded-2xl shadow-xl">
        <div className="flex-1 flex items-center gap-2 bg-[#F3EBE0] border border-white/10 rounded-xl px-3 py-2">
          <Layers size={14} className="text-[#6B5F4F]" />
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="flex-1 bg-transparent border-0 text-xs text-white focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option value="All" className="bg-[#F3EBE0] text-white">All Campaigns</option>
            <option value="summer" className="bg-[#F3EBE0] text-white">Summer Sweat Challenge</option>
            <option value="opening" className="bg-[#F3EBE0] text-white">Midtown Studio Grand Opening</option>
          </select>
        </div>

        <div className="w-full sm:w-[200px] flex items-center gap-2 bg-[#F3EBE0] border border-white/10 rounded-xl px-3 py-2">
          <Calendar size={14} className="text-[#6B5F4F]" />
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="flex-1 bg-transparent border-0 text-xs text-white focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option value="30days" className="bg-[#F3EBE0] text-white">Last 30 Days</option>
            <option value="ytd" className="bg-[#F3EBE0] text-white">Year-To-Date</option>
            <option value="may" className="bg-[#F3EBE0] text-white">May 2026</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Campaign ROI Spend", value: "$4,500", detail: "Paid budget", icon: DollarSign, color: "text-brand-purple-light" },
          { label: "Est. ROI Return", value: "3.8x", detail: "Campaign multiple", icon: TrendingUp, color: "text-brand-lime" },
          { label: "Est. Total Reach", value: "124.8K", detail: "+15.4K this month", icon: Users, color: "text-blue-400" },
          { label: "Avg. Engagement Rate", value: "8.4%", detail: "Industry avg: 4.2%", icon: Sparkles, color: "text-brand-purple-light" },
          { label: "Deliverables Done", value: "12 / 14", detail: "86% completion rate", icon: Award, color: "text-brand-lime" }
        ].map((kpi, i) => (
          <div key={i} className="bg-[#FFFFFF] border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-semibold text-[#8A7F6E] uppercase tracking-wider">{kpi.label}</span>
              <span className={`p-1.5 bg-white/5 rounded-lg ${kpi.color}`}>
                <kpi.icon size={14} />
              </span>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-syne)]">{kpi.value}</span>
              <span className="text-[10px] block text-[#6B5F4F] font-medium mt-0.5">{kpi.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Analytics Visualization */}
      <div className="bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Estimated Reach & Engagement Trends</h2>
            <p className="text-xs text-[#8A7F6E] mt-0.5">Estimated performance metrics tracked over the selected timeframe</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-2.5 py-1 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light font-bold rounded-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-purple rounded-full"></span> Reach
            </span>
            <span className="text-[10px] px-2.5 py-1 bg-brand-lime/10 border border-brand-lime/20 text-brand-lime font-bold rounded-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-lime rounded-full"></span> Engagement (%)
            </span>
          </div>
        </div>

        {/* Recharts Area/Line Chart */}
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={reachData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B75C3A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#B75C3A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="date" stroke="#8A7F6E" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B5F4F" fontSize={11} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                cursor={{ fill: '#ffffff02' }}
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="reach" stroke="#B75C3A" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" name="Est. Reach" />
              {/* Secondary line for engagement */}
              <Line type="monotone" dataKey="engagement" stroke="#7C7B4D" strokeWidth={2} dot={true} name="Engagement %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Spotlights & Creator Segment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Top Performers */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Top Performing Creator */}
          <div className="bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-brand-purple-light font-bold uppercase tracking-wider block">MVP Spotlight</span>
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-syne)] mt-1">Top Performing Creator</h3>
              
              <div className="mt-4 flex items-center gap-4 bg-[#F3EBE0] border border-white/5 p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center text-sm font-extrabold text-white">
                  JC
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Jordan Carter</span>
                  <span className="text-xs text-[#8A7F6E] block">NIL Athlete · Football</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-[#8A7F6E]">Est. Reach Driven</span>
              <span className="font-bold text-brand-lime flex items-center gap-1">
                <TrendingUp size={12} /> 45.2K
              </span>
            </div>
          </div>

          {/* Top Performing Content Card */}
          <div className="bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between mt-6">
            <div>
              <span className="text-[10px] text-brand-lime font-bold uppercase tracking-wider block">High Impact Creative</span>
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-syne)] mt-1">Top Performing Content</h3>
              
              <div className="mt-4 flex gap-3 bg-[#F3EBE0] border border-white/5 p-3 rounded-2xl items-center">
                <div className="w-14 h-14 bg-black rounded-lg overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80" 
                    alt="HIIT Workout Reel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white block truncate">Jordan Carter - Summer sweat form</span>
                  <span className="text-[10px] text-brand-purple-light block mt-0.5">Instagram Reel Draft</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-[#8A7F6E]">Engagement Rate</span>
              <span className="font-bold text-white">12.0%</span>
            </div>
          </div>

        </div>

        {/* Right Column: Segment Breakdown tabs */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">Creator Type Breakdown</h2>
            <p className="text-xs text-[#8A7F6E] mt-0.5">Analyze results driven by different creator sectors</p>
            
            {/* Segment Selector Chips */}
            <div className="flex gap-2 mt-4 bg-[#F3EBE0] p-1.5 rounded-xl border border-white/5">
              {[
                { id: "athlete", label: "Athletes" },
                { id: "influencer", label: "Influencers" },
                { id: "photographer", label: "Photography" },
                { id: "videographer", label: "Video" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCreatorSegment(tab.id)}
                  className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition-all ${
                    activeCreatorSegment === tab.id
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "text-[#8A7F6E] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Segment Statistics display */}
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-bold text-white">{currentSegment.title}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F3EBE0] border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Total Deployed</span>
                  <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{currentSegment.count} creators</span>
                </div>
                <div className="bg-[#F3EBE0] border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Combined Reach</span>
                  <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{currentSegment.totalReach}</span>
                </div>
                <div className="bg-[#F3EBE0] border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Avg. Engagement</span>
                  <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{currentSegment.avgEngagement}</span>
                </div>
                <div className="bg-[#F3EBE0] border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">{currentSegment.metricName}</span>
                  <span className="text-lg font-bold text-white mt-1 block font-[family-name:var(--font-syne)]">{currentSegment.metricVal}</span>
                </div>
              </div>

              {/* Segment Notes */}
              <p className="text-xs text-[#8A7F6E] leading-relaxed italic bg-brand-purple/5 p-3 rounded-lg border border-brand-purple/10">
                💡 {currentSegment.notes}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-xs">
            <span className="text-[#6B5F4F]">All values updated as of today</span>
            <span className="font-bold text-white">Top Asset: {currentSegment.topAsset}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
