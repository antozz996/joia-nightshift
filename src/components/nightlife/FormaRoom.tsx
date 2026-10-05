import Image from "next/image";
import styles from "./NightWorld.module.css";

const roomMedia = [
  {
    src: "/media/official/location/forma-location-2.jpg",
    alt: "Dancefloor FORMĀ con palco e pubblico",
    label: "THE ROOM",
  },
  {
    src: "/media/official/location/forma-location-6.jpg",
    alt: "Sala FORMĀ con pubblico e installazione luminosa",
    label: "CROWD",
  },
  {
    src: "/media/official/location/forma-location-4.jpg",
    alt: "Performance e nightlife FORMĀ",
    label: "PERFORMANCE",
  },
  {
    src: "/media/official/location/forma-location-3.jpg",
    alt: "Community e stile durante una serata FORMĀ",
    label: "COMMUNITY",
  },
] as const;

export function FormaRoom() {
  return (
    <div className={styles.roomGrid}>
      {roomMedia.map((item, index) => (
        <figure className={styles.roomCard} key={item.src}>
          <Image
            className={styles.roomImage}
            src={item.src}
            alt={item.alt}
            fill
            sizes={index === 0 ? "(max-width: 900px) 100vw, 52vw" : "(max-width: 900px) 50vw, 24vw"}
          />
          <span className={styles.roomShade} aria-hidden="true" />
          <figcaption className={styles.roomCaption}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{item.label}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
