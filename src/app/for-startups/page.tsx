import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "For Startups | ItCrowd",
  description:
    "Discover how ItCrowd helps early-stage startups get authentic influencer marketing without bloated agency fees.",
};

const details = [
  {
    number: "01",
    title: "Discovery Call (15 min)",
    desc: "We hop on a quick call to understand your startup — your product, target audience, marketing goals, and budget. No pitch deck required. Just a real conversation.",
  },
  {
    number: "02",
    title: "Influencer Research & Shortlist",
    desc: "Our team dives deep into your niche. We manually vet influencers based on engagement rate, audience demographics, content quality, and brand alignment. Within 5–7 days, you get a curated shortlist of 5–10 creators with full profiles and proposed rates.",
  },
  {
    number: "03",
    title: "You Pick, We Handle the Rest",
    desc: "Select the influencers you vibe with. We handle outreach, negotiate rates (cash, equity, or a mix), draft contracts, and set content expectations. You approve final terms — that's it.",
  },
  {
    number: "04",
    title: "Campaign Launch & Management",
    desc: "Content goes live on the agreed schedule. We coordinate posting times, track performance metrics, and share weekly reports. Most campaigns run 2–4 posts per influencer per month.",
  },
  {
    number: "05",
    title: "Optimize & Scale",
    desc: "Based on results, we recommend which influencers to continue with, who to add, and how to adjust messaging. Month over month, your campaigns get sharper and your ROI grows.",
  },
];

export default function ForStartupsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
              For Startups
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
              Influencer Marketing That{" "}
              <span className="gradient-text">Actually Works</span> for
              Early-Stage Companies.
            </h1>
            <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
              No retainers. No bloated agency fees. Just real creators promoting
              your product to the right audience — for cash, equity, or both.
            </p>
            <a
              href="#contact"
              className="inline-block mt-8 px-8 py-4 rounded-full bg-brand-purple text-white text-lg font-semibold btn-glow"
            >
              Book a Free Intro Call
            </a>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="py-16 md:py-24 bg-surface/50">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-syne)] mb-12">
              How It Works — Step by Step
            </h2>
            <div className="space-y-10">
              {details.map((step) => (
                <div key={step.number} className="flex gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center">
                    <span className="text-xl font-extrabold text-brand-purple font-[family-name:var(--font-syne)]">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-syne)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing quick note */}
        <section className="py-16 md:py-24">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-syne)] mb-6">
              Transparent Pricing
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Most campaigns run{" "}
              <span className="text-brand-lime font-semibold">
                $500–$2,000/month
              </span>{" "}
              total. You pay the influencers directly through our platform — no
              hidden fees, no middleman markup. Equity-based deals are also
              available to reduce cash spend.
            </p>
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
