import Link from "next/link";
import { privateEventTypes } from "@/content/private-events";
import styles from "./PrivateWorld.module.css";

export function PrivateTypeCards() {
  return (
    <div className={styles.typeGrid}>
      {privateEventTypes.map((item, index) => (
        <Link
          className={styles.typeCard}
          href={"/private-events/" + item.slug + "/"}
          key={item.slug}
          data-private-reveal
        >
          <div className={styles.typeCardTop}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>Private</span>
          </div>
          <h3 className={styles.typeCardTitle}>
            {item.eyebrow.replace("Private / ", "")}
          </h3>
          <div className={styles.typeCardBottom}>
            <span>Scopri il format</span>
            <span>↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
