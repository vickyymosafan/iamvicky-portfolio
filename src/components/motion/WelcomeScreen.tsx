"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Cpu, Layers, ShieldCheck, Terminal } from "lucide-react";
import { useAudioGate } from "@/components/providers/AudioGateProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

const BOOT_PIPELINE = [
  {
    code: "01",
    label: "DETERMINISTIC PRD",
    detail: "OpenAPI · ERD · BuildFlow ERP (12 Modules)",
  },
  {
    code: "02",
    label: "AI-ASSISTED ORCHESTRATION",
    detail: "Claude Code × Google Antigravity",
  },
  {
    code: "03",
    label: "CRAFTRIG MCP & HYBRID RAG",
    detail: "mcp-craftrig · 91.67% Recall · 694ms",
  },
  {
    code: "04",
    label: "FULL-STACK STUDIO READY",
    detail: "Next.js 16 · NestJS · PostgreSQL",
  },
] as const;

/**
 * On-demand Studio Boot Sequence (code-split, triggered via Hero "Replay Intro"):
 * - Direct DOM ref updates (0 per-frame React re-renders).
 * - Crisp 950ms duration with instant dismiss on click / Enter / Space / Escape.
 */
export function WelcomeScreen() {
  const { welcomeVisible, dismissWelcome } = useAudioGate();
  const [stageLevel, setStageLevel] = useState(0);
  const [exiting, setExiting] = useState(false);

  const rafRef = useRef<number | null>(null);
  const dismissedRef = useRef(false);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!welcomeVisible) {
      dismissedRef.current = false;
      return;
    }

    dismissedRef.current = false;
    let lastStage = 0;

    const startTime = performance.now();
    const duration = 950;
    let closeTimer = 0;

    const finishDismiss = (delayMs: number) => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      if (pctRef.current) pctRef.current.textContent = "100%";
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      if (statusRef.current) statusRef.current.textContent = "Ready — opening studio";
      setStageLevel(4);
      setExiting(true);
      closeTimer = window.setTimeout(() => {
        dismissWelcome();
        setExiting(false);
        setStageLevel(0);
      }, delayMs);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        dismissedRef.current = true;
        dismissWelcome();
      });
      return () => cancelAnimationFrame(id);
    }

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pct = Math.min(100, Math.round(eased * 100));

      if (pctRef.current) pctRef.current.textContent = `${String(pct).padStart(3, "0")}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;

      const nextStage =
        pct >= 96 ? 4 : pct >= 74 ? 3 : pct >= 48 ? 2 : pct >= 22 ? 1 : 0;
      if (nextStage !== lastStage) {
        lastStage = nextStage;
        setStageLevel(nextStage);
      }

      if (t < 1 && !dismissedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finishDismiss(280);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        finishDismiss(200);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (closeTimer) window.clearTimeout(closeTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [welcomeVisible, dismissWelcome]);

  const handleEnterNow = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (pctRef.current) pctRef.current.textContent = "100%";
    if (barRef.current) barRef.current.style.transform = "scaleX(1)";
    setStageLevel(4);
    setExiting(true);
    window.setTimeout(() => {
      dismissWelcome();
      setExiting(false);
      setStageLevel(0);
    }, 220);
  };

  return (
    <AnimatePresence>
      {welcomeVisible ? (
        <m.div
          key="welcome-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to M. Vicky Mosafan Full-Stack & AI-Augmented Engineering Portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1, y: exiting ? "-6%" : "0%" }}
          exit={{ opacity: 0, y: "-8%" }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-background text-foreground"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-architectural-grid"
          />

          <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 sm:p-8 lg:p-12">
            {/* Top Telemetry Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <div className="flex items-center gap-3">
                <BrandLogo size={30} className="shrink-0" />
                <span className="font-semibold text-foreground">
                  VM // STUDIO BOOT SEQUENCE
                </span>
                <span className="hidden text-muted sm:inline">LAT -7.706 · LON 114.009</span>
              </div>

              <button
                type="button"
                onClick={handleEnterNow}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-border-strong bg-surface px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:border-primary hover:text-primary"
              >
                <span>Enter Studio</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Center Architectural Identity & Deterministic Pipeline */}
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3.5">
                  <BrandLogo size={52} className="shrink-0" />
                  <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary-soft px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Full-Stack × AI-Assisted &amp; AI-Augmented Engineering</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-heading text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    M. Vicky Mosafan
                  </p>
                  <p className="font-heading text-lg font-medium text-ink-secondary sm:text-2xl">
                    Full-Stack Developer building with{" "}
                    <span className="text-primary">AI-Assisted Software Engineering</span>{" "}
                    &amp;{" "}
                    <span className="text-accent">AI-Augmented Architecture</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    Deterministic PRDs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Craftrig MCP (45+ Tools)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                    Hybrid &amp; Agentic RAG
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border border-border-strong bg-surface p-5 shadow-xl">
                  <div className="mb-4 flex items-center justify-between border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                    <span className="text-muted">RUNTIME // CRAFTRIG MCP RIG</span>
                    <span
                      ref={pctRef}
                      className="min-w-[4ch] text-right font-bold text-primary tabular-nums"
                    >
                      000%
                    </span>
                  </div>

                  <ol className="space-y-3">
                    {BOOT_PIPELINE.map((item, idx) => {
                      const done = stageLevel > idx;
                      const active = stageLevel === idx;
                      return (
                        <li
                          key={item.code}
                          className={`flex items-start justify-between gap-3 border-l-2 pl-3 transition-colors duration-150 ${
                            done
                              ? "border-primary text-foreground"
                              : active
                              ? "border-accent text-ink-secondary"
                              : "border-border text-muted/60"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="font-mono text-xs font-semibold tracking-wider">
                              [{item.code}] {item.label}
                            </div>
                            <div className="mt-0.5 font-mono text-[11px] text-muted">
                              {item.detail}
                            </div>
                          </div>
                          <span
                            className={`shrink-0 px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase ${
                              done
                                ? "bg-primary text-primary-foreground"
                                : active
                                ? "bg-accent-soft text-accent"
                                : "text-muted/50"
                            }`}
                          >
                            {done ? "OK" : active ? "SYNC" : "WAIT"}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>

            {/* Bottom Precision Progress Rail */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                <span>Initializing interactive 3D &amp; motion architecture</span>
                <span ref={statusRef} className="tabular-nums text-foreground">
                  Compiling scene graph...
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-surface-elevated">
                <div
                  ref={barRef}
                  className="h-full origin-left bg-primary"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
