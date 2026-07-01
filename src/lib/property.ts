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
  lines.push(
    ``,
    `Could you please share the pricing & availability?`,
    `Thanks!`,
  );
  return lines.join("\n");
}
