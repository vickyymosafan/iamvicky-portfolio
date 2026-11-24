"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Award, ExternalLink, FileText, GraduationCap, Users } from "lucide-react";
import {
  CERTIFICATIONS,
  EDUCATION,
  LEADERSHIP,
  PROFILE,
  SKILL_GROUPS,
} from "@/data/portfolio";
import { VO_BEATS } from "@/data/voBeats";

// Next.js 16 dynamic code-splitting: keeps Three.js Portal & GSAP Explainer out of initial Hero bundle!
const WorldPortalTransition = dynamic(
  () =>
    import("@/components/motion/WorldPortalTransition").then(
      (m) => m.WorldPortalTransition
    ),
  {
    ssr: false,
    loading: () => (
      <div
        id="stack"
        className="flex h-screen w-full items-center justify-center bg-[#070a0d] font-mono text-xs uppercase tracking-[0.18em] text-[#c8f53c]"
      >
        Initializing Outer World Theater...
      </div>
    ),
  }
);

const BangMotionStackExplainer = dynamic(
  () =>
    import("@/components/sections/BangMotionStackExplainer").then(
      (m) => m.BangMotionStackExplainer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto aspect-video w-full max-w-5xl border border-border-strong bg-[#080b0f]" />
    ),
  }
);

/**
 * Section 04 — Seamless Portal-to-Cinema Theater + Calm Static Credentials Zone:
 * - Top: WorldPortalTransition directly houses & expands smoothly into the 16:9 Bang-Motion Film
 *   (zero hard page breaks or seams!).
 * - Below: Static Reference Stack Breakdown + Voice Over Transcript + Education & Google AI Certifications
 *   + Leadership (STRICTLY zero scroll-reveal animations downwards + CSS content-visibility: auto!).
 */
export function StackAndCredentialsSection() {
  // Warm up the code-split Bang-Motion GSAP explainer chunk during idle time after Hero LCP paints
  // so emerging through the 03->04 portal renders instantaneously with 0ms loading stall.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void import("@/components/sections/BangMotionStackExplainer");
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section aria-label="Technical Stack, AI-Augmented Film, Education and Certifications" className="relative bg-background">
      {/* Seamless 03 -> 04 Inner-to-Outer Portal Expanding Directly Into Bang-Motion Cinema */}
      <WorldPortalTransition
        renderTheater={(portalReady) => (
          <BangMotionStackExplainer portalReady={portalReady} />
        )}
      />

      {/* Calm Static Editorial Zone Below Cinema (Zero Animations, content-visibility: auto for speed!) */}
      <div className="mx-auto max-w-7xl space-y-16 px-5 pt-10 pb-20 sm:px-8 sm:pb-24">
        {/* Accessible American Female Voice-Over Script Reference */}
        <details className="border border-border bg-surface p-4 text-xs">
          <summary className="flex min-h-10 cursor-pointer items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary">
            <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Read Full English Voice-Over Script (US Female · 6 Chapters)</span>
          </summary>
          <ol className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-4 md:grid-cols-2">
            {VO_BEATS.map((beat) => (
              <li
                key={beat.id}
                className="border border-border bg-surface-elevated/45 p-3.5 leading-relaxed text-ink-secondary"
              >
                <div className="font-mono text-[11px] font-bold uppercase text-primary">
                  {beat.label}
                </div>
                <p className="mt-1.5 text-xs text-foreground">{beat.text}</p>
              </li>
            ))}
          </ol>
        </details>

        {/* Part B: Static Reference Technical Matrix */}
        <div className="cv-auto-section border-t border-border pt-14">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                STATIC REFERENCE INDEX
              </p>
              <h3 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Complete Technical Stack Breakdown
              </h3>
            </div>
            <p className="font-mono text-xs text-muted">
              Verified directly from shipped systems &amp; CV
            </p>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-border md:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.id}
                className="flex flex-col justify-between border-r border-b border-border bg-surface/80 p-5 sm:p-6"
              >
                <div>
                  <h4 className="font-heading text-base font-bold text-foreground sm:text-lg">
                    {group.label}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {group.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[11px] font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part C: Education & Google AI & Cloud Certifications (Auto-Scroll Target — ZERO Animations below) */}
        <div
          id="education-credentials"
          className="cv-auto-section scroll-mt-24 border-t border-border pt-14"
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
                    className="space-y-2 border border-border bg-surface p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-muted">{edu.period}</span>
                      <span className="bg-primary-soft px-2.5 py-1 font-mono text-xs font-semibold text-primary">
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

            {/* Google AI & Cloud Certifications */}
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
                  className="inline-flex min-h-10 items-center gap-1.5 border border-border bg-surface px-3.5 py-1.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <span>Verify All Badges</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CERTIFICATIONS.map((cert, i) => (
                  <div
                    key={cert}
                    className="flex flex-col justify-between border border-border bg-surface p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">
                        0{i + 1}
                      </span>
                      <span className="bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-semibold uppercase text-accent">
                        Google Cloud Skills
                      </span>
                    </div>
                    <p className="mt-3 font-heading text-sm font-bold leading-snug text-foreground sm:text-base">
                      {cert}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
                  <span>Languages: Indonesian (Native) · English (Basic / Technical)</span>
                  <span className="font-semibold text-sage">8 Verified Google Badges</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part D: Leadership, Speaking & Community Impact (Static Editorial Grid) */}
        <div className="cv-auto-section space-y-6 border-t border-border pt-14">
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
                className="flex h-full flex-col justify-between border border-border bg-surface p-5"
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
    </section>
  );
}
