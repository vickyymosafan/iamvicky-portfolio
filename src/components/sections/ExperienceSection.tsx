"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Github,
  Rocket,
  Sparkles,
} from "lucide-react";
import { EXPERIENCES, PROFILE } from "@/data/portfolio";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";

const STAT_ICONS = [BarChart3, Rocket, Sparkles] as const;

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0]?.id ?? "");

  return (
    <section
      id="experience"
      className="cv-auto-section relative scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      {/* Subtle Ambient Corner Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, var(--primary-soft) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ================================================================
              LEFT STICKY STORYTELLING COLUMN (Modeled after redesign-section-3.png)
             ================================================================ */}
          <div className="space-y-7 lg:sticky lg:top-28 lg:col-span-5">
            <m.div
              initial={{ y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>03 / Experience Timeline</span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
                Hands-on delivery across{" "}
                <span className="text-primary">web, health &amp; fintech.</span>
              </h2>

              <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                From mobile Kotlin internships and architecture firm platforms to offline
                elderly healthcare PWAs, 11 MQL5 trading releases, and fintech portals — every
                role taught me how to ship reliable software under real-world constraints.
              </p>

              {/* Compact 3-Stat Journey Proof Pill Box */}
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border-strong bg-surface/90 p-4">
                {PROFILE.journeyHighlights.map((item, idx) => {
                  const Icon = STAT_ICONS[idx] ?? Sparkles;
                  return (
                    <div
                      key={item.label}
                      className={`flex flex-col items-start gap-1 ${
                        idx > 0 ? "border-l border-border pl-3" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        <span className="font-heading text-lg font-bold text-foreground tabular-nums sm:text-xl">
                          {item.value}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-muted">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </m.div>

            {/* Sleek Workstation Visual (Matches bottom-left of redesign-section-3.png) */}
            <m.div
              initial={{ y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.48, delay: 0.06, ease: ARCHITECTURAL_EASE }}
              className="studio-card relative hidden overflow-hidden rounded-3xl bg-[#080a0f] lg:block"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/redesign/hero-stack-laptop.jpg"
                  alt="VM developer workstation surrounded by floating tech stack tiles"
                  fill
                  sizes="460px"
                  className="object-cover"
                />
              </div>
            </m.div>
          </div>

          {/* ================================================================
              RIGHT VERTICAL TIMELINE RAIL & CARDS (Modeled after redesign-section-3.png)
             ================================================================ */}
          <div className="relative lg:col-span-7">
            {/* Vertical Glowing Timeline Spine */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-6 bottom-6 left-4 hidden w-px bg-gradient-to-b from-primary via-border-strong to-transparent sm:block"
            />

            <div className="space-y-5">
              {EXPERIENCES.map((exp, idx) => {
                const isExpanded = expandedId === exp.id;
                return (
                  <m.article
                    key={exp.id}
                    initial={{ y: 12 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{ duration: 0.38, delay: idx * 0.04, ease: ARCHITECTURAL_EASE }}
                    className="relative sm:pl-12"
                  >
                    {/* Glowing Timeline Milestone Node (28x28 WCAG 2.5.8 hit target) */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? "" : exp.id)}
                      aria-label={`Select experience milestone ${exp.role} at ${exp.company}`}
                      className="group absolute top-[21px] left-[2px] hidden h-7 w-7 cursor-pointer items-center justify-center rounded-full sm:flex"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                          isExpanded
                            ? "border-primary bg-primary shadow-[0_0_16px_var(--primary-glow)]"
                            : "border-primary/50 bg-background group-hover:border-primary"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isExpanded ? "bg-primary-foreground" : "bg-primary"
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden rounded-2xl p-5 sm:p-6 ${
                        isExpanded ? "studio-card-featured" : "studio-card"
                      }`}
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        {/* Custom Studio 3D Experience Icon */}
                        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-[#0e1117]">
                          <Image
                            src={exp.image}
                            alt={`Visual emblem for ${exp.company}`}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>

                        {/* Experience Content */}
                        <div className="min-w-0 flex-1 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary">
                                {exp.index} {"//"}
                              </span>
                              <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                                {exp.role}
                              </h3>
                            </div>

                            <span className="rounded-full border border-primary/35 bg-primary-soft/60 px-3 py-1 font-mono text-[11px] font-semibold text-primary">
                              {exp.period}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                            <Building2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                            <span className="font-semibold text-foreground">{exp.company}</span>
                            <span>·</span>
                            <span>{exp.locationOrMode}</span>
                          </div>

                          <p className="text-sm leading-relaxed text-ink-secondary">
                            {exp.summary}
                          </p>

                          {/* Tech Pills + Expandable Details Button */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              {exp.stack.slice(0, 5).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 font-mono text-[11px] text-ink-secondary"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? "" : exp.id)}
                              aria-expanded={isExpanded}
                              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated px-4 py-1.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                            >
                              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                              {isExpanded ? (
                                <ChevronDown
                                  className="h-3.5 w-3.5 rotate-180 transition-transform"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Smoothly Expanded Verified Highlights & Links */}
                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <m.div
                            key="details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: ARCHITECTURAL_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 space-y-4 border-t border-border pt-4">
                              <ul className="space-y-2">
                                {exp.highlights.map((bullet) => (
                                  <li
                                    key={bullet}
                                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-secondary"
                                  >
                                    <CheckCircle2
                                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                      aria-hidden="true"
                                    />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              {exp.links.length > 0 ? (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {exp.links.map((link) => (
                                    <a
                                      key={link.href}
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-primary/40 bg-primary-soft px-3.5 py-1.5 font-mono text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                                    >
                                      {link.kind === "github" ? (
                                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                                      ) : (
                                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                      )}
                                      <span>{link.label}</span>
                                    </a>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </m.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </m.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
