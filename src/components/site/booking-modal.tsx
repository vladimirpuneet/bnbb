"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { DateCalendar } from "./date-calendar";
import { useBooking } from "./use-booking";
import { property } from "@/lib/property";
import { trackEvent } from "@/lib/tracking";
import { sendGAEvent } from "@next/third-parties/google";

export function BookingModal() {
  const {
    isOpen,
    close,
    checkIn,
    checkOut,
    guests,
    name,
    quote,
    setCheckIn,
    setCheckOut,
    setGuests,
    setName,
    getBookingUrl,
  } = useBooking();

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const handleSubmit = () => {
    trackEvent("submit_booking", {
      value: quote?.total || 0,
      currency: "INR",
      guests: guests,
      nights: quote?.nights || 0,
    });
    // Fire Google Ads conversion tracking
    sendGAEvent({ event: "whatsapp_enquiry", send_to: "AW-7868293897" });
    
    const url = getBookingUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    close();
    toast.success("Booking enquiry sent!", {
      description: `WhatsApp opened for ${property.host.name}. They usually respond within an hour.`,
      duration: 6000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden gap-0 max-h-[92vh] overflow-y-auto scrollbar-thin">
        {/* Header banner */}
        <div className="relative h-32 sm:h-40 overflow-hidden shrink-0">
          <img
            src="/images/terrace/gallery-01.webp"
            alt="Valley view"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/15" />
          <DialogHeader className="relative p-5 sm:p-6 pb-0">
            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-primary-foreground drop-shadow-md">
              Book your stay
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/90 mt-1">
              {property.name} · {property.location}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Visual date calendar */}
          <DateCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />

          {/* Guests */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Icon name="users" className="inline h-3.5 w-3.5 mr-1" />
              Guests
            </Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-full shrink-0"
                onClick={() => setGuests(String(Math.max(1, parseInt(guests || "1", 10) - 1)))}
                aria-label="Decrease guests"
              >
                −
              </Button>
              <Input
                id="guests"
                type="number"
                min={1}
                max={property.houseRules.maxGuests}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-background text-center font-medium"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-full shrink-0"
                onClick={() => setGuests(String(Math.min(property.houseRules.maxGuests, parseInt(guests || "1", 10) + 1)))}
                aria-label="Increase guests"
              >
                +
              </Button>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Icon name="users" className="inline h-3.5 w-3.5 mr-1" />
              Your name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Optional"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background"
            />
          </div>

          {/* Info banner */}
          <div className="rounded-lg bg-accent/60 border border-accent-foreground/10 p-3 flex items-start gap-2.5">
            <Icon name="message" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-accent-foreground/90 leading-relaxed">
              Tapping <strong>Send enquiry</strong> opens WhatsApp with your dates and guest details pre-filled. Daksh will confirm availability and share the best price directly.
            </div>
          </div>

          {/* Max guests hint */}
            <div className="flex items-center justify-between text-xs">
              <Badge variant="secondary" className="rounded-full font-normal">
                Max {property.houseRules.maxGuests} guests
              </Badge>
              <span className="text-muted-foreground">
                <Icon name="clock" className="inline h-3 w-3 mr-1" />
                Responds within an hour
              </span>
            </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex flex-col gap-2 items-stretch">
          <Button
            size="lg"
            className="w-full h-12 bg-[#25D366] hover:bg-[#1da851] text-white font-medium shadow-md shadow-[#25D366]/20"
            onClick={handleSubmit}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.79 0-3.46-.46-4.91-1.27l-.35-.21-2.87.85.85-2.87-.21-.35A7.963 7.963 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            Send enquiry on WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
