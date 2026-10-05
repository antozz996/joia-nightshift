import Image from "next/image";
import Link from "next/link";
import styles from "./NightWorld.module.css";

const food = [
  {
    src: "/media/official/food/forma-food-1.jpg",
    alt: "Piatto servito durante Dinner at FORMĀ",
  },
  {
    src: "/media/official/food/forma-food-2.jpg",
    alt: "Servizio food scenografico FORMĀ",
  },
  {
    src: "/media/official/food/forma-food-3.jpg",
    alt: "Dettaglio food experience FORMĀ",
  },
] as const;

export function FormaDinner() {
  return (
    <div className={styles.dinnerShell}>
      <div className={styles.dinnerCopy} data-night-reveal>
        <p className={styles.eyebrow}>Dinner / Food & Beverage</p>
        <h3>La notte può iniziare <i>a tavola.</i></h3>
        <p>
          JOIA integra food, beverage e nightlife nello stesso edificio. Il menu cambia con
          la programmazione: questa sezione è pronta per essere alimentata da Sanity con
          menu, disponibilità e formula Dinner + Night.
        </p>
        <div className={styles.ctaRow}>
          <Link className={styles.primaryButton} href="#community">
            Richiedi Dinner + Night
          </Link>
          <Link className={styles.secondaryButton} href="#community">
            Tavolo / Champagneria
          </Link>
        </div>
      </div>

      <div className={styles.dinnerMedia}>
        {food.map((item, index) => (
          <figure className={styles.dinnerImageWrap} key={item.src}>
            <Image
              className={styles.dinnerImage}
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 33vw, 18vw"
            />
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </figure>
        ))}
      </div>
    </div>
  );
}
