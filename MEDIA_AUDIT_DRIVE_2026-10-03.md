# JOIA — Media audit Drive

Data audit: 2026-10-03  
Sorgente: cartella Drive `joia/eventi` + `joia/forma`

## Legenda

- **LIVE**: asset inserito nel branch del sito.
- **SELECTED_EDIT**: asset scelto, ma prima del go-live va tagliato/compresso per il web.
- **RESERVE**: valido, ma non serve duplicarlo nella UI attuale; resta candidato per pagine/eventi futuri.
- **ARCHIVE**: da conservare nel CMS/archivio, non usare come media evergreen.

## Sintesi

- Totale asset analizzati: **46**
- Private Events: **32** asset = 28 foto + 4 video
- FORMĀ: **14** asset = 5 foto + 9 video
- Foto portate nel repository: **13**
- Video pubblicati grezzi: **0**
- Video selezionati per editing web: **6**

La scelta di non pubblicare i master video grezzi è intenzionale: i file originali sono da ~1,5 MB a ~27 MB e alcuni contengono montaggi lunghi, copy evento o watermark. Per l'autoplay web vanno generati cut dedicati, idealmente 8–12 secondi, H.264/WebM, poster statico e peso target 1,5–3 MB.

---

# PRIVATE EVENTS — /eventi

