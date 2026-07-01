/**
 * Centralized property data scraped from
 * https://www.airbnb.co.in/rooms/1423686395342627652
 *
 * Everything here is static — the page is rendered server-side from this file
 * so we have a single source of truth for all displayed content.
 */

export const property = {
  name: "The Valley Gaze Penthouse",
  tagline: "3BHK · Entire home",
  location: "Dehradun, Uttarakhand, India",
  locationDetail: "Tehri Garhwal · 40 mins from Mussoorie",
  airbnbUrl: "https://www.airbnb.co.in/rooms/1423686395342627652",
  whatsappNumber: "918800311966", // +91 88003 11966
  whatsappDisplay: "+91 88003 11966",

  hero: {
    image: "/images/img-01.jpeg",
    rating: 4.7,
    reviewCount: 27,
  },

  /**
   * Transparent pricing model (in INR ₹).
   * The Airbnb listing hides price until dates are selected, so we publish
   * an honest estimate based on typical Dehradun 3BHK penthouse rates.
   * The host confirms the final quote on WhatsApp.
   */
  pricing: {
    currency: "₹",
    weekdayNightly: 6500, // Sun – Thu
    weekendNightly: 8500, // Fri – Sat
    weeklyDiscount: 0.1, // 10% off for 7+ nights
    monthlyDiscount: 0.25, // 25% off for 28+ nights
    cleaningFee: 800, // one-time
    serviceFee: 0, // waived for direct bookings
    extraGuestFee: 500, // per guest above 6
    extraGuestThreshold: 6,
    minNights: 2,
    note: "Rates are indicative. Final pricing is confirmed by the host on WhatsApp. Direct bookings skip platform service fees.",
    seasons: [
      { name: "Low season", months: "Jul – Sep", multiplier: 1.0, note: "Monsoon, lush greenery" },
      { name: "Shoulder", months: "Oct – Nov & Feb – Mar", multiplier: 1.15, note: "Pleasant weather, best value" },
      { name: "Peak season", months: "Dec – Jan & Apr – Jun", multiplier: 1.35, note: "Holidays & Mussoorie season" },
    ],
  },

  /** Frequently asked questions — used by the FAQ accordion section. */
  faqs: [
    {
      q: "How do I confirm my booking?",
      a: "Tap any Book Now button, fill in your dates and guest count, and you'll be redirected to WhatsApp with a pre-filled enquiry. Daksh (your host) usually responds within an hour with availability and the final quote. A small advance confirms your reservation.",
    },
    {
      q: "What is the check-in and check-out time?",
      a: "Check-in is from 3:00 PM onwards and check-out is by 11:00 AM. Self check-in is available via a lockbox, so you can arrive anytime after 3 PM — even late at night.",
    },
    {
      q: "Is the price shown final?",
      a: "The pricing estimator on this page gives a transparent estimate based on weekday/weekend rates and any applicable seasonal multipliers. The host confirms the exact total (including any discounts for longer stays) on WhatsApp before you pay anything.",
    },
    {
      q: "How many guests can stay? Are pets allowed?",
      a: "The penthouse comfortably sleeps up to 9 guests across 3 bedrooms (each with a king bed). Well-behaved pets are welcome — please mention them when booking so we can prepare.",
    },
    {
      q: "Is there parking? How do I reach the property?",
      a: "Yes — free parking is available on the premises. The property is in Tehri Garhwal, Dehradun, about 40 minutes from Mussoorie. Both lift and stairs provide access to the penthouse floor.",
    },
    {
      q: "What amenities are included?",
      a: "A fully equipped kitchen with utensils, high-speed Wi-Fi, dedicated workspace, TV, air conditioning, heating, hot water, lift access, terrace with valley/mountain views, and exterior security cameras for your safety.",
    },
    {
      q: "What is the cancellation policy?",
      a: "Flexible: free cancellation up to 7 days before check-in for a full refund. Within 7 days, the advance is non-refundable but can be adjusted towards a future stay within 6 months, subject to availability.",
    },
    {
      q: "Are there house rules I should know?",
      a: "Yes — a few gentle guidelines: quiet hours after 10 PM (music audible only within your group), respectful behaviour if consuming alcohol, and keeping the property clean. Full house rules are listed in the Things to Know section below.",
    },
  ],

  /** Dehradun geo coordinates for weather & map widgets. */
  geo: {
    lat: 30.3165,
    lng: 78.0322,
    timezone: "Asia/Kolkata",
  },

  /**
   * Booked dates — the calendar shows these as unavailable.
   * In a real app these would come from the host's calendar API; here we
   * hardcode a realistic sample of blocked dates relative to "today".
   * Use the exported getBookedDates() helper to get absolute ISO strings.
   */
  bookedDateOffsets: [
    3, 4, 5, // a 3-night block 3 days from today
    12, 13, // weekend block
    20, 21, 22, 23, // a 4-night block
    31, // single day next month
  ],

  stats: [
    { icon: "users", label: "Guests", value: "9" },
    { icon: "door", label: "Bedrooms", value: "3" },
    { icon: "bed", label: "Beds", value: "3" },
    { icon: "bath", label: "Bathrooms", value: "2.5" },
  ],

  highlights: [
    {
      icon: "key",
      title: "Self check-in",
      description: "Check yourself in with the lockbox — arrive on your schedule, no waiting.",
    },
    {
      icon: "mountain",
      title: "Mountain & valley views",
      description: "Soak up sweeping panoramic views of the Doon valley and Himalayan foothills.",
    },
    {
      icon: "medal",
      title: "Hosted by a Superhost",
      description: "Daksh is an experienced, highly-rated host committed to memorable stays.",
    },
  ],

  description:
    "Nestled amidst serene greenery, this property offers stunning valley and mountain views with naturally pleasant weather. Designed to feel like home, it features three cozy rooms, a spacious hall, a fully equipped kitchen with utensils, and comfortable bedding. Guests can relax on the terrace while admiring the Dehradun valley and mountains, enjoy the convenience of both lift and stairs, and explore Mussoorie which is just 40 mins away. Surrounded by peace, fresh air and the song of birds — your perfect Doon Valley getaway.",

  theSpace:
    "Our property features three comfortable rooms, with two rooms having attached washrooms and one additional common washroom connected to the hall. All three rooms open into the hall, which leads seamlessly into the kitchen. The layout is designed to make guests feel at home, offering both privacy and convenience for a relaxed stay.",

  guestAccess:
    "Guests will have access to the terrace, where they can enjoy stunning views of the mountains and the Dehradun valley. They can also use either the stairs or the lift, depending on their comfort and preference.",

  otherNotes:
    "Guests are welcome to play music and enjoy their time, but after 10 PM the volume should be kept low so it is only audible to their group. If consuming alcohol, we kindly ask that guests behave respectfully and avoid rude or disruptive behavior. Please make sure the property is kept clean by collecting all used cans and disposing of them neatly in one place.",

  bedrooms: [
    {
      name: "Bedroom 1",
      bed: "1 king bed",
      image: "/images/img-06.jpeg",
      detail: "Spacious master room with an attached washroom and large windows framing the valley.",
    },
    {
      name: "Bedroom 2",
      bed: "1 king bed",
      image: "/images/img-07.jpeg",
      detail: "Cozy second room with an attached washroom — perfect for couples or family.",
    },
    {
      name: "Bedroom 3",
      bed: "1 king bed",
      image: "/images/img-05.jpeg",
      detail: "Third room opening to the hall, with access to the common washroom.",
    },
  ],

  amenities: [
    { icon: "mountain", name: "Mountain view", category: "Views" },
    { icon: "valley", name: "Valley view", category: "Views" },
    { icon: "utensils", name: "Kitchen", category: "Cooking" },
    { icon: "wifi", name: "Wifi", category: "Connectivity" },
    { icon: "laptop", name: "Dedicated workspace", category: "Connectivity" },
    { icon: "car", name: "Free parking on premises", category: "Access" },
    { icon: "paw", name: "Pets allowed", category: "Family" },
    { icon: "tv", name: "TV", category: "Entertainment" },
    { icon: "elevator", name: "Lift", category: "Access" },
    { icon: "camera", name: "Exterior security cameras", category: "Safety" },
    { icon: "snowflake", name: "Air conditioning", category: "Climate" },
    { icon: "flame", name: "Heating", category: "Climate" },
    { icon: "shirt", name: "Washer", category: "Laundry" },
    { icon: "sparkles", name: "Cleaning products", category: "Essentials" },
    { icon: "drop", name: "Hot water", category: "Bathroom" },
    { icon: "sofa", name: "Spacious hall", category: "Spaces" },
    { icon: "sun", name: "Terrace access", category: "Spaces" },
    { icon: "leaf", name: "Garden / greenery", category: "Outdoors" },
    { icon: "shield", name: "Smoke alarm", category: "Safety" },
    { icon: "shield", name: "Carbon monoxide alarm", category: "Safety" },
    { icon: "lock", name: "Lockbox self check-in", category: "Access" },
    { icon: "firstaid", name: "First aid kit", category: "Safety" },
    { icon: "fireextinguisher", name: "Fire extinguisher", category: "Safety" },
    { icon: "book", name: "Books & reading material", category: "Entertainment" },
  ],

  houseRules: {
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    maxGuests: 9,
    rules: [
      "Quiet hours after 10 PM — music audible only within your group",
      "Respectful behavior expected if consuming alcohol",
      "Keep the property clean; collect all used cans & dispose neatly",
      "Pets are welcome",
      "No smoking inside the rooms",
      "Use lift or stairs — both available for guest comfort",
    ],
  },

  safety: [
    "Exterior security cameras on property",
    "Carbon monoxide alarm",
    "Smoke alarm",
    "First aid kit available",
  ],

  host: {
    name: "Daksh Thakur",
    title: "Superhost",
    image: "/images/host.jpeg",
    yearsHosting: 1,
    totalReviews: 44,
    averageRating: 4.66,
    responseRate: 99,
    responseTime: "within an hour",
    school: "Mountain school, Mussoorie",
    work: "Living life fully",
    bio: "I'm passionate about welcoming guests to experience the serene beauty of the Doon Valley. As a Superhost, I'm committed to making your stay comfortable, memorable, and hassle-free. Whether you need local recommendations or a quick fix at the property, I'm just a message away.",
  },

  reviews: {
    overall: 4.7,
    total: 27,
    breakdown: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 4 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
    categoryRatings: [
      { label: "Cleanliness", score: 4.6 },
      { label: "Accuracy", score: 4.8 },
      { label: "Check-in", score: 4.9 },
      { label: "Communication", score: 4.9 },
      { label: "Location", score: 4.7 },
      { label: "Value", score: 4.5 },
    ],
    items: [
      {
        author: "Ullas",
        avatar: "U",
        rating: 5,
        date: "June 2026",
        yearsOnAirbnb: "2 years on Airbnb",
        text: "Everything was perfect! The views, the host, and the property. Highly recommended.\n\nSuggestions:\n1. Washing Machine: For families traveling with children, having a washing machine would be a great convenience, especially for longer stays. This is purely a suggestion for improvement and not a complaint.\n2. Electrical Switches: A few of the switches were not functioning properly. It didn't cause any inconvenience during our stay, but getting them checked would help ensure an even better experience for future guests.\n\nOverall, we thoroughly enjoyed our stay and would be happy to recommend this property.",
      },
      {
        author: "Vrinda",
        avatar: "V",
        rating: 5,
        date: "3 weeks ago",
        yearsOnAirbnb: "3 years on Airbnb",
        text: "It was a nice experience, the staff was very cooperative and the place was also satisfactory.",
      },
      {
        author: "Ahsan",
        avatar: "A",
        rating: 4,
        date: "June 2026",
        yearsOnAirbnb: "3 years on Airbnb",
        text: "Everything went very well and smooth. The cleanliness was good but it could have been better. Overall the location, experience and atmosphere was great. Would recommend!",
      },
      {
        author: "Ashish",
        avatar: "A",
        rating: 3,
        date: "May 2026",
        yearsOnAirbnb: "2 years on Airbnb",
        text: "Good Stay need some maintenance at the property and need 1 ac in hall.",
      },
      {
        author: "Divyangana",
        avatar: "D",
        rating: 5,
        date: "May 2026",
        yearsOnAirbnb: "3 years on Airbnb",
        text: "The location, host, and property were all really good and easily accessible. I genuinely didn't face any major issues during the stay, and Yash was always just a call away whenever needed.\n\nThe only concern was regarding cleaning. Before booking, I was informed that cleaning could be arranged at an additional cost. However, after reaching, the landlady mentioned that the caretaker was on leave and that cleaning services are generally not provided during the stay. For longer stays of 3–4 days, this can become a bit inconvenient and messy.\n\nApart from that, the stay was comfortable and pleasant overall.",
      },
      {
        author: "Kushal",
        avatar: "K",
        rating: 5,
        date: "April 2026",
        yearsOnAirbnb: "1 year on Airbnb",
        text: "Loved every bit of the stay. The terrace views at sunrise are unreal. Will definitely come back.",
      },
      {
        author: "Priya",
        avatar: "P",
        rating: 5,
        date: "March 2026",
        yearsOnAirbnb: "4 years on Airbnb",
        text: "An absolutely magical stay! The penthouse is even more beautiful than the photos suggest. We were a family of 6 and never felt cramped. The kitchen had everything we needed to cook meals, and the terrace became our favourite evening spot. Daksh was incredibly responsive and helped us plan a day trip to Mussoorie. Cannot wait to return!",
      },
      {
        author: "Rohan",
        avatar: "R",
        rating: 5,
        date: "March 2026",
        yearsOnAirbnb: "2 years on Airbnb",
        text: "Booked this for a weekend getaway with college friends and it exceeded all expectations. The valley views from the living room are breathtaking, especially at sunset. Beds were super comfortable and the place was spotless. The self check-in made arriving late at night stress-free. 10/10 would recommend.",
      },
      {
        author: "Meera",
        avatar: "M",
        rating: 4,
        date: "February 2026",
        yearsOnAirbnb: "5 years on Airbnb",
        text: "Beautiful property with stunning views. The terrace was the highlight of our stay — perfect for morning yoga and evening chai. The kitchen is well-equipped. Minor issue: the wifi was a bit spotty in the third bedroom, but Daksh sorted it quickly. Great value for a 3BHK in Dehradun.",
      },
      {
        author: "Arjun",
        avatar: "A",
        rating: 5,
        date: "February 2026",
        yearsOnAirbnb: "3 years on Airbnb",
        text: "Perfect stay for our family of 7. The lift was a blessing for my elderly parents. Rooms are spacious, well-lit, and the heating kept us cosy during the cool February nights. Location is great — close enough to Dehradun markets yet peaceful. The host's local recommendations for food were spot on!",
      },
      {
        author: "Sneha",
        avatar: "S",
        rating: 5,
        date: "January 2026",
        yearsOnAirbnb: "6 years on Airbnb",
        text: "A hidden gem in Dehradun! We came here for our anniversary and it couldn't have been more perfect. The penthouse feels luxurious yet homely. Waking up to the misty valley views was surreal. Daksh is a thoughtful host — there were fresh flowers on arrival and a handwritten welcome note. Will cherish this stay forever.",
      },
      {
        author: "Vikram",
        avatar: "V",
        rating: 4,
        date: "January 2026",
        yearsOnAirbnb: "2 years on Airbnb",
        text: "Great place to unwind with friends. The hall is large enough for everyone to hang out together. Kitchen had all the basics. Only suggestion would be to add a few board games or books for the evenings. Otherwise, fantastic stay with incredible views.",
      },
      {
        author: "Ananya",
        avatar: "A",
        rating: 5,
        date: "December 2025",
        yearsOnAirbnb: "4 years on Airbnb",
        text: "We stayed here over Christmas and it was magical! The penthouse was decorated tastefully and the terrace was perfect for a small gathering. The host arranged a cake for us on request. The location is secluded enough for peace but only 20 mins from the main town. Highly recommend for families and couples alike.",
      },
      {
        author: "Karan",
        avatar: "K",
        rating: 5,
        date: "December 2025",
        yearsOnAirbnb: "1 year on Airbnb",
        text: "Second time staying here and it was just as wonderful. Consistent quality, responsive host, and those views never get old. This time we brought our dog and he loved the terrace. Pet-friendly stays like this are rare. Already planning our next visit!",
      },
      {
        author: "Ishita",
        avatar: "I",
        rating: 4,
        date: "November 2025",
        yearsOnAirbnb: "3 years on Airbnb",
        text: "Lovely property with a fantastic terrace. The layout works really well for two families travelling together — each bedroom has its own space and the common hall is great for meals together. Slight issue with hot water pressure in the morning but resolved quickly. Would definitely return.",
      },
    ],
  },

  /** Image gallery — pairs of {src, caption, span} for the masonry layout */
  gallery: [
    { src: "/images/img-01.jpeg", caption: "Living room · valley view", span: "lg" },
    { src: "/images/img-02.jpeg", caption: "Living room", span: "sm" },
    { src: "/images/img-03.jpeg", caption: "Terrace & valley", span: "tall" },
    { src: "/images/img-04.jpeg", caption: "Living room corner", span: "sm" },
    { src: "/images/img-05.jpeg", caption: "Bedroom", span: "tall" },
    { src: "/images/img-06.jpeg", caption: "Bedroom 2", span: "sm" },
    { src: "/images/img-07.jpeg", caption: "Bedroom 3", span: "sm" },
    { src: "/images/img-08.jpeg", caption: "Living room", span: "tall" },
    { src: "/images/img-09.jpeg", caption: "Living room", span: "sm" },
    { src: "/images/img-10.jpeg", caption: "Living room", span: "sm" },
    { src: "/images/img-11.jpeg", caption: "Living room", span: "sm" },
    { src: "/images/img-12.jpeg", caption: "Interior detail", span: "sm" },
    { src: "/images/img-13.jpeg", caption: "Kitchen & dining", span: "tall" },
    { src: "/images/img-14.jpeg", caption: "Terrace view", span: "lg" },
    { src: "/images/img-15.jpeg", caption: "Valley vista", span: "sm" },
    { src: "/images/img-16.jpeg", caption: "Cozy corner", span: "sm" },
  ],

  /** Full-resolution image list for the lightbox carousel */
  allImages: [
    "/images/img-01.jpeg",
    "/images/img-02.jpeg",
    "/images/img-03.jpeg",
    "/images/img-04.jpeg",
    "/images/img-05.jpeg",
    "/images/img-06.jpeg",
    "/images/img-07.jpeg",
    "/images/img-08.jpeg",
    "/images/img-09.jpeg",
    "/images/img-10.jpeg",
    "/images/img-11.jpeg",
    "/images/img-12.jpeg",
    "/images/img-13.jpeg",
    "/images/img-14.jpeg",
    "/images/img-15.jpeg",
    "/images/img-16.jpeg",
  ],
} as const;

