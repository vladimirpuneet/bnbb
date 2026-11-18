# Tracking & Campaign Implementation Guide

This document summarizes the active website tracking setup and the step-by-step playbook for the "Water Canister" Meta Retargeting campaign.

---

## Active Website Tracking (Implemented)

| Platform | Configuration | Tracked Events |
| :--- | :--- | :--- |
| **Google Analytics 4** | Loaded via `@next/third-parties/google` using `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `src/app/layout.tsx` | Page views + custom events via `trackEvent()` in `src/lib/tracking.ts` |
| **Google Ads** | Tag `AW-7868293897` loaded in `src/app/layout.tsx` | `whatsapp_enquiry` fired via `sendGAEvent()` in `booking-modal.tsx` and `pricing-estimator.tsx` |
| **Meta Pixel** | Loaded via `src/components/site/meta-pixel.tsx` using `NEXT_PUBLIC_META_PIXEL_ID` | `PageView` on load; mapped via `src/lib/tracking.ts`: `begin_booking` -> `InitiateCheckout`, `submit_booking` & `outbound_ota_click` -> `Lead`, `view_gallery` & `get_directions` -> `ViewContent` |
| **Google Search Console** | Verified via `<meta name="google-site-verification">` in `src/app/layout.tsx` | Sitemap submitted at `https://valleygaze.homes/sitemap.xml` (`public/sitemap.xml`) |

---

# Meta Ads Retargeting Boilerplate

This is the playbook for setting up the "Water Canister" retargeting campaign on Meta (Facebook/Instagram).
Our goal is to **only** show ads to people who visited the site, looked around, but left without messaging on WhatsApp.

---

## Step 1: Create the Custom Audiences
Go to Meta Ads Manager -> **Audiences** tool:

### Audience A (The Warm Leads)
*   **Source:** Website (Your Pixel)
*   **Event:** `ViewContent` (or "All Website Visitors") in the past 7 days.
*   **Name:** `Website Visitors - 7 Days`

### Audience B (The Converted)
*   **Source:** Website (Your Pixel)
*   **Event:** `Lead` (This fires when they click the WhatsApp button) in the past 7 days.
*   **Name:** `WhatsApp Leads - 7 Days`

---

## Step 2: Campaign Setup
Create a new campaign in Meta Ads Manager.

*   **Campaign Objective:** Traffic (or Reach). 
    *   *CMO Note: Because your retargeting audience is incredibly small, choosing "Leads" will cause Facebook's algorithm to freeze in the "Learning Phase". We use Traffic just to force delivery to the tiny audience we manually filtered.*
*   **Daily Budget:** Extremely low (e.g., ₹50 to ₹100 / day).

---

## Step 3: Ad Set (The Secret Sauce)

*   **Custom Audiences:** 
    *   **INCLUDE:** `Website Visitors - 7 Days` (Audience A)
    *   **EXCLUDE:** `WhatsApp Leads - 7 Days` (Audience B)
*   **Location:** India (or specific cities like Delhi NCR)
*   **Age:** 25-50
*   **Placements:** Advantage+ Placements (Instagram Stories/Feed perform best).

*Why this works: You are explicitly telling Facebook NOT to waste your daily budget showing ads to people who have already messaged you. You are exclusively targeting the stragglers.*

---

## Step 4: Ad Creative & Copy

### Visual (The Creative)
Use a carousel of your 3 best photos (e.g., Master Bedroom view, luxury bathroom, terrace at sunset).

### The Ad Copy
**Primary Text:**
> Still thinking about that Dehradun getaway? 🏔️
> 
> The Valley Gaze Penthouse books out fast for long weekends. Don't miss out on waking up to panoramic mountain views from your bed.
> 
> 🤫 **Secret Offer:** Tap "Send Message" below to chat with me on WhatsApp, and I'll unlock a hidden 15% discount if you book 3 nights or more for a workcation.

**Headline:** Unlock 15% Off Your Stay
**Call to Action:** Send WhatsApp Message

---

## Final Review
Keep an eye on the dashboard. You should see very low reach but high conversion rate. You are paying pennies to follow up with warm leads!