| Codice | File originale | Identificazione | Stato | Collocazione |
|---|---|---|---|---|
| E01 | joiaeventiprivati_1772624517_3845375607341584277_60180062458.jpg | Aerialist su straps, luce magenta/rossa, folla | RESERVE | 18 anni / compleanni → gallery entertainment |
| E02 | joiaeventiprivati_1772624517_3845375601368939362_60180062458.jpg | Sparkular/pyro su palco, performer, sfera luminosa | RESERVE | 18 anni → reveal/show |
| E03 | joiaeventiprivati_1772624517_3845375595043890612_60180062458.jpg | Fire performance + grande LED astratto | RESERVE | Party / produzione scenica |
| E04 | joiaeventiprivati_1772624517_3845375588844723976_60180062458.jpg | Performer su cuore sospeso, tavoli sotto | RESERVE | Hero alternativa 18 anni/compleanni |
| E05 | joiaeventiprivati_1772624517_3845375581286577323_60180062458.jpg | Close-up performer sul cuore, fondale rosso con copy | RESERVE | Storytelling entertainment; evitare hero per copy sul LED |
| E06 | joiaeventiprivati_1772624517_3845375574760276364_60180062458.jpg | Ospiti in conversazione, candela, atmosfera lounge | RESERVE | Corporate/networking |
| E07 | joiaeventiprivati_1772624517_3845375568317797261_60180062458.jpg | Performer sul cuore + sfera, crop scenografico | RESERVE | Gallery Private / entertainment |
| E08 | joiaeventiprivati_1772624517_3845375561783080962_60180062458.jpg | Tre ospiti sedute, ritratto social | LIVE | `/media/private/guests.jpg` → gallery welcome/portrait/network |
| E09 | joiaeventiprivati_1772624517_3845375558226288716_60180062458.jpg | Performer con ventagli di fuoco | RESERVE | Party/entertainment |
| E10 | joiaeventiprivati_1772624517_3845375549040804632_60180062458.jpg | Finger food in close-up | RESERVE | Catering detail secondario |
| E11 | joiaeventiprivati_1772624517_3845375543932123250_60180062458.jpg | Fire show sul palco, luce arancio | RESERVE | Party/show |
| E12 | joiaeventiprivati_1772624517_3845375539821708397_60180062458.jpg | Folla rossa, palco sul fondo | RESERVE | Dancefloor / energia |
| E13 | joiaeventiprivati_1772624517_3845375536466278974_60180062458.jpg | Bottle service con sparkler, brindisi | LIVE | `/media/private/toast.jpg` → laurea/compleanno / toast |
| E14 | joiaeventiprivati_1772624517_3845375499346671466_60180062458.jpg | Servizio bar, versata su fila di calici | RESERVE | Service / beverage detail |
| E15 | joiaeventiprivati_1772624517_3845375423052291594_60180062458.jpg | Cassetta premium champagne portata in sala | RESERVE | Bottle service / premium detail |
| E16 | joiaeventiprivati_1787846406_3973066203962032513_60180062458.mp4 | Reel 20s: sala, show, sparkular, food, folla, brindisi | SELECTED_EDIT | Landing Private → “experience reel” dopo hero. Taglio 8–12s |
| E17 | joiaeventiprivati_1788434678_3977999822257424955_60180062458.jpg | Folla con telefoni e luci fredde | RESERVE | 18 anni / party |
| E18 | joiaeventiprivati_1788434678_3977999820655339211_60180062458.jpg | Piatto impiattato, look premium | LIVE | `/media/private/dish.jpg` → gallery food/details |
| E19 | joiaeventiprivati_1788434678_3977999817039863485_60180062458.jpg | Performer con fuoco, controluce rosso | RESERVE | Entertainment |
| E20 | joiaeventiprivati_1788434678_3977999815236215712_60180062458.jpg | Performer nel cuore sospeso sotto sfera | LIVE | `/media/private/entertainment.jpg` → reveal/presentation |
| E21 | joiaeventiprivati_1788434678_3977999811763343346_60180062458.jpg | Wide dancefloor rosso sotto sfera | RESERVE | Party hero alternativa |
| E22 | joiaeventiprivati_1788434678_3977999808961475670_60180062458.jpg | Bar affollato, ambiente cocktail | RESERVE | Cocktail / networking |
| E23 | joiaeventiprivati_1788434678_3977999806705084696_60180062458.jpg | Buffet/canapé assortiti | LIVE | `/media/private/catering.jpg` → catering/cake/buffet |
| E24 | joiaeventiprivati_1788434678_3977999803450364878_60180062458.jpg | Tavola allestita sotto sfera luminosa | LIVE | `/media/private/table.jpg` → dinner + “after” slider |
| E25 | joiaeventiprivati_1788434678_3977999801344648967_60180062458.jpg | Mano di servizio su canapé | RESERVE | Catering / service detail |
| E26 | joiaeventiprivati_1788434678_3977999778729130746_60180062458.jpg | Tavola elegante completa, candele e pampas | LIVE | `/media/private/hero-dinner.jpg` → Hero Private |
| E27 | joiaeventiprivati_1789145516_3983963373400980560_60180062458.mp4 | Reel 20s verticale: sfera, stage, performer, party lighting | SELECTED_EDIT | 18 anni/compleanni → party loop 6–8s |
| E28 | joiaeventiprivati_1789751283_3989044658041516662_60180062458.jpg | Lunga tavola in luce rossa | RESERVE | Dinner / corporate |
| E29 | joiaeventiprivati_1789751283_3989044656078561270_60180062458.jpg | Bottigliera/bar con prodotti | LIVE | `/media/private/bar.jpg` → corporate/brand / bar detail |
| E30 | joiaeventiprivati_1789751283_3989044654887358842_60180062458.jpg | Sfera, fasci luce arancio, performer e crowd | LIVE | `/media/private/party.jpg` → party/dancefloor/closing |
| E31 | joiaeventiprivati_1779110261_3899781076913219763_60180062458.mp4 | Recap lungo 92s, celebrazione, rose, pubblico, close-up | ARCHIVE | Case study evento; estrarre eventualmente montage 10–15s |
| E32 | robertomenzionephotography_1779722748_3904917687770563496_5971680999.mp4 | Recap pro 68s: sfera, crowd, juggling, bottle service, ospiti; watermark finale | SELECTED_EDIT | Private “production film” / case study con credito. Non autoplay raw |

---

# FORMĀ / NIGHTLIFE — /forma

