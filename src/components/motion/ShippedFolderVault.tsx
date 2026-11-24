"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  FileCode2,
  FolderClosed,
  FolderOpen,
  Lock,
  Unlock,
} from "lucide-react";
import { ADDITIONAL_PROJECTS, AdditionalProject } from "@/data/portfolio";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";
import { useAudioGate } from "@/components/providers/AudioGateProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const FOLDER_FILTERS = ["All", "Full-Stack", "Trading & Data", "Utilities"] as const;

/**
 * Interactive Animated Engineering Folder Vault for Additional Shipped Systems & Utilities:
 * - Starts CLOSED as a sculpted tactile 3D folder containing all 6 shipped project files.
 * - Clicking/tapping the folder opens its 3D front flap and springs all project files + category filters out.
 * - Mobile-safe scroll retraction:
 *   - NEVER collapses while the user is still scrolling down through the unpacked file cards!
 *   - Enforces a 750ms post-open grace period so tapping + immediate touch momentum never snaps it shut.
 *   - Only collapses filters & retracts files back into the folder once the user scrolls DOWNWARD
 *     past the ENTIRE unpacked vault (bottom edge clears past the header at `rect.bottom <= 96`).
 *   - Uses native `scrollend` (with debounced fallback for older browsers) to guarantee clean retraction
 *     after fast momentum flings, and notifies Lenis via `resizeScroll()` so scroll bounds never jump.
 * - Scrolling back up from Section 02 / 03 keeps the folder CLOSED until explicitly clicked again.
 */
