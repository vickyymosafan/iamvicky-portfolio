import React from "react";

/**
 * Global Fixed Sculptural Glass-Orb & Architectural Grid Backdrop.
 * - Zero heavy CSS filter:blur() during scroll — uses pre-baked multi-stop SVG radial gradients
 *   inside a GPU-isolated fixed compositor layer (`contain: strict`, `translate3d(0,0,0)`).
 * - Mirrors all 7 redesign reference mockups: blazing top-left & bottom-right obsidian glass spheres
 *   with crescent rim highlights, floating translucent edge orbs, sweeping diagonal silk wave,
 *   fine architectural grid, coordinate crosshairs (+), and 4-point star sparkles (✦).
 * - Strictly zero green / zero pink: Electric Amber-Gold + Glacier Blue (Dark) & Burnished Amber + Cobalt (Light).
 */
export function StudioBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="studio-backdrop-root pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Layer 1: Fine Architectural Grid + Corner Radial Ambient Depth */}
      <div className="bg-architectural-grid absolute inset-0" />

      {/* Layer 2: Global Sweeping Diagonal Silk Light Ribbon + Crosshairs + Micro Sparkles */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-90"
        fill="none"
      >
        <defs>
          {/* Top-Left Giant Sculptural Obsidian Glass Orb */}
          <radialGradient id="sb-tl-aura" cx="0%" cy="0%" r="100%">
            <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.48" />
            <stop offset="34%" stopColor="var(--orb-mid)" stopOpacity="0.22" />
            <stop offset="68%" stopColor="var(--orb-mid)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sb-tl-sphere" cx="76%" cy="74%" r="72%">
            <stop offset="0%" stopColor="var(--orb-core)" stopOpacity="0.95" />
            <stop offset="58%" stopColor="var(--orb-shell)" stopOpacity="0.88" />
            <stop offset="86%" stopColor="var(--orb-rim)" stopOpacity="0.58" />
            <stop offset="96%" stopColor="var(--orb-highlight)" stopOpacity="0.96" />
            <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
          </radialGradient>

          {/* Bottom-Right Giant Sculptural Obsidian Glass Orb */}
          <radialGradient id="sb-br-aura" cx="100%" cy="100%" r="100%">
            <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.46" />
            <stop offset="38%" stopColor="var(--orb-mid)" stopOpacity="0.18" />
            <stop offset="72%" stopColor="var(--orb-mid)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sb-br-sphere" cx="26%" cy="24%" r="72%">
            <stop offset="0%" stopColor="var(--orb-core)" stopOpacity="0.95" />
            <stop offset="56%" stopColor="var(--orb-shell)" stopOpacity="0.88" />
            <stop offset="85%" stopColor="var(--orb-rim)" stopOpacity="0.55" />
            <stop offset="96%" stopColor="var(--orb-highlight)" stopOpacity="0.96" />
            <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
          </radialGradient>

          {/* Secondary Translucent Edge Glass Orbs */}
          <radialGradient id="sb-mid-glass" cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="var(--orb-core)" stopOpacity="0.72" />
            <stop offset="74%" stopColor="var(--orb-shell)" stopOpacity="0.55" />
            <stop offset="94%" stopColor="var(--orb-rim)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sb-accent-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          {/* Sweeping Luminous Silk Wave Strokes */}
          <linearGradient id="sb-silk-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--orb-rim)" stopOpacity="0.28" />
            <stop offset="55%" stopColor="var(--orb-highlight)" stopOpacity="0.42" />
            <stop offset="80%" stopColor="var(--accent)" stopOpacity="0.24" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sb-silk-band" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
            <stop offset="42%" stopColor="var(--orb-rim)" stopOpacity="0.10" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft Wide Corner Blooms */}
        <circle cx="40" cy="30" r="460" fill="url(#sb-tl-aura)" />
        <circle cx="1410" cy="870" r="480" fill="url(#sb-br-aura)" />
        <circle cx="1360" cy="140" r="340" fill="url(#sb-accent-aura)" />

        {/* Sweeping Atmospheric Silk Light Bands */}
        <path
          d="M -120 740 C 260 540, 620 820, 1080 460 C 1270 310, 1410 210, 1560 120 L 1560 220 C 1380 320, 1220 430, 1020 570 C 600 860, 260 640, -120 830 Z"
          fill="url(#sb-silk-band)"
        />
        <path
          d="M -80 765 C 290 560, 650 810, 1090 475 C 1270 335, 1400 245, 1540 165"
          stroke="url(#sb-silk-gold)"
          strokeWidth="1.4"
        />
        <path
          d="M -60 190 C 190 90, 410 130, 620 40"
          stroke="url(#sb-silk-gold)"
          strokeWidth="1"
          opacity="0.55"
        />

        {/* Top-Left Iconic 3D Crescent Glass Sphere (Matches all 7 reference mockups) */}
        <g>
          <circle cx="-54" cy="-36" r="176" fill="url(#sb-tl-sphere)" />
          {/* Razor-crisp specular crescent rim */}
          <path
            d="M 116 -80 A 176 176 0 0 1 -98 134"
            stroke="var(--orb-highlight)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.86"
          />
          {/* Concentric translucent outer refractive orbital ring */}
          <circle
            cx="-54"
            cy="-36"
            r="222"
            stroke="var(--orb-rim)"
            strokeWidth="1"
            opacity="0.26"
          />
        </g>

        {/* Bottom-Right Iconic 3D Crescent Glass Sphere (Matches all 7 reference mockups) */}
        <g>
          <circle cx="1466" cy="918" r="204" fill="url(#sb-br-sphere)" />
          <path
            d="M 1274 966 A 204 204 0 0 1 1516 720"
            stroke="var(--orb-highlight)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.82"
          />
          <circle
            cx="1466"
            cy="918"
            r="254"
            stroke="var(--orb-rim)"
            strokeWidth="1"
            opacity="0.24"
          />
        </g>

        {/* Mid-Left & Mid-Right Translucent Glass Satellite Spheres */}
        <g className="animate-orb-drift">
          <circle cx="-18" cy="540" r="118" fill="url(#sb-mid-glass)" opacity="0.72" />
          <path
            d="M 96 508 A 118 118 0 0 1 28 648"
            stroke="var(--orb-rim)"
            strokeWidth="1.5"
            opacity="0.45"
          />
        </g>
        <g className="animate-orb-drift-slow">
          <circle cx="1456" cy="240" r="106" fill="url(#sb-mid-glass)" opacity="0.68" />
          <path
            d="M 1356 268 A 106 106 0 0 1 1424 138"
            stroke="var(--accent)"
            strokeWidth="1.4"
            opacity="0.42"
          />
        </g>

        {/* Technical Coordinate Crosshairs (+) & 4-Point Star Sparkles (✦) in open margins */}
        <g stroke="var(--orb-rim)" strokeWidth="1" opacity="0.32">
          <path d="M 42 208 H 54 M 48 202 V 214" />
          <path d="M 1384 148 H 1396 M 1390 142 V 154" />
          <path d="M 1384 616 H 1396 M 1390 610 V 622" />
          <path d="M 42 764 H 54 M 48 758 V 770" />
        </g>
        <g fill="var(--orb-highlight)" opacity="0.52">
          {/* 4-point star sparkles placed in outer margins away from text columns */}
          <path d="M 1378 312 L 1380 318 L 1386 320 L 1380 322 L 1378 328 L 1376 322 L 1370 320 L 1376 318 Z" />
          <path d="M 34 368 L 35.8 373.2 L 41 375 L 35.8 376.8 L 34 382 L 32.2 376.8 L 27 375 L 32.2 373.2 Z" />
          <path d="M 1358 756 L 1360.2 762.8 L 1367 765 L 1360.2 767.2 L 1358 774 L 1355.8 767.2 L 1349 765 L 1355.8 762.8 Z" />
          <circle cx="242" cy="112" r="1.6" />
          <circle cx="1186" cy="84" r="1.6" />
          <circle cx="1404" cy="492" r="1.8" />
          <circle cx="38" cy="672" r="1.6" />
        </g>
      </svg>
    </div>
  );
}