| Codice | File originale | Identificazione | Stato | Collocazione |
|---|---|---|---|---|
| F01 | forma.o0_1774698614_3862773677859562496_21231174379.mp4 | 31s orizzontale: DJ hands, crowd, sfera, flash, energia | SELECTED_EDIT | **Hero FORMĀ desktop**. Cut 8–12s, loop seamless, <3 MB |
| F02 | forma.o0_1775761277_3871687920130214286_21231174379.mp4 | 31s orizzontale: DJ booth, crowd, ritratti, insert B/N | SELECTED_EDIT | Sezione community/manifesto |
| F03 | forma.o0_1776370119_3876796007489009181_21231174379.jpg | Logo FORMĀ luminoso su nero | LIVE | `/media/nightlife/forma-logo.jpg` → visual archive / identity |
| F04 | forma.o0_1776370119_3876796007430236750_21231174379.jpg | Wide red crowd + sfera luminosa | LIVE | `/media/nightlife/forma-hero.jpg` → Hero Night + The Switch |
| F05 | forma.o0_1776370119_3876795463269643915_21231174379.mp4 | 27s verticale: sfera/crowd, movimento lento | RESERVE | Mobile ambient loop backup |
| F06 | forma.o0_1776370119_3876796007421886123_21231174379.jpg | Sala rossa, crowd, sfera e screen | RESERVE | Night hero alternativa / event page |
| F07 | forma.o0_1776370119_3876795521528535835_21231174379.mp4 | 15s verticale: sfera + dancefloor, variazioni luce | SELECTED_EDIT | **Hero FORMĀ mobile**. Cut 8–10s |
| F08 | forma.o0_1776370119_3876796006952120927_21231174379.jpg | Crowd blu/bianco sotto sfera | LIVE | `/media/nightlife/forma-crowd-blue.jpg` → visual archive |
| F09 | forma.o0_1776370119_3876795602235326303_21231174379.mp4 | 28s verticale: sfera/crowd, crescendo fino ad arancio pieno | RESERVE | Atmosphere loop / stories |
| F10 | forma.o0_1776370119_3876795630798565134_21231174379.mp4 | 25s verticale: crowd fitto, blu/arancio, hands-up | SELECTED_EDIT | Community / guest-list section |
| F11 | forma.o0_1776370119_3876796006633319474_21231174379.jpg | Red room, crowd, sfera + logo FORMĀ | LIVE | `/media/nightlife/forma-community.jpg` → community background + archive |
| F12 | forma.o0_1776453569_3877494975869024836_21231174379.mp4 | 44s orizzontale cinematico, B/N + rosso, copy “a new direction”, crowd/logo | SELECTED_EDIT | Brand manifesto / “What is FORMĀ”; player, non background |
| F13 | forma.o0_1787598309_3970983527098565300_21231174379.mp4 | 37s verticale promo specifico con DJ e copy/line-up | ARCHIVE | Pagina evento/anniversary specifica, non evergreen |
| F14 | forma.o0_1790881347_3998524663794865061_21231174379.mp4 | 27s orizzontale teaser scuro, sfera, build-up, “10.10” finale | ARCHIVE | Teaser/event detail 10.10, non hero evergreen |

---

# Collocazioni già applicate nel branch

## The Switch
- Private texture: E26.
- Night texture: F04.
- Le immagini vengono miscelate sopra il motore shader, senza sostituirlo.

## Private Events
- Hero: E26.
- Gallery dinamiche: E08 / E18 / E23 / E13 / E20 / E24 / E29 / E30.
- Slider “Dopo”: E24.
- Le stesse foto vengono riutilizzate semanticamente nelle pagine laurea, 18 anni, compleanni e corporate in base alle label della gallery.

## FORMĀ
- Hero / Next card: F04.
- Community: F11.
- Visual archive: F03 / F08 / F11 / F04.
- Gli ultimi due slot dell'archive restano intenzionalmente generativi finché non arrivano flyer storici reali.

## Video
Nessun master video è stato pubblicato grezzo.
Il trasferimento dei master multi-MB via connettore ha inoltre restituito errori HTTP/2; invece di aggirare il problema caricando file pesanti, i video selezionati restano in Drive e verranno pubblicati dopo transcode web.

Priorità editing:
1. F01 → desktop hero FORMĀ
2. F07 → mobile hero FORMĀ
3. E16 → Private experience reel
4. F10 → Community
5. F12 → Brand manifesto
6. E32 → Private case study
