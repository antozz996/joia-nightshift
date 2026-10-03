"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getPreferredVisualCapability } from "@/lib/performance/capabilities";

const SwitchShaderCanvas = dynamic(
  () => import("./SwitchShaderCanvas").then((module) => module.SwitchShaderCanvas),
  { ssr: false },
);

type SwitchMediaStageProps = {
  mix: number;
  pointer: { x: number; y: number };
};

export function SwitchMediaStage({ mix, pointer }: SwitchMediaStageProps) {
  const [shaderReady, setShaderReady] = useState(false);

  useEffect(() => {
    const capability = getPreferredVisualCapability();
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const compact = window.matchMedia("(max-width: 900px)").matches;
    const touchDevice = navigator.maxTouchPoints > 0;

    if (capability !== "full" || coarse || compact || touchDevice) {
      return;
    }

    let timeout = 0;
    let idleId: number | undefined;
    const activate = () => setShaderReady(true);
    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof browserWindow.requestIdleCallback === "function") {
      idleId = browserWindow.requestIdleCallback(activate, { timeout: 1400 });
    } else {
      timeout = browserWindow.setTimeout(activate, 650);
    }

    return () => {
      if (idleId !== undefined && typeof browserWindow.cancelIdleCallback === "function") {
        browserWindow.cancelIdleCallback(idleId);
      }
      if (timeout) browserWindow.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className="nightshift-switch-media-stage"
      data-future-media-slot="twin-room-video-shader-mix"
      aria-hidden="true"
    >
      {shaderReady ? <SwitchShaderCanvas mix={mix} pointer={pointer} /> : null}
    </div>
  );
}
