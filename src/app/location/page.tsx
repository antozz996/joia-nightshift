import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/lib/seo/site-url";
import styles from "./LocationWorld.module.css";

export const metadata: Metadata = {
  title: "JOIA Building | Location eventi e nightlife a Napoli",
  description:
    "JOIA Building a Sant'Antimo, Napoli: uno spazio trasformabile per Private Events e FORMĀ nightlife, con scenografia, lighting e sound.",
  alternates: localizedAlternates("/location/", "/en/location/"),
};

export default function LocationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand}>
          <BrandLogo brand="joia" className={styles.brandLogo} priority alt="JOIA" />
          <span>Building</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/storia/">Storia</Link>
          <Link href="/private-events/">Private</Link>
          <Link href="/nightlife/">FORMĀ</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Sant&apos;Antimo · Napoli</p>
          <h1>Un edificio. <span>Due trasformazioni.</span></h1>
          <p>
            JOIA Building unisce club culture ed eventi privati nello stesso spazio senza
            confonderli. Cambiano layout, luce, scenografia, sound e ritmo; resta una sola
            identità costruita dal 2004.
          </p>
        </div>

        <figure className={styles.heroMedia}>
          <Image
            src="/media/official/location/forma-location-1.jpg"
            alt="Sala JOIA durante una serata"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </figure>
      </section>

      <section className={styles.info}>
        <div className={styles.infoLead}>
          <p className={styles.eyebrow}>Location / Production</p>
          <h2>Spazio, scenografia, lighting, sound.</h2>
        </div>

        <div className={styles.infoBody}>
          <p>
            Il materiale ufficiale JOIA descrive una venue costruita per esperienze
            multisensoriali: performance, scenografie, illuminotecnica e un impianto audio
            pensati per accompagnare programmazione nightlife, celebrazioni e meeting
            aziendali.
          </p>

          <div className={styles.details}>
            <div>
              <strong>Indirizzo</strong>
              <span>{siteConfig.address}</span>
            </div>
            <div>
              <strong>Email</strong>
              <a href={"mailto:" + siteConfig.contacts.email}>{siteConfig.contacts.email}</a>
            </div>
            <div>
              <strong>Telefono</strong>
              <a href={"tel:" + siteConfig.contacts.phone.replaceAll(" ", "")}>
                {siteConfig.contacts.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.visualGrid}>
        <figure className={styles.wide}>
          <Image
            src="/media/official/location/forma-location-2.jpg"
            alt="Sala FORMĀ con pubblico e visual"
            fill
            sizes="(max-width: 900px) 100vw, 65vw"
          />
        </figure>
        <figure>
          <Image
            src="/media/official/location/forma-location-6.jpg"
            alt="Sala JOIA con installazione luminosa"
            fill
            sizes="(max-width: 900px) 100vw, 35vw"
          />
        </figure>
      </section>

      <section className={styles.choices}>
        <Link href="/private-events/">
          <span>01</span>
          <strong>Private Events</strong>
          <small>Lo spazio prende la tua forma ↗</small>
        </Link>
        <Link href="/nightlife/">
          <span>02</span>
          <strong>FORMĀ</strong>
          <small>La notte prende forma ↗</small>
        </Link>
      </section>
    </main>
  );
}
