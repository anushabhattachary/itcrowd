"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AnimatedWords from "@/components/AnimatedWords";
import A from "@/lib/assets";

export default function Hero() {
  return (
    <section className="dark-surface relative min-h-screen w-full text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden">
      {/* Backdrop: real campaign footage goes here once it exists (A.heroVideo) */}
      {A.heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={A.heroBackdrop}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={A.heroVideo}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={A.heroBackdrop}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      <div className="absolute inset-0 bg-black/20 z-0" />

      <Navbar theme="dark" entrance="hero" />

      {/* Center headline */}
      <div className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-6 md:gap-8 text-center my-auto z-10 px-4">
        <h1 className="text-white text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.02] font-heading">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="block"
          >
            Meet ItCrowd.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block"
          >
            Where businesses meet
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="block"
          >
            <span className="font-accent italic">their match.</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2 md:mt-0"
        >
          <Link
            href="/join-as-business"
            className="h-12 md:h-14 px-6 md:px-8 py-3 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors shadow-lg font-sans"
          >
            Find your creators
          </Link>
          <Link
            href="/apply"
            className="h-12 md:h-14 px-6 md:px-8 py-3 rounded-2xl border border-white/40 inline-flex justify-center items-center text-white text-lg md:text-xl font-medium hover:bg-white/10 transition-colors font-sans"
          >
            I&apos;m a creator
          </Link>
        </motion.div>
      </div>

      {/* Hero footer */}
      <footer className="w-full max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
        <p className="w-full md:w-[480px] max-w-prose text-white/80 text-xl leading-[1.25] text-left font-sans">
          <AnimatedWords
            baseDelay={1.2}
            text="ItCrowd matches growing businesses with vetted influencers, athletes, and photographers, then runs the whole campaign for you. Live in days, not months."
          />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-row flex-wrap lg:flex-col items-center lg:items-end gap-2.5 w-full md:w-auto justify-end"
        >
          <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap inline-flex items-center justify-center font-sans">
            Cash paid per post
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[56px] h-[56px] rounded-2xl border border-white/40 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={A.logo} alt="" aria-hidden="true" className="w-7 h-7" />
            </div>
            <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap inline-flex items-center justify-center font-sans">
              Human-curated matches
            </div>
          </div>
        </motion.div>
      </footer>
    </section>
  );
}
