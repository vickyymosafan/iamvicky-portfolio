"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface WorldPortalTransitionProps {
  renderTheater: (portalReady: boolean) => React.ReactNode;
}

const CORRIDOR_RINGS = [
  { id: 0, baseScale: 0.46, color: "rgba(200, 245, 60, 0.48)", depth: 0 },
  { id: 1, baseScale: 0.68, color: "rgba(86, 204, 242, 0.36)", depth: 1 },
  { id: 2, baseScale: 0.94, color: "rgba(200, 245, 60, 0.40)", depth: 2 },
  { id: 3, baseScale: 1.24, color: "rgba(86, 204, 242, 0.26)", depth: 3 },
] as const;

/**
 * Zero-Freeze Dimensional Scroll Portal ("03 → 04 // INNER WORLD TO OUTER WORLD"):
 * - Keeps the 16:9 Cinema Theater at native scale(1) (NO mid-scroll CSS scale re-rasterization
 *   of the 1920x1080 stage!) — transitions purely via compositor opacity + subtle translateY.
 * - Direct DOM ref visibility & pointer-event switches (0 React re-renders during scroll).
 * - Compact 135vh scroll travel for crisp, lag-free traversal.
 */
export function WorldPortalTransition({ renderTheater }: WorldPortalTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgVeilRef = useRef<HTMLDivElement>(null);
  const innerLayerRef = useRef<HTMLDivElement>(null);
  const theaterLayerRef = useRef<HTMLDivElement>(null);
  const portalReadyRef = useRef(false);
  const prefersReducedRef = useRef(false);
  const [portalReady, setPortalReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const syncPortalDomRefs = useCallback((val: number) => {
    const reduced = prefersReducedRef.current;

    const innerEl = innerLayerRef.current;
    if (innerEl) {
      const showInner = !reduced && val < 0.44;
      const nextVis = showInner ? "visible" : "hidden";
      if (innerEl.style.visibility !== nextVis) {
        innerEl.style.visibility = nextVis;
        innerEl.setAttribute("aria-hidden", showInner ? "false" : "true");
      }
    }

    const theaterEl = theaterLayerRef.current;
    if (theaterEl) {
      const showTheater = reduced || val >= 0.16;
      const nextVis = showTheater ? "visible" : "hidden";
      if (theaterEl.style.visibility !== nextVis) {
        theaterEl.style.visibility = nextVis;
        theaterEl.setAttribute("aria-hidden", showTheater ? "false" : "true");
      }
      if (reduced) {
        theaterEl.style.opacity = "1";
        theaterEl.style.transform = "none";
        if (bgVeilRef.current) bgVeilRef.current.style.opacity = "1";
      }
      const nextPointer = reduced || val >= 0.52 ? "auto" : "none";
      if (theaterEl.style.pointerEvents !== nextPointer) {
        theaterEl.style.pointerEvents = nextPointer;
      }
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => {
      prefersReducedRef.current = media.matches;
      syncPortalDomRefs(scrollYProgress.get());
    };
    syncReduced();
    media.addEventListener("change", syncReduced);

    const initialVal = scrollYProgress.get();
    if (initialVal >= 0.68 && !portalReadyRef.current) {
      portalReadyRef.current = true;
      const id = requestAnimationFrame(() => setPortalReady(true));
      return () => {
        media.removeEventListener("change", syncReduced);
        cancelAnimationFrame(id);
      };
    }

    return () => media.removeEventListener("change", syncReduced);
  }, [scrollYProgress, syncPortalDomRefs]);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    syncPortalDomRefs(val);
    if (val >= 0.68 && !portalReadyRef.current) {
      portalReadyRef.current = true;
      setPortalReady(true);
    }
  });

  // Lean GPU compositor transforms: no massive scaling on complex nested DOM trees
  const tunnelScale = useTransform(scrollYProgress, [0, 0.7], [0.95, 1.48]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.46, 0.68], [1, 0.78, 0]);
  const bgVeilOpacity = useTransform(scrollYProgress, [0.34, 0.68], [0, 1]);

  const innerTitleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const innerTitleY = useTransform(scrollYProgress, [0, 0.4], [0, -28]);

  // Fixed scale(1) on Theater avoids Chromium re-rasterizing the 1920x1080 stage mid-scroll!
  const theaterY = useTransform(scrollYProgress, [0.16, 0.68, 1], [24, 0, 0]);
  const theaterOpacity = useTransform(scrollYProgress, [0.16, 0.46, 0.66], [0, 0.92, 1]);

  return (
    <div
      ref={containerRef}
      aria-label="Seamless Inner-to-Outer World portal emerging directly into AI-Augmented Stack Explainer Theater"
      className="relative h-[135vh] w-full bg-[#070a0d]"
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#070a0d]">
        {/* Layer 1: Lightweight Concentric Architectural Portal Corridor */}
        <m.div
          aria-hidden="true"
          style={{
            scale: tunnelScale,
            opacity: tunnelOpacity,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {CORRIDOR_RINGS.map((ring) => (
            <div
              key={ring.id}
              style={{
                width: "68vw",
                maxWidth: "56rem",
                height: "46vh",
                borderColor: ring.color,
                transform: `scale(${ring.baseScale})`,
              }}
              className="absolute border"
            />
          ))}
        </m.div>

        {/* Layer 2: Seamless Theme-Aware Outer World Background Veil */}
        <m.div
          ref={bgVeilRef}
          aria-hidden="true"
          style={{ opacity: bgVeilOpacity }}
          className="portal-bg-veil pointer-events-none absolute inset-0 bg-background"
        />

        {/* Layer 3: Inner World Entry Typography */}
        <m.div
          ref={innerLayerRef}
          style={{
            opacity: innerTitleOpacity,
            y: innerTitleY,
            visibility: "visible",
          }}
          className="portal-inner-layer pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <BrandLogo size={52} tone="dark" className="mb-4" />
          <div className="inline-flex items-center gap-2 border border-white/25 bg-[#070a0d]/90 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8f53c]">
            <span>03 → 04 // INNER WORLD TO OUTER WORLD</span>
          </div>
          <p className="mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Stepping Directly Into the AI-Augmented Architecture Film
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-200">
            Keep scrolling smoothly — aperture opens live into theater ↓
          </p>
        </m.div>

        {/* Layer 4: 16:9 Bang-Motion Video Theater (fixed scale=1 -> zero mid-scroll re-rasterization!) */}
        <m.div
          ref={theaterLayerRef}
          aria-hidden="true"
          style={{
            y: theaterY,
            opacity: theaterOpacity,
            visibility: "hidden",
            pointerEvents: "none",
          }}
          className="portal-theater-layer relative z-30 flex w-full flex-col justify-center pt-20 pb-4"
        >
          {renderTheater(portalReady)}
        </m.div>
      </div>
    </div>
  );
}
