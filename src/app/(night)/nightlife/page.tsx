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
              possono vivere nello stesso percorso. La serata può iniziare a tavola e cambiare
              ritmo senza mai cambiare luogo.
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
              Sono materia viva: sala, folla, performance, dettagli e identità. Un archivio
              visivo costruito esclusivamente con immagini reali JOIA e FORMĀ.
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
              Una selezione di artisti e presenze che hanno attraversato la storia di JOIA,
              collegando l’heritage del club alla nuova identità FORMĀ.
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
              Community, tavoli e guest list condividono un solo punto d’ingresso. Scegli
              come vuoi vivere la prossima notte e lascia al team JOIA i dati per ricontattarti.
            </p>
          </div>
          <NightlifeLeadForm />
        </div>
      </section>
    </main>
  );
}
