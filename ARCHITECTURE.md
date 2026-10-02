# JOIA / NIGHTSHIFT — FASE 0

## Obiettivo architetturale

Un solo sito e un solo dominio, con due mondi visivi separati tramite route layout:

- Private Events: `/private-events/**`
- Nightlife / FORMĀ: `/nightlife/`, `/eventi/**`, `/artisti/**`

La root `/` è “The Switch”, ma resta HTML semantico e crawlabile.

## Rendering

- Server Components di default.
- Client Components solo per interazione/animazione.
- Contenuti Sanity letti lato server.
- WebGL/OGL caricato lazy solo nelle scene che lo richiedono.
- Fallback statico per Save-Data, reduced-motion e device deboli.

## CMS

Sanity è il source of truth per eventi, artisti, gallery, FAQ e tipologie private.
Le immagini usano hotspot/crop editoriali. Il frontend usa `@sanity/image-url` con `next/image`.

## Media fallback

Ogni componente hero/media deve supportare, in quest'ordine:

1. video;
2. immagine;
3. tipografia + sfondo generativo CSS/shader.

## Performance budget

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- JS iniziale < 200KB

Le librerie di animazione non devono essere importate dal root layout.

## Fasi successive

FASE 1 finalizza font, palette oraria, treatment e componenti base.
FASE 2 implementa The Switch.
FASE 3 implementa Private Events.
FASE 4 implementa Nightlife / FORMĀ.
FASE 5 chiude SEO, schema, tracking, performance e deploy.
