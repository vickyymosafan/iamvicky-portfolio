"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileDown,
  FileText,
  GraduationCap,
  Layers,
  Server,
  ShieldCheck,
  User,
  Users,
  Zap,
} from "lucide-react";
import {
  CERTIFICATIONS,
  EDUCATION,
  LEADERSHIP,
  PROFILE,
  SKILL_GROUPS,
} from "@/data/portfolio";
import { VO_BEATS } from "@/data/voBeats";
import { scheduleWhenScrollIdle } from "@/lib/scrollIdle";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";
import { SectionBackdrop } from "@/components/ui/StudioBackdrop";

const BangMotionStackExplainer = dynamic(
  () =>
    import("@/components/sections/BangMotionStackExplainer").then(
      (mod) => mod.BangMotionStackExplainer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border-strong bg-[#080a0f] font-mono text-xs uppercase tracking-[0.16em] text-primary">
        Loading Interactive Engineering Walkthrough...
      </div>
    ),
  }
);

const SKILL_FILTERS = [
  "All",
  "AI & Agents",
  "Frontend",
  "Backend",
  "Database & Cache",
  "Languages",
  "Testing & DevOps",
] as const;

const SKILL_ICONS: Record<string, typeof Cpu> = {
  "ai-augmented": Cpu,
  frontend: Layers,
  backend: Server,
  database: Database,
  languages: Code2,
  "testing-devops": ShieldCheck,
};

