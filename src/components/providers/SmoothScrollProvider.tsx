"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { LazyMotion, MotionConfig, cancelFrame, domAnimation, frame } from "framer-motion";
import "lenis/dist/lenis.css";

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  pauseScroll: () => void;
  resumeScroll: () => void;
  resizeScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  pauseScroll: () => {},
  resumeScroll: () => {},
  resizeScroll: () => {},
});

/**
 * On-Demand Zero-Desync Smooth Scroll Provider (Motion LazyMotion + Lenis):
 * - Uses `<LazyMotion features={domAnimation} strict>` to cut Framer Motion client bundle dramatically.
 * - Respects user reduced-motion preferences (`reducedMotion="user"` + Lenis `respectReducedMotion: true`).
 * - Runs Lenis inside Motion's `frame.setup` (BEFORE `frame.read` measures scrollY for 0-frame desync),
 *   and automatically sleeps the frameloop once scrolling settles (0% idle CPU/GPU overhead).
 * - Relies on Lenis's built-in `autoResize: true` instead of a duplicate body ResizeObserver.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let active = false;
    let idleFrames = 0;

    const update = (data: { timestamp: number }) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      lenis.raf(data.timestamp);

      if (lenis.isScrolling) {
        idleFrames = 0;
      } else {
        idleFrames++;
        // Sleep the Motion frameloop cleanly once inertia completely settles (~200ms)
        if (idleFrames >= 12) {
          active = false;
          cancelFrame(update);
        }
      }
    };

    const wake = () => {
      idleFrames = 0;
      if (!active) {
        active = true;
        frame.setup(update, true);
      }
    };

    wakeRef.current = wake;

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "PageDown" ||
        e.key === "PageUp" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === " "
      ) {
        wake();
      }
    };

    window.addEventListener("wheel", wake, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("touchmove", wake, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: true });

    return () => {
      wakeRef.current = null;
      if (active) cancelFrame(update);
      window.removeEventListener("wheel", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("touchmove", wake);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset = -76) => {
    const lenis = lenisRef.current?.lenis;

    if (lenis) {
      wakeRef.current?.();
      lenis.scrollTo(target, {
        offset,
        duration: 0.78,
      });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const pauseScroll = useCallback(() => {
    lenisRef.current?.lenis?.stop();
  }, []);

  const resumeScroll = useCallback(() => {
    lenisRef.current?.lenis?.start();
  }, []);

  const resizeScroll = useCallback(() => {
    lenisRef.current?.lenis?.resize();
  }, []);

  const value = useMemo(
    () => ({ scrollTo, pauseScroll, resumeScroll, resizeScroll }),
    [scrollTo, pauseScroll, resumeScroll, resizeScroll]
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScrollContext.Provider value={value}>
          <ReactLenis
            root
            ref={lenisRef}
            options={{
              autoRaf: false,
              autoResize: true,
              lerp: 0.14,
              smoothWheel: true,
              syncTouch: false,
              wheelMultiplier: 1.15,
              touchMultiplier: 1.0,
              respectReducedMotion: true,
              stopInertiaOnNavigate: true,
              anchors: { offset: -76 },
            }}
          >
            {children}
          </ReactLenis>
        </SmoothScrollContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
