"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  FileDown,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "ai-workflow", label: "AI Workflow" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack & Bio" },
  { id: "contact", label: "Contact" },
] as const;

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...NAV_ITEMS.map((item) => item.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(`#${id}`, -78);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-[var(--surface-translucent)] backdrop-blur-md py-2.5"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        {/* Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg pr-2 text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong bg-surface font-mono text-xs font-bold text-primary group-hover:border-primary">
            VM
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-bold tracking-tight sm:text-[15px]">
              {PROFILE.displayName}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:block">
              Full-Stack × AI-Augmented
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-xl border border-border bg-surface/85 p-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`relative rounded-lg px-3.5 py-2 font-mono text-xs font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-primary"
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-2">
          {/* Friendly Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open quick navigation command palette"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs font-medium text-ink-secondary hover:border-primary hover:text-foreground cursor-pointer"
          >
            <Command className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-[11px] text-muted md:inline">
              Ctrl K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light editorial theme" : "Switch to dark obsidian theme"
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:border-primary hover:text-primary cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {/* Direct CV CTA (Desktop) */}
          <a
            href={PROFILE.cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover md:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
            <span>CV PDF</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:border-primary lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
            className="mx-5 mt-3 rounded-2xl border border-border bg-surface p-4 shadow-2xl sm:mx-8 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-2.5 font-mono text-sm font-medium ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground hover:bg-surface-elevated"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs opacity-70">↗</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 border-t border-border pt-3">
              <a
                href={PROFILE.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                <span>Download Full CV (PDF)</span>
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
