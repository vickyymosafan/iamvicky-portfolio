"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FeaturedProject } from "@/data/portfolio";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { StudioBackdrop } from "@/components/ui/StudioBackdrop";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AiWorkflowSection } from "@/components/sections/AiWorkflowSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StackAndCredentialsSection } from "@/components/sections/StackAndCredentialsSection";
import { ContactFooter } from "@/components/sections/ContactFooter";

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
    <div className="relative min-h-screen text-foreground">
      {/* Global Sculptural 3D Glass Orb, Silk Wave & Coordinate Grid Backdrop */}
      <StudioBackdrop />

      {/* Native CSS Scroll-Driven Top Progress Bar */}
      <ScrollProgressBar />

      {/* Floating Pill Navbar */}
      <Navbar onOpenCommandPalette={openCommand} />

      {/* Clean 6-Chapter Storytelling Flow */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <WorkSection onInspectProject={inspectProject} />
        <AiWorkflowSection />
        <ExperienceSection />
        <StackAndCredentialsSection />
      </main>

      <ContactFooter />

      {/* Native <dialog> Command Palette */}
      {commandLoaded ? (
        <CommandPalette
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          onSelectProject={inspectProject}
        />
      ) : null}

      {/* Native <dialog> Project Case Study Modal */}
      {dialogLoaded ? (
        <ProjectCaseStudyDialog
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      ) : null}
    </div>
  );
}
