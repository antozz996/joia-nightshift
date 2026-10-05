import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./History.module.css";
import { archiveArtists } from "@/content/nightlife";
import { localizedAlternates } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Storia JOIA | Since 2004",
  description:
    "Dal 2004 JOIA attraversa club culture, spettacolo, tecnologia ed eventi privati a Sant’Antimo, Napoli. Scopri l’evoluzione da JOIA Club a JOIA Building e FORMĀ.",
  alternates: localizedAlternates("/storia/", "/en/history/"),
};

const timeline = [
  {
    year: "2004",
    title: "Nasce JOIA Club",
    copy:
      "A Sant’Antimo prende forma un club destinato a diventare un riferimento della nightlife campana: musica, scenografia, luce e produzione diventano parte della stessa esperienza.",
  },
  {
    year: "20+ anni",
    title: "Tre notti. Tre codici.",
    copy:
      "Carillon, SIX e POV costruiscono linguaggi diversi per venerdì, sabato e domenica. Non una sola formula, ma una cultura del format e della trasformazione continua.",
  },
  {
    year: "Oggi",
    title: "JOIA Building",
    copy:
      "Il club evolve in uno spazio contemporaneo capace di passare dalla nightlife agli eventi privati. Architettura flessibile, tecnologia, hospitality e produzione diventano un unico sistema.",
  },
  {
    year: "FORMĀ",
    title: "La notte prende forma",
    copy:
      "FORMĀ è il linguaggio notturno contemporaneo di JOIA: music, shows, club culture, dinner e community. L’heritage resta visibile, ma il presente ha un’identità propria.",
  },
] as const;

export default function HistoryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>JOIA BUILDING / ARCHIVE / SINCE 2004</p>
        <h1 className={styles.title}>
          Vent’anni
          <span>non sono background.</span>
        </h1>
        <p className={styles.lead}>
          JOIA nasce come landmark club e oggi vive come building trasformabile: una storia
          fatta di suono, luce, performance, ospiti e modi diversi di vivere la stessa sala.
        </p>

        <section className={styles.photoArchive} aria-label="Archivio fotografico JOIA">
          <figure className={styles.photoLarge}>
            <Image
              src="/media/nightlife/official/forma-crowd-amber.jpg"
              alt="Crowd JOIA / FORMĀ nella sala illuminata in ambra"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 62vw"
            />
            <figcaption>Room / Crowd / Sant’Antimo</figcaption>
          </figure>
          <figure className={styles.photoSmall}>
            <Image
              src="/media/nightlife/official/forma-room-amber.jpg"
              alt="Sala JOIA / FORMĀ con installazione luminosa"
              fill
              sizes="(max-width: 800px) 100vw, 32vw"
            />
            <figcaption>Building / Light / Archive</figcaption>
          </figure>
        </section>

        <section className={styles.statement}>
          <p className={styles.eyebrow}>La continuità</p>
          <div>
            <h2>Tradizione e innovazione nello stesso edificio.</h2>
            <p>
              La materia cambia, il principio resta: curare atmosfera, produzione e ritmo in
              modo che ogni serata sembri costruita per quel momento. È questo il filo che
              unisce clubbing, private events e la nuova identità FORMĀ.
            </p>
          </div>
        </section>

        <section className={styles.timeline} aria-label="Timeline JOIA">
          {timeline.map((item) => (
            <article className={styles.item} key={item.year + item.title}>
              <span className={styles.year}>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </section>

        <section className={styles.archive}>
          <h2>
            Nomi che hanno <i>lasciato traccia.</i>
          </h2>
          <div className={styles.names}>
            {archiveArtists.map((artist) => (
              <span key={artist.slug}>{artist.name}</span>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <Link className={styles.back} href="/">← Torna agli ingressi</Link>
          <span className={styles.meta}>Sant’Antimo · Napoli · Since 2004</span>
        </footer>
      </div>
    </main>
  );
}
