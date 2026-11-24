"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FeaturedProject } from "@/data/portfolio";
import { AudioGateProvider } from "@/components/providers/AudioGateProvider";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { WelcomeScreen } from "@/components/motion/WelcomeScreen";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AiWorkflowSection } from "@/components/sections/AiWorkflowSection";
import { SectionScrollBridge } from "@/components/motion/SectionScrollBridge";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StackAndCredentialsSection } from "@/components/sections/StackAndCredentialsSection";
import { ContactFooter } from "@/components/sections/ContactFooter";

// Code-split on-demand native <dialog> modals so they cost 0 bytes until opened!
const CommandPalette = dynamic(
  () => import("@/components/navigation/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

const ProjectCaseStudyDialog = dynamic(
  () =>
    import("@/components/sections/ProjectCaseStudyDialog").then(
      (m) => m.ProjectCaseStudyDialog
    ),
  { ssr: false }
);

export function PortfolioShell() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandLoaded, setCommandLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);
  const [dialogLoaded, setDialogLoaded] = useState(false);

  const openCommand = useCallback(() => {
    setCommandLoaded(true);
    setCommandOpen(true);
  }, []);

  const inspectProject = useCallback((project: FeaturedProject) => {
    setDialogLoaded(true);
    setActiveProject(project);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandLoaded(true);
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AudioGateProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        {/* Subtle architectural grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-20 bg-architectural-grid"
        />

        {/* Signature Full-Stack × AI-Assisted / AI-Augmented Welcome Boot Screen */}
        <WelcomeScreen />

        {/* Native CSS Scroll-Driven Top Progress Bar */}
        <ScrollProgressBar />

        {/* Preserved Editorial Glass Navbar (untouched per user request) */}
        <Navbar onOpenCommandPalette={openCommand} />

        {/* Primary Page Flow */}
        <main id="main-content" className="relative z-10">
          <HeroSection />
          <WorkSection onInspectProject={inspectProject} />
          <AiWorkflowSection />
          <SectionScrollBridge />
          <ExperienceSection />
          <StackAndCredentialsSection />
        </main>

        <ContactFooter />

        {/* Native <dialog> Command Palette (lazy-loaded on first Ctrl+K / click, keeps exit transition) */}
        {commandLoaded ? (
          <CommandPalette
            open={commandOpen}
            onClose={() => setCommandOpen(false)}
            onSelectProject={inspectProject}
          />
        ) : null}

        {/* Native <dialog> Architecture Case Study Modal (lazy-loaded on first inspect, keeps exit transition) */}
        {dialogLoaded ? (
          <ProjectCaseStudyDialog
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        ) : null}
      </div>
    </AudioGateProvider>
  );
}
