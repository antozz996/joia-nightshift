import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrivateBriefForm } from "@/components/private/PrivateBriefForm";
import { PrivateConfigurator } from "@/components/private/PrivateConfigurator";
import { PrivateGallery } from "@/components/private/PrivateGallery";
import { PrivateHero } from "@/components/private/PrivateHero";
import { PrivateMoments } from "@/components/private/PrivateMoments";
import styles from "@/components/private/PrivateWorld.module.css";
import { getPrivateEventType, privateEventTypes } from "@/content/private-events";
import { absoluteUrl } from "@/lib/seo/site-url";

type PageProps = { params: Promise<{ tipo: string }> };

export function generateStaticParams() {
  return privateEventTypes.map((item) => ({ tipo: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tipo } = await params;
  const content = getPrivateEventType(tipo);

  if (!content) {
    return { title: "Private Events a Napoli" };
  }

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: absoluteUrl("/private-events/" + tipo + "/") },
  };
}

export default async function PrivateEventTypePage({ params }: PageProps) {
  const { tipo } = await params;
  const content = getPrivateEventType(tipo);

  if (!content) notFound();

  return (
    <main className={styles.page}>
      <PrivateHero
        eyebrow={content.eyebrow}
        title={content.title}
        intro={content.intro}
        secondaryHref="#sequenza"
        secondaryLabel="Vedi la sequenza"
        showHistory={false}
      />

      <section className={styles.section} id="sequenza">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>01 / Ritmo</p>
          <div>
            <h2 className={styles.sectionTitle}>Una serata non è una stanza.</h2>
            <p className={styles.sectionText}>{content.statement}</p>
          </div>
        </div>
        <PrivateMoments moments={content.moments} />
      </section>

      <section className={styles.section} id="layout">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>02 / Assetto</p>
          <div>
            <h2 className={styles.sectionTitle}>Scegli come vuoi occupare lo spazio.</h2>
            <p className={styles.sectionText}>
              Cena, cocktail o party possono essere il punto di partenza. Il layout definitivo
              viene validato sul numero di ospiti e sul progetto reale.
            </p>
          </div>
        </div>
        <PrivateConfigurator />
      </section>

      <section className={styles.section} id="gallery">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>03 / Immagini</p>
          <div>
            <h2 className={styles.sectionTitle}>Il racconto visivo del format.</h2>
            <p className={styles.sectionText}>
              Gli slot useranno solo materiale JOIA. Nessuna immagine stock: se manca una foto,
              resta la composizione generativa prevista dal design system.
            </p>
          </div>
        </div>
        <PrivateGallery items={content.gallery} />
      </section>

      <section className={styles.section} id="brief">
        <div className={styles.briefShell}>
          <div className={styles.briefIntro} data-private-reveal>
            <Link className={styles.backLink} href="/private-events/">
              ← Tutti i Private Events
            </Link>
            <p className={styles.eyebrow} style={{ marginTop: "2rem" }}>
              04 / Richiesta
            </p>
            <h2>Partiamo da quello che sai già.</h2>
            <p>
              Il tipo di evento è già selezionato. Completa persone, data, budget e contatto:
              il brief sarà pronto per il team JOIA.
            </p>
          </div>
          <PrivateBriefForm initialEventType={content.slug} />
        </div>
      </section>
    </main>
  );
}