export function StackAndCredentialsSection() {
  const { scrollTo } = useSmoothScroll();
  const [explainerReady, setExplainerReady] = useState(false);
  const [skillFilter, setSkillFilter] = useState<(typeof SKILL_FILTERS)[number]>("All");

  useEffect(() => {
    if (explainerReady) return;
    return scheduleWhenScrollIdle(() => {
      setExplainerReady(true);
    }, 900);
  }, [explainerReady]);

  const visibleSkillGroups = useMemo(() => {
    if (skillFilter === "All") return SKILL_GROUPS;
    return SKILL_GROUPS.filter((g) => g.filterKey === skillFilter);
  }, [skillFilter]);

  return (
    <section
      aria-label="Engineering Process Film, Technical Stack, Education and Certifications"
      className="relative border-t border-border"
    >
      {/* ====================================================================
          SECTION 04 — INTERACTIVE PROCESS WALKTHROUGH FILM (redesign-section-4.png)
         ==================================================================== */}
      <div id="film" className="cv-auto-section relative scroll-mt-20 py-20 sm:py-28">
        <SectionBackdrop variant="film" />

        {/* Delicate Left Vertical Tech Showcase Rail (Matches redesign-section-4.png) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-6 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 2xl:flex"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-8 w-px bg-gradient-to-b from-primary/60 to-transparent" />
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
            Tech Showcase
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-5 sm:px-8">
          {/* Header Row */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>04 / Engineering Process Film</span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
                How AI-Augmented{" "}
                <span className="text-primary">Software Engineering</span> Works
              </h2>

              <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                From structured PRDs and Craftrig MCP governance to automated Playwright
                audits and edge deployment, watch the 6-chapter interactive walkthrough
                with synchronized voice-over.
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("#stack", -80)}
              className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground hover:border-primary hover:text-primary"
            >
              <span>Skip to Stack &amp; Credentials</span>
              <ArrowDown className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            </button>
          </div>

          {/* 12-Col Film Theater + Core Tech Snapshot Sidebar (Exact layout of redesign-section-4.png) */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Interactive Film Player with Luminous Cinema Viewfinder Corner Brackets */}
            <div className="relative rounded-3xl border border-primary/65 bg-[#080a0f] p-3 shadow-[0_0_42px_-12px_var(--primary-glow)] sm:p-4 lg:col-span-9">
              {/* Viewfinder Corner Reticle Brackets (Matches redesign-section-4.png) */}
              <span aria-hidden="true" className="pointer-events-none absolute top-2 left-2 h-4 w-4 rounded-tl-xl border-t-2 border-l-2 border-primary/80" />
              <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 h-4 w-4 rounded-tr-xl border-t-2 border-r-2 border-primary/80" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 rounded-bl-xl border-b-2 border-l-2 border-primary/80" />
              <span aria-hidden="true" className="pointer-events-none absolute right-2 bottom-2 h-4 w-4 rounded-br-xl border-r-2 border-b-2 border-primary/80" />

              {explainerReady ? (
                <BangMotionStackExplainer />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#0b0e15] font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  Preparing 6-Chapter Walkthrough...
                </div>
              )}
            </div>

            {/* Right Sidebar: Core Tech Snapshot */}
            <aside className="studio-card flex flex-col justify-between gap-6 rounded-3xl p-6 lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h3 className="font-heading text-base font-bold text-foreground">
                    My Core Stack
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PROFILE.coreStackPills.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface-elevated px-3 py-1 font-mono text-xs font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-border pt-5">
                <div className="flex items-start gap-2.5">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-ink-secondary">
                    Classic software fundamentals paired with AI-augmented workflows, backed
                    by automated tests and Playwright QA.
                  </p>
                </div>

                <a
                  href="#stack"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#stack", -80);
                  }}
                  className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated px-4 py-2 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <span>Full Stack Matrix</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>

          {/* Collapsible English Voice-Over Script Reference */}
          <details className="studio-card rounded-2xl p-4 text-xs">
            <summary className="flex min-h-10 cursor-pointer items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary">
              <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Read Full English Voice-Over Script (6 Chapters)</span>
            </summary>
            <ol className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-4 md:grid-cols-2">
              {VO_BEATS.map((beat) => (
                <li
                  key={beat.id}
                  className="rounded-xl border border-border bg-surface-elevated/55 p-3.5 leading-relaxed text-ink-secondary"
                >
                  <div className="font-mono text-[11px] font-bold uppercase text-primary">
                    {beat.label}
                  </div>
                  <p className="mt-1.5 text-xs text-foreground">{beat.text}</p>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>

      {/* ====================================================================
          SECTION 05 — COMPLETE TECHNICAL STACK & BIO (redesign-section-4.1.png)
         ==================================================================== */}
      <div
        id="stack"
        className="cv-auto-section relative scroll-mt-20 border-t border-border py-20 sm:py-28"
      >
        <SectionBackdrop variant="stack" />

        <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-5 sm:px-8">
          {/* Top Hero Row */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <m.div
              initial={{ y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
              className="space-y-5 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>05 / Stack &amp; Credentials</span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
                Complete Technical{" "}
                <span className="text-primary">Stack &amp; Professional Bio.</span>
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                A clear overview of the technologies, academic foundation, verified Google
                certifications, and community leadership behind my work.
              </p>

              <a
                href={PROFILE.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <FileDown className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Download Full Resume (PDF)</span>
              </a>
            </m.div>

            {/* Borderless Seamlessly-Blended Workstation Visual (Matches top-right of redesign-section-4.1.png) */}
            <div className="relative mx-auto w-full max-w-[480px] lg:col-span-5 lg:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 rounded-full opacity-75"
                style={{
                  background:
                    "radial-gradient(circle at 50% 52%, var(--primary-glow) 0%, var(--accent-soft) 45%, transparent 74%)",
                }}
              />
              <div className="studio-visual-blend relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/redesign/hero-stack-laptop.jpg"
                  alt="VM workstation displaying core technical stack badges"
                  fill
                  sizes="(max-width: 1024px) 92vw, 500px"
                  className="animate-studio-float scale-[1.06] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Bento Split: Filterable Tech Stack (9 cols) + About Me Bio Card (3 cols) */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Left Filterable Tech Stack Panel */}
            <div className="studio-card space-y-6 rounded-3xl p-5 sm:p-7 lg:col-span-9">
              <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Cpu className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    My Tech Stack
                  </h3>
                </div>

                <div
                  className="flex flex-wrap items-center gap-1.5"
                  role="tablist"
                  aria-label="Filter technical skills by area"
                >
                  {SKILL_FILTERS.map((cat) => {
                    const active = skillFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSkillFilter(cat)}
                        className={`min-h-9 cursor-pointer rounded-full px-3 py-1 font-mono text-xs font-medium ${
                          active
                            ? "bg-primary font-semibold text-primary-foreground"
                            : "border border-border bg-surface-elevated text-muted hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleSkillGroups.map((group) => {
                  const Icon = SKILL_ICONS[group.id] ?? Code2;
                  return (
                    <div
                      key={group.id}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface-elevated/45 p-5 hover:border-primary/45"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary-soft text-primary">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                            {group.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-heading text-base font-bold text-foreground">
                            {group.label}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {group.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] font-medium text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right About Me Bio Card (Matches right sidebar of redesign-section-4.1.png) */}
            <aside className="studio-card-featured flex flex-col justify-between gap-6 rounded-3xl p-6 lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <User className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground">About Me</h3>
                </div>

                <p className="text-sm leading-relaxed text-ink-secondary">
                  {PROFILE.aboutShortBio}
                </p>

                <div className="grid grid-cols-3 gap-2 border-y border-border py-4 text-center">
                  <div>
                    <div className="font-heading text-xl font-bold text-foreground tabular-nums">
                      10+
                    </div>
                    <div className="font-mono text-[11px] text-muted">Systems</div>
                  </div>
                  <div className="border-x border-border">
                    <div className="font-heading text-xl font-bold text-primary tabular-nums">
                      3.94
                    </div>
                    <div className="font-mono text-[11px] text-muted">GPA</div>
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-accent tabular-nums">
                      8
                    </div>
                    <div className="font-mono text-[11px] text-muted">Certs</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact", -80);
                  }}
                  className="cta-glow inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <p className="text-center font-heading text-xs italic text-muted">
                  &ldquo;{PROFILE.motto}&rdquo;
                </p>
              </div>
            </aside>
          </div>

          {/* Career Highlights Glass Telemetry Bar (Matches bottom bar of redesign-section-4.1.png) */}
          <div className="studio-card-featured relative overflow-hidden rounded-2xl px-4 py-4 sm:px-6">
            <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-heading text-sm font-bold text-foreground">
                  Career Highlights
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-8">
                <div className="flex min-w-0 flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2.5">
                  <span className="font-heading text-lg font-bold text-primary tabular-nums sm:text-xl">
                    10+
                  </span>
                  <span className="font-mono text-[11px] leading-tight text-muted">
                    Shipped Systems
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-start gap-0.5 border-l border-border pl-3 sm:flex-row sm:items-center sm:gap-2.5 sm:pl-8">
                  <span className="font-heading text-lg font-bold text-foreground tabular-nums sm:text-xl">
                    91.67%
                  </span>
                  <span className="font-mono text-[11px] leading-tight text-muted">
                    RAG Recall
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-start gap-0.5 border-l border-border pl-3 sm:flex-row sm:items-center sm:gap-2.5 sm:pl-8">
                  <span className="font-heading text-lg font-bold text-accent tabular-nums sm:text-xl">
                    50/50
                  </span>
                  <span className="font-mono text-[11px] leading-tight text-muted">
                    Craftrig Tests
                  </span>
                </div>
              </div>

              {/* Luminous Telemetry Node Wave SVG (Matches bottom-right of redesign-section-4.1.png) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 36"
                className="hidden h-9 w-48 shrink-0 lg:block"
                fill="none"
              >
                <defs>
                  <linearGradient id="ch-wave-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="var(--orb-highlight)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 4 28 C 44 26, 56 12, 92 14 C 128 16, 146 28, 178 24 C 196 22, 206 12, 216 6"
                  stroke="url(#ch-wave-grad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="92" cy="14" r="4.5" fill="var(--bg)" stroke="var(--primary)" strokeWidth="2" />
                <circle cx="178" cy="24" r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* ================================================================
              EDUCATION & GOOGLE AI / CLOUD CERTIFICATIONS
             ================================================================ */}
          <div
            id="education-credentials"
            className="scroll-mt-24 border-t border-border pt-14"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Education Column */}
              <div className="space-y-5 lg:col-span-5">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    Education
                  </h3>
                </div>

                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div
                      key={edu.institution}
                      className="studio-card space-y-2 rounded-2xl p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-muted">{edu.period}</span>
                        <span className="rounded-full bg-primary-soft px-3 py-0.5 font-mono text-xs font-semibold text-primary">
                          {edu.highlight}
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-foreground sm:text-lg">
                        {edu.institution}
                      </h4>
                      <p className="text-sm font-medium text-ink-secondary">{edu.degree}</p>
                      <p className="text-xs leading-relaxed text-muted">{edu.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Column */}
              <div className="space-y-5 lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                      Google AI &amp; Cloud Certifications
                    </h3>
                  </div>

                  <a
                    href={PROFILE.socials.googleSkills}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-1.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                  >
                    <span>Verify All Badges</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div
                      key={cert}
                      className="studio-card flex flex-col justify-between rounded-2xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-primary">
                          0{i + 1}
                        </span>
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase text-accent">
                          Google Cloud Skills
                        </span>
                      </div>
                      <p className="mt-3 font-heading text-sm font-bold leading-snug text-foreground">
                        {cert}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="studio-card rounded-2xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
                    <span>Languages: Indonesian (Native) · English (Technical)</span>
                    <span className="font-semibold text-primary">8 Verified Badges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              LEADERSHIP, SPEAKING & COMMUNITY IMPACT
             ================================================================ */}
          <div className="space-y-6 border-t border-border pt-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  Leadership, Speaking &amp; Community Impact
                </h3>
              </div>
              <span className="font-mono text-xs text-muted">
                HIMAFORSI UMJ · Information Systems Diklat · RTIK Jember
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {LEADERSHIP.map((item) => (
                <div
                  key={item.role}
                  className="studio-card flex h-full flex-col justify-between rounded-2xl p-5"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-semibold text-primary">
                      {item.period}
                    </span>
                    <h4 className="font-heading text-base font-bold leading-snug text-foreground">
                      {item.role}
                    </h4>
                    <p className="font-mono text-xs text-muted">{item.organization}</p>
                    <p className="pt-1 text-xs leading-relaxed text-ink-secondary">
                      {item.summary}
                    </p>
                  </div>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-10 items-center gap-1.5 font-mono text-xs font-semibold text-primary hover:underline"
                    >
                      <span>View @himaforsi_umjember</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
