export type FaqItem = {
  question: string;
  answer: string;
};

export const privateFaqs: readonly FaqItem[] = [
  {
    question: "Che tipo di eventi privati può ospitare JOIA?",
    answer:
      "Il progetto Private Events è pensato per feste di laurea, 18 anni, compleanni ed eventi aziendali, con layout e ritmo costruiti sul singolo evento.",
  },
  {
    question: "Posso scegliere tra cena, cocktail e party?",
    answer:
      "Sì. Il configuratore racconta tre assetti di partenza — cena, cocktail e party — che vengono poi validati in base a numero di ospiti e progetto reale.",
  },
  {
    question: "Come richiedo disponibilità e preventivo?",
    answer:
      "Puoi completare il brief in cinque passaggi indicando evento, persone, data, budget e contatto. La richiesta può proseguire anche su WhatsApp.",
  },
] as const;

export const nightlifeFaqs: readonly FaqItem[] = [
  {
    question: "Dove trovo la prossima serata JOIA / FORMĀ?",
    answer:
      "La prossima serata viene mostrata sopra la piega appena è pubblicata nel CMS, insieme a data, line-up e link disponibili per ticket o tavoli.",
  },
  {
    question: "Posso richiedere tavolo o guest list online?",
    answer:
      "Sì. La sezione community permette di scegliere tra iscrizione, richiesta tavolo e guest list e invia la richiesta direttamente al team.",
  },
  {
    question: "Le pagine artista e archivio vengono aggiornate?",
    answer:
      "Sì. Quando Sanity contiene artisti ed eventi pubblicati, le pagine si aggiornano automaticamente mantenendo l'archivio storico come fallback.",
  },
] as const;
