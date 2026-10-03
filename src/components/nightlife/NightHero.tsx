import Link from "next/link";
import { nightlifeFallback } from "@/content/nightlife";
import styles from "./NightWorld.module.css";

export function NightHero() {
  const next = nightlifeFallback.nextEvent;

  return (
    <section className={styles.hero} id="next">
      <div className={styles.heroMain}>
        <div className={styles.heroCopy} data-night-reveal>
          <p className={styles.eyebrow}>FORMĀ / Listening House / Napoli</p>
          <h1 className={styles.heroTitle}>
            La notte <span>prende forma.</span>
          </h1>
          <p className={styles.heroIntro}>
            Musica, artisti, community e produzione. FORMĀ è il linguaggio notturno di JOIA:
            più denso, più veloce, più vicino al dancefloor.
          </p>
        </div>

        <article className={styles.nextCard} aria-label="Prossima serata">
          <div className={styles.nextTop}>
            <span className={styles.liveDot}>Next transmission</span>
            <span>JOIA / FORMĀ</span>
          </div>

          <div className={styles.nextCenter}>
            <p className={styles.nextLabel}>
              {next ? "Prossimo evento" : "Programmazione in aggiornamento"}
            </p>
            <h2 className={styles.nextTitle}>
              {next ? next.title : "La prossima frequenza arriva qui."}
            </h2>
            <p className={styles.nextMeta}>
              {next
                ? next.subtitle ?? "Dettagli evento"
                : "Nessuna data viene inventata: appena il team pubblica il prossimo evento nel CMS, questa card si aggiorna e riporta ticket, tavoli e line-up."}
            </p>
          </div>

          <div className={styles.nextBottom}>
            <div className={styles.ctaRow}>
              {next?.ticketUrl ? (
                <a className={styles.primaryButton} href={next.ticketUrl}>
                  Ticket ↗
                </a>
              ) : (
                <Link className={styles.primaryButton} href="#community">
                  Entra nella community
                </Link>
              )}
              {next?.tableUrl ? (
                <a className={styles.secondaryButton} href={next.tableUrl}>
                  Tavolo ↗
                </a>
              ) : (
                <Link className={styles.secondaryButton} href="#community">
                  Tavolo / guest list
                </Link>
              )}
            </div>
            <span>{next ? next.startsAt : "CMS driven"}</span>
          </div>
        </article>
      </div>

      <div className={styles.heroFooter} aria-label="JOIA in numeri e formati">
        <div className={styles.heroStat}>
          <strong>20+</strong>
          <span>anni di club culture</span>
        </div>
        <div className={styles.heroStat}>
          <strong>03</strong>
          <span>format storici</span>
        </div>
        <div className={styles.heroStat}>
          <strong>01</strong>
          <span>accent color</span>
        </div>
        <div className={styles.heroStat}>
          <strong>∞</strong>
          <span>archive / community</span>
        </div>
      </div>
    </section>
  );
}
