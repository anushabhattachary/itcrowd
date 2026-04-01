"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#12101F] to-[#0A0A0F] animate-gradient" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-900/15 rounded-full blur-[100px] animate-float-delay" />
      <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] bg-brand-purple/8 rounded-full blur-[80px] animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center pt-20">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-brand-purple-light px-5 py-2 rounded-full border border-brand-purple/30 bg-brand-purple/5 font-medium">
            The Future of Influencer Marketing
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold leading-[0.95] tracking-tight font-[family-name:var(--font-syne)]"
        >
          Startups Meet
          <br />
          Their <span className="gradient-text">Match.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          ItCrowd connects early-stage startups with influencers and athletes
          who don&apos;t just post — they invest. Cash deals or equity. You
          choose.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-brand-purple text-white text-lg font-semibold btn-glow"
          >
            Get Matched — It&apos;s Free
          </a>
          <a
            href="#for-influencers"
            className="px-8 py-4 rounded-full border border-white/20 text-white text-lg font-medium hover:border-white/40 transition-all"
          >
            I&apos;m an Influencer
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-sm text-muted"
        >
          Founded at Georgia Tech · Trusted by founders &amp; creators
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
}