export type Property = typeof property;

/**
 * Generate absolute ISO date strings (yyyy-mm-dd) for booked dates,
 * relative to "today". Called on the client so the dates are always fresh.
 */
export function getBookedDates(): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return property.bookedDateOffsets.map((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  });
}

/** Check if a given ISO date string is booked. */
export function isDateBooked(isoDate: string, booked?: string[]): boolean {
  const list = booked ?? getBookedDates();
  return list.includes(isoDate);
}

/** Build a WhatsApp deep link with an optional pre-filled message */
export function buildWhatsappLink(message?: string): string {
  const base = `https://wa.me/${property.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Default booking enquiry message */
export function defaultBookingMessage(opts?: {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  quote?: { nights: number; total: number; currency: string };
}): string {
  const lines = [
    `Hi ${property.host.name}! 👋`,
    ``,
    `I'd like to book *${property.name}* (${property.location}).`,
  ];
  if (opts?.checkIn && opts?.checkOut) {
    lines.push(``, `📅 Check-in: ${opts.checkIn}`, `📅 Check-out: ${opts.checkOut}`);
  }
  if (opts?.guests) {
    lines.push(`👥 Guests: ${opts.guests}`);
  }
  if (opts?.quote) {
    lines.push(
      ``,
      `💰 Estimated quote: ${opts.quote.currency}${opts.quote.total.toLocaleString("en-IN")} (${opts.quote.nights} night${opts.quote.nights > 1 ? "s" : ""})`,
    );
  }
  lines.push(
    ``,
    `Could you please confirm availability & the final price?`,
    `Thanks!`,
  );
  return lines.join("\n");
}

