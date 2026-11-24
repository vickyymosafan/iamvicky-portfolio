import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. Vicky Mosafan — Full-Stack Developer & AI-Augmented Engineer",
  description:
    "Portfolio of M. Vicky Mosafan — Full-Stack Web Developer (Next.js, NestJS, Prisma, PostgreSQL) & AI-Augmented Software Engineer building Hybrid/Agentic RAG engines, TypeScript MCP servers, and production web systems.",
  keywords: [
    "M. Vicky Mosafan",
    "Full-Stack Web Developer",
    "AI-Augmented Software Engineering",
    "MCP Server Developer",
    "Next.js",
    "NestJS",
    "Hybrid RAG",
    "Agentic Engineering",
  ],
  openGraph: {
    title: "M. Vicky Mosafan — Full-Stack & AI-Augmented Software Engineer",
    description:
      "Production web systems, Hybrid & Agentic RAG pipelines (91.67% Recall), and custom TypeScript MCP servers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <a
          href="#main-content"
          className="pointer-events-none fixed top-4 left-4 z-100 -translate-y-28 rounded-lg bg-primary px-4 py-2.5 font-mono text-sm font-semibold text-primary-foreground opacity-0 transition-all focus:pointer-events-auto focus:translate-y-0 focus:opacity-100"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
