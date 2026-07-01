import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Gallery } from "@/components/site/gallery";
import { Overview } from "@/components/site/overview";
import { PricingEstimator } from "@/components/site/pricing-estimator";
import { TheSpace } from "@/components/site/the-space";
import { Bedrooms } from "@/components/site/bedrooms";
import { Amenities } from "@/components/site/amenities";
import { WeatherSection } from "@/components/site/weather-widget";
import { Reviews } from "@/components/site/reviews";
import { Location } from "@/components/site/location";
import { Host } from "@/components/site/host";
import { HouseRules } from "@/components/site/house-rules";
import { Faq } from "@/components/site/faq";
import { BookingCta } from "@/components/site/booking-cta";
import { Footer } from "@/components/site/footer";
import { BookingModal } from "@/components/site/booking-modal";
import { Lightbox } from "@/components/site/lightbox";
import { MobileBookingBar } from "@/components/site/mobile-booking-bar";
import { FloatingActions } from "@/components/site/floating-actions";
import { ScrollProgress } from "@/components/site/scroll-progress";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Gallery />
        <Overview />
        <PricingEstimator />
        <TheSpace />
        <Bedrooms />
        <Amenities />
        <WeatherSection />
        <Reviews />
        <Location />
        <Host />
        <HouseRules />
        <Faq />
        <BookingCta />
      </main>
      <Footer />

      {/* Overlays */}
      <BookingModal />
      <Lightbox />
      <MobileBookingBar />
      <FloatingActions />
    </div>
  );
}
