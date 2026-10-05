import Image from "next/image";
import Link from "next/link";
import styles from "./NightWorld.module.css";

const offers = [
  {
    index: "01",
    title: "Club",
    copy: "Ingresso, ticket e guest list per vivere la notte direttamente dal dancefloor.",
  },
  {
    index: "02",
    title: "Champagneria",
    copy: "Tavolo, bottiglie e servizio dedicato per gruppi che vogliono vivere FORMĀ da un’altra prospettiva.",
  },
  {
    index: "03",
    title: "Dinner + Night",
    copy: "Cena e accesso alla serata nello stesso percorso: food, atmosfera e club culture senza cambiare luogo.",
  },
] as const;

const foodDetails = [
  {
    src: "/media/nightlife/official/forma-food-bowl.jpg",
    alt: "Finger food FORMĀ",
  },
  {
    src: "/media/nightlife/official/forma-food-detail.jpg",
    alt: "Dettaglio food FORMĀ con fiamma",
  },
] as const;

export function NightDinner() {
  return (
    <div className={styles.dinnerShell}>
      <div className={styles.dinnerVisual}>
        <Image
          src="/media/nightlife/official/forma-food-fire.jpg"
          alt="Servizio food FORMĀ con fiamma"
          fill
          sizes="(max-width: 900px) 100vw, 48vw"
          className={styles.dinnerImage}
        />
        <span className={styles.dinnerShade} aria-hidden="true" />
        <div className={styles.dinnerVisualCopy}>
          <span>FORMĀ / DINNER</span>
          <strong>La notte può iniziare a tavola.</strong>
        </div>
      </div>

      <div className={styles.dinnerOffers}>
        <div className={styles.dinnerDetails}>
          {foodDetails.map((item) => (
            <figure className={styles.dinnerDetail} key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
              />
            </figure>
          ))}
        </div>

        {offers.map((offer) => (
          <article className={styles.dinnerOffer} key={offer.index}>
            <span>{offer.index}</span>
            <h3>{offer.title}</h3>
            <p>{offer.copy}</p>
          </article>
        ))}

        <div className={styles.dinnerActions}>
          <Link className={styles.primaryButton} href="#community">
            Richiedi dinner / tavolo
          </Link>
          <Link className={styles.secondaryButton} href="#next">
            Vedi il prossimo evento
          </Link>
        </div>
      </div>
    </div>
  );
}
