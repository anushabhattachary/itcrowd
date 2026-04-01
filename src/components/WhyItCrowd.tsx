"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "Niche-Perfect Matching",
    body: "We find influencers who actually fit your industry and audience — not just whoever has the most followers.",
  },
  {
    icon: "💸",
    title: "Cash or Equity Deals",
    body: "Influencers can earn money, own a piece of the brands they love, or both. It's a partnership, not just a post.",
  },
  {
    icon: "⚡",
    title: "Launch in Days, Not Months",
    body: "No bloated agency timelines. We move fast — from intro call to live campaign in under two weeks.",
  },
  {
    icon: "🤝",
    title: "You Stay in Control",
    body: "Startups pick their influencers. Influencers vet their startups. Every deal is a mutual yes.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyItCrowd() {
  return (
    <section id="why-itcrowd" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
            Why ItCrowd
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] leading-tight">
            Agencies Are Overpriced.
            <br className="hidden sm:block" /> Marketplaces Are a Mess.
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            We built ItCrowd so startups get real exposure and influencers get
            real upside — without the BS.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="glass-card p-8 group cursor-default"
            >
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="mt-4 text-xl font-bold font-[family-name:var(--font-syne)]">
                {feature.title}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
