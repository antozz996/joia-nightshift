# FASE 2 — The Switch

## Obiettivo

La home / è un ingresso reale e indicizzabile, non una splash vuota. Contiene titolo, descrizione e due link HTML permanenti:

- /private-events/
- /nightlife/

## Interazione

### Desktop

- Il punto luce segue il cursore.
- Il movimento del mouse influenza progressivamente l'atmosfera giorno/notte.
- Il drag orizzontale controlla direttamente il mix.
- Hover/focus su Private o FORMĀ porta la luce verso il relativo mondo.
- Click attiva una breve transizione di luce e poi naviga.

### Mobile

- Il punto luce segue il dito durante l'interazione.
- Il drag è verticale: verso l'alto entra nella notte, verso il basso torna al mondo Private.
- Uno swipe deciso naviga direttamente.
- I due link rimangono sempre disponibili via tap.

## Shader

SwitchShaderCanvas.tsx usa OGL con:

- fragment shader procedural noise;
- interpolazione avorio/champagne/bronzo → deep black;
- acid chartreuse esclusivamente nel mondo notte;
- glow reattivo alla posizione del puntatore;
- DPR massimo 1.5 per non sprecare GPU.

Lo shader è caricato con next/dynamic solo lato client e attivato durante idle.

## Performance fallback

SwitchMediaStage interroga getPreferredVisualCapability():

- full → shader OGL lazy;
- reduced/static → rimane il background CSS completo;
- Save-Data e prefers-reduced-motion non caricano WebGL.

La home resta quindi leggibile e visivamente coerente anche senza canvas.

## Future twin-video slot

SwitchMediaStage espone data-future-media-slot="twin-room-video-shader-mix".

È il punto di sostituzione previsto per due riprese gemelle della sala:

- private-room.mp4
- night-room.mp4

Quando saranno disponibili, il fragment shader potrà campionare due texture e miscelarle con lo stesso valore mix, senza cambiare UX, SEO o architettura della pagina.

## Accessibilità / SEO

- main, header, section, nav, footer semantici;
- H1 e testo chiave sono HTML;
- destinazioni reali tramite next/link;
- focus keyboard visibile;
- modificatori Ctrl/Cmd/Shift sui link non vengono intercettati;
- reduced motion elimina la transizione di uscita;
- nessun audio e nessun video autoplay in questa fase.
