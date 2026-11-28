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
