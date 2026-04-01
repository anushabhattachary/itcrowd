"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SplitPanel() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 rounded-3xl overflow-hidden"
        >
          {/* Left — Startups */}
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-brand-purple-dark/40 to-brand-purple/20 border border-brand-purple/15">
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-purple-light font-semibold">
                I&apos;M A STARTUP
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
                Get the exposure you need without burning your runway.
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                We work within your budget. Most campaigns run $500–$2,000/month
                total — a fraction of agency costs.
              </p>
              <a
                href="#contact"
                className="flex justify-center items-center gap-2 mt-6 px-6 py-3 rounded-full bg-brand-purple text-white font-semibold btn-glow group w-full md:w-auto md:inline-flex"
              >
                Find My Influencers
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Right — Influencers */}
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-surface-light to-surface border border-white/5">
            {/* Lime accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/5 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-lime font-semibold">
                I&apos;M AN INFLUENCER
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
                Turn your audience into an asset — and your deals into equity.
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                Join our network. Get matched. Get paid in cash, equity, or
                both. We handle the contracts.
              </p>
              <a
                href="#contact"
                className="flex justify-center items-center gap-2 mt-6 px-6 py-3 rounded-full border border-brand-lime/30 text-brand-lime font-semibold hover:bg-brand-lime/10 transition-all group w-full md:w-auto md:inline-flex"
              >
                Join the Network
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
