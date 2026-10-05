import type { Metadata } from "next";
import { FlyerWall } from "@/components/nightlife/FlyerWall";
import { NightArtists } from "@/components/nightlife/NightArtists";
import { NightDinner } from "@/components/nightlife/NightDinner";
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
          "JOIA BUILDING",
          "NAPOLI",
          "SINCE 2004",
          "MUSIC",
          "SHOWS",
          "DINNER",
          "COMMUNITY",
        ]}
        label="FORMĀ / JOIA nightlife"
      />

      <section className={styles.section} id="dinner">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>01 / Dinner & night</p>
          <div>
            <h2 className={styles.sectionTitle}>
              La notte può <i>iniziare a tavola.</i>
            </h2>
            <p className={styles.sectionText}>
              FORMĀ non è solo ingresso in club: dinner, champagneria, tavoli e dancefloor
              possono vivere nello stesso percorso. Il materiale food ufficiale JOIA conferma
              questa parte dell’esperienza e diventerà gestibile dal CMS per ogni serata.
            </p>
          </div>
        </div>
        <NightDinner />
      </section>

      <section className={styles.section} id="formats">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>02 / Heritage map</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Tre notti. <i>Tre codici.</i>
            </h2>
            <p className={styles.sectionText}>
              Carillon, SIX e POV appartengono all’heritage JOIA: tre codici che hanno
              raccontato venerdì, sabato e domenica. Qui restano archivio e memoria del club,
              senza confonderli con la programmazione contemporanea FORMĀ.
            </p>
          </div>
        </div>
        <NightFormats />
      </section>

      <section className={styles.section} id="archive">
        <div className={styles.sectionHeader} data-night-reveal>
          <p className={styles.eyebrow}>03 / Visual archive</p>
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
          <p className={styles.eyebrow}>04 / Artist archive</p>
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
            <p className={styles.eyebrow}>05 / Community channel</p>
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
