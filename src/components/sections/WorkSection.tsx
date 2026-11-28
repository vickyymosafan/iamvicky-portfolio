"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
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
import { hasCaseStudyPage } from "@/data/caseStudies";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  ARCHITECTURAL_EASE,
  KineticScrollBand,
  KineticTextReveal,
  ScrollDepthParallax,
  SectionReveal,
  SlidingPill,
  SPRING_PARALLAX,
  SPRING_TACTILE,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import {
  RippleButton,
  RippleLink,
  SpotlightOverlay,
  usePointerSpotlight,
} from "@/components/motion/InteractiveMotion";
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

const WORK_KINETIC_ITEMS = [
  "PRODUCTION WEB APPS",
  "HORIZONTAL SHOWCASE",
  "HYBRID RAG & AI SEARCH",
  "CRAFTRIG MCP GOVERNANCE",
  "12-MODULE BUILDFLOW ERP",
  "NEXAPIP MT5 MARKETPLACE",
] as const;

interface FeaturedCardProps {
  project: FeaturedProject;
  slideIndex: number;
  totalSlides: number;
  isHighlighted: boolean;
  isDesktopHorizontal: boolean;
  onHighlight: (id: string) => void;
  onInspect: (project: FeaturedProject) => void;
}

function FeaturedProjectCard({
  project,
  slideIndex,
  totalSlides,
  isHighlighted,
  isDesktopHorizontal,
  onHighlight,
  onInspect,
}: FeaturedCardProps) {
  const { ref, onPointerEnter, onPointerMove } = usePointerSpotlight<HTMLElement>();
  const primaryLink = project.links[0];
  const hasFullCaseStudy = hasCaseStudyPage(project.id);
  const caseStudyHref = `/projects/${project.id}`;

  return (
    <m.article
      ref={ref}
      role="group"
      aria-roledescription="slide"
      aria-label={`${slideIndex + 1} of ${totalSlides}: ${project.title}`}
      whileHover={{ y: -4 }}
      transition={SPRING_TACTILE}
      onPointerEnter={() => {
        onPointerEnter();
        onHighlight(project.id);
      }}
      onPointerMove={onPointerMove}
      onFocus={() => onHighlight(project.id)}
      className={`studio-spotlight-card group flex shrink-0 flex-col overflow-hidden rounded-2xl ${
        isDesktopHorizontal
          ? "w-[368px] xl:w-[388px]"
          : "w-[84vw] max-w-[348px] snap-start sm:w-[374px] lg:w-[380px]"
      } ${isHighlighted ? "studio-card-featured" : "studio-card"}`}
    >
      <SpotlightOverlay />

      {/* Card Top Metadata Strip */}
      <div className="relative z-10 flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]">
        <span className="font-bold text-primary">
          {project.index} {"//"} {project.category}
        </span>
        <span className="text-muted">{project.year}</span>
      </div>

      {/* Studio 3D Project Visual */}
      {hasFullCaseStudy ? (
        <Link
          href={caseStudyHref}
          aria-label={`Open full UI/UX and architecture case study for ${project.title}`}
          className="relative z-10 block aspect-[16/9] w-full overflow-hidden border-b border-border bg-[#0e1117]"
        >
          <Image
            src={project.image}
            alt={`Visual showcase for ${project.title}`}
            fill
            sizes="(max-width: 768px) 86vw, 390px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span className="absolute top-2.5 right-3 rounded-full border border-white/20 bg-[#0b0e15]/90 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#f5f6f8]">
            Full UI/UX Page
          </span>
          <span className="absolute bottom-2.5 left-3 rounded-full border border-white/15 bg-[#0b0e15]/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#f5a623]">
            {project.featuredTag}
          </span>
        </Link>
      ) : (
        <div className="relative z-10 aspect-[16/9] w-full overflow-hidden border-b border-border bg-[#0e1117]">
          <Image
            src={project.image}
            alt={`Visual showcase for ${project.title}`}
            fill
            sizes="(max-width: 768px) 86vw, 390px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span className="absolute bottom-2.5 left-3 rounded-full border border-white/15 bg-[#0b0e15]/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#f5a623]">
            {project.featuredTag}
          </span>
        </div>
      )}

      {/* Card Narrative & Actions */}
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-3.5 p-4 sm:p-5">
        <div className="space-y-2">
          <div>
            <h3 className="font-heading text-base font-bold leading-snug text-foreground sm:text-lg">
              {hasFullCaseStudy ? (
                <Link
                  href={caseStudyHref}
                  className="hover:text-primary"
                >
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h3>
            <p className="mt-0.5 truncate font-mono text-[11px] text-muted">
              {project.subtitle}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-ink-secondary sm:text-sm">
            {project.summary}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
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

        {/* Tactile Ripple Action Row */}
        <div className="flex items-center gap-2.5 pt-1">
          {hasFullCaseStudy ? (
            <Link
              href={caseStudyHref}
              data-case-study-link={project.id}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : (
            <RippleButton
              onClick={() => onInspect(project)}
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Inspect</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </RippleButton>
          )}

          {primaryLink ? (
            <RippleLink
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
            </RippleLink>
          ) : null}
        </div>
      </div>
    </m.article>
  );
}

interface ArchiveCardItemProps {
  item: (typeof ADDITIONAL_PROJECTS)[number];
}

function ArchiveSpotlightCard({ item }: ArchiveCardItemProps) {
  const { ref, onPointerEnter, onPointerMove } = usePointerSpotlight<HTMLAnchorElement>();

  return (
    <m.a
      ref={ref}
      layout="position"
      whileHover={{ y: -3 }}
      transition={SPRING_TACTILE}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`studio-spotlight-card group flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl p-5 ${
        item.featured ? "studio-card-featured" : "studio-card"
      }`}
    >
      <SpotlightOverlay />

      {item.featured ? (
        <span className="relative z-10 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          <span>Featured</span>
        </span>
      ) : null}

      <div className="relative z-10 flex items-start gap-4">
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

      <p className="relative z-10 text-xs leading-relaxed text-ink-secondary">{item.focus}</p>

      <div className="relative z-10 flex items-center justify-between border-t border-border pt-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
          <span>View Project</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:border-primary group-hover:text-primary"
          aria-hidden="true"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </m.a>
  );
}

export function WorkSection({ onInspectProject }: WorkSectionProps) {
  const { scrollTo } = useSmoothScroll();
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] =
    useState<(typeof FEATURED_CATEGORIES)[number]>("All");
  const [selectedFeaturedId, setSelectedFeaturedId] = useState<string>(
    FEATURED_PROJECTS[0]?.id ?? ""
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");
  const [mobileScrollProgress, setMobileScrollProgress] = useState(0);

  const [archiveCategory, setArchiveCategory] =
    useState<(typeof ARCHIVE_CATEGORIES)[number]>("All");
  const [archiveQuery, setArchiveQuery] = useState("");

  // Horizontal Showcase Refs & Measured Geometry (ResizeObserver — zero layout reads on scroll)
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [metrics, setMetrics] = useState({ maxShift: 0, stageHeight: 760 });

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

  // Track desktop breakpoint (lg >= 1024px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Measure horizontal track & sticky viewport via ResizeObserver (Lenis zero-layout-read rule)
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const viewportWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;
      const maxShift = Math.max(0, Math.round(trackWidth - viewportWidth));
      const stageHeight = Math.max(640, window.innerHeight);
      setMetrics((prev) =>
        prev.maxShift === maxShift && prev.stageHeight === stageHeight
          ? prev
          : { maxShift, stageHeight }
      );
    };

    measure();
    const rafId = window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [filteredProjects.length, isDesktopViewport]);

  const isDesktopHorizontal =
    isDesktopViewport && !shouldReduceMotion && metrics.maxShift > 24;
  const travelDistance = Math.round(metrics.maxShift * 0.85);
  const runwayHeight = metrics.stageHeight + travelDistance;

  // Motion scroll-linked horizontal translation (Context7 /websites/motion_dev pattern)
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktopHorizontal ? [0, -metrics.maxShift] : [0, 0]
  );
  const smoothX = useSpring(rawX, SPRING_PARALLAX);
  const desktopProgressScale = useSpring(scrollYProgress, SPRING_PARALLAX);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktopHorizontal || filteredProjects.length <= 1) return;
    const clamped = Math.min(1, Math.max(0, latest));
    const idx = Math.round(clamped * (filteredProjects.length - 1));
    setActiveSlideIndex((prev) => (prev === idx ? prev : idx));
  });

  // Mobile / reduced-motion native snap track scroll sync (rAF-throttled)
  useEffect(() => {
    if (isDesktopHorizontal) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    let rafId = 0;
    const syncNativeScroll = () => {
      rafId = 0;
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll)) : 1;
      setMobileScrollProgress(ratio);
      if (filteredProjects.length > 1) {
        const idx = Math.round(ratio * (filteredProjects.length - 1));
        setActiveSlideIndex((prev) => (prev === idx ? prev : idx));
      } else {
        setActiveSlideIndex(0);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(syncNativeScroll);
    };

    syncNativeScroll();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isDesktopHorizontal, filteredProjects.length]);

  const handleCategoryChange = useCallback(
    (category: (typeof FEATURED_CATEGORIES)[number]) => {
      setActiveCategory(category);
      setActiveSlideIndex(0);
      setMobileScrollProgress(0);

      if (viewportRef.current && !isDesktopHorizontal) {
        viewportRef.current.scrollTo({ left: 0, behavior: "auto" });
      }
      if (runwayRef.current && isDesktopHorizontal) {
        const rect = runwayRef.current.getBoundingClientRect();
        if (rect.top < -24) {
          const runwayTop = window.scrollY + rect.top;
          scrollTo(runwayTop, 0);
        }
      }
    },
    [isDesktopHorizontal, scrollTo]
  );

  const goToSlide = useCallback(
    (targetIdx: number) => {
      const total = filteredProjects.length;
      if (total <= 1) return;
      const wrapped = ((targetIdx % total) + total) % total;
      const targetProject = filteredProjects[wrapped];
      setActiveSlideIndex(wrapped);
      if (targetProject) {
        setSelectedFeaturedId(targetProject.id);
        setStatusAnnouncement(
          `Project ${wrapped + 1} of ${total}: ${targetProject.title}`
        );
      }

      if (isDesktopHorizontal && runwayRef.current) {
        const runwayTop = window.scrollY + runwayRef.current.getBoundingClientRect().top;
        const fraction = wrapped / (total - 1);
        const targetScrollY = Math.round(runwayTop + fraction * travelDistance);
        scrollTo(targetScrollY, 0);
        return;
      }

      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const slideEl = track.children[wrapped] as HTMLElement | undefined;
      if (!slideEl) return;
      viewport.scrollTo({
        left: Math.max(0, slideEl.offsetLeft),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    },
    [filteredProjects, isDesktopHorizontal, scrollTo, shouldReduceMotion, travelDistance]
  );

  const clampedActiveIndex = Math.min(
    activeSlideIndex,
    Math.max(0, filteredProjects.length - 1)
  );
  const currentPadded = String(clampedActiveIndex + 1).padStart(2, "0");
  const totalPadded = String(filteredProjects.length).padStart(2, "0");

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-x-clip py-20 sm:py-28">
      {/* Reference-Matched Sweeping Silk Ribbon & Floating Micro-Sphere Backdrop */}
      <SectionBackdrop variant="work" />

      {/* Delicate Left Scroll Rail on Ultra-Wide Screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-72 left-6 z-20 hidden flex-col items-center gap-3 2xl:flex"
      >
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
          Scroll Down
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-5 sm:px-8">
        {/* ================================================================
            PART 1A: FEATURED ENGINEERING HERO BANNER
           ================================================================ */}
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
              <KineticTextReveal text="Production Web Apps," />{" "}
              <KineticTextReveal text="AI Search" delay={0.1} className="text-primary" />{" "}
              <span className="text-foreground">&amp;</span>{" "}
              <KineticTextReveal text="MCP Tooling." delay={0.18} className="text-accent" />
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
              From architecting 12-module BuildFlow ERP and building NexaPip Marketplace
              to hybrid RAG engines and Craftrig MCP, every system starts with clear
              boundaries and ships with measured proof.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/projects/buildflow-erp"
                className="cta-glow group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover sm:text-sm"
              >
                <span>Explore BuildFlow ERP Case Study</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <RippleLink
                href="#film"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#film", -80);
                }}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border-strong bg-surface/90 px-5 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary sm:text-sm"
              >
                <Play className="h-3.5 w-3.5 fill-current text-primary" aria-hidden="true" />
                <span>Watch Process Film</span>
              </RippleLink>
            </div>
          </m.div>

          {/* Right Borderless Seamlessly-Blended Studio 3D Monolith with Scroll Parallax */}
          <ScrollDepthParallax
            distance={26}
            className="relative mx-auto w-full max-w-[500px] lg:col-span-5 lg:max-w-none"
          >
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
                    Benchmarked · Horizontal Showcase
                  </p>
                </div>
              </div>
            </div>
          </ScrollDepthParallax>
        </div>

        {/* Scroll-Linked Kinetic Typography Band */}
        <KineticScrollBand items={WORK_KINETIC_ITEMS} direction="left" />

        {/* ================================================================
            PART 1B: HORIZONTAL SCROLL SHOWCASE FOR FEATURED PROJECTS
            - Desktop (lg+, no-preference): Sticky scroll-linked rail via useScroll + useSpring
            - Mobile/Tablet & reduced-motion: Native scroll-snap carousel with fade hints
           ================================================================ */}
        <div
          ref={runwayRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured engineering projects horizontal showcase"
          className="relative"
          style={isDesktopHorizontal ? { height: `${runwayHeight}px` } : undefined}
        >
          <div
            ref={stageRef}
            className={
              isDesktopHorizontal
                ? "sticky top-0 flex min-h-svh flex-col justify-center gap-4 pt-20 pb-5"
                : "space-y-5"
            }
          >
            {/* Sticky Filter, Counter & Navigation Controls Toolbar */}
            <div className="flex flex-col gap-3 border-y border-border bg-background/85 py-3.5 backdrop-blur-xs lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-bold text-primary tabular-nums">
                  {`${currentPadded} / ${totalPadded}`}
                </span>
                <span className="h-px w-5 bg-border-strong" aria-hidden="true" />
                <span className="font-heading text-base font-bold text-foreground sm:text-lg">
                  Featured Projects
                </span>
                <span className="hidden rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] text-muted xl:inline-flex">
                  {isDesktopHorizontal ? "Scroll to glide" : "Swipe horizontally"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface/90 p-1"
                  role="tablist"
                  aria-label="Filter featured engineering projects by category"
                >
                  {FEATURED_CATEGORIES.map((category) => {
                    const isSelected = activeCategory === category;
                    return (
                      <RippleButton
                        key={category}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleCategoryChange(category)}
                        className={`min-h-9 cursor-pointer rounded-full px-3 py-1.5 font-mono text-xs font-medium ${
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
                      </RippleButton>
                    );
                  })}
                </div>

                {/* Previous / Next Horizontal Controls */}
                {filteredProjects.length > 1 ? (
                  <div className="flex items-center gap-1.5">
                    <RippleButton
                      onClick={() => goToSlide(clampedActiveIndex - 1)}
                      aria-label="Previous featured project"
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface text-foreground hover:border-primary hover:text-primary"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </RippleButton>
                    <RippleButton
                      onClick={() => goToSlide(clampedActiveIndex + 1)}
                      aria-label="Next featured project"
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface text-foreground hover:border-primary hover:text-primary"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </RippleButton>
                  </div>
                ) : null}

                <RippleLink
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3.5 py-1.5 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <span>All Repos</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </RippleLink>
              </div>
            </div>

            {/* Scroll-Linked Horizontal Progress Rail + Accessible Slide Markers */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div
                aria-hidden="true"
                className="h-1.5 flex-1 overflow-hidden rounded-full border border-border bg-surface-elevated"
              >
                {isDesktopHorizontal ? (
                  <m.div
                    className="h-full w-full rounded-full bg-gradient-to-r from-primary via-primary-hover to-accent"
                    style={{
                      scaleX: desktopProgressScale,
                      transformOrigin: "left center",
                    }}
                  />
                ) : (
                  <div
                    className="h-full w-full rounded-full bg-gradient-to-r from-primary via-primary-hover to-accent transition-transform duration-150"
                    style={{
                      transform: `scaleX(${Math.max(0.08, mobileScrollProgress)})`,
                      transformOrigin: "left center",
                    }}
                  />
                )}
              </div>

              {filteredProjects.length > 1 ? (
                <nav
                  aria-label="Jump to featured project"
                  className="flex flex-wrap items-center gap-1"
                >
                  {filteredProjects.map((project, idx) => {
                    const isCurrent = idx === clampedActiveIndex;
                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        aria-current={isCurrent ? "true" : undefined}
                        aria-label={`Go to project ${idx + 1}: ${project.title}`}
                        className="inline-flex min-h-7 min-w-7 cursor-pointer items-center justify-center rounded-full px-1 py-1"
                      >
                        <span
                          aria-hidden="true"
                          className={`block h-2 rounded-full transition-all duration-200 ${
                            isCurrent
                              ? "w-7 bg-primary ring-2 ring-primary/30"
                              : "w-2 bg-border-strong hover:bg-primary/60"
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              ) : null}
            </div>

            {/* Horizontal Viewport & Card Track */}
            <div
              ref={viewportRef}
              data-horizontal-showcase-viewport
              className={
                isDesktopHorizontal
                  ? "w-full overflow-hidden py-1"
                  : "horizontal-snap-track w-full py-1 pb-3"
              }
            >
              <m.div
                ref={trackRef}
                data-featured-grid
                style={isDesktopHorizontal ? { x: smoothX } : undefined}
                className="flex w-max items-stretch gap-5 will-change-transform"
              >
                {filteredProjects.map((project, idx) => {
                  const isHighlighted =
                    selectedFeaturedId === project.id ||
                    (idx === clampedActiveIndex &&
                      !filteredProjects.some((p) => p.id === selectedFeaturedId));

                  return (
                    <FeaturedProjectCard
                      key={project.id}
                      project={project}
                      slideIndex={idx}
                      totalSlides={filteredProjects.length}
                      isHighlighted={isHighlighted}
                      isDesktopHorizontal={isDesktopHorizontal}
                      onHighlight={setSelectedFeaturedId}
                      onInspect={onInspectProject}
                    />
                  );
                })}
              </m.div>
            </div>

            {/* Accessible Visually-Hidden Polite Slide Status Region */}
            <p className="sr-only" role="status" aria-live="polite">
              {statusAnnouncement}
            </p>
          </div>
        </div>

        {/* ================================================================
            PART 2: ARCHIVE VAULT — ADDITIONAL SHIPPED SYSTEMS
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
                <KineticTextReveal text="Additional Shipped" />{" "}
                <KineticTextReveal
                  text="Systems & Utilities."
                  delay={0.1}
                  className="text-primary"
                />
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
                  <RippleButton
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setArchiveCategory(cat)}
                    className={`min-h-9 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs font-medium ${
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
                  </RippleButton>
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

          {/* 3x2 Obsidian Bento Archive Grid with Hover Spotlight */}
          {filteredArchive.length === 0 ? (
            <div className="studio-card rounded-2xl p-10 text-center font-mono text-xs text-muted">
              No archived systems match &ldquo;{archiveQuery}&rdquo;.
            </div>
          ) : (
            <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredArchive.map((item) => (
                <StaggerItem key={item.name} className="h-full">
                  <ArchiveSpotlightCard item={item} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </div>
    </section>
  );
}
