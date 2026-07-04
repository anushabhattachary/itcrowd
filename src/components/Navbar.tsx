"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import A from "@/lib/assets";

const NAV_LINKS = [
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Creators", href: "/for-influencers" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

type NavbarProps = {
  /** "dark" sits over the dark hero (white wordmark); "light" sits on white pages. */
  theme?: "dark" | "light";
  /** "hero" rises from the center of the viewport (homepage); "fade" for subpages. */
  entrance?: "hero" | "fade";
};

export default function Navbar({ theme = "dark", entrance = "fade" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const onDark = theme === "dark";

  return (
    <motion.header
      initial={entrance === "hero" ? { y: "45vh", opacity: 0 } : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: entrance === "hero" ? 1 : 0.6, ease: EASE }}
      className="w-full max-w-[1360px] mx-auto flex justify-between items-center z-20 relative"
    >
      {/* Brand */}
      <Link href="/" className="flex items-center gap-[20px]" aria-label="ItCrowd home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={onDark ? A.logo : A.logoDark}
          alt=""
          className="w-9 h-9"
          aria-hidden="true"
        />
        <span
          className={`${onDark ? "text-white" : "text-[#141413]"} text-3xl font-medium font-heading`}
        >
          ItCrowd
        </span>
      </Link>

      {/* Desktop glass nav */}
      <motion.nav
        layout
        initial={{ width: 110 }}
        animate={{ width: "auto" }}
        transition={{ duration: 0.8, delay: entrance === "hero" ? 1.1 : 0.3, ease: EASE }}
        style={{ willChange: "width" }}
        className="hidden lg:flex bg-black/40 backdrop-blur-lg rounded-3xl items-center overflow-hidden h-[64px] flex-row-reverse"
      >
        <div className="p-1.5">
          <Link
            href="/login"
            className="h-12 px-6 rounded-full bg-white text-black text-xl font-medium inline-flex items-center justify-center hover:bg-neutral-100 transition-colors whitespace-nowrap font-sans"
          >
            Login
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: entrance === "hero" ? 1.5 : 0.6, duration: 0.5 }}
          className="flex items-center gap-8 pl-8 pr-2 whitespace-nowrap"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-base opacity-90 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </motion.nav>

      {/* Mobile toggle */}
      <div className="lg:hidden relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-lg flex items-center justify-center text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-3 w-60 bg-black/70 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-3 z-30"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-white text-base opacity-90 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="h-11 rounded-full bg-white text-black text-lg font-medium inline-flex items-center justify-center hover:bg-neutral-100 transition-colors font-sans"
              >
                Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
