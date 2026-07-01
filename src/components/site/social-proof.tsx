"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";

/**
 * Recent booking activity data — simulates live booking signals.
 * In production this would come from the booking API; here we use
 * realistic Indian names + cities + relative time to create social proof.
 */
const recentBookings = [
  { name: "Aarav", city: "Delhi", nights: 2, guests: 4, time: "12 minutes ago" },
  { name: "Isha", city: "Mumbai", nights: 3, guests: 2, time: "1 hour ago" },
  { name: "Kabir", city: "Bengaluru", nights: 5, guests: 6, time: "3 hours ago" },
  { name: "Sara", city: "Pune", nights: 2, guests: 2, time: "5 hours ago" },
  { name: "Vivaan", city: "Jaipur", nights: 4, guests: 3, time: "7 hours ago" },
  { name: "Ananya", city: "Chandigarh", nights: 2, guests: 5, time: "Yesterday" },
  { name: "Reyansh", city: "Lucknow", nights: 3, guests: 2, time: "Yesterday" },
  { name: "Diya", city: "Ahmedabad", nights: 6, guests: 4, time: "2 days ago" },
];

const viewers = [
  { count: 7, label: "7 people viewing" },
  { count: 12, label: "12 people viewing" },
  { count: 5, label: "5 people viewing" },
  { count: 9, label: "9 people viewing" },
  { count: 15, label: "15 people viewing" },
];

export function SocialProof() {
  const [currentBooking, setCurrentBooking] = useState(0);
  const [viewerCount, setViewerCount] = useState(7);
  const [visible, setVisible] = useState(false);

  // Rotate through recent bookings
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const bookingTimer = setInterval(() => {
      setCurrentBooking((i) => (i + 1) % recentBookings.length);
    }, 8000);
    return () => clearInterval(bookingTimer);
  }, [visible]);

  // Randomize viewer count
  useEffect(() => {
    if (!visible) return;
    const viewerTimer = setInterval(() => {
      setViewerCount(viewers[Math.floor(Math.random() * viewers.length)].count);
    }, 12000);
    return () => clearInterval(viewerTimer);
  }, [visible]);

  // Auto-dismiss after 45 seconds, then re-show
  useEffect(() => {
    if (!visible) return;
    const dismissTimer = setTimeout(() => setVisible(false), 45000);
    const reshowTimer = setTimeout(() => setVisible(true), 60000);
    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(reshowTimer);
    };
  }, [visible]);

  const booking = recentBookings[currentBooking];

  return (
    <>
      {/* Recently booked toast — bottom left */}
      <div
        className={`fixed left-4 bottom-20 sm:bottom-6 z-30 transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        role="status"
        aria-live="polite"
      >
        <Card className="border-border/70 shadow-xl shadow-black/10 backdrop-blur-md bg-background/95 p-0 max-w-[320px]">
          <div className="flex items-start gap-3 p-3 sm:p-4">
            <span className="grid place-items-center h-10 w-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Icon name="check" className="h-5 w-5" strokeWidth={3} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-semibold text-sm text-foreground">
                  {booking.name} from {booking.city}
                </span>
                <Badge variant="outline" className="rounded-full text-[9px] font-normal py-0 px-1.5 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shrink-0">
                  Booked
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {booking.nights} night{booking.nights > 1 ? "s" : ""} · {booking.guests} guest{booking.guests > 1 ? "s" : ""} · {booking.time}
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5"
              aria-label="Dismiss"
            >
              <Icon name="x" className="h-3.5 w-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* Viewer count badge — top of page, appears on scroll */}
      <ViewerCounter viewerCount={viewerCount} visible={visible} />
    </>
  );
}

function ViewerCounter({ viewerCount, visible }: { viewerCount: number; visible: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show || !visible) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-20 z-30 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="inline-flex items-center gap-2 rounded-full bg-background/95 backdrop-blur-md border border-border/70 shadow-lg px-3.5 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-foreground">
          {viewerCount} people viewing this property
        </span>
      </div>
    </div>
  );
}
