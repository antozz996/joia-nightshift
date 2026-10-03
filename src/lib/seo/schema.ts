import { siteConfig } from "@/config/site";
import type { NightEventRecord } from "@/lib/cms/nightlife";
import { absoluteUrl } from "./site-url";

export function venueSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["NightClub", "EventVenue"],
    "@id": absoluteUrl("/#venue"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description:
      "JOIA è una venue di Napoli con due anime: Private Events e FORMĀ / Nightlife.",
    foundingDate: "2004",
    telephone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Corso Europa 45",
      postalCode: "80029",
      addressLocality: "Sant'Antimo",
      addressRegion: "NA",
      addressCountry: "IT",
    },
  };
}

export function musicEventSchema(event: NightEventRecord) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.title,
    startDate: event.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "EventVenue",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Corso Europa 45",
        postalCode: "80029",
        addressLocality: "Sant'Antimo",
        addressRegion: "NA",
        addressCountry: "IT",
      },
    },
    url: absoluteUrl("/eventi/" + event.slug + "/"),
  };

  if (event.subtitle) schema.description = event.subtitle;

  if (event.artists?.length) {
    schema.performer = event.artists.map((artist) => ({
      "@type": "Person",
      name: artist.name,
      url: absoluteUrl("/artisti/" + artist.slug + "/"),
    }));
  }

  if (event.ticketUrl) {
    schema.offers = {
      "@type": "Offer",
      url: event.ticketUrl,
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
}
