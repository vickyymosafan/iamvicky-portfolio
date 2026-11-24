"use client";

import React from "react";
import { FEATURED_PROJECTS, FeaturedProject } from "@/data/portfolio";
import { HorizontalScrollShowcase } from "@/components/motion/HorizontalScrollShowcase";
import { ShippedFolderVault } from "@/components/motion/ShippedFolderVault";
import { SectionHeader } from "@/components/motion/MotionPrimitives";

interface WorkSectionProps {
  onInspectProject: (project: FeaturedProject) => void;
}

export function WorkSection({ onInspectProject }: WorkSectionProps) {
  return (
    <section id="work" className="relative py-16 sm:py-24">
      <div className="mx-auto mb-8 max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="01"
          eyebrow="Featured Engineering Work"
          title="Interactive 3D production systems, RAG engines & MCP servers."
          description="Scroll smoothly to glide horizontally across every compact 3D project card — hover to orbit each live Three.js architecture sculpture, or inspect the complete blueprint."
        />
      </div>

      {/* Compact Three.js 3D Interactive Horizontal-on-Vertical Showcase (No Arrow Buttons) */}
      <HorizontalScrollShowcase
        projects={FEATURED_PROJECTS}
        onInspectProject={onInspectProject}
      />

      {/* Interactive Animated Folder Vault for Additional Shipped Systems & Utilities */}
      <ShippedFolderVault />
    </section>
  );
}
