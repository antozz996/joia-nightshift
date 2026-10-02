"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import styles from "./PrivateWorld.module.css";

export function PrivateBeforeAfter() {
  const [value, setValue] = useState(52);

  return (
    <div
      className={styles.beforeAfter}
      style={{ "--before-after": value + "%" } as CSSProperties}
      aria-label="Confronto tra sala neutra e sala trasformata"
    >
      <div className={styles.beforeLayer} aria-hidden="true" />
      <div className={styles.afterLayer} aria-hidden="true" />

      <div className={styles.beforeAfterLabels} aria-hidden="true">
        <span>Prima / spazio</span>
        <span>Dopo / esperienza</span>
      </div>

      <div className={styles.beforeAfterControl}>
        <span>Prima</span>
        <input
          className={styles.range}
          type="range"
          min="8"
          max="92"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label="Mostra prima o dopo la trasformazione"
        />
        <span>Dopo</span>
      </div>
    </div>
  );
}
