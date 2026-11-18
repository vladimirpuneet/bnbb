# The Valley Gaze Penthouse

Direct-booking showcase website for **The Valley Gaze Penthouse**, a 3BHK vacation rental in BhagwantPur, Dehradun (40 mins from Mussoorie). Built as a statically exported Next.js app that converts visitors via pre-filled WhatsApp booking enquiries (`https://wa.me/...`) to avoid OTA commissions.

**Live site:** https://www.valleygaze.homes

---

## Tech Stack

- **Framework:** Next.js `16` (App Router, `output: "export"`), React `19`, TypeScript `5`
- **Package Manager:** Bun (`bun.lock`)
- **Styling & UI:** Tailwind CSS `4`, Radix UI primitives, Framer Motion, `lucide-react`, `sonner`, `react-day-picker`
- **State Management:** Zustand (`src/components/site/use-booking.ts`)
- **Fonts:** `Inter`, `Playfair_Display`, `DM_Sans` via `next/font/google`
- **Analytics & SEO:** GA4 (`@next/third-parties/google`), Google Ads (`AW-7868293897`), Meta Pixel, Schema.org `LodgingBusiness` JSON-LD, PWA manifest & service worker

---

## Project Structure

```text
├── public/
│   ├── images/               # WebP property photos (hall, terrace, bedrooms, kitchen, bathroom)
│   ├── manifest.webmanifest  # PWA manifest
│   ├── robots.txt            # Crawler rules & sitemap reference
│   └── sitemap.xml           # Static XML sitemap
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout, SEO metadata, fonts, StructuredData, GA4/Ads/Meta Pixel
│   │   ├── page.tsx          # Single-page landing experience
│   │   ├── globals.css       # Tailwind & theme tokens
│   │   └── whatsapp/page.tsx # Client redirect to `/` that auto-opens the booking modal
│   ├── components/
│   │   ├── site/             # Landing sections, BookingModal, PricingEstimator, Lightbox, WeatherWidget, etc.
│   │   └── ui/               # Reusable Radix/Tailwind UI primitives
│   └── lib/
│       ├── property.ts       # Single source of truth for property info, pricing, reviews, gallery & WhatsApp links
│       ├── i18n.ts           # Centralized UI copy strings (`t(key)`)
│       └── tracking.ts       # Unified GA4 + Meta Pixel event helper
├── marketing/                # Marketing strategy, tracking/retargeting playbooks, and Local SEO SOP
├── agents.md                 # Agent instructions & account routing rules
└── next.config.ts            # Static export configuration (`output: "export"`)
```

---

## Getting Started

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

### Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
```

> Note: The Google Ads tag (`AW-7868293897`) is loaded directly in `src/app/layout.tsx`.

### Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start Next.js development server on port `3000` |
| `bun run build` | Build static production export into `out/` |
| `bun run start` | Serve the static export (`npx serve out`) |
| `bun run lint` | Run ESLint across the repository |

---

## Content & Marketing Docs

- **Property content, pricing, and reviews:** Edit `src/lib/property.ts` (all sections read from this single file).
- **UI copy:** Edit `src/lib/i18n.ts`.
- **Marketing docs:** See `marketing/Strategy.md`, `marketing/Implementation.md`, `marketing/Improvement.md`, and `marketing/Local_SEO_SOP.md`.
