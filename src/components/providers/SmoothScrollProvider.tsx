"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { MotionConfig, cancelFrame, frame } from "framer-motion";
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
 * Unified Zero-Desync Smooth Scroll Provider (Motion + Lenis):
 * - Drives Lenis inside Motion's `frame.setup` step (BEFORE `frame.read` measures scrollY)
 *   per official Motion docs (https://motion.dev/docs/lenis), eliminating 1-frame scroll-tracking stutter.
 * - Uses native 120Hz touch physics on mobile (`syncTouch: false`) and silky desktop wheel inertia (`lerp: 0.1`).
 * - Syncs Lenis document bounds automatically via rAF-throttled `ResizeObserver(document.body)`
 *   whenever collapsible sections (e.g. ShippedFolderVault) change page height.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    // Critical: `frame.setup` executes BEFORE Motion's `read` phase so useScroll
    // always receives the exact current frame's scroll position (zero 1-frame lag/jitter).
    frame.setup(update, true);

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        lenisRef.current?.lenis?.resize();
      });
    });
    ro.observe(document.body);

    return () => {
      cancelFrame(update);
      ro.disconnect();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset = -76) => {
    const lenis = lenisRef.current?.lenis;

    if (lenis) {
      lenis.scrollTo(target, {
        offset,
        duration: 1.0,
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

  return (
    <MotionConfig reducedMotion="never">
      <SmoothScrollContext.Provider
        value={{ scrollTo, pauseScroll, resumeScroll, resizeScroll }}
      >
        <ReactLenis
          root
          ref={lenisRef}
          options={{
            autoRaf: false,
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.0,
            anchors: { offset: -76 },
          }}
        >
          {children}
        </ReactLenis>
      </SmoothScrollContext.Provider>
    </MotionConfig>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
