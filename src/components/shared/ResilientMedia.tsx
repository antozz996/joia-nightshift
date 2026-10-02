"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type MediaMask = "arch" | "soft-window" | "slice" | "notch" | "full";
export type MediaWorld = "private" | "night";

type ResilientMediaProps = {
  world: MediaWorld;
  alt: string;
  videoSrc?: string;
  imageSrc?: string;
  poster?: string;
  mask?: MediaMask;
  sizes?: string;
  priority?: boolean;
  focalPoint?: `${number}% ${number}%`;
  fallbackLabel?: string;
  className?: string;
};

type Level = "video" | "image" | "generative";

export function ResilientMedia({
  world,
  alt,
  videoSrc,
  imageSrc,
  poster,
  mask = world === "private" ? "arch" : "slice",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  focalPoint = "50% 50%",
  fallbackLabel = "JOIA",
  className = "",
}: ResilientMediaProps) {
  const initialLevel = useMemo<Level>(() => (videoSrc ? "video" : imageSrc ? "image" : "generative"), [videoSrc, imageSrc]);
  const [level, setLevel] = useState<Level>(initialLevel);

  return (
    <figure className={`resilient-media resilient-media--${world} resilient-media--${mask} ${className}`.trim()}>
      <div className="resilient-media__surface">
        {level === "video" && videoSrc ? (
          <video
            className="resilient-media__asset"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={alt}
            onError={() => setLevel(imageSrc ? "image" : "generative")}
            style={{ objectPosition: focalPoint }}
          >
            <source src={videoSrc} />
          </video>
        ) : null}

        {level === "image" && imageSrc ? (
          <Image
            className="resilient-media__asset"
            src={imageSrc}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setLevel("generative")}
            style={{ objectFit: "cover", objectPosition: focalPoint }}
          />
        ) : null}

        {level === "generative" ? (
          <div className="resilient-media__fallback" role="img" aria-label={alt}>
            <span>{fallbackLabel}</span>
            <b aria-hidden="true">20+</b>
          </div>
        ) : null}

        <span aria-hidden="true" className="resilient-media__duotone" />
        <span aria-hidden="true" className="resilient-media__vignette" />
      </div>
    </figure>
  );
}
