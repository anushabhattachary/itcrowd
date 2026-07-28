"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import A from "@/lib/assets";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ROTATE_MS = 9000;

type Slide = {
  headingPlain: string;
  headingAccent: string;
  quote: string;
  name: string;
  role: string;
  photo: string | null;
  photoAlt: string;
  /** Shown in the visual card when there is no photo. */
  monogram?: { title: string; subtitle: string };
};

const SLIDES: Slide[] = [
  {
    headingPlain: "What our",
    headingAccent: "clients say",
    quote:
      "We went to a traditional agency for marketing and it was going to cost us $20,000 for three months of UGC marketing. ItCrowd was able to accomplish the same level of exposure at a much better price.",
    name: "Sunny Park,",
    role: "CEO and Founder, D!ne",
    photo: null,
    photoAlt: "",
    monogram: { title: "D!ne", subtitle: "Client since 2026" },
  },
  {
    headingPlain: "Why we",
    headingAccent: "built ItCrowd",
    quote:
      "Over half of Gen Z and millennials buy what creators recommend, but most consumer-facing brands have no way in. Agencies want ten thousand a month. We built ItCrowd so a consumer-facing brand can run a real creator campaign for a few hundred.",
    name: "Chris Richardson,",
    role: "Founder and CEO, ItCrowd",
    photo: A.team.chris,
    photoAlt: "Chris Richardson, Founder and CEO of ItCrowd",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];
  const words = slide.quote.split(" ");

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.18 }}
          className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-[25px]"
        >
          {/* Left column */}
          <div className="flex flex-col lg:flex-row gap-[25px] items-stretch">
            {/* Block A */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-row lg:flex-col justify-between lg:h-full lg:min-h-[447px] gap-4 lg:gap-8 items-center lg:items-start"
            >
              <div className="flex flex-col gap-6 flex-1 lg:flex-none">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-3xl text-black leading-tight max-w-[260px]"
                  >
                    <span className="font-medium font-sans">{slide.headingPlain}</span>{" "}
                    <span className="font-accent italic">{slide.headingAccent}</span>
                  </motion.h3>
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show quote from ${s.name.replace(/,$/, "")}`}
                      aria-pressed={i === active}
                      className={
                        i === active
                          ? "w-8 h-2 bg-black rounded-full transition-all duration-300"
                          : "w-2 h-2 bg-stone-300 hover:bg-stone-400 rounded-full transition-all duration-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href="/for-businesses"
                  className="self-start inline-block bg-black text-white px-7 py-3 rounded-2xl text-xl font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap font-sans"
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>

            {/* Block B: who is speaking */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-3 w-full lg:w-[282px]"
            >
              <div className="relative w-full h-[280px] lg:h-[351px] rounded-2xl overflow-hidden bg-[#F1F0EF]">
                <AnimatePresence mode="wait">
                  {slide.photo ? (
                    <motion.div
                      key={`photo-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 flex items-center justify-center p-8"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.photo}
                        alt={slide.photoAlt}
                        className="w-full h-full max-w-[240px] max-h-[240px] object-contain"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`monogram-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 bg-[#141413] flex flex-col items-center justify-center gap-2"
                    >
                      <span className="font-accent italic text-white text-6xl">
                        {slide.monogram?.title}
                      </span>
                      <span className="text-white/50 text-sm uppercase tracking-[0.2em] font-sans">
                        {slide.monogram?.subtitle}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
                className="w-full h-24 rounded-2xl flex items-center justify-center gap-3"
                style={{ backgroundColor: "#F1F0EF" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={A.logoDark} alt="" aria-hidden="true" className="w-8 h-8" />
                <span className="text-3xl font-bold text-black font-brand">ItCrowd</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column: the quote */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[748px] flex-1 p-10 rounded-2xl flex flex-col justify-between gap-10"
            style={{ backgroundColor: "#7D756E1C" }}
          >
            <p key={active} className="text-3xl leading-10 text-black font-sans">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.025, ease: "easeOut" }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </p>
            <motion.div
              key={`attr-${active}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-1"
            >
              <span className="font-accent italic text-xl text-black">{slide.name}</span>
              <span className="text-xl text-black/50 font-sans">{slide.role}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
