"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "50", suffix: "+", label: "Startups Served" },
  { value: "200", suffix: "+", label: "Influencers in Network" },
  { value: "$0", suffix: "", label: "Agency Fees" },
  { value: "2–4", suffix: "", label: "Posts Per Month, Per Deal" },
];

function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Handle non-numeric values
    const numericMatch = value.match(/^(\$?)(\d+)/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const prefix = numericMatch[1];
    const target = parseInt(numericMatch[2]);
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplay(`${prefix}${Math.round(current)}`);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative bg-surface py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center ${
                i < stats.length - 1
                  ? "md:border-r md:border-white/10"
                  : ""
              }`}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-lime font-[family-name:var(--font-syne)]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm md:text-base text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
