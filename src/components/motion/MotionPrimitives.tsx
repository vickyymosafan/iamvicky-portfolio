"use client";

import React, { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING_PILL = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.8,
};

export const SPRING_TACTILE = {
  type: "spring" as const,
  stiffness: 440,
  damping: 30,
};

export const SPRING_PARALLAX = {
  stiffness: 120,
  damping: 28,
  restDelta: 0.001,
};

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.12,
} as const;

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Compositor-only architectural section reveal.
 * Keeps resting opacity at 1 so content is never hidden under prefers-reduced-motion.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 20,
}: SectionRevealProps) {
  return (
    <m.div
      initial={{ y, scale: 0.992 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.52, delay, ease: ARCHITECTURAL_EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.055,
  delayChildren = 0.03,
}: StaggerGroupProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

export function StaggerItem({ children, className, y = 16 }: StaggerItemProps) {
  return (
    <m.div
      variants={{
        hidden: { y, scale: 0.988 },
        visible: {
          y: 0,
          scale: 1,
          transition: { duration: 0.44, ease: ARCHITECTURAL_EASE },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface ScrollDepthParallaxProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

/**
 * GPU-composited scroll-linked parallax (useScroll -> useTransform -> useSpring).
 * Short-circuits cleanly to 0px when prefers-reduced-motion is enabled.
 */
export function ScrollDepthParallax({
  children,
  className,
  distance = 22,
}: ScrollDepthParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [distance, -distance]
  );
  const smoothY = useSpring(rawY, SPRING_PARALLAX);

  return (
    <div ref={containerRef} className={className}>
      <m.div style={{ y: shouldReduceMotion ? 0 : smoothY }}>
        {children}
      </m.div>
    </div>
  );
}

interface ScrollScaleStageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Subtle scroll-linked entrance scale & elevation for hero showcase frames.
 */
export function ScrollScaleStage({ children, className }: ScrollScaleStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center 72%"],
  });
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.968, 1]
  );
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [20, 0]
  );
  const scale = useSpring(rawScale, SPRING_PARALLAX);
  const y = useSpring(rawY, SPRING_PARALLAX);

  return (
    <div ref={stageRef} className={className}>
      <m.div style={shouldReduceMotion ? undefined : { scale, y }}>
        {children}
      </m.div>
    </div>
  );
}

interface ScrollProgressLineProps {
  targetRef: React.RefObject<HTMLElement | null>;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

/**
 * Scroll-driven timeline spine / accent beam (scaleY / scaleX via useScroll + useSpring).
 */
export function ScrollProgressLine({
  targetRef,
  className,
  orientation = "vertical",
}: ScrollProgressLineProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 78%", "end 62%"],
  });
  const progress = useSpring(scrollYProgress, SPRING_PARALLAX);

  return (
    <m.div
      aria-hidden="true"
      className={className}
      style={
        orientation === "vertical"
          ? {
              scaleY: shouldReduceMotion ? 1 : progress,
              transformOrigin: "top center",
            }
          : {
              scaleX: shouldReduceMotion ? 1 : progress,
              transformOrigin: "left center",
            }
      }
    />
  );
}

interface SlidingPillProps {
  layoutId: string;
  className?: string;
}

/**
 * Shared-element spring pill indicator for navigation & category filter tabs.
 */
export function SlidingPill({ layoutId, className }: SlidingPillProps) {
  return (
    <m.span
      layoutId={layoutId}
      aria-hidden="true"
      transition={SPRING_PILL}
      className={className}
    />
  );
}

interface DividerRevealProps {
  className?: string;
}

export function DividerReveal({ className }: DividerRevealProps) {
  return (
    <m.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.72, ease: ARCHITECTURAL_EASE }}
      style={{ transformOrigin: "left center" }}
      className={className}
    />
  );
}

interface KineticTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "view";
}

/**
 * Masked split-word kinetic typography reveal.
 * Keeps resting opacity at 1 and renders statically under prefers-reduced-motion.
 */
export function KineticTextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.048,
  trigger = "view",
}: KineticTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, idx) => (
        <React.Fragment key={`${word}-${idx}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <m.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={trigger === "mount" ? { y: "0%" } : undefined}
              whileInView={trigger === "view" ? { y: "0%" } : undefined}
              viewport={trigger === "view" ? VIEWPORT_ONCE : undefined}
              transition={{
                duration: 0.56,
                delay: delay + idx * stagger,
                ease: ARCHITECTURAL_EASE,
              }}
            >
              {word}
            </m.span>
          </span>
          {idx < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

interface KineticScrollBandProps {
  items: readonly string[];
  direction?: "left" | "right";
  className?: string;
}

/**
 * Decorative scroll-linked kinetic typographic ribbon.
 * Translates smoothly on horizontal scroll axis via useScroll + useTransform + useSpring.
 */
export function KineticScrollBand({
  items,
  direction = "left",
  className,
}: KineticScrollBandProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [0, 0]
      : direction === "left"
      ? [44, -76]
      : [-76, 44]
  );
  const smoothX = useSpring(rawX, SPRING_PARALLAX);

  return (
    <div
      ref={bandRef}
      data-kinetic-band
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-x-clip border-y border-border/60 py-3 ${className ?? ""}`}
    >
      <m.div
        style={{ x: shouldReduceMotion ? 0 : smoothX }}
        className="flex w-max items-center gap-6 whitespace-nowrap font-heading text-xs font-bold uppercase tracking-[0.26em] text-muted sm:text-sm"
      >
        {[...items, ...items].map((item, idx) => (
          <React.Fragment key={`${item}-${idx}`}>
            <span className={idx % 2 === 0 ? "text-muted" : "text-primary"}>
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-primary" />
          </React.Fragment>
        ))}
      </m.div>
    </div>
  );
}
