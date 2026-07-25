"use client";

import { create } from "zustand";
import {
  property,
  defaultBookingMessage,
  buildWhatsappLink,
  calculateQuote,
} from "@/lib/property";

type Quote = ReturnType<typeof calculateQuote>;

interface BookingState {
  isOpen: boolean;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  /** Computed quote — recalculated whenever inputs change */
  quote: Quote | null;
  quoteError: string | null;
  open: () => void;
  close: () => void;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  setGuests: (v: string) => void;
  setName: (v: string) => void;
  recompute: () => void;
  /** Build the WhatsApp message + URL using current form state */
  getBookingUrl: () => string;
  /** Prefill dates/guests and open the modal */
  prefillAndOpen: (opts: { checkIn?: string; checkOut?: string; guests?: string }) => void;
}

function compute(checkIn: string, checkOut: string, guests: string): { quote: Quote | null; error: string | null } {
  if (!checkIn || !checkOut) return { quote: null, error: null };
  const g = parseInt(guests || "1", 10);
  const quote = calculateQuote({ checkIn, checkOut, guests: isNaN(g) ? 1 : g });
  if (!quote) {
    // Determine the specific error
    const start = new Date(checkIn + "T00:00:00");
    const end = new Date(checkOut + "T00:00:00");
    if (end <= start) return { quote: null, error: "Check-out must be after check-in." };
    const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < property.pricing.minNights) {
      return { quote: null, error: `Minimum ${property.pricing.minNights} nights required (${nights} selected).` };
    }
    return { quote: null, error: "Please pick valid dates." };
  }
  return { quote, error: null };
}

function todayStr(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}
function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export const useBooking = create<BookingState>((set, get) => ({
  isOpen: false,
  checkIn: "",
  checkOut: "",
  guests: "2",
  name: "",
  quote: null,
  quoteError: null,
  open: () => set((s) => ({
    isOpen: true,
    checkIn: s.checkIn || todayStr(),
    checkOut: s.checkOut || tomorrowStr(),
  })),
  close: () => set({ isOpen: false }),
  setCheckIn: (v) => {
    set({ checkIn: v });
    const s = get();
    const { quote, error } = compute(v, s.checkOut, s.guests);
    set({ quote, quoteError: error });
  },
  setCheckOut: (v) => {
    set({ checkOut: v });
    const s = get();
    const { quote, error } = compute(s.checkIn, v, s.guests);
    set({ quote, quoteError: error });
  },
  setGuests: (v) => {
    set({ guests: v });
    const s = get();
    const { quote, error } = compute(s.checkIn, s.checkOut, v);
    set({ quote, quoteError: error });
  },
  setName: (v) => set({ name: v }),
  recompute: () => {
    const s = get();
    const { quote, error } = compute(s.checkIn, s.checkOut, s.guests);
    set({ quote, quoteError: error });
  },
  getBookingUrl: () => {
    const s = get();
    const msg = defaultBookingMessage({
      checkIn: s.checkIn || undefined,
      checkOut: s.checkOut || undefined,
      guests: s.guests || undefined,
    });
    const finalMsg = s.name
      ? `Hi ${property.host.name}! I'm ${s.name}.\n\n${msg.replace(/^Hi .*! 👋\n\n/, "")}`
      : msg;
    return buildWhatsappLink(finalMsg);
  },
  prefillAndOpen: (opts) => {
    const s = get();
    const checkIn = opts.checkIn ?? s.checkIn;
    const checkOut = opts.checkOut ?? s.checkOut;
    const guests = opts.guests ?? s.guests;
    const { quote, error } = compute(checkIn, checkOut, guests);
    set({ checkIn, checkOut, guests, quote, quoteError: error, isOpen: true });
  },
}));
