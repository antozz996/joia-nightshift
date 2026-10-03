"use client";

import { useEffect } from "react";

export function PrivateMotionController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const touchFirst =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 900px)").matches ||
      navigator.maxTouchPoints > 0;

    if (touchFirst) {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-private-reveal]"),
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target as HTMLElement;
            observer.unobserve(element);

            element.animate(
              [
                { opacity: 0, transform: "translate3d(0, 18px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 420,
                easing: "cubic-bezier(.22,.74,.2,1)",
                fill: "both",
              },
            );
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      elements.forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect();
        elements.forEach((element) => element.getAnimations().forEach((animation) => animation.cancel()));
      };
    }

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
