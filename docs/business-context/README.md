# ItCrowd Business Context (for coding agents)

This folder gives coding agents the business facts they need to make correct technical and copy decisions. It was distilled from the founders' internal Google Drive on 2026-07-10. When the business changes, update these files in the same PR as the code change they affect.

## Files

- [business-overview.md](business-overview.md): what ItCrowd is, the team, the model and how it evolved, the target customer.
- [pricing-and-packages.md](pricing-and-packages.md): current pricing tiers and the older pricing menu they replaced.
- [clients-and-traction.md](clients-and-traction.md): real client pipeline and what may or may not be shown publicly.
- [operations-playbook.md](operations-playbook.md): how campaigns actually run (timeline, deliverables, sourcing rules).
- [website-guidelines.md](website-guidelines.md): hard copy rules, what on the site is real vs placeholder, domain and contact facts.

## Non-negotiable rules for any agent touching this repo

1. **No em-dashes anywhere.** Not in copy, not in comments. Plain hyphens for ranges (5-7 days). Founders enforce this.
2. **Plain human language.** No AI-sounding copy (seamless, empower, elevate, unlock, "it's not just X, it's Y").
3. **Cash only.** Equity is no longer a payment method at ItCrowd (removed 2026-07-09). Never reintroduce equity in copy, forms, or dashboards, even though older internal docs mention it.
4. **No invented customers, testimonials, stats, or logos.** Everything user-visible must be true or clearly labeled placeholder. See clients-and-traction.md for what is real.
5. **No personal contact data in this repo.** Influencer and lead names with phone numbers or emails live in the founders' Drive sheets, not here. Never commit them.
6. **The production domain is `itcrowd.space`** (Vercel). `itcrowd.io` is NOT ours; it is a parked page owned by someone else.
