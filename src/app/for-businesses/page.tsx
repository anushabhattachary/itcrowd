import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import AnimatedWords from "@/components/AnimatedWords";
import {
  Phone,
  Search,
  MousePointerClick,
  Rocket,
  TrendingUp,
  Check,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Businesses | ItCrowd",
  description:
    "Discover how ItCrowd helps established businesses get authentic influencer marketing without bloated agency fees.",
};

const STEPS = [
  {
    icon: Phone,
    meta: "Step 01 · 15 minutes",
    title: "Discovery Call",
    desc: "A quick call to understand your business: your product, target audience, marketing goals, and budget. Just a real conversation, no pitch deck.",
  },
  {
    icon: Search,
    meta: "Step 02 · 5-7 days",
    title: "Influencer Research & Shortlist",
    desc: "Our team digs into your niche and manually vets creators on engagement rate, audience demographics, content quality, and brand alignment. Within 5-7 days you get a curated shortlist of 5-10 vetted creators with full profiles and proposed rates.",
  },
  {
    icon: MousePointerClick,
    meta: "Step 03 · Your move",
    title: "You Pick, We Handle the Rest",
    desc: "Select the creators you like. We run outreach, negotiate cash rates, draft the contracts, and set content expectations. You approve final terms; that's it.",
  },
  {
    icon: Rocket,
    meta: "Step 04 · Ongoing",
    title: "Campaign Launch & Management",
    desc: "Content goes live on the agreed schedule. Most campaigns run 2-4 posts per creator each month. We coordinate posting times, track performance, and send you weekly reports.",
  },
  {
    icon: TrendingUp,
    meta: "Step 05 · Month over month",
    title: "Optimize & Grow",
    desc: "Based on results, we recommend which creators to continue with, who to add, and how to adjust the messaging. Your campaigns get sharper and your ROI grows.",
  },
];

const ITCROWD_POINTS = [
  "Paid directly to your creators, with no retainer and no middleman markup",
  "Rates agreed up front, so you know the cost before anything goes live",
  "Human-curated matching, weekly reporting included",
];

const AGENCY_POINTS = [
  "Monthly retainers before a single post goes live",
  "Markups layered on top of creator rates",
  "Long contracts, slow launches",
];

const HERO_STATS = [
  { figure: "$500-$2K", label: "typical monthly spend, paid straight to creators" },
  { figure: "5-10", label: "vetted creators on every shortlist we send you" },
  { figure: "2 weeks", label: "or less from intro call to live campaign" },
];

export default function ForBusinessesPage() {
  return (
    <>
      {/* Dark mini-hero */}
      <section className="dark-surface relative bg-[#141413] text-white p-6 md:p-12 pb-16 md:pb-24 overflow-hidden">
        <Navbar theme="dark" entrance="fade" />

        <div className="max-w-[1360px] mx-auto pt-16 md:pt-24">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50 font-sans">
            <AnimatedWords text="For Businesses" baseDelay={0.2} />
          </p>

          <h1 className="mt-5 max-w-[900px] text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.05] font-heading">
            <AnimatedWords text="Influencer marketing that" baseDelay={0.3} />{" "}
            <span className="font-accent italic">
              <AnimatedWords text="actually works." baseDelay={0.55} />
            </span>
          </h1>

          <p className="mt-6 max-w-[560px] text-white/80 text-xl leading-[1.3] font-sans">
            <AnimatedWords
              baseDelay={0.7}
              text="No retainers. No bloated agency fees. Vetted influencers, NIL athletes, photographers, and videographers promoting your business to the right audience, at cash rates you agree to up front."
            />
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#contact"
              className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white text-black text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-lg"
            >
              Book a Free Intro Call
            </a>
            <a
              href="#how-it-works"
              className="h-12 md:h-14 px-6 md:px-8 rounded-2xl border border-white/40 text-white text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              See how it works
            </a>
          </div>

          <div className="mt-14 md:mt-20 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-8">
            {HERO_STATS.map((stat) => (
              <div key={stat.figure} className="flex flex-col gap-1.5">
                <span className="text-3xl md:text-4xl font-medium font-heading">
                  {stat.figure}
                </span>
                <span className="text-white/60 text-base leading-snug font-sans max-w-[260px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="bg-white">
        {/* Step-by-step process */}
        <section id="how-it-works" className="max-w-[1360px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-[#887C71] font-sans">
            The process
          </p>
          <h2 className="mt-4 max-w-[720px] text-4xl md:text-5xl font-normal leading-[1.1] text-neutral-900 font-heading">
            <AnimatedWords trigger="inView" text="Five steps from hello to" baseDelay={0.2} />{" "}
            <span className="font-accent italic">
              <AnimatedWords trigger="inView" text="live campaign" baseDelay={0.45} />
            </span>
          </h2>

          <div className="mt-12 md:mt-16 divide-y divide-[#F1F0EF]">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="py-10 md:py-12 flex flex-col md:flex-row gap-6 md:gap-10"
                >
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#F1F0EF] flex items-center justify-center">
                    <Icon size={24} className="text-[#5F5D4D]" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-[0.15em] text-[#887C71] font-sans">
                      {step.meta}
                    </p>
                    <h3 className="mt-2 text-2xl md:text-3xl font-medium text-neutral-900 font-heading">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[680px] text-lg leading-relaxed text-neutral-500 font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing comparison */}
        <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <p className="text-sm uppercase tracking-[0.2em] text-[#887C71] font-sans">
            Pricing
          </p>
          <h2 className="mt-4 max-w-[720px] text-4xl md:text-5xl font-normal leading-[1.1] text-neutral-900 font-heading">
            <AnimatedWords trigger="inView" text="Transparent" baseDelay={0.2} />{" "}
            <span className="font-accent italic">
              <AnimatedWords trigger="inView" text="by design" baseDelay={0.35} />
            </span>
          </h2>

          <div className="mt-12 grid lg:grid-cols-2 gap-6 items-stretch">
            {/* ItCrowd card */}
            <div className="dark-surface bg-[#141413] text-white rounded-3xl p-8 md:p-12 flex flex-col">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50 font-sans">
                With ItCrowd
              </p>
              <p className="mt-5 font-heading">
                <span className="text-5xl md:text-6xl font-medium">$500-$2,000</span>
                <span className="text-white/60 text-xl font-sans"> /month, total</span>
              </p>
              <ul className="mt-8 space-y-4">
                {ITCROWD_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <Check size={14} className="text-white" aria-hidden="true" />
                    </span>
                    <span className="text-lg leading-snug text-white/80 font-sans">{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-10 self-start h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white text-black text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-neutral-200 transition-colors"
              >
                Book a Free Intro Call
              </a>
            </div>

            {/* Typical agency card */}
            <div className="bg-[#F1F0EF] rounded-3xl p-8 md:p-12 flex flex-col">
              <p className="text-sm uppercase tracking-[0.2em] text-[#887C71] font-sans">
                A typical agency
              </p>
              <p className="mt-5 font-heading">
                <span className="text-5xl md:text-6xl font-medium text-[#9E948B]">
                  $10K-$50K
                </span>
                <span className="text-[#9E948B] text-xl font-sans"> /month</span>
              </p>
              <ul className="mt-8 space-y-4">
                {AGENCY_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <X size={14} className="text-[#9E948B]" aria-hidden="true" />
                    </span>
                    <span className="text-lg leading-snug text-[#887C71] font-sans">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-10 text-base text-[#9E948B] font-sans">
                You pay creators directly through ItCrowd, with no hidden fees and no retainer markup.
                The rate you agree to is the rate you pay.
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
