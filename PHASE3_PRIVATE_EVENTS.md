# FASE 3 — Private Events

## Pagine

- /private-events/
- /private-events/feste-di-laurea/
- /private-events/18-anni/
- /private-events/compleanni/
- /private-events/eventi-aziendali/

## Esperienza

Il mondo Private è separato dal linguaggio FORMĀ:

- avorio, champagne, bronzo e nero caldo;
- Bodoni Moda + Manrope;
- archi e geometrie morbide;
- scroll lento e reveal progressivi;
- niente estetica nightclub.

## Configuratore

Tre layout:

1. Cena
2. Cocktail
3. Party

Le capienze sono intenzionalmente lasciate non numeriche finché la proprietà non approva i dati.
Lo schema Sanity contiene già i tre campi numerici da valorizzare.

## Prima / dopo

PrivateBeforeAfter implementa un confronto interattivo generativo.
Quando avremo il materiale reale potrà ricevere:

- sala neutra;
- sala trasformata.

Non servono immagini stock.

## Gallery

Gli slot visuali sono generativi finché non vengono caricati asset JOIA.
Percorso previsto per placeholder locali:

/public/media/private/

In produzione le immagini editoriali verranno gestite da Sanity con hotspot e crop.

## Brief

Flusso in 5 step:

1. tipo evento;
2. persone;
3. data;
4. budget;
5. contatto.

POST:

/api/private-brief

Se RESEND_API_KEY e PRIVATE_BRIEF_EMAIL_FROM sono configurati, la richiesta viene inviata server-side tramite Resend.
Se il provider non è configurato, l'API restituisce fallback email e WhatsApp già precompilati.

Variabili:

NEXT_PUBLIC_JOIA_WHATSAPP
RESEND_API_KEY
PRIVATE_BRIEF_EMAIL_TO
PRIVATE_BRIEF_EMAIL_FROM

## Motion

PrivateMotionController carica GSAP, ScrollTrigger e Lenis solo sulle route Private.
Con prefers-reduced-motion non vengono avviate le animazioni.

## Contatti

I contatti pubblicati nel config sono quelli attualmente esposti dal sito JOIA esistente.
Prima del go-live definitivo va confermato con la proprietà che il numero mobile sia anche il numero WhatsApp ufficiale.
