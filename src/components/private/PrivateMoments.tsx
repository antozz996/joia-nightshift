import styles from "./PrivateWorld.module.css";

export function PrivateMoments({ moments }: { moments: readonly string[] }) {
  return (
    <div className={styles.moments}>
      {moments.map((moment, index) => (
        <div className={styles.moment} key={moment} data-private-reveal>
          <span className={styles.momentIndex}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.momentLabel}>{moment}</span>
        </div>
      ))}
    </div>
  );
}
