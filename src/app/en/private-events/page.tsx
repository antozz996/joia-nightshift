import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/seo/LocaleLanding.module.css";
import { absoluteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Private Events in Naples",
  description:
    "Graduations, birthdays, 18th birthdays and corporate events in a JOIA space that changes around the event.",
  alternates: {
    canonical: absoluteUrl("/en/private-events/"),
    languages: {
      "it-IT": absoluteUrl("/private-events/"),
      "en-GB": absoluteUrl("/en/private-events/"),
      "x-default": absoluteUrl("/private-events/"),
    },
  },
  other: { "content-language": "en" },
};

export default function EnglishPrivateEventsPage() {
  return (
    <main className={styles.page + " " + styles.private}>
      <p className={styles.eyebrow}>JOIA / PRIVATE EVENTS</p>
      <h1 className={styles.title}>The room changes around your event.</h1>
      <p className={styles.copy}>
        Dinner, cocktail or party: JOIA is designed as a premium venue that can change
        layout, pace and atmosphere around graduations, birthdays and corporate events.
      </p>
      <div className={styles.links}>
        <Link href="/private-events/#brief">Start your event brief</Link>
        <Link href="/location/">Venue</Link>
        <Link href="/private-events/">Italiano</Link>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <strong>Layouts</strong>
          <span>Dinner · Cocktail · Party</span>
        </div>
        <div className={styles.detail}>
          <strong>Formats</strong>
          <span>Graduation · 18th · Birthday · Corporate</span>
        </div>
        <div className={styles.detail}>
          <strong>Contact</strong>
          <span>Brief + WhatsApp</span>
        </div>
      </div>
    </main>
  );
}
