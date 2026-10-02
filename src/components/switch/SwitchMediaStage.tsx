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
    if (capability !== "full") return;

    let timeout = 0;
    let idleId: number | undefined;
    const activate = () => setShaderReady(true);

    if ("requestIdleCallback" in window) {
      idleId = (
        window as Window & {
          requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        }
      ).requestIdleCallback(activate, { timeout: 1400 });
    } else {
      timeout = window.setTimeout(activate, 650);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        (
          window as Window & {
            cancelIdleCallback: (handle: number) => void;
          }
        ).cancelIdleCallback(idleId);
      }
      if (timeout) window.clearTimeout(timeout);
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
