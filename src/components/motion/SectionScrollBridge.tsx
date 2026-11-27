import React from "react";

/**
 * Zero-JS Pure CSS Scroll-Driven Bridge connecting Section 02 (AI-Augmented Workflow)
 * and Section 03 (3D Experience Timeline).
 * Driven off the main thread via CSS `view-timeline: --bridge-tl block` with progressive
 * static enhancement for browsers without view-timeline or when `prefers-reduced-motion` is set.
 */
export function SectionScrollBridge() {
  return (
    <div
      aria-hidden="true"
      className="bridge-root relative overflow-x-clip border-y border-border bg-background py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative flex flex-col items-center justify-center py-6">
          {/* Opposing Architectural Coordinate Rails */}
          <div className="bridge-rail-left pointer-events-none mb-5 flex w-full items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>02 // DETERMINISTIC PIPELINE</span>
            <span className="h-px flex-1 bg-border" />
            <span>MCP TASK DAG HANDOFF</span>
          </div>

          {/* Center Vertical Continuous Spine & Data Packet */}
          <div className="relative flex h-28 w-full items-center justify-center">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
            <div className="bridge-spine absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-primary" />

            <div className="bridge-packet relative z-10 flex items-center gap-3 border border-primary/70 bg-surface px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-lg">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>02 WORKFLOW ↔ 03 3D TIMELINE</span>
              <span className="text-primary">↕</span>
            </div>
          </div>

          <div className="bridge-rail-right pointer-events-none mt-5 flex w-full items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>REAL-WORLD EXECUTION</span>
            <span className="h-px flex-1 bg-border" />
            <span>03 // 3D INTERACTIVE STORYTELLING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
