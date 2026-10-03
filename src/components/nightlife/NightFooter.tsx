import { siteConfig } from "@/config/site";
import styles from "./NightWorld.module.css";

export function NightFooter() {
  return (
    <footer className={styles.footer}>
      <span>JOIA / FORMĀ / Napoli</span>
      <span>Since 2004 · {siteConfig.contacts.email}</span>
    </footer>
  );
}
