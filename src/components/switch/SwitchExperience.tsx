"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { resolveNightshiftTime } from "@/lib/time/nightshift-time";
import { SwitchMediaStage } from "./SwitchMediaStage";
import styles from "./SwitchExperience.module.css";

type PointerPosition = { x: number; y: number };

type DragState = {
  active: boolean;
  pointerId: number | null;
  pointerType: string;
  startX: number;
  startY: number;
  startMix: number;
  moved: number;
};

function phaseToMix() {
  const phase = resolveNightshiftTime().phase;
  if (phase === "day") return 0.16;
  if (phase === "dawn") return 0.08;
  if (phase === "golden") return 0.42;
  if (phase === "night") return 0.78;
  return 0.9;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function SwitchExperience() {
  const router = useRouter();
  const [mix, setMix] = useState(0.5);
  const [pointer, setPointer] = useState<PointerPosition>({ x: 0.5, y: 0.48 });
  const [clock, setClock] = useState("--:--");
  const [leaving, setLeaving] = useState(false);
  const [touchMode, setTouchMode] = useState(false);

  const dragRef = useRef<DragState>({
    active: false,
    pointerId: null,
    pointerType: "",
    startX: 0,
    startY: 0,
    startMix: 0.5,
    moved: 0,
  });

  const mixFrameRef = useRef(0);
  const pendingMixRef = useRef<number | null>(null);

  useEffect(() => {
    const syncVenueState = () => {
      setMix(phaseToMix());
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

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const compact = window.matchMedia("(max-width: 767px)");

    const syncInputMode = () => {
      setTouchMode(
        coarse.matches ||
          compact.matches ||
          navigator.maxTouchPoints > 0,
      );
    };

    syncInputMode();
    coarse.addEventListener("change", syncInputMode);
    compact.addEventListener("change", syncInputMode);

    return () => {
      coarse.removeEventListener("change", syncInputMode);
      compact.removeEventListener("change", syncInputMode);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (mixFrameRef.current) {
        window.cancelAnimationFrame(mixFrameRef.current);
      }
    };
  }, []);

  const cssVars = useMemo(
    () =>
      ({
        "--switch-mix": mix,
        "--pointer-x": String(pointer.x * 100) + "%",
        "--pointer-y": String(pointer.y * 100) + "%",
      }) as CSSProperties,
    [mix, pointer],
  );

  const queueMix = (value: number) => {
    pendingMixRef.current = value;
    if (mixFrameRef.current) return;

    mixFrameRef.current = window.requestAnimationFrame(() => {
      mixFrameRef.current = 0;
      if (pendingMixRef.current === null) return;
      setMix(pendingMixRef.current);
      pendingMixRef.current = null;
    });
  };

  const updatePointerPosition = (event: ReactPointerEvent<HTMLElement>) => {
    if (touchMode || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: clamp((event.clientX - rect.left) / Math.max(rect.width, 1)),
      y: clamp((event.clientY - rect.top) / Math.max(rect.height, 1)),
    });
  };

  const navigate = (href: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || touchMode) {
      router.push(href);
      return;
    }

    setLeaving(true);
    window.setTimeout(() => router.push(href), 430);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      startMix: mix,
      moved: 0,
    };

    updatePointerPosition(event);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const isTouch =
      event.pointerType === "touch" ||
      drag.pointerType === "touch" ||
      touchMode;

    if (!isTouch) {
      updatePointerPosition(event);
    }

    if (!drag.active || drag.pointerId !== event.pointerId) {
      if ((event.target as HTMLElement).closest("a")) return;

      if (!isTouch && event.pointerType === "mouse") {
        const rect = event.currentTarget.getBoundingClientRect();
        const hoverMix = clamp((event.clientX - rect.left) / Math.max(rect.width, 1));
        queueMix(mix * 0.88 + hoverMix * 0.12);
      }
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));

    const delta = isTouch
      ? -dy / Math.max(window.innerHeight * 0.68, 1)
      : dx / Math.max(window.innerWidth * 0.55, 1);

    queueMix(clamp(drag.startMix + delta));
  };

  const finishDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    drag.active = false;
    drag.pointerId = null;

    const isTouch =
      drag.pointerType === "touch" ||
      touchMode;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const finalMix = clamp(
      drag.startMix +
        (isTouch
          ? -dy / Math.max(window.innerHeight * 0.68, 1)
          : dx / Math.max(window.innerWidth * 0.55, 1)),
    );

    if (drag.moved > 34) {
      setMix(finalMix >= 0.5 ? 0.94 : 0.06);
      return;
    }

    setMix(finalMix >= 0.5 ? 0.82 : 0.18);
  };

  const intercept =
    (href: string) =>
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
      navigate(href);
    };

  return (
    <main
      className={styles.stage + (leaving ? " " + styles.leaving : "")}
      style={cssVars}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      data-world="switch"
      data-input={touchMode ? "touch" : "pointer"}
      aria-label="Scegli l'esperienza JOIA"
    >
      <div className={styles.media}>
        <SwitchMediaStage mix={mix} pointer={pointer} />
      </div>

      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>JOIA / NIGHTSHIFT</span>
          </div>
          <time className={styles.clock}>Napoli — {clock}</time>
        </header>

        <section className={styles.hero} aria-labelledby="switch-title">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              Napoli · oltre 20 anni di club culture · un luogo, due trasformazioni
            </p>
            <h1 className={styles.title} id="switch-title">
              Cambia
              <em>con la luce.</em>
            </h1>
            <p className={styles.intro}>
              Di giorno JOIA si costruisce intorno al tuo evento. Quando la luce scende,
              FORMĀ prende il controllo: musica, artisti, community e notte.
            </p>
          </div>

          <aside className={styles.readout} aria-hidden="true">
            <div className={styles.number}>20+</div>
            <div className={styles.axis} />
            <div className={styles.axisLabels}>
              <span>Private</span>
              <span>FORMĀ</span>
            </div>
          </aside>
        </section>

        <nav className={styles.choices} aria-label="Esperienze JOIA">
          <Link
            href="/private-events/"
            className={styles.choice + " " + styles.choicePrivate}
            onPointerEnter={() => {
              if (!touchMode) setMix(0.06);
            }}
            onFocus={() => setMix(0.06)}
            onClick={intercept("/private-events/")}
          >
            <span className={styles.choiceMeta}>
              <span>01 / Giorno</span>
              <span>Napoli ↗</span>
            </span>
            <span className={styles.choiceTitle}>Private Events</span>
          </Link>

          <Link
            href="/nightlife/"
            className={styles.choice + " " + styles.choiceNight}
            onPointerEnter={() => {
              if (!touchMode) setMix(0.94);
            }}
            onFocus={() => setMix(0.94)}
            onClick={intercept("/nightlife/")}
          >
            <span className={styles.choiceMeta}>
              <span>02 / Notte</span>
              <span>FORMĀ ↗</span>
            </span>
            <span className={styles.choiceTitle}>Nightlife / FORMĀ</span>
          </Link>
        </nav>

        <footer className={styles.footer}>
          <span>Trascina per cambiare luce</span>
          <span>Private ↔ Nightlife</span>
        </footer>
      </div>

      <div className={styles.dragHint} aria-hidden="true">
        {touchMode
          ? "Scorri ↑↓ per cambiare · tocca per entrare"
          : "Desktop: trascina · passa sulle scelte"}
      </div>
    </main>
  );
}
