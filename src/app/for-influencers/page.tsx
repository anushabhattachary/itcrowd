import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import AnimatedWords from "@/components/AnimatedWords";
import {
  Wallet,
  Target,
  ClipboardList,
  Zap,
  TrendingUp,
  Handshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Influencers & Athletes | ItCrowd",
  description:
    "Join the ItCrowd network and earn cash or equity promoting businesses you believe in.",
};

const PERKS = [
  {
    icon: Wallet,
    title: "Cash or Equity — Your Call",
    desc: "Get paid in cash per post, take a small equity stake in the business, or mix both. It's your deal, your terms.",
  },
  {
    icon: Target,
    title: "Curated Matches Only",
    desc: "We only send you brands that fit your niche and audience. No random cold DMs, no irrelevant products.",
  },
  {
    icon: ClipboardList,
    title: "Clear Deliverables",
    desc: "Every deal spells out exactly what's expected — number of posts, format, timeline, and payment terms. No ambiguity.",
  },
  {
    icon: Zap,
    title: "Fast Payments",
    desc: "Cash payments go out promptly after content delivery. No 60-day invoice cycles.",
  },
  {
    icon: TrendingUp,
    title: "Grow With Businesses",
    desc: "If you take equity and the business succeeds, your stake grows with them. Real upside, not just a paycheck.",
  },
  {
    icon: Handshake,
    title: "We Handle the Boring Stuff",
    desc: "Contracts, negotiations, scheduling — we handle it. You focus on creating great content.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Apply & Get Approved",
    desc: "Fill out a quick form. Our team reviews your profile and welcomes you into the network.",
  },
  {
    number: "02",
    title: "Get Matched",
    desc: "We send you campaigns from businesses that fit your niche. You choose which ones to accept.",
  },
  {
    number: "03",
    title: "Create & Get Paid",
    desc: "Post content per the agreement, then receive cash, equity, or both. It's that simple.",
  },
];

export default function ForInfluencersPage() {
  return (
    <>
      {/* Dark mini-hero */}
      <section className="dark-surface relative bg-[#141413] text-white p-6 md:p-12 pb-16 md:pb-24 overflow-hidden">
        <Navbar theme="dark" entrance="fade" />

        <div className="max-w-[1360px] mx-auto pt-16 md:pt-24">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50 font-sans">
            <AnimatedWords text="For Creators, Influencers & Athletes" baseDelay={0.2} />
          </p>

          <h1 className="mt-5 max-w-[900px] text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.05] font-heading">
            <AnimatedWords text="Stop renting your audience. Start" baseDelay={0.3} />{" "}
            <span className="font-accent italic">
              <AnimatedWords text="owning your deals." baseDelay={0.6} />
            </span>
          </h1>

          <p className="mt-6 max-w-[560px] text-white/80 text-xl leading-[1.3] font-sans">
            <AnimatedWords
              baseDelay={0.8}
              text="ItCrowd matches you with businesses in your niche — and lets you earn cash, equity, or both for promoting brands you actually believe in."
            />
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/apply"
              className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white text-black text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-lg"
            >
              Apply to Join
            </Link>
            <a
              href="#contact"
              className="h-12 md:h-14 px-6 md:px-8 rounded-2xl border border-white/40 text-white text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              Ask us anything
            </a>
          </div>
        </div>
      </section>

      <main className="bg-white">
        {/* Perks grid */}
        <section className="max-w-[1360px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-[#887C71] font-sans">
            The perks
          </p>
          <h2 className="mt-4 max-w-[720px] text-4xl md:text-5xl font-normal leading-[1.1] text-neutral-900 font-heading">
            <AnimatedWords trigger="inView" text="Built around" baseDelay={0.2} />{" "}
            <span className="font-accent italic">
              <AnimatedWords trigger="inView" text="your craft" baseDelay={0.35} />
            </span>
          </h2>

          <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="rounded-3xl bg-[#F1F0EF] p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                    <Icon size={22} className="text-[#5F5D4D]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl md:text-2xl font-medium text-neutral-900 font-heading">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-lg leading-snug text-neutral-500 font-sans">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Three-step process — dark band */}
        <section className="dark-surface bg-[#141413] text-white">
          <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-20 md:py-28">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50 font-sans">
              How it works
            </p>
            <h2 className="mt-4 max-w-[720px] text-4xl md:text-5xl font-normal leading-[1.1] font-heading">
              <AnimatedWords trigger="inView" text="Three steps to" baseDelay={0.2} />{" "}
              <span className="font-accent italic">
                <AnimatedWords trigger="inView" text="your first deal" baseDelay={0.4} />
              </span>
            </h2>

            <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6">
              {STEPS.map((step) => (
                <div key={step.number} className="rounded-3xl bg-white/[0.07] p-8 flex flex-col">
                  <span className="w-11 h-11 rounded-full bg-[#5F5D4D] text-white flex items-center justify-center text-lg font-sans">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-xl md:text-2xl font-medium font-heading">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg leading-snug text-white/60 font-sans">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/apply"
                className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white text-black text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-lg"
              >
                Apply to Join
              </Link>
              <p className="text-white/60 text-lg font-sans">
                Takes a few minutes. We review every profile by hand.
              </p>
            </div>
          </div>
        </section>

        <div id="contact">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
