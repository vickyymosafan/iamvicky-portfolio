"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface WorldPortalTransitionProps {
  renderTheater: (portalReady: boolean) => React.ReactNode;
}

const CORRIDOR_RINGS = [
  { id: 0, baseScale: 0.42, color: "rgba(200, 245, 60, 0.52)", depth: 0 },
  { id: 1, baseScale: 0.56, color: "rgba(86, 204, 242, 0.40)", depth: 1 },
  { id: 2, baseScale: 0.72, color: "rgba(86, 204, 242, 0.34)", depth: 2 },
  { id: 3, baseScale: 0.90, color: "rgba(200, 245, 60, 0.44)", depth: 3 },
  { id: 4, baseScale: 1.12, color: "rgba(86, 204, 242, 0.30)", depth: 4 },
  { id: 5, baseScale: 1.38, color: "rgba(86, 204, 242, 0.24)", depth: 5 },
] as const;

/**
 * Seamless Direct-to-Video Dimensional Scroll Portal ("03 → 04 // INNER WORLD TO OUTER WORLD"):
 * - Pre-mounts the live 16:9 Bang-Motion Video Theater during idle (hidden via `visibility: hidden`
 *   until scrollYProgress >= 0.14) — ZERO mid-scroll DOM/GSAP mount freeze, ZERO scroll stutter!
 * - Pure 100% GPU-composited 3D CSS architectural corridor + direct DOM ref visibility flips
 *   (ZERO React re-renders while scrolling through 03 → 04!).
 * - Anchors `id="stack"` right at the settled Outer World floor so clicking Navbar "Stack & Bio"
 *   lands directly on the full-scale cinema theater.
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

  // Pure DOM ref layer toggling — ZERO mid-scroll React state updates or synchronous mounts!
  const syncPortalDomRefs = useCallback((val: number) => {
    const reduced = prefersReducedRef.current;

    const innerEl = innerLayerRef.current;
    if (innerEl) {
      const showInner = !reduced && val < 0.42;
      const nextVis = showInner ? "visible" : "hidden";
      if (innerEl.style.visibility !== nextVis) {
        innerEl.style.visibility = nextVis;
        innerEl.setAttribute("aria-hidden", showInner ? "false" : "true");
      }
    }

    const theaterEl = theaterLayerRef.current;
    if (theaterEl) {
      const showTheater = reduced || val >= 0.14;
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
      const nextPointer = reduced || val >= 0.55 ? "auto" : "none";
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
    if (initialVal >= 0.72 && !portalReadyRef.current) {
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
    if (val >= 0.72 && !portalReadyRef.current) {
      portalReadyRef.current = true;
      setPortalReady(true);
    }
  });

  // 100% GPU compositor transforms — compact max scale (1.85x) avoids 4K+ layer re-tiling spikes!
  const tunnelScale = useTransform(scrollYProgress, [0, 0.74], [0.92, 1.85]);
  const tunnelRotate = useTransform(scrollYProgress, [0, 0.74], [0, 8]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.48, 0.72], [1, 0.85, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.72], [0.45, 0.85, 0]);
  const bgVeilOpacity = useTransform(scrollYProgress, [0.38, 0.72], [0, 1]);

  const innerTitleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.38], [1, 1, 0]);
  const innerTitleY = useTransform(scrollYProgress, [0, 0.38], [0, -32]);
  const innerTitleScale = useTransform(scrollYProgress, [0, 0.38], [1, 1.06]);

  // Direct continuous morph from Portal Aperture -> Full 100% Cinema Theater!
  const theaterScale = useTransform(scrollYProgress, [0.14, 0.72, 1], [0.76, 1, 1]);
  const theaterY = useTransform(scrollYProgress, [0.14, 0.72, 1], [40, 0, 0]);
  const theaterOpacity = useTransform(scrollYProgress, [0.14, 0.44, 0.68], [0.18, 0.94, 1]);

  return (
    <div
      ref={containerRef}
      aria-label="Seamless Inner-to-Outer World portal emerging directly into AI-Augmented Stack Explainer Theater"
      className="relative h-[180vh] w-full bg-[#070a0d]"
    >
      {/* Direct Navigation Anchor (#stack) positioned right at the settled full-scale Theater! */}
      <div
        id="stack"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-screen"
        aria-hidden="true"
      />

      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#070a0d]">
        {/* Layer 1: Pure GPU-Composited 3D Concentric Architectural Portal Corridor */}
        <motion.div
          aria-hidden="true"
          style={{
            scale: tunnelScale,
            rotate: tunnelRotate,
            opacity: tunnelOpacity,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(200,245,60,0.22) 0%, rgba(86,204,242,0.12) 32%, rgba(7,10,13,0) 68%)",
              }}
            />
          </motion.div>

          {CORRIDOR_RINGS.map((ring) => (
            <div
              key={ring.id}
              style={{
                width: "68vw",
                maxWidth: "56rem",
                height: "46vh",
                borderColor: ring.color,
                transform: `scale(${ring.baseScale}) rotate(${ring.depth * 1.6}deg)`,
              }}
              className="absolute border"
            />
          ))}
        </motion.div>

        {/* Layer 2: Seamless Theme-Aware Outer World Background Veil */}
        <motion.div
          ref={bgVeilRef}
          aria-hidden="true"
          style={{ opacity: bgVeilOpacity }}
          className="portal-bg-veil pointer-events-none absolute inset-0 bg-background"
        />

        {/* Layer 3: Inner World Entry Typography (toggles visibility via ref with zero React re-renders) */}
        <motion.div
          ref={innerLayerRef}
          style={{
            opacity: innerTitleOpacity,
            y: innerTitleY,
            scale: innerTitleScale,
            visibility: "visible",
          }}
          className="portal-inner-layer pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <BrandLogo
            size={52}
            tone="dark"
            className="mb-4"
          />
          <div className="inline-flex items-center gap-2 border border-white/25 bg-[#070a0d]/85 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8f53c]">
            <span>03 → 04 // INNER WORLD TO OUTER WORLD</span>
          </div>
          <p className="mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Stepping Directly Into the AI-Augmented Architecture Film
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-200">
            Keep scrolling smoothly — aperture expands live into theater ↓
          </p>
        </motion.div>

        {/* Layer 4: Pre-mounted 16:9 Bang-Motion Video Theater (visibility: hidden at scrollY = 0
            so zero mid-scroll DOM/GSAP construction lag AND zero low-opacity contrast findings!) */}
        <motion.div
          ref={theaterLayerRef}
          aria-hidden="true"
          style={{
            scale: theaterScale,
            y: theaterY,
            opacity: theaterOpacity,
            visibility: "hidden",
            pointerEvents: "none",
          }}
          className="portal-theater-layer relative z-30 flex w-full flex-col justify-center pt-24 pb-4 will-change-transform"
        >
          {renderTheater(portalReady)}
        </motion.div>
      </div>
    </div>
  );
}
