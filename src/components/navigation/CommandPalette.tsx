"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  FileDown,
  Github,
  Layers,
  Linkedin,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { FEATURED_PROJECTS, FeaturedProject, PROFILE } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (project: FeaturedProject) => void;
}

interface PaletteAction {
  id: string;
  group: "Sections" | "Case Studies" | "Quick Actions";
  label: string;
  hint: string;
  keywords: string;
  icon: React.ElementType;
  run: () => void;
}

/**
 * Native <dialog> Command Palette (Ctrl+K / Cmd+K) following Modern Web Guidance:
 * - Opened via showModal() (top layer, native Esc, native inert page, native focus return)
 * - No redundant role="dialog" or aria-modal
 * - closedby="any" + bounding-rect pointerdown/pointerup fallback for Safari
 */
export function CommandPalette({
  open,
  onClose,
  onSelectProject,
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { scrollTo, pauseScroll, resumeScroll } = useSmoothScroll();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        pauseScroll();
        dialog.showModal();
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    } else if (dialog.open) {
      dialog.close();
      resumeScroll();
    }
  }, [open, pauseScroll, resumeScroll]);

  // Safari fallback for light-dismiss where HTMLDialogElement.prototype.closedBy is missing
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      setQuery("");
      setSelectedIndex(0);
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

  const actions = useMemo<PaletteAction[]>(() => {
    const goTo = (selector: string) => {
      onClose();
      setTimeout(() => scrollTo(selector, -78), 40);
    };

    return [
      {
        id: "sec-work",
        group: "Sections",
        label: "Jump to Featured Engineering Work",
        hint: "Horizontal Showcase",
        keywords: "work projects portfolio horizontal rag mcp erp",
        icon: ArrowRight,
        run: () => goTo("#work"),
      },
      {
        id: "sec-ai",
        group: "Sections",
        label: "Jump to AI-Augmented Workflow Studio",
        hint: "PRD → MCP → QA",
        keywords: "ai workflow agentic claude antigravity prd craftrig",
        icon: ArrowRight,
        run: () => goTo("#ai-workflow"),
      },
      {
        id: "sec-exp",
        group: "Sections",
        label: "Jump to Experience Timeline",
        hint: "5 Roles · MQL5 · Posyandu",
        keywords: "experience destino mql5 posyandu antosa mandiri",
        icon: ArrowRight,
        run: () => goTo("#experience"),
      },
      {
        id: "sec-stack",
        group: "Sections",
        label: "Jump to Tech Stack, Education & Certifications",
        hint: "GPA 3.94 · 8 Google Badges",
        keywords: "stack skills education certifications leadership",
        icon: ArrowRight,
        run: () => goTo("#stack"),
      },
      {
        id: "sec-contact",
        group: "Sections",
        label: "Jump to Contact & Collaboration",
        hint: "Email · Phone · Links",
        keywords: "contact hire email phone linkedin github",
        icon: ArrowRight,
        run: () => goTo("#contact"),
      },
      ...FEATURED_PROJECTS.map<PaletteAction>((project) => ({
        id: `proj-${project.id}`,
        group: "Case Studies",
        label: project.title,
        hint: project.featuredTag,
        keywords: `${project.title} ${project.category} ${project.tech.join(" ")}`,
        icon: Layers,
        run: () => {
          onClose();
          setTimeout(() => onSelectProject(project), 50);
        },
      })),
      {
        id: "act-theme",
        group: "Quick Actions",
        label: `Switch to ${theme === "dark" ? "Light Editorial" : "Dark Obsidian"} Theme`,
        hint: "Theme",
        keywords: "theme dark light mode color",
        icon: theme === "dark" ? Sun : Moon,
        run: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: "act-copy-email",
        group: "Quick Actions",
        label: copiedEmail ? "Email Copied!" : `Copy Email (${PROFILE.email})`,
        hint: "Clipboard",
        keywords: "email copy contact gmail",
        icon: copiedEmail ? Check : Copy,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            onClose();
          }, 550);
        },
      },
      {
        id: "act-cv",
        group: "Quick Actions",
        label: "Open Full CV PDF",
        hint: "New Tab",
        keywords: "cv resume pdf download",
        icon: FileDown,
        run: () => {
          window.open(PROFILE.cvPdfPath, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "act-github",
        group: "Quick Actions",
        label: "Open GitHub (@vickyymosafan)",
        hint: "External",
        keywords: "github repos code open source",
        icon: Github,
        run: () => {
          window.open(PROFILE.socials.github, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "act-linkedin",
        group: "Quick Actions",
        label: "Open LinkedIn Profile",
        hint: "External",
        keywords: "linkedin profile connect",
        icon: Linkedin,
        run: () => {
          window.open(PROFILE.socials.linkedin, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
    ];
  }, [copiedEmail, onClose, onSelectProject, scrollTo, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const clampedIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length)
      );
    } else if (e.key === "Enter" && filtered[clampedIndex]) {
      e.preventDefault();
      filtered[clampedIndex].run();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="native-modal native-modal-sm"
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="flex max-h-[80dvh] w-full flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <h2 id={titleId} className="sr-only">
            Quick navigation and portfolio commands
          </h2>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, AI workflow, stack, or actions..."
            aria-label="Search portfolio sections, case studies, and actions"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close command palette"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="overflow-y-auto p-2.5"
        >
          {filtered.length === 0 ? (
            <p className="py-10 text-center font-mono text-xs text-muted">
              No matching sections or projects for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            (["Sections", "Case Studies", "Quick Actions"] as const).map((group) => {
              const items = filtered.filter((item) => item.group === group);
              if (items.length === 0) return null;

              return (
                <div key={group} className="mb-3 last:mb-0">
                  <div className="px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {group}
                  </div>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const globalIdx = filtered.findIndex((f) => f.id === item.id);
                      const isHighlighted = globalIdx === clampedIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={item.run}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm cursor-pointer ${
                            isHighlighted
                              ? "bg-primary-soft text-foreground"
                              : "text-ink-secondary hover:bg-surface-elevated"
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <Icon
                              className={`h-4 w-4 shrink-0 ${
                                isHighlighted ? "text-primary" : "text-muted"
                              }`}
                              aria-hidden="true"
                            />
                            <span className="truncate font-medium">{item.label}</span>
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-muted">
                            {item.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface-elevated/60 px-4 py-2.5 font-mono text-[11px] text-muted">
          <span className="inline-flex items-center gap-2">
            <BrandLogo size={18} className="shrink-0" />
            <span>↑↓ Navigate · Enter Open</span>
          </span>
          <span>Esc Close</span>
        </div>
      </div>
    </dialog>
  );
}
