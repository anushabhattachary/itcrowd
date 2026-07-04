import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itcrowd.io"),
  title: "ItCrowd — Where businesses meet their match",
  description:
    "ItCrowd matches growing businesses with vetted content creators — paid in cash, equity, or both. Human-curated matches, agency results without agency fees, live in days.",
  keywords: [
    "influencer marketing",
    "creator marketplace",
    "equity deals",
    "NIL athletes",
    "content creators",
    "Georgia Tech",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ItCrowd — Where businesses meet their match",
    description:
      "ItCrowd matches growing businesses with vetted content creators — paid in cash, equity, or both. Human-curated matches, agency results without agency fees, live in days.",
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
    title: "ItCrowd — Where businesses meet their match",
    description:
      "ItCrowd matches growing businesses with vetted content creators — paid in cash, equity, or both.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ItCrowd",
  url: "https://itcrowd.io",
  logo: "https://itcrowd.io/logo-dark.svg",
  description:
    "A marketplace connecting growing businesses with vetted content creators for campaigns paid in cash, equity, or both.",
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${interTight.variable} ${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#141413] font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
