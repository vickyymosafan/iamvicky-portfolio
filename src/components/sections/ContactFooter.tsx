"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  TrendingUp,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

/**
 * Calm, Static Architectural Contact Footer (ZERO Scroll Reveal Animations):
 * Continues the serene static reading flow from Education & Certifications down to page end.
 */
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
    <footer id="contact" className="relative border-t border-border bg-surface/35 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative border border-border-strong bg-surface p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 border-l-2 border-primary bg-primary-soft px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <span className="h-2 w-2 rounded-full bg-sage" aria-hidden="true" />
                <span>05 / Ready for Full-Stack &amp; AI-Augmented Teams</span>
              </div>

              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.06]">
                Let&apos;s build reliable, fast software together.
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                Actively seeking an entry-level Full-Stack, Frontend, or Backend Developer
                role — or high-impact engineering collaborations. Reach out directly via
                email, phone, or LinkedIn.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex min-h-12 items-center gap-2 bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{PROFILE.email}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-12 items-center gap-2 border border-border-strong bg-surface-elevated px-4 py-3 font-mono text-xs font-semibold text-foreground hover:border-primary hover:text-primary cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-sage" aria-hidden="true" />
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
                  className="inline-flex min-h-12 items-center gap-2 border border-border bg-background px-4 py-3 font-mono text-xs font-semibold text-ink-secondary hover:border-primary hover:text-foreground"
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
                className="flex min-h-12 items-center justify-between border border-border bg-surface-elevated/60 px-4 py-3 text-sm text-foreground hover:border-primary"
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
                  className="flex min-h-12 items-center justify-between border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
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
                  className="flex min-h-12 items-center justify-between border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.socials.mql5}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" aria-hidden="true" />
                    <span>MQL5 (5.0★)</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.socials.googleSkills}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between border border-border bg-surface-elevated/60 px-4 py-3 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  <span>Google Skills</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {PROFILE.fullName} · Built with Next.js 16,
            React 19, Three.js, GSAP &amp; Lenis.
          </p>
          <button
            type="button"
            onClick={() => scrollTo(0, 0)}
            className="inline-flex min-h-11 items-center gap-1.5 border border-border bg-surface px-3.5 py-2 text-foreground hover:border-primary hover:text-primary cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
