import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/seo/LocaleLanding.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Informazioni sul trattamento dei dati inviati tramite il sito JOIA Building.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page + " " + styles.private}>
      <p className={styles.eyebrow}>JOIA BUILDING / PRIVACY</p>
      <h1 className={styles.title}>Privacy.</h1>
      <p className={styles.copy}>
        I dati inviati attraverso i moduli del sito vengono utilizzati per gestire richieste
        relative a Private Events, tavoli, guest list e community. Possono includere nome,
        email, telefono e le informazioni inserite volontariamente nella richiesta.
      </p>

      <div className={styles.details}>
        <div className={styles.detail}>
          <strong>Finalità</strong>
          <span>Rispondere alle richieste e ricontattare chi utilizza i moduli JOIA.</span>
        </div>
        <div className={styles.detail}>
          <strong>Conservazione</strong>
          <span>I dati vengono mantenuti per il tempo necessario a gestire la richiesta.</span>
        </div>
        <div className={styles.detail}>
          <strong>Contatti</strong>
          <span>info@joiabuilding.com · +39 351 393 9725</span>
        </div>
      </div>

      <p className={styles.copy}>
        Per richieste di accesso, rettifica o cancellazione dei dati puoi scrivere a
        info@joiabuilding.com.
      </p>

      <div className={styles.links}>
        <Link href="/">Torna a JOIA</Link>
        <a href="mailto:info@joiabuilding.com">Contatta JOIA</a>
      </div>
    </main>
  );
}
