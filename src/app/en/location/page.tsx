import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/seo/LocaleLanding.module.css";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "JOIA Venue in Naples",
  description:
    "Discover JOIA: one venue with two identities, Private Events and FORMĀ / Nightlife.",
  alternates: {
    canonical: absoluteUrl("/en/location/"),
    languages: {
      "it-IT": absoluteUrl("/location/"),
      "en-GB": absoluteUrl("/en/location/"),
      "x-default": absoluteUrl("/location/"),
    },
  },
  other: { "content-language": "en" },
};

export default function EnglishLocationPage() {
  return (
    <main className={styles.page + " " + styles.neutral}>
      <p className={styles.eyebrow}>JOIA / VENUE</p>
      <h1 className={styles.title}>One building. Two transformations.</h1>
      <p className={styles.copy}>
        JOIA brings private events and nightlife into the same physical space without
        flattening them into the same experience.
      </p>
      <div className={styles.details}>
        <div className={styles.detail}>
          <strong>Address</strong>
          <span>{siteConfig.address}</span>
        </div>
        <div className={styles.detail}>
          <strong>Email</strong>
          <span>{siteConfig.contacts.email}</span>
        </div>
        <div className={styles.detail}>
          <strong>Phone</strong>
          <span>{siteConfig.contacts.phone}</span>
        </div>
      </div>
      <div className={styles.links}>
        <Link href="/en/private-events/">Private Events</Link>
        <Link href="/en/nightlife/">FORMĀ</Link>
        <Link href="/location/">Italiano</Link>
      </div>
    </main>
  );
}
