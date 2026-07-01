import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/site/structured-data";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valley-gaze.example.com"),
  title: "The Valley Gaze Penthouse | 3BHK Luxury Stay in Dehradun",
  description:
    "A serene 3BHK penthouse nestled amidst Dehradun's greenery with stunning valley & mountain views. Sleeps 9, fully equipped kitchen, terrace, lift access. Book directly via WhatsApp.",
  keywords: [
    "Dehradun stay",
    "Valley Gaze Penthouse",
    "Dehradun Airbnb",
    "3BHK Dehradun",
    "Mussoorie nearby stay",
    "Uttarakhand vacation rental",
    "Dehradun valley view",
  ],
  authors: [{ name: "Daksh Thakur" }],
  openGraph: {
    title: "The Valley Gaze Penthouse | 3BHK Luxury Stay in Dehradun",
    description:
      "A serene 3BHK penthouse with stunning valley & mountain views in Dehradun. Sleeps 9, fully equipped kitchen, terrace. Book directly via WhatsApp.",
    siteName: "The Valley Gaze Penthouse",
    type: "website",
    images: ["/images/img-01.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Valley Gaze Penthouse | Dehradun",
    description:
      "A serene 3BHK penthouse with stunning valley & mountain views in Dehradun. Book directly via WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <StructuredData />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
