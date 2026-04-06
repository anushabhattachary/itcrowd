"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Startups", href: "#for-startups" },
  { label: "For Influencers", href: "#for-influencers" },
  { label: "FAQs", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight font-[family-name:var(--font-syne)]">
              <span className="relative text-brand-purple group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.6)] transition-all">
                I
              </span>
              <span className="text-white">t</span>
              <span className="text-white">Crowd</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-muted hover:text-white transition-colors group/nav"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-brand-purple transition-all duration-300 group-hover/nav:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-muted hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
              title="Admin Login"
            >
              <LogIn size={20} />
            </Link>
            <a
              href="#for-influencers"
              className="text-sm px-5 py-2.5 rounded-full border border-white/20 text-white hover:border-brand-purple hover:text-brand-purple-light transition-all"
            >
              Join as Influencer
            </a>
            <a
              href="#contact"
              className="text-sm px-5 py-2.5 rounded-full bg-brand-purple text-white btn-glow font-medium"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm z-50 bg-surface/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col p-8 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-white hover:text-brand-purple transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-4 mt-auto w-full">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 text-center px-6 py-4 w-full rounded-full bg-white/5 border border-white/10 text-white hover:border-brand-purple transition-all"
          >
            <LogIn size={20} /> Admin Login
          </Link>
          <a
            href="#for-influencers"
            onClick={() => setMobileOpen(false)}
            className="text-center px-6 py-4 w-full rounded-full border border-white/20 text-white hover:border-brand-purple transition-all"
          >
            Join as Influencer
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-center px-6 py-4 w-full rounded-full bg-brand-purple text-white btn-glow font-medium"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
