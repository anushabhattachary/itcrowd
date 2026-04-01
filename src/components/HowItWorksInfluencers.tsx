"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Get Matched With Startups",
    body: "We send you startups that fit your niche and audience. No cold outreach. No spray and pray.",
  },
  {
    title: "Pick Your Deal Structure",
    body: "Want cash? We can do that. Want equity in a company you believe in? We do that too. Or both.",
  },
  {
    title: "Create. Post. Grow Together.",
    body: "2–4 posts per month. Clear deliverables. Fast payment. And if the startup blows up — so does your stake.",
  },
];

export default function HowItWorksInfluencers() {
  return (
    <section id="for-influencers" className="py-24 md:py-32 bg-surface/50">
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
            For Influencers &amp; Athletes
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
            Stop Just Posting Ads.
            <br className="hidden sm:block" /> Start Owning What You Promote.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mb-5">
                <span className="text-lg font-bold text-brand-purple">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-syne)]">
                {card.title}
              </h3>
              <p className="mt-3 text-muted leading-relaxed flex-1">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl italic text-muted-light max-w-3xl mx-auto leading-relaxed">
            &quot;ItCrowd was the first platform that actually treated me like a
            partner, not just a megaphone.&quot;
          </blockquote>
          <p className="mt-4 text-brand-purple font-semibold">
            @SampleCreator{" "}
            <span className="text-muted text-sm font-normal">
              · 180K followers
            </span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-full border border-brand-lime/40 text-brand-lime text-lg font-semibold hover:bg-brand-lime/10 transition-all"
          >
            Apply to Join Our Network
          </a>
        </motion.div>
      </div>
    </section>
  );
}
