import React from "react";

interface BrandLogoProps {
  size?: number;
  variant?: "framed" | "mark";
  tone?: "auto" | "dark" | "light";
  className?: string;
  decorative?: boolean;
  label?: string;
}

/**
 * Bespoke Architectural Geometric Brand Logo for M. Vicky Mosafan (VM):
 * - Chamfered 45° architectural frame echoing cut-corner blueprint geometry.
 * - Interlocking precision V + M monogram with shared diagonal structural spine.
 * - Elevated Cyan Deterministic AI Node representing AI-Augmented Engineering & Craftrig MCP.
 * - Zero-pink policy, >= 3:1 WCAG graphic contrast across Dark Obsidian & Light Editorial themes.
 */
export function BrandLogo({
  size = 36,
  variant = "framed",
  tone = "auto",
  className = "",
  decorative = true,
  label = "M. Vicky Mosafan VM Logo",
}: BrandLogoProps) {
  const palette =
    tone === "dark"
      ? {
          bg: "#0b0d0f",
          border: "rgba(243, 245, 242, 0.22)",
          innerLine: "rgba(243, 245, 242, 0.08)",
          primary: "#c8f53c",
          ink: "#f3f5f2",
          accent: "#56ccf2",
        }
      : tone === "light"
      ? {
          bg: "#ffffff",
          border: "rgba(17, 21, 24, 0.24)",
          innerLine: "rgba(17, 21, 24, 0.08)",
          primary: "#185c37",
          ink: "#111518",
          accent: "#035e8c",
        }
      : {
          bg: "var(--surface)",
          border: "var(--border-strong)",
          innerLine: "var(--border)",
          primary: "var(--primary)",
          ink: "var(--ink)",
          accent: "var(--accent)",
        };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      focusable="false"
      className={className}
    >
      {variant === "framed" ? (
        <>
          {/* Chamfered Architectural Outer Chassis */}
          <path
            d="M12 3H52L61 12V52L52 61H12L3 52V12L12 3Z"
            fill={palette.bg}
            stroke={palette.border}
            strokeWidth="2"
          />
          {/* Subtle Inner Blueprint Registration Hairline */}
          <path
            d="M14.5 7.5H49.5L56.5 14.5V49.5L49.5 56.5H14.5L7.5 49.5V14.5L14.5 7.5Z"
            stroke={palette.innerLine}
            strokeWidth="1"
          />
          {/* Signature Primary Architectural Corner Accent Chamfer */}
          <path
            d="M44 3H52L61 12V20"
            stroke={palette.primary}
            strokeWidth="2.4"
            strokeLinecap="square"
          />
        </>
      ) : null}

      {/* M Right Wing + Architectural Pillar (Interlocks cleanly with V rising diagonal) */}
      <path
        d="M35.8 19L41.8 33.4L47.2 19H53V46H47.2V31.6L42.9 42H40.3L33.4 25.8L35.8 19Z"
        fill={palette.ink}
      />

      {/* V Primary Velocity Monogram (Shared structural spine) */}
      <path
        d="M11 19H17.6L23.5 36.2L29.8 19H36.2L26.2 46H20.8L11 19Z"
        fill={palette.primary}
      />

      {/* Precision Cyan Deterministic AI Node nestled cleanly in the V apex pocket */}
      <path
        d="M23.7 18.2L27.1 21.6L23.7 25L20.3 21.6L23.7 18.2Z"
        fill={palette.accent}
      />
    </svg>
  );
}
