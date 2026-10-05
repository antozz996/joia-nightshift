import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { archiveArtists, nightlifeFormats } from "@/content/nightlife";
import { absoluteUrl } from "@/lib/seo/site-url";
import styles from "./HistoryWorld.module.css";

export const metadata: Metadata = {
  title: "Storia JOIA | Since 2004",
  description:
    "Dal 2004 JOIA è un punto di riferimento della nightlife campana. Club culture, artisti, scenografia, eventi privati e l'evoluzione verso JOIA Building.",
  alternates: { canonical: absoluteUrl("/storia/") },
};

export default function HistoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link className={styles.brand} href="/">
          <BrandLogo brand="joia" className={styles.brandLogo} priority alt="JOIA" />
          <span>Since 2004</span>
        </Link>
        <nav className={styles.links} aria-label="Navigazione storia">
          <Link href="/private-events/">Private Events</Link>
          <Link href="/nightlife/">FORMĀ</Link>
          <Link href="/location/">Location</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Sant&apos;Antimo · Napoli · Since 2004</p>
          <h1>
            Prima di FORMĀ,
            <span>c&apos;era già una storia.</span>
          </h1>
          <p>
            JOIA nasce nel 2004 e diventa nel tempo un riferimento della nightlife
            campana. Tradizione e innovazione convivono nello stesso spazio: musica,
            performance, scenografia, lighting, sound e una cultura dell&apos;ospitalità
            costruita serata dopo serata.
          </p>
        </div>

        <figure className={styles.heroMedia}>
          <Image
            src="/media/official/location/forma-location-6.jpg"
            alt="Sala JOIA durante una serata"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 44vw"
          />
          <span className={styles.mediaShade} aria-hidden="true" />
        </figure>
      </section>

      <section className={styles.chapter}>
        <p className={styles.eyebrow}>01 / Evoluzione</p>
        <div className={styles.chapterGrid}>
          <div>
            <h2>Da club a <i>building.</i></h2>
          </div>
          <div className={styles.prose}>
            <p>
              JOIA ha costruito la propria reputazione attraverso programmazione musicale,
              performance e serate con identità dedicate. Oggi quella stessa capacità di
              trasformazione vive in due direzioni: la notte di FORMĀ e gli eventi privati.
            </p>
            <p>
              Lo spazio non cambia solo estetica: cambiano layout, ritmo, servizio,
              scenografia e modo di vivere la sala.
            </p>
          </div>
        </div>

        <div className={styles.photoPair}>
          <figure>
            <Image
              src="/media/official/location/forma-location-2.jpg"
              alt="Dancefloor JOIA e visual di palco"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </figure>
          <figure>
            <Image
              src="/media/official/location/forma-location-4.jpg"
              alt="Performance durante una serata JOIA"
              fill
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </figure>
        </div>
      </section>

      <section className={styles.chapter}>
        <p className={styles.eyebrow}>02 / Heritage formats</p>
        <div className={styles.formatGrid}>
          {nightlifeFormats.map((format) => (
            <Link className={styles.formatCard} href={"/eventi/" + format.slug + "/"} key={format.slug}>
              <span>{format.index}</span>
              <strong>{format.name}</strong>
              <small>{format.day}</small>
              <p>{format.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.artistSection}>
        <div className={styles.artistHeader}>
          <p className={styles.eyebrow}>03 / Artist memory</p>
          <h2>Nomi che hanno attraversato JOIA.</h2>
        </div>
        <div className={styles.artistRail}>
          {archiveArtists.map((artist, index) => (
            <Link href={"/artisti/" + artist.slug + "/"} key={artist.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{artist.name}</strong>
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <BrandLogo brand="joia" className={styles.finalLogo} alt="" />
        <p>Una storia. Due modi contemporanei di viverla.</p>
        <div>
          <Link href="/private-events/">Private Events</Link>
          <Link href="/nightlife/">FORMĀ / Nightlife</Link>
        </div>
      </section>
    </main>
  );
}