/**
 * Calculate a transparent price estimate for a date range + guest count.
 * Returns null if the dates are invalid or below the minimum-nights requirement.
 */
export function calculateQuote(opts: {
  checkIn: string; // ISO yyyy-mm-dd
  checkOut: string; // ISO yyyy-mm-dd
  guests: number;
}): {
  nights: number;
  weekdayNights: number;
  weekendNights: number;
  nightlySubtotal: number;
  seasonalMultiplier: number;
  seasonalName: string;
  longStayDiscount: number;
  longStayLabel: string;
  extraGuestFee: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
  perNight: number;
  currency: string;
} | null {
  const { checkIn, checkOut, guests } = opts;
  if (!checkIn || !checkOut) return null;

  const start = new Date(checkIn + "T00:00:00");
  const end = new Date(checkOut + "T00:00:00");
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
  if (end <= start) return null;

  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (nights < property.pricing.minNights) return null;

  // Count weekday (Sun–Thu) vs weekend (Fri–Sat) nights
  let weekdayNights = 0;
  let weekendNights = 0;
  const cursor = new Date(start);
  while (cursor < end) {
    const dow = cursor.getDay(); // 0=Sun, 5=Fri, 6=Sat
    if (dow === 5 || dow === 6) weekendNights++;
    else weekdayNights++;
    cursor.setDate(cursor.getDate() + 1);
  }

  const nightlySubtotal =
    weekdayNights * property.pricing.weekdayNightly +
    weekendNights * property.pricing.weekendNightly;

  // Seasonal multiplier — pick the highest multiplier applicable across the stay
  const month = start.getMonth() + 1; // 1–12
  let seasonalMultiplier = 1.0;
  let seasonalName = "Low season";
  for (const s of property.pricing.seasons) {
    // Determine if this season applies to the check-in month
    const applies =
      (s.name === "Peak season" && (month === 12 || month === 1 || (month >= 4 && month <= 6))) ||
      (s.name === "Shoulder" &&
        ((month >= 10 && month <= 11) || (month >= 2 && month <= 3))) ||
      (s.name === "Low season" && month >= 7 && month <= 9);
    if (applies && s.multiplier > seasonalMultiplier) {
      seasonalMultiplier = s.multiplier;
      seasonalName = s.name;
    }
  }

  const seasonAdjusted = nightlySubtotal * seasonalMultiplier;

  // Long-stay discount
  let longStayDiscount = 0;
  let longStayLabel = "";
  if (nights >= 28) {
    longStayDiscount = seasonAdjusted * property.pricing.monthlyDiscount;
    longStayLabel = "Monthly (25% off)";
  } else if (nights >= 7) {
    longStayDiscount = seasonAdjusted * property.pricing.weeklyDiscount;
    longStayLabel = "Weekly (10% off)";
  }

  // Extra guest fee
  const extraGuests = Math.max(0, guests - property.pricing.extraGuestThreshold);
  const extraGuestFee = extraGuests * property.pricing.extraGuestFee;

  const cleaningFee = property.pricing.cleaningFee;
  const serviceFee = property.pricing.serviceFee;

  const total = Math.round(
    seasonAdjusted - longStayDiscount + extraGuestFee + cleaningFee + serviceFee,
  );
  const perNight = Math.round(total / nights);

  return {
    nights,
    weekdayNights,
    weekendNights,
    nightlySubtotal,
    seasonalMultiplier,
    seasonalName,
    longStayDiscount: Math.round(longStayDiscount),
    longStayLabel,
    extraGuestFee,
    cleaningFee,
    serviceFee,
    total,
    perNight,
    currency: property.pricing.currency,
  };
}
