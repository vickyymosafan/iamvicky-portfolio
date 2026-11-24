"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { MotionConfig, cancelFrame, frame } from "framer-motion";

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  pauseScroll: () => void;
  resumeScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  pauseScroll: () => {},
  resumeScroll: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset = -76) => {
    const lenis = lenisRef.current?.lenis;

    if (lenis) {
      lenis.scrollTo(target, {
        offset,
        duration: 1.05,
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

  return (
    <MotionConfig reducedMotion="never">
      <SmoothScrollContext.Provider value={{ scrollTo, pauseScroll, resumeScroll }}>
        <ReactLenis
          root
          ref={lenisRef}
          options={{
            autoRaf: false,
            lerp: 0.085,
            duration: 1.15,
            smoothWheel: true,
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
