"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Layers } from "lucide-react";
import { FeaturedProject } from "@/data/portfolio";
import type { CardSlotHandle } from "@/components/three/ProjectCardsThreeLayer";

// Code-split Three.js scissor canvas so initial Hero load never downloads Three.js upfront
const ProjectCardsThreeLayer = dynamic(
  () =>
    import("@/components/three/ProjectCardsThreeLayer").then(
      (m) => m.ProjectCardsThreeLayer
    ),
  { ssr: false }
);

interface HorizontalScrollShowcaseProps {
  projects: FeaturedProject[];
  onInspectProject: (project: FeaturedProject) => void;
}

const CATEGORIES = [
  "All",
  "AI & RAG",
  "MCP & Agentic",
  "Full-Stack",
  "Enterprise ERP",
] as const;

/**
 * Compact 3D Interactive Horizontal-on-Vertical Scroll Showcase (Zero Arrow Buttons):
 * - Direct 1:1 scrollYProgress mapping synced with Lenis (eliminates double-smoothing latency at 120-300Hz!).
 * - Direct DOM ref hover tilt (zero React state updates on high-frequency pointermove!).
 * - Powered by a single off-screen-pausing Three.js WebGL scissor layer.
 */
export function HorizontalScrollShowcase({
  projects,
  onInspectProject,
}: HorizontalScrollShowcaseProps) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<Map<string, CardSlotHandle>>(new Map());

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  const projectIds = useMemo(
    () => filteredProjects.map((p) => p.id),
    [filteredProjects]
  );

  useEffect(() => {
    const measure = () => {
      const viewport = stickyRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setMaxTranslate(overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (stickyRef.current) ro.observe(stickyRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [filteredProjects.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Direct 1:1 GPU transform synced to Lenis smooth scroll — zero double-spring lag at 300 FPS!
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      Math.max(0, filteredProjects.length - 1),
      Math.max(0, Math.round(latest * Math.max(1, filteredProjects.length - 1)))
    );
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const trackHeightVh = useMemo(() => {
    if (filteredProjects.length <= 1) return 105;
    return Math.max(190, Math.round(115 + filteredProjects.length * 40));
  }, [filteredProjects.length]);

  return (
    <div className="space-y-4">
      {/* Compact Architectural Category Filter Bar (Zero Arrow Buttons) */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-3.5">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="tablist"
            aria-label="Filter featured engineering projects by category"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveIndex(0);
                  }}
                  className={`relative px-3.5 py-2 font-mono text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-primary font-semibold text-primary-foreground"
                      : "border border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="font-bold text-primary tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" aria-hidden="true" />
            <span className="hidden sm:inline">
              Scroll down to glide right · Scroll up to rewind
            </span>
          </div>
        </div>
      </div>

      {/* Pinned Vertical-to-Horizontal 3D Stage */}
      <div
        ref={sectionRef}
        style={{ height: `${trackHeightVh}vh` }}
        className="relative"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 flex min-h-screen flex-col justify-center overflow-x-clip py-20"
        >
          {/* Minimal Floating Architectural HUD */}
          <div className="relative z-10 mx-auto mb-5 flex w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-primary tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="font-normal text-muted">
                  {" "}
                  / {String(filteredProjects.length).padStart(2, "0")}
                </span>
              </span>
              <span className="h-4 w-px bg-border" aria-hidden="true" />
              <span className="truncate font-heading text-sm font-semibold text-foreground sm:text-base">
                {filteredProjects[activeIndex]?.title}
              </span>
            </div>

            <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:inline">
              Interactive 3D · Hover card to orbit
            </span>
          </div>

          {/* Horizontal Translating Card Track + Shared Off-Screen-Pausing 3D Scissor Layer */}
          <div className="relative z-10 w-full overflow-hidden">
            <ProjectCardsThreeLayer slotsRef={slotsRef} projectIds={projectIds} />
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex w-max items-stretch gap-5 px-[max(1.25rem,calc((100vw-80rem)/2+2rem))] will-change-transform"
            >
              {filteredProjects.map((project, idx) => (
                <Compact3DProjectCard
                  key={project.id}
                  project={project}
                  isActive={idx === activeIndex}
                  onInspectProject={onInspectProject}
                  slotsRef={slotsRef}
                />
              ))}
            </motion.div>
          </div>

          {/* Continuous Scroll Progress Bar */}
          <div className="relative z-10 mx-auto mt-7 w-full max-w-7xl px-5 sm:px-8">
            <div className="h-[3px] w-full overflow-hidden bg-surface-elevated">
              <motion.div
                style={{ scaleX: progressScaleX }}
                className="h-full origin-left bg-primary"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{"01 // Start of Rail"}</span>
              <span className="hidden sm:inline">
                Scroll continuously to transition into Shipped Archive ↓
              </span>
              <span>{`0${filteredProjects.length} // End of Rail`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Compact3DProjectCard({
  project,
  isActive,
  onInspectProject,
  slotsRef,
}: {
  project: FeaturedProject;
  isActive: boolean;
  onInspectProject: (project: FeaturedProject) => void;
  slotsRef: React.MutableRefObject<Map<string, CardSlotHandle>>;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, hovered: false });

  useEffect(() => {
    const map = slotsRef.current;
    map.set(project.id, {
      id: project.id,
      getElement: () => stageRef.current,
      getPointer: () => pointerRef.current,
    });
    return () => {
      map.delete(project.id);
    };
  }, [project.id, slotsRef]);

  // Keep rest depth synced when active card changes
  useEffect(() => {
    if (articleRef.current && !pointerRef.current.hovered) {
      articleRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(${
        isActive ? "8px" : "0px"
      })`;
    }
  }, [isActive]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  // Pure DOM ref transform — ZERO React re-renders during 1000Hz gaming-mouse pointermove!
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    rectRef.current = rect;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current = { x: nx, y: ny, hovered: true };

    if (articleRef.current) {
      articleRef.current.style.transform = `rotateX(${(-ny * 5.5).toFixed(2)}deg) rotateY(${(
        nx * 6.5
      ).toFixed(2)}deg) translateZ(${isActive ? "8px" : "0px"})`;
    }
  };

  const handlePointerLeave = () => {
    rectRef.current = null;
    pointerRef.current = { x: 0, y: 0, hovered: false };
    if (articleRef.current) {
      articleRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(${
        isActive ? "8px" : "0px"
      })`;
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-[300px] shrink-0 snap-start sm:w-[335px] lg:w-[356px]"
      data-active={isActive ? "true" : "false"}
    >
      <article
        ref={articleRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `rotateX(0deg) rotateY(0deg) translateZ(${isActive ? "8px" : "0px"})`,
          transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease",
        }}
        className={`group relative flex h-full flex-col justify-between border bg-surface/95 shadow-xl ${
          isActive ? "border-primary/70" : "border-border hover:border-border-strong"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated/80 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="font-bold text-primary">{`${project.index} // ${project.category}`}</span>
          <span className="text-muted">{project.year}</span>
        </div>

        {/* Interactive 3D Three.js Stage Slot */}
        <div className="relative border-b border-border bg-surface-elevated/35">
          <div
            ref={stageRef}
            role="img"
            aria-label={`Interactive 3D model representing ${project.title}`}
            className="relative h-[144px] w-full overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 62%, var(--primary-soft) 0%, transparent 72%)",
              }}
            />
          </div>
        </div>

        {/* Compact Architectural Info Deck */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div className="space-y-3">
            <div>
              <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-0.5 truncate font-mono text-[11px] text-muted">
                {project.subtitle}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-ink-secondary">{project.summary}</p>

            {/* Compact 3-Metric Hairline Strip */}
            <div className="grid grid-cols-3 border border-border bg-surface-elevated/40">
              {project.metrics.map((metric, mIdx) => (
                <div
                  key={metric.label}
                  className={`px-2 py-2 text-center ${
                    mIdx > 0 ? "border-l border-border" : ""
                  }`}
                >
                  <div className="font-heading text-sm font-bold text-foreground tabular-nums">
                    {metric.value}
                  </div>
                  <div className="font-mono text-[11px] leading-tight text-muted">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-ink-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3.5">
            <button
              type="button"
              onClick={() => onInspectProject(project)}
              className="inline-flex min-h-10 items-center gap-1.5 bg-primary px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-hover cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Inspect</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-1.5">
              {project.links.slice(0, 2).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} for ${project.title}`}
                  className="inline-flex h-10 items-center gap-1 border border-border bg-surface-elevated px-2.5 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  {link.kind === "github" ? (
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline">
                    {link.kind === "live" ? "Live" : "GitHub"}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
