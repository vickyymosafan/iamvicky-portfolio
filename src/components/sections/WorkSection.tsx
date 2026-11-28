"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Play,
  Search,
  Star,
  X,
} from "lucide-react";
import {
  ADDITIONAL_PROJECTS,
  FEATURED_PROJECTS,
  FeaturedProject,
  PROFILE,
} from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  ARCHITECTURAL_EASE,
  ScrollDepthParallax,
  SectionReveal,
  SlidingPill,
  SPRING_TACTILE,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { SectionBackdrop } from "@/components/ui/StudioBackdrop";

interface WorkSectionProps {
  onInspectProject: (project: FeaturedProject) => void;
}

const FEATURED_CATEGORIES = [
  "All",
  "AI & RAG",
  "MCP & Agentic",
  "Full-Stack",
  "Enterprise ERP",
] as const;

const ARCHIVE_CATEGORIES = ["All", "Full-Stack", "Trading & Data", "Utilities"] as const;

export function WorkSection({ onInspectProject }: WorkSectionProps) {
  const { scrollTo } = useSmoothScroll();
  const [activeCategory, setActiveCategory] = useState<(typeof FEATURED_CATEGORIES)[number]>("All");
  const [selectedFeaturedId, setSelectedFeaturedId] = useState<string>(
    FEATURED_PROJECTS[0]?.id ?? ""
  );

  const [archiveCategory, setArchiveCategory] =
    useState<(typeof ARCHIVE_CATEGORIES)[number]>("All");
  const [archiveQuery, setArchiveQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const filteredArchive = useMemo(() => {
    const q = archiveQuery.trim().toLowerCase();
    return ADDITIONAL_PROJECTS.filter((item) => {
      const catMatch = archiveCategory === "All" || item.category === archiveCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.focus.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [archiveCategory, archiveQuery]);

  const totalPadded = String(filteredProjects.length).padStart(2, "0");

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-x-clip py-20 sm:py-28">
      {/* Reference-Matched Sweeping Silk Ribbon & Floating Micro-Sphere Backdrop */}
      <SectionBackdrop variant="work" />

      {/* Delicate Left Scroll Rail on Ultra-Wide Screens (Matches redesign-section-1.png) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-72 left-6 z-20 hidden flex-col items-center gap-3 2xl:flex"
      >
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
          Scroll Down
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-24 px-5 sm:px-8">
        {/* ================================================================
            PART 1: FEATURED ENGINEERING WORK (Modeled after redesign-section-1.png)
           ================================================================ */}
        <div className="space-y-12">
          {/* Section Hero Banner */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <m.div
              initial={{ y: 14 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
              className="space-y-6 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface/90 px-4 py-1.5 font-mono text-xs font-medium text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span className="text-primary">01</span>
                <span className="text-muted">/</span>
                <span>Featured Engineering Work</span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[54px]">
                Production Web Apps,{" "}
                <span className="text-primary">AI Search</span> &amp;{" "}
                <span className="text-accent">MCP Tooling.</span>
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                From architecting 12-module BuildFlow ERP and building NexaPip Marketplace
                to hybrid RAG engines and Craftrig MCP, every system starts with clear
                boundaries and ships with measured proof.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const top = filteredProjects[0] ?? FEATURED_PROJECTS[0];
                    if (top) onInspectProject(top);
                  }}
                  className="cta-glow inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover sm:text-sm"
                >
                  <span>Inspect Flagship Case Study</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="#film"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#film", -80);
                  }}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border-strong bg-surface/90 px-5 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary sm:text-sm"
                >
                  <Play className="h-3.5 w-3.5 fill-current text-primary" aria-hidden="true" />
                  <span>Watch Process Film</span>
                </a>
              </div>
            </m.div>

            {/* Right Borderless Seamlessly-Blended Studio 3D Monolith with Scroll Parallax */}
            <ScrollDepthParallax
              distance={26}
              className="relative mx-auto w-full max-w-[500px] lg:col-span-5 lg:max-w-none"
            >
              {/* Soft Luminous Backlight Halo Directly Behind VM Monolith */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at 50% 48%, var(--primary-glow) 0%, var(--accent-soft) 44%, transparent 72%)",
                }}
              />
              <div className="relative overflow-visible">
                <div className="studio-visual-blend relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src="/images/redesign/hero-work-monolith.jpg"
                    alt="Obsidian VM engineering emblem surrounded by golden orbital rings"
                    fill
                    sizes="(max-width: 1024px) 92vw, 520px"
                    className="animate-studio-float scale-[1.06] object-cover"
                  />
                </div>
                <div className="studio-card absolute right-3 bottom-2 z-20 flex items-center gap-2 rounded-2xl px-3.5 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <div className="leading-tight">
                    <p className="font-heading text-xs font-bold text-foreground">
                      {FEATURED_PROJECTS.length} Flagship Case Studies
                    </p>
                    <p className="font-mono text-[11px] text-muted">
                      Benchmarked · Shipped End-to-End
                    </p>
                  </div>
                </div>
              </div>
            </ScrollDepthParallax>
          </div>

          {/* Filter & Counter Toolbar */}
          <div className="flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="font-bold text-primary tabular-nums">{`01 / ${totalPadded}`}</span>
              <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
              <span className="font-heading text-base font-bold text-foreground sm:text-lg">
                Featured Projects
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className="flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-surface/90 p-1"
                role="tablist"
                aria-label="Filter featured engineering projects by category"
              >
                {FEATURED_CATEGORIES.map((category) => {
                  const isSelected = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveCategory(category)}
                      className={`relative min-h-9 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs font-medium ${
                        isSelected
                          ? "bg-primary font-semibold text-primary-foreground"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {isSelected ? (
                        <SlidingPill
                          layoutId="work-category-pill"
                          className="pointer-events-none absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_-4px_var(--primary-glow)]"
                        />
                      ) : null}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>

              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-1.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <span>All Repos</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Clean, Scannable Project Showcase Cards */}
          <div data-featured-grid className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const isHighlighted =
                  selectedFeaturedId === project.id ||
                  (idx === 0 && !filteredProjects.some((p) => p.id === selectedFeaturedId));
                const primaryLink = project.links[0];

                return (
                  <m.article
                    key={project.id}
                    layout="position"
                    initial={{ y: 18, scale: 0.985 }}
                    whileInView={{ y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.08 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -4 }}
                    transition={{
                      duration: 0.36,
                      delay: Math.min(idx, 5) * 0.04,
                      ease: ARCHITECTURAL_EASE,
                      layout: SPRING_TACTILE,
                    }}
                    onMouseEnter={() => setSelectedFeaturedId(project.id)}
                    className={`group flex flex-col overflow-hidden rounded-2xl ${
                      isHighlighted ? "studio-card-featured" : "studio-card"
                    }`}
                  >
                    {/* Card Top Metadata Strip */}
                    <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em]">
                      <span className="font-bold text-primary">
                        {project.index} {"//"} {project.category}
                      </span>
                      <span className="text-muted">{project.year}</span>
                    </div>

                    {/* Studio 3D Project Visual */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-[#0e1117]">
                      <Image
                        src={project.image}
                        alt={`Visual showcase for ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 390px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute bottom-2.5 left-3 rounded-full border border-white/15 bg-[#0b0e15]/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#f5a623]">
                        {project.featuredTag}
                      </span>
                    </div>

                    {/* Card Narrative & Actions */}
                    <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                      <div className="space-y-2.5">
                        <div>
                          <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
                            {project.title}
                          </h3>
                          <p className="mt-0.5 font-mono text-[11px] text-muted">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-sm leading-relaxed text-ink-secondary">
                          {project.summary}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border bg-surface-elevated/80 px-2.5 py-0.5 font-mono text-[11px] text-ink-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tactile Pill Action Row */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => onInspectProject(project)}
                          className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
                        >
                          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Inspect</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>

                        {primaryLink ? (
                          <a
                            href={primaryLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated px-4 py-2 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                          >
                            {primaryLink.kind === "github" ? (
                              <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            <span>{primaryLink.kind === "live" ? "Live" : "GitHub"}</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </m.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ================================================================
            PART 2: ARCHIVE VAULT — ADDITIONAL SHIPPED SYSTEMS (redesign-section-1.1.png)
           ================================================================ */}
        <div
          id="archive"
          className="cv-auto-section relative scroll-mt-24 space-y-10 border-t border-border pt-20"
        >
          <SectionBackdrop variant="archive" />

          {/* Archive Hero Row */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <SectionReveal className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Archive Vault {"//"} Additional Releases</span>
              </div>

              <h3 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Additional Shipped{" "}
                <span className="text-primary">Systems &amp; Utilities.</span>
              </h3>

              <p className="max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                Beyond flagship web platforms, I ship targeted backend APIs, published
                algorithmic trading tools on MQL5 Market, and practical developer utilities.
                Filter or search directly below.
              </p>
            </SectionReveal>

            <ScrollDepthParallax
              distance={22}
              className="relative mx-auto w-full max-w-[480px] lg:col-span-5 lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 rounded-full opacity-75"
                style={{
                  background:
                    "radial-gradient(circle at 52% 48%, var(--primary-glow) 0%, var(--primary-soft) 42%, transparent 72%)",
                }}
              />
              <div className="studio-visual-blend relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/redesign/hero-archive-vault.jpg"
                  alt="Obsidian VM archive vault surrounded by glowing amber orbital rings"
                  fill
                  sizes="(max-width: 1024px) 92vw, 500px"
                  className="animate-studio-float scale-[1.06] object-cover"
                />
              </div>
            </ScrollDepthParallax>
          </div>

          {/* Archive Filter Tabs + Live Search Input */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-surface/90 p-1"
              role="tablist"
              aria-label="Filter archived systems by category"
            >
              {ARCHIVE_CATEGORIES.map((cat) => {
                const active = archiveCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setArchiveCategory(cat)}
                    className={`relative min-h-9 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs font-medium ${
                      active
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {active ? (
                      <SlidingPill
                        layoutId="archive-category-pill"
                        className="pointer-events-none absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_-4px_var(--primary-glow)]"
                      />
                    ) : null}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={archiveQuery}
                onChange={(e) => setArchiveQuery(e.target.value)}
                placeholder="Search shipped archive..."
                aria-label="Search archived systems and utilities"
                className="min-h-11 w-full rounded-full border border-border-strong bg-surface py-2 pr-9 pl-10 font-mono text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
              {archiveQuery ? (
                <button
                  type="button"
                  onClick={() => setArchiveQuery("")}
                  aria-label="Clear archive search"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          {/* 3x2 Obsidian Bento Archive Grid */}
          {filteredArchive.length === 0 ? (
            <div className="studio-card rounded-2xl p-10 text-center font-mono text-xs text-muted">
              No archived systems match &ldquo;{archiveQuery}&rdquo;.
            </div>
          ) : (
            <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredArchive.map((item) => (
                <StaggerItem key={item.name} className="h-full">
                  <m.a
                    layout="position"
                    whileHover={{ y: -3 }}
                    transition={SPRING_TACTILE}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl p-5 ${
                      item.featured ? "studio-card-featured" : "studio-card"
                    }`}
                  >
                  {item.featured ? (
                    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary-foreground">
                      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                      <span>Featured</span>
                    </span>
                  ) : null}

                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-[#0e1117]">
                      <Image
                        src={item.image}
                        alt={`Icon for ${item.name}`}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-heading text-base font-bold leading-snug text-foreground group-hover:text-primary">
                        {item.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-ink-secondary">{item.focus}</p>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                      <span>View Project</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted group-hover:border-primary group-hover:text-primary"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  </m.a>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </div>
    </section>
  );
}
