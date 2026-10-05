"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useState } from "react";
import styles from "./SwitchExperience.module.css";

type World = "private" | "night";

const destinations: Record<World, string> = {
  private: "/private-events/",
  night: "/nightlife/",
};

export function SwitchExperience() {
  const router = useRouter();
  const [clock, setClock] = useState("--:--");
  const [preview, setPreview] = useState<World | null>(null);
  const [entering, setEntering] = useState<World | null>(null);

  useEffect(() => {
    router.prefetch(destinations.private);
    router.prefetch(destinations.night);

    const syncClock = () => {
      setClock(
        new Intl.DateTimeFormat("it-IT", {
          timeZone: "Europe/Rome",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    syncClock();
    const interval = window.setInterval(syncClock, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [router]);

  const enterWorld = (world: World) => {
    const href = destinations[world];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      router.push(href);
      return;
    }

    setPreview(world);
    setEntering(world);

    window.setTimeout(() => {
      router.push(href);
    }, 680);
  };

  const intercept =
    (world: World) =>
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      enterWorld(world);
    };

  return (
    <main
      className={styles.stage}
      data-world="switch"
      data-preview={preview ?? "neutral"}
      data-entering={entering ?? "none"}
      aria-label="Scegli l'esperienza JOIA"
    >
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <span className={styles.headerLogoWrap}>
            <BrandLogo brand="joia" className={styles.headerLogo} priority alt="JOIA" />
          </span>
          <span className={styles.headerBuilding}>Building</span>
        </div>
        <p className={styles.headerMeta}>Napoli · Since 2004</p>
        <time className={styles.clock}>Napoli — {clock}</time>
      </header>

      <section className={styles.intro} aria-labelledby="threshold-title">
        <p className={styles.kicker}>Un luogo. Due trasformazioni.</p>
        <h1 className={styles.title} id="threshold-title">
          Entra in
          <span className={styles.titleLogoWrap}>
            <BrandLogo brand="joia" className={styles.titleLogo} priority alt="JOIA" />
          </span>
        </h1>
        <p className={styles.lead}>
          Scegli la forma che vuoi vivere. Lo spazio resta lo stesso,
          cambia completamente il modo in cui prende vita.
        </p>
      </section>

      <nav
        className={styles.portals}
        aria-label="Esperienze JOIA"
        onPointerLeave={() => {
          if (!entering) setPreview(null);
        }}
      >
        <Link
          href={destinations.private}
          className={styles.portal + " " + styles.portalPrivate}
          onPointerEnter={() => {
            if (!entering) setPreview("private");
          }}
          onFocus={() => {
            if (!entering) setPreview("private");
          }}
          onBlur={() => {
            if (!entering) setPreview(null);
          }}
          onClick={intercept("private")}
        >
          <span className={styles.portalIndex}>01</span>
          <span className={styles.portalWorld}>Private Events</span>
          <span className={styles.portalCopy}>
            <strong>Costruisci il tuo evento.</strong>
            <span>
              Cena, cocktail, party e produzione: JOIA cambia assetto intorno alle persone.
            </span>
          </span>
          <span className={styles.portalAction}>Attraversa la soglia ↗</span>
        </Link>

        <Link
          href={destinations.night}
          className={styles.portal + " " + styles.portalNight}
          onPointerEnter={() => {
            if (!entering) setPreview("night");
          }}
          onFocus={() => {
            if (!entering) setPreview("night");
          }}
          onBlur={() => {
            if (!entering) setPreview(null);
          }}
          onClick={intercept("night")}
        >
          <span className={styles.portalIndex}>02</span>
          <span className={styles.portalWorld}>FORMĀ / Nightlife</span>
          <BrandLogo brand="forma" className={styles.portalFormaLogo} alt="FORMĀ" />
          <span className={styles.portalCopy}>
            <strong>Entra nella notte.</strong>
            <span>
              Musica, artisti, community e luce: quando scende il buio, la sala cambia ritmo.
            </span>
          </span>
          <span className={styles.portalAction}>Attraversa la soglia ↗</span>
        </Link>
      </nav>

      <div className={styles.seam} aria-hidden="true">
        <span>JOIA</span>
      </div>

      <footer className={styles.footer}>
        <span>Private Events</span>
        <span>Scegli un ingresso</span>
        <span>FORMĀ / Nightlife</span>
      </footer>

      <div
        className={
          styles.transitionLayer +
          (entering ? " " + styles.transitionActive : "") +
          (entering === "private" ? " " + styles.transitionPrivate : "") +
          (entering === "night" ? " " + styles.transitionNight : "")
        }
        aria-hidden="true"
      >
        <div className={styles.transitionMark}>
          {entering === "night" ? (
            <BrandLogo brand="forma" className={styles.transitionFormaLogo} alt="" />
          ) : (
            <BrandLogo brand="joia" className={styles.transitionJoiaLogo} alt="" />
          )}
        </div>
        <div className={styles.transitionLabel}>
          {entering === "private"
            ? "PRIVATE EVENTS"
            : entering === "night"
              ? "FORMĀ / NIGHTLIFE"
              : ""}
        </div>
      </div>
    </main>
  );
}
