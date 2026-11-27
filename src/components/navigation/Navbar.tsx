"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Command, FileDown, Menu, Moon, Sun, X } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ARCHITECTURAL_EASE } from "@/components/motion/MotionPrimitives";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "workflow", label: "Workflow" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const SPY_MAP: ReadonlyArray<{ id: string; navId: string }> = [
      { id: "hero", navId: "hero" },
      { id: "about", navId: "about" },
      { id: "projects", navId: "projects" },
      { id: "archive", navId: "projects" },
      { id: "workflow", navId: "workflow" },
      { id: "experience", navId: "experience" },
      { id: "film", navId: "stack" },
      { id: "stack", navId: "stack" },
      { id: "contact", navId: "contact" },
    ];

    let rafId = 0;
    const updateActive = () => {
      rafId = 0;
      const offset = 150;
      let current = "hero";
      for (const entry of SPY_MAP) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = entry.navId;
        }
      }
      // At very bottom of page, always highlight Contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        current = "contact";
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(`#${id}`, id === "hero" ? 0 : -80);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b py-3 transition-colors duration-200 ${
        scrolled
          ? "border-border bg-background/95"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        {/* Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full pr-2 text-foreground"
        >
          <BrandLogo
            size={36}
            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-bold tracking-tight sm:text-[15px]">
              {PROFILE.displayName}
            </span>
            <span className="hidden font-mono text-[11px] text-muted sm:block">
              {PROFILE.shortRole}
            </span>
          </span>
        </a>

        {/* Centered Floating Pill Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-full border border-border bg-surface/92 p-1.5 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-medium ${
                  isActive
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {isActive ? (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
                    aria-hidden="true"
                  />
                ) : null}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-2">
          {/* Quick Search / Command Palette */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Search"
            title="Search portfolio (Ctrl+K)"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium text-ink-secondary hover:border-primary hover:text-foreground"
          >
            <Command className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="hidden xl:inline">Search</span>
            <kbd
              aria-hidden="true"
              className="hidden rounded-full border border-border bg-surface-elevated px-2 py-0.5 text-[11px] text-muted sm:inline"
            >
              Ctrl K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light editorial theme"
                : "Switch to dark obsidian theme"
            }
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground hover:border-primary hover:text-primary"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {/* Primary Pill CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="cta-glow hidden min-h-11 items-center gap-1.5 rounded-full bg-primary px-5 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover md:inline-flex"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground hover:border-primary lg:hidden"
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
          <m.nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: ARCHITECTURAL_EASE }}
            className="mx-5 mt-3 rounded-2xl border border-border-strong bg-surface p-4 shadow-2xl sm:mx-8 lg:hidden"
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
                          ? "bg-primary font-semibold text-primary-foreground"
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
            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-border pt-3 sm:grid-cols-2">
              <a
                href={PROFILE.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-4 py-2.5 font-mono text-xs font-semibold text-foreground hover:border-primary"
              >
                <FileDown className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
