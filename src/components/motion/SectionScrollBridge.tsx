"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Seamless Bidirectional Scroll Bridge connecting Section 02 (AI-Augmented Workflow)
 * and Section 03 (3D Experience Timeline).
 * Scrubbed 1:1 with scroll progress in BOTH directions (02 → 03 and 03 → 02)
 * without snapping or resetting state — keeping the transition kinetic and cohesive.
 */
export function SectionScrollBridge() {
  const bridgeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 135,
    damping: 26,
    mass: 0.28,
  });

  const spineScaleY = useTransform(smooth, [0.12, 0.86], [0, 1]);
  const packetY = useTransform(smooth, [0.1, 0.9], ["-44%", "44%"]);
  const leftTrackX = useTransform(smooth, [0, 0.5, 1], ["-12%", "0%", "12%"]);
  const rightTrackX = useTransform(smooth, [0, 0.5, 1], ["12%", "0%", "-12%"]);
  const nodeScale = useTransform(smooth, [0.25, 0.5, 0.75], [0.88, 1.08, 0.92]);

  return (
    <div
      ref={bridgeRef}
      aria-hidden="true"
      className="relative overflow-x-clip border-y border-border bg-background py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative flex flex-col items-center justify-center py-6">
          {/* Opposing Architectural Coordinate Rails (smoothly slide on scroll both ways) */}
          <motion.div
            style={{ x: leftTrackX }}
            className="pointer-events-none mb-5 flex w-full items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span>02 // DETERMINISTIC PIPELINE</span>
            <span className="h-px flex-1 bg-border" />
            <span>MCP TASK DAG HANDOFF</span>
          </motion.div>

          {/* Center Vertical Continuous Spine & Glowing Data Packet */}
          <div className="relative flex h-28 w-full items-center justify-center">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
            <motion.div
              style={{ scaleY: spineScaleY }}
              className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 origin-top bg-primary"
            />

            <motion.div
              style={{ y: packetY, scale: nodeScale }}
              className="relative z-10 flex items-center gap-3 border border-primary/70 bg-surface px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-lg"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>02 WORKFLOW ↔ 03 3D TIMELINE</span>
              <span className="text-primary">↕</span>
            </motion.div>
          </div>

          <motion.div
            style={{ x: rightTrackX }}
            className="pointer-events-none mt-5 flex w-full items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span>REAL-WORLD EXECUTION</span>
            <span className="h-px flex-1 bg-border" />
            <span>03 // 3D INTERACTIVE STORYTELLING</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
