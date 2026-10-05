import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import styles from "./NightWorld.module.css";

export function NightNav() {
  return (
    <nav className={styles.nav} aria-label="Navigazione nightlife">
      <Link className={styles.brand} href="/">
        <BrandLogo brand="forma" className={styles.brandLogoNight} alt="FORMĀ" />
      </Link>

      <div className={styles.navLinks}>
        <Link href="/nightlife/#next">Next</Link>
        <Link href="/nightlife/#room">Room</Link>
        <Link href="/nightlife/#dinner">Dinner</Link>
        <Link href="/nightlife/#formats">Heritage</Link>
        <Link href="/nightlife/#archive">Archive</Link>
        <Link href="/nightlife/#artists">Artists</Link>
        <Link href="/storia/">Storia</Link>
        <Link className={styles.navCta} href="/nightlife/#community">
          Join
        </Link>
      </div>
    </nav>
  );
}
