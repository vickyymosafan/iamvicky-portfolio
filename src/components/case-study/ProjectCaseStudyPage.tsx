"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  ExternalLink,
  GitBranch,
  Github,
  Layers,
  Moon,
  Palette,
  ShieldCheck,
  Sun,
  Workflow,
} from "lucide-react";
import type { CaseStudyRecord } from "@/data/caseStudies";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionBackdrop, StudioBackdrop } from "@/components/ui/StudioBackdrop";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { ProjectArchitectureDiagram } from "@/components/motion/ProjectArchitectureDiagram";
import {
  KineticTextReveal,
  ScrollDepthParallax,
  SectionReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import {
  HoverSpotlightCard,
  RippleLink,
} from "@/components/motion/InteractiveMotion";
import { ProjectVisualMockups } from "@/components/case-study/ProjectVisualMockups";

interface ProjectCaseStudyPageProps {
  study: CaseStudyRecord;
  prevStudy: CaseStudyRecord;
  nextStudy: CaseStudyRecord;
}

export function ProjectCaseStudyPage({
  study,
  prevStudy,
  nextStudy,
}: ProjectCaseStudyPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeModuleGroup, setActiveModuleGroup] = useState<string>(
    study.moduleGroups[0] ?? "All"
  );

  const screenTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moduleTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeScreen = study.uiScreens[activeScreenIndex] ?? study.uiScreens[0];
  const activeStep = study.workflowSteps[activeStepIndex] ?? study.workflowSteps[0];

  const visibleModules =
    activeModuleGroup === "All"
      ? study.modules
      : study.modules.filter((m) => m.group === activeModuleGroup);

  const handleRovingTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
    total: number,
    onSelect: (nextIdx: number) => void,
    refs: React.MutableRefObject<(HTMLButtonElement | null)[]>
  ) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % total;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + total) % total;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = total - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      onSelect(nextIdx);
      refs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <ScrollProgressBar />
      <StudioBackdrop />

      {/* ====================================================================
          STICKY CASE STUDY NAVIGATION HEADER + ACCESSIBLE BREADCRUMBS
         ==================================================================== */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-5">
            <Link
              href="/"
              aria-label="M. Vicky Mosafan Home"
              className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl pr-2 font-heading text-sm font-bold tracking-tight text-foreground hover:text-primary"
            >
              <BrandLogo size={32} decorative />
              <span className="hidden sm:inline">Vicky Mosafan</span>
            </Link>

            {/* Modern Web Guidance: Accessible Breadcrumbs (<nav aria-label="Breadcrumbs"><ol>) */}
            <nav aria-label="Breadcrumbs" className="cs-breadcrumb min-w-0">
              <ol className="font-mono text-xs">
                <li>
                  <Link
                    href="/"
                    className="inline-flex min-h-9 items-center text-muted hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#projects"
                    className="inline-flex min-h-9 items-center text-muted hover:text-primary"
                  >
                    Featured Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/projects/${study.slug}`}
                    aria-current="page"
                    className="inline-flex min-h-9 items-center font-semibold text-foreground"
                  >
                    {study.shortTitle}
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface text-foreground hover:border-primary hover:text-primary"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-primary" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 text-primary" aria-hidden="true" />
              )}
            </button>

            <RippleLink
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={study.repoLabel}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Repository</span>
            </RippleLink>
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        {/* ====================================================================
            SECTION 1: STORYTELLING HERO & METRICS
           ==================================================================== */}
        <section className="relative overflow-x-clip py-12 sm:py-20">
          <SectionBackdrop variant="hero" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-5 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                  <span className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-border-strong bg-surface/90 px-3.5 py-1.5 font-semibold text-foreground sm:rounded-full">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-primary">CASE STUDY {study.index}</span>
                    <span className="text-muted">/</span>
                    <span className="break-words">{study.category}</span>
                  </span>
                  <span className="max-w-full rounded-2xl border border-border bg-surface-elevated px-3 py-1.5 text-muted sm:rounded-full">
                    {study.year} · {study.scopeBadge}
                  </span>
                </div>

                <h1 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[54px]">
                  <KineticTextReveal text={study.title} trigger="mount" />
                </h1>

                <p className="font-mono text-xs font-semibold tracking-wide text-primary sm:text-sm">
                  {study.subtitle}
                </p>

                <p className="max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                  {study.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#ui-ux-showcase"
                    className="cta-glow inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover sm:text-sm"
                  >
                    <Palette className="h-4 w-4" aria-hidden="true" />
                    <span>Explore Visual UI/UX</span>
                  </a>
                  <a
                    href="#workflow"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-surface/90 px-5 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary sm:text-sm"
                  >
                    <Workflow className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>System Flow &amp; Modules</span>
                  </a>
                  <RippleLink
                    href={study.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary sm:text-sm"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>{study.repoLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </RippleLink>
                </div>
              </div>

              {/* Framed Hero Sculpture */}
              <ScrollDepthParallax distance={18} className="lg:col-span-5">
                <div className="studio-card-featured overflow-hidden rounded-2xl p-2.5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-[#0e1117]">
                    <Image
                      src={study.heroImage}
                      alt={`Hero visual for ${study.title}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 92vw, 480px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 pt-3 pb-1 font-mono text-xs">
                    <span className="text-muted">Role</span>
                    <span className="font-semibold text-foreground">{study.role}</span>
                  </div>
                </div>
              </ScrollDepthParallax>
            </div>

            {/* 4 Key Proof Stats */}
            <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <HoverSpotlightCard className="studio-card h-full rounded-2xl p-5">
                    <p className="relative z-10 font-heading text-2xl font-bold text-primary sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="relative z-10 mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                      {stat.label}
                    </p>
                    <p className="relative z-10 mt-1.5 text-xs leading-relaxed text-muted">
                      {stat.detail}
                    </p>
                  </HoverSpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* ====================================================================
            SECTION 2: PRODUCT & ENGINEERING STORYTELLING
           ==================================================================== */}
        <section id="story" className="relative overflow-x-clip border-t border-border py-16 sm:py-24">
          <SectionBackdrop variant="work" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-5 sm:px-8">
            <SectionReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>01 · Product &amp; Engineering Narrative</span>
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why It Was Built &amp; How the Craft Holds Up
              </h2>
              <p className="text-base leading-relaxed text-ink-secondary">{study.storyIntro}</p>
            </SectionReveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {study.storyChapters.map((chapter) => (
                <HoverSpotlightCard
                  key={chapter.index}
                  className="studio-card flex flex-col justify-between gap-5 rounded-2xl p-6"
                >
                  <div className="relative z-10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 font-mono text-xs">
                      <span className="font-bold text-primary">CHAPTER {chapter.index}</span>
                      <span className="break-words text-muted">{chapter.eyebrow}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
                      {chapter.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-secondary">{chapter.body}</p>
                  </div>

                  <div className="relative z-10 rounded-xl border border-border bg-surface-elevated/80 p-3.5">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                      {chapter.calloutLabel}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground">
                      {chapter.calloutValue}
                    </p>
                  </div>
                </HoverSpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 3: VISUAL UI/UX SHOWCASE & DESIGN SYSTEM SPECIMEN
           ==================================================================== */}
        <section
          id="ui-ux-showcase"
          className="relative scroll-mt-24 overflow-x-clip border-t border-border py-16 sm:py-24"
        >
          <SectionBackdrop variant="workflow" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-5 sm:px-8">
            <SectionReveal className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <Palette className="h-4 w-4" aria-hidden="true" />
                  <span>02 · Visual UI/UX Showcase &amp; Design System</span>
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Interactive Screens &amp; Authentic Visual Contract
                </h2>
                <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                  Explore real interface mockups, verified product assets, and live component simulations styled directly from {study.shortTitle}&apos;s production design system.
                </p>
              </div>
              <span className="inline-flex w-fit items-center rounded-full border border-border-strong bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
                {study.uiScreens.length} Interactive Views
              </span>
            </SectionReveal>

            {/* Modern Web Guidance Compliant Single-Row Scrollable Tabs (No aria-controls, Border Underline) */}
            <div className="studio-card overflow-hidden rounded-2xl">
              <div className="border-b border-border bg-surface/90 px-3 pt-2 sm:px-5">
                <div
                  role="tablist"
                  aria-label={`${study.shortTitle} visual UI/UX screens`}
                  className="cs-tablist-scroll"
                >
                  {study.uiScreens.map((screen, idx) => {
                    const selected = idx === activeScreenIndex;
                    return (
                      <button
                        key={screen.id}
                        ref={(el) => {
                          screenTabRefs.current[idx] = el;
                        }}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActiveScreenIndex(idx)}
                        onKeyDown={(e) =>
                          handleRovingTabKeyDown(
                            e,
                            idx,
                            study.uiScreens.length,
                            setActiveScreenIndex,
                            screenTabRefs
                          )
                        }
                        className={`cs-tab min-h-11 cursor-pointer px-4 py-2.5 font-mono text-xs font-semibold transition-colors ${
                          selected
                            ? "text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        <span className="mr-1.5 text-primary">0{idx + 1}</span>
                        <span>{screen.tabLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div role="tabpanel" className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div className="space-y-1">
                    <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      {activeScreen.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {activeScreen.summary}
                    </p>
                  </div>
                  <span className="max-w-full break-words rounded-xl border border-border-strong bg-surface-elevated px-3 py-1 font-mono text-[11px] font-semibold text-primary sm:w-fit sm:shrink-0 sm:rounded-full">
                    {activeScreen.routeBadge}
                  </span>
                </div>

                {/* Live Interactive UI/UX Screen Preview */}
                <ProjectVisualMockups screenId={activeScreen.id} />

                {/* UX Rationale Callouts */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {activeScreen.uxHighlights.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-elevated/60 p-3.5 text-xs leading-relaxed text-ink-secondary"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Design System Specimen Card */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Color Tokens */}
              <div className="studio-card space-y-5 rounded-2xl p-6 lg:col-span-7">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Design System Tokens
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {study.designSystem.themeLabel}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    {study.designSystem.philosophy}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {study.designSystem.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="flex items-center gap-3 rounded-xl border border-border bg-surface/90 p-3"
                    >
                      <div
                        aria-hidden="true"
                        className="h-11 w-11 shrink-0 rounded-lg border border-border-strong shadow-xs"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold text-foreground">{swatch.name}</p>
                          <span className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">
                            {swatch.hex}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] leading-snug text-muted">{swatch.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & UX Rules */}
              <div className="studio-card flex flex-col justify-between gap-5 rounded-2xl p-6 lg:col-span-5">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Typography &amp; Spatial Rules
                  </span>
                  <div className="space-y-3">
                    {study.designSystem.typography.map((tp) => (
                      <div
                        key={tp.role}
                        className="rounded-xl border border-border bg-surface-elevated/70 p-3.5"
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                          <span className="font-bold text-primary">{tp.role}</span>
                          <span className="text-foreground">{tp.family}</span>
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-foreground">{tp.sample}</p>
                        <p className="mt-1 text-xs text-muted">{tp.usage}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 rounded-xl border border-border bg-surface/80 p-3.5 text-xs text-ink-secondary">
                    <p>
                      <strong className="font-mono text-foreground">Geometry:</strong>{" "}
                      {study.designSystem.geometryRule}
                    </p>
                    <p>
                      <strong className="font-mono text-foreground">Layout Density:</strong>{" "}
                      {study.designSystem.densityRule}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {study.designSystem.uxPrinciples.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2 text-xs leading-relaxed text-ink-secondary"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 4: END-TO-END USER & SYSTEM WORKFLOW
           ==================================================================== */}
        <section
          id="workflow"
          className="relative scroll-mt-24 overflow-x-clip border-t border-border py-16 sm:py-24"
        >
          <SectionBackdrop variant="experience" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-5 sm:px-8">
            <SectionReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Workflow className="h-4 w-4" aria-hidden="true" />
                <span>03 · Detailed User &amp; System Workflow</span>
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                {study.workflowTitle}
              </h2>
              <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                {study.workflowSubtitle}
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Interactive Stepper Column */}
              <div className="space-y-2.5 lg:col-span-5">
                {study.workflowSteps.map((wf, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  return (
                    <button
                      key={wf.step}
                      type="button"
                      data-workflow-step={wf.step}
                      onClick={() => setActiveStepIndex(idx)}
                      aria-current={isCurrent ? "step" : undefined}
                      className={`flex min-h-14 w-full cursor-pointer items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                        isCurrent
                          ? "studio-card-featured"
                          : "studio-card hover:border-primary/60"
                      }`}
                    >
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-surface-elevated text-primary"
                        }`}
                      >
                        {wf.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                          <span className="font-bold text-primary">{wf.phase}</span>
                          <span className="max-w-full [overflow-wrap:anywhere] text-muted">{wf.actor}</span>
                        </div>
                        <p className="mt-1 font-heading text-sm font-bold text-foreground sm:text-base">
                          {wf.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Deep-Dive Detail Card */}
              <div className="lg:col-span-7">
                <div className="studio-card-featured flex h-full flex-col justify-between gap-6 rounded-2xl p-6 sm:p-8">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                          STEP {activeStep.step} · {activeStep.phase}
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-foreground">
                          {activeStep.title}
                        </h3>
                      </div>
                      <span className="max-w-full [overflow-wrap:anywhere] rounded-xl border border-border-strong bg-surface px-3.5 py-1.5 font-mono text-xs font-semibold text-foreground sm:rounded-full">
                        Actor: {activeStep.actor}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl border border-border bg-surface/90 p-4">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                          1. What the User / Operator Does
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                          {activeStep.userAction}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-surface/90 p-4">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                          2. What the System Executes Under the Hood
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                          {activeStep.systemAction}
                        </p>
                      </div>

                      <div className="rounded-xl border border-primary/35 bg-primary-soft/60 p-4">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                          3. Enforced Engineering Guarantee
                        </p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                          {activeStep.guarantee}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step Prev / Next Navigation */}
                  <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStepIndex(
                          (activeStepIndex - 1 + study.workflowSteps.length) %
                            study.workflowSteps.length
                        )
                      }
                      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Previous Step</span>
                    </button>
                    <span className="font-mono text-xs text-muted">
                      {activeStepIndex + 1} / {study.workflowSteps.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStepIndex(
                          (activeStepIndex + 1) % study.workflowSteps.length
                        )
                      }
                      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 5: DETAILED MODULES & FUNCTIONAL CAPABILITIES
           ==================================================================== */}
        <section
          id="modules"
          className="relative scroll-mt-24 overflow-x-clip border-t border-border py-16 sm:py-24"
        >
          <SectionBackdrop variant="stack" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-5 sm:px-8">
            <SectionReveal className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  <span>04 · Functional Modules &amp; Capabilities</span>
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Every Module, Role &amp; Feature Inside {study.shortTitle}
                </h2>
                <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                  Filter by domain boundary to inspect the exact functional modules and technical responsibilities shipped in the repository.
                </p>
              </div>
              <span className="w-fit rounded-full border border-border-strong bg-surface px-3.5 py-1.5 font-mono text-xs font-semibold text-primary">
                Showing {visibleModules.length} of {study.modules.length} Module Groups
              </span>
            </SectionReveal>

            {/* Filter Tablist (Single Row Scrollable + Non-Color Border Underline) */}
            <div className="border-b border-border">
              <div
                role="tablist"
                aria-label={`Filter ${study.shortTitle} functional modules`}
                className="cs-tablist-scroll"
              >
                {study.moduleGroups.map((group, idx) => {
                  const selected = group === activeModuleGroup;
                  return (
                    <button
                      key={group}
                      ref={(el) => {
                        moduleTabRefs.current[idx] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveModuleGroup(group)}
                      onKeyDown={(e) =>
                        handleRovingTabKeyDown(
                          e,
                          idx,
                          study.moduleGroups.length,
                          (nextIdx) => setActiveModuleGroup(study.moduleGroups[nextIdx]),
                          moduleTabRefs
                        )
                      }
                      className={`cs-tab min-h-11 cursor-pointer px-4 py-2.5 font-mono text-xs font-semibold ${
                        selected ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {group}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {visibleModules.map((mod) => (
                <HoverSpotlightCard
                  key={mod.code}
                  className="studio-card flex flex-col justify-between gap-4 rounded-2xl p-6"
                >
                  <div className="relative z-10 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="rounded-md border border-primary/40 bg-primary-soft px-2.5 py-0.5 font-bold text-primary">
                        {mod.code}
                      </span>
                      <span className="text-muted">{mod.group}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{mod.name}</h3>
                    <p className="text-sm leading-relaxed text-ink-secondary">{mod.summary}</p>
                  </div>

                  <ul className="relative z-10 space-y-2 border-t border-border pt-4">
                    {mod.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-secondary"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </HoverSpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 6: ARCHITECTURE, INVARIANTS & TECH STACK
           ==================================================================== */}
        <section
          id="architecture"
          className="relative scroll-mt-24 overflow-x-clip border-t border-border py-16 sm:py-24"
        >
          <SectionBackdrop variant="archive" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-5 sm:px-8">
            <SectionReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>05 · Architecture &amp; Non-Negotiable Invariants</span>
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                System Topology, Data Integrity &amp; Security Controls
              </h2>
            </SectionReveal>

            <ProjectArchitectureDiagram nodes={study.architecture} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {study.invariants.map((inv) => (
                <div
                  key={inv.title}
                  className="studio-card space-y-2 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-primary">
                      {inv.category}
                    </span>
                    <GitBranch className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {inv.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-secondary">{inv.detail}</p>
                </div>
              ))}
            </div>

            <div className="studio-card space-y-4 rounded-2xl p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                <Cpu className="h-4 w-4" aria-hidden="true" />
                <span>Verified Production Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-strong bg-surface-elevated px-3.5 py-1.5 font-mono text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 7: PREVIOUS / NEXT FLAGSHIP CASE STUDY FOOTER
           ==================================================================== */}
        <footer className="relative border-t border-border py-14 sm:py-20">
          <SectionBackdrop variant="contact" />
          <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  Continue Exploring Flagship Systems
                </p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">
                  Next Deep-Dive Case Studies
                </h2>
              </div>
              <Link
                href="/#projects"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Featured Projects</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Link
                href={`/projects/${prevStudy.slug}`}
                className="studio-card group flex items-center justify-between gap-4 rounded-2xl p-5"
              >
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    <ArrowLeft className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span>Previous Case Study · {prevStudy.index}</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-foreground group-hover:text-primary">
                    {prevStudy.title}
                  </p>
                  <p className="font-mono text-xs text-muted">{prevStudy.category}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              </Link>

              <Link
                href={`/projects/${nextStudy.slug}`}
                className="studio-card group flex items-center justify-between gap-4 rounded-2xl p-5"
              >
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    <span>Next Case Study · {nextStudy.index}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  </span>
                  <p className="font-heading text-lg font-bold text-foreground group-hover:text-primary">
                    {nextStudy.title}
                  </p>
                  <p className="font-mono text-xs text-muted">{nextStudy.category}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
