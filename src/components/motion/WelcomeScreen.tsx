"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Cpu, Layers, ShieldCheck, Terminal } from "lucide-react";
import { useAudioGate } from "@/components/providers/AudioGateProvider";

const BOOT_PIPELINE = [
  {
    code: "01",
    label: "DETERMINISTIC PRD",
    detail: "OpenAPI · ERD · RBAC Contracts",
    threshold: 22,
  },
  {
    code: "02",
    label: "AI-ASSISTED ORCHESTRATION",
    detail: "Claude Code × Google Antigravity",
    threshold: 50,
  },
  {
    code: "03",
    label: "MCP HARNESS & HYBRID RAG",
    detail: "43+ Tools · 91.67% Recall · 694ms",
    threshold: 78,
  },
  {
    code: "04",
    label: "FULL-STACK STUDIO READY",
    detail: "Next.js 16 · NestJS · PostgreSQL",
    threshold: 98,
  },
] as const;

export function WelcomeScreen() {
  const { welcomeVisible, dismissWelcome, unlockAudio } = useAudioGate();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef<number | null>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (!welcomeVisible) {
      dismissedRef.current = false;
      return;
    }

    dismissedRef.current = false;

    const startTime = performance.now();
    const duration = 2150;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out-in progression
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pct = Math.min(100, Math.round(eased * 100));
      setProgress(pct);

      if (t < 1 && !dismissedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!dismissedRef.current) {
        dismissedRef.current = true;
        setExiting(true);
        window.setTimeout(() => {
          dismissWelcome();
          setExiting(false);
          setProgress(0);
        }, 560);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        unlockAudio();
        if (!dismissedRef.current) {
          dismissedRef.current = true;
          setProgress(100);
          setExiting(true);
          window.setTimeout(() => {
            dismissWelcome();
            setExiting(false);
            setProgress(0);
          }, 420);
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
    };
  }, [welcomeVisible, dismissWelcome, unlockAudio]);

  const handleEnterNow = () => {
    unlockAudio();
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setProgress(100);
    setExiting(true);
    window.setTimeout(() => {
      dismissWelcome();
    }, 420);
  };

  return (
    <AnimatePresence>
      {welcomeVisible ? (
        <motion.div
          key="welcome-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to M. Vicky Mosafan Full-Stack & AI-Augmented Engineering Portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-background text-foreground"
        >
          {/* Upper & Lower Architectural Split Shutters */}
          <motion.div
            aria-hidden="true"
            animate={{ y: exiting ? "-102%" : "0%" }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 border-b border-border-strong/50 bg-background"
          />
          <motion.div
            aria-hidden="true"
            animate={{ y: exiting ? "102%" : "0%" }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 border-t border-border-strong/50 bg-background"
          />

          {/* Subtle Precision Blueprint Grid & Corner Crosshairs */}
          <motion.div
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full w-full flex-col justify-between bg-architectural-grid p-5 sm:p-8 lg:p-12"
          >
            {/* Top Telemetry Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span className="text-foreground font-semibold">VM // STUDIO BOOT SEQUENCE</span>
                <span className="hidden text-muted sm:inline">LAT -7.706 · LON 114.009</span>
              </div>

              <button
                type="button"
                onClick={handleEnterNow}
                className="inline-flex min-h-11 items-center gap-2 border border-border-strong bg-surface px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:border-primary hover:text-primary cursor-pointer"
              >
                <span>Enter Studio</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Center Architectural Identity & Deterministic Pipeline */}
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12">
              {/* Left 7 Cols: Signature Full-Stack × AI-Augmented Typography */}
              <div className="space-y-5 lg:col-span-7">
                <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary-soft px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Full-Stack × AI-Assisted &amp; AI-Augmented Engineering</span>
                </div>

                <div className="space-y-2">
                  <div className="overflow-hidden">
                    <motion.h1
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[0.98]"
                    >
                      M. Vicky Mosafan
                    </motion.h1>
                  </div>

                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="font-heading text-lg font-medium text-ink-secondary sm:text-2xl"
                    >
                      Full-Stack Developer building with{" "}
                      <span className="text-primary">AI-Assisted Software Engineering</span>{" "}
                      &amp;{" "}
                      <span className="text-accent">AI-Augmented Architecture</span>
                    </motion.p>
                  </div>
                </div>

                {/* Tactile Capability Strip */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    Deterministic PRDs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    43+ Custom MCP Tools
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                    Hybrid &amp; Agentic RAG
                  </span>
                </div>
              </div>

              {/* Right 5 Cols: Live Deterministic Boot Telemetry Readout */}
              <div className="lg:col-span-5">
                <div className="border border-border-strong bg-surface/90 p-5 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                    <span className="text-muted">RUNTIME // AGENTIC HARNESS</span>
                    <span className="font-bold text-primary tabular-nums min-w-[4ch] text-right">
                      {String(progress).padStart(3, "0")}%
                    </span>
                  </div>

                  <ol className="space-y-3">
                    {BOOT_PIPELINE.map((item) => {
                      const active = progress >= item.threshold - 16;
                      const done = progress >= item.threshold;
                      return (
                        <li
                          key={item.code}
                          className={`flex items-start justify-between gap-3 border-l-2 pl-3 transition-colors duration-200 ${
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
                            className={`shrink-0 font-mono text-[11px] font-bold uppercase px-1.5 py-0.5 ${
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
                <span className="tabular-nums text-foreground">
                  {progress < 100 ? "Compiling scene graph..." : "Ready — opening shutter"}
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-surface-elevated">
                <div
                  className="h-full origin-left bg-primary transition-transform duration-75"
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
