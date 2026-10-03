import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NightFooter } from "@/components/nightlife/NightFooter";
import { NightMotionController } from "@/components/nightlife/NightMotionController";
import { NightNav } from "@/components/nightlife/NightNav";
import { NightlifeLeadForm } from "@/components/nightlife/NightlifeLeadForm";
import { StructuredData } from "@/components/seo/StructuredData";
import styles from "@/components/nightlife/NightWorld.module.css";
import { findNightFormat, nightlifeFormats } from "@/content/nightlife";
import { getNightEventBySlug } from "@/lib/cms/nightlife";
import { absoluteUrl } from "@/lib/seo/site-url";
import { musicEventSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return nightlifeFormats.map((format) => ({ slug: format.slug }));
}

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getNightEventBySlug(slug);
  const archive = findNightFormat(slug);

  if (event) {
    return {
      title: event.title + " | JOIA / FORMĀ",
      description:
        event.seoDescription ??
        ("Evento JOIA / FORMĀ a Napoli — " + formatEventDate(event.startsAt)),
      alternates: { canonical: absoluteUrl("/eventi/" + slug + "/") },
      openGraph: {
        type: "article",
        title: event.title + " | JOIA / FORMĀ",
        description:
          event.seoDescription ??
          ("Evento JOIA / FORMĀ a Napoli — " + formatEventDate(event.startsAt)),
        url: absoluteUrl("/eventi/" + slug + "/"),
      },
    };
  }

  if (archive) {
    return {
      title: archive.name + " — Archivio JOIA",
      description: archive.description,
      alternates: { canonical: absoluteUrl("/eventi/" + slug + "/") },
    };
  }

  return { title: "Evento JOIA / FORMĀ" };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getNightEventBySlug(slug);
  const archive = findNightFormat(slug);

  if (!event && !archive) notFound();

  const title = event?.title ?? archive?.name ?? "JOIA";
  const eyebrow = event ? "FORMĀ / EVENTO" : "JOIA / ARCHIVE FORMAT";
  const description =
    event?.subtitle ??
    archive?.description ??
    "Archivio nightlife JOIA.";

  return (
    <div data-world="night">
      <NightMotionController />
      <NightNav />

      {event ? <StructuredData data={musicEventSchema(event)} id="music-event-schema" /> : null}

      <main className={styles.page}>
        <section className={styles.detailHero}>
          <div data-night-reveal>
            <Link className={styles.backLink} href="/nightlife/">
              ← Torna a FORMĀ
            </Link>
            <p className={styles.eyebrow} style={{ marginTop: "2rem" }}>
              {eyebrow}
            </p>
            <h1 className={styles.detailTitle}>
              {title}
              <span>.</span>
            </h1>
          </div>

          <aside className={styles.detailAside} data-night-reveal>
            <p>{description}</p>

            {event ? (
              <>
                <p>{formatEventDate(event.startsAt)}</p>

                {event.artists?.length ? (
                  <p>
                    Line-up:{" "}
                    {event.artists.map((artist, index) => (
                      <span key={artist.slug}>
                        {index ? " · " : ""}
                        <Link href={"/artisti/" + artist.slug + "/"}>{artist.name}</Link>
                      </span>
                    ))}
                  </p>
                ) : null}

                <div className={styles.ctaRow}>
                  {event.ticketUrl ? (
                    <a className={styles.primaryButton} href={event.ticketUrl}>
                      Ticket ↗
                    </a>
                  ) : null}
                  {event.tableUrl ? (
                    <a className={styles.secondaryButton} href={event.tableUrl}>
                      Tavolo ↗
                    </a>
                  ) : (
                    <Link className={styles.secondaryButton} href="#request">
                      Tavolo / guest list
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <p>
                Questo è un format dell’archivio storico JOIA. Le singole date vengono
                pubblicate come eventi separati nel CMS.
              </p>
            )}
          </aside>
        </section>

        <section className={styles.section} id="request">
          <div className={styles.leadGrid}>
            <div className={styles.leadIntro} data-night-reveal>
              <p className={styles.eyebrow}>Access / request</p>
              <h2>{event ? "Entra nella serata." : "Resta sulla frequenza."}</h2>
              <p>
                {event
                  ? "Richiedi tavolo o guest list indicando quante persone siete. Il team riceve la richiesta già contestualizzata sull’evento."
                  : "Iscriviti alla community per ricevere la prossima pubblicazione collegata a questo format."}
              </p>
            </div>

            <NightlifeLeadForm
              initialKind={event ? "table" : "community"}
              initialEvent={event ? event.title : archive?.name}
            />
          </div>
        </section>
      </main>

      <NightFooter />
    </div>
  );
}
