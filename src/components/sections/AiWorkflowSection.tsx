"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Eye,
  Terminal,
  Wrench,
} from "lucide-react";
import { AI_WORKFLOW_STAGES, ConsoleLine } from "@/data/portfolio";
import {
  ARCHITECTURAL_EASE,
  SectionHeader,
  useHorizontalScrollHints,
} from "@/components/motion/MotionPrimitives";

export function AiWorkflowSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"readable" | "raw">("readable");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const stage = AI_WORKFLOW_STAGES[activeIdx];
  const stepScrollerRef = useRef<HTMLDivElement>(null);

  useHorizontalScrollHints(stepScrollerRef, AI_WORKFLOW_STAGES.length);

  const handleCopyCommand = async () => {
    const payload =
      viewMode === "raw"
        ? stage.artifactLines.join("\n")
        : stage.command;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedId(stage.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard fallback unavailable
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % AI_WORKFLOW_STAGES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIdx(
        (prev) => (prev - 1 + AI_WORKFLOW_STAGES.length) % AI_WORKFLOW_STAGES.length
      );
    }
  };

  const isCopied = copiedId === stage.id;

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
          description="AI coding agents work best inside strict architectural boundaries. Step through the 5-stage pipeline governing Claude Code, Google Antigravity, Craftrig MCP (vickyymosafan/mcp-craftrig), and BuildFlow ERP."
        />

        {/* Architectural Connected 5-Stage Pipeline Workbench */}
        <div className="mt-10 border border-border-strong bg-surface/95 shadow-xl">
          {/* Interactive Stage Tab Rail */}
          <div
            ref={stepScrollerRef}
            role="tablist"
            aria-label="AI-augmented engineering workflow stages"
            onKeyDown={handleTabKeyDown}
            className="horizontal-snap-track lg:grid lg:grid-cols-5 lg:overflow-visible"
          >
            {AI_WORKFLOW_STAGES.map((item, idx) => {
              const isSelected = idx === activeIdx;
              const isCompleted = idx < activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex min-h-24 w-[76%] shrink-0 snap-start flex-col justify-between border-r border-border p-4 text-left transition-colors sm:w-[46%] lg:w-auto lg:last:border-r-0 cursor-pointer ${
                    isSelected
                      ? "bg-primary-soft/80 text-foreground"
                      : "bg-transparent hover:bg-surface-elevated/60"
                  }`}
                >
                  {isSelected ? (
                    <motion.span
                      layoutId="ai-workflow-active-bar"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-x-0 top-0 h-[3px] bg-primary"
                    />
                  ) : null}

                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span
                      className={
                        isSelected
                          ? "font-bold text-primary"
                          : isCompleted
                          ? "font-semibold text-sage"
                          : "text-muted"
                      }
                    >
                      STAGE // {item.step}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected
                          ? "bg-primary"
                          : isCompleted
                          ? "bg-sage"
                          : "bg-border-strong"
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

          {/* Connected Two-Pane Deep-Dive Workbench */}
          <div className="border-t border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left 6 Cols: Human-Readable Engineering Specification */}
                <div className="flex min-w-0 flex-col justify-between space-y-6 p-5 sm:p-8 lg:col-span-6 lg:border-r lg:border-border">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 border-l-2 border-primary bg-primary-soft px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          Stage {stage.step} / 0{AI_WORKFLOW_STAGES.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIdx(
                              (prev) =>
                                (prev - 1 + AI_WORKFLOW_STAGES.length) %
                                AI_WORKFLOW_STAGES.length
                            )
                          }
                          aria-label="Previous workflow stage"
                          className="inline-flex h-9 w-9 items-center justify-center border border-border bg-surface-elevated text-foreground hover:border-primary hover:text-primary cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIdx(
                              (prev) => (prev + 1) % AI_WORKFLOW_STAGES.length
                            )
                          }
                          aria-label="Next workflow stage"
                          className="inline-flex h-9 w-9 items-center justify-center border border-border bg-surface-elevated text-foreground hover:border-primary hover:text-primary cursor-pointer"
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
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

                    {/* Plain-English 3-Step Flow Summary (Effortless to Scan) */}
                    <dl className="grid grid-cols-1 gap-2.5 border border-border bg-surface-elevated/45 p-4 text-xs sm:text-[13px]">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                        <dt className="w-20 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
                          1. Input
                        </dt>
                        <dd className="text-foreground leading-relaxed">
                          {stage.readableFlow.input}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-0.5 border-t border-border/60 pt-2 sm:flex-row sm:items-baseline sm:gap-3">
                        <dt className="w-20 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                          2. Engine
                        </dt>
                        <dd className="text-foreground leading-relaxed">
                          {stage.readableFlow.process}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-0.5 border-t border-border/60 pt-2 sm:flex-row sm:items-baseline sm:gap-3">
                        <dt className="w-20 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider text-sage">
                          3. Proof
                        </dt>
                        <dd className="text-foreground leading-relaxed">
                          {stage.readableFlow.verified}
                        </dd>
                      </div>
                    </dl>
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

                {/* Right 6 Cols: Redesigned UX-Friendly Interactive Command Prompt Console */}
                <div className="flex min-w-0 flex-col overflow-hidden bg-[#0b1015] text-[#eef3f7] lg:col-span-6">
                  {/* Console Window Chrome + Readable/Raw Switcher + Copy Action */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#121920] px-4 py-3 sm:px-5">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#f5b942]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#56ccf2]/80" />
                      </div>
                      <Terminal
                        className="ml-1 h-4 w-4 shrink-0 text-[#c8f53c]"
                        aria-hidden="true"
                      />
                      <span className="truncate font-mono text-xs font-semibold text-white">
                        {stage.terminalTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* View Toggle: Guided Readable Output vs Raw Code */}
                      <div
                        className="inline-flex border border-white/15 bg-[#0b1015] p-0.5 font-mono text-[11px]"
                        role="group"
                        aria-label="Console output display format"
                      >
                        <button
                          type="button"
                          onClick={() => setViewMode("readable")}
                          className={`inline-flex min-h-8 items-center gap-1 px-2.5 py-1 transition-colors cursor-pointer ${
                            viewMode === "readable"
                              ? "bg-[#c8f53c] font-bold text-[#0b1015]"
                              : "text-zinc-300 hover:text-white"
                          }`}
                        >
                          <Eye className="h-3 w-3" aria-hidden="true" />
                          <span>Guided</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode("raw")}
                          className={`inline-flex min-h-8 items-center gap-1 px-2.5 py-1 transition-colors cursor-pointer ${
                            viewMode === "raw"
                              ? "bg-[#56ccf2] font-bold text-[#0b1015]"
                              : "text-zinc-300 hover:text-white"
                          }`}
                        >
                          <Code2 className="h-3 w-3" aria-hidden="true" />
                          <span>Raw</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyCommand}
                        aria-label={isCopied ? "Command copied" : "Copy command"}
                        className="inline-flex min-h-9 items-center gap-1.5 border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-100 hover:border-[#c8f53c] hover:text-[#c8f53c] cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#4ade80]" aria-hidden="true" />
                            <span className="text-[#4ade80]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Active Command Prompt Bar — Crisp, High-Contrast, Word-Wrapped for Mobile Readability */}
                  <div className="border-b border-white/10 bg-[#0f161d] px-4 py-3.5 sm:px-5">
                    <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                      <span>COMMAND PROMPT · {stage.artifactTitle}</span>
                      <span className="text-[#56ccf2] font-semibold">
                        {stage.artifactLanguage}
                      </span>
                    </div>
                    <div className="flex min-w-0 items-start gap-2.5 font-mono text-xs leading-relaxed sm:text-[13px]">
                      <span
                        aria-hidden="true"
                        className="shrink-0 select-none font-bold text-[#c8f53c]"
                      >
                        $
                      </span>
                      <code className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] font-medium text-white">
                        {stage.command}
                      </code>
                    </div>
                  </div>

                  {/* Console Body: Guided Structured Readout OR Clean Raw Code */}
                  <div
                    tabIndex={0}
                    role="region"
                    aria-label={`${stage.title} console execution output`}
                    className="flex-1 p-4 sm:p-5"
                  >
                    {viewMode === "readable" ? (
                      <ul className="space-y-2.5">
                        {stage.consoleLines.map((line, idx) => (
                          <ConsoleOutputRow key={`${stage.id}-${idx}`} line={line} />
                        ))}
                      </ul>
                    ) : (
                      <div className="overflow-x-auto border border-white/10 bg-[#080c10] p-4 font-mono text-xs leading-7 sm:text-[13px]">
                        <pre className="m-0">
                          <code>
                            {stage.artifactLines.map((line, i) => (
                              <div key={line} className="flex gap-3.5">
                                <span
                                  aria-hidden="true"
                                  className="w-5 shrink-0 select-none text-right text-zinc-500"
                                >
                                  {i + 1}
                                </span>
                                <span
                                  className={
                                    line.startsWith("$")
                                      ? "font-semibold text-[#c8f53c]"
                                      : line.startsWith("//") || line.startsWith("#")
                                      ? "text-zinc-400"
                                      : line.startsWith("[PASS]")
                                      ? "text-[#4ade80]"
                                      : "text-zinc-100"
                                  }
                                >
                                  {line}
                                </span>
                              </div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Bottom Telemetry Footer + Quick Next Stage Trigger */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#121920] px-4 py-3 font-mono text-[11px] sm:px-5">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-[#4ade80]"
                        aria-hidden="true"
                      />
                      <span>{stage.statusLine}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveIdx((prev) => (prev + 1) % AI_WORKFLOW_STAGES.length)
                      }
                      className="inline-flex min-h-8 items-center gap-1 font-semibold text-[#c8f53c] hover:underline cursor-pointer"
                    >
                      <span>
                        {activeIdx < AI_WORKFLOW_STAGES.length - 1
                          ? `Next: ${AI_WORKFLOW_STAGES[activeIdx + 1].shortTitle}`
                          : "Restart Pipeline"}
                      </span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {isCopied ? "Command copied to clipboard." : ""}
      </span>
    </section>
  );
}

function ConsoleOutputRow({ line }: { line: ConsoleLine }) {
  if (line.kind === "comment") {
    return (
      <li className="font-mono text-xs leading-relaxed text-zinc-400">
        {line.value}
      </li>
    );
  }

  if (line.kind === "pass") {
    return (
      <li className="flex flex-col gap-1.5 border-l-2 border-[#4ade80] bg-[#4ade80]/10 px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-3">
        <span className="inline-flex w-fit shrink-0 items-center gap-1 bg-[#4ade80] px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-[#08100c]">
          ✓ {line.label ?? "PASS"}
        </span>
        <span className="font-mono text-xs leading-relaxed text-white sm:text-[13px]">
          {line.value}
        </span>
      </li>
    );
  }

  if (line.kind === "metric") {
    return (
      <li className="flex flex-col gap-1.5 border-l-2 border-[#f5b942] bg-[#f5b942]/10 px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-3">
        <span className="inline-flex w-fit shrink-0 bg-[#f5b942] px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-[#110d04]">
          {line.label ?? "METRIC"}
        </span>
        <span className="font-mono text-xs leading-relaxed text-white sm:text-[13px]">
          {line.value}
        </span>
      </li>
    );
  }

  if (line.kind === "code") {
    return (
      <li className="overflow-x-auto border border-white/10 bg-[#080c10] px-3.5 py-2 font-mono text-xs leading-relaxed text-[#c8f53c] sm:text-[13px]">
        <code>{line.value}</code>
      </li>
    );
  }

  return (
    <li className="flex min-w-0 flex-col gap-1 border border-white/10 bg-white/[0.03] px-3.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-3">
      {line.label ? (
        <span className="w-28 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider text-[#56ccf2]">
          {line.label}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] font-mono text-xs leading-relaxed text-zinc-100 sm:text-[13px]">
        {line.value}
      </span>
    </li>
  );
}
