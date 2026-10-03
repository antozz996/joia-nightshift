import type { Metadata } from "next";
import { FlyerWall } from "@/components/nightlife/FlyerWall";
import { NightArtists } from "@/components/nightlife/NightArtists";
import { NightFormats } from "@/components/nightlife/NightFormats";
import { NightHero } from "@/components/nightlife/NightHero";
import { NightlifeLeadForm } from "@/components/nightlife/NightlifeLeadForm";
import { KineticMarquee } from "@/components/shared/KineticMarquee";
import styles from "@/components/nightlife/NightWorld.module.css";

export const metadata: Metadata = {
  title: "FORMĀ / Nightlife a Napoli",
  description:
    "JOIA nightlife: musica, artisti, serate, ticket, tavoli e community. FORMĀ è il linguaggio notturno di JOIA a Napoli.",
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
          "LISTENING HOUSE",
          "ARTISTS",
          "COMMUNITY",
        ]}
        label="FORMĀ / JOIA nightlife"
      />

      <section className={styles.section} id="formats">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>01 / Frequency map</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Tre notti. <i>Tre codici.</i>
            </h2>
            <p className={styles.sectionText}>
              L’heritage pubblico di JOIA racconta tre format ricorrenti: Carillon il venerdì,
              SIX il sabato e POV la domenica. Qui diventano archivio navigabile e base
              editoriale per la nuova identità FORMĀ.
            </p>
          </div>
        </div>
        <NightFormats />
      </section>

      <section className={styles.section} id="archive">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>02 / Flyer archive</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Vent’anni non sono <i>background.</i>
            </h2>
            <p className={styles.sectionText}>
              Sono materiale. Gli slot qui sotto sono pronti per flyer storici, locandine,
              screenshot, clip e grafiche reali: nessuna immagine stock e nessun archivio
              inventato.
            </p>
          </div>
        </div>
        <FlyerWall />
      </section>

      <section className={styles.section} id="artists">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>03 / Artist archive</p>
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

      <section className={styles.section} id="community">
        <div className={styles.leadGrid}>
          <div className={styles.leadIntro} data-night-reveal>
            <p className={styles.eyebrow}>04 / Community channel</p>
            <h2>Prima che diventi pubblico.</h2>
            <p>
              Community, tavoli e guest list condividono un solo punto d’ingresso. Il form
              invia al team JOIA e, se il provider email non è ancora configurato, genera
              subito il fallback WhatsApp o email.
            </p>
          </div>
          <NightlifeLeadForm />
        </div>
      </section>
    </main>
  );
}