type SectionBackdropVariant =
  | "hero"
  | "work"
  | "archive"
  | "workflow"
  | "experience"
  | "film"
  | "stack"
  | "contact";

interface SectionBackdropProps {
  variant: SectionBackdropVariant;
}

/**
 * Per-Section Reference-Matched Atmospheric Backdrop Layer:
 * Gives every chapter its own signature orbital curves, rim-lit floating glass orbs,
 * studio spotlight beams, and sparkles — zero heavy blur filters, 100% GPU-composited.
 */
export function SectionBackdrop({ variant }: SectionBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {variant === "hero" ? (
        <svg
          viewBox="0 0 1440 860"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-hero-spot" cx="72%" cy="44%" r="44%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.28" />
              <stop offset="46%" stopColor="var(--orb-mid)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sec-hero-left" cx="14%" cy="22%" r="36%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-hero-arc" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="45%" stopColor="var(--orb-rim)" stopOpacity="0.45" />
              <stop offset="75%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="860" fill="url(#sec-hero-spot)" />
          <rect width="1440" height="860" fill="url(#sec-hero-left)" />
          <path
            d="M -40 760 Q 480 620, 960 400 T 1500 120"
            stroke="url(#sec-hero-arc)"
            strokeWidth="1.2"
            opacity="0.6"
          />
          {/* Subtle floating sparkles near portrait */}
          <g fill="var(--orb-highlight)" opacity="0.65">
            <path d="M 812 308 L 814.2 314.8 L 821 317 L 814.2 319.2 L 812 326 L 809.8 319.2 L 803 317 L 809.8 314.8 Z" />
            <path d="M 1316 534 L 1318 539.5 L 1323.5 541.5 L 1318 543.5 L 1316 549 L 1314 543.5 L 1308.5 541.5 L 1314 539.5 Z" />
            <circle cx="848" cy="186" r="1.8" />
            <circle cx="1296" cy="216" r="1.6" />
          </g>
        </svg>
      ) : null}

      {variant === "work" ? (
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-work-glow" cx="76%" cy="24%" r="42%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.30" />
              <stop offset="48%" stopColor="var(--accent)" stopOpacity="0.09" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-work-wave" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="35%" stopColor="var(--orb-rim)" stopOpacity="0.36" />
              <stop offset="72%" stopColor="var(--accent)" stopOpacity="0.34" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sec-work-orb" cx="30%" cy="28%" r="72%">
              <stop offset="0%" stopColor="var(--orb-core)" stopOpacity="0.9" />
              <stop offset="70%" stopColor="var(--orb-shell)" stopOpacity="0.7" />
              <stop offset="94%" stopColor="var(--orb-highlight)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#sec-work-glow)" />
          {/* Sweeping luminous S-ribbon matching redesign-section-1.png */}
          <path
            d="M -80 420 C 260 280, 620 490, 980 310 C 1190 205, 1340 245, 1520 140"
            stroke="url(#sec-work-wave)"
            strokeWidth="1.6"
            opacity="0.75"
          />
          <path
            d="M -60 470 C 310 340, 660 540, 1040 355 C 1220 265, 1370 300, 1520 210"
            stroke="url(#sec-work-wave)"
            strokeWidth="0.9"
            opacity="0.4"
          />
          {/* Floating glass micro-spheres */}
          <circle cx="1340" cy="408" r="22" fill="url(#sec-work-orb)" opacity="0.75" />
          <circle cx="88" cy="316" r="14" fill="url(#sec-work-orb)" opacity="0.6" />
          <circle cx="776" cy="116" r="10" fill="url(#sec-work-orb)" opacity="0.65" />
        </svg>
      ) : null}

      {variant === "archive" ? (
        <svg
          viewBox="0 0 1440 760"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-arch-glow" cx="76%" cy="22%" r="40%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.28" />
              <stop offset="50%" stopColor="var(--orb-mid)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sec-arch-left-glow" cx="6%" cy="76%" r="36%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.22" />
              <stop offset="58%" stopColor="var(--orb-mid)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-arch-ribbon" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--orb-rim)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="760" fill="url(#sec-arch-glow)" />
          <rect width="1440" height="760" fill="url(#sec-arch-left-glow)" />
          <path
            d="M -60 660 C 220 490, 560 440, 920 260 C 1140 150, 1320 120, 1500 60"
            stroke="url(#sec-arch-ribbon)"
            strokeWidth="1.4"
            opacity="0.65"
          />
          <circle cx="660" cy="276" r="12" fill="var(--orb-rim)" opacity="0.22" />
          <circle cx="1376" cy="496" r="16" fill="var(--accent)" opacity="0.16" />
        </svg>
      ) : null}

      {variant === "workflow" ? (
        <svg
          viewBox="0 0 1440 880"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-wf-ide" cx="72%" cy="24%" r="42%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.28" />
              <stop offset="48%" stopColor="var(--accent)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sec-wf-bottom-left" cx="4%" cy="90%" r="30%">
              <stop offset="0%" stopColor="var(--orb-highlight)" stopOpacity="0.28" />
              <stop offset="55%" stopColor="var(--orb-rim)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-wf-arc" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="35%" stopColor="var(--orb-highlight)" stopOpacity="0.48" />
              <stop offset="72%" stopColor="var(--accent)" stopOpacity="0.34" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="880" fill="url(#sec-wf-ide)" />
          <rect width="1440" height="880" fill="url(#sec-wf-bottom-left)" />
          <ellipse
            cx="1030"
            cy="245"
            rx="380"
            ry="118"
            transform="rotate(-10 1030 245)"
            stroke="url(#sec-wf-arc)"
            strokeWidth="1.6"
            opacity="0.72"
          />
          <path
            d="M -40 780 C 260 660, 560 710, 880 610 C 1140 530, 1340 560, 1500 470"
            stroke="url(#sec-wf-arc)"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      ) : null}

      {variant === "experience" ? (
        <svg
          viewBox="0 0 1440 960"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-exp-left" cx="10%" cy="66%" r="44%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.26" />
              <stop offset="48%" stopColor="var(--orb-mid)" stopOpacity="0.09" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sec-exp-right-orb" cx="28%" cy="28%" r="72%">
              <stop offset="0%" stopColor="var(--orb-core)" stopOpacity="0.92" />
              <stop offset="68%" stopColor="var(--orb-shell)" stopOpacity="0.78" />
              <stop offset="93%" stopColor="var(--orb-highlight)" stopOpacity="0.76" />
              <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-exp-wave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="45%" stopColor="var(--orb-highlight)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="960" fill="url(#sec-exp-left)" />
          {/* Right edge sculptural crescent dome matching redesign-section-3.png */}
          <circle cx="1470" cy="430" r="176" fill="url(#sec-exp-right-orb)" opacity="0.78" />
          <path
            d="M 1300 460 A 176 176 0 0 1 1446 258"
            stroke="var(--orb-highlight)"
            strokeWidth="2"
            opacity="0.65"
          />
          <ellipse
            cx="1440"
            cy="440"
            rx="240"
            ry="88"
            transform="rotate(24 1440 440)"
            stroke="url(#sec-exp-wave)"
            strokeWidth="1.3"
            opacity="0.65"
          />
          {/* Left edge translucent dome */}
          <circle cx="-46" cy="520" r="144" fill="url(#sec-exp-right-orb)" opacity="0.6" />
        </svg>
      ) : null}

      {variant === "film" ? (
        <svg
          viewBox="0 0 1440 820"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-film-center" cx="44%" cy="56%" r="50%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.22" />
              <stop offset="52%" stopColor="var(--accent)" stopOpacity="0.07" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sec-film-orb" cx="30%" cy="30%" r="72%">
              <stop offset="0%" stopColor="var(--orb-core)" stopOpacity="0.9" />
              <stop offset="68%" stopColor="var(--orb-shell)" stopOpacity="0.72" />
              <stop offset="94%" stopColor="var(--orb-highlight)" stopOpacity="0.82" />
              <stop offset="100%" stopColor="var(--orb-rim)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-film-arc" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--orb-rim)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="820" fill="url(#sec-film-center)" />
          {/* Right upper & left lower curved glass domes matching redesign-section-4.png */}
          <circle cx="1450" cy="210" r="146" fill="url(#sec-film-orb)" opacity="0.78" />
          <circle cx="-30" cy="720" r="158" fill="url(#sec-film-orb)" opacity="0.74" />
          <path
            d="M -60 560 C 260 660, 560 720, 960 610 C 1180 550, 1340 430, 1500 280"
            stroke="url(#sec-film-arc)"
            strokeWidth="1.4"
            opacity="0.6"
          />
          <circle cx="1196" cy="148" r="11" fill="url(#sec-film-orb)" opacity="0.72" />
        </svg>
      ) : null}

      {variant === "stack" ? (
        <svg
          viewBox="0 0 1440 940"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-stack-top" cx="76%" cy="18%" r="40%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.28" />
              <stop offset="48%" stopColor="var(--accent)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sec-stack-low" cx="18%" cy="86%" r="38%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-stack-ribbon" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="40%" stopColor="var(--orb-highlight)" stopOpacity="0.42" />
              <stop offset="76%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="940" fill="url(#sec-stack-top)" />
          <rect width="1440" height="940" fill="url(#sec-stack-low)" />
          <path
            d="M -40 310 C 260 220, 580 340, 960 210 C 1180 135, 1340 165, 1500 95"
            stroke="url(#sec-stack-ribbon)"
            strokeWidth="1.4"
            opacity="0.65"
          />
          <g fill="var(--orb-highlight)" opacity="0.58">
            <path d="M 1378 272 L 1380 277.5 L 1385.5 279.5 L 1380 281.5 L 1378 287 L 1376 281.5 L 1370.5 279.5 L 1376 277.5 Z" />
            <path d="M 38 748 L 40 753.5 L 45.5 755.5 L 40 757.5 L 38 763 L 36 757.5 L 30.5 755.5 L 36 753.5 Z" />
          </g>
        </svg>
      ) : null}

      {variant === "contact" ? (
        <svg
          viewBox="0 0 1440 520"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <radialGradient id="sec-ct-glow" cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0.22" />
              <stop offset="56%" stopColor="var(--accent)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--orb-mid)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-ct-wave" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="var(--orb-rim)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--orb-highlight)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="520" fill="url(#sec-ct-glow)" />
          <path
            d="M -60 410 C 320 260, 740 460, 1180 260 C 1320 195, 1420 205, 1520 170"
            stroke="url(#sec-ct-wave)"
            strokeWidth="1.4"
            opacity="0.62"
          />
        </svg>
      ) : null}
    </div>
  );
}
