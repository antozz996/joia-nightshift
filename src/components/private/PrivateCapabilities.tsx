import Image from "next/image";
import styles from "./PrivateWorld.module.css";

const capabilities = [
  {
    code: "SPACE",
    title: "Lo spazio cambia assetto.",
    copy: "Cena, cocktail e party richiedono geometrie diverse. JOIA lavora su layout, flussi e percezione della sala.",
    src: "/media/private/table.jpg",
    alt: "Sala JOIA allestita per una cena privata",
  },
  {
    code: "FOOD",
    title: "La cucina entra nel racconto.",
    copy: "Food e beverage non sono un accessorio: fanno parte del ritmo dell’evento, dall’accoglienza alla cena fino al party.",
    src: "/media/official/food/forma-food-2.jpg",
    alt: "Servizio food JOIA",
  },
  {
    code: "PRODUCTION",
    title: "Luce, show, scenografia.",
    copy: "Lighting, visual, performance e produzione scenica cambiano l’intensità dello stesso ambiente durante la serata.",
    src: "/media/private/entertainment.jpg",
    alt: "Performance scenografica durante un evento JOIA",
  },
  {
    code: "SERVICE",
    title: "Una regia, non un pacchetto.",
    copy: "La pianificazione parte dal tipo di evento, dalle persone e dal tono desiderato per costruire una sequenza coerente.",
    src: "/media/private/guests.jpg",
    alt: "Ospiti durante un evento privato JOIA",
  },
] as const;

export function PrivateCapabilities() {
  return (
    <div className={styles.capabilityGrid}>
      {capabilities.map((item, index) => (
        <article className={styles.capabilityCard} key={item.code}>
          <div className={styles.capabilityMedia}>
            <Image
              className={styles.capabilityImage}
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <span className={styles.capabilityShade} aria-hidden="true" />
          </div>
          <div className={styles.capabilityMeta}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{item.code}</span>
          </div>
          <div className={styles.capabilityCopy}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
