import type { Metadata } from "next";
import { PrivateTransformation } from "@/components/private/PrivateTransformation";
import { PrivateBriefForm } from "@/components/private/PrivateBriefForm";
import { PrivateConfigurator } from "@/components/private/PrivateConfigurator";
import { PrivateGallery } from "@/components/private/PrivateGallery";
import { PrivateHero } from "@/components/private/PrivateHero";
import { PrivatePillars } from "@/components/private/PrivatePillars";
import { PrivateTypeCards } from "@/components/private/PrivateTypeCards";
import { FaqSection } from "@/components/seo/FaqSection";
import { privateFaqs } from "@/content/faqs";
import { localizedAlternates } from "@/lib/seo/site-url";
import styles from "@/components/private/PrivateWorld.module.css";

export const metadata: Metadata = {
  title: "Private Events a Napoli",
  description:
    "JOIA Private Events: uno spazio a Napoli che cambia intorno al tuo evento. Lauree, 18 anni, compleanni ed eventi aziendali.",
  alternates: localizedAlternates("/private-events/", "/en/private-events/"),
};

export default function PrivateEventsPage() {
  return (
    <main className={styles.page}>
      <PrivateHero
        title="La sala cambia intorno al tuo evento."
        intro="JOIA non è un nightclub da prendere in affitto. È uno spazio con una storia, una regia e una capacità precisa: cambiare atmosfera, ritmo e disposizione intorno alle persone."
      />

      <section className={styles.section + " " + styles.sectionCapabilities} id="capabilities">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>01 / Cosa stai comprando</p>
          <div>
            <h2 className={styles.sectionTitle}>Non solo una sala. Un sistema di produzione.</h2>
            <p className={styles.sectionText}>
              Il valore di JOIA Building sta nella capacità di tenere insieme spazio, food,
              tecnologia e gestione. Quattro leve che cambiano in base all’evento.
            </p>
          </div>
        </div>
        <PrivatePillars />
      </section>

      <section className={styles.section + " " + styles.sectionSoft} id="formati">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>02 / Scegli il motivo</p>
          <div>
            <h2 className={styles.sectionTitle}>La stessa sala. Quattro storie diverse.</h2>
            <p className={styles.sectionText}>
              Il format non parte da un pacchetto. Parte dal motivo per cui le persone si
              incontrano e costruisce intorno a quello una sequenza, un tono e un ritmo.
            </p>
          </div>
        </div>
        <PrivateTypeCards />
      </section>

      <section className={styles.section + " " + styles.sectionWarm} id="layout">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>03 / Configura lo spazio</p>
          <div>
            <h2 className={styles.sectionTitle}>
              Cena. Cocktail.<br />Party.
            </h2>
            <p className={styles.sectionText}>
              Tre modi diversi di occupare la sala. Il configuratore racconta la logica del
              layout; le capienze ufficiali verranno pubblicate solo dopo validazione della
              proprietà.
            </p>
          </div>
        </div>
        <PrivateConfigurator />
      </section>

      <section className={styles.section + " " + styles.sectionBronze} id="trasformazione">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>04 / Trasformazione</p>
          <div>
            <h2 className={styles.sectionTitle}>Non decorare lo spazio. Cambiarne il ritmo.</h2>
            <p className={styles.sectionText}>
              La trasformazione non è un effetto grafico: si legge nei tavoli, nella luce,
              nella produzione e nel modo in cui la sala passa dall’accoglienza al party.
            </p>
          </div>
        </div>
        <PrivateTransformation />
      </section>

      <section className={styles.section + " " + styles.sectionGallery} id="gallery">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>05 / Atmosfera</p>
          <div>
            <h2 className={styles.sectionTitle}>Materiale vero, trattato come un editoriale.</h2>
            <p className={styles.sectionText}>
              Qui usiamo materiale JOIA reale: ospiti, tavoli, catering, performance e
              dancefloor. Le immagini cambiano in base al tipo di evento senza ricorrere a
              fotografie stock.
            </p>
          </div>
        </div>
        <PrivateGallery />
      </section>

      <FaqSection items={privateFaqs} world="private" />

      <section className={styles.section + " " + styles.sectionBrief} id="brief">
        <div className={styles.briefShell}>
          <div className={styles.briefIntro} data-private-reveal>
            <p className={styles.eyebrow}>06 / Il tuo evento</p>
            <h2>Raccontacelo in cinque passi.</h2>
            <p>
              Bastano tipo di evento, persone, data, budget e un contatto. Il team riceve un
              brief già ordinato e tu puoi proseguire la stessa richiesta su WhatsApp.
            </p>
          </div>
          <PrivateBriefForm />
        </div>
      </section>
    </main>
  );
}
