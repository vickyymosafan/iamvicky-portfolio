"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, ExternalLink, Github, Star } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";
import { EditorialReveal, SectionHeader } from "@/components/motion/MotionPrimitives";
import { ExperienceStoryCanvas } from "@/components/three/ExperienceStoryCanvas";

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });

  const spineScaleY = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.25,
  });

  // Sync active 3D storytelling chapter automatically as the user scrolls through each role
  useEffect(() => {
    const els = itemRefs.current.filter((el): el is HTMLLIElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.chapterIndex);
          if (!Number.isNaN(idx)) setActiveChapter(idx);
        }
      },
      { rootMargin: "-26% 0px -42% 0px", threshold: [0.15, 0.4, 0.7] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentExp = EXPERIENCES[activeChapter] ?? EXPERIENCES[0];

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Sticky Header + Live Three.js 3D Interactive Storytelling Diorama */}
          <div className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-24">
              <SectionHeader
                index="03"
                eyebrow="Experience Timeline"
                title="Hands-on delivery across web, health & fintech."
                description="Scroll through each career milestone to drive the live 3D storytelling diorama — from copytrading portals and 11 MQL5 releases to offline healthcare PWAs."
              />

              {/* Live Three.js 3D Interactive Chapter Storytelling Stage */}
              <ExperienceStoryCanvas
                activeIndex={activeChapter}
                chapterLabel={currentExp.company}
                chapterPeriod={currentExp.period}
              />

              {/* Quick Chapter Selector + Highlights */}
              <div className="border border-border bg-surface/85 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Career Highlights</span>
                  </div>
                  <div className="flex items-center gap-1" aria-label="Select 3D experience chapter">
                    {EXPERIENCES.map((exp, idx) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => setActiveChapter(idx)}
                        aria-label={`Preview 3D chapter ${idx + 1}: ${exp.company}`}
                        className={`h-8 w-8 font-mono text-[11px] font-bold cursor-pointer ${
                          activeChapter === idx
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-surface-elevated text-muted hover:text-foreground"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <ul className="space-y-1.5 text-xs leading-relaxed text-ink-secondary">
                  <li>• 5 shipped roles across freelance, university &amp; internships</li>
                  <li>• 11 commercial MQL5 Market products rated 5.0 / 5.0</li>
                  <li>• End-to-end ownership: DB schema, API tests, PWA &amp; CI/CD</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Vertical Scroll-Driven 3D-Lifted Timeline */}
          <div ref={timelineRef} className="relative lg:col-span-8">
            {/* Background Rail */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-4 w-px bg-border sm:left-5"
            />
            {/* Scroll-Illuminated Progress Spine */}
            <motion.div
              aria-hidden="true"
              style={{ scaleY: spineScaleY }}
              className="absolute top-2 bottom-2 left-4 w-[2px] origin-top bg-primary sm:left-5"
            />

            <ol className="space-y-7 pl-11 sm:pl-14">
              {EXPERIENCES.map((exp, idx) => {
                const isActive = idx === activeChapter;
                return (
                  <li
                    key={exp.id}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    data-chapter-index={idx}
                    onMouseEnter={() => setActiveChapter(idx)}
                    className="relative"
                    style={{ perspective: 1000 }}
                  >
                    {/* Timeline Node Dot */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-6 -left-[35px] flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors sm:-left-[43px] ${
                        isActive
                          ? "border-primary bg-primary shadow-[0_0_12px_var(--primary)]"
                          : "border-primary/60 bg-background"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? "bg-primary-foreground" : "bg-primary"
                        }`}
                      />
                    </span>

                    <EditorialReveal delay={idx * 0.04}>
                      <article
                        className={`border bg-surface/92 p-5 transition-all duration-300 sm:p-6 ${
                          isActive
                            ? "border-primary/75 shadow-2xl -translate-y-0.5"
                            : "border-border hover:border-border-strong"
                        }`}
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[11px] font-bold text-primary">
                                {`0${idx + 1} //`}
                              </span>
                              <Briefcase
                                className="h-4 w-4 text-primary"
                                aria-hidden="true"
                              />
                              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                                {exp.role}
                              </h3>
                            </div>
                            <p className="mt-1 font-medium text-ink-secondary">
                              {exp.company}
                            </p>
                          </div>

                          <div className="flex flex-col items-start sm:items-end">
                            <span className="bg-primary-soft px-2.5 py-1 font-mono text-xs font-semibold text-primary">
                              {exp.period}
                            </span>
                            <span className="mt-1 font-mono text-[11px] text-muted">
                              {exp.locationOrMode}
                            </span>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                          {exp.summary}
                        </p>

                        <ul className="mt-4 space-y-2 border-t border-border pt-4">
                          {exp.highlights.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {exp.stack.map((tech) => (
                              <span
                                key={tech}
                                className="border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[11px] text-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {exp.links.length > 0 ? (
                            <div className="flex flex-wrap items-center gap-2">
                              {exp.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex min-h-10 items-center gap-1.5 border border-border bg-background px-3 py-1.5 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
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
                      </article>
                    </EditorialReveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
