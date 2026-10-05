import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NightFooter } from "@/components/nightlife/NightFooter";
import { NightMotionController } from "@/components/nightlife/NightMotionController";
import { NightNav } from "@/components/nightlife/NightNav";
import { StructuredData } from "@/components/seo/StructuredData";
import styles from "@/components/nightlife/NightWorld.module.css";
import { archiveArtists, findArchiveArtist } from "@/content/nightlife";
import {
  getNightArtistBySlug,
  getNightEventsForArtist,
} from "@/lib/cms/nightlife";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { artistSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return archiveArtists.map((artist) => ({ slug: artist.slug }));
}

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmsArtist = await getNightArtistBySlug(slug);
  const archiveArtist = findArchiveArtist(slug);
  const artist = cmsArtist ?? archiveArtist;

  if (!artist) {
    return { title: "Artista | JOIA / FORMĀ" };
  }

  const description =
    cmsArtist?.seoDescription ??
    ("Archivio artista JOIA / FORMĀ: " +
      artist.name +
      ". Eventi, memoria nightlife e collegamenti futuri dal CMS.");

  return buildSeoMetadata({
    defaultTitle: artist.name + " | JOIA / FORMĀ",
    defaultDescription: description,
    path: "/artisti/" + slug + "/",
    seo: cmsArtist?.seo,
    fallbackImageUrl: cmsArtist?.portraitUrl,
  });
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const cmsArtist = await getNightArtistBySlug(slug);
  const archiveArtist = findArchiveArtist(slug);
  const artist = cmsArtist ?? archiveArtist;

  if (!artist) notFound();

  const events = cmsArtist ? await getNightEventsForArtist(slug) : [];

  return (
    <div data-world="night">
      <NightMotionController />
      <NightNav />
      {cmsArtist ? (
        <StructuredData data={artistSchema(cmsArtist)} id="artist-schema" />
      ) : null}

      <main className={styles.page}>
        <section className={styles.detailHero}>
          <div data-night-reveal>
            <Link className={styles.backLink} href="/nightlife/#artists">
              ← Artist archive
            </Link>
            <p className={styles.eyebrow} style={{ marginTop: "2rem" }}>
              FORMĀ / ARTIST ARCHIVE
            </p>
            <h1 className={styles.detailTitle}>
              {artist.name}
              <span>.</span>
            </h1>
          </div>

          <aside className={styles.detailAside} data-night-reveal>
            <div className={styles.artistPortrait} aria-hidden="true" />
            {cmsArtist?.country ? <p>{cmsArtist.country}</p> : null}
            {cmsArtist?.genres?.length ? <p>{cmsArtist.genres.join(" · ")}</p> : null}
            {cmsArtist?.instagram ? (
              <p>
                <a href={cmsArtist.instagram} target="_blank" rel="noreferrer">
                  Instagram ↗
                </a>
              </p>
            ) : (
              <p>
                Presenza documentata nell’archivio storico pubblico JOIA. Bio e media verranno
                gestiti dal CMS quando disponibili.
              </p>
            )}
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader} data-night-reveal>
            <p className={styles.eyebrow}>Archive / profile</p>
            <div>
              <h2 className={styles.sectionTitle}>
                Una presenza nella <i>storia JOIA.</i>
              </h2>
              <p className={styles.sectionText}>
                {cmsArtist?.bio ??
                  "Un nome dell’archivio JOIA: profilo, generi ed eventi collegati vengono presentati quando disponibili."}
              </p>
            </div>
          </div>

          {events.length ? (
            <div className={styles.artistRail}>
              {events.map((event) => (
                <Link
                  className={styles.artistLink}
                  href={"/eventi/" + event.slug + "/"}
                  key={event.slug + event.startsAt}
                >
                  <span className={styles.artistIndex}>
                    {formatEventDate(event.startsAt)}
                  </span>
                  <span className={styles.artistName}>{event.title}</span>
                  <span className={styles.artistArrow}>↗</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.result}>
              Gli eventi collegati verranno mostrati qui quando sono presenti nel CMS.
            </div>
          )}
        </section>
      </main>

      <NightFooter />
    </div>
  );
}
