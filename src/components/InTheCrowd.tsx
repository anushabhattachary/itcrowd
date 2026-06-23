"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ExternalLink } from "lucide-react";

type Highlight = {
  id: string;
  created_at: string;
  type: "influencer" | "business";
  name: string;
  tagline: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  display_order: number;
  published: boolean;
};

export default function InTheCrowd() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHighlights() {
      try {
        const { data, error } = await supabase
          .from("highlights")
          .select("*")
          .eq("published", true)
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error fetching highlights:", error);
          setHighlights([]);
        } else {
          setHighlights(data || []);
        }
      } catch (err) {
        console.error("Failed to connect to highlights table:", err);
        setHighlights([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHighlights();
  }, []);

  if (loading || highlights.length === 0) {
    return null; // Hide the section entirely if loading or no highlights exist
  }

  return (
<<<<<<< HEAD
    <section id="in-the-crowd" className="py-24 md:py-32 bg-[#F3EBE0] overflow-hidden">
=======
    <section id="in-the-crowd" className="py-24 md:py-32 bg-[#0D0D14] overflow-hidden">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
            WHO WE&apos;RE WORKING WITH
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] leading-tight text-white">
            In The Crowd
          </h2>
<<<<<<< HEAD
          <p className="mt-4 text-lg text-[#8A7F6E] max-w-2xl mx-auto">
=======
          <p className="mt-4 text-lg text-[#94A3B8] max-w-2xl mx-auto">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            A few of the business owners and creators making moves with us.
          </p>
        </motion.div>

        {/* Highlights Row / Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {highlights.map((item) => {
            const isInfluencer = item.type === "influencer";
            const initials = item.name.substring(0, 2).toUpperCase();
            
            // Build the card layout
            const CardContent = (
              <div className="flex flex-col h-full relative group/card">
                {/* Header: Avatar/Logo & Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className={`w-14 h-14 object-cover border border-white/10 shrink-0 ${
                        isInfluencer ? "rounded-full" : "rounded-lg"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-14 h-14 flex items-center justify-center font-bold text-lg shrink-0 border border-white/5 ${
                        isInfluencer
                          ? "rounded-full bg-brand-purple/20 text-brand-purple-light"
                          : "rounded-lg bg-brand-lime/20 text-brand-lime"
                      }`}
                    >
                      {initials}
                    </div>
                  )}

                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      isInfluencer
                        ? "bg-brand-purple/10 border-brand-purple/20 text-brand-purple-light"
                        : "bg-brand-lime/10 border-brand-lime/20 text-brand-lime"
                    }`}
                  >
                    {isInfluencer ? "Influencer" : "Business"}
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-white group-hover/card:text-brand-purple transition-colors flex items-center gap-1.5">
                    {item.name}
                    {item.link_url && (
                      <ExternalLink
                        size={14}
                        className="text-white/40 group-hover/card:text-brand-purple opacity-0 group-hover/card:opacity-100 transition-all"
                      />
                    )}
                  </h3>
<<<<<<< HEAD
                  <p className="text-sm font-semibold text-[#7C7B4D] tracking-wide uppercase font-[family-name:var(--font-syne)] opacity-80">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-[#8A7F6E] leading-relaxed line-clamp-3">
=======
                  <p className="text-sm font-semibold text-[#A3E635] tracking-wide uppercase font-[family-name:var(--font-syne)] opacity-80">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    {item.description}
                  </p>
                </div>
              </div>
            );

            if (item.link_url) {
              return (
                <a
                  key={item.id}
                  href={item.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 block cursor-pointer transition-all hover:scale-[1.02] w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-start"
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <div
                key={item.id}
                className="glass-card p-6 w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-start"
              >
                {CardContent}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
