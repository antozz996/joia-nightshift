import Image from "next/image";
import styles from "./PrivateWorld.module.css";

type PrivateGalleryProps = {
  items?: readonly string[];
};

const mediaByLabel: Record<string, { src: string; alt: string }> = {
  welcome: { src: "/media/private/guests.jpg", alt: "Ospiti durante un evento privato JOIA" },
  arrival: { src: "/media/private/guests.jpg", alt: "Ospiti durante un evento privato JOIA" },
  portrait: { src: "/media/private/guests.jpg", alt: "Ospiti durante un evento privato JOIA" },
  table: { src: "/media/private/table.jpg", alt: "Tavola allestita per un evento JOIA" },
  dinner: { src: "/media/private/table.jpg", alt: "Tavola allestita per un evento JOIA" },
  details: { src: "/media/private/dish.jpg", alt: "Dettaglio gastronomico di un evento JOIA" },
  food: { src: "/media/private/dish.jpg", alt: "Dettaglio gastronomico di un evento JOIA" },
  cake: { src: "/media/private/catering.jpg", alt: "Buffet e catering durante un evento JOIA" },
  toast: { src: "/media/private/toast.jpg", alt: "Brindisi scenografico durante un evento JOIA" },
  reveal: { src: "/media/private/entertainment.jpg", alt: "Performance scenografica durante un evento JOIA" },
  presentation: { src: "/media/private/entertainment.jpg", alt: "Performance e produzione scenica JOIA" },
  party: { src: "/media/private/party.jpg", alt: "Dancefloor durante un evento JOIA" },
  after: { src: "/media/private/party.jpg", alt: "Momento party durante un evento JOIA" },
  dancefloor: { src: "/media/private/party.jpg", alt: "Dancefloor durante un evento JOIA" },
  closing: { src: "/media/private/party.jpg", alt: "Chiusura party durante un evento JOIA" },
  brand: { src: "/media/private/bar.jpg", alt: "Bar e bottigliera della location JOIA" },
  network: { src: "/media/private/guests.jpg", alt: "Ospiti e networking durante un evento JOIA" },
};

export function PrivateGallery({
  items = ["welcome", "table", "details", "party"],
}: PrivateGalleryProps) {
  return (
    <div className={styles.gallery}>
      {items.map((item, index) => {
        const media = mediaByLabel[item] ?? mediaByLabel.party;

        return (
          <figure
            className={styles.galleryItem}
            data-label={item.replaceAll("-", " ")}
            key={item + index}
          >
            <Image
              className={styles.galleryImage}
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 700px) 100vw, 33vw"
            />
            <span className={styles.galleryTone} aria-hidden="true" />
          </figure>
        );
      })}
    </div>
  );
}
