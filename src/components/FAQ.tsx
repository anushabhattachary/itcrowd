"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much does ItCrowd cost for startups?",
    a: "Most campaigns run between $500–$2,000/month depending on the number of influencers and post frequency. There are no agency retainer fees. You pay the influencers directly through us.",
  },
  {
    q: "What if I have a small budget?",
    a: "We love scrappy startups. We'll find influencers within your budget — and equity deals are an option for those who want to minimize cash spend.",
  },
  {
    q: "How do equity deals work?",
    a: "We negotiate a small equity grant (typically 0.1%–0.5%) in lieu of or in addition to cash payment. All terms are handled in a formal agreement. Influencers effectively become micro-investors and brand advocates.",
  },
  {
    q: "What niches do you cover?",
    a: "Tech, health & wellness, fitness, consumer goods, gaming, fintech, fashion, food & beverage, and more. If your influencer space exists, we can find people in it.",
  },
  {
    q: "How are influencers vetted?",
    a: "Our team manually reviews engagement rate, audience quality, niche alignment, and previous brand partnerships before adding anyone to our network.",
  },
  {
    q: "How long does a campaign last?",
    a: "Most campaigns run month-to-month with a minimum of 2–4 posts per month. Many startups continue for 3–6 months as they see results.",
  },
  {
    q: "I'm an influencer — what's the minimum follower count?",
    a: "We work with micro and macro influencers. Engagement rate matters more than raw follower count. If your audience is authentic and niche-relevant, we want to hear from you.",
  },
  {
    q: "How quickly can we get started?",
    a: "After an intro call, we can have your influencer shortlist ready within 2 weeks and your first campaign live within 30 days.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
            Questions
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)]">
            Everything You Need to Know
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  openIndex === i
                    ? "border-brand-purple/30 bg-brand-purple/5"
                    : "border-white/5 bg-surface-light/50 hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-sm md:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-brand-purple transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-muted text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
