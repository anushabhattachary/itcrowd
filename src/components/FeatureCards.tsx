"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import A from "@/lib/assets";

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 };

/* ------------------------------------------------------------------ */
/* Card 1 - creator-niche carousel                                     */
/* ------------------------------------------------------------------ */

const PILL_ROW_HEIGHT = 56;
const PILL_GAP = 18;
const ACTIVE_HEIGHT = 80;
const ACTIVE_GAP = 22;

const NICHES = [
  "NIL Athletes",
  "Local Influencers",
  "Photographers",
  "Videographers",
  "UGC Creators",
  "Micro-influencers",
  "Podcast Hosts",
];

function Pill({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <motion.div
      layout
      transition={SPRING}
      className={
        isActive
          ? "w-[calc(100%_-_60px)] mx-[30px] h-[80px] bg-white/25 backdrop-blur-xl shadow-xl rounded-full flex items-center gap-[8.5px] p-[8.5px]"
          : "w-[261px] h-[56px] px-3 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-[8.5px]"
      }
    >
      <motion.div layoutId={`icon-${label}`} transition={SPRING} className="shrink-0">
        <div
          className={
            isActive
              ? "w-[63px] h-[63px] rounded-full bg-white/30 flex items-center justify-center"
              : "w-[44px] h-[44px] rounded-full bg-white/30"
          }
        >
          {isActive ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={A.logo} alt="" aria-hidden="true" className="w-8 h-8" />
          ) : (
            <div className="w-full h-full rounded-full bg-white/10" />
          )}
        </div>
      </motion.div>

      <div className="relative flex-1 h-[44px] text-left ml-1">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <span className="text-white text-lg font-medium font-sans leading-tight">{label}</span>
          <span className="text-white/70 text-[11px] tracking-[0.15em] font-sans">
            ITCROWD MATCH
          </span>
        </motion.div>
        <motion.div
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center gap-1.5"
        >
          <div className="h-2 w-[140px] bg-white/50 rounded-full" />
          <div className="h-2 w-[70px] bg-white/35 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function NicheCarouselCard() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % NICHES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const len = NICHES.length;
  const half = Math.floor(len / 2);

  return (
    <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-stone-300">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${A.carouselBackdrop})` }}
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full" style={{ height: ACTIVE_HEIGHT }}>
          {NICHES.map((label, i) => {
            const diff = ((i - active + len + half) % len) - half;
            const isActive = diff === 0;
            const visible = Math.abs(diff) <= 2;
            const y =
              diff === 0
                ? 0
                : diff < 0
                  ? diff * (PILL_ROW_HEIGHT + PILL_GAP) - ACTIVE_GAP
                  : diff * (PILL_ROW_HEIGHT + PILL_GAP) + ACTIVE_GAP;
            const opacity = !visible ? 0 : Math.abs(diff) === 2 ? 0.55 : 1;

            return (
              <motion.div
                key={label}
                animate={{ y, opacity }}
                transition={{
                  y: SPRING,
                  opacity: { ease: "easeInOut", duration: 0.4 },
                }}
                className="absolute left-0 right-0 flex justify-center pointer-events-none"
              >
                <Pill label={label} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card 2 - business ↔ creator messaging                               */
/* ------------------------------------------------------------------ */

function SkeletonBubbleContent() {
  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-[#FFFFFF54] shrink-0" />
      <div className="ml-[12px] flex-1 flex flex-col gap-[9px] pr-[22px]">
        <div className="h-[6px] w-[31px] bg-[#FFFFFF3D] rounded-full mt-[17px]" />
        <div className="h-[6px] w-[85%] bg-[#FFFFFF3D] rounded-full" />
        <div className="h-[6px] w-[55%] bg-[#FFFFFF3D] rounded-full" />
      </div>
    </>
  );
}

/* A real exchange in three beats: brief, draft, schedule. */
const CHAT_STEPS = [
  { from: "Me", text: "Hi! Could you feature our new menu in a reel this month?" },
  { from: "Your creator", text: "On it. I'll have a draft ready for your review by Wednesday." },
  { from: "Me", text: "Loved the draft! Can we push the launch post to Friday?" },
];
const CHAT_STEP_MS = 3400;

function StepBubble({ step, filled }: { step: number; filled: boolean }) {
  const msg = CHAT_STEPS[step];

  return (
    <motion.div
      layout
      animate={{ backgroundColor: filled ? "#9E948B" : "#FAFAFA14" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-[45px] h-[135px] rounded-3xl p-[22px] overflow-hidden relative"
    >
      <AnimatePresence mode="wait">
        {filled ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center gap-[12px] h-[44px]">
              <div className="w-[44px] h-[44px] rounded-xl bg-[#141413]/30 flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={A.logo} alt="" aria-hidden="true" className="w-6 h-6" />
              </div>
              <span className="text-white text-base leading-none font-sans">{msg.from}</span>
            </div>
            <p className="text-white text-[15px] leading-snug mt-[-9px] ml-[56px] font-sans">
              {msg.text}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start"
          >
            <SkeletonBubbleContent />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MessagingCard() {
  const words = "Message and collaborate directly".split(" ");
  const [step, setStep] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const fillId = setTimeout(() => setFilled(true), 1100);
    return () => clearTimeout(fillId);
  }, []);

  useEffect(() => {
    if (!filled) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % CHAT_STEPS.length);
    }, CHAT_STEP_MS);
    return () => clearInterval(id);
  }, [filled]);

  return (
    <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-[#141413] flex flex-col pt-10 pb-10 justify-between">
      <div className="flex-1 flex flex-col justify-center gap-[10px] mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-[58px] h-[108px] rounded-2xl bg-[#FAFAFA14] flex items-start pt-[22px] pl-[22px] relative"
        >
          <SkeletonBubbleContent />
        </motion.div>

        <StepBubble step={step} filled={filled} />
      </div>

      <div className="flex justify-between items-end pl-[32px] pr-[32px]">
        <p className="w-64 text-white text-4xl leading-10 font-sans">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
        <div className="flex items-center">
          {CHAT_STEPS.map((s, i) => {
            const isActive = filled && i === step;
            return (
              <motion.div
                key={s.text}
                animate={{
                  backgroundColor: isActive ? "#5F5D4D" : "#252522",
                  color: isActive ? "#FFFFFF" : "#FFFFFF66",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`w-10 h-10 rounded-full border-2 border-[#141413] flex items-center justify-center text-xl font-sans ${
                  i === 0 ? "z-30" : i === 1 ? "-ml-3 z-20" : "-ml-3 z-10"
                }`}
              >
                {isActive ? `0${i + 1}` : i + 1}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card 3 - flexible deal structures                                   */
/* ------------------------------------------------------------------ */

const DEAL_OPTIONS: { label: string; color: string }[] = [
  { label: "Pay per post", color: "#887C71" },
  { label: "Monthly bundle", color: "#9E948B" },
  { label: "Performance bonus", color: "#9E948B" },
];

function FlexibleCard() {
  const words =
    "Build deals that fit your budget and your creator's goals: pay per post, book a monthly bundle, or add a performance bonus. You set the terms; we handle the paperwork.".split(
      " ",
    );

  return (
    <div
      className="relative flex-1 h-[585px] rounded-3xl overflow-hidden flex flex-col px-[33px] pt-[44px] pb-10"
      style={{ backgroundColor: "#9E948B" }}
    >
      <div className="flex flex-col gap-[26px]">
        <h3 className="text-white text-5xl font-normal leading-[1.05] font-heading">
          It&apos;s completely
          <br />
          flexible.
        </h3>
        <p className="text-white/60 text-lg leading-snug max-w-[340px] font-sans">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" }}
              className="inline-block mr-[5px]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>

      <div className="mt-auto z-10 relative">
        <div className="flex flex-col gap-[12px]">
          {DEAL_OPTIONS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1.1 + idx * 0.18, duration: 0.55, ease: "easeOut" }}
              className="w-full py-[15px] px-[27px] rounded-2xl bg-white flex items-center justify-between"
            >
              <span className="text-lg font-sans" style={{ color: item.color }}>
                {item.label}
              </span>
              <svg
                className="w-[22px] h-[22px] text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </motion.div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-10 h-[140px] -mx-4 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(158,148,139,1) 0%, rgba(158,148,139,1) 35%, rgba(158,148,139,0.7) 65%, rgba(158,148,139,0) 80%)",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function FeatureCards() {
  const cards = [
    <NicheCarouselCard key="niches" />,
    <MessagingCard key="messaging" />,
    <FlexibleCard key="flexible" />,
  ];

  return (
    <section className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-16 pb-20">
        <h2 className="text-center text-5xl md:text-6xl font-normal leading-[1.1] mb-12 text-neutral-900 font-heading">
          <span className="font-accent italic">Creative partnerships</span> your
          <br />
          customers will remember
        </h2>

        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.35, duration: 1.1, ease: "easeOut" }}
              className="flex flex-1"
            >
              {card}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
