"use client";

import { ArchitectureNode } from "@/data/portfolio";
import { ArrowRight, Cpu, Database, Layers, Monitor } from "lucide-react";

const LAYER_STYLES: Record<
  ArchitectureNode["layer"],
  {
    badgeBg: string;
    badgeText: string;
    label: string;
    Icon: typeof Monitor;
  }
> = {
  client: {
    badgeBg: "bg-accent-soft",
    badgeText: "text-accent",
    label: "UI",
    Icon: Monitor,
  },
  orchestration: {
    badgeBg: "bg-primary-soft",
    badgeText: "text-primary",
    label: "API",
    Icon: Layers,
  },
  ai: {
    badgeBg: "bg-amber-soft",
    badgeText: "text-amber",
    label: "AI",
    Icon: Cpu,
  },
  data: {
    badgeBg: "bg-surface-elevated",
    badgeText: "text-foreground",
    label: "DATA",
    Icon: Database,
  },
};

interface ProjectArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

export function ProjectArchitectureDiagram({ nodes }: ProjectArchitectureDiagramProps) {
  return (
    <div
      className="rounded-xl border border-border bg-surface-elevated/70 p-3.5 sm:p-4"
      aria-label="System architecture pipeline"
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          System Pipeline
        </span>
        <span className="font-mono text-[11px] text-muted">{nodes.length} stages</span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {nodes.map((node, idx) => {
          const style = LAYER_STYLES[node.layer];
          const Icon = style.Icon;
          return (
            <div
              key={node.id}
              className="relative flex items-start gap-2.5 rounded-lg border border-border bg-surface/95 p-2.5"
            >
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${style.badgeBg} ${style.badgeText}`}
                aria-hidden="true"
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                    0{idx + 1} · {style.label}
                  </span>
                  {idx < nodes.length - 1 ? (
                    <ArrowRight
                      className="h-3 w-3 shrink-0 text-muted/70"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <p className="mt-0.5 truncate text-xs font-semibold text-foreground">
                  {node.label}
                </p>
                <p className="truncate font-mono text-[11px] text-muted">{node.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
