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

      {/* Floating glowing orbs — GPU accelerated */}
      {/* Large deep purple orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "rgba(124, 58, 237, 0.20)",
          filter: "blur(200px)",
          top: "10%",
          left: "15%",
          willChange: "transform",
        }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 40, -30, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Medium electric blue orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 450,
          height: 450,
          background: "rgba(59, 130, 246, 0.15)",
          filter: "blur(160px)",
          bottom: "15%",
          right: "10%",
          willChange: "transform",
        }}
        animate={{
          x: [0, -70, 50, -30, 0],
          y: [0, 50, -70, 40, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Small intense purple orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: "rgba(124, 58, 237, 0.20)",
          filter: "blur(120px)",
          top: "50%",
          right: "25%",
          willChange: "transform",
        }}
        animate={{
          x: [0, -50, 30, -60, 0],
          y: [0, 30, -50, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Tiny electric blue accent */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: "rgba(59, 130, 246, 0.15)",
          filter: "blur(100px)",
          top: "20%",
          right: "40%",
          willChange: "transform",
        }}
        animate={{
          x: [0, 40, -60, 20, 0],
          y: [0, -40, 30, -20, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Extra large subtle purple wash — bottom left */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "rgba(124, 58, 237, 0.12)",
          filter: "blur(250px)",
          bottom: "5%",
          left: "-5%",
          willChange: "transform",
        }}
        animate={{
          x: [0, 60, -20, 40, 0],
          y: [0, -30, 50, -40, 0],
          scale: [1, 1.05, 0.9, 1.08, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Mid-size blue orb — top right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 350,
          height: 350,
          background: "rgba(59, 130, 246, 0.12)",
          filter: "blur(180px)",
          top: "-5%",
          right: "5%",
          willChange: "transform",
        }}
        animate={{
          x: [0, -30, 50, -40, 0],
          y: [0, 40, -20, 60, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Central purple glow — behind content */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "rgba(124, 58, 237, 0.08)",
          filter: "blur(150px)",
          top: "30%",
          left: "35%",
          willChange: "transform",
        }}
        animate={{
          scale: [1, 1.15, 0.95, 1.1, 1],
          opacity: [0.8, 1, 0.7, 0.9, 0.8],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

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
