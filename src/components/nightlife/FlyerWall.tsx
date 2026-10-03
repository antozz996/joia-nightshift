const flyerLabels = [
  ["2004", "JOIA"],
  ["FRI", "CARILLON"],
  ["SAT", "SIX"],
  ["SUN", "POV"],
  ["20+", "YEARS"],
  ["FORMĀ", "NEXT"],
] as const;

import styles from "./NightWorld.module.css";

export function FlyerWall() {
  return (
    <div className={styles.flyerWall} aria-label="Archivio visuale JOIA">
      {flyerLabels.map(([meta, title], index) => (
        <article
          className={styles.flyer}
          data-media-slot={"/public/media/archive/flyer-" + (index + 1) + ".webp"}
          key={meta + title}
          data-night-skew
        >
          <span>{meta} / archive slot</span>
          <strong>{title}</strong>
          <span>Materiale storico JOIA ↗</span>
        </article>
      ))}
    </div>
  );
}
