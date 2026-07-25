import { property } from "@/lib/property";

/**
 * JSON-LD structured data for SEO.
 * Uses schema.org LodgingBusiness (more specific than LocalBusiness)
 * with nested Offer, AggregateRating, Review, and Place.
 *
 * Rendered server-side in layout.tsx as a <script type="application/ld+json">.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://valley-gaze.example.com/#lodging",
    name: property.name,
    description: property.description,
    image: property.allImages.map((src) => `https://valley-gaze.example.com${src}`),
    url: "https://valley-gaze.example.com",
    telephone: `+${property.whatsappNumber}`,
    starRating: {
      "@type": "Rating",
      ratingValue: property.hero.rating.toString(),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: property.hero.rating.toString(),
      reviewCount: property.hero.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.geo.lat.toString(),
      longitude: property.geo.lng.toString(),
    },
    amenityFeature: property.amenities.slice(0, 12).map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: true,
    })),
    numberOfRooms: property.bedrooms.length,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: property.houseRules.maxGuests,
      unitCode: "C62",
    },
    checkinTime: "15:00",
    checkoutTime: "11:00",
    petsAllowed: true,
    isAccessibleForFree: true,
    publicAccess: true,
    slogan: property.tagline,
    knowsAbout: [
      "Mountain view stays",
      "Valley view accommodation",
      "Family-friendly lodging",
      "Pet-friendly stays",
    ],
    review: property.reviews.items.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.author,
      },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.text,
    })),
    host: {
      "@type": "Person",
      name: property.host.name,
      description: property.host.bio,
      image: `https://valley-gaze.example.com${property.host.image}`,
      jobTitle: "Superhost",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
