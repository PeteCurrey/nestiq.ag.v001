# NESTIQ Property Portal

NESTIQ is a high-authority, production-grade UK property marketplace built to challenge traditional portals with superior editorial design, AI-driven discovery, and programmatic SEO architecture.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, PPR, ISR)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css` — there is no `tailwind.config.ts`)
- **Database/Auth**: Supabase (PostgreSQL, RLS, Auth Triggers)
- **Search**: Algolia (InstantSearch, Geo-location)
- **Maps**: Mapbox GL JS v3 (SkyView, Clustering, POIs)
- **AI**: Anthropic Claude 3.5 Sonnet (Descriptions & NLP Search)
- **Payments**: Stripe (Connect, Subscriptions, Checkout)
- **Emails**: Resend (React Email Templates)
- **Analytics**: PostHog & Sentry
- **Testing**: Playwright (E2E)

## 🏗️ Architecture

- `/app`: Unified routing for Marketing, Agent Dashboard, and Consumer Accounts.
- `/components`: Atomic design system with premium variants.
- `/lib`: Integration layers for Supabase, Algolia, and AI.
- `/types`: Strict TypeScript definitions including Database schemas.
- `vercel.json`: Cron schedules for Market Data and Lead Scoring.

## 🛠️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone [repo-url]
   cd nestiq
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in your API keys for Supabase, Algolia, Mapbox, Stripe, and Anthropic.

4. **Database Migration**:
   Apply `supabase/migrations/0001` through `0006` in order. See
   `supabase/migrations/README.md` — that directory is the single source of
   truth for the schema. These have not yet been run against a live database;
   apply them to a Supabase branch first.

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📈 SEO Strategy

Nestiq uses a Programmatic SEO engine to generate ~130,000 location pages.
- **Dynamic Routes**: `app/(marketing)/properties-for-sale/[...slug]`
- **Metadata**: Dynamic generation with canonicals and rich schema.
- **ISR**: 24-hour revalidation for long-tail pages; build-time generation for top 200 UK towns.

> Status: the routes and templates exist; the location dataset is not yet
> populated, so the 130k figure is the target, not the current state.

## 🤖 AI Features

- **Listing Generator**: Agents get compliant, SEO-ready descriptions via Claude 3.5.
- **Natural Language Search**: Consumers can search via prompts (e.g., "3 bed house in Leeds with a large garden under £400k").
- **Lead Scoring**: Automated intent analysis to prioritize hot leads for agents.

## 📜 Compliance

The schema models UK National Trading Standards Material Information Parts A, B
and C (`supabase/migrations/0005_material_information.sql`) and derives a
per-listing `completeness_score`. Capture UI in the agent portal is still to be
built, so no claim of full compliance should be made publicly yet.

## ⚠️ Known state

- `next.config.ts` sets `typescript.ignoreBuildErrors` and
  `eslint.ignoreDuringBuilds`. Run `npm run typecheck` to see what that hides
  (54 errors at last count, down from 185). Turn the flag off once it reaches zero.
- The agent portal is largely presentational: only `agent/dashboard` reads real
  data. The buyer account area is a stub.
- `lib/scrapers/` is not wired to anything user-facing and should not be until
  the seeding model in the launch plan is implemented.

## 🚀 Deployment

Nestiq is designed for Vercel deployment.
- PPR is **not** currently enabled (it needs a Next.js canary); `next.config.ts`
  is the authority on what is actually switched on.
- Set up Webhooks in Supabase to point to `/api/algolia/sync` for real-time indexing.

---

**Find Home. Fair and Fast.**  
© 2026 Nestiq Ltd.
