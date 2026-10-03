export type NightFormat = {
  slug: string;
  name: string;
  day: string;
  description: string;
  index: string;
};

export type ArchiveArtist = {
  slug: string;
  name: string;
};

export const nightlifeFormats: readonly NightFormat[] = [
  {
    slug: "carillon",
    name: "CARILLON",
    day: "Friday",
    index: "01",
    description:
      "Il venerdì che apre il weekend: clubbing, energia e ospiti legati alla cultura dei grandi dancefloor.",
  },
  {
    slug: "six",
    name: "SIX",
    day: "Saturday",
    index: "02",
    description:
      "Il sesto giorno della settimana diventa show, performance e produzione scenica a piena intensità.",
  },
  {
    slug: "pov",
    name: "POV",
    day: "Sunday",
    index: "03",
    description:
      "La domenica chiude il weekend con un linguaggio più corale: colore, canto, ballo e partecipazione.",
  },
] as const;

export const archiveArtists: readonly ArchiveArtist[] = [
  { slug: "black-coffee", name: "Black Coffee" },
  { slug: "sven-vath", name: "Sven Väth" },
  { slug: "francis-mercier", name: "Francis Mercier" },
  { slug: "themba", name: "Themba" },
  { slug: "roger-sanchez", name: "Roger Sanchez" },
  { slug: "duke-dumont", name: "Duke Dumont" },
  { slug: "dennis-ferrer", name: "Dennis Ferrer" },
  { slug: "todd-terry", name: "Todd Terry" },
] as const;

export const nightlifeFallback = {
  nextEvent: null as null | {
    slug: string;
    title: string;
    startsAt: string;
    subtitle?: string;
    ticketUrl?: string;
    tableUrl?: string;
  },
  communityHeadline: "Quando la prossima frequenza viene pubblicata, la sai prima.",
} as const;

export function findArchiveArtist(slug: string) {
  return archiveArtists.find((artist) => artist.slug === slug);
}

export function findNightFormat(slug: string) {
  return nightlifeFormats.find((format) => format.slug === slug);
}
