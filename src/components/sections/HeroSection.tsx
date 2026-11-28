"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Code2,
  Cpu,
  Download,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  ARCHITECTURAL_EASE,
  DividerReveal,
  ScrollDepthParallax,
  SectionReveal,
  SPRING_TACTILE,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { SectionBackdrop } from "@/components/ui/StudioBackdrop";

const METRIC_ICONS = [Briefcase, FolderKanban, Award] as const;

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="hero" className="relative overflow-x-clip pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36">
      {/* Reference-Matched Hero Atmospheric Backdrop (Orbital Arc, Studio Spotlight, Sparkles) */}
      <SectionBackdrop variant="hero" />

      {/* Delicate Vertical Scroll Down Rail on Ultra-Wide Screens (Matches redesign-hero-section.png) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 2xl:flex"
      >
        <span className="[writing-mode:vertical-rl] font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
          Scroll Down
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-primary/70 to-transparent" />
        <span className="flex h-7 w-4 items-start justify-center rounded-full border border-border-strong p-1">
          <span className="h-1.5 w-1 rounded-full bg-primary" />
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Main Hero Split Composition */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Narrative Column */}
          <div className="space-y-7 lg:col-span-7">
            {/* Availability Status Pill */}
            <m.div
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: ARCHITECTURAL_EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface/90 px-4 py-1.5 font-mono text-xs font-medium text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>{PROFILE.availability}</span>
              </span>
            </m.div>

            {/* Primary Storytelling Headline */}
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[66px]">
                <m.span
                  initial={{ y: 18 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.48, delay: 0.02, ease: ARCHITECTURAL_EASE }}
                  className="block"
                >
                  {PROFILE.heroHeadlineTop}
                </m.span>
                <m.span
                  initial={{ y: 18 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: ARCHITECTURAL_EASE }}
                  className="block"
                >
                  {PROFILE.heroHeadlineMid}
                </m.span>
                <m.span
                  initial={{ y: 18 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.54, delay: 0.14, ease: ARCHITECTURAL_EASE }}
                  className="mt-1 inline-flex items-baseline gap-2 italic text-primary"
                >
                  <span>{PROFILE.heroHeadlineAccent}</span>
                </m.span>
              </h1>

              <m.p
                initial={{ y: 14 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: ARCHITECTURAL_EASE }}
                className="max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg"
              >
                {PROFILE.summary}
              </m.p>
            </div>

            {/* Primary & Secondary Pill CTAs */}
            <m.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.48, delay: 0.22, ease: ARCHITECTURAL_EASE }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <m.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#projects", -78);
                }}
                className="cta-glow inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
              >
                <span>View My Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </m.a>

              <m.a
                href={PROFILE.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_TACTILE}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border-strong bg-surface/90 px-6 py-3 font-mono text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <span>Download Resume</span>
                <Download className="h-4 w-4" aria-hidden="true" />
              </m.a>
            </m.div>

            {/* 3-Column Verified Proof Metrics Strip */}
            <StaggerGroup
              staggerDelay={0.07}
              delayChildren={0.2}
              className="grid max-w-xl grid-cols-3 gap-4 pt-3 sm:gap-6"
            >
              {PROFILE.heroProofMetrics.map((metric, idx) => {
                const Icon = METRIC_ICONS[idx] ?? Briefcase;
                return (
                  <StaggerItem
                    key={metric.label}
                    className={`flex items-start gap-2.5 sm:gap-3 ${
                      idx > 0 ? "border-l border-border pl-4 sm:pl-6" : ""
                    }`}
                  >
                    <span
                      className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary-soft text-primary sm:inline-flex"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-heading text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl">
                        {metric.value}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-muted">
                        {metric.label}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>

          {/* Right Portrait Studio Card with Scroll-Linked Depth Parallax */}
          <ScrollDepthParallax
            distance={20}
            className="relative mx-auto w-full max-w-[430px] lg:col-span-5 lg:max-w-none"
          >
            <m.div
              initial={{ y: 16, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.08, ease: ARCHITECTURAL_EASE }}
              className="relative"
            >
            {/* Decorative Luminous Orbital Ring Behind Portrait */}
            <svg
              aria-hidden="true"
              viewBox="0 0 480 480"
              className="animate-orbit-slow pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-75"
              fill="none"
            >
              <ellipse
                cx="240"
                cy="248"
                rx="218"
                ry="88"
                transform="rotate(-22 240 248)"
                stroke="var(--primary)"
                strokeOpacity="0.42"
                strokeWidth="1.25"
              />
              <ellipse
                cx="240"
                cy="252"
                rx="192"
                ry="68"
                transform="rotate(14 240 252)"
                stroke="var(--accent)"
                strokeOpacity="0.28"
                strokeWidth="1"
              />
            </svg>

            {/* Tilted Luminous Studio Spotlight Backing Panel (Matches redesign-hero-section.png) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 -rotate-3 rounded-[34px] border border-primary/35 opacity-85"
              style={{
                background:
                  "radial-gradient(circle at 46% 38%, var(--primary-glow) 0%, var(--primary-soft) 44%, transparent 76%)",
              }}
            />

            {/* Framed Obsidian Glass Portrait Card */}
            <div className="studio-card-featured relative overflow-hidden rounded-[28px]">
              {/* Warm Amber-Gold Studio Backlight Halo Behind Vicky's Portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 34%, var(--primary-glow) 0%, var(--primary-soft) 40%, transparent 74%)",
                }}
              />

              <div className="relative aspect-[4/4.45] w-full overflow-hidden">
                <Image
                  src="/profile.png"
                  alt="Portrait of M. Vicky Mosafan, Full-Stack Web Developer"
                  fill
                  priority
                  quality={82}
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080a0f]/80 via-[#080a0f]/25 to-transparent"
                />
              </div>

              {/* Bottom Identity Strip Inside Portrait Card */}
              <div className="relative z-10 flex items-center justify-between gap-3 border-t border-border bg-surface/95 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold text-foreground">
                    {PROFILE.fullName}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted">
                    {PROFILE.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-primary/35 bg-primary-soft px-3 py-1 font-mono text-[11px] font-semibold text-primary">
                  GPA 3.94
                </span>
              </div>
            </div>

            {/* Floating Studio Badge: Top-Left */}
            <div className="animate-studio-float absolute -top-3 left-3 z-20 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/95 px-3.5 py-1.5 font-mono text-xs font-medium text-foreground shadow-xl sm:-left-4">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span>Software Engineer</span>
            </div>

            {/* Floating Code Badge: Top-Right */}
            <div
              aria-hidden="true"
              className="absolute top-6 -right-2 z-20 hidden h-11 w-12 items-center justify-center rounded-xl border border-primary/35 bg-surface/95 text-primary shadow-xl sm:flex"
            >
              <Code2 className="h-5 w-5" />
            </div>

            {/* Floating Highlight Card: Mid-Right */}
            <a
              href="#workflow"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#workflow", -80);
              }}
              className="absolute top-1/2 -right-3 z-20 hidden max-w-[210px] -translate-y-1/2 items-center gap-2.5 rounded-2xl border border-border-strong bg-surface/95 px-3.5 py-2.5 shadow-2xl hover:border-primary xl:flex"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Cpu className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-heading text-xs font-bold text-foreground">
                  Craftrig MCP
                </span>
                <span className="block truncate font-mono text-[11px] text-muted">
                  Task DAG · 50/50 tests
                  <ArrowRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
                </span>
              </span>
            </a>

            {/* Floating Proof Pill: Bottom-Left above portrait footer (zero overlap with GPA 3.94) */}
            <div className="absolute bottom-[78px] left-3 z-20 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/95 px-3.5 py-1.5 font-mono text-[11px] font-medium text-foreground shadow-xl sm:-left-4">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>BuildFlow ERP · NexaPip</span>
            </div>
            </m.div>
          </ScrollDepthParallax>
        </div>

        {/* Bottom-of-Hero Storytelling "About Me" Section */}
        <div id="about" className="mt-16 scroll-mt-24 pt-10 sm:mt-20 sm:pt-12">
          <DividerReveal className="mb-10 h-px w-full bg-gradient-to-r from-primary/65 via-border-strong to-transparent sm:mb-12" />
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <SectionReveal className="space-y-4 lg:col-span-5">
              <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span>{PROFILE.aboutEyebrow}</span>
              </p>
              <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {PROFILE.aboutHeadline}
              </h2>
              <p className="font-mono text-xs text-muted">
                B.S. in Information Systems, Universitas Muhammadiyah Jember (GPA 3.94/4.00)
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href="#workflow"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#workflow", -80);
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <span>Inspect Craftrig Workflow</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE.socials.craftrig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-4 py-2.5 font-mono text-xs font-semibold text-ink-secondary hover:border-primary hover:text-primary"
                >
                  <span>Craftrig MCP Repo</span>
                </a>
              </div>
            </SectionReveal>

            <StaggerGroup
              staggerDelay={0.08}
              className="space-y-3.5 text-sm leading-relaxed text-ink-secondary sm:text-base lg:col-span-7"
            >
              {PROFILE.aboutParagraphs.map((paragraph) => (
                <StaggerItem key={paragraph}>
                  <p>{paragraph}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
