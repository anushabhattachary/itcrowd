"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Startup",
    desc: "Hop on a quick call or fill out our form. We learn your niche, budget, and goals — and tell you if we're a fit.",
  },
  {
    number: "02",
    title: "We Source Your Influencer Shortlist",
    desc: "Our team handpicks 5–10 influencers in your space who align with your brand. You get follower counts, engagement rates, and proposed rates for each.",
  },
  {
    number: "03",
    title: "You Choose Who You Like",
    desc: "Pick the creators that feel right. We handle the outreach, contracting, and negotiation — you just say yes.",
  },
  {
    number: "04",
    title: "Campaign Goes Live",
    desc: "Posts, stories, and content go out on the agreed schedule (typically 2–4 posts/month). We track performance so you can see the ROI.",
  },
];

export default function HowItWorksStartups() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
            For Startups
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
            Go From &quot;We Need Marketing&quot;
            <br className="hidden sm:block" /> to Live Campaign — Fast.
          </h2>
        </motion.div>

        {/* Steps */}
        <div id="for-startups" className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/60 via-brand-purple/30 to-transparent" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 md:gap-8"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-[80px] h-[80px] rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-brand-purple font-[family-name:var(--font-syne)]">
                    {step.number}
                  </span>
                </div>

                {/* Step content */}
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-syne)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 glass-card p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-syne)]">
            Ready to grow?
          </h3>
          <a
            href="#contact"
            className="inline-block mt-6 px-8 py-4 rounded-full bg-brand-purple text-white text-lg font-semibold btn-glow"
          >
            Book a Free Intro Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
