"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
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
  TrendingUp,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useAudioGate } from "@/components/providers/AudioGateProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

const HeroFieldCanvas = dynamic(
  () => import("@/components/three/HeroFieldCanvas").then((m) => m.HeroFieldCanvas),
  { ssr: false }
);

const KINETIC_DISCIPLINES = [
  {
    phrase: "AI-Augmented Engineering",
    tag: "PRD → CRAFTRIG → VERIFY",
  },
  {
    phrase: "Craftrig MCP Systems",
    tag: "MCP-CRAFTRIG · 45+ TOOLS",
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
  { key: "MCP", label: "Craftrig Rig" },
  { key: "BUILD", label: "Clean Full-Stack" },
  { key: "QA", label: "13-VP Browser Gate" },
] as const;

/**
 * Isolated kinetic discipline headline — keeps the 3.1s rotator from re-rendering
 * the rest of HeroSection (portrait, WebGL backdrop, metrics, marquee).
 */
const HeroKineticSlot = React.memo(function HeroKineticSlot({
  paused,
  inViewRef,
  tagRef,
  pulseContainerRef,
}: {
  paused: boolean;
  inViewRef: React.RefObject<boolean>;
  tagRef: React.RefObject<HTMLSpanElement | null>;
  pulseContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden || !inViewRef.current) return;
      setIdx((prev) => {
        const next = (prev + 1) % KINETIC_DISCIPLINES.length;
        if (tagRef.current) {
          tagRef.current.textContent = `SYS // ${KINETIC_DISCIPLINES[next].tag}`;
        }
        if (pulseContainerRef.current) {
          const children = pulseContainerRef.current.children;
          for (let i = 0; i < children.length; i++) {
            (children[i] as HTMLElement).dataset.active = i === next ? "true" : "false";
          }
        }
        return next;
      });
    }, 3100);

    return () => window.clearInterval(id);
  }, [paused, inViewRef, tagRef, pulseContainerRef]);

  const current = KINETIC_DISCIPLINES[idx];

  return (
    <span className="relative mt-1 block min-h-[1.12em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={current.phrase}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.24, ease: ARCHITECTURAL_EASE }}
          className="inline-flex flex-wrap items-baseline gap-x-2 text-primary"
        >
          <span>{current.phrase}</span>
          <span
            aria-hidden="true"
            className={`inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-primary ${
              paused ? "opacity-40" : ""
            }`}
          />
        </m.span>
      </AnimatePresence>
    </span>
  );
});

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const { replayWelcome } = useAudioGate();

  const [motionPaused, setMotionPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const heroInViewRef = useRef(true);
  const tagRef = useRef<HTMLSpanElement>(null);
  const pulseContainerRef = useRef<HTMLDivElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const portraitRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => {
        heroInViewRef.current = entries.some((e) => e.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Zero-spring direct DOM tilt on hover only (clears transform completely at rest!)
  const handlePortraitEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (motionPaused) return;
    portraitRectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handlePortraitMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (motionPaused || !portraitCardRef.current) return;
    const rect = portraitRectRef.current ?? e.currentTarget.getBoundingClientRect();
    portraitRectRef.current = rect;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    portraitCardRef.current.style.transform = `perspective(1100px) rotateX(${(-py * 8).toFixed(
      2
    )}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
  };

  const handlePortraitLeave = () => {
    portraitRectRef.current = null;
    if (portraitCardRef.current) {
      portraitCardRef.current.style.transform = "";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-x-clip pt-24 pb-8 sm:pt-28 lg:pt-32 lg:pb-12"
    >
      {/* Deferred GPU-Shader Architectural WebGL Backdrop */}
      <HeroFieldCanvas paused={motionPaused} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Architectural Masthead Rule (stable min-height prevents font-swap CLS) */}
        <div className="mb-8 flex min-h-[62px] flex-wrap items-center justify-between gap-3 border-y border-border py-3 font-mono text-[11px] uppercase tracking-[0.16em]">
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
            <span ref={tagRef} className="hidden font-semibold text-primary md:inline">
              SYS // {KINETIC_DISCIPLINES[0].tag}
            </span>
            <button
              type="button"
              onClick={replayWelcome}
              className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 border border-border bg-surface/95 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-secondary hover:border-primary hover:text-primary"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Replay Intro</span>
            </button>
          </div>
        </div>

        {/* Main Asymmetric Architectural Split */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left 7 Columns: Kinetic Typography, Identity & Hairline Proof Ledger */}
          <div className="space-y-7 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border-l-2 border-primary bg-primary-soft/80 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Full-Stack × AI-Assisted Software Engineering</span>
              </span>
              <span className="font-mono text-xs text-muted">
                B.Sc. Info Systems · 3.94 GPA
              </span>
            </div>

            {/* Instant-LCP Kinetic Display Headline */}
            <div className="space-y-1.5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm">
                {PROFILE.fullName} — Architecting Production Web Systems
              </p>

              <h1 className="font-heading text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-[3.55rem] xl:text-[4.15rem]">
                <span className="block">Full-Stack Systems</span>
                <span className="block font-medium text-ink-secondary">forged through</span>

                <HeroKineticSlot
                  paused={motionPaused}
                  inViewRef={heroInViewRef}
                  tagRef={tagRef}
                  pulseContainerRef={pulseContainerRef}
                />
              </h1>
            </div>

            {/* Editorial Narrative */}
            <div className="max-w-2xl space-y-2.5 border-l-2 border-border-strong pl-4 sm:pl-5">
              <p className="text-base leading-relaxed text-ink-secondary sm:text-lg">
                {PROFILE.summary}
              </p>
              <p className="text-sm leading-relaxed text-muted">{PROFILE.subSummary}</p>
            </div>

            {/* Primary Architectural CTA Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollTo("#work", -76)}
                className="group inline-flex min-h-12 cursor-pointer items-center gap-2.5 bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary-hover active:scale-[0.98]"
              >
                <span>Explore 3D Work</span>
                <ArrowDownRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("#stack", 0)}
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 border border-border-strong bg-surface/95 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground hover:border-primary hover:text-primary active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Watch AI Stack Film</span>
              </button>

              <a
                href={PROFILE.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-border bg-surface-elevated/80 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-secondary hover:border-primary hover:text-foreground"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                <span>CV PDF</span>
              </a>
            </div>

            {/* Hairline-Divided Proof Telemetry Ledger */}
            <div className="grid grid-cols-2 border-y border-border bg-surface/92 sm:grid-cols-4">
              {PROFILE.heroProofMetrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`p-4 ${idx % 2 === 1 ? "border-l border-border" : ""} ${
                    idx >= 2 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
                  }`}
                >
                  <div className="font-heading text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {metric.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted">{metric.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Architectural Cut-Corner Portrait & Live Agentic Loop */}
          <div className="lg:col-span-5">
            <div
              onPointerEnter={handlePortraitEnter}
              onPointerMove={handlePortraitMove}
              onPointerLeave={handlePortraitLeave}
              className="relative"
            >
              <div
                ref={portraitCardRef}
                style={{ transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                className="relative border border-border-strong bg-surface/95 p-3 shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 -left-1 h-3.5 w-3.5 border-t-2 border-l-2 border-primary"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 -right-1 h-3.5 w-3.5 border-t-2 border-r-2 border-primary"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 border-primary"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 border-primary"
                />

                <div className="mb-2.5 flex items-center justify-between border-b border-border pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span className="flex items-center gap-2 font-semibold text-foreground">
                    <BrandLogo size={22} className="shrink-0" />
                    ENGINEER.PROFILE // 00
                  </span>
                  <span className="font-bold text-primary">ID: VM-2026</span>
                </div>

                {/* High-Priority LCP Portrait Viewport */}
                <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-surface-elevated">
                  <Image
                    src="/profile.png"
                    alt="Studio portrait of M. Vicky Mosafan, Full-Stack Web Developer and AI-Augmented Software Engineer"
                    fill
                    priority
                    fetchPriority="high"
                    quality={82}
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="object-cover object-top"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090c0f]/95 via-[#090c0f]/60 to-transparent"
                  />

                  <div className="absolute inset-x-2.5 bottom-2.5 border border-white/15 bg-[#090c0f]/95 p-3 text-white">
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

                    <div
                      ref={pulseContainerRef}
                      className="mt-2.5 grid grid-cols-4 gap-1.5"
                    >
                      {PIPELINE_PULSE_STEPS.map((step, i) => (
                        <div
                          key={step.key}
                          data-active={i === 0 ? "true" : "false"}
                          className="border border-white/15 bg-white/[0.04] px-1.5 py-1 text-center font-mono text-[11px] text-zinc-300 transition-colors data-[active=true]:border-[#c8f53c] data-[active=true]:bg-[#c8f53c]/15 data-[active=true]:font-bold data-[active=true]:text-[#c8f53c]"
                        >
                          {step.key}
                        </div>
                      ))}
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
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/80 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile of M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/80 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                  <a
                    href={PROFILE.socials.mql5}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MQL5 algorithmic trading profile of M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/80 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">MQL5</span>
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label="Send email to M. Vicky Mosafan"
                    className="flex min-h-11 items-center justify-center gap-1.5 border border-border bg-surface-elevated/80 px-2 py-2 font-mono text-[11px] font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zero-JS Pure GPU Compositor Capability Ticker with Explicit Pause / Play Toggle (WCAG 2.2.2) */}
      <div className="mt-12 border-y border-border bg-surface/95 sm:mt-16">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
          <button
            type="button"
            onClick={() => setMotionPaused((prev) => !prev)}
            aria-label={
              motionPaused
                ? "Play hero animation and capability ticker"
                : "Pause hero animation and capability ticker"
            }
            data-testid="hero-motion-toggle"
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border border-border-strong bg-surface-elevated px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${motionPaused ? "bg-amber" : "bg-sage"}`}
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

          <div className="marquee-clip relative min-w-0 flex-1">
            <div
              data-paused={motionPaused ? "true" : "false"}
              className="marquee-track items-center"
            >
              {[0, 1].map((dupIdx) => (
                <div
                  key={dupIdx}
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
