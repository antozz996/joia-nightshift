import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/seo/LocaleLanding.module.css";
import { absoluteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "JOIA — Private Events & FORMĀ Nightlife in Naples",
  description:
    "One venue, two transformations: Private Events by day and FORMĀ / Nightlife after dark.",
  alternates: {
    canonical: absoluteUrl("/en/"),
    languages: {
      "it-IT": absoluteUrl("/"),
      "en-GB": absoluteUrl("/en/"),
      "x-default": absoluteUrl("/"),
    },
  },
  other: { "content-language": "en" },
};

export default function EnglishHomePage() {
  return (
    <main className={styles.page + " " + styles.neutral}>
      <p className={styles.eyebrow}>JOIA / NIGHTSHIFT / NAPLES</p>
      <h1 className={styles.title}>Two atmospheres. One JOIA.</h1>
      <p className={styles.copy}>
        JOIA changes with the light: a warm, transformable venue for private events and a
        dense nightlife identity through FORMĀ.
      </p>
      <div className={styles.links}>
        <Link href="/en/private-events/">Private Events</Link>
        <Link href="/en/nightlife/">Nightlife / FORMĀ</Link>
        <Link href="/">Italiano</Link>
      </div>
    </main>
  );
}
