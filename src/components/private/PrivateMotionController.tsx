"use client";

import { useEffect } from "react";

export function PrivateMotionController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const [{ gsap }, scrollModule, lenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (disposed) return;

      const ScrollTrigger = scrollModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      let rafId = 0;

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      lenis.on("scroll", ScrollTrigger.update);
      rafId = window.requestAnimationFrame(raf);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-private-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-private-parallax]").forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -3 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
      });

      cleanup = () => {
        window.cancelAnimationFrame(rafId);
        lenis.destroy();
        context.revert();
      };
    };

    void boot();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
