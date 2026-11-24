"use client";

import { useEffect, useRef } from "react";

/**
 * Native CSS scroll-driven progress bar (animation-timeline: scroll(root block)),
 * falling back to a passive scroll listener ONLY in browsers lacking CSS scroll-timeline support.
 */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      bar.style.transform = "scaleX(0)";
      return;
    }

    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()")) {
      return;
    }

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-[2.5px] bg-transparent"
    >
      <div
        ref={barRef}
        className="scroll-progress-bar h-full w-full bg-primary"
      />
    </div>
  );
}
