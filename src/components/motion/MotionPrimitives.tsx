"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

interface EditorialRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function EditorialReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 18,
}: EditorialRevealProps) {
  const offset = {
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
  };

  return (
    <motion.div
      initial={{ x: offset.x, y: offset.y, scale: 0.99 }}
      whileInView={{ x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.56, delay, ease: ARCHITECTURAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
}

export function ParallaxFrame({ children, className, offsetY = 28 }: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });
  const y = useTransform(smoothProgress, [0, 1], [offsetY, -offsetY]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
  actions,
}: SectionHeaderProps) {
  return (
    <EditorialReveal
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-primary">{index}</span>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.08]">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </EditorialReveal>
  );
}

/**
 * Fallback IntersectionObserver for horizontal scrollability fade hints
 * (active only in browsers that do not support CSS scroll(self inline) timelines).
 */
export function useHorizontalScrollHints(
  scrollerRef: React.RefObject<HTMLDivElement | null>,
  itemCount: number
) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (
      typeof CSS !== "undefined" &&
      CSS.supports("animation-timeline", "scroll(self inline)")
    ) {
      return;
    }

    const first = scroller.firstElementChild;
    const last = scroller.lastElementChild;
    if (!first || !last) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, intersectionRatio } of entries) {
          if (target === first) {
            scroller.classList.toggle("more-start", intersectionRatio < 1);
          }
          if (target === last) {
            scroller.classList.toggle("more-end", intersectionRatio < 1);
          }
        }
      },
      { root: scroller, threshold: 1, rootMargin: "1px" }
    );

    observer.observe(first);
    observer.observe(last);
    return () => observer.disconnect();
  }, [scrollerRef, itemCount]);
}
