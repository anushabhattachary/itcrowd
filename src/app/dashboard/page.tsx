"use client";

import { useEffect, useState } from "react";
import { Building2, Users, Target, Activity, TrendingUp, Sparkles, Filter } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function DashboardOverviewPage() {
  const [metrics, setMetrics] = useState<any>({
    activeCompanies: 0,
    networkInfluencers: 0,
    activeCampaigns: 0,
    dealsClosed: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/dashboard/metrics");
        const data = await res.json();
        
        if (data.metrics) {
          setMetrics(data.metrics);
        }

        // Build generic fake timeline from raw recent records
        if (data.recentActivity) {
          const comps = (data.recentActivity.companies || []).map((c: any) => ({
            id: `c-${c.id}`,
            action: `New company added: ${c.company_name}`,
            date: new Date(c.created_at),
            type: "company",
            color: "bg-brand-lime", // Green for new company
          }));
          const infls = (data.recentActivity.influencers || []).map((i: any) => ({
            id: `i-${i.id}`,
            action: `New influencer joined: ${i.handle}`,
            date: new Date(i.created_at),
            type: "influencer",
            color: "bg-brand-purple",
          }));
          
          let merged = [...comps, ...infls].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8);
          if (merged.length === 0) {
             // Fallback default system action
             merged = [{ id: "system", action: "Dashboard initialized.", date: new Date(), type: "system", color: "bg-gray-500" }];
          }
          setActivities(merged);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Placeholder chart data since we don't have historical tracking built-in natively without complex analytics
  const chartData = [
    { name: "Week 1", campaigns: 2 },
    { name: "Week 2", campaigns: 5 },
    { name: "Week 3", campaigns: 4 },
    { name: "Week 4", campaigns: metrics.activeCampaigns || 1 }, // Map latest to current known data roughly
  ];

  const StatCard = ({ title, value, icon: Icon, changeInfo, changeColor = "text-brand-lime" }: { title: string, value: string|number, icon: any, changeInfo: string, changeColor?: string }) => (
    <div className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-[#94A3B8] font-medium">{title}</h3>
        <span className="p-2 bg-white/5 rounded-lg text-brand-purple/80 group-hover:bg-brand-purple/20 group-hover:text-brand-purple transition-colors">
          <Icon size={20} />
        </span>
      </div>
      <div className="space-y-1 relative z-10">
        {isLoading ? (
          <div className="h-10 w-24 bg-white/5 animate-pulse rounded-md" />
        ) : (
          <p className="text-4xl font-bold text-white font-[family-name:var(--font-syne)]">{value}</p>
        )}
        <p className={`text-xs font-medium ${changeColor} flex items-center gap-1`}>
          <TrendingUp size={12} /> {changeInfo}
        </p>
      </div>
      {/* Subtle background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-purple/5 blur-3xl rounded-full" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Companies" value={metrics.activeCompanies} icon={Building2} changeInfo="Looking for matches" />
        <StatCard title="Influencers" value={metrics.networkInfluencers} icon={Users} changeInfo="Total network size" />
        <StatCard title="Active Campaigns" value={metrics.activeCampaigns} icon={Activity} changeInfo="Currently live" />
        <StatCard title="Deals Closed" value={metrics.dealsClosed} icon={Sparkles} changeInfo="All time completed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-7 bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <div className="px-3 py-1 bg-[#0D0D14] border border-white/10 rounded-full text-xs text-[#94A3B8]">Last 30 Days</div>
          </div>
          
          <div className="flex-1">
            {isLoading ? (
               <div className="space-y-4">
                 {[1,2,3,4].map(i => <div key={i} className="h-12 w-full bg-white/5 animate-pulse rounded-lg" />)}
               </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
                {activities.map((act, i) => (
                  <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-[#1A1A27] bg-[#0D0D14] z-10 shrink-0">
                      <div className={`w-2 h-2 rounded-full ${act.color}`}></div>
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] px-4 py-3 bg-[#0D0D14] border border-white/5 rounded-xl ml-4 md:ml-0 md:group-odd:mr-4 md:group-even:ml-4 shadow-sm hover:border-white/10 transition-colors">
                      <p className="text-sm font-medium text-white/90">{act.action}</p>
                      <p className="text-xs text-[#475569] mt-1">{formatDistanceToNow(act.date, { addSuffix: true })}</p>
                    </div>
                  </div>
                ))}
            </div>
            )}
          </div>
        </div>

        {/* Quick Stats Chart */}
        <div className="lg:col-span-5 bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Campaigns This Month</h2>
            <Target size={18} className="text-[#94A3B8]" />
          </div>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <RechartsTooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1A1A27', borderColor: '#ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="campaigns" fill="#7C3AED" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pipeline Snapshot */}
      <div className="bg-[#1A1A27] border border-white/5 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Filter size={18} className="text-brand-purple" />
          General Pipeline Snapshot
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Prospecting", count: "...", color: "border-gray-500/30", dot: "bg-gray-500" },
            { label: "Contacted", count: "...", color: "border-blue-500/30", dot: "bg-blue-500" },
            { label: "Shortlisting", count: "...", color: "border-yellow-500/30", dot: "bg-yellow-500" },
            { label: "Campaign Live", count: metrics.activeCampaigns || 0, color: "border-brand-lime/30", dot: "bg-brand-lime" },
            { label: "Complete", count: metrics.dealsClosed || 0, color: "border-brand-purple/30", dot: "bg-brand-purple" }
          ].map((stage, i) => (
            <Link href="/dashboard/companies" key={i} className={`p-4 bg-[#0D0D14] border ${stage.color} rounded-xl hover:bg-white/5 transition-colors group cursor-pointer block relative`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${stage.dot}`}></div>
                <span className="text-sm font-medium text-[#94A3B8]">{stage.label}</span>
              </div>
              <p className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white group-hover:text-brand-purple transition-colors">
                {isLoading ? "-" : stage.count}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
