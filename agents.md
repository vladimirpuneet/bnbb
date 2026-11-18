# Agent Context & Instructions

## Google Account & Saved URLs
- **Google Account Preference:** Always use the **Daksh Thakur** (`dakshthakur1510@gmail.com`) Google account when performing browser automation or accessing Google properties (Google Ads, Google Search Console, Analytics, etc.).
- **Technical Requirement:** To bypass the default logged-in account and force Daksh's profile, ALWAYS append `/u/1/` immediately after the domain/TLD on Google URLs:
  - **Google Search Console:** `https://search.google.com/u/1/search-console?resource_id=https%3A%2F%2Fwww.valleygaze.homes%2F`
  - **Google Ads:** `https://ads.google.com/u/1/`
  - **Google Analytics (GA4):** `https://analytics.google.com/u/1/`
- **Live Website:** `https://www.valleygaze.homes/`

## Repository Context
- **Stack:** Next.js 16 (App Router, static export via `output: "export"`), React 19, TypeScript, Tailwind CSS 4, Bun.
- **Single Source of Truth:** All property content, pricing logic, reviews, gallery items, and WhatsApp link builders live in `src/lib/property.ts`. UI copy lives in `src/lib/i18n.ts`.
- **Core Lead Funnel:** Frictionless inbound WhatsApp enquiries (`wa.me/918800311966`) — outbound automated WhatsApp blasts are explicitly rejected (see `marketing/Improvement.md`).
- **Tracking:** Unified GA4 + Meta Pixel events are handled in `src/lib/tracking.ts`; Google Ads tag (`AW-7868293897`) is loaded in `src/app/layout.tsx`.

## Marketing Context
- All marketing strategy, tracking/retargeting implementation playbooks, Local SEO SOPs, and future improvements live in `marketing/` (`Strategy.md`, `Implementation.md`, `Improvement.md`, `Local_SEO_SOP.md`). Review these files before making major marketing changes.
- **Google Ads Guardrail:** Prioritize hotel/homestay travelers and keep real-estate buyer queries (flats, plots, property-for-sale terms) blocked via Negative Keyword Themes.
