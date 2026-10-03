import Link from "next/link";
import { nightlifeFormats } from "@/content/nightlife";
import styles from "./NightWorld.module.css";

export function NightFormats() {
  return (
    <div className={styles.formatGrid}>
      {nightlifeFormats.map((format) => (
        <Link
          className={styles.formatCard}
          href={"/eventi/" + format.slug + "/"}
          key={format.slug}
          data-night-reveal
        >
          <div className={styles.formatIndex}>
            {format.index} / {format.day}
          </div>
          <h3 className={styles.formatName}>{format.name}</h3>
          <div className={styles.formatFooter}>
            <p className={styles.formatDescription}>{format.description}</p>
            <span className={styles.formatDay}>Archivio format ↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
