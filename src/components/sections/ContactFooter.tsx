"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  FileDown,
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionBackdrop } from "@/components/ui/StudioBackdrop";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <footer
      id="contact"
      className="cv-auto-footer relative z-10 border-t border-border py-16 sm:py-24"
    >
      <SectionBackdrop variant="contact" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="studio-card-featured relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12">
          {/* Subtle Ambient Corner Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-45"
            style={{
              background:
                "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary-soft px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>06 / Let&apos;s Work Together</span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Let&apos;s build fast, dependable{" "}
                <span className="text-primary">software together.</span>
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                B.S. in Information Systems, Universitas Muhammadiyah Jember (GPA 3.94/4.00).
                Open to Full-Stack, Frontend, or Backend Developer opportunities where clean
                architecture and practical AI workflows go hand in hand.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="cta-glow inline-flex min-h-12 max-w-full items-center gap-2 rounded-full bg-primary px-4 py-3 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover sm:px-6 sm:text-sm"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{PROFILE.email}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-5 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE.cvPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-mono text-xs font-semibold text-ink-secondary hover:border-primary hover:text-foreground"
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>

              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard." : ""}
              </span>
            </div>

            {/* Right Direct Channels */}
            <div className="space-y-3 lg:col-span-5">
              <a
                href={PROFILE.phoneHref}
                className="flex min-h-12 items-center justify-between rounded-2xl border border-border bg-surface-elevated/60 px-4 py-3 text-sm text-foreground hover:border-primary"
              >
                <span className="flex items-center gap-2.5 font-mono text-xs">
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>{PROFILE.phone}</span>
                </span>
                <span className="font-mono text-[11px] text-muted">Situbondo, ID</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between rounded-2xl border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between rounded-2xl border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.socials.craftrig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between rounded-2xl border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Craftrig MCP</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.socials.portfolio3d}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between rounded-2xl border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span>3D Portfolio</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row">
          <div className="flex items-center gap-3">
            <BrandLogo size={34} className="shrink-0" />
            <p>
              &copy; {new Date().getFullYear()} {PROFILE.fullName} · Built with Next.js 16,
              React 19, Tailwind CSS 4 &amp; Framer Motion.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollTo(0, 0)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-2 text-foreground hover:border-primary hover:text-primary"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
