"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import A from "@/lib/assets";

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

const exploreLinks = [
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Creators", href: "/for-influencers" },
  { label: "Join as a Business", href: "/join-as-business" },
  { label: "Apply as a Creator", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Create an account", href: "/signup" },
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
    <footer className="dark-surface bg-[#141413] text-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="ItCrowd home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={A.logo} alt="" aria-hidden="true" className="w-8 h-8" />
              <span className="text-2xl font-medium font-heading text-white">ItCrowd</span>
            </Link>
            <p className="mt-4 text-white/60 text-lg max-w-[360px] leading-snug font-sans">
              Where businesses meet <span className="font-accent italic text-white/80">their match</span> —
              vetted creators, flexible deals, campaigns live in days.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/itcrowd-llc/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter / X">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] text-white/40 mb-4 font-sans">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base text-white/70 hover:text-white transition-colors font-sans">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account + Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] text-white/40 mb-4 font-sans">Account</h4>
            <ul className="space-y-3 mb-8">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base text-white/70 hover:text-white transition-colors font-sans">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-sm uppercase tracking-[0.15em] text-white/40 mb-4 font-sans">Stay in the loop</h4>
            {subscribed ? (
              <p className="text-base text-white/80 font-sans">You&apos;re subscribed.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 font-sans"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-white text-black hover:bg-neutral-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-white/40 font-sans">No spam. Just deals and news.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40 font-sans">
          <p>© 2025 ItCrowd LLC. All rights reserved.</p>
          <p className="text-center">Founded at Georgia Tech 🐝</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
