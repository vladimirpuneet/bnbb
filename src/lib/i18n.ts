export const strings = {
  // Navbar
  "nav.photos": "Photos",
  "nav.pricing": "Pricing",
  "nav.amenities": "Amenities",
  "nav.reviews": "Reviews",
  "nav.location": "Location",
  "nav.faq": "FAQ",
  "nav.bookNow": "Book Now",
  "nav.share": "Share",
  "nav.save": "Save",
  "nav.saved": "Saved",
  "nav.airbnb": "Airbnb",

  // Hero
  "hero.entirePenthouse": "Penthouse",
  "hero.bookStay": "Book your stay",
  "hero.viewPhotos": "View all photos",
  "hero.photos": "photos",
  "hero.guests": "guests",
  "hero.bedrooms": "bedrooms",
  "hero.beds": "beds",
  "hero.baths": "baths",
  "hero.scroll": "Scroll",
  "hero.from": "From",
  "hero.perNight": "/ night",
  "hero.reviews": "reviews",

  // Section headers
  "section.gallery.eyebrow": "The Gallery",
  "section.gallery.title": "A glimpse of the valley",
  "section.gallery.desc": "Every room opens to a frame of greenery. Tap any photo to explore the full gallery.",
  "section.gallery.showAll": "Show all photos",

  "section.overview.eyebrow": "Welcome to your retreat",
  "section.overview.highlights": "Listing highlights",

  "section.pricing.eyebrow": "Get a quote",
  "section.pricing.title": "Plan your stay —",
  "section.pricing.titleSuffix": "get an instant quote",
  "section.pricing.desc": "Pick your dates and guest count, then get a personalised quote directly from the host on WhatsApp. No hidden fees, no platform commissions.",
  "section.pricing.bookDates": "Book these dates",
  "section.pricing.yourEstimate": "Your estimate",
  "section.pricing.total": "Total",
  "section.pricing.cleaningFee": "Cleaning fee",
  "section.pricing.serviceFee": "Service fee",
  "section.pricing.waived": "Waived",
  "section.pricing.perNight": "per night",

  "section.reviews.eyebrow": "Guest experiences",
  "section.reviews.title": "Loved by guests",
  "section.reviews.desc": "Real feedback from travellers who've stayed at The Valley Gaze Penthouse.",
  "section.reviews.outOf5": "out of 5",
  "section.reviews.showMore": "Show more reviews",
  "section.reviews.showFewer": "Show fewer reviews",
  "section.reviews.showing": "Showing",
  "section.reviews.of": "of",
  "section.reviews.readAll": "Read all",
  "section.reviews.reviewsOnAirbnb": "reviews on Airbnb",

  "section.faq.eyebrow": "Good to know",
  "section.faq.title": "Frequently asked questions",

  "section.book.title": "Book your valley escape today",
  "section.book.desc": "Skip the platform fees. Reserve directly with the host via WhatsApp — instant responses, best rates, and a personal touch.",
  "section.book.chat": "Chat on WhatsApp",

  "section.overview.title": "Where the valley holds its breath,",
  "section.overview.titleSuffix": "and so will you.",

  "section.space.eyebrow": "Inside the penthouse",
  "section.space.title": "Designed to feel like home",
  "section.space.desc": "Three cozy rooms, a spacious hall and a fully equipped kitchen — laid out for both privacy and togetherness.",

  "section.bedrooms.eyebrow": "Where you'll sleep",
  "section.bedrooms.title": "Three cozy rooms, each with a king bed",
  "section.bedrooms.desc": "Two rooms feature attached washrooms; the third shares a common washroom connected to the hall. All rooms open directly into the spacious hall.",

  "section.amenities.eyebrow": "What this place offers",
  "section.amenities.title": "Everything you need for a comfortable stay",
  "section.amenities.desc": "From sweeping valley views to a fully equipped kitchen and lift access — 40+ amenities thoughtfully provided.",

  "section.weather.eyebrow": "Plan your visit",
  "section.weather.title": "Pleasant weather,",
  "section.weather.titleSuffix": "year-round.",

  "section.host.eyebrow": "Meet your host",
  "section.host.title": "Daksh Thakur — your Superhost",
  "section.host.desc": "Experienced, responsive and committed to making your stay memorable.",

  "section.rules.eyebrow": "Things to know",
  "section.rules.title": "House rules & stay details",
  "section.rules.desc": "A few gentle guidelines that keep every guest's stay peaceful and pleasant.",

  "section.location.eyebrow": "Where you'll be",
  "section.location.title": "BhagwantPur, Dehradun",
  "section.location.desc": "Perched above the Doon valley with easy access to Mussoorie and Dehradun's most-loved natural escapes.",

  // Booking modal
  "booking.title": "Book your stay",
  "booking.checkin": "Check-in",
  "booking.checkout": "Check-out",
  "booking.guests": "Guests",
  "booking.yourName": "Your name",
  "booking.addDate": "Add date",
  "booking.estimatedQuote": "Estimated quote",
  "booking.requestBooking": "Request booking",
  "booking.requestBookingOnWhatsApp": "Request booking on WhatsApp",
  "booking.skipForm": "Skip form & chat directly",
  "booking.maxGuests": "Max",
  "booking.minNights": "nights",
  "booking.responds": "Responds within an hour",
  "booking.selectDates": "Select check-in & check-out dates to see an instant price estimate.",

  // Footer
  "footer.explore": "Explore",
  "footer.details": "Property details",
  "footer.rights": "All rights reserved.",
  "footer.crafted": "Crafted with",
  "footer.inDoon": "in the Doon Valley",
} as const;

export type StringKey = keyof typeof strings;

export function t(key: StringKey): string {
  return strings[key];
}
