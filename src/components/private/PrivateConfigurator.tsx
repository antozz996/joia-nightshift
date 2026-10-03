"use client";

import { useState } from "react";
import { privateLayouts } from "@/content/private-events";
import styles from "./PrivateWorld.module.css";

export function PrivateConfigurator() {
  const [activeId, setActiveId] = useState<(typeof privateLayouts)[number]["id"]>("dinner");
  const active = privateLayouts.find((layout) => layout.id === activeId) ?? privateLayouts[0];

  return (
    <div className={styles.configurator}>
      <div className={styles.configList} role="tablist" aria-label="Scegli un layout">
        {privateLayouts.map((layout) => (
          <button
            key={layout.id}
            type="button"
            role="tab"
            aria-selected={activeId === layout.id}
            className={styles.configButton}
            data-active={activeId === layout.id}
            onClick={() => setActiveId(layout.id)}
          >
            <span className={styles.configIndex}>{layout.index}</span>
            <span className={styles.configButtonText}>
              <span className={styles.configLabel}>{layout.label}</span>
              <span className={styles.configButtonCopy}>{layout.windowCopy}</span>
            </span>
            <span className={styles.configArrow} aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className={styles.configStage} data-layout={active.id} role="tabpanel">
        <div className={styles.configRoom} aria-hidden="true">
          <div className={styles.roomWall} />
          <div className={styles.floor} />
          <div className={styles.roomObjects}>
            <span className={styles.table} />
            <span className={styles.table} />
            <span className={styles.table} />
            <span className={styles.table} />
            <span className={styles.table} />
          </div>
        </div>

        <div className={styles.configDetails}>
          <div>
            <p className={styles.configKicker}>Assetto selezionato</p>
            <h3>{active.label}</h3>
            <p>{active.description}</p>
            <p className={styles.configSuitable}>
              <strong>Ideale per:</strong> {active.suitableFor}
            </p>
            <div className={styles.tags}>
              {active.tags.map((tag) => (
                <span className={styles.tag} key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.capacity}>
            {active.capacity ? "Fino a " + active.capacity + " persone" : active.capacityLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
