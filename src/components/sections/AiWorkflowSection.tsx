"use client";

import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  FileCode2,
  FolderOpen,
  Github,
  Play,
  Terminal,
} from "lucide-react";
import { AI_WORKFLOW_STAGES, PROFILE } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";
import { SectionBackdrop } from "@/components/ui/StudioBackdrop";

const INSPECTOR_TABS = ["Code", "Console", "Flow", "Outcome"] as const;
type InspectorTab = (typeof INSPECTOR_TABS)[number];

const IDE_TREE = [
  { name: "src/", indent: 0, folder: true },
  { name: "blueprints/", indent: 1, folder: true },
  { name: "mcp-rig/", indent: 1, folder: true },
  { name: "rag-engine/", indent: 1, folder: true },
  { name: "qa-playwright/", indent: 1, folder: true },
  { name: "pipeline.ts", indent: 1, folder: false, active: true },
  { name: "package.json", indent: 0, folder: false },
] as const;

export function AiWorkflowSection() {
  const { scrollTo } = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<InspectorTab>("Code");
  const [copied, setCopied] = useState(false);

  const stage = AI_WORKFLOW_STAGES[activeIndex];
  const nextIndex = (activeIndex + 1) % AI_WORKFLOW_STAGES.length;
  const prevIndex = (activeIndex - 1 + AI_WORKFLOW_STAGES.length) % AI_WORKFLOW_STAGES.length;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(stage.artifactLines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="workflow"
      className="cv-auto-section relative scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      {/* Reference-Matched Diagonal Orbital Ribbon & Glow Backdrop */}
      <SectionBackdrop variant="workflow" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
        {/* ================================================================
            TOP HERO SPLIT (Modeled after redesign-section-2.png)
           ================================================================ */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <m.div
            initial={{ y: 14 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
            className="space-y-6 lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span>02 / How I Build</span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
              Structured workflow.{" "}
              <span className="text-primary">Predictable delivery.</span>
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-ink-secondary">
              Fast software only stays dependable when built inside clear boundaries. Step
              through the 5-stage engineering pipeline I use across BuildFlow ERP, Hybrid
              RAG, and Craftrig MCP.
            </p>

            <div className="flex flex-wrap gap-2">
              {stage.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border-strong bg-surface px-3.5 py-1.5 font-mono text-xs font-medium text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://github.com/vickyymosafan/mcp-craftrig"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-glow inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover sm:text-sm"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>View Craftrig Repo</span>
              </a>

              <a
                href="#film"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#film", -80);
                }}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary sm:text-sm"
              >
                <Play className="h-3.5 w-3.5 fill-current text-primary" aria-hidden="true" />
                <span>Watch Walkthrough</span>
              </a>
            </div>
          </m.div>

          {/* Right Live 3D-Tilted Obsidian IDE Visual + Floating Glass Cubes (Matches redesign-section-2.png) */}
          <m.div
            initial={{ y: 14 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.48, delay: 0.06, ease: ARCHITECTURAL_EASE }}
            className="relative lg:col-span-6"
          >
            {/* Glowing Orbital Ring + Floating Translucent Glass Cubes Behind/Around IDE */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 360"
              className="pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-85"
              fill="none"
            >
              <defs>
                <linearGradient id="ide-ring-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.18" />
                  <stop offset="48%" stopColor="var(--orb-highlight)" stopOpacity="0.82" />
                  <stop offset="82%" stopColor="var(--accent)" stopOpacity="0.58" />
                  <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0.16" />
                </linearGradient>
              </defs>
              <ellipse
                cx="300"
                cy="185"
                rx="276"
                ry="92"
                transform="rotate(-10 300 185)"
                stroke="url(#ide-ring-grad)"
                strokeWidth="1.6"
              />
              {/* Floating isometric frosted glass cube 1 (left-bottom) */}
              <g transform="translate(22, 198)" opacity="0.82">
                <polygon points="18,0 36,10 18,20 0,10" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth="1" />
                <polygon points="0,10 18,20 18,40 0,30" fill="rgba(14,19,30,0.85)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <polygon points="36,10 18,20 18,40 36,30" fill="rgba(245,166,35,0.18)" stroke="rgba(245,166,35,0.55)" strokeWidth="1" />
              </g>
              {/* Floating isometric frosted glass cube 2 (top-right) */}
              <g transform="translate(534, 92)" opacity="0.82">
                <polygon points="16,0 32,9 16,18 0,9" fill="rgba(245,166,35,0.26)" stroke="#f5a623" strokeWidth="1" />
                <polygon points="0,9 16,18 16,36 0,27" fill="rgba(14,19,30,0.85)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <polygon points="32,9 16,18 16,36 32,27" fill="rgba(56,189,248,0.20)" stroke="rgba(56,189,248,0.55)" strokeWidth="1" />
              </g>
            </svg>

            <div className="relative overflow-hidden rounded-2xl border border-primary/65 bg-[#0b0e15] text-[#f5f6f8] shadow-[0_0_42px_-12px_var(--primary-glow)] transition-transform duration-500 lg:[transform:perspective(1200px)_rotateY(-8deg)_rotateX(3deg)] lg:hover:[transform:perspective(1200px)_rotateY(-2deg)_rotateX(1deg)]">
              {/* Blazing Top & Bottom Edge Rim Light Lines */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffe39e] to-transparent opacity-80"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-12 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5a623] to-transparent opacity-75"
              />
              {/* Editor Top Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#10141e] px-4 py-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#fb923c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f5a623]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
                </div>
                <span className="font-mono text-[11px] text-[#93a0b2]">
                  vicky-studio — {stage.terminalTitle}
                </span>
                <span className="rounded-full border border-[#f5a623]/40 bg-[#f5a623]/12 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#f5a623]">
                  Architecture
                </span>
              </div>

              {/* Split File Tree + Live Pipeline Code */}
              <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="hidden border-r border-white/10 bg-[#0d111a] p-4 font-mono text-[11px] sm:col-span-4 sm:block">
                  <ul className="space-y-1.5">
                    {IDE_TREE.map((node) => (
                      <li
                        key={node.name}
                        style={{ paddingLeft: `${node.indent * 12}px` }}
                        className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${
                          "active" in node && node.active
                            ? "bg-[#f5a623]/15 font-semibold text-[#f5a623]"
                            : "text-[#93a0b2]"
                        }`}
                      >
                        {node.folder ? (
                          <FolderOpen className="h-3.5 w-3.5 shrink-0 text-[#f5a623]/80" />
                        ) : (
                          <FileCode2 className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" />
                        )}
                        <span className="truncate">{node.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-x-auto p-5 font-mono text-xs leading-relaxed sm:col-span-8">
                  <div className="text-[#93a0b2]">{"// Deterministic delivery loop"}</div>
                  <div className="mt-1">
                    <span className="text-[#38bdf8]">export async function</span>{" "}
                    <span className="font-semibold text-[#f5a623]">shipFeature</span>
                    <span>(spec: Blueprint) {"{"}</span>
                  </div>
                  <div className="pl-4 text-[#cbd3de]">
                    <span className="text-[#38bdf8]">const</span> plan ={" "}
                    <span className="text-[#f5a623]">lockContracts</span>(spec);
                  </div>
                  <div className="pl-4 text-[#cbd3de]">
                    <span className="text-[#38bdf8]">const</span> build ={" "}
                    <span className="text-[#38bdf8]">await</span> executeModules(plan);
                  </div>
                  <div className="pl-4 text-[#cbd3de]">
                    <span className="text-[#38bdf8]">return</span> verifyQualityGate(build,{" "}
                    <span className="text-[#fb923c]">13</span>);
                  </div>
                  <div>{"}"}</div>
                  <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] text-[#38bdf8]">
                    <Terminal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{stage.statusLine}</span>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* ================================================================
            INTERACTIVE 2-COLUMN STAGE WORKBENCH (Modeled after redesign-section-2.png)
           ================================================================ */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left Narrative Card */}
          <div className="studio-card flex flex-col justify-between gap-6 rounded-2xl p-6 sm:p-7 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>STAGE {stage.step} / 05</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(prevIndex)}
                    aria-label="Previous workflow stage"
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-foreground hover:border-primary hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(nextIndex)}
                    aria-label="Next workflow stage"
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-foreground hover:border-primary hover:text-primary"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <m.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
                  className="space-y-3"
                >
                  <h3 className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-[26px]">
                    {stage.title}
                  </h3>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {stage.tagline}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    {stage.description}
                  </p>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Clean Input -> Verified Box */}
            <div className="space-y-2 rounded-xl border border-border bg-surface-elevated/60 p-4 font-mono text-xs">
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 font-bold text-primary">1. INPUT</span>
                <span className="text-ink-secondary">{stage.readableFlow.input}</span>
              </div>
              <div className="flex items-start gap-2.5 border-t border-border pt-2">
                <span className="shrink-0 font-bold text-accent">2. VERIFIED</span>
                <span className="text-foreground">{stage.readableFlow.verified}</span>
              </div>
            </div>
          </div>

          {/* Right Tabbed Artifact Viewer */}
          <div className="studio-card flex flex-col justify-between overflow-hidden rounded-2xl lg:col-span-7">
            {/* Top Tabs + Copy Button */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-elevated/55 px-4 py-3 sm:px-5">
              <div
                className="flex flex-wrap items-center gap-1"
                role="tablist"
                aria-label="Inspect stage artifacts"
              >
                {INSPECTOR_TABS.map((tab) => {
                  const active = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab)}
                      className={`min-h-9 cursor-pointer rounded-full px-3.5 py-1 font-mono text-xs font-semibold ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3.5 py-1 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Active Tab Body */}
            <div className="flex-1 bg-[#0b0e15] p-5 font-mono text-xs leading-relaxed text-[#f5f6f8] sm:p-6">
              {activeTab === "Code" ? (
                <div className="overflow-x-auto">
                  <ol className="space-y-1.5">
                    {stage.artifactLines.map((line, i) => (
                      <li key={`${stage.id}-line-${i}`} className="flex gap-4">
                        <span className="w-5 shrink-0 select-none text-right text-[#8b98ab]">
                          {i + 1}
                        </span>
                        <code
                          className={
                            line.startsWith("//") || line.startsWith("#")
                              ? "text-[#93a0b2]"
                              : line.startsWith("[PASS]")
                              ? "text-[#f5a623]"
                              : "text-[#e2e8f0]"
                          }
                        >
                          {line}
                        </code>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : activeTab === "Console" ? (
                <div className="space-y-2.5">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[#f5a623]">
                    $ {stage.command}
                  </div>
                  {stage.consoleLines.map((cl, i) => (
                    <div key={`${stage.id}-cl-${i}`} className="flex flex-wrap gap-2">
                      {cl.label ? (
                        <span
                          className={`font-bold ${
                            cl.kind === "pass"
                              ? "text-[#f5a623]"
                              : cl.kind === "metric"
                              ? "text-[#38bdf8]"
                              : "text-[#93a0b2]"
                          }`}
                        >
                          [{cl.label}]
                        </span>
                      ) : null}
                      <span className="text-[#cbd3de]">{cl.value}</span>
                    </div>
                  ))}
                </div>
              ) : activeTab === "Flow" ? (
                <div className="space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <span className="font-bold text-[#f5a623]">STEP 01 · INPUT</span>
                    <p className="mt-1 font-body text-sm text-[#e2e8f0]">
                      {stage.readableFlow.input}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <span className="font-bold text-[#38bdf8]">STEP 02 · PROCESS</span>
                    <p className="mt-1 font-body text-sm text-[#e2e8f0]">
                      {stage.readableFlow.process}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#f5a623]/35 bg-[#f5a623]/10 p-3.5">
                    <span className="font-bold text-[#f5a623]">STEP 03 · VERIFIED</span>
                    <p className="mt-1 font-body text-sm text-[#f5f6f8]">
                      {stage.readableFlow.verified}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="flex items-start gap-3 rounded-xl border border-[#f5a623]/35 bg-[#f5a623]/10 p-4">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#f5a623]"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5">
                      <div className="font-bold text-[#f5a623]">WHY THIS STAGE MATTERS</div>
                      <p className="font-body text-sm leading-relaxed text-[#f5f6f8]">
                        {stage.outcome}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#93a0b2]">
                    Author: {PROFILE.fullName} · Verified across shipped repositories.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom File Footer + Next Step CTA */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface-elevated/55 px-4 py-3 font-mono text-xs sm:px-5">
              <span className="inline-flex items-center gap-2 text-muted">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>{stage.terminalTitle}</span>
              </span>

              <button
                type="button"
                onClick={() => setActiveIndex(nextIndex)}
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                <span>
                  Next: {AI_WORKFLOW_STAGES[nextIndex].step} / 05 (
                  {AI_WORKFLOW_STAGES[nextIndex].shortTitle})
                </span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================
            BOTTOM 5-STEP CONNECTED TIMELINE RAIL (redesign-section-2.png)
           ================================================================ */}
        <div className="relative pt-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[22px] right-8 left-8 hidden h-px bg-border lg:block"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {AI_WORKFLOW_STAGES.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-current={active ? "step" : undefined}
                  className={`group relative flex cursor-pointer flex-col items-start gap-2 rounded-xl border p-3 text-left ${
                    active
                      ? "border-primary/60 bg-primary-soft/60"
                      : "border-border bg-surface/80 hover:border-border-strong"
                  }`}
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                      active
                        ? "border-primary bg-primary"
                        : "border-border-strong bg-background group-hover:border-primary"
                    }`}
                    aria-hidden="true"
                  >
                    {active ? <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" /> : null}
                  </span>
                  <div>
                    <div className="font-mono text-[11px] font-bold text-primary">
                      {item.step} / 05
                    </div>
                    <div className="mt-0.5 font-heading text-xs font-bold text-foreground sm:text-sm">
                      {item.shortTitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
