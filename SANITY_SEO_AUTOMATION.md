# Sanity SEO automation

## Cosa succede quando pubblichi

Per `event`, `artist` e `privateEventType` Sanity espone un gruppo **SEO**.

Campi:
- Titolo SEO (opzionale)
- Meta description (opzionale)
- Immagine social / Open Graph (opzionale)
- Canonical URL personalizzata (solo casi speciali)
- Noindex
- Tema / keyword principale (solo guida editoriale)

Se i campi SEO sono vuoti, Next.js genera automaticamente metadata sensati dal contenuto.

## Nuove pagine

### Evento
Pubblicando un documento `event` con slug `black-coffee-18-ottobre`:

`/eventi/black-coffee-18-ottobre/`

vengono generati:
- title e description
- canonical
- OG/Twitter
- MusicEvent JSON-LD
- Offer se esiste ticketUrl
- performer linkati
- sitemap automatica

### Artista
Pubblicando `artist`:

`/artisti/[slug]/`

con metadata, immagine social, Person JSON-LD, Instagram sameAs ed eventi collegati.

### Private
Pubblicando una nuova `privateEventType`:

`/private-events/[slug]/`

la route funziona anche se lo slug non esiste nel codice statico. Hero, intro, statement, moments e gallery possono arrivare dal CMS.

## Noindex

Se `seo.noIndex = true`:
- la pagina restituisce robots noindex/nofollow
- il contenuto viene escluso dalla sitemap
- non entra nei listing “next event” / artisti featured quando applicabile

## Webhook di pubblicazione

Endpoint:

`POST /api/revalidate/sanity`

Autenticazione:
- `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
oppure
- `x-sanity-secret: <SANITY_REVALIDATE_SECRET>`

Projection consigliata nel webhook Sanity:

`{"_type": _type, "slug": slug.current}`

Trigger:
- create
- update
- delete

Tipi consigliati:
- event
- artist
- privateEventType
- siteSettings
- faq
- gallery

Il webhook invalida automaticamente pagina interessata, listing e `/sitemap.xml`.

## Regola editoriale

Il campo focusKeyword non genera `meta keywords`. Serve soltanto a ricordare il tema principale durante la scrittura.

La canonical personalizzata va lasciata vuota nella quasi totalità dei casi.
