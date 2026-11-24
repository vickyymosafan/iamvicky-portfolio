"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  FileText,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useAudioGate } from "@/components/providers/AudioGateProvider";

const STAGE_W = 1920;
const STAGE_H = 1080;
const TOTAL_DURATION = 84.07;

const VO_BEATS = [
  {
    id: "hook",
    start: 0.08,
    end: 7.625,
    label: "01 // AI-Augmented Core",
    text: "Beyond raw chat prompting lies AI-Augmented Engineering: deterministic architecture, accelerated by autonomous coding agents.",
  },
  {
    id: "prd-skills",
    start: 7.625,
    end: 19.045,
    label: "02 // Deterministic PRDs & Agent Skills",
    text: "Every build begins with Deterministic PRDs — locking ERDs, OpenAPI contracts, and RBAC rules — steered by twenty-one modular Agent Skills from disciplined prompt engineering.",
  },
  {
    id: "agents-mcp",
    start: 19.045,
    end: 32.545,
    label: "03 // Claude Code · Antigravity · MCP",
    text: "Claude Code and Google Antigravity execute in parallel, governed by custom TypeScript MCP servers I built — forty-three tools enforcing task DAGs, exclusive file locks, and real browser evidence gates.",
  },
  {
    id: "hybrid-rag",
    start: 32.545,
    end: 51.443,
    label: "04 // Hybrid & Agentic RAG",
    text: "Hybrid and Agentic RAG fuses Supabase pgvector semantic search with BM25 lexical reranking via Weighted Reciprocal Rank Fusion — achieving ninety-one point six seven percent recall, one point zero MRR, six hundred ninety-four millisecond Redis responses, and a self-critic grounding loop.",
  },
  {
    id: "fullstack-matrix",
    start: 51.443,
    end: 72.284,
    label: "05 // Full-Stack Production Matrix",
    text: "Production layers span React nineteen, Next.js sixteen, Vue, Tailwind four, and Framer Motion — backed by Node, NestJS, Express, Hono, and Laravel on PostgreSQL, Prisma, Neon, Redis BullMQ, and offline Dexie — across TypeScript, Python, PHP, Kotlin, and MQL5.",
  },
  {
    id: "qa-ship",
    start: 72.284,
    end: 84.07,
    label: "06 // Autonomous QA & Edge Ship",
    text: "Verified by Jest, Supertest, and thirteen-viewport Playwright audits, then shipped via GitHub Actions to Vercel and Cloudflare Workers. Engineered to ship — verified to last.",
  },
] as const;

const VIEWPORT_PROFILES = [
  "320", "360", "375", "390", "414", "430",
  "768", "844", "1024", "1280", "1366", "1440", "1920",
] as const;

function formatClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
}

/**
 * Bang-Motion Cinematic 16:9 Explainer Film (GSAP 3.15 + Real English Neural Voice Over):
 * - Follows Bang-Motion anti-PPT laws:
 *   - 1920x1080 deterministic stage scaled via translate(-50%,-50%) scale(s).
 *   - Single camera rig (#bm-world) with motivated transitions (shutter wipe, 3D push-through, directional whip).
 *   - Zero Math.random() / Date.now(); deterministic living grain, directional SVG feGaussianBlur, tabular-nums counters.
 *   - Dark Obsidian <-> Warm Architectural Ivory surface contrast behind precision wipe.
 *   - Synced to real edge-tts English Voice Over (/audio/ai-stack-explainer-vo.mp3).
 * - Auto-plays when arriving in the Outer World via IntersectionObserver.
 * - Auto-scrolls smoothly to #education-credentials upon video completion.
 */
