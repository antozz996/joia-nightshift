import Image from "next/image";
import Link from "next/link";
import styles from "./PrivateWorld.module.css";

type PrivateHeroProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showHistory?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export function PrivateHero({
  eyebrow = "JOIA / Private Events",
  title,
  intro,
  ctaHref = "#brief",
  ctaLabel = "Inizia il brief",
  secondaryHref = "#formati",
  secondaryLabel = "Esplora i formati",
  showHistory = true,
  imageSrc = "/media/private/hero-dinner.jpg",
  imageAlt = "Allestimento tavola JOIA Private Events",
}: PrivateHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy} data-private-reveal>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroIntro}>{intro}</p>

        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} href={ctaHref}>
            {ctaLabel}
          </Link>
          <Link className={styles.secondaryButton} href={secondaryHref}>
            {secondaryLabel}
          </Link>
        </div>
      </div>

      <div className={styles.heroVisual} data-private-parallax>
        <div className={styles.heroArch}>
          <Image
            className={styles.heroImage}
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <span className={styles.heroImageTone} aria-hidden="true" />
        </div>
        {showHistory ? <p className={styles.heroNumber} aria-hidden="true">20+</p> : null}
      </div>
    </section>
  );
}
