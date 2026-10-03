import Link from "next/link";
import styles from "./NightWorld.module.css";

export function NightNav() {
  return (
    <nav className={styles.nav} aria-label="Navigazione nightlife">
      <Link className={styles.brand} href="/">
        <span className={styles.brandMark} aria-hidden="true" />
        <span>JOIA / FORMĀ</span>
      </Link>

      <div className={styles.navLinks}>
        <Link href="/nightlife/#next">Next</Link>
        <Link href="/nightlife/#formats">Formats</Link>
        <Link href="/nightlife/#archive">Archive</Link>
        <Link href="/nightlife/#artists">Artists</Link>
        <Link className={styles.navCta} href="/nightlife/#community">
          Join
        </Link>
      </div>
    </nav>
  );
}
