# Website Guidelines: What Is Real, What Is Placeholder

## Domain and contact (verified 2026-07-10)

- Production site: **https://itcrowd.space** (Vercel, deploys automatically from `main`).
- `itcrowd.io` is NOT ItCrowd's domain. It serves a third-party parked lander. All metadata, sitemap, robots, JSON-LD, and visible email addresses must use `itcrowd.space`.
- Public email used in the investor deck: `hello@itcrowd.space`. If email routing for that address is not yet confirmed by the founders, prefer pointing contact CTAs at the on-site contact form.
- Real LinkedIn: https://www.linkedin.com/company/itcrowd-llc

## Hard copy rules (founder-mandated)

1. Zero em-dashes. Hyphens for ranges.
2. Plain, direct, human sentences. No AI-marketing vocabulary.
3. Cash is the only payment method. No equity anywhere.
4. Nothing invented: no fake customers, testimonials, review counts, or traction stats.

## Claims that are backed by internal docs (safe to keep)

- $500-$2,000/month typical packages (Local/Growth/Anchor tiers).
- Agencies cost $10K-$50K+/month (used in the investor deck problem slide).
- 5-10 vetted creators per shortlist; shortlist within 5-7 days.
- Live in under two weeks from intro call.
- 2-4 posts per creator per month; most campaigns run monthly cycles.
- Creator types: micro-influencers, NIL/amateur athletes, foodies, photographers, videographers; Atlanta/Georgia Tech roots.
- Five-word pitch: "Real businesses. Real creators. Real results."

## Placeholder inventory (state as of 2026-07-10)

All media is wired through `src/lib/assets.ts`; swap paths there when real assets exist.

- `A.heroVideo` is null: hero falls back to a neutral gradient SVG. Waiting on real campaign footage.
- `A.carouselBackdrop`, `A.testimonialPortrait`: labeled placeholder SVGs.
- `/og-image.jpg` referenced in metadata but the file does not exist yet; social shares have no preview image until one is added (1200x630).
- Footer social links: LinkedIn is real; Instagram and X links plus Privacy Policy and Terms of Service pages do not exist yet.
- The former fake-brand marquee (`TrustedBy`) and fake testimonial were removed 2026-07-10; the testimonial section now quotes co-founder Chris Richardson (real person, real pitch). Replace with a real client quote when one exists, with the client's permission.

## Tech notes

- Next.js App Router; read `node_modules/next/dist/docs/` before assuming APIs (this Next version has breaking changes).
- Supabase backs auth/dashboards; marketing intake currently posts to a Google Apps Script (business interest) and a Supabase table (creator applications).
- Every push to `main` deploys to production. Build locally (`npm run build`) before pushing.
