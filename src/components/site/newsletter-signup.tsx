"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { toast } from "sonner";
import { property } from "@/lib/property";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      toast.success("Subscribed! 🎉", {
        description: "You'll receive updates on offers, availability, and local events.",
        duration: 5000,
      });
      setEmail("");
    }, 800);
  };

  return (
    <section id="newsletter" className="py-16 sm:py-20 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/20 overflow-hidden relative">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

            <CardContent className="relative p-6 sm:p-10 lg:p-12">
              <div className="grid sm:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-center">
                {/* Left: Copy */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                      <Icon name="message" className="h-5 w-5" />
                    </span>
                    <Badge variant="outline" className="rounded-full border-primary/30 text-primary text-xs">
                      Stay in the loop
                    </Badge>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-balance">
                    Get notified about{" "}
                    <span className="italic font-normal text-muted-foreground">offers &amp; availability</span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                    Subscribe for occasional updates on seasonal discounts, last-minute availability, and local events in Dehradun. No spam — unsubscribe anytime.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="check" className="h-3.5 w-3.5 text-emerald-500" strokeWidth={3} />
                      Monthly newsletter
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="check" className="h-3.5 w-3.5 text-emerald-500" strokeWidth={3} />
                      Offer alerts
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="check" className="h-3.5 w-3.5 text-emerald-500" strokeWidth={3} />
                      Local event tips
                    </span>
                  </div>
                </div>

                {/* Right: Form */}
                <div>
                  {subscribed ? (
                    <div className="text-center py-8">
                      <span className="grid place-items-center h-16 w-16 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-4">
                        <Icon name="check" className="h-8 w-8" strokeWidth={3} />
                      </span>
                      <h3 className="font-display text-xl font-semibold mb-1">You're subscribed!</h3>
                      <p className="text-sm text-muted-foreground">
                        Watch your inbox for updates from {property.host.name}.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 text-muted-foreground"
                        onClick={() => setSubscribed(false)}
                      >
                        Subscribe another email
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1.5">
                        <label htmlFor="newsletter-email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Email address
                        </label>
                        <Input
                          id="newsletter-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background h-12"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md shadow-primary/20 group"
                      >
                        {loading ? (
                          <>
                            <Icon name="clock" className="h-5 w-5 mr-2 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Icon name="arrowRight" className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                            Subscribe
                          </>
                        )}
                      </Button>
                      <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                        By subscribing, you agree to receive emails from {property.name}. We respect your privacy.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
