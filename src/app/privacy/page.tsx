import type { Metadata } from "next";
import Link from "next/link";
import styles from "./Privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Informazioni sul trattamento dei dati inviati tramite il sito JOIA Building.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>JOIA BUILDING / PRIVACY</p>
        <h1>Privacy.</h1>
        <p className={styles.lead}>
          Questa pagina descrive in modo chiaro come vengono trattati i dati inviati
          attraverso i moduli di contatto del sito.
        </p>

        <section>
          <h2>Dati raccolti</h2>
          <p>
            In base alla richiesta possiamo raccogliere nome, email, telefono, data e
            tipologia dell’evento, numero di persone, budget indicativo e note inserite
            volontariamente.
          </p>
        </section>

        <section>
          <h2>Perché li utilizziamo</h2>
          <p>
            I dati vengono utilizzati per rispondere alle richieste relative a Private
            Events, tavoli, guest list e community. Le informazioni non vengono utilizzate
            per finalità ulteriori senza una base giuridica o un consenso appropriato.
          </p>
        </section>

        <section>
          <h2>Fornitori tecnici</h2>
          <p>
            Il sito utilizza fornitori tecnici per hosting, invio email e misurazione delle
            conversioni. Gli strumenti di marketing vengono attivati solo secondo le scelte
            espresse nel banner cookie e nelle relative impostazioni.
          </p>
        </section>

        <section>
          <h2>Conservazione e diritti</h2>
          <p>
            I dati vengono conservati per il tempo necessario a gestire la richiesta e gli
            eventuali obblighi applicabili. Per richieste di accesso, rettifica o cancellazione
            puoi scrivere a <a href="mailto:info@joiabuilding.com">info@joiabuilding.com</a>.
          </p>
        </section>

        <footer>
          <Link href="/">← Torna a JOIA</Link>
          <span>Corso Europa 45 · Sant’Antimo · Napoli</span>
        </footer>
      </div>
    </main>
  );
}