export function ShippedFolderVault() {
  const { unlockAudio } = useAudioGate();
  const { resizeScroll } = useSmoothScroll();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFilter, setActiveFilter] =
    useState<(typeof FOLDER_FILTERS)[number]>("All");

  const vaultRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const isOpenRef = useRef(isOpen);
  const openedAtRef = useRef(0);
  const scrolledDownRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
    const id = requestAnimationFrame(() => resizeScroll());
    return () => cancelAnimationFrame(id);
  }, [isOpen, activeFilter, resizeScroll]);

  // Auto-retract files and close filters ONLY after scrolling downward past the entire unpacked vault.
  // Never auto-reopens when scrolling back up (stays closed unless clicked).
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let rafPending = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const evaluateRetract = (forceCheck = false) => {
      rafPending = false;
      if (!isOpenRef.current) return;

      // Mobile & desktop grace window right after clicking the folder
      if (performance.now() - openedAtRef.current < 750) {
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      if (delta > 6) {
        scrolledDownRef.current = true;
      } else if (delta < -6) {
        scrolledDownRef.current = false;
      }
      lastScrollYRef.current = currentY;

      if (!scrolledDownRef.current && !forceCheck) return;

      const el = vaultRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // ONLY close once the bottom of ALL unpacked project cards has cleared near/past the top navbar!
      // This guarantees mobile users can scroll freely through every single unpacked file card without premature closing.
      if (rect.bottom <= 96 && scrolledDownRef.current) {
        setIsOpen(false);
        setActiveFilter("All");
        scrolledDownRef.current = false;
      }
    };

    const hasScrollEnd = "onscrollend" in window;

    const onScroll = () => {
      if (!isOpenRef.current) {
        lastScrollYRef.current = window.scrollY;
        return;
      }
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => evaluateRetract(false));
      }
      if (!hasScrollEnd) {
        if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(() => evaluateRetract(true), 120);
      }
    };

    const onScrollEnd = () => {
      if (isOpenRef.current) {
        evaluateRetract(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (hasScrollEnd) {
      window.addEventListener("scrollend", onScrollEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hasScrollEnd) {
        window.removeEventListener("scrollend", onScrollEnd);
      }
      if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
    };
  }, []);

  const visibleFiles = useMemo(() => {
    if (activeFilter === "All") return ADDITIONAL_PROJECTS;
    return ADDITIONAL_PROJECTS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const toggleFolder = () => {
    unlockAudio();
    setIsOpen((prev) => {
      if (prev) {
        setActiveFilter("All");
        scrolledDownRef.current = false;
      } else {
        openedAtRef.current = performance.now();
        lastScrollYRef.current = window.scrollY;
        scrolledDownRef.current = false;
      }
      return !prev;
    });
  };

  return (
    <div
      ref={vaultRef}
      id="shipped-vault"
      data-vault-open={isOpen ? "true" : "false"}
      className="mx-auto mt-10 max-w-7xl px-5 sm:mt-16 sm:px-8"
    >
      <div className="relative border border-border bg-surface/75 p-6 sm:p-8 lg:p-10">
        {/* Section Sub-Header */}
        <div className="mb-8 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span>ARCHIVE VAULT // 01.B</span>
              <span className="text-muted">·</span>
              <span className="text-muted">{ADDITIONAL_PROJECTS.length} SHIPPED FILES</span>
            </div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Additional Shipped Systems &amp; Utilities
            </h3>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-muted sm:text-right">
            {isOpen
              ? "Archive unpacked — browse all files freely; vault retracts automatically once you scroll past into Section 02."
              : "Click the engineering folder below to unpack all shipped repositories & MQL5 suites."}
          </p>
        </div>

        {/* Center Interactive 3D Tactile Folder Trigger */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={toggleFolder}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-expanded={isOpen}
            aria-controls="shipped-vault-files"
            data-testid="shipped-folder-trigger"
            className="group relative w-full max-w-[340px] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            style={{ perspective: 950 }}
          >
            {/* Folder Back Tab */}
            <div className="flex items-end">
              <div className="inline-flex items-center gap-2 border-x border-t border-border-strong bg-surface-elevated px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                {isOpen ? (
                  <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <FolderClosed className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>~/shipped-systems</span>
              </div>
              <div className="ml-auto pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {isOpen ? "OPEN · CLICK TO CLOSE" : "PACKED · 06 FILES"}
              </div>
            </div>

            {/* Folder Chassis Backplate + Peeking Layered Project Sheets */}
            <div className="relative h-44 w-full border border-border-strong bg-surface-elevated/90 shadow-lg">
              {/* 3 Peeking Blueprint File Sheets inside the folder */}
              {ADDITIONAL_PROJECTS.slice(0, 3).map((proj, sheetIdx) => {
                const restY = -6 - sheetIdx * 5;
                const hoverY = isOpen ? -24 - sheetIdx * 8 : -16 - sheetIdx * 8;
                const rot = (sheetIdx - 1) * (isHovered || isOpen ? 5 : 2);
                return (
                  <motion.div
                    key={proj.fileCode}
                    aria-hidden="true"
                    animate={{
                      y: isHovered || isOpen ? hoverY : restY,
                      rotate: rot,
                      opacity: isOpen ? 0.25 : 0.95,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="pointer-events-none absolute inset-x-4 top-3 h-24 border border-border-strong bg-background/95 px-3 py-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-semibold text-primary">{proj.fileCode}</span>
                      <span className="text-muted">{proj.stackBadge}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-2/3 bg-border" />
                    <div className="mt-1.5 h-1.5 w-1/2 bg-border/60" />
                  </motion.div>
                );
              })}

              {/* 3D Articulated Front Folder Flap */}
              <motion.div
                animate={{
                  rotateX: isOpen ? -28 : isHovered ? -10 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
                className={`absolute inset-x-0 bottom-0 z-10 flex h-34 flex-col justify-between border-t-2 p-5 shadow-md transition-colors ${
                  isOpen
                    ? "border-primary bg-surface"
                    : "border-border-strong bg-surface group-hover:border-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-foreground">
                    {isOpen ? (
                      <Unlock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-muted group-hover:text-primary" aria-hidden="true" />
                    )}
                    <span>{isOpen ? "Vault Unpacked" : "Shipped Vault"}</span>
                  </span>

                  <span className="bg-primary px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-primary-foreground tabular-nums">
                    06 FILES
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-heading text-base font-bold text-foreground">
                    {isOpen
                      ? "Click to retract files back in"
                      : "Click folder to unpack projects"}
                  </p>
                  <p className="font-mono text-[11px] text-muted">
                    PHP MVC · MQL5 (5.0★) · POS API · CommOS · CLI Tools
                  </p>
                </div>
              </motion.div>
            </div>
          </button>

          {/* Animated Unpacked Filter Bar + Project Files Fan-Out / Retract Container */}
          <AnimatePresence initial={false} onExitComplete={resizeScroll}>
            {isOpen ? (
              <motion.div
                id="shipped-vault-files"
                key="vault-unpacked-drawer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onAnimationComplete={resizeScroll}
                transition={{ duration: 0.4, ease: ARCHITECTURAL_EASE }}
                className="w-full overflow-hidden"
              >
                <div className="pt-8">
                  {/* Collapsible Category Filter Strip */}
                  <motion.div
                    initial={{ opacity: 0, y: -16, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.88 }}
                    transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                    className="mb-5 flex flex-wrap items-center justify-center gap-2"
                    role="tablist"
                    aria-label="Filter unpacked shipped system files"
                  >
                    {FOLDER_FILTERS.map((filter) => {
                      const active = activeFilter === filter;
                      return (
                        <button
                          key={filter}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveFilter(filter)}
                          className={`min-h-10 cursor-pointer px-3.5 py-1.5 font-mono text-xs font-medium ${
                            active
                              ? "bg-primary font-semibold text-primary-foreground"
                              : "border border-border bg-background text-muted hover:border-primary hover:text-foreground"
                          }`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </motion.div>

                  {/* Animated Project File Cards Fanning Out from Folder & Retracting Back In */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleFiles.map((item, idx) => (
                      <ProjectFileCard
                        key={item.fileCode}
                        item={item}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const ProjectFileCard = React.memo(function ProjectFileCard({
  item,
  index,
}: {
  item: AdditionalProject;
  index: number;
}) {
  const originX = ((index % 3) - 1) * -65;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{
        opacity: 0,
        y: -58,
        x: originX,
        scale: 0.48,
        rotate: ((index % 3) - 1) * 4,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        y: -58,
        x: originX,
        scale: 0.36,
        rotate: ((index % 3) - 1) * -4,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 24,
        delay: index * 0.038,
      }}
      className="group relative flex flex-col justify-between border border-border-strong bg-background/90 p-4 hover:border-primary hover:bg-surface-elevated/80"
    >
      {/* File Header Tab */}
      <div className="flex items-center justify-between gap-2 border-b border-border pb-2.5 font-mono text-[11px]">
        <span className="inline-flex items-center gap-1.5 font-bold text-primary">
          <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{item.fileCode}</span>
        </span>
        <span className="border border-border bg-surface px-2 py-0.5 text-[11px] text-muted">
          {item.stackBadge}
        </span>
      </div>

      {/* File Content */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary">
            {item.name}
          </h4>
          <p className="text-xs leading-relaxed text-muted">{item.focus}</p>
        </div>
        <ArrowUpRight
          className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
    </motion.a>
  );
});
