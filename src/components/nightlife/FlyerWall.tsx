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
    meta: "ROOM / CROWD",
    title: "AMBER ROOM",
    media: "/media/nightlife/official/forma-crowd-amber.jpg",
    alt: "Folla FORMĀ nella sala illuminata in ambra",
  },
  {
    meta: "SHOW / EDITORIAL",
    title: "CHARACTER",
    media: "/media/nightlife/official/forma-editorial-show.jpg",
    alt: "Ritratto editoriale durante una serata FORMĀ",
  },
  {
    meta: "ROOM / LIGHT",
    title: "BUILDING",
    media: "/media/nightlife/official/forma-room-amber.jpg",
    alt: "Sala FORMĀ con pubblico e installazione luminosa",
  },
  {
    meta: "COMMUNITY / EDITORIAL",
    title: "GUEST",
    media: "/media/nightlife/official/forma-editorial-guest.jpg",
    alt: "Ritratto guest durante una serata FORMĀ",
  },
  {
    meta: "COMMUNITY / BLUE",
    title: "FREQUENCY",
    media: "/media/nightlife/forma-crowd-blue.jpg",
    alt: "Crowd FORMĀ sotto la sfera luminosa",
  },
] as const;

export function FlyerWall() {
  return (
    <div className={styles.flyerWall} aria-label="Archivio visuale JOIA / FORMĀ">
      {archiveTiles.map((item, index) => (
        <article
          className={styles.flyer}
          data-media-slot={item.media}
          key={item.meta + item.title}
          data-night-skew
        >
          <Image
            className={styles.flyerImage}
            src={item.media}
            alt={item.alt}
            fill
            sizes="(max-width: 900px) 50vw, 28vw"
          />
          <span className={styles.flyerShade} aria-hidden="true" />
          <span>{item.meta}</span>
          <strong>{item.title}</strong>
          <span>JOIA / FORMĀ ↗</span>
        </article>
      ))}
    </div>
  );
}