export function BangMotionStackExplainer() {
  const { scrollTo } = useSmoothScroll();
  const { unlockAudio } = useAudioGate();

  const viewportBoxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAutoPlayedRef = useRef(false);
  const hasStartedOnceRef = useRef(false);
  const hasAutoScrolledRef = useRef(false);
  const userPausedRef = useRef(false);
  const blobUrlRef = useRef<string | null>(null);
  const audioLoadedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsAudioGesture, setNeedsAudioGesture] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeBeatIdx, setActiveBeatIdx] = useState(0);

  // Lazy-load English Voice-Over MP3 into an in-memory Blob URL when approaching Section 04
  // (modern-web-guidance: lazy-load-video-and-audio IntersectionObserver strategy + zero Range aborts on seek)
  const ensureAudioLoaded = useCallback(async () => {
    if (audioLoadedRef.current || !audioRef.current) return;
    audioLoadedRef.current = true;
    try {
      const res = await fetch("/audio/ai-stack-explainer-vo.mp3");
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      if (audioRef.current) {
        audioRef.current.src = url;
      }
    } catch {
      audioLoadedRef.current = false;
    }
  }, []);

  useEffect(() => {
    const box = viewportBoxRef.current;
    if (!box) return;
    const loader = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          void ensureAudioLoaded();
          loader.disconnect();
        }
      },
      { rootMargin: "420px 0px" }
    );
    loader.observe(box);
    return () => {
      loader.disconnect();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [ensureAudioLoaded]);

  // Scale 1920x1080 internal stage crisply to fit any container width (Bang-Motion fit())
  useEffect(() => {
    const box = viewportBoxRef.current;
    const stage = stageRef.current;
    if (!box || !stage) return;

    const fit = () => {
      const scale = Math.min(box.clientWidth / STAGE_W, box.clientHeight / STAGE_H);
      stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  const startPlayback = useCallback(
    (fromStart = false) => {
      const tl = tlRef.current;
      const audio = audioRef.current;
      if (!tl) return;

      userPausedRef.current = false;
      hasStartedOnceRef.current = true;
      setIsCompleted(false);

      if (fromStart) {
        hasAutoScrolledRef.current = false;
        tl.play(0);
      } else {
        tl.play();
      }
      setIsPlaying(true);

      if (audio) {
        const playSynced = () => {
          if (!audioRef.current || !tlRef.current) return;
          audioRef.current.currentTime = fromStart ? 0 : tlRef.current.time();
          audioRef.current.muted = isMuted;
          audioRef.current
            .play()
            .then(() => {
              setNeedsAudioGesture(false);
            })
            .catch(() => {
              setNeedsAudioGesture(true);
            });
        };

        if (!blobUrlRef.current) {
          void ensureAudioLoaded().then(playSynced);
        } else {
          playSynced();
        }
      }
    },
    [isMuted, ensureAudioLoaded]
  );

  // Build deterministic GSAP Bang-Motion Master Timeline
  useEffect(() => {
    const stage = stageRef.current;
    const world = worldRef.current;
    if (!stage || !world) return;

    const q = (sel: string) => stage.querySelector<HTMLElement | SVGElement>(sel);
    const qa = (sel: string) => Array.from(stage.querySelectorAll<HTMLElement | SVGElement>(sel));

    const blurXNode = stage.querySelector<SVGFEGaussianBlurElement>("#bm-blur-x-node");
    const blurYNode = stage.querySelector<SVGFEGaussianBlurElement>("#bm-blur-y-node");

    // Camera state driven strictly by GSAP timeline (pure function of tl.time())
    const CAM = { s: 1, fx: STAGE_W / 2, fy: STAGE_H / 2 };
    const applyCam = (t: number) => {
      const breath = 1 + 0.008 * Math.sin(t * 0.85);
      const s = CAM.s * breath;
      let tx = STAGE_W / 2 - CAM.fx * s;
      let ty = STAGE_H / 2 - CAM.fy * s;
      tx = Math.min(0, Math.max(STAGE_W - STAGE_W * s, tx));
      ty = Math.min(0, Math.max(STAGE_H - STAGE_H * s, ty));
      world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;

      // Deterministic living film grain (12 fps stepped jump from t, zero Math.random)
      if (grainRef.current) {
        const k = Math.floor(t * 12);
        grainRef.current.style.transform = `translate3d(${((k * 37) % 60) - 30}px, ${((k * 61) % 60) - 30}px, 0)`;
      }

      // Deterministic background geometry drift
      const orbitRing = q("#bm-bg-orbit");
      if (orbitRing) {
        orbitRing.style.transform = `rotate(${t * 5.2}deg)`;
      }
    };

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const t = tl.time();
        applyCam(t);
        setCurrentTime(t);

        const idx = VO_BEATS.findIndex((b) => t >= b.start && t < b.end);
        if (idx !== -1) setActiveBeatIdx(idx);

        // Keep English VO audio tightly locked within 180ms of GSAP timeline
        const audio = audioRef.current;
        if (audio && !audio.paused && !tl.paused()) {
          if (Math.abs(audio.currentTime - t) > 0.22) {
            audio.currentTime = t;
          }
        }
      },
      onComplete: () => {
        setIsPlaying(false);
        setIsCompleted(true);
        const audio = audioRef.current;
        if (audio && !audio.paused) audio.pause();

        if (!hasAutoScrolledRef.current) {
          hasAutoScrolledRef.current = true;
          window.setTimeout(() => {
            scrollTo("#education-credentials", -84);
          }, 700);
        }
      },
    });

    const shot = (at: number, dur: number, s: number, fx: number, fy: number, ease = "power2.inOut") => {
      tl.to(CAM, { s, fx, fy, duration: dur, ease }, at);
    };

    const setMotionBlurX = (at: number, fromVal: number, toVal: number, dur: number) => {
      const obj = { v: fromVal };
      tl.to(
        obj,
        {
          v: toVal,
          duration: dur,
          ease: toVal === 0 ? "power3.out" : "power2.in",
          onUpdate: () => {
            if (blurXNode) blurXNode.setAttribute("stdDeviation", `${obj.v.toFixed(1)} 0`);
          },
        },
        at
      );
    };

    const setMotionBlurY = (at: number, fromVal: number, toVal: number, dur: number) => {
      const obj = { v: fromVal };
      tl.to(
        obj,
        {
          v: toVal,
          duration: dur,
          ease: toVal === 0 ? "power3.out" : "power2.in",
          onUpdate: () => {
            if (blurYNode) blurYNode.setAttribute("stdDeviation", `0 ${obj.v.toFixed(1)}`);
          },
        },
        at
      );
    };

    // Reset all instrument views cleanly at t = 0
    tl.set(CAM, { s: 1.06, fx: 960, fy: 540 }, 0);
    tl.set(["#bm-v2", "#bm-v3", "#bm-v4", "#bm-v5", "#bm-v6"], { autoAlpha: 0 }, 0);
    tl.set("#bm-v1", { autoAlpha: 1 }, 0);
    tl.set("#bm-wipe", { scaleX: 0, transformOrigin: "0% 50%" }, 0);

    // =========================================================================
    // VIEW 1 (0.00s – 7.62s): HOOK — AI-AUGMENTED ENGINEERING CORE (Obsidian)
    // =========================================================================
    shot(0, 1.4, 1.0, 960, 540, "power3.out");
    tl.fromTo(
      "#bm-v1-kicker",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      0.15
    );
    tl.fromTo(
      "#bm-v1-title-1",
      { opacity: 0, y: 80, filter: "url(#bm-blur-y)" },
      { opacity: 1, y: 0, duration: 0.85, ease: "power4.out", clearProps: "filter" },
      0.45
    );
    setMotionBlurY(0.45, 22, 0, 0.75);

    // Highlight box draws around "AI-Augmented Engineering" right when narrator speaks it (2.26s)
    tl.fromTo(
      "#bm-v1-title-2",
      { opacity: 0, x: -70, filter: "url(#bm-blur-x)" },
      { opacity: 1, x: 0, duration: 0.85, ease: "power4.out", clearProps: "filter" },
      2.1
    );
    setMotionBlurX(2.1, 28, 0, 0.75);
    tl.fromTo(
      "#bm-v1-box-stroke",
      { strokeDashoffset: 1900 },
      { strokeDashoffset: 0, duration: 0.9, ease: "power3.out" },
      2.25
    );

    // Deterministic architecture conduit activates at 3.58s
    tl.fromTo(
      "#bm-v1-rail",
      { scaleX: 0, transformOrigin: "0% 50%" },
      { scaleX: 1, duration: 1.0, ease: "power3.out" },
      3.55
    );
    tl.fromTo(
      qa("#bm-v1-nodes .bm-pill"),
      { opacity: 0, y: 36, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.16, ease: "back.out(1.6)" },
      4.1
    );
    shot(4.8, 2.4, 1.09, 980, 560, "sine.inOut");

    // Precision Shutter Wipe Transition (Obsidian → Warm Blueprint Ivory) at 7.35s
    tl.set("#bm-wipe", { transformOrigin: "0% 50%", scaleX: 0, backgroundColor: "#c8f53c" }, 7.25);
    tl.to("#bm-wipe", { scaleX: 1, duration: 0.34, ease: "power3.in" }, 7.25);
    tl.set("#bm-v1", { autoAlpha: 0 }, 7.59);
    tl.set("#bm-v2", { autoAlpha: 1 }, 7.59);
    tl.set(CAM, { s: 1.24, fx: 620, fy: 460 }, 7.59);
    tl.set("#bm-wipe", { transformOrigin: "100% 50%" }, 7.6);
    tl.to("#bm-wipe", { scaleX: 0, duration: 0.42, ease: "power3.out" }, 7.6);

    // =========================================================================
    // VIEW 2 (7.62s – 19.04s): DETERMINISTIC PRDs & 21 AGENT SKILLS (Ivory Blueprint)
    // =========================================================================
    shot(7.62, 1.3, 1.15, 620, 480, "power2.out");
    tl.fromTo(
      "#bm-v2-head",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power4.out" },
      7.75
    );
    // Blueprint SVG contract schematic draws dynamically
    tl.fromTo(
      qa("#bm-v2-blueprint path, #bm-v2-blueprint rect"),
      { strokeDashoffset: 900, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: "power2.out" },
      8.6
    );
    // Contract locks (ERD, OpenAPI, RBAC) slam cleanly into place right at 11.4–13.5s
    tl.fromTo(
      qa("#bm-v2-locks .bm-lock"),
      { opacity: 0, scale: 0.75, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.32, ease: "back.out(1.7)" },
      11.2
    );

    // Camera pans right to welcome 21 Modular Agent Skills (Prompt Engineering)
    shot(13.6, 1.5, 1.14, 1340, 560, "power2.inOut");
    tl.fromTo(
      "#bm-v2-skills-panel",
      { opacity: 0, x: 90 },
      { opacity: 1, x: 0, duration: 0.75, ease: "power4.out" },
      14.1
    );
    tl.fromTo(
      qa("#bm-v2-skill-chips .bm-chip"),
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, ease: "back.out(1.8)" },
      14.7
    );
    // Pull back to wide HOME so full Deterministic Blueprint is visible
    shot(16.6, 1.3, 1.0, 960, 540, "power2.inOut");

    // 3D Motivated Push-Through Dive into Obsidian Command Core (18.6s → 19.04s)
    shot(18.55, 0.48, 2.05, 960, 540, "power2.in");
    tl.to("#bm-v2", { autoAlpha: 0, duration: 0.2 }, 18.85);
    tl.set("#bm-v3", { autoAlpha: 1 }, 19.03);
    tl.set(CAM, { s: 1.4, fx: 960, fy: 540 }, 19.03);
    shot(19.04, 0.95, 1.0, 960, 540, "power3.out");

    // =========================================================================
    // VIEW 3 (19.04s – 32.54s): CLAUDE CODE · GOOGLE ANTIGRAVITY · 43+ MCP TOOLS
    // =========================================================================
    tl.fromTo(
      "#bm-v3-claude",
      { opacity: 0, x: -110, rotateY: -22 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: "power4.out" },
      19.05
    );
    tl.fromTo(
      "#bm-v3-antigravity",
      { opacity: 0, x: 110, rotateY: 22 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: "power4.out" },
      20.25
    );

    // Parallel execution conduits flow down into custom TypeScript MCP Servers
    tl.fromTo(
      qa("#bm-v3-conduits path"),
      { strokeDashoffset: 680 },
      { strokeDashoffset: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" },
      21.6
    );

    // Custom TypeScript MCP Hub rises right at 24.3s ("MCP servers")
    shot(23.8, 1.2, 1.12, 960, 680, "power2.inOut");
    tl.fromTo(
      "#bm-v3-mcp-core",
      { opacity: 0, y: 75, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" },
      24.25
    );

    // Deterministic tabular-nums counter 0 → 43+ MCP Tools right at 26.15s
    const mcpCounter = { v: 0 };
    const mcpNumEl = q("#bm-mcp-count");
    tl.to(
      mcpCounter,
      {
        v: 43,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (mcpNumEl) mcpNumEl.textContent = `${Math.round(mcpCounter.v)}+`;
        },
      },
      26.0
    );

    // Task DAG, File Locks, Evidence Gates ignite sequentially
    tl.fromTo(
      qa("#bm-v3-gates .bm-gate"),
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.45, ease: "power3.out" },
      27.5
    );
    shot(30.4, 1.4, 1.0, 960, 540, "power2.inOut");

    // Directional Whip-Pan Transition (View 3 → View 4) at 32.25s
    tl.to("#bm-v3", { x: -180, autoAlpha: 0, filter: "url(#bm-blur-x)", duration: 0.3, ease: "power2.in" }, 32.24);
    setMotionBlurX(32.24, 0, 32, 0.28);
    tl.set("#bm-v4", { autoAlpha: 1, x: 180, filter: "url(#bm-blur-x)" }, 32.54);
    tl.to("#bm-v4", { x: 0, duration: 0.48, ease: "power3.out", clearProps: "filter" }, 32.54);
    setMotionBlurX(32.54, 30, 0, 0.45);

    // =========================================================================
    // VIEW 4 (32.54s – 51.44s): HYBRID & AGENTIC RAG TELEMETRY ENGINE
    // =========================================================================
    tl.fromTo(
      "#bm-v4-head",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      32.7
    );
    // Supabase pgvector & BM25 pipelines arrive on exact cues (35.89s & 37.48s)
    tl.fromTo(
      "#bm-v4-pgvector",
      { opacity: 0, x: -90 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power4.out" },
      35.7
    );
    tl.fromTo(
      "#bm-v4-bm25",
      { opacity: 0, x: -90 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power4.out" },
      37.3
    );
    // Weighted RRF Fusion lines connect & pulse
    tl.fromTo(
      qa("#bm-v4-fusion-paths path"),
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 1.0, stagger: 0.15, ease: "power2.out" },
      38.9
    );
    tl.fromTo(
      "#bm-v4-wrrf",
      { opacity: 0, scale: 0.75 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
      39.6
    );

    // Camera focuses right onto Telemetry Odometer: 75.00% → 91.67% Recall & MRR 1.00 (42.96s)
    shot(42.2, 1.1, 1.16, 1340, 480, "power2.inOut");
    tl.fromTo(
      "#bm-v4-metrics",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
      42.6
    );
    const recallObj = { v: 75.0 };
    const recallEl = q("#bm-recall-val");
    tl.to(
      recallObj,
      {
        v: 91.67,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          if (recallEl) recallEl.textContent = `${recallObj.v.toFixed(2)}%`;
        },
      },
      42.95
    );

    // Redis Cache 18.3s → 694ms Speedometer sweep right at 47.4–48.8s
    const redisObj = { v: 18300 };
    const redisEl = q("#bm-redis-val");
    tl.to(
      redisObj,
      {
        v: 694,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          if (redisEl) redisEl.textContent = `${Math.round(redisObj.v)}ms`;
        },
      },
      47.6
    );
    tl.fromTo(
      "#bm-redis-bar",
      { scaleX: 1, transformOrigin: "0% 50%" },
      { scaleX: 0.08, duration: 1.4, ease: "power3.out" },
      47.6
    );

    // Multi-Hop Self-Critic Grounding Loop ignites at 49.4s
    shot(49.0, 1.0, 1.0, 960, 540, "power2.inOut");
    tl.fromTo(
      "#bm-v4-critic",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
      49.45
    );

    // Precision Shutter Wipe Transition (View 4 → View 5 Full-Stack Matrix) at 51.15s
    tl.set("#bm-wipe", { transformOrigin: "0% 50%", scaleX: 0, backgroundColor: "#56ccf2" }, 51.12);
    tl.to("#bm-wipe", { scaleX: 1, duration: 0.3, ease: "power3.in" }, 51.12);
    tl.set("#bm-v4", { autoAlpha: 0 }, 51.43);
    tl.set("#bm-v5", { autoAlpha: 1 }, 51.43);
    tl.set(CAM, { s: 1.15, fx: 540, fy: 420 }, 51.43);
    tl.set("#bm-wipe", { transformOrigin: "100% 50%" }, 51.44);
    tl.to("#bm-wipe", { scaleX: 0, duration: 0.38, ease: "power3.out" }, 51.44);

    // =========================================================================
    // VIEW 5 (51.44s – 72.28s): FULL-STACK PRODUCTION MATRIX (4 Connected Layers)
    // =========================================================================
    // Tier 1: Frontend (52.55s)
    tl.fromTo(
      "#bm-stack-fe",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      52.1
    );
    // Camera pans right to Tier 2: Backend & APIs (59.52s)
    shot(58.5, 1.2, 1.15, 1380, 420, "power2.inOut");
    tl.fromTo(
      "#bm-stack-be",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      59.0
    );
    // Camera pans down-left to Tier 3: Database, Vector & Cache (62.47s)
    shot(62.0, 1.2, 1.15, 540, 760, "power2.inOut");
    tl.fromTo(
      "#bm-stack-db",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      62.3
    );
    // Camera pans down-right to Tier 4: Polyglot Languages (67.97s)
    shot(67.2, 1.2, 1.15, 1380, 760, "power2.inOut");
    tl.fromTo(
      "#bm-stack-lang",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      67.6
    );
    // Pull wide so all 4 full-stack layers glow as one connected architectural blueprint
    shot(70.2, 1.3, 1.0, 960, 540, "power2.inOut");

    // Motivated Push-Through into Verification & Global Edge Ship (71.95s → 72.28s)
    tl.to("#bm-v5", { scale: 0.92, autoAlpha: 0, duration: 0.34, ease: "power2.in" }, 71.94);
    tl.set("#bm-v6", { autoAlpha: 1, scale: 1.08 }, 72.28);
    tl.to("#bm-v6", { scale: 1, duration: 0.65, ease: "power3.out" }, 72.28);

    // =========================================================================
    // VIEW 6 (72.28s – 84.07s): AUTOMATED QA (13-VP PLAYWRIGHT) & EDGE SHIP FINALE
    // =========================================================================
    tl.fromTo(
      "#bm-v6-tests",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" },
      72.55
    );
    // All 13 Playwright viewport audit cells light green sequentially right at 75.5s
    tl.fromTo(
      qa("#bm-v6-viewports .bm-vp"),
      { opacity: 0.15, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 0.25, stagger: 0.12, ease: "back.out(1.7)" },
      75.2
    );
    // Deployment target nodes (GitHub Actions → Vercel · Cloudflare Workers · Hostinger)
    tl.fromTo(
      "#bm-v6-deploy",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      78.2
    );
    // Grand Finale Statement (80.5s – 84.07s) with continuous slow push-in (never frozen)
    tl.fromTo(
      "#bm-v6-finale",
      { opacity: 0, y: 42 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" },
      80.5
    );
    shot(80.6, 3.4, 1.06, 960, 560, "sine.inOut");
    tl.to({}, { duration: 0.01 }, TOTAL_DURATION);

    tlRef.current = tl;
    // Park on a rich, crisp poster frame (t = 5.0s) before auto-play triggers on viewport entry
    // so neither initial SSR/reduced-motion nor idle views ever show a blank dark screen.
    tl.pause(5.0, true);
    applyCam(5.0);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [scrollTo]);

  // Auto-Play automatically when user arrives in the Outer World Theater via scroll!
  useEffect(() => {
    const target = viewportBoxRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          if (!hasAutoPlayedRef.current && !userPausedRef.current) {
            hasAutoPlayedRef.current = true;
            startPlayback(true);
          }
        } else if (!entry.isIntersecting) {
          // Pause audio cleanly if user scrolls completely out of the theater
          const tl = tlRef.current;
          const audio = audioRef.current;
          if (tl && !tl.paused()) {
            tl.pause();
            setIsPlaying(false);
          }
          if (audio && !audio.paused) {
            audio.pause();
          }
        }
      },
      { threshold: [0.1, 0.45, 0.75] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [startPlayback]);

  const handleTogglePlay = () => {
    unlockAudio();
    const tl = tlRef.current;
    const audio = audioRef.current;
    if (!tl) return;

    if (!hasStartedOnceRef.current || isCompleted || tl.time() >= TOTAL_DURATION - 0.1) {
      startPlayback(true);
      return;
    }

    if (tl.paused()) {
      startPlayback(false);
    } else {
      userPausedRef.current = true;
      tl.pause();
      if (audio && !audio.paused) audio.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    unlockAudio();
    const audio = audioRef.current;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audio) {
      audio.muted = nextMuted;
      if (!nextMuted && isPlaying && audio.paused) {
        audio.currentTime = tlRef.current?.time() ?? 0;
        audio
          .play()
          .then(() => setNeedsAudioGesture(false))
          .catch(() => {});
      }
    }
  };

  const handleUnlockAudioClick = () => {
    unlockAudio();
    setIsMuted(false);
    const audio = audioRef.current;
    const tl = tlRef.current;
    if (audio && tl) {
      audio.muted = false;
      audio.currentTime = tl.time();
      audio
        .play()
        .then(() => setNeedsAudioGesture(false))
        .catch(() => {});
    }
  };

  const handleSeekBeat = (startSec: number) => {
    unlockAudio();
    const tl = tlRef.current;
    const audio = audioRef.current;
    if (!tl) return;
    tl.time(startSec);
    if (audio) audio.currentTime = startSec;
    if (tl.paused()) {
      startPlayback(false);
    }
  };

  const progressPct = Math.min(100, (currentTime / TOTAL_DURATION) * 100);
  const currentBeat = VO_BEATS[activeBeatIdx] ?? VO_BEATS[0];

  return (
    <div className="space-y-4">
      {/* Header Bar above Cinema Frame */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>04 / Technical Stack &amp; AI-Augmented Engineering Film</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] leading-[1.06]">
            How AI-Augmented Software Engineering Works
          </h2>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("#education-credentials", -84)}
          className="inline-flex min-h-11 items-center gap-2 border border-border-strong bg-surface px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary cursor-pointer"
        >
          <span>Skip to Education &amp; Certs</span>
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Synced English Neural Voice-Over Audio Element (WCAG 1.4.2 + lazy-load-video-and-audio) */}
      <audio
        ref={audioRef}
        preload="none"
        aria-label="English voice-over narration explaining AI-Augmented Engineering and Technical Stack"
      />

      {/* Widescreen 16:9 Bang-Motion Deterministic Stage */}
      <div className="relative overflow-hidden border border-border-strong bg-[#080b0f] shadow-2xl">
        {/* One-Click Voice-Over Unlock Pill (only shown if browser blocked unmuted autoplay prior to user click) */}
        {needsAudioGesture && !isMuted ? (
          <div className="absolute top-4 right-4 z-40">
            <button
              type="button"
              onClick={handleUnlockAudioClick}
              className="inline-flex min-h-11 items-center gap-2 bg-[#c8f53c] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#080b0f] shadow-xl hover:bg-[#d8fa6a] cursor-pointer"
            >
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              <span>Enable English Voice Over</span>
            </button>
          </div>
        ) : null}

        {/* Completion Auto-Scroll Notice */}
        {isCompleted ? (
          <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center px-4">
            <div className="inline-flex items-center gap-3 border border-[#c8f53c] bg-[#080b0f]/95 px-5 py-2.5 font-mono text-xs font-semibold text-[#c8f53c] shadow-2xl">
              <span>Film Complete — Scrolling to Education &amp; Google AI Certifications ↓</span>
            </div>
          </div>
        ) : null}

        <div
          ref={viewportBoxRef}
          className="relative aspect-video w-full overflow-hidden bg-[#080b0f]"
        >
          {/* Fixed 1920x1080 Bang-Motion Stage scaled cleanly */}
          <div
            ref={stageRef}
            style={{
              width: STAGE_W,
              height: STAGE_H,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(0.5)",
              transformOrigin: "center center",
            }}
            className="overflow-hidden bg-[#080b0f] text-[#f3f5f2] select-none"
          >
            {/* Shared SVG Directional Motion Blur & Grain Filters (wide -70%/240% region per Bang-Motion §2) */}
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
              <defs>
                <filter id="bm-blur-x" x="-70%" y="-70%" width="240%" height="240%">
                  <feGaussianBlur id="bm-blur-x-node" in="SourceGraphic" stdDeviation="0 0" />
                </filter>
                <filter id="bm-blur-y" x="-70%" y="-70%" width="240%" height="240%">
                  <feGaussianBlur id="bm-blur-y-node" in="SourceGraphic" stdDeviation="0 0" />
                </filter>
                <filter id="bm-grain-filter" x="0" y="0" width="100%" height="100%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.78"
                    numOctaves="2"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </defs>
            </svg>

            {/* Continuous Camera Rig (#bm-world) */}
            <div
              ref={worldRef}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "0 0",
                willChange: "transform",
              }}
            >
              {/* Multi-Layer Architectural Living Background (Never Flat) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -240,
                  background:
                    "radial-gradient(68% 46% at 50% 106%, rgba(200,245,60,0.22), rgba(86,204,242,0.08) 48%, transparent 72%), linear-gradient(180deg, #05070a 0%, #090d12 58%, #0e151d 100%)",
                }}
              />
              {/* Slowly Rotating Architectural Blueprint Compass (Background Motion §7c #6) */}
              <svg
                id="bm-bg-orbit"
                viewBox="0 0 1920 1080"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 1920,
                  height: 1080,
                  opacity: 0.14,
                  transformOrigin: "960px 540px",
                }}
              >
                <circle cx="960" cy="540" r="460" fill="none" stroke="#c8f53c" strokeWidth="1.5" strokeDasharray="10 14" />
                <circle cx="960" cy="540" r="680" fill="none" stroke="#56ccf2" strokeWidth="1.2" />
                <line x1="0" y1="540" x2="1920" y2="540" stroke="#f3f5f2" strokeWidth="1" opacity="0.25" />
                <line x1="960" y1="0" x2="960" y2="1080" stroke="#f3f5f2" strokeWidth="1" opacity="0.25" />
              </svg>

              {/* ============================================================
                  VIEW 1: HOOK — AI-AUGMENTED ENGINEERING THESIS (0s – 7.6s)
                  ============================================================ */}
              <div
                id="bm-v1"
                style={{ position: "absolute", inset: 0 }}
                className="flex flex-col items-center justify-center px-28"
              >
                <div
                  id="bm-v1-kicker"
                  style={{ fontSize: 34, letterSpacing: "0.24em" }}
                  className="mb-8 font-mono font-semibold uppercase text-[#56ccf2]"
                >
                  BEYOND RAW CHAT PROMPTING
                </div>

                <div
                  id="bm-v1-title-1"
                  style={{ fontSize: 96, lineHeight: 1.08 }}
                  className="font-heading font-medium text-[#cfd7dc]"
                >
                  Deterministic Architecture ×
                </div>

                <div id="bm-v1-title-2" className="relative mt-4 inline-block px-10 py-4">
                  <svg
                    viewBox="0 0 1420 190"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
                  >
                    <rect
                      id="bm-v1-box-stroke"
                      x="6"
                      y="6"
                      width="1408"
                      height="178"
                      rx="14"
                      fill="rgba(200,245,60,0.08)"
                      stroke="#c8f53c"
                      strokeWidth="5"
                      strokeDasharray="1900"
                      strokeDashoffset="1900"
                    />
                  </svg>
                  <div
                    style={{ fontSize: 120, lineHeight: 1.04 }}
                    className="relative font-heading font-semibold tracking-tight text-white"
                  >
                    AI-Augmented Engineering
                  </div>
                </div>

                <div
                  id="bm-v1-rail"
                  className="mt-14 h-[4px] w-[1240px] bg-gradient-to-r from-[#c8f53c] via-[#56ccf2] to-[#4ade80]"
                />

                <div id="bm-v1-nodes" className="mt-10 flex items-center gap-8">
                  {["Deterministic PRDs", "Custom MCP Servers", "Autonomous Agents", "Verified Delivery"].map(
                    (item) => (
                      <div
                        key={item}
                        style={{ fontSize: 32 }}
                        className="bm-pill border border-white/20 bg-[#121820]/90 px-7 py-3.5 font-mono font-semibold text-[#f3f5f2]"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ============================================================
                  VIEW 2: WARM ARCHITECTURAL IVORY — DETERMINISTIC PRDs & 21 AGENT SKILLS
                  ============================================================ */}
              <div
                id="bm-v2"
                style={{
                  position: "absolute",
                  inset: -120,
                  padding: "170px 210px",
                  background:
                    "radial-gradient(60% 50% at 80% 18%, rgba(24,92,55,0.14), transparent 65%), linear-gradient(155deg, #f6f3eb 0%, #ede8dc 62%, #e6e0d1 100%)",
                  color: "#0e151a",
                }}
              >
                <div id="bm-v2-head" className="mb-10 flex items-end justify-between border-b-2 border-[#0e151a]/20 pb-6">
                  <div>
                    <div style={{ fontSize: 32, letterSpacing: "0.18em" }} className="font-mono font-bold uppercase text-[#185c37]">
                      PHASE 01 // SPECIFICATION LOCK
                    </div>
                    <div style={{ fontSize: 82, lineHeight: 1.05 }} className="mt-2 font-heading font-bold tracking-tight text-[#0e151a]">
                      Deterministic PRDs &amp; 21 Agent Skills
                    </div>
                  </div>
                  <div style={{ fontSize: 34 }} className="bg-[#185c37] px-6 py-3 font-mono font-bold text-white">
                    ZERO PROMPT DRIFT
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-12 pt-4">
                  {/* Left 6 Cols: Live Drawing Blueprint Contract */}
                  <div className="col-span-6 space-y-6">
                    <svg
                      id="bm-v2-blueprint"
                      viewBox="0 0 760 360"
                      className="w-full border-2 border-[#0e151a]/20 bg-white/80 p-4"
                    >
                      <rect x="20" y="20" width="720" height="320" fill="none" stroke="#185c37" strokeWidth="3" strokeDasharray="900" />
                      <path d="M20 95 L740 95" stroke="#0e151a" strokeWidth="2" strokeDasharray="900" />
                      <path d="M260 95 L260 340" stroke="#035e8c" strokeWidth="2" strokeDasharray="900" />
                      <path d="M510 95 L510 340" stroke="#035e8c" strokeWidth="2" strokeDasharray="900" />
                      <text x="44" y="68" fill="#185c37" fontSize="30" fontFamily="monospace" fontWeight="700">
                        BLUEPRINT.SPEC.YAML — MACHINE READABLE
                      </text>
                      <text x="44" y="160" fill="#0e151a" fontSize="28" fontFamily="monospace" fontWeight="700">
                        RELATIONAL ERD
                      </text>
                      <text x="44" y="210" fill="#455159" fontSize="24" fontFamily="monospace">
                        12 Modules
                      </text>
                      <text x="284" y="160" fill="#035e8c" fontSize="28" fontFamily="monospace" fontWeight="700">
                        OPENAPI 3.1
                      </text>
                      <text x="284" y="210" fill="#455159" fontSize="24" fontFamily="monospace">
                        Typed Contracts
                      </text>
                      <text x="534" y="160" fill="#8a5600" fontSize="28" fontFamily="monospace" fontWeight="700">
                        RBAC MATRIX
                      </text>
                      <text x="534" y="210" fill="#455159" fontSize="24" fontFamily="monospace">
                        Threat Model
                      </text>
                    </svg>

                    <div id="bm-v2-locks" className="grid grid-cols-3 gap-5">
                      {[
                        { tag: "ERD LOCKED", sub: "Schema Invariants" },
                        { tag: "OPENAPI", sub: "End-to-End Types" },
                        { tag: "RBAC GATE", sub: "Least Privilege" },
                      ].map((lock) => (
                        <div
                          key={lock.tag}
                          className="bm-lock border-2 border-[#185c37] bg-white px-5 py-5"
                        >
                          <div style={{ fontSize: 30 }} className="font-mono font-bold text-[#185c37]">
                            {lock.tag}
                          </div>
                          <div style={{ fontSize: 24 }} className="mt-1 font-body text-[#252e35]">
                            {lock.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right 6 Cols: Agent Skills Prompt Engineering */}
                  <div id="bm-v2-skills-panel" className="col-span-6 border-2 border-[#0e151a]/25 bg-[#0f161c] p-9 text-white">
                    <div className="flex items-center justify-between border-b border-white/15 pb-5">
                      <span style={{ fontSize: 34 }} className="font-heading font-bold text-[#c8f53c]">
                        Agent Skills Prompt Engineering
                      </span>
                      <span style={{ fontSize: 36 }} className="font-mono font-bold text-white tabular-nums">
                        21 SKILLS
                      </span>
                    </div>

                    <div id="bm-v2-skill-chips" className="mt-7 grid grid-cols-2 gap-4">
                      {[
                        "Clean Architecture",
                        "Design Direction",
                        "Backend Contracts",
                        "Frontend A11y QA",
                        "Three.js Shaders",
                        "Motion & Physics",
                        "Security Review",
                        "Evidence Gates",
                      ].map((skill) => (
                        <div
                          key={skill}
                          style={{ fontSize: 28 }}
                          className="bm-chip border border-white/15 bg-white/[0.06] px-5 py-4 font-mono font-semibold text-[#f3f5f2]"
                        >
                          ▸ {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  VIEW 3: CLAUDE CODE · GOOGLE ANTIGRAVITY · CUSTOM MCP (43+ TOOLS)
                  ============================================================ */}
              <div
                id="bm-v3"
                style={{ position: "absolute", inset: 0, padding: "86px 110px", perspective: 1400 }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div style={{ fontSize: 32, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#56ccf2]">
                    PHASE 02 // PARALLEL MULTI-AGENT ORCHESTRATION
                  </div>
                  <div style={{ fontSize: 32 }} className="font-mono font-bold text-[#c8f53c]">
                    TOOL-ENFORCED EXECUTION
                  </div>
                </div>

                {/* Top Parallel Agent Engines */}
                <div className="grid grid-cols-2 gap-16">
                  <div
                    id="bm-v3-claude"
                    className="border-2 border-[#c8f53c]/70 bg-[#10161c]/95 p-8 shadow-[0_0_50px_rgba(200,245,60,0.14)]"
                  >
                    <div style={{ fontSize: 28 }} className="font-mono font-bold uppercase text-[#c8f53c]">
                      AGENT ENGINE A
                    </div>
                    <div style={{ fontSize: 64 }} className="mt-1 font-heading font-bold text-white">
                      Claude Code
                    </div>
                    <div style={{ fontSize: 30 }} className="mt-2 font-mono text-[#cfd7dc]">
                      Autonomous Refactor · Backend &amp; Tests
                    </div>
                  </div>

                  <div
                    id="bm-v3-antigravity"
                    className="border-2 border-[#56ccf2]/70 bg-[#10161c]/95 p-8 shadow-[0_0_50px_rgba(86,204,242,0.14)]"
                  >
                    <div style={{ fontSize: 28 }} className="font-mono font-bold uppercase text-[#56ccf2]">
                      AGENT ENGINE B
                    </div>
                    <div style={{ fontSize: 64 }} className="mt-1 font-heading font-bold text-white">
                      Google Antigravity
                    </div>
                    <div style={{ fontSize: 30 }} className="mt-2 font-mono text-[#cfd7dc]">
                      Parallel Subagents · UI &amp; Browser QA
                    </div>
                  </div>
                </div>

                {/* Animated Conduits Connecting Both Agents into Custom MCP Server */}
                <svg id="bm-v3-conduits" viewBox="0 0 1700 130" className="my-2 h-[115px] w-full">
                  <path
                    d="M 420 0 C 420 75, 850 55, 850 130"
                    fill="none"
                    stroke="#c8f53c"
                    strokeWidth="6"
                    strokeDasharray="680"
                    strokeDashoffset="680"
                  />
                  <path
                    d="M 1280 0 C 1280 75, 850 55, 850 130"
                    fill="none"
                    stroke="#56ccf2"
                    strokeWidth="6"
                    strokeDasharray="680"
                    strokeDashoffset="680"
                  />
                </svg>

                {/* Custom TypeScript MCP Server Hub */}
                <div
                  id="bm-v3-mcp-core"
                  className="border-2 border-white/25 bg-[#0e141b]/95 p-9"
                >
                  <div className="flex items-center justify-between border-b border-white/15 pb-6">
                    <div>
                      <div style={{ fontSize: 30 }} className="font-mono uppercase tracking-[0.16em] text-[#f5b942]">
                        CUSTOM TYPESCRIPT MCP SERVER DEVELOPMENT
                      </div>
                      <div style={{ fontSize: 56 }} className="mt-1 font-heading font-bold text-white">
                        Principal Agentic Harness &amp; Three.js Visual QA
                      </div>
                    </div>
                    <div className="bg-[#c8f53c] px-8 py-4 text-center text-[#080b0f]">
                      <div
                        id="bm-mcp-count"
                        style={{ fontSize: 72, lineHeight: 1 }}
                        className="font-heading font-extrabold tabular-nums min-w-[3.2ch]"
                      >
                        43+
                      </div>
                      <div style={{ fontSize: 24 }} className="font-mono font-bold uppercase">
                        MCP TOOLS
                      </div>
                    </div>
                  </div>

                  <div id="bm-v3-gates" className="mt-7 grid grid-cols-3 gap-6">
                    {[
                      { title: "Task DAG Planner", detail: "Dependency-ordered parallel workstreams", accent: "#c8f53c" },
                      { title: "Exclusive File Locks", detail: "Zero concurrent overwrite collisions", accent: "#56ccf2" },
                      { title: "Evidence Quality Gates", detail: "Playwright + WebGL proof required", accent: "#4ade80" },
                    ].map((g) => (
                      <div
                        key={g.title}
                        style={{ borderTopColor: g.accent }}
                        className="bm-gate border border-white/15 border-t-4 bg-white/[0.04] p-6"
                      >
                        <div style={{ fontSize: 34, color: g.accent }} className="font-heading font-bold">
                          {g.title}
                        </div>
                        <div style={{ fontSize: 26 }} className="mt-2 font-body text-[#cfd7dc]">
                          {g.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ============================================================
                  VIEW 4: HYBRID & AGENTIC RAG TELEMETRY INSTRUMENT (32.5s – 51.4s)
                  ============================================================ */}
              <div id="bm-v4" style={{ position: "absolute", inset: 0, padding: "84px 108px" }}>
                <div id="bm-v4-head" className="mb-8 flex items-end justify-between border-b border-white/15 pb-5">
                  <div>
                    <div style={{ fontSize: 30, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#56ccf2]">
                      PHASE 03 // INTELLIGENT RETRIEVAL ENGINE
                    </div>
                    <div style={{ fontSize: 74, lineHeight: 1.04 }} className="mt-1 font-heading font-bold text-white">
                      Hybrid &amp; Agentic RAG Pipeline
                    </div>
                  </div>
                  <div style={{ fontSize: 30 }} className="border border-[#c8f53c]/60 bg-[#c8f53c]/10 px-6 py-2.5 font-mono font-bold text-[#c8f53c]">
                    WEIGHTED RRF · SELF-CRITIC
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-8">
                  {/* Left 4 Cols: Dual Retrieval Sources */}
                  <div className="col-span-4 space-y-6">
                    <div id="bm-v4-pgvector" className="border-2 border-[#56ccf2]/70 bg-[#101820] p-7">
                      <div style={{ fontSize: 26 }} className="font-mono font-bold text-[#56ccf2]">
                        DENSE SEMANTIC SEARCH
                      </div>
                      <div style={{ fontSize: 44 }} className="mt-1 font-heading font-bold text-white">
                        Supabase pgvector
                      </div>
                      <div style={{ fontSize: 28 }} className="mt-2 font-mono text-[#cfd7dc]">
                        Gemini Embeddings · Top-50 Chunks
                      </div>
                    </div>

                    <div id="bm-v4-bm25" className="border-2 border-[#f5b942]/70 bg-[#101820] p-7">
                      <div style={{ fontSize: 26 }} className="font-mono font-bold text-[#f5b942]">
                        SPARSE LEXICAL RERANK
                      </div>
                      <div style={{ fontSize: 44 }} className="mt-1 font-heading font-bold text-white">
                        BM25 Exact Match
                      </div>
                      <div style={{ fontSize: 28 }} className="mt-2 font-mono text-[#cfd7dc]">
                        Course Codes &amp; Policy Clauses
                      </div>
                    </div>
                  </div>

                  {/* Middle 3 Cols: Weighted RRF Fusion Core */}
                  <div className="col-span-3 flex flex-col items-center">
                    <svg id="bm-v4-fusion-paths" viewBox="0 0 380 120" className="w-full">
                      <path d="M 0 20 C 120 20, 140 60, 380 60" fill="none" stroke="#56ccf2" strokeWidth="5" strokeDasharray="600" strokeDashoffset="600" />
                      <path d="M 0 100 C 120 100, 140 60, 380 60" fill="none" stroke="#f5b942" strokeWidth="5" strokeDasharray="600" strokeDashoffset="600" />
                    </svg>
                    <div
                      id="bm-v4-wrrf"
                      className="my-3 w-full border-2 border-[#c8f53c] bg-[#c8f53c]/15 px-6 py-8 text-center"
                    >
                      <div style={{ fontSize: 26 }} className="font-mono font-bold uppercase text-[#c8f53c]">
                        FUSION ENGINE
                      </div>
                      <div style={{ fontSize: 54 }} className="mt-1 font-heading font-extrabold text-white">
                        wRRF
                      </div>
                      <div style={{ fontSize: 26 }} className="mt-1 font-mono text-[#cfd7dc]">
                        Top-5 Grounded Context
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Cols: Benchmarked Proof Odometers */}
                  <div id="bm-v4-metrics" className="col-span-5 space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="border border-white/20 bg-[#0e151c] p-6">
                        <div style={{ fontSize: 24 }} className="font-mono uppercase text-[#9aa7b0]">
                          RECALL SCORE
                        </div>
                        <div
                          id="bm-recall-val"
                          style={{ fontSize: 72, lineHeight: 1.05 }}
                          className="mt-2 font-heading font-extrabold text-[#c8f53c] tabular-nums min-w-[6ch]"
                        >
                          91.67%
                        </div>
                        <div style={{ fontSize: 24 }} className="mt-1 font-mono text-[#4ade80]">
                          ▲ up from 75.0%
                        </div>
                      </div>

                      <div className="border border-white/20 bg-[#0e151c] p-6">
                        <div style={{ fontSize: 24 }} className="font-mono uppercase text-[#9aa7b0]">
                          RANK PRECISION
                        </div>
                        <div
                          style={{ fontSize: 72, lineHeight: 1.05 }}
                          className="mt-2 font-heading font-extrabold text-[#56ccf2] tabular-nums"
                        >
                          1.00
                        </div>
                        <div style={{ fontSize: 24 }} className="mt-1 font-mono text-[#cfd7dc]">
                          MRR (up from 0.71)
                        </div>
                      </div>
                    </div>

                    {/* Redis Speedup Bar */}
                    <div className="border border-white/20 bg-[#0e151c] p-6">
                      <div className="flex items-baseline justify-between">
                        <span style={{ fontSize: 26 }} className="font-mono font-bold uppercase text-[#f5b942]">
                          REDIS CACHE · 26× FASTER
                        </span>
                        <span
                          id="bm-redis-val"
                          style={{ fontSize: 52 }}
                          className="font-heading font-extrabold text-white tabular-nums min-w-[5.5ch] text-right"
                        >
                          694ms
                        </span>
                      </div>
                      <div className="mt-4 h-5 w-full bg-white/10">
                        <div id="bm-redis-bar" className="h-full w-full bg-gradient-to-r from-[#4ade80] to-[#c8f53c]" />
                      </div>
                      <div style={{ fontSize: 22 }} className="mt-2 flex justify-between font-mono text-[#9aa7b0]">
                        <span>694ms Cached Fast Path</span>
                        <span>vs 18,300ms Uncached</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Self-Critic Grounding Loop Strip */}
                <div
                  id="bm-v4-critic"
                  className="mt-8 flex items-center justify-between border-2 border-[#4ade80]/60 bg-[#0e1815] px-8 py-5"
                >
                  <div style={{ fontSize: 34 }} className="font-heading font-bold text-[#4ade80]">
                    Agentic Multi-Hop Self-Critic Grounding Loop
                  </div>
                  <div style={{ fontSize: 28 }} className="font-mono text-white">
                    Cloudflare Workers · Gemini → Groq → Cohere → OpenRouter
                  </div>
                </div>
              </div>

              {/* ============================================================
                  VIEW 5: FULL-STACK PRODUCTION MATRIX (51.4s – 72.3s)
                  ============================================================ */}
              <div id="bm-v5" style={{ position: "absolute", inset: 0, padding: "74px 96px" }}>
                <div className="mb-8 flex items-end justify-between border-b border-white/15 pb-4">
                  <div>
                    <div style={{ fontSize: 28, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#c8f53c]">
                      PHASE 04 // COMPLETE TECHNICAL STACK
                    </div>
                    <div style={{ fontSize: 68, lineHeight: 1.05 }} className="mt-1 font-heading font-bold text-white">
                      Full-Stack Production Architecture
                    </div>
                  </div>
                  <div style={{ fontSize: 28 }} className="font-mono text-[#56ccf2]">
                    END-TO-END TYPED BOUNDARIES
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Frontend */}
                  <div id="bm-stack-fe" className="border-2 border-[#c8f53c]/60 bg-[#0f151b]/95 p-7">
                    <div style={{ fontSize: 26 }} className="font-mono font-bold uppercase text-[#c8f53c]">
                      01 // FRONTEND ARCHITECTURE
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3.5">
                      {["React 19", "Next.js 16", "Vue.js", "Tailwind CSS 4", "Framer Motion", "PWA & Recharts"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 30 }} className="border border-white/20 bg-white/[0.06] px-5 py-2.5 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Backend */}
                  <div id="bm-stack-be" className="border-2 border-[#56ccf2]/60 bg-[#0f151b]/95 p-7">
                    <div style={{ fontSize: 26 }} className="font-mono font-bold uppercase text-[#56ccf2]">
                      02 // BACKEND &amp; EDGE APIS
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3.5">
                      {["Node.js", "NestJS", "Express.js", "Hono", "Laravel", "OpenAPI & RBAC"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 30 }} className="border border-white/20 bg-white/[0.06] px-5 py-2.5 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Database & Vector */}
                  <div id="bm-stack-db" className="border-2 border-[#4ade80]/60 bg-[#0f151b]/95 p-7">
                    <div style={{ fontSize: 26 }} className="font-mono font-bold uppercase text-[#4ade80]">
                      03 // DATABASE, VECTOR &amp; CACHE
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {["PostgreSQL", "MySQL", "Prisma ORM", "Supabase pgvector", "Neon", "Redis + BullMQ", "Dexie Offline"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 28 }} className="border border-white/20 bg-white/[0.06] px-4 py-2 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Polyglot Languages */}
                  <div id="bm-stack-lang" className="border-2 border-[#f5b942]/60 bg-[#0f151b]/95 p-7">
                    <div style={{ fontSize: 26 }} className="font-mono font-bold uppercase text-[#f5b942]">
                      04 // POLYGLOT LANGUAGES
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3.5">
                      {["TypeScript", "JavaScript", "Python", "PHP", "Kotlin", "MQL5", "HTML / CSS"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 30 }} className="border border-white/20 bg-white/[0.06] px-5 py-2.5 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  VIEW 6: AUTOMATED QA (13-VP PLAYWRIGHT) & GRAND FINALE (72.3s – 84.1s)
                  ============================================================ */}
              <div id="bm-v6" style={{ position: "absolute", inset: 0, padding: "86px 110px" }}>
                <div id="bm-v6-tests" className="flex items-end justify-between border-b border-white/15 pb-6">
                  <div>
                    <div style={{ fontSize: 30, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#4ade80]">
                      PHASE 05 // AUTONOMOUS VERIFICATION &amp; EDGE SHIP
                    </div>
                    <div style={{ fontSize: 70, lineHeight: 1.05 }} className="mt-1 font-heading font-bold text-white">
                      Jest · Supertest · 13-Viewport Playwright QA
                    </div>
                  </div>
                  <div style={{ fontSize: 32 }} className="bg-[#4ade80] px-6 py-2.5 font-mono font-bold text-[#080b0f]">
                    GATE PASS
                  </div>
                </div>

                {/* Live 13-Viewport Verification Matrix */}
                <div
                  id="bm-v6-viewports"
                  className="mt-9 grid gap-3"
                  style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
                >
                  {VIEWPORT_PROFILES.map((vp) => (
                    <div
                      key={vp}
                      className="bm-vp border-2 border-[#4ade80] bg-[#4ade80]/15 py-5 text-center"
                    >
                      <div style={{ fontSize: 26 }} className="font-mono font-bold text-[#4ade80] tabular-nums">
                        {vp}
                      </div>
                      <div style={{ fontSize: 18 }} className="mt-1 font-mono text-white">
                        OK
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deployment Strip */}
                <div id="bm-v6-deploy" className="mt-8 grid grid-cols-4 gap-6">
                  {["GitHub Actions CI/CD", "Vercel Edge", "Cloudflare Workers", "Hostinger & Railway"].map(
                    (dep) => (
                      <div
                        key={dep}
                        style={{ fontSize: 30 }}
                        className="border border-[#56ccf2]/55 bg-[#101820] px-6 py-5 text-center font-mono font-semibold text-[#f3f5f2]"
                      >
                        {dep}
                      </div>
                    )
                  )}
                </div>

                {/* Grand Finale Statement */}
                <div id="bm-v6-finale" className="mt-12 text-center">
                  <div style={{ fontSize: 92, lineHeight: 1.05 }} className="font-heading font-bold tracking-tight text-white">
                    Engineered to ship.{" "}
                    <span className="text-[#c8f53c]">Verified to last.</span>
                  </div>
                  <div style={{ fontSize: 32, letterSpacing: "0.2em" }} className="mt-4 font-mono uppercase text-[#9aa7b0]">
                    M. VICKY MOSAFAN · FULL-STACK &amp; AI-AUGMENTED ENGINEER
                  </div>
                </div>
              </div>
            </div>

            {/* Precision Precision Shutter Wipe Blade */}
            <div
              id="bm-wipe"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#c8f53c",
                zIndex: 30,
                pointerEvents: "none",
              }}
            />

            {/* Deterministic Living Film Grain Overlay */}
            <div
              ref={grainRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -60,
                pointerEvents: "none",
                filter: "url(#bm-grain-filter)",
                opacity: 0.14,
                mixBlendMode: "overlay",
                zIndex: 35,
              }}
            />

            {/* Subtle Edge Vignette outside Camera Rig */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(92% 90% at 50% 50%, transparent 62%, rgba(5,7,10,0.48) 100%)",
                zIndex: 36,
              }}
            />
          </div>
        </div>
      </div>

      {/* Discreet Below-Frame Cinema Controls & WCAG 1.4.2 Audio Control Bar */}
      <div className="border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              data-testid="bang-motion-play-toggle"
              className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-hover cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{isCompleted ? "Replay Film" : "Play Film"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={isMuted ? "Unmute English voice over" : "Mute English voice over"}
              className="inline-flex min-h-11 items-center gap-2 border border-border-strong bg-surface-elevated px-3.5 py-2 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span>VO Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                  <span>English VO On</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                unlockAudio();
                startPlayback(true);
              }}
              aria-label="Restart explainer film from beginning"
              className="inline-flex h-11 w-11 items-center justify-center border border-border bg-surface-elevated text-foreground hover:border-primary hover:text-primary cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="hidden text-primary font-semibold sm:inline">
              {currentBeat.label}
            </span>
            <span className="tabular-nums text-muted min-w-[11ch] text-right">
              {formatClock(currentTime)} / {formatClock(TOTAL_DURATION)}
            </span>
          </div>
        </div>

        {/* Interactive Chapter Progress Bar */}
        <div className="mt-3.5 space-y-2.5">
          <div className="h-1.5 w-full overflow-hidden bg-surface-elevated">
            <div
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
            {VO_BEATS.map((beat, i) => {
              const active = i === activeBeatIdx;
              return (
                <button
                  key={beat.id}
                  type="button"
                  onClick={() => handleSeekBeat(beat.start)}
                  className={`min-h-10 truncate border px-2.5 py-1.5 text-left font-mono text-[11px] font-medium cursor-pointer ${
                    active
                      ? "border-primary bg-primary-soft text-primary font-bold"
                      : "border-border bg-background/70 text-muted hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {beat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessible Collapsible English Voice-Over Transcript */}
        <details className="mt-3 border-t border-border pt-3">
          <summary className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs font-medium text-muted hover:text-foreground">
            <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Read Full English Voice-Over Script</span>
          </summary>
          <ol className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {VO_BEATS.map((beat) => (
              <li
                key={beat.id}
                className="border border-border bg-background/70 p-3 text-xs leading-relaxed text-ink-secondary"
              >
                <div className="mb-1 font-mono text-[11px] font-bold uppercase text-primary">
                  {beat.label} ({formatClock(beat.start)})
                </div>
                <p>{beat.text}</p>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  );
}
