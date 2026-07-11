# Website Guidelines: What Is Real, What Is Placeholder

## Domain and contact (verified 2026-07-10)

- Production site: **https://itcrowd.space** (Vercel, deploys automatically from `main`).
- `itcrowd.io` is NOT ItCrowd's domain. It serves a third-party parked lander. All metadata, sitemap, robots, JSON-LD, and visible email addresses must use `itcrowd.space`.
- Public contact email: `anusha@itcrowd.space` (founder-confirmed 2026-07-10; it is checked regularly, unlike `hello@itcrowd.space`).
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
- `A.carouselBackdrop`: labeled placeholder SVG.
- `/og-image.jpg` referenced in metadata but the file does not exist yet; social shares have no preview image until one is added (1200x630).
- Footer social links: LinkedIn is real; Privacy Policy and Terms of Service pages do not exist yet.
- The testimonial block rotates two REAL quotes (added 2026-07-10, founder-supplied): Sunny Park, CEO and Founder of D!ne (client quote, shared by Chris for public use) and Chris Richardson's founder statement. Real team headshots are live in `public/team/`. Do not add other client names or quotes without founder plus client sign-off.

## Tech notes

- Next.js App Router; read `node_modules/next/dist/docs/` before assuming APIs (this Next version has breaking changes).
- Supabase backs auth/dashboards; marketing intake currently posts to a Google Apps Script (business interest) and a Supabase table (creator applications).
- Every push to `main` deploys to production. Build locally (`npm run build`) before pushing.
