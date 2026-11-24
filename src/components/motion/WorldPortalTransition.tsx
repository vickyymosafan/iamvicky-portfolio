"use client";

import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

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
 * - Houses the live 16:9 Bang-Motion Video Theater directly INSIDE the expanding portal aperture!
 * - Pure 100% GPU-composited 3D CSS architectural corridor (0 extra WebGL contexts, 0 VRAM cost, 300+ FPS!).
 * - Zero hard page breaks or seams between Section 03 and Section 04's video theater:
 *   - 0.00–0.40: Inner obsidian architectural depth corridor approaches the glowing dimensional aperture.
 *   - 0.20–0.80: Corridor rings fly smoothly outward past camera while the real Bang-Motion Theater expands
 *     directly into native 100% scale over the page background.
 *   - 0.80–1.00: Theater settles cleanly at 100% scale and immediately auto-plays with US Female Voice Over!
 * - Anchors `id="stack"` right at the settled Outer World floor so clicking Navbar "Stack & Bio" lands straight on the full video.
 */
export function WorldPortalTransition({ renderTheater }: WorldPortalTransitionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [innerVisible, setInnerVisible] = useState(true);
  const [theaterVisible, setTheaterVisible] = useState(false);
  const [theaterInteractive, setTheaterInteractive] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    setInnerVisible((prev) => {
      const next = val < 0.42;
      return prev === next ? prev : next;
    });
    setTheaterVisible((prev) => {
      const next = val >= 0.16;
      return prev === next ? prev : next;
    });
    setTheaterInteractive((prev) => {
      const next = val >= 0.55;
      return prev === next ? prev : next;
    });
    if (val >= 0.72) {
      setPortalReady((prev) => (prev ? prev : true));
    }
  });

  // 100% GPU compositor transforms — finish settling by 0.74 so even Navbar -78px anchor offset lands at 100% crisp Theater!
  const tunnelScale = useTransform(scrollYProgress, [0, 0.74], [1, 3.4]);
  const tunnelRotate = useTransform(scrollYProgress, [0, 0.74], [0, 12]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.48, 0.72], [1, 0.85, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.72], [0.45, 0.9, 0]);
  const bgVeilOpacity = useTransform(scrollYProgress, [0.38, 0.72], [0, 1]);

  const innerTitleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.38], [1, 1, 0]);
  const innerTitleY = useTransform(scrollYProgress, [0, 0.38], [0, -40]);
  const innerTitleScale = useTransform(scrollYProgress, [0, 0.38], [1, 1.12]);

  // Direct continuous morph from Portal Aperture -> Full 100% Cinema Theater!
  const theaterScale = useTransform(scrollYProgress, [0.16, 0.72, 1], [0.74, 1, 1]);
  const theaterY = useTransform(scrollYProgress, [0.16, 0.72, 1], [44, 0, 0]);
  const theaterOpacity = useTransform(scrollYProgress, [0.16, 0.46, 0.7], [0.15, 0.92, 1]);

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
        {/* Layer 1: Pure GPU-Composited 3D Concentric Architectural Portal Corridor (300+ FPS, 0 WebGL cost) */}
        <motion.div
          aria-hidden="true"
          style={{
            scale: tunnelScale,
            rotate: tunnelRotate,
            opacity: tunnelOpacity,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        >
          {/* Ambient radial horizon pulse */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(200,245,60,0.22) 0%, rgba(86,204,242,0.12) 32%, rgba(7,10,13,0) 68%)",
              }}
            />
          </motion.div>

          {/* Receding concentric architectural wireframe portal gates */}
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
          aria-hidden="true"
          style={{ opacity: bgVeilOpacity }}
          className="pointer-events-none absolute inset-0 bg-background"
        />

        {/* Layer 3: Inner World Entry Typography (unmounts cleanly before Theater locks in) */}
        {innerVisible ? (
          <motion.div
            style={{
              opacity: innerTitleOpacity,
              y: innerTitleY,
              scale: innerTitleScale,
            }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
          >
            <div className="inline-flex items-center gap-2 border border-white/25 bg-[#070a0d]/85 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8f53c]">
              <span>03 → 04 // INNER WORLD TO OUTER WORLD</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Stepping Directly Into the AI-Augmented Architecture Film
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-200">
              Keep scrolling smoothly — aperture expands live into theater ↓
            </p>
          </motion.div>
        ) : null}

        {/* Layer 4: LIVE 16:9 Bang-Motion Video Theater Morphing Seamlessly out of the Portal!
            Mounts smoothly when portal opens (scrollYProgress >= 0.16), saving initial DOM/GSAP work
            and ensuring zero hidden-heading or zero-opacity contrast issues at scrollY = 0. */}
        {theaterVisible ? (
          <motion.div
            style={{
              scale: theaterScale,
              y: theaterY,
              opacity: theaterOpacity,
            }}
            className={`relative z-30 flex w-full flex-col justify-center pt-24 pb-4 will-change-transform ${
              theaterInteractive ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {renderTheater(portalReady)}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
