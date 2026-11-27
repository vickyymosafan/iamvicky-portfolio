"use client";

import React, { useEffect, useId, useRef } from "react";
import { CheckCircle2, ExternalLink, Github, X } from "lucide-react";
import { FeaturedProject } from "@/data/portfolio";
import { ProjectArchitectureDiagram } from "@/components/motion/ProjectArchitectureDiagram";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface ProjectCaseStudyDialogProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

/**
 * Native <dialog> Architecture Case Study Modal:
 * - Uses showModal() for built-in top layer, focus management, Esc, and inert backdrop
 * - Uses closedby="any" + Safari pointerdown/pointerup fallback
 * - Uses overscroll-behavior: contain on dialog:modal & dialog::backdrop (zero body scroll lock)
 */
export function ProjectCaseStudyDialog({
  project,
  onClose,
}: ProjectCaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        pauseScroll();
        dialog.showModal();
        requestAnimationFrame(() => closeBtnRef.current?.focus());
      }
    } else if (dialog.open) {
      dialog.close();
      resumeScroll();
    }
  }, [project, pauseScroll, resumeScroll]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      resumeScroll();
      onClose();
    };
    dialog.addEventListener("close", handleClose);

    if ("closedBy" in HTMLDialogElement.prototype) {
      return () => dialog.removeEventListener("close", handleClose);
    }

    const isOutside = (e: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
    };

    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
    };
  }, [onClose, resumeScroll]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="native-modal"
      {...({ closedby: "any" } as Record<string, string>)}
    >
      {project ? (
        <div className="flex max-h-[86dvh] w-full flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-7 sm:py-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="font-bold text-primary">CASE STUDY {project.index}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">{project.category}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">{project.year}</span>
              </div>
              <h2
                id={titleId}
                className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="font-mono text-xs text-muted">{project.subtitle}</p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close case study dialog"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground hover:border-primary hover:text-primary cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div data-lenis-prevent className="space-y-6 overflow-y-auto px-5 py-6 sm:px-7">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-border bg-surface-elevated/80 p-4"
                >
                  <div className="font-heading text-2xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <div className="mt-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                    {metric.label}
                  </div>
                  {metric.detail ? (
                    <div className="mt-1 text-xs text-muted">{metric.detail}</div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Architecture Flow */}
            <ProjectArchitectureDiagram nodes={project.architecture} />

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-background/60 p-4 sm:p-5">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-amber">
                  Engineering Challenge
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {project.problem}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/60 p-4 sm:p-5">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Architecture &amp; Delivery
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Engineering Decisions */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                Verified Engineering Decisions &amp; Outcomes
              </h3>
              <ul className="space-y-2.5">
                {project.engineeringDecisions.map((decision) => (
                  <li
                    key={decision}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface-elevated/50 p-3.5 text-sm leading-relaxed text-ink-secondary"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Stack */}
            <div className="space-y-2.5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 font-mono text-xs text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-elevated/60 px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center gap-2.5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                  {link.kind === "github" ? (
                    <Github className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 items-center rounded-xl border border-border bg-surface px-4 py-2 font-mono text-xs font-medium text-foreground hover:border-primary cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
