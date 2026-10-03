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
import { getPrivateEventTypeBySlug } from "@/lib/cms/private-events";
import { buildSeoMetadata } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ tipo: string }> };

export function generateStaticParams() {
  return privateEventTypes.map((item) => ({ tipo: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tipo } = await params;
  const staticContent = getPrivateEventType(tipo);
  const cmsContent = await getPrivateEventTypeBySlug(tipo);

  if (!cmsContent && !staticContent) {
    return {
      title: "Private Events a Napoli",
      robots: { index: false, follow: false },
    };
  }

  const title =
    cmsContent?.seoTitle ??
    staticContent?.seoTitle ??
    (cmsContent?.title ? cmsContent.title + " a Napoli" : "Private Events a Napoli");

  const description =
    cmsContent?.seoDescription ??
    staticContent?.seoDescription ??
    cmsContent?.intro ??
    "JOIA Private Events a Napoli: uno spazio trasformabile per eventi costruiti su misura.";

  return buildSeoMetadata({
    defaultTitle: title,
    defaultDescription: description,
    path: "/private-events/" + tipo + "/",
    seo: cmsContent
      ? {
          ...cmsContent.seo,
          title: cmsContent.seo?.title ?? cmsContent.seoTitle,
          description: cmsContent.seo?.description ?? cmsContent.seoDescription,
        }
      : undefined,
    fallbackImageUrl: cmsContent?.heroUrl,
  });
}

export default async function PrivateEventTypePage({ params }: PageProps) {
  const { tipo } = await params;
  const staticContent = getPrivateEventType(tipo);
  const cmsContent = await getPrivateEventTypeBySlug(tipo);

  if (!cmsContent && !staticContent) notFound();

  const title = cmsContent?.title ?? staticContent?.title ?? "Private Event";
  const eyebrow =
    cmsContent?.eyebrow ??
    staticContent?.eyebrow ??
    "Private / " + title;
  const intro =
    cmsContent?.intro ??
    staticContent?.intro ??
    "Uno spazio JOIA costruito intorno al tuo evento.";
  const statement =
    cmsContent?.statement ??
    staticContent?.statement ??
    "Layout, luce e ritmo vengono definiti in base alle persone e al tipo di esperienza.";
  const moments =
    cmsContent?.moments?.length
      ? cmsContent.moments
      : staticContent?.moments ?? ["Accoglienza", "Esperienza", "Celebration", "Party"];

  const cmsGallery = cmsContent?.gallery
    ?.filter((item) => Boolean(item.url))
    .map((item, index) => ({
      src: item.url,
      alt: item.alt ?? title + " — immagine " + (index + 1),
      label: item.caption ?? title,
    }));

  return (
    <main className={styles.page}>
      <PrivateHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        secondaryHref="#sequenza"
        secondaryLabel="Vedi la sequenza"
        showHistory={false}
        imageSrc={cmsContent?.heroUrl}
        imageAlt={title + " — JOIA Private Events"}
      />

      <section className={styles.section} id="sequenza">
        <div className={styles.sectionHeader} data-private-reveal>
          <p className={styles.eyebrow}>01 / Ritmo</p>
          <div>
            <h2 className={styles.sectionTitle}>Una serata non è una stanza.</h2>
            <p className={styles.sectionText}>{statement}</p>
          </div>
        </div>
        <PrivateMoments moments={moments} />
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
              Materiale JOIA reale, gestibile dal CMS e ottimizzato per ogni formato.
            </p>
          </div>
        </div>
        <PrivateGallery
          items={staticContent?.gallery}
          media={cmsGallery?.length ? cmsGallery : undefined}
        />
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
          <PrivateBriefForm initialEventType={tipo} />
        </div>
      </section>
    </main>
  );
}
