# NESTIQ Property Portal

NESTIQ is a high-authority, production-grade UK property marketplace built to challenge traditional portals with superior editorial design, AI-driven discovery, and programmatic SEO architecture.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, PPR, ISR)
- **Styling**: Tailwind CSS v3 (Custom Editorial Design System)
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
   Run the SQL provided in `supabase/schema.sql` within your Supabase SQL Editor.

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📈 SEO Strategy

Nestiq uses a Programmatic SEO engine to generate ~130,000 location pages.
- **Dynamic Routes**: `app/(marketing)/properties-for-sale/[...slug]`
- **Metadata**: Dynamic generation with canonicals and rich schema.
- **ISR**: 24-hour revalidation for long-tail pages; build-time generation for top 200 UK towns.

## 🤖 AI Features

- **Listing Generator**: Agents get compliant, SEO-ready descriptions via Claude 3.5.
- **Natural Language Search**: Consumers can search via prompts (e.g., "3 bed house in Leeds with a large garden under £400k").
- **Lead Scoring**: Automated intent analysis to prioritize hot leads for agents.

## 📜 Compliance

Fully compliant with UK National Trading Standards (Parts A, B, and C) regarding Material Information disclosures.

## 🚀 Deployment

Nestiq is designed for Vercel deployment. 
- Ensure `PPR` is enabled for high-performance edge rendering.
- Set up Webhooks in Supabase to point to `/api/algolia/sync` for real-time indexing.

---

**Find Home. Fair and Fast.**  
© 2026 Nestiq Ltd.
