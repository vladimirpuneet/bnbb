"use client";

import { create } from "zustand";
import { property, defaultBookingMessage, buildWhatsappLink } from "@/lib/property";

interface BookingState {
  isOpen: boolean;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  open: () => void;
  close: () => void;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  setGuests: (v: string) => void;
  setName: (v: string) => void;
  /** Build the WhatsApp message + URL using current form state */
  getBookingUrl: () => string;
  /** One-tap booking with default message (no form fill needed) */
  quickBook: () => string;
}

export const useBooking = create<BookingState>((set, get) => ({
  isOpen: false,
  checkIn: "",
  checkOut: "",
  guests: "2",
  name: "",
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setCheckIn: (v) => set({ checkIn: v }),
  setCheckOut: (v) => set({ checkOut: v }),
  setGuests: (v) => set({ guests: v }),
  setName: (v) => set({ name: v }),
  getBookingUrl: () => {
    const s = get();
    const msg = defaultBookingMessage({
      checkIn: s.checkIn || undefined,
      checkOut: s.checkOut || undefined,
      guests: s.guests || undefined,
    });
    const finalMsg = s.name ? `Hi ${property.host.name}! I'm ${s.name}.\n\n${msg.replace(/^Hi .*! 👋\n\n/, "")}` : msg;
    return buildWhatsappLink(finalMsg);
  },
  quickBook: () => buildWhatsappLink(defaultBookingMessage({ guests: get().guests || undefined })),
}));
