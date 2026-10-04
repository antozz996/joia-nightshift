"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useState } from "react";
import { resolveNightshiftTime } from "@/lib/time/nightshift-time";
import styles from "./SwitchExperience.module.css";

type World = "private" | "night";

function venueWorld(): World {
  const phase = resolveNightshiftTime().phase;
  return phase === "night" || phase === "deep" ? "night" : "private";
}

export function SwitchExperience() {
  const router = useRouter();
  const [active, setActive] = useState<World>("private");
  const [clock, setClock] = useState("--:--");
  const [entering, setEntering] = useState<World | null>(null);

  useEffect(() => {
    const syncVenueState = () => {
      setActive(venueWorld());
      setClock(
        new Intl.DateTimeFormat("it-IT", {
          timeZone: "Europe/Rome",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    const firstFrame = window.requestAnimationFrame(syncVenueState);
    const interval = window.setInterval(syncVenueState, 60_000);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearInterval(interval);
    };
  }, []);

  const enter = (world: World, href: string) => {
    if (entering) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setActive(world);

    if (reduced) {
      router.push(href);
      return;
    }

    setEntering(world);
    window.setTimeout(() => router.push(href), 560);
  };

  const intercept =
    (world: World, href: string) =>
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
      enter(world, href);
    };

  return (
    <main
      className={styles.stage}
      data-active={active}
      data-entering={entering ?? "none"}
      aria-label="Scegli l'esperienza JOIA"
    >
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">J</span>
          <span>JOIA</span>
        </div>

        <div className={styles.headerMeta}>
          <span>Sant’Antimo · Napoli</span>
          <time>{clock}</time>
        </div>
      </header>

      <section className={styles.threshold} aria-labelledby="threshold-title">
        <h1 className={styles.srTitle} id="threshold-title">
          JOIA — scegli tra Private Events e FORMĀ Nightlife
        </h1>

        <Link
          href="/private-events/"
          className={styles.portal + " " + styles.privatePortal}
          onMouseEnter={() => !entering && setActive("private")}
          onFocus={() => !entering && setActive("private")}
          onClick={intercept("private", "/private-events/")}
          aria-label="Entra in JOIA Private Events"
        >
          <Image
            className={styles.portalImage}
            src="/media/private/hero-dinner.jpg"
            alt="Allestimento tavola JOIA Private Events"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 55vw"
          />
          <span className={styles.privateTone} aria-hidden="true" />

          <span className={styles.portalTop}>
            <span>01</span>
            <span>Private Events</span>
          </span>

          <span className={styles.portalCopy}>
            <span className={styles.portalEyebrow}>Giorno / Evento / Trasformazione</span>
            <strong className={styles.privateTitle}>La sala cambia intorno a te.</strong>
            <span className={styles.portalDescription}>
              Lauree, 18 anni, compleanni e corporate. Luce calda, materia, ritmo su misura.
            </span>
          </span>

          <span className={styles.portalAction}>
            Entra nel Private
            <span aria-hidden="true">↗</span>
          </span>
        </Link>

        <div className={styles.hinge} aria-hidden="true">
          <span className={styles.hingeLine} />
          <span className={styles.hingeBadge}>JOIA</span>
          <span className={styles.hingeLine} />
        </div>

        <Link
          href="/nightlife/"
          className={styles.portal + " " + styles.nightPortal}
          onMouseEnter={() => !entering && setActive("night")}
          onFocus={() => !entering && setActive("night")}
          onClick={intercept("night", "/nightlife/")}
          aria-label="Entra in FORMĀ Nightlife"
        >
          <Image
            className={styles.portalImage}
            src="/media/nightlife/forma-hero.jpg"
            alt="Sala FORMĀ con pubblico e sfera luminosa"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 55vw"
          />
          <span className={styles.nightTone} aria-hidden="true" />

          <span className={styles.portalTop}>
            <span>02</span>
            <span>FORMĀ / Nightlife</span>
          </span>

          <span className={styles.portalCopy}>
            <span className={styles.portalEyebrow}>Notte / Musica / Community</span>
            <strong className={styles.nightTitle}>La notte prende forma.</strong>
            <span className={styles.portalDescription}>
              Artisti, dancefloor, community e produzione. Più densa, più veloce, più vicina.
            </span>
          </span>

          <span className={styles.portalAction}>
            Entra in FORMĀ
            <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <span>Due porte. Una sola casa.</span>
        <span className={styles.footerHint}>Scegli un mondo per attraversare la soglia</span>
      </footer>

      <div className={styles.transitionPrivate} aria-hidden="true">
        <Image
          src="/media/private/hero-dinner.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.transitionImage}
        />
        <span className={styles.transitionPrivateTone} />
        <span className={styles.transitionWord + " " + styles.transitionWordPrivate}>
          Private
        </span>
      </div>

      <div className={styles.transitionNight} aria-hidden="true">
        <Image
          src="/media/nightlife/forma-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.transitionImage}
        />
        <span className={styles.transitionNightTone} />
        <span className={styles.transitionWord + " " + styles.transitionWordNight}>
          FORMĀ
        </span>
      </div>
    </main>
  );
}
