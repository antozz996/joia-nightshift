import { siteConfig } from "@/config/site";
import styles from "./PrivateWorld.module.css";

export function WhatsAppSticky() {
  const phone = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(
    "Ciao JOIA, vorrei ricevere informazioni per organizzare un evento privato.",
  );

  return (
    <a
      className={styles.whatsapp}
      href={"https://wa.me/" + phone + "?text=" + text}
      target="_blank"
      rel="noreferrer"
      aria-label="Contatta JOIA su WhatsApp"
    >
      <span className={styles.whatsappDot} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
