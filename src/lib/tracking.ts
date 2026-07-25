import { sendGAEvent } from "@next/third-parties/google";

/**
 * Sends an event to GA4 and conditionally fires a mapped Meta Pixel event
 * if the Facebook Pixel is loaded on the page.
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  // 1. Send GA4 Event
  sendGAEvent("event", eventName, params);

  // 2. Map GA4 event names to standard Meta Pixel events
  if (typeof window !== "undefined" && (window as any).fbq) {
    let fbEvent = "CustomEvent"; // Fallback to custom event
    let isCustom = true;

    if (eventName === "begin_booking") {
      fbEvent = "InitiateCheckout";
      isCustom = false;
    } else if (eventName === "submit_booking") {
      fbEvent = "Lead"; // Or "Purchase" depending on how strict we are
      isCustom = false;
    } else if (eventName === "outbound_ota_click") {
      fbEvent = "Lead"; // Sending them to OTA is effectively generating a lead
      isCustom = false;
    } else if (eventName === "view_gallery" || eventName === "get_directions") {
      fbEvent = "ViewContent";
      isCustom = false;
    }

    if (isCustom) {
      (window as any).fbq("trackCustom", eventName, params);
    } else {
      (window as any).fbq("track", fbEvent, params);
    }
  }
}
