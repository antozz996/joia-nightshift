"use client";

import { useEffect } from "react";

export function NightMotionController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) return;

      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-night-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 26, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.72,
              ease: "power4.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-night-skew]").forEach((element) => {
          gsap.fromTo(
            element,
            { xPercent: -2.5 },
            {
              xPercent: 2.5,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.45,
              },
            },
          );
        });
      });

      cleanup = () => context.revert();
    };

    void boot();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
