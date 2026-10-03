import Image from "next/image";
import styles from "./NightWorld.module.css";

const archiveTiles = [
  {
    meta: "FORMĀ / ID",
    title: "FORMĀ",
    media: "/media/nightlife/forma-logo.jpg",
    alt: "Logo FORMĀ nella sala JOIA",
  },
  {
    meta: "LIGHT / CROWD",
    title: "BLUE HOUR",
    media: "/media/nightlife/forma-crowd-blue.jpg",
    alt: "Folla FORMĀ illuminata da luce blu",
  },
  {
    meta: "COMMUNITY",
    title: "TOGETHER",
    media: "/media/nightlife/forma-community.jpg",
    alt: "Dancefloor e community FORMĀ",
  },
  {
    meta: "ROOM / SPHERE",
    title: "SIGNAL",
    media: "/media/nightlife/forma-hero.jpg",
    alt: "Sala FORMĀ con sfera luminosa e pubblico",
  },
  {
    meta: "ARCHIVE SLOT",
    title: "FLYER",
    media: null,
    alt: "",
  },
  {
    meta: "ARCHIVE SLOT",
    title: "PAST / NEXT",
    media: null,
    alt: "",
  },
] as const;

export function FlyerWall() {
  return (
    <div className={styles.flyerWall} aria-label="Archivio visuale JOIA / FORMĀ">
      {archiveTiles.map((item, index) => (
        <article
          className={styles.flyer}
          data-media-slot={item.media ?? "/public/media/archive/flyer-" + (index + 1) + ".webp"}
          key={item.meta + item.title}
          data-night-skew
        >
          {item.media ? (
            <>
              <Image
                className={styles.flyerImage}
                src={item.media}
                alt={item.alt}
                fill
                sizes="(max-width: 900px) 50vw, 28vw"
              />
              <span className={styles.flyerShade} aria-hidden="true" />
            </>
          ) : null}
          <span>{item.meta}</span>
          <strong>{item.title}</strong>
          <span>{item.media ? "JOIA / FORMĀ ↗" : "Materiale storico richiesto ↗"}</span>
        </article>
      ))}
    </div>
  );
}
