import Image from "next/image";
import Link from "next/link";
import { privateEventTypes } from "@/content/private-events";
import styles from "./PrivateWorld.module.css";

const cardMedia = {
  "feste-di-laurea": {
    src: "/media/private/toast.jpg",
    alt: "Brindisi durante un evento privato JOIA",
  },
  "18-anni": {
    src: "/media/private/entertainment.jpg",
    alt: "Performance scenografica durante un evento JOIA",
  },
  compleanni: {
    src: "/media/private/party.jpg",
    alt: "Dancefloor durante un compleanno JOIA",
  },
  "eventi-aziendali": {
    src: "/media/private/guests.jpg",
    alt: "Ospiti durante un evento JOIA",
  },
} as const;

export function PrivateTypeCards() {
  return (
    <div className={styles.typeGrid}>
      {privateEventTypes.map((item, index) => {
        const media = cardMedia[item.slug];

        return (
          <Link
            className={styles.typeCard}
            href={"/private-events/" + item.slug + "/"}
            key={item.slug}
            data-private-reveal
          >
            <Image
              className={styles.typeCardImage}
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <span className={styles.typeCardTone} aria-hidden="true" />

            <div className={styles.typeCardTop}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>Private</span>
            </div>

            <div className={styles.typeCardBody}>
              <h3 className={styles.typeCardTitle}>
                {item.eyebrow.replace("Private / ", "")}
              </h3>
              <p className={styles.typeCardCopy}>{item.cardCopy}</p>
            </div>

            <div className={styles.typeCardBottom}>
              <span>Scopri il format</span>
              <span>↗</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
