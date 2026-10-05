import type { Metadata } from "next";
import { FlyerWall } from "@/components/nightlife/FlyerWall";
import { FormaDinner } from "@/components/nightlife/FormaDinner";
import { FormaRoom } from "@/components/nightlife/FormaRoom";
import { NightArtists } from "@/components/nightlife/NightArtists";
import { NightFormats } from "@/components/nightlife/NightFormats";
import { NightHero } from "@/components/nightlife/NightHero";
import { NightlifeLeadForm } from "@/components/nightlife/NightlifeLeadForm";
import { KineticMarquee } from "@/components/shared/KineticMarquee";
import { FaqSection } from "@/components/seo/FaqSection";
import { nightlifeFaqs } from "@/content/faqs";
import { localizedAlternates } from "@/lib/seo/site-url";
import styles from "@/components/nightlife/NightWorld.module.css";

export const metadata: Metadata = {
  title: "FORMĀ / Nightlife a Napoli",
  description:
    "JOIA nightlife: musica, artisti, serate, ticket, tavoli e community. FORMĀ è il linguaggio notturno di JOIA a Napoli.",
  alternates: localizedAlternates("/nightlife/", "/en/nightlife/"),
};

export default function NightlifePage() {
  return (
    <main className={styles.page}>
      <NightHero />

      <KineticMarquee
        items={[
          "FORMĀ",
          "JOIA",
          "NAPOLI",
          "SINCE 2004",
          "MUSIC / SHOWS / CLUB CULTURE",
          "ARTISTS",
          "COMMUNITY",
        ]}
        label="FORMĀ / JOIA nightlife"
      />

      <section className={styles.section} id="room">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>01 / The room</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Una sala. <i>Molte intensità.</i>
            </h2>
            <p className={styles.sectionText}>
              Gli scatti ufficiali FORMĀ raccontano una stanza che cambia con pubblico,
              lighting, performance e visual. Non una scenografia fissa: un ambiente che
              assume un carattere diverso a ogni programmazione.
            </p>
          </div>
        </div>
        <FormaRoom />
      </section>

      <section className={styles.section} id="dinner">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>02 / Dinner at FORMĀ</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Prima del club, <i>la tavola.</i>
            </h2>
            <p className={styles.sectionText}>
              Food & beverage fanno parte dell’esperienza JOIA. Il materiale ufficiale
              entra nel sito come un prodotto vero, pronto a ospitare menu, formule Dinner
              + Night e richieste tavolo quando il CMS sarà alimentato.
            </p>
          </div>
        </div>
        <FormaDinner />
      </section>

      <section className={styles.section} id="formats">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>03 / Heritage map</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Tre notti. <i>Tre codici.</i>
            </h2>
            <p className={styles.sectionText}>
              Carillon, SIX e POV appartengono all’heritage JOIA. Li manteniamo come memoria
              navigabile del club, separandoli dalla programmazione contemporanea FORMĀ.
            </p>
          </div>
        </div>
        <NightFormats />
      </section>

      <section className={styles.section} id="archive">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>04 / Visual archive</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Vent’anni non sono <i>background.</i>
            </h2>
            <p className={styles.sectionText}>
              Sono materiale. La parete ora mescola fotografie FORMĀ reali con slot riservati
              ai flyer storici che devono ancora essere raccolti: nessuna immagine stock e
              nessun falso archivio.
            </p>
          </div>
        </div>
        <FlyerWall />
      </section>

      <section className={styles.section} id="artists">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>05 / Artist archive</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Nomi che hanno <i>lasciato frequenza.</i>
            </h2>
            <p className={styles.sectionText}>
              Se Sanity contiene artisti in evidenza, questa sezione si aggiorna
              automaticamente. Fino ad allora usa una selezione dell’archivio storico
              dichiarato da JOIA.
            </p>
          </div>
        </div>
        <NightArtists />
      </section>

      <FaqSection items={nightlifeFaqs} world="night" />

      <section className={styles.section} id="community">
        <div className={styles.leadGrid}>
          <div className={styles.leadIntro} data-night-reveal>
            <p className={styles.eyebrow}>06 / Community channel</p>
            <h2>Prima che diventi pubblico.</h2>
            <p>
              Community, tavoli e guest list condividono un solo punto d’ingresso. Le
              richieste Dinner + Night e Champagneria possono partire dallo stesso canale,
              senza frammentare l’esperienza in moduli diversi.
            </p>
          </div>
          <NightlifeLeadForm />
        </div>
      </section>
    </main>
  );
}
