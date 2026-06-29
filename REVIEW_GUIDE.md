# Reviewer's Guide — Account Separation (admin / business / creator)

This branch (`supabase-connection-accounts`) connects the dashboard to Supabase and
splits it into **three role-based experiences**: **Admin** (founders), **Business**, and
**Creator**. This guide lets you see all three for yourself and approve the PR — safely.

> **You cannot break the codebase by clicking around.** The worst case while testing is
> creating some throwaway demo content. See the safety note below.

---

## The fastest way: the Vercel preview (no setup)

When this PR builds on Vercel, it gets a **Preview Deployment** link (Vercel bot comments
it on the PR, and it appears under the PR's "Checks"/"Deployments"). Open that URL, go to
`/login`, and use the demo logins in the table below. That's it — nothing to install.

> If the preview shows errors loading data, the Supabase env vars probably aren't set on
> Vercel yet (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). In that case
> use the local option below, or ping Rayan to add them in Vercel.

---

## Running it locally (10 minutes)

**You need:** [Node.js 20+](https://nodejs.org) and Git.

1. **Get the branch**
   ```bash
   git clone https://github.com/anushabhattachary/itcrowd.git
   cd itcrowd
   git checkout supabase-connection-accounts
   ```
   (If you already have the repo: `git fetch && git checkout supabase-connection-accounts`)

2. **Create the env file** — copy the template (the keys in it are the public client keys,
   safe to use):
   ```bash
   cp .env.local.example .env.local
   ```
   *(Or just drop in the `.env.local` file Rayan sends you.)*

3. **Install + run**
   ```bash
   npm install
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) and go to **`/login`**.

5. **Stop it** when done: press `Ctrl + C` in the terminal.

---

## Demo logins

Go to `http://localhost:3000/login` (or the preview URL + `/login`). Password for all three: **`Demo1234!`**

| Email | Role | What you should see |
|---|---|---|
| `demo-admin@itcrowd.test` | **Admin** | Full CRM: Companies, Creators, Campaigns, Content, Messages, Highlights, Reports. Sees everything. |
| `demo-business@itcrowd.test` | **Business** ("Demo Fitness Co") | Overview, their Campaign, a **Content Library** (2 items), Messages with the creator, Reports, Settings. |
| `demo-creator@itcrowd.test` | **Creator** ("Cory") | Overview, **My Campaigns** (assigned), their Content, Messages with the business, Profile. |

Sign out from the bottom-left of the sidebar to switch accounts.

---

## What to check (the point of the review)

**Separation works:**
- [ ] The **sidebar menu changes per role** (admin has the most; creator the least).
- [ ] As **Business**, you only see *your* company's data — no other businesses.
- [ ] As **Creator**, you only see campaigns you're attached to.
- [ ] As **Admin**, you can see across everything.

**The creator → business content sync (the headline feature):**
- [ ] Log in as **Creator** → **Content** → **Upload Content** → pick "Demo Launch Campaign",
      add a title, choose any image/video file, Upload.
- [ ] Sign out, log in as **Business** → **Content Library** → your upload is **already there**.
- [ ] As Business, click **Approve** (or **Revise** with a note) → sign back in as Creator and
      see the status change.

**Messaging:**
- [ ] As **Business** → **Messages**, send a message in the thread.
- [ ] As **Creator** → **Messages**, you see it, and can reply.

**Onboarding (optional):**
- [ ] At `/signup`, create a brand-new business or creator account and walk through the
      onboarding form — it should land you in the right dashboard.

---

## Is this safe? (Yes — read this)

- The app talks to our **shared Supabase database**, so anything you do (uploads, messages)
  is real and visible to the team. **Please only use the `demo-*` accounts** and don't delete
  records you didn't create. There is essentially no real customer data yet, so this is low-risk.
- Running the app or clicking around **cannot change the source code**. Reviewing/approving the
  PR on GitHub is completely separate and safe.
- The `Demo1234!` accounts are throwaway — Rayan will remove them before launch.

---

## Approving the PR

1. On the [PR](https://github.com/anushabhattachary/itcrowd/pull/3), read the description and the
   **Files changed** tab. Leave comments inline on any line.
2. (Codex will also post an automated review once it's enabled on the repo.)
3. When you're happy, click **Review changes → Approve**.
