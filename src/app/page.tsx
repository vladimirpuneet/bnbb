import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Gallery } from "@/components/site/gallery";
import { Overview } from "@/components/site/overview";
import { PricingEstimator } from "@/components/site/pricing-estimator";
import { ComparisonTable } from "@/components/site/comparison-table";
import { TheSpace } from "@/components/site/the-space";
import { Bedrooms } from "@/components/site/bedrooms";
import { Amenities } from "@/components/site/amenities";
import { WeatherSection } from "@/components/site/weather-widget";
import { GuestLove } from "@/components/site/guest-love";
import { Reviews } from "@/components/site/reviews";
import { Location } from "@/components/site/location";
import { Host } from "@/components/site/host";
import { HouseRules } from "@/components/site/house-rules";
import { Faq } from "@/components/site/faq";
import { NewsletterSignup } from "@/components/site/newsletter-signup";
import { BookingCta } from "@/components/site/booking-cta";
import { Footer } from "@/components/site/footer";
import { BookingModal } from "@/components/site/booking-modal";
import { Lightbox } from "@/components/site/lightbox";
import { MobileBookingBar } from "@/components/site/mobile-booking-bar";
import { FloatingActions } from "@/components/site/floating-actions";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SectionToc } from "@/components/site/section-toc";
import { SkipLink } from "@/components/site/skip-link";
import { SectionDivider } from "@/components/site/section-divider";
import { KeyboardShortcuts } from "@/components/site/keyboard-shortcuts";
import { SocialProof } from "@/components/site/social-proof";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      <SectionToc />
      <main id="main-content" className="flex-1">
        <Hero />
        <Gallery />
        <SectionDivider variant="wave" color="secondary" />
        <Overview />
        <PricingEstimator />
        <ComparisonTable />
        <SectionDivider variant="mountains" color="background" />
        <TheSpace />
        <Bedrooms />
        <SectionDivider variant="wave" color="secondary" />
        <Amenities />
        <WeatherSection />
        <SectionDivider variant="curve" color="secondary" />
        <GuestLove />
        <Reviews />
        <Location />
        <SectionDivider variant="mountains" color="background" />
        <Host />
        <HouseRules />
        <Faq />
        <NewsletterSignup />
        <BookingCta />
      </main>
      <Footer />

      {/* Overlays */}
      <BookingModal />
      <Lightbox />
      <MobileBookingBar />
      <FloatingActions />
      <KeyboardShortcuts />
      <SocialProof />
    </div>
  );
}
