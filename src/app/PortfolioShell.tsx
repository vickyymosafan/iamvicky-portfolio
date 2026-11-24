"use client";

import React, { useEffect, useState } from "react";
import { FeaturedProject } from "@/data/portfolio";
import { AudioGateProvider } from "@/components/providers/AudioGateProvider";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { WelcomeScreen } from "@/components/motion/WelcomeScreen";
import { Navbar } from "@/components/navigation/Navbar";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AiWorkflowSection } from "@/components/sections/AiWorkflowSection";
import { SectionScrollBridge } from "@/components/motion/SectionScrollBridge";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WorldPortalTransition } from "@/components/motion/WorldPortalTransition";
import { StackAndCredentialsSection } from "@/components/sections/StackAndCredentialsSection";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ProjectCaseStudyDialog } from "@/components/sections/ProjectCaseStudyDialog";

export function PortfolioShell() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
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
        <Navbar onOpenCommandPalette={() => setCommandOpen(true)} />

        {/* Primary Page Flow */}
        <main id="main-content" className="relative z-10">
          <HeroSection />
          <WorkSection onInspectProject={setActiveProject} />
          <AiWorkflowSection />
          <SectionScrollBridge />
          <ExperienceSection />
          <WorldPortalTransition />
          <StackAndCredentialsSection />
        </main>

        <ContactFooter />

        {/* Native <dialog> Command Palette (Ctrl+K / Cmd+K) */}
        <CommandPalette
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* Native <dialog> Architecture Case Study Modal */}
        <ProjectCaseStudyDialog
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </AudioGateProvider>
  );
}
