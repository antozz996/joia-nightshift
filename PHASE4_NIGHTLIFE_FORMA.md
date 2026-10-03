# FASE 4 — Nightlife / FORMĀ

## Obiettivo

Costruire il mondo notte come esperienza autonoma dentro lo stesso ecosistema JOIA.

## Route

- /nightlife/
- /eventi/[slug]/
- /artisti/[slug]/

## Hero / Next

La hero prova a leggere il prossimo evento pubblicato su Sanity.

Se Sanity non è configurato o non esiste un evento futuro:
- non inventa date;
- non inventa line-up;
- mostra un fallback editoriale;
- converte la CTA primaria in iscrizione community.

## Heritage

Il fallback storico usa esclusivamente dati già dichiarati pubblicamente da JOIA:
- dal 2004;
- Carillon / Friday;
- SIX / Saturday;
- POV / Sunday;
- archivio artisti storico.

Questi dati sono fallback editoriali, non sostituiscono il calendario reale.

## Artisti

Se Sanity contiene artisti featured:
- la rail artisti usa quelli;
- le pagine artista leggono bio, generi, paese, Instagram;
- gli eventi collegati vengono recuperati automaticamente.

Senza CMS:
- resta l'archivio storico verificato;
- nessuna biografia viene inventata.

## Eventi

Le pagine /eventi/[slug]/ supportano:
- titolo;
- data e ora;
- claim;
- line-up;
- ticket;
- tavoli;
- guest list;
- SEO description.

I format storici hanno pagine archivio separate e non simulano date specifiche.

## Flyer wall

Gli slot:
- /public/media/archive/flyer-1.webp
- ...
- /public/media/archive/flyer-6.webp

sono pronti per flyer reali JOIA.

Finché il materiale non viene caricato, il layout resta generativo.

## Community / Tavolo / Guest list

Un unico modulo gestisce tre intenti:
1. community;
2. tavolo;
3. guest list.

POST:
- /api/nightlife-lead

Con RESEND_API_KEY + NIGHTLIFE_LEAD_EMAIL_FROM:
- invio server-side.

Senza provider:
- fallback WhatsApp;
- fallback email.

## Motion

Il mondo notte usa:
- GSAP;
- ScrollTrigger;
- kinetic type;
- clip reveal;
- micro-movimenti più rapidi del Private.

Nessun Lenis nel nightlife per mantenere una risposta più secca.

## CMS

Sanity è facoltativo a runtime durante lo sviluppo.
Le query ritornano fallback se NEXT_PUBLIC_SANITY_PROJECT_ID non è configurato.

## Variabili ambiente

- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- NEXT_PUBLIC_JOIA_WHATSAPP
- RESEND_API_KEY
- NIGHTLIFE_LEAD_EMAIL_TO
- NIGHTLIFE_LEAD_EMAIL_FROM
