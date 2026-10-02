# FASE 1 — NIGHTSHIFT Design System

## Principio

JOIA non ha un tema chiaro e uno scuro. Ha due linguaggi visuali indipendenti uniti dal concetto di trasformazione.

- Private Events: editoriale, caldo, materico, lento.
- FORMĀ / Nightlife: condensato, documentario, denso, rapido.
- The Switch: ponte temporale tra i due, controllato dall'ora reale della venue a Napoli.

## Tipografia

### Private

- Display: Bodoni Moda
- UI/body: Manrope
- Titoli: grandi, contrastati, line-height molto stretto, minuscole/maiuscole naturali.
- Microcopy: tracking ampio ma non “wedding template”.

### FORMĀ

- Display: Barlow Condensed
- Data/UI: IBM Plex Mono
- Titoli: uppercase, compressi, line-height aggressivo.
- Mono riservato a data, venue, CTA tecniche, coordinate narrative e metadati.

I font sono caricati con `next/font` e quindi self-hosted da Next in build, senza richieste runtime a Google Fonts.

## Palette

### Private

- Ivory `#F3EEE4`
- Champagne `#D6BD96`
- Bronze `#93623E`
- Warm black `#1B1712`

### FORMĀ

- Deep black `#070806`
- Raised black `#171A14`
- Bone `#E9ECE1`
- Acid chartreuse `#D7FF00`

FORMĀ usa un solo accento cromatico: acid chartreuse. Nessun viola, fucsia o blu neon.

## Fasce temporali

Il controller usa timezone `Europe/Rome` e interpola tra keyframe:

- 00:00 deep night
- 05:00 deep night
- 06:30 dawn
- 09:30 day
- 16:30 day
- 19:00 golden
- 20:45 night
- 23:30 deep night

L'interpolazione aggiorna CSS custom properties una volta al minuto. Non cambia contenuti o markup, quindi non crea problemi SEO o hydration mismatch.

## Motion language

### Private

- easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- scene duration: 900–1200ms
- reveal morbidi, parallax contenuto, transizioni che simulano luce e profondità
- niente bounce, elastic o rotazioni decorative

### FORMĀ

- easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- micro: 180–320ms
- kinetic type, marquee, crop rapidi, cambi di scala secchi
- movimento sempre legato a ritmo, line-up o navigazione

### Reduced motion

Con `prefers-reduced-motion` vengono azzerate le durate e fermate le animazioni decorative.

## Treatment media

`ResilientMedia` implementa tre livelli:

1. video
2. immagine
3. fallback generativo tipografico

Se il video fallisce passa all'immagine; se l'immagine fallisce passa al fallback generativo.

### Private

- saturazione ridotta
- contrasto morbido
- lieve seppia
- overlay champagne/bronze
- vignetta tenue
- maschere: arch / soft-window

### FORMĀ

- saturazione molto ridotta
- contrasto forte
- luminosità più bassa
- acid highlight molto contenuto
- vignetta più profonda
- maschere: slice / notch

## Grana

La grana globale è generata interamente in CSS. Nessun PNG/noise texture viene scaricato.

## Custom cursor

Il cursore custom compare solo con `pointer: fine` e viene disattivato con reduced motion. Su mobile/tablet touch non esiste.

## Componenti FASE 1

- `TimeThemeController`
- `WorldFrame`
- `DisplayHeading`
- `FilmGrain`
- `CustomCursor`
- `KineticMarquee`
- `ResilientMedia`

Questi sono primitive visuali. The Switch, configuratore, eventi e gallery verranno composti nelle fasi successive senza duplicare il design system.
