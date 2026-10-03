# FASE 5 — SEO, Performance, Tracking, Deploy

## SEO tecnico

Implementato:

- SSR / App Router
- metadata globali e per pagina
- canonical sulle pagine principali, private, eventi e artisti
- sitemap dinamica
- robots.txt
- manifest.webmanifest
- hreflang IT/EN sulle pagine core
- pagine inglesi reali:
  - /en/
  - /en/private-events/
  - /en/nightlife/
  - /en/location/
- Open Graph generale
- Open Graph dinamica per /eventi/[slug]/
- schema.org NightClub + EventVenue
- schema.org MusicEvent con Offer quando esiste un ticket URL
- FAQPage solo dove le FAQ sono visibili nell'HTML

## Performance

Target tecnico:

- LCP < 2,5 s
- INP < 200 ms
- CLS < 0,1
- JS iniziale < 200 KB gzip

Misura CI attuale sulla root:

- Initial JS gzip: 181,7 KB
- Budget: 200 KB
- Chunk iniziali: 9

Il budget viene verificato automaticamente con:

npm run performance:check

La CI fallisce se la root supera 200 KB gzip.

Strategie già attive:

- WebGL lazy dopo idle
- fallback CSS per Save-Data / reduced motion
- GSAP / Lenis caricati solo nei mondi che li usano
- next/font self-hosted
- next/image + AVIF/WebP
- nessun audio autoplay
- contenuti importanti sempre HTML
- poster / fallback media previsti
- DPR WebGL limitato
- nessuna libreria di analytics caricata senza consenso

Nota: LCP, INP e CLS reali devono essere confermati con field data su traffico reale. Non vengono dichiarati come garantiti senza misurazione RUM.

## Tracking

### GA4

Variabile:

NEXT_PUBLIC_GA4_ID=

Comportamento:

- non caricato prima del consenso analytics
- page_view iniziale
- page_view su navigazioni client-side
- evento cta_click globale
- parametri UTM allegati quando disponibili
- lead registrati come evento lead

### Meta Pixel

Variabile:

NEXT_PUBLIC_META_PIXEL_ID=

Comportamento:

- non caricato prima del consenso marketing
- PageView
- CTA custom
- Lead con event_id

### Meta Conversions API

Variabile:

META_CAPI_ACCESS_TOKEN=
META_CAPI_TEST_EVENT_CODE=

Invio CAPI:

- solo con consenso marketing
- email e telefono hashati SHA-256
- IP e user agent inviati server-side quando disponibili
- _fbp e _fbc riutilizzati se presenti
- stesso event_id del Pixel per deduplica

## UTM

Parametri supportati:

- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

Sono salvati solo in sessionStorage e allegati:
- agli eventi analytics
- ai brief Private
- ai lead Nightlife

## GDPR / Consent

Il banner permette:

- Accetta
- Rifiuta
- Personalizza
- modifica successiva tramite Cookie settings

Analytics e Meta non partono prima del consenso relativo.

La revoca che disabilita un consenso già attivo forza reload per rimuovere gli script dalla pagina corrente.

## Security headers

Configurati:

- Content-Security-Policy
- Strict-Transport-Security in produzione
- Referrer-Policy
- X-Content-Type-Options
- X-Frame-Options
- Permissions-Policy

## Variabili necessarie prima del go-live commerciale

NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_JOIA_WHATSAPP=

SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=

RESEND_API_KEY=
PRIVATE_BRIEF_EMAIL_TO=
PRIVATE_BRIEF_EMAIL_FROM=
NIGHTLIFE_LEAD_EMAIL_TO=
NIGHTLIFE_LEAD_EMAIL_FROM=

NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
META_CAPI_TEST_EVENT_CODE=

## Conferme esterne ancora necessarie

Queste non devono essere inventate nel codice:

1. dominio definitivo;
2. Pixel ID Meta;
3. token CAPI Meta;
4. GA4 Measurement ID;
5. progetto/dataset Sanity;
6. dominio mittente Resend verificato;
7. conferma che il numero mobile pubblicato sia il WhatsApp ufficiale;
8. testo legale Privacy/Cookie e titolare del trattamento;
9. capienze ufficiali cena / cocktail / party;
10. media JOIA reali;
11. calendario eventi / ticket / table URL reali.

## Deploy checklist

Prima del dominio definitivo:

- CI verde
- Vercel production READY
- /robots.txt 200
- /sitemap.xml 200
- /manifest.webmanifest 200
- /en/ 200
- /private-events/ 200
- /nightlife/ 200
- security headers presenti
- CTA principali navigabili senza JS
- form funzionanti con fallback anche senza Resend
- nessun evento/data inventato
- OG evento generata
- consent manager funzionante
- test mobile Android/iOS e desktop
