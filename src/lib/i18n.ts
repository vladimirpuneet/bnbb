/**
 * Lightweight i18n dictionary for English and Hindi.
 * Covers the key UI strings (nav, buttons, section headers, booking flow).
 * Static property content (descriptions, reviews) stays in English since it
 * was scraped from the Airbnb listing.
 */

export type Locale = "en" | "hi";

export const locales: Locale[] = ["en", "hi"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

export const translations = {
  en: {
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
    "hero.entirePenthouse": "Entire Penthouse",
    "hero.bookStay": "Book your stay",
    "hero.viewPhotos": "View all",
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
    "section.gallery.desc":
      "Every room opens to a frame of greenery. Tap any photo to explore the full gallery.",
    "section.gallery.showAll": "Show all photos",

    "section.overview.eyebrow": "Welcome to your retreat",
    "section.overview.highlights": "Listing highlights",

    "section.pricing.eyebrow": "Transparent pricing",
    "section.pricing.bookDates": "Book these dates",
    "section.pricing.yourEstimate": "Your estimate",
    "section.pricing.total": "Total",
    "section.pricing.cleaningFee": "Cleaning fee",
    "section.pricing.serviceFee": "Service fee",
    "section.pricing.waived": "Waived",
    "section.pricing.perNight": "per night",

    "section.reviews.eyebrow": "Guest experiences",
    "section.reviews.title": "Loved by guests —",
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
    "section.book.desc":
      "Skip the platform fees. Reserve directly with the host via WhatsApp — instant responses, best rates, and a personal touch.",
    "section.book.chat": "Chat on WhatsApp",

    // Additional section headers
    "section.overview.eyebrow": "Welcome to your retreat",
    "section.overview.title": "Where the valley holds its breath,",
    "section.overview.titleSuffix": "and so will you.",
    "section.overview.highlights": "Listing highlights",

    "section.space.eyebrow": "Inside the penthouse",
    "section.space.title": "Designed to feel like home",
    "section.space.desc":
      "Three cozy rooms, a spacious hall and a fully equipped kitchen — laid out for both privacy and togetherness.",

    "section.bedrooms.eyebrow": "Where you'll sleep",
    "section.bedrooms.title": "Three cozy rooms, each with a king bed",
    "section.bedrooms.desc":
      "Two rooms feature attached washrooms; the third shares a common washroom connected to the hall. All rooms open directly into the spacious hall.",

    "section.amenities.eyebrow": "What this place offers",
    "section.amenities.title": "Everything you need for a comfortable stay",
    "section.amenities.desc":
      "From sweeping valley views to a fully equipped kitchen and lift access — 40+ amenities thoughtfully provided.",

    "section.weather.eyebrow": "Plan your visit",
    "section.weather.title": "Pleasant weather,",
    "section.weather.titleSuffix": "year-round.",

    "section.host.eyebrow": "Meet your host",
    "section.host.title": "Daksh Thakur — your Superhost",
    "section.host.desc":
      "Experienced, responsive and committed to making your stay memorable. Response rate 99% · replies within an hour.",

    "section.rules.eyebrow": "Things to know",
    "section.rules.title": "House rules & stay details",
    "section.rules.desc":
      "A few gentle guidelines that keep every guest's stay peaceful and pleasant.",

    "section.location.eyebrow": "Where you'll be",
    "section.location.title": "Tehri Garhwal, Dehradun",
    "section.location.desc":
      "Perched above the Doon valley with easy access to Mussoorie and Dehradun's most-loved natural escapes.",

    "section.pricing.eyebrow": "Transparent pricing",
    "section.pricing.title": "Estimate your stay —",
    "section.pricing.titleSuffix": "no hidden fees",
    "section.pricing.desc":
      "Pick your dates and guest count for an instant, transparent quote. Final pricing is confirmed by your host on WhatsApp — and direct bookings skip platform service fees.",

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
  },

  hi: {
    // Navbar
    "nav.photos": "फ़ोटो",
    "nav.pricing": "मूल्य",
    "nav.amenities": "सुविधाएँ",
    "nav.reviews": "समीक्षाएँ",
    "nav.location": "स्थान",
    "nav.faq": "सामान्य प्रश्न",
    "nav.bookNow": "बुक करें",
    "nav.share": "शेयर",
    "nav.save": "सहेजें",
    "nav.saved": "सहेजा गया",
    "nav.airbnb": "Airbnb",

    // Hero
    "hero.entirePenthouse": "संपूर्ण पेंटहाउस",
    "hero.bookStay": "अपना बुकिंग करें",
    "hero.viewPhotos": "सभी देखें",
    "hero.photos": "फ़ोटो",
    "hero.guests": "मेहमान",
    "hero.bedrooms": "बेडरूम",
    "hero.beds": "बिस्तर",
    "hero.baths": "बाथरूम",
    "hero.scroll": "स्क्रॉल",
    "hero.from": "शुरू",
    "hero.perNight": "/ रात",
    "hero.reviews": "समीक्षाएँ",

    // Section headers
    "section.gallery.eyebrow": "गैलरी",
    "section.gallery.title": "घाटी की एक झलक",
    "section.gallery.desc":
      "हर कमरा हरितिमा की एक झलक प्रस्तुत करता है। पूरी गैलरी देखने के लिए किसी भी फ़ोटो पर टैप करें।",
    "section.gallery.showAll": "सभी फ़ोटो देखें",

    "section.overview.eyebrow": "अपने रिट्रीट में आपका स्वागत है",
    "section.overview.highlights": "विशेषताएँ",

    "section.pricing.eyebrow": "पारदर्शी मूल्य निर्धारण",
    "section.pricing.bookDates": "इन तिथियों को बुक करें",
    "section.pricing.yourEstimate": "आपका अनुमान",
    "section.pricing.total": "कुल",
    "section.pricing.cleaningFee": "सफाई शुल्क",
    "section.pricing.serviceFee": "सेवा शुल्क",
    "section.pricing.waived": "माफ़ किया गया",
    "section.pricing.perNight": "प्रति रात",

    "section.reviews.eyebrow": "मेहमान अनुभव",
    "section.reviews.title": "मेहमानों द्वारा पसंद किया गया —",
    "section.reviews.desc": "द वैली गेज़ पेंटहाउस में ठहरे यात्रियों की वास्तविक प्रतिक्रिया।",
    "section.reviews.outOf5": "5 में से",
    "section.reviews.showMore": "और समीक्षाएँ देखें",
    "section.reviews.showFewer": "कम समीक्षाएँ देखें",
    "section.reviews.showing": "दिखा रहे हैं",
    "section.reviews.of": "में से",
    "section.reviews.readAll": "सभी पढ़ें",
    "section.reviews.reviewsOnAirbnb": "Airbnb पर समीक्षाएँ",

    "section.faq.eyebrow": "जानना आवश्यक",
    "section.faq.title": "अक्सर पूछे जाने वाले प्रश्न",

    "section.book.title": "आज ही अपनी घाटी यात्रा बुक करें",
    "section.book.desc":
      "प्लेटफ़ॉर्म शुल्क छोड़ें। होस्ट के साथ सीधे WhatsApp पर बुक करें — तत्काल प्रतिक्रिया, सर्वोत्तम दरें, और व्यक्तिगत स्पर्श।",
    "section.book.chat": "WhatsApp पर चैट करें",

    // Additional section headers (Hindi)
    "section.overview.title": "जहाँ घाटी साँस रोकती है,",
    "section.overview.titleSuffix": "और आप भी।",

    "section.space.eyebrow": "पेंटहाउस के अंदर",
    "section.space.title": "घर जैसी अनुभूति के लिए डिज़ाइन किया गया",
    "section.space.desc":
      "तीन सुरक्षित कमरे, एक विशाल हॉल और पूरी तरह से सुसज्जित रसोई — निजता और एकसाथिता दोनों के लिए।",

    "section.bedrooms.eyebrow": "आप कहाँ सोएँगे",
    "section.bedrooms.title": "तीन सुरक्षित कमरे, प्रत्येक में किंग बिस्तर",
    "section.bedrooms.desc":
      "दो कमरों में संलग्न बाथरूम हैं; तीसरा कमरा हॉल से जुड़े सामान्य बाथरूम का उपयोग करता है। सभी कमरे सीधे विशाल हॉल में खुलते हैं।",

    "section.amenities.eyebrow": "यह स्थान क्या प्रदान करता है",
    "section.amenities.title": "आरामदायक ठहराव के लिए सब कुछ",
    "section.amenities.desc":
      "व्यापक घाटी दृश्यों से लेकर पूरी तरह सुसज्जित रसोई और लिफ्ट तक — 40+ सुविधाएँ देखभाल के साथ प्रदान की गईं।",

    "section.weather.eyebrow": "अपनी यात्रा की योजना बनाएँ",
    "section.weather.title": "सुहावना मौसम,",
    "section.weather.titleSuffix": "साल भर।",

    "section.host.eyebrow": "अपने होस्ट से मिलें",
    "section.host.title": "दक्ष ठाकुर — आपके सुपरहोस्ट",
    "section.host.desc":
      "अनुभवी, उत्तरदायी और आपके ठहराव को यादगार बनाने के लिए प्रतिबद्ध। प्रतिक्रिया दर 99% · एक घंटे के भीतर जवाब।",

    "section.rules.eyebrow": "जानना आवश्यक",
    "section.rules.title": "घर के नियम और ठहराव विवरण",
    "section.rules.desc":
      "कुछ सौम्य दिशानिर्देश जो हर मेहमान के ठहराव को शांतिपूर्ण और सुखद बनाते हैं।",

    "section.location.eyebrow": "आप कहाँ होंगे",
    "section.location.title": "टेहरी गढ़वाल, देहरादून",
    "section.location.desc":
      "दून घाटी के ऊपर स्थित, मसूरी और देहरादून के सबसे प्रिय प्राकृतिक स्थलों तक आसान पहुँच।",

    "section.pricing.title": "अपना ठहराव अनुमानित करें —",
    "section.pricing.titleSuffix": "कोई छिपा शुल्क नहीं",
    "section.pricing.desc":
      "तत्काल, पारदर्शी उद्धरण के लिए अपनी तिथियाँ और मेहमान संख्या चुनें। अंतिम मूल्य आपके होस्ट द्वारा WhatsApp पर कन्फर्म किया जाता है — और प्रत्यक्ष बुकिंग पर प्लेटफ़ॉर्म सेवा शुल्क माफ़।",

    // Booking modal
    "booking.title": "अपना बुकिंग करें",
    "booking.checkin": "चेक-इन",
    "booking.checkout": "चेक-आउट",
    "booking.guests": "मेहमान",
    "booking.yourName": "आपका नाम",
    "booking.addDate": "तिथि जोड़ें",
    "booking.estimatedQuote": "अनुमानित मूल्य",
    "booking.requestBooking": "बुकिंग का अनुरोध",
    "booking.requestBookingOnWhatsApp": "WhatsApp पर बुकिंग का अनुरोध",
    "booking.skipForm": "फ़ॉर्म छोड़ें और सीधे चैट करें",
    "booking.maxGuests": "अधिकतम",
    "booking.minNights": "रातें",
    "booking.responds": "एक घंटे के भीतर जवाब",
    "booking.selectDates": "तत्काल मूल्य अनुमान देखने के लिए चेक-इन और चेक-आउट तिथियाँ चुनें।",

    // Footer
    "footer.explore": "खोजें",
    "footer.details": "संपत्ति विवरण",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.crafted": "निर्मित",
    "footer.inDoon": "दून घाटी में",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
