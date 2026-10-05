# JOIA — NIGHTSHIFT

Base tecnica completata fino alla **FASE 1 — Design System**.

## Requisiti

- Node.js 20+
- npm
- progetto Sanity

## Installazione

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:3000`.

## Sanity Studio

Compila almeno:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
```

Poi:

```bash
npm run studio
```

## Verifiche

```bash
npm run typecheck
npm run lint
npm run build
```

## Stato progetto

- FASE 0: architettura, routing, CMS, content model — completata
- FASE 1: palette temporale, tipografia, treatment layer, primitive visuali — completata
- FASE 2: The Switch — da implementare
- FASE 3: Private Events — da implementare
- FASE 4: FORMĀ / Nightlife — da implementare
- FASE 5: SEO, performance, tracking, deploy — da implementare

Consulta `ARCHITECTURE.md` e `PHASE1_DESIGN_SYSTEM.md`.

## Nota font

I font vengono caricati con `next/font/google`: durante la build Next li scarica e li self-hosta. Il browser finale non dipende da Google Fonts a runtime.


## Drive media curation

2026-10-03: analizzati 46 asset reali JOIA / FORMĀ dal Drive; selezione fotografica integrata nel sito e report completo disponibile in `MEDIA_AUDIT_DRIVE_2026-10-03.md`.


<!-- deploy-trigger: official-media-2026-10-05 -->
