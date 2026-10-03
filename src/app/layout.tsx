import type { Metadata } from "next";
import { Suspense } from "react";
import { Barlow_Condensed, Bodoni_Moda, IBM_Plex_Mono, Manrope } from "next/font/google";
import { StructuredData } from "@/components/seo/StructuredData";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { FilmGrain } from "@/components/shared/FilmGrain";
import { TimeThemeController } from "@/components/shared/TimeThemeController";
import { TrackingManager } from "@/components/tracking/TrackingManager";
import { getSiteUrl } from "@/lib/seo/site-url";
import { venueSchema } from "@/lib/seo/schema";
import "@/styles/tokens.css";
import "@/styles/globals.css";

const privateDisplay = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-private-display",
  display: "swap",
});

const privateSans = Manrope({
  subsets: ["latin"],
  variable: "--font-private-sans",
  display: "swap",
});

const nightDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-night-display",
  display: "swap",
});

const nightMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-night-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "JOIA",
  title: {
    default: "JOIA — Napoli",
    template: "%s | JOIA",
  },
  description: "JOIA è un ecosistema per nightlife, musica ed eventi privati a Napoli.",
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "JOIA",
    title: "JOIA — Private Events & FORMĀ Nightlife a Napoli",
    description:
      "Un unico spazio, due trasformazioni: Private Events e FORMĀ / Nightlife.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOIA — Napoli",
    description: "Private Events e FORMĀ / Nightlife.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${privateDisplay.variable} ${privateSans.variable} ${nightDisplay.variable} ${nightMono.variable}`}
    >
      <body>
        <StructuredData data={venueSchema()} id="joia-venue-schema" />
        <TimeThemeController />
        {children}
        <FilmGrain />
        <CustomCursor />
        <Suspense fallback={null}>
          <TrackingManager />
        </Suspense>
      </body>
    </html>
  );
}
