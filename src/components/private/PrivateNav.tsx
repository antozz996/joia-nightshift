import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import styles from "./PrivateWorld.module.css";

export function PrivateNav() {
  return (
    <nav className={styles.nav} aria-label="Navigazione Private Events">
      <Link className={styles.brand} href="/">
        <BrandLogo brand="joia" className={styles.brandLogoPrivate} alt="JOIA" />
        <span>Private</span>
      </Link>

      <div className={styles.navLinks}>
        <Link href="/private-events/#formati">Formati</Link>
        <Link href="/private-events/#trasformazione">Trasformazione</Link>
        <Link href="/private-events/#gallery">Gallery</Link>
        <Link href="/storia/">Storia</Link>
        <Link className={styles.navCta} href="/private-events/#brief">
          Raccontaci l’evento
        </Link>
      </div>
    </nav>
  );
}
