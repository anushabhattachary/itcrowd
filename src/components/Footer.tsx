"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

/* Inline SVG social icons (lucide-react removed brand icons) */
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Startups", href: "#for-startups" },
  { label: "For Influencers", href: "#for-influencers" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-background border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left — Branding */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight font-[family-name:var(--font-syne)]">
                <span className="text-brand-purple">I</span>
                <span className="text-white">tCrowd</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Where Startups Find Their People.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="text-muted hover:text-brand-purple transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-muted hover:text-brand-purple transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                className="text-muted hover:text-brand-purple transition-colors"
                aria-label="Twitter / X"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Center — Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Stay in the loop
            </h4>
            {subscribed ? (
              <p className="text-sm text-brand-lime">
                You&apos;re subscribed! 🎉
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-white text-sm placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-purple text-white btn-glow"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-muted">
              No spam. Just deals and news.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© 2025 ItCrowd LLC. All rights reserved.</p>
          <p className="text-center">Founded at Georgia Tech 🐝</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
