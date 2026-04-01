import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "For Influencers & Athletes | ItCrowd",
  description:
    "Join the ItCrowd network and earn cash or equity promoting startups you believe in.",
};

const perks = [
  {
    icon: "💰",
    title: "Cash or Equity — Your Call",
    desc: "Get paid in cash per post, take a small equity stake in the startup, or mix both. It's your deal, your terms.",
  },
  {
    icon: "🎯",
    title: "Curated Matches Only",
    desc: "We only send you brands that fit your niche and audience. No random cold DMs or irrelevant products.",
  },
  {
    icon: "📋",
    title: "Clear Deliverables",
    desc: "Every deal spells out exactly what's expected — number of posts, format, timeline, and payment terms. No ambiguity.",
  },
  {
    icon: "⚡",
    title: "Fast Payments",
    desc: "Cash payments go out promptly after content delivery. No 60-day invoice cycles.",
  },
  {
    icon: "📈",
    title: "Grow With Startups",
    desc: "If you take equity and the startup succeeds, your stake grows with them. Real upside, not just a paycheck.",
  },
  {
    icon: "🤝",
    title: "We Handle the Boring Stuff",
    desc: "Contracts, negotiations, scheduling — we handle it. You focus on creating great content.",
  },
];

export default function ForInfluencersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <span className="text-sm uppercase tracking-[0.2em] text-brand-lime font-semibold">
              For Influencers &amp; Athletes
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
              Stop Renting Your Audience.{" "}
              <span className="gradient-text">Start Owning Your Deals.</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
              ItCrowd matches you with startups in your niche — and lets you
              earn cash, equity, or both for promoting brands you actually
              believe in.
            </p>
            <a
              href="/apply"
              className="inline-block mt-8 px-8 py-4 rounded-full border border-brand-lime/40 text-brand-lime text-lg font-semibold hover:bg-brand-lime/10 transition-all"
            >
              Apply to Join →
            </a>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-16 md:py-24 bg-surface/50">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-syne)] mb-12">
              Why Creators Love Working With Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, i) => (
                <div key={i} className="glass-card p-8">
                  <span className="text-3xl">{perk.icon}</span>
                  <h3 className="mt-4 text-lg font-bold font-[family-name:var(--font-syne)]">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-24">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-syne)] mb-6">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
              <div className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold mb-4">
                  1
                </div>
                <h3 className="font-bold font-[family-name:var(--font-syne)]">
                  Apply &amp; Get Approved
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Fill out a quick form. Our team reviews your profile and adds you to the network.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold mb-4">
                  2
                </div>
                <h3 className="font-bold font-[family-name:var(--font-syne)]">
                  Get Matched
                </h3>
                <p className="mt-2 text-sm text-muted">
                  We send you startup deals that match your niche. You choose which ones to accept.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold mb-4">
                  3
                </div>
                <h3 className="font-bold font-[family-name:var(--font-syne)]">
                  Create &amp; Get Paid
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Post content per the agreement. Receive cash, equity, or both. It&apos;s that simple.
                </p>
              </div>
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
