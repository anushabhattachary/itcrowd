"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const rows = [
  {
    feature: "Upfront Cost",
    itcrowd: "Low / Flexible",
    agency: "$10K–$50K+",
    diy: "Time = Money",
  },
  {
    feature: "Time to Launch",
    itcrowd: "Days",
    agency: "Weeks to Months",
    diy: "Weeks",
  },
  {
    feature: "Influencer Vetting",
    itcrowd: "Human + Niche-Matched",
    agency: "Generic Roster",
    diy: "You Figure It Out",
  },
  {
    feature: "Equity Deals",
    itcrowd: true,
    agency: false,
    diy: false,
  },
  {
    feature: "Startup Focused",
    itcrowd: true,
    agency: "Rarely",
    diy: null,
  },
  {
    feature: "Campaign Management",
    itcrowd: true,
    agency: "Yes ($$$$)",
    diy: false,
  },
];

function CellValue({ value }: { value: string | boolean | null }) {
  if (value === true) return <Check className="mx-auto text-brand-lime" size={20} />;
  if (value === false) return <X className="mx-auto text-red-400/60" size={20} />;
  if (value === null) return <Minus className="mx-auto text-muted/40" size={16} />;
  return <span>{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
            The Comparison
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
            Why Founders Choose ItCrowd
            <br className="hidden sm:block" /> Over The Alternatives
          </h2>
        </motion.div>

        {/* Mobile View: Cards */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6">
          {/* ItCrowd Card */}
          <div className="flex-none w-[85vw] snap-center bg-brand-purple/5 border border-brand-purple/20 rounded-2xl p-6 relative">
            <h3 className="text-xl font-bold text-brand-purple-light mb-6">ItCrowd ✅</h3>
            <ul className="space-y-4">
              {rows.map((row, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                  <span className="text-sm text-muted">{row.feature}</span>
                  <span className="text-sm font-medium text-brand-lime flex items-center gap-2">
                    <CellValue value={row.itcrowd} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency Card */}
          <div className="flex-none w-[85vw] snap-center bg-surface border border-white/10 rounded-2xl p-6 relative">
            <h3 className="text-xl font-bold text-muted mb-6">Traditional Agency ❌</h3>
            <ul className="space-y-4">
              {rows.map((row, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                  <span className="text-sm text-muted">{row.feature}</span>
                  <span className="text-sm font-medium text-muted flex items-center gap-2">
                    <CellValue value={row.agency} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* DIY Card */}
          <div className="flex-none w-[85vw] snap-center bg-surface border border-white/10 rounded-2xl p-6 relative">
            <h3 className="text-xl font-bold text-muted mb-6">DIY ❌</h3>
            <ul className="space-y-4">
              {rows.map((row, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                  <span className="text-sm text-muted">{row.feature}</span>
                  <span className="text-sm font-medium text-muted flex items-center gap-2">
                    <CellValue value={row.diy} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop View: Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-muted text-sm font-medium w-1/4">
                  Feature
                </th>
                <th className="py-4 px-4 text-sm font-bold text-center bg-brand-purple/10 rounded-t-xl border-x border-t border-brand-purple/20">
                  <span className="text-brand-purple-light">ItCrowd ✅</span>
                </th>
                <th className="py-4 px-4 text-muted text-sm font-medium text-center">
                  Traditional Agency ❌
                </th>
                <th className="py-4 px-4 text-muted text-sm font-medium text-center">
                  DIY ❌
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-sm text-center bg-brand-purple/5 border-x border-brand-purple/10 text-brand-lime font-medium">
                    <CellValue value={row.itcrowd} />
                  </td>
                  <td className="py-4 px-4 text-sm text-center text-muted">
                    <CellValue value={row.agency} />
                  </td>
                  <td className="py-4 px-4 text-sm text-center text-muted">
                    <CellValue value={row.diy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
