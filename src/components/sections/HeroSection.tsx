"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  Cpu,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  TrendingUp,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useAudioGate } from "@/components/providers/AudioGateProvider";
import { HeroFieldCanvas } from "@/components/three/HeroFieldCanvas";

const KINETIC_DISCIPLINES = [
  {
    phrase: "AI-Augmented Engineering",
    tag: "PRD → MCP → VERIFY",
  },
  {
    phrase: "Agentic MCP Systems",
    tag: "43+ CUSTOM MCP TOOLS",
  },
  {
    phrase: "Hybrid & Agentic RAG",
    tag: "91.67% RECALL · 694MS",
  },
  {
    phrase: "Full-Stack Architecture",
    tag: "NEXT.JS 16 · NESTJS · PG",
  },
] as const;

const PIPELINE_PULSE_STEPS = [
  { key: "PRD", label: "Blueprint Spec" },
  { key: "MCP", label: "43+ Agent Tools" },
  { key: "BUILD", label: "Clean Full-Stack" },
  { key: "QA", label: "13-VP Browser Gate" },
] as const;

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const { replayWelcome, unlockAudio } = useAudioGate();

  const [motionPaused, setMotionPaused] = useState(false);
  const [disciplineIdx, setDisciplineIdx] = useState(0);
  const [pulseStepIdx, setPulseStepIdx] = useState(0);

  // Rock-solid JS rAF capability ticker (never stuck by CSS hover or OS animation toggles)
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const tickerFirstGroupRef = useRef<HTMLDivElement>(null);
  const tickerOffsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = motionPaused;
  }, [motionPaused]);

  // Kinetic headline rotator + pipeline pulse (directly governed by explicit Pause/Play toggle)
  useEffect(() => {
    if (motionPaused) return;
    const id = window.setInterval(() => {
      setDisciplineIdx((prev) => (prev + 1) % KINETIC_DISCIPLINES.length);
      setPulseStepIdx((prev) => (prev + 1) % PIPELINE_PULSE_STEPS.length);
    }, 3100);
    return () => window.clearInterval(id);
  }, [motionPaused]);

  // Smooth pixel-accurate rAF marquee loop (directly governed by Pause/Play button)
  useEffect(() => {
    let rafId = 0;
    let lastTs = performance.now();
    const speedPxPerSec = 58;

    const step = (ts: number) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      const track = tickerTrackRef.current;
      const firstGroup = tickerFirstGroupRef.current;
      if (track && firstGroup && !pausedRef.current) {
        const loopWidth = firstGroup.offsetWidth;
        if (loopWidth > 0) {
          tickerOffsetRef.current = (tickerOffsetRef.current + speedPxPerSec * dt) % loopWidth;
          track.style.transform = `translate3d(${-tickerOffsetRef.current}px, 0, 0)`;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Pointer 3D tilt for the architectural studio portrait
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 180, damping: 24 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 180, damping: 24 });

  const handlePortraitMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (motionPaused) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-py * 9);
    tiltY.set(px * 9);
  };

  const handlePortraitLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const currentDiscipline = KINETIC_DISCIPLINES[disciplineIdx];

  return (
    <section
      id="hero"
      className="relative overflow-x-clip pt-24 pb-8 sm:pt-28 lg:pt-32 lg:pb-12"
    >
      {/* Subtle Three.js Procedural Architectural Field Backdrop */}
      <HeroFieldCanvas paused={motionPaused} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Architectural Masthead Rule — signature editorial framing */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ARCHITECTURAL_EASE }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-sage" aria-hidden="true" />
              <span>{PROFILE.availability}</span>
            </span>
            <span className="hidden h-3.5 w-px bg-border sm:inline-block" aria-hidden="true" />
            <span className="hidden items-center gap-1.5 text-muted sm:inline-flex">
              <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-primary font-semibold md:inline">
              SYS // {currentDiscipline.tag}
            </span>
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                replayWelcome();
              }}
              className="inline-flex min-h-9 items-center gap-1.5 border border-border bg-surface/90 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-secondary hover:border-primary hover:text-primary cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Replay Intro</span>
            </button>
          </div>
        </motion.div>

        {/* Main Asymmetric Architectural Split */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left 7 Columns: Kinetic Typography, Identity & Hairline Proof Ledger */}
          <div className="space-y-7 lg:col-span-7">
            {/* Editorial Signature Kicker */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: ARCHITECTURAL_EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 border-l-2 border-primary bg-primary-soft/80 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Full-Stack × AI-Assisted Software Engineering</span>
              </span>
              <span className="font-mono text-xs text-muted">
                B.Sc. Info Systems · 3.94 GPA
              </span>
            </motion.div>

            {/* Kinetic Animated Display Headline */}
            <div className="space-y-1.5">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.58, delay: 0.05, ease: ARCHITECTURAL_EASE }}
                  className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm"
                >
                  {PROFILE.fullName} — Architecting Production Web Systems
                </motion.p>
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.55rem] xl:text-[4.15rem] leading-[1.03]">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.65, delay: 0.1, ease: ARCHITECTURAL_EASE }}
                    className="block"
                  >
                    Full-Stack Systems
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.65, delay: 0.18, ease: ARCHITECTURAL_EASE }}
                    className="block text-ink-secondary font-medium"
                  >
                    forged through
                  </motion.span>
                </span>

                {/* Animated Kinetic Morphing Discipline Slot (crisp single-line mask slide — zero overlap, 100% contrast) */}
                <span className="relative mt-1 block overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currentDiscipline.phrase}
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%" }}
                      transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                      className="inline-flex flex-wrap items-baseline gap-x-2 text-primary"
                    >
                      <span>{currentDiscipline.phrase}</span>
                      <span
                        aria-hidden="true"
                        className={`inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-primary ${
                          motionPaused ? "opacity-40" : ""
                        }`}
                      />
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
            </div>

            {/* Crisp Editorial Narrative with Hairline Left Accent */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: ARCHITECTURAL_EASE }}
              className="max-w-2xl space-y-2.5 border-l-2 border-border-strong pl-4 sm:pl-5"
            >
              <p className="text-base leading-relaxed text-ink-secondary sm:text-lg">
                {PROFILE.summary}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {PROFILE.subSummary}
              </p>
            </motion.div>

            {/* Primary Architectural CTA Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: ARCHITECTURAL_EASE }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                type="button"
                onClick={() => {
                  unlockAudio();
                  scrollTo("#work", -76);
                }}
                className="group inline-flex min-h-12 items-center gap-2.5 bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary-hover active:scale-[0.98] cursor-pointer"
              >
                <span>Explore 3D Work</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  unlockAudio();
                  scrollTo("#stack", -76);
                }}
                className="inline-flex min-h-12 items-center gap-2 border border-border-strong bg-surface/90 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground hover:border-primary hover:text-primary active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Watch AI Stack Film</span>
              </button>

              <a
                href={PROFILE.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-border bg-surface-elevated/70 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-secondary hover:border-primary hover:text-foreground"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                <span>CV PDF</span>
              </a>
            </motion.div>

            {/* Hairline-Divided Proof Telemetry Ledger (replaces generic 4 boxed cards) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36, ease: ARCHITECTURAL_EASE }}
              className="grid grid-cols-2 border-y border-border bg-surface/75 backdrop-blur-sm sm:grid-cols-4"
            >
              {PROFILE.heroProofMetrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`p-4 ${
                    idx % 2 === 1 ? "border-l border-border" : ""
                  } ${idx >= 2 ? "border-t border-border sm:border-t-0 sm:border-l" : ""}`}
                >
                  <div className="font-heading text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {metric.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right 5 Columns: Signature Architectural Cut-Corner Portrait & Live Agentic Loop */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: ARCHITECTURAL_EASE }}
            className="lg:col-span-5"
          >
            <div
              onPointerMove={handlePortraitMove}
              onPointerLeave={handlePortraitLeave}
              style={{ perspective: 1100 }}
              className="relative"
            >
              <motion.div
                style={{
                  rotateX: smoothTiltX,
                  rotateY: smoothTiltY,
                  transformStyle: "preserve-3d",
                }}
                className="relative border border-border-strong bg-surface/92 p-3 shadow-2xl"
              >
                {/* Architectural Corner Registration Marks */}
                <span aria-hidden="true" className="pointer-events-none absolute -top-1 -left-1 h-3.5 w-3.5 border-t-2 border-l-2 border-primary" />
                <span aria-hidden="true" className="pointer-events-none absolute -top-1 -right-1 h-3.5 w-3.5 border-t-2 border-r-2 border-primary" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 border-primary" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 border-primary" />

                {/* Top Frame Spec Header */}
                <div className="mb-2.5 flex items-center justify-between border-b border-border pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    ENGINEER.PROFILE // 00
                  </span>
                  <span className="text-primary font-bold">ID: VM-2026</span>
                </div>

                {/* Portrait Viewport */}
                <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-surface-elevated">
                  <Image
                    src="/profile.png"
                    alt="Studio portrait of M. Vicky Mosafan, Full-Stack Web Developer and AI-Augmented Software Engineer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="object-cover object-top"
                  />

                  {/* Precision Bottom Scrim for WCAG AAA caption contrast */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090c0f]/95 via-[#090c0f]/60 to-transparent"
                  />

                  {/* Live Docked Agentic Loop Strip */}
                  <div className="absolute inset-x-2.5 bottom-2.5 border border-white/15 bg-[#090c0f]/92 p-3 text-white backdrop-blur-md">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                      <div>
                        <p className="font-heading text-sm font-bold tracking-tight text-white">
                          {PROFILE.fullName}
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-200">
                          Full-Stack × AI-Augmented
                        </p>
                      </div>
                      <span className="bg-[#c8f53c] px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-[#090c0f]">
                        GPA 3.94
                      </span>
                    </div>

                    {/* Active 4-Stage Pipeline Indicator */}
                    <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                      {PIPELINE_PULSE_STEPS.map((step, i) => {
                        const isActive = i === pulseStepIdx;
                        return (
                          <div
                            key={step.key}
                            className={`border px-1.5 py-1 text-center font-mono text-[11px] transition-colors ${
                              isActive
                                ? "border-[#c8f53c] bg-[#c8f53c]/15 text-[#c8f53c] font-bold"
                                : "border-white/15 bg-white/[0.04] text-zinc-300"
                            }`}
                          >
                            {step.key}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Direct Social Command Rail */}
                <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                  <a
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile of M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/70 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile of M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/70 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                  <a
                    href={PROFILE.socials.mql5}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MQL5 algorithmic trading profile of M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/70 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">MQL5</span>
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label="Send email to M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/70 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 100% Working JS-Driven Live Capability Ticker with Explicit Pause / Play Toggle (WCAG 2.2.2) */}
      <div className="mt-12 border-y border-border bg-surface/85 backdrop-blur-sm sm:mt-16">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              setMotionPaused((prev) => !prev);
            }}
            aria-label={
              motionPaused
                ? "Play hero animation and capability ticker"
                : "Pause hero animation and capability ticker"
            }
            data-testid="hero-motion-toggle"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-border-strong bg-surface-elevated px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary cursor-pointer"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${
                motionPaused ? "bg-amber" : "bg-sage"
              }`}
            />
            {motionPaused ? (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Play</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pause</span>
              </>
            )}
          </button>

          <span
            aria-live="polite"
            className="hidden shrink-0 border-r border-border pr-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:inline"
          >
            {motionPaused ? "MOTION PAUSED" : "LIVE STREAM"}
          </span>

          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div
              ref={tickerTrackRef}
              data-paused={motionPaused ? "true" : "false"}
              className="flex w-max items-center will-change-transform"
            >
              {[0, 1].map((dupIdx) => (
                <div
                  key={dupIdx}
                  ref={dupIdx === 0 ? tickerFirstGroupRef : undefined}
                  aria-hidden={dupIdx === 1}
                  className="flex shrink-0 items-center gap-6 pr-6"
                >
                  {PROFILE.marqueeCapabilities.map((item) => (
                    <div
                      key={`${dupIdx}-${item}`}
                      className="flex items-center gap-6 whitespace-nowrap"
                    >
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-secondary sm:text-[13px]">
                        {item}
                      </span>
                      <span className="font-mono text-xs text-primary" aria-hidden="true">
                        {"//"}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
