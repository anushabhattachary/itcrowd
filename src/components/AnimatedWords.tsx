"use client";

import { motion } from "framer-motion";

type AnimatedWordsProps = {
  text: string;
  baseDelay?: number;
  /** "mount" animates on load (hero); "inView" animates when scrolled into view. */
  trigger?: "mount" | "inView";
  stagger?: number;
  className?: string;
};

export default function AnimatedWords({
  text,
  baseDelay = 0,
  trigger = "mount",
  stagger = 0.045,
  className,
}: AnimatedWordsProps) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const transition = {
          delay: baseDelay + i * stagger,
          duration: 0.5,
          ease: "easeOut" as const,
        };
        return trigger === "mount" ? (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ) : (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={transition}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
