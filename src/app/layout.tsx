import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itcrowd.io"),
  title: "ItCrowd | Where Startups Meet Their Match",
  description:
    "ItCrowd connects early-stage startups with influencers and athletes for cash or equity deals. Affordable, vetted influencer marketing built for founders.",
  keywords: [
    "influencer marketing",
    "startup marketing",
    "equity deals",
    "influencer platform",
    "Georgia Tech",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ItCrowd | Where Startups Meet Their Match",
    description:
      "ItCrowd connects early-stage startups with influencers and athletes for cash or equity deals. Affordable, vetted influencer marketing built for founders.",
    url: "https://itcrowd.io",
    siteName: "ItCrowd",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ItCrowd Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ItCrowd | Where Startups Meet Their Match",
    description:
      "ItCrowd connects early-stage startups with influencers and athletes for cash or equity deals. Affordable, vetted influencer marketing built for founders.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ItCrowd",
  url: "https://itcrowd.io",
  logo: "https://itcrowd.io/icon.svg",
  description: "A platform connecting early-stage startups with influencers and athletes for cash or equity deals.",
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://itcrowd.io/contact",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M16 2L12 14h8L14 30l2-12H8L16 2z' fill='%237C3AED'/></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased pb-20 md:pb-0">
        {children}
        {/* Sticky Mobile CTA */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-white/10 z-[100]">
          <a
            href="#contact"
            className="flex items-center justify-center w-full py-4 rounded-full bg-brand-purple text-white font-semibold text-lg btn-glow shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            Get Matched &rarr;
          </a>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
