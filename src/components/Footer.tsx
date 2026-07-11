"use client";

import Link from "next/link";
import A from "@/lib/assets";

/* Inline SVG social icons (lucide-react removed brand icons) */
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const exploreLinks = [
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Creators", href: "/for-influencers" },
  { label: "About", href: "/about" },
  { label: "Join as a Business", href: "/join-as-business" },
  { label: "Apply as a Creator", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Create an account", href: "/signup" },
];

export default function Footer() {
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
              Where businesses meet <span className="font-accent italic text-white/80">their match</span>.
              Vetted creators, flexible deals, campaigns live in under two weeks.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/itcrowd-llc/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
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

            <h4 className="text-sm uppercase tracking-[0.15em] text-white/40 mb-4 font-sans">Get in touch</h4>
            <p className="text-base text-white/70 font-sans leading-snug">
              Questions or ready to start?{" "}
              <Link href="/contact" className="text-white underline underline-offset-4 hover:text-white/80 transition-colors">
                Reach us here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40 font-sans">
          <p>© 2026 ItCrowd LLC. All rights reserved.</p>
          <p className="text-center">Founded at Georgia Tech 🐝</p>
          <p>Atlanta, GA</p>
        </div>
      </div>
    </footer>
  );
}
