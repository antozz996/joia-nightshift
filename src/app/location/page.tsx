import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/seo/LocaleLanding.module.css";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Location eventi e nightlife a Napoli",
  description:
    "Scopri JOIA: un unico spazio con due identità, Private Events e FORMĀ / Nightlife.",
  alternates: localizedAlternates("/location/", "/en/location/"),
};

export default function LocationPage() {
  return (
    <main className={styles.page + " " + styles.neutral}>
      <p className={styles.eyebrow}>JOIA / LOCATION</p>
      <h1 className={styles.title}>Un edificio. Due trasformazioni.</h1>
      <p className={styles.copy}>
        JOIA mette nello stesso spazio Private Events e nightlife senza confonderli: cambia
        il ritmo, cambia la luce, cambia il modo in cui la sala viene vissuta.
      </p>

      <div className={styles.details}>
        <div className={styles.detail}>
          <strong>Indirizzo</strong>
          <span>{siteConfig.address}</span>
        </div>
        <div className={styles.detail}>
          <strong>Email</strong>
          <span>{siteConfig.contacts.email}</span>
        </div>
        <div className={styles.detail}>
          <strong>Telefono</strong>
          <span>{siteConfig.contacts.phone}</span>
        </div>
      </div>

      <div className={styles.links}>
        <Link href="/private-events/">Private Events</Link>
        <Link href="/nightlife/">FORMĀ / Nightlife</Link>
        <Link href="/en/location/">English</Link>
      </div>
    </main>
  );
}
