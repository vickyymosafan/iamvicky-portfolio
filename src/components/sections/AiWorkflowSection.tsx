"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Cpu, Terminal, Wrench } from "lucide-react";
import { AI_WORKFLOW_STAGES } from "@/data/portfolio";
import {
  ARCHITECTURAL_EASE,
  SectionHeader,
  useHorizontalScrollHints,
} from "@/components/motion/MotionPrimitives";

export function AiWorkflowSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const stage = AI_WORKFLOW_STAGES[activeIdx];
  const stepScrollerRef = useRef<HTMLDivElement>(null);

  useHorizontalScrollHints(stepScrollerRef, AI_WORKFLOW_STAGES.length);

  return (
    <section
      id="ai-workflow"
      className="relative border-t border-border bg-surface/45 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="02"
          eyebrow="AI-Augmented Software Engineering"
          title="Deterministic workflow. Autonomous velocity."
          description="AI coding agents work best inside strict architectural boundaries. Explore the 5-stage deterministic pipeline governing Claude Code, Google Antigravity, custom MCP servers, and automated QA."
        />

        {/* Architectural Hairline Connected Pipeline Rail (Anti-Template Stepper) */}
        <div className="mt-10 border border-border bg-surface/90">
          <div
            ref={stepScrollerRef}
            role="tablist"
            aria-label="AI-augmented engineering workflow stages"
            className="horizontal-snap-track lg:grid lg:grid-cols-5 lg:overflow-visible"
          >
            {AI_WORKFLOW_STAGES.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex min-h-24 w-[76%] shrink-0 snap-start flex-col justify-between border-r border-border p-4 text-left transition-colors sm:w-[46%] lg:w-auto lg:last:border-r-0 cursor-pointer ${
                    isSelected
                      ? "bg-primary-soft/75 text-foreground"
                      : "bg-transparent hover:bg-surface-elevated/60"
                  }`}
                >
                  {isSelected ? (
                    <motion.span
                      layoutId="ai-workflow-active-bar"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      className="absolute inset-x-0 top-0 h-[3px] bg-primary"
                    />
                  ) : null}

                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span className={isSelected ? "font-bold text-primary" : "text-muted"}>
                      STAGE // {item.step}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected ? "bg-primary" : "bg-border-strong"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-2 font-heading text-sm font-bold text-foreground sm:text-base">
                    {item.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Connected Deep-Dive Workbench (Integrated Blueprint Panel — Zero Floating Card Clutter) */}
          <div className="border-t border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left Specification Panel */}
                <div className="flex flex-col justify-between space-y-6 p-6 sm:p-8 lg:col-span-6 lg:border-r lg:border-border">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 border-l-2 border-primary bg-primary-soft px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        Stage {stage.step} / 0{AI_WORKFLOW_STAGES.length}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {stage.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
                      {stage.tagline}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                      {stage.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Core Tooling</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.tools.map((tool) => (
                          <span
                            key={tool}
                            className="border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs font-medium text-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 border-l-2 border-sage bg-sage-soft/45 p-3.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                        aria-hidden="true"
                      />
                      <p className="text-xs leading-relaxed text-foreground sm:text-sm">
                        <strong className="font-semibold">Engineering Outcome: </strong>
                        {stage.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Live Blueprint Terminal Readout */}
                <div className="flex flex-col bg-[#0c1014] text-[#e8edf1] lg:col-span-6">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#12181e] px-5 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Terminal
                        className="h-4 w-4 shrink-0 text-[#c8f53c]"
                        aria-hidden="true"
                      />
                      <span className="truncate font-mono text-xs font-medium text-zinc-200">
                        {stage.artifactTitle}
                      </span>
                    </div>
                    <span className="shrink-0 bg-white/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-[#56ccf2]">
                      {stage.artifactLanguage}
                    </span>
                  </div>

                  <div
                    tabIndex={0}
                    role="region"
                    aria-label={`${stage.artifactTitle} engineering blueprint code snippet`}
                    className="flex-1 overflow-x-auto p-5 font-mono text-xs leading-6 sm:text-[13px] sm:leading-7"
                  >
                    <pre className="m-0">
                      <code>
                        {stage.artifactLines.map((line, i) => (
                          <div key={line} className="flex gap-4">
                            <span
                              aria-hidden="true"
                              className="w-5 shrink-0 select-none text-right text-zinc-500"
                            >
                              {i + 1}
                            </span>
                            <span className="text-zinc-100">{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 bg-[#12181e]/85 px-5 py-2.5 font-mono text-[11px] text-zinc-400">
                    <span>Deterministic Contract · MCP Enforced</span>
                    <span className="text-[#4ade80]">● Active Pipeline</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
