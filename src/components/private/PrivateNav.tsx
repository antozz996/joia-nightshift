import Link from "next/link";
import styles from "./PrivateWorld.module.css";

export function PrivateNav() {
  return (
    <nav className={styles.nav} aria-label="Navigazione Private Events">
      <Link className={styles.brand} href="/">
        <span className={styles.brandDot} aria-hidden="true" />
        <span>JOIA / Private</span>
      </Link>

      <div className={styles.navLinks}>
        <Link href="/private-events/#formati">Formati</Link>
        <Link href="/private-events/#trasformazione">Trasformazione</Link>
        <Link href="/private-events/#gallery">Gallery</Link>
        <Link className={styles.navCta} href="/private-events/#brief">
          Raccontaci l'evento
        </Link>
      </div>
    </nav>
  );
}
