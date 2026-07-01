"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { useBooking } from "./use-booking";
import { property } from "@/lib/property";

export function BookingModal() {
  const {
    isOpen,
    close,
    checkIn,
    checkOut,
    guests,
    name,
    setCheckIn,
    setCheckOut,
    setGuests,
    setName,
    getBookingUrl,
  } = useBooking();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    const url = getBookingUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  const handleQuickBook = () => {
    const url = useBooking.getState().quickBook();
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden gap-0">
        {/* Header banner */}
        <div className="relative h-32 sm:h-40 overflow-hidden">
          <img
            src="/images/img-03.jpeg"
            alt="Valley view"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/10" />
          <DialogHeader className="relative p-5 sm:p-6 pb-0">
            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-primary-foreground drop-shadow-md">
              Book your stay
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/85 mt-1">
              {property.name} · {property.location}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="check-in" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon name="calendar" className="inline h-3.5 w-3.5 mr-1" />
                Check-in
              </Label>
              <Input
                id="check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="check-out" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon name="calendar" className="inline h-3.5 w-3.5 mr-1" />
                Check-out
              </Label>
              <Input
                id="check-out"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          {/* Guests + name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="guests" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon name="users" className="inline h-3.5 w-3.5 mr-1" />
                Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={property.houseRules.maxGuests}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-background"
              />
            </div>
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
          </div>

          {/* Info banner */}
          <div className="rounded-lg bg-accent/60 border border-accent-foreground/10 p-3 flex items-start gap-2.5">
            <Icon name="message" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-accent-foreground/90 leading-relaxed">
              Booking is confirmed directly with the host via WhatsApp. Tapping <strong>Request booking</strong> opens WhatsApp with a pre-filled enquiry to <strong>{property.whatsappDisplay}</strong>.
            </div>
          </div>

          {/* Max guests hint */}
          <div className="flex items-center justify-between text-xs">
            <Badge variant="secondary" className="rounded-full font-normal">
              Max {property.houseRules.maxGuests} guests
            </Badge>
            <span className="text-muted-foreground">
              <Icon name="clock" className="inline h-3 w-3 mr-1" />
              Host responds within an hour
            </span>
          </div>
        </div>

        <DialogFooter className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex-col sm:flex-col gap-2 items-stretch">
          <Button
            size="lg"
            className="w-full h-12 bg-[#25D366] hover:bg-[#1da851] text-white font-medium shadow-md shadow-[#25D366]/20"
            onClick={handleSubmit}
          >
            <Icon name="message" className="h-5 w-5 mr-2" strokeWidth={2} />
            Request booking on WhatsApp
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={handleQuickBook}
          >
            Skip form &amp; chat directly →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
