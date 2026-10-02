import type { Metadata } from "next";
import { Barlow_Condensed, Bodoni_Moda, IBM_Plex_Mono, Manrope } from "next/font/google";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { FilmGrain } from "@/components/shared/FilmGrain";
import { TimeThemeController } from "@/components/shared/TimeThemeController";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "JOIA — Napoli",
    template: "%s | JOIA",
  },
  description: "JOIA è un ecosistema per nightlife, musica ed eventi privati a Napoli.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${privateDisplay.variable} ${privateSans.variable} ${nightDisplay.variable} ${nightMono.variable}`}
    >
      <body>
        <TimeThemeController />
        {children}
        <FilmGrain />
        <CustomCursor />
      </body>
    </html>
  );
}
