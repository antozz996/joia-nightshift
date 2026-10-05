import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/app/storia/History.module.css";

export const metadata: Metadata = {
  title: "JOIA History | Since 2004",
  description:
    "Since 2004 JOIA has moved through club culture, technology, private events and production in Sant’Antimo, Naples.",
  alternates: {
    canonical: "/en/history/",
    languages: {
      "it-IT": "/storia/",
      "en-GB": "/en/history/",
    },
  },
};

export default function EnglishHistoryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>JOIA BUILDING / ARCHIVE / SINCE 2004</p>
        <h1 className={styles.title}>
          Twenty years
          <span>are not background.</span>
        </h1>
        <p className={styles.lead}>
          JOIA was born as a landmark club and today lives as a transformable building:
          sound, light, performance, hospitality and different ways to experience the same room.
        </p>

        <section className={styles.statement}>
          <p className={styles.eyebrow}>Continuity</p>
          <div>
            <h2>Tradition and innovation in the same building.</h2>
            <p>
              The material changes, the principle remains: atmosphere, production and rhythm
              are curated so every event feels built for that specific moment.
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <Link className={styles.back} href="/en/">← Back to the entrances</Link>
          <span className={styles.meta}>Sant’Antimo · Naples · Since 2004</span>
        </footer>
      </div>
    </main>
  );
}
