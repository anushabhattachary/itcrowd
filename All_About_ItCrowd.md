# All About ItCrowd
*The comprehensive guide to ItCrowd's mission, technology stack, database architecture, and internal CRM suite.*

---

## 1. The Startup

**ItCrowd** is a dual-sided marketplace and platform designed to connect ambitious startups with high-impact influencers. We solve the discovery and matching problem for early-stage companies that need marketing reach but prefer flexible compensation.

- **For Startups:** Find vetted influencers willing to work for cash, equity, or hybrid deals. It provides a platform to manage budgets and outreach pipelines efficiently.
- **For Influencers:** Discover exciting early-stage startups and negotiate modern equity-based compensation alongside standard cash payouts.

---

## 2. Website & Tech Stack

The ItCrowd web platform is built for speed, aesthetics, and user conversion. It features a premium, glassmorphism-inspired dark mode UI.

- **Frontend Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS (v4) with custom utilities for gradients, glassmorphism, and glows
- **Icons & Visualization:** Lucide React (for UI icons) & Recharts (for Dashboard data)
- **Animations:** CSS Keyframes & Tailwind Animate classes
- **Hosting / Edge:** Vercel (recommended) for optimal Edge Middleware support

---

## 3. Database Architecture

Powered by **Supabase (PostgreSQL)**. The platform uses a highly normalized relational schema ensuring data integrity across all features. 

### Core Tables:
* **`companies`**: Stores startup profiles, budgets, founders' details, and pipeline stages (e.g., *Prospecting*, *Contacted*, *Shortlisting*, *Campaign Live*).
* **`influencers`**: Tracks creator metrics (follower count, engagement rate), niche, contact info, and deal preferences (Cash, Equity, Both).
* **`campaigns`**: The core entity linking a startup's marketing goals. Defines deal type, monthly targets, and overall campaign status.
* **`campaign_influencers`**: Junction table mapping active deals between a specific campaign and an influencer.
* **`campaign_posts`**: Granular tracker for monthly content deliverables, marking posts as complete with precise timestamps.

---

## 4. Authentication System

The platform features secure access management designed specifically for the internal team:

- **Edge Middleware Protection:** Next.js Edge Middleware intercepts all `/dashboard/*` routes before they even render, ensuring zero-latency auth checks.
- **Session Cookies:** Utilizes secure HTTP-only cookies (`itcrowd_session`) to maintain state.
- **Admin Portal:** Currently restricted to internal operators to protect pipeline and user data, ensuring the CRM remains strictly confidential.

---

## 5. CRM & Data Suite

A custom-built internal tool for managing the marketplace liquidity, accessible at `/dashboard`.

- **Pipeline Management:** Visual tracking of startups moving from *Prospecting* to *Campaign Live* and *Complete*.
- **Analytics Dashboard:** Real-time metrics visualization (using Recharts) for tracking monthly campaigns, active companies, and network growth.
- **Activity Feed:** Aggregated timeline of platform events such as new startups joining or influencer signups.
- **Entity Managers:** Dedicated tables and views for managing Companies and Influencers with full CRUD capabilities.

---

## 6. Cool Features & Implementations

Key features that make the ItCrowd platform stand out:

- **Hybrid Deal Structuring:** Complex logic to handle Cash, Equity, or blended compensation models right in the database and UI.
- **Matching Algorithm Data:** By tracking budget, niche, and platform, ItCrowd can confidently connect startups with creators that fit their exact needs.
- **App Router API Integration:** Fully integrated backend API routes running natively within Next.js, connecting the frontend directly to the Supabase PostgreSQL layer.
- **Polished Glassmorphism UI:** A custom `.glass-card` design system with animated floating background orbs and glowing interactions to impress prospective startups and creators alike.
