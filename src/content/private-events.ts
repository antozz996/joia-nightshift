export type PrivateEventSlug =
  | "feste-di-laurea"
  | "18-anni"
  | "compleanni"
  | "eventi-aziendali";

export type PrivateEventContent = {
  slug: PrivateEventSlug;
  eyebrow: string;
  title: string;
  intro: string;
  cardCopy: string;
  statement: string;
  moments: readonly string[];
  gallery: readonly string[];
  seoTitle: string;
  seoDescription: string;
};

export const privateEventTypes: readonly PrivateEventContent[] = [
  {
    slug: "feste-di-laurea",
    eyebrow: "Private / Feste di laurea",
    title: "Il traguardo diventa scena.",
    intro:
      "Non una sala da riempire, ma un ambiente da costruire intorno alle persone, al ritmo e al momento che vuoi ricordare.",
    cardCopy:
      "Cena, brindisi e party: il traguardo diventa una serata con un ritmo preciso.",
    statement:
      "Dalla cena al party, JOIA può cambiare assetto durante la stessa serata: più raccolto all'inizio, più energico quando arriva il momento di festeggiare.",
    moments: ["Accoglienza", "Cena o cocktail", "Torta e brindisi", "Party"],
    gallery: ["arrival", "table", "toast", "dancefloor"],
    seoTitle: "Festa di laurea a Napoli | JOIA Private Events",
    seoDescription:
      "Organizza la tua festa di laurea a Napoli in JOIA: spazio trasformabile, atmosfera su misura e un brief dedicato per costruire la serata.",
  },
  {
    slug: "18-anni",
    eyebrow: "Private / 18 anni",
    title: "Diciotto, ma non una festa già vista.",
    intro:
      "L'ingresso deve avere impatto, la sala deve avere un'identità e il party deve sembrare tuo. Il format parte dalla persona, non da un pacchetto preconfezionato.",
    cardCopy:
      "Ingresso d’impatto, show, luce e dancefloor costruiti intorno al festeggiato.",
    statement:
      "JOIA nasce come spazio capace di lavorare con luce, suono e trasformazione. Per i 18 anni questo significa costruire un crescendo, non semplicemente decorare una sala.",
    moments: ["Reveal", "Foto e ingresso", "Food & drink", "Party"],
    gallery: ["reveal", "portrait", "food", "party"],
    seoTitle: "Festa 18 anni a Napoli | JOIA Private Events",
    seoDescription:
      "Una location per 18 anni a Napoli pensata come esperienza: layout, luce, musica e atmosfera costruiti intorno al festeggiato.",
  },
  {
    slug: "compleanni",
    eyebrow: "Private / Compleanni",
    title: "Una sera costruita sul tuo ritmo.",
    intro:
      "Intima o esplosiva, seduta o in piedi, elegante o più libera. Il punto non è scegliere una sala: è decidere come vuoi viverla.",
    cardCopy:
      "Dalla cena al party: una serata che può cambiare tono insieme ai tuoi ospiti.",
    statement:
      "Il layout può partire da una cena, aprirsi in modalità cocktail e lasciare spazio al party. La trasformazione è parte dell'esperienza.",
    moments: ["Welcome drink", "Cena o cocktail", "Celebration", "After dinner"],
    gallery: ["welcome", "dinner", "cake", "after"],
    seoTitle: "Location compleanni a Napoli | JOIA Private Events",
    seoDescription:
      "Festeggia il compleanno a Napoli in uno spazio che cambia con il tuo evento: cena, cocktail o party in un unico ecosistema JOIA.",
  },
  {
    slug: "eventi-aziendali",
    eyebrow: "Private / Corporate",
    title: "Quando il brand prende spazio.",
    intro:
      "Presentazioni, dinner, networking e party richiedono ritmi diversi. JOIA può diventare una cornice neutra e trasformabile, senza perdere carattere.",
    cardCopy:
      "Dinner, networking e presentazioni in uno spazio che lascia il brand al centro.",
    statement:
      "L'obiettivo è dare al brand il controllo della scena: contenuti, luce, disposizione e flussi possono essere pensati come un unico progetto.",
    moments: ["Welcome", "Presentation", "Dinner / networking", "Closing party"],
    gallery: ["brand", "presentation", "network", "closing"],
    seoTitle: "Location eventi aziendali Napoli | JOIA Private Events",
    seoDescription:
      "JOIA per eventi aziendali a Napoli: spazio flessibile per presentazioni, dinner, networking e party con una regia coerente.",
  },
] as const;

export const privateLayouts = [
  {
    id: "dinner",
    label: "Cena",
    index: "01",
    description:
      "Tavoli apparecchiati, servizio curato, luce più morbida e un ritmo più raccolto. La sala privilegia conversazione, mise en place e una progressione lenta.",
    windowCopy: "Mise en place, servizio al tavolo, luce calda.",
    suitableFor: "lauree, compleanni, cene aziendali",
    capacity: null as number | null,
    capacityLabel: "Capienza da validare sul progetto",
    tags: ["tavoli", "servizio", "atmosfera"],
  },
  {
    id: "cocktail",
    label: "Cocktail",
    index: "02",
    description:
      "Sedute diffuse e aree standing. Più movimento, più incontri e più libertà di attraversare lo spazio tra drink, conversazione e musica.",
    windowCopy: "Standing, lounge diffuse, cocktail bar.",
    suitableFor: "welcome drink, networking, feste dinamiche",
    capacity: null as number | null,
    capacityLabel: "Capienza da validare sul progetto",
    tags: ["standing", "lounge", "flow"],
  },
  {
    id: "party",
    label: "Party",
    index: "03",
    description:
      "Dancefloor protagonista, lounge laterali e luce più scenica. La sala si libera, aumenta l’intensità e lascia spazio a performance e musica.",
    windowCopy: "Dancefloor, show, light design, massima energia.",
    suitableFor: "18 anni, compleanni, after dinner",
    capacity: null as number | null,
    capacityLabel: "Capienza da validare sul progetto",
    tags: ["dancefloor", "luci", "energia"],
  },
] as const;

export function getPrivateEventType(slug: string) {
  return privateEventTypes.find((item) => item.slug === slug);
}
