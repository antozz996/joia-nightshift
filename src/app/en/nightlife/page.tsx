import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/seo/LocaleLanding.module.css";
import { absoluteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "FORMĀ / Nightlife in Naples",
  description:
    "JOIA nightlife in Naples: music, artists, events, tickets, tables and community through FORMĀ.",
  alternates: {
    canonical: absoluteUrl("/en/nightlife/"),
    languages: {
      "it-IT": absoluteUrl("/nightlife/"),
      "en-GB": absoluteUrl("/en/nightlife/"),
      "x-default": absoluteUrl("/nightlife/"),
    },
  },
  other: { "content-language": "en" },
};

export default function EnglishNightlifePage() {
  return (
    <main className={styles.page + " " + styles.night}>
      <p className={styles.eyebrow}>FORMĀ / MUSIC · SHOWS / NAPLES</p>
      <h1 className={styles.title}>The night takes shape.</h1>
      <p className={styles.copy}>
        Music, shows, dinner and community. FORMĀ is the contemporary nightlife language
        of JOIA Building, connecting the venue’s heritage with its next chapter.
      </p>
      <div className={styles.links}>
        <Link href="/nightlife/">Open live nightlife page</Link>
        <Link href="/nightlife/#community">Join the community</Link>
        <Link href="/nightlife/">Italiano</Link>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <strong>Next</strong>
          <span>Confirmed dates, line-up and access</span>
        </div>
        <div className={styles.detail}>
          <strong>Access</strong>
          <span>Tickets · Tables · Guest list</span>
        </div>
        <div className={styles.detail}>
          <strong>Archive</strong>
          <span>Artists · Flyers · Formats</span>
        </div>
      </div>
    </main>
  );
}
