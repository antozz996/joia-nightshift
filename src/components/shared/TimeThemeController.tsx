"use client";

import { useEffect } from "react";
import { resolveNightshiftTime } from "@/lib/time/nightshift-time";

function applyTimeTheme() {
  const palette = resolveNightshiftTime();
  const root = document.documentElement;

  root.dataset.timePhase = palette.phase;
  root.style.setProperty("--ambient-bg", palette.background);
  root.style.setProperty("--ambient-text", palette.foreground);
  root.style.setProperty("--ambient-muted", palette.muted);
  root.style.setProperty("--ambient-glow", palette.glow);
  root.style.setProperty("--ambient-progress", palette.progress.toFixed(3));
}

export function TimeThemeController() {
  useEffect(() => {
    applyTimeTheme();
    const interval = window.setInterval(applyTimeTheme, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}
