"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { EXPLAINER_TOTAL_DURATION, VO_BEATS } from "@/data/voBeats";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { scheduleWhenScrollIdle } from "@/lib/scrollIdle";

const STAGE_W = 960;
const STAGE_H = 540;
const TOTAL_DURATION = EXPLAINER_TOTAL_DURATION;


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

interface BangMotionStackExplainerProps {
  portalReady?: boolean;
}

/**
 * Ultra-Smooth 120–300 FPS Bang-Motion Cinematic 16:9 Explainer Film:
 * - ZERO React state updates per frame (progress bar, scrubber, and clock update directly via DOM refs!).
 * - ZERO full-screen <feTurbulence> or animated <feGaussianBlur> filter rasterization — 100% GPU compositor!
 * - GSAP configured with force3D: true, autoSleep: 60, lagSmoothing(500, 33).
 * - Synced to expressive American English female neural Voice Over (en-US-AvaNeural).
 * - Showcases Craftrig MCP (vickyymosafan/mcp-craftrig), BuildFlow ERP, Claude Code, Google Antigravity,
 *   Deterministic PRDs, 21 Agent Skills, Hybrid & Agentic RAG, and Full-Stack Production Architecture.
 * - Auto-plays smoothly as soon as the seamless 03→04 portal locks into the Outer World Theater.
 * - Auto-scrolls cleanly to #education-credentials upon completion.
 */
export function BangMotionStackExplainer({
  portalReady = false,
}: BangMotionStackExplainerProps) {
  const { scrollTo } = useSmoothScroll();

  const viewportBoxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAutoPlayedRef = useRef(false);
  const hasStartedOnceRef = useRef(false);
  const hasAutoScrolledRef = useRef(false);
  const userPausedRef = useRef(false);
  const blobUrlRef = useRef<string | null>(null);
  const audioLoadedRef = useRef(false);
  const lastWholeSecRef = useRef(-1);
  const lastBeatIdxRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsAudioGesture, setNeedsAudioGesture] = useState(false);
  const [activeBeatIdx, setActiveBeatIdx] = useState(0);

  // Lazy-load English Female Voice-Over MP3 into in-memory Blob URL (zero Range aborts on seek)
  const ensureAudioLoaded = useCallback(async () => {
    if (audioLoadedRef.current || !audioRef.current) return;
    audioLoadedRef.current = true;
    try {
      const res = await fetch("/audio/ai-stack-explainer-vo.mp3");
      if (!res.ok) {
        audioLoadedRef.current = false;
        return;
      }
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

  // Revoke any in-memory audio Blob URL cleanly on unmount (audio is loaded ONLY when playback starts!)
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  // Scale 1920x1080 internal stage crisply to fit container width/height
  useEffect(() => {
    const box = viewportBoxRef.current;
    const stage = stageRef.current;
    if (!box || !stage) return;

    const fit = () => {
      const scale = Math.min(box.clientWidth / STAGE_W, box.clientHeight / STAGE_H);
      stage.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
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
            .then(() => setNeedsAudioGesture(false))
            .catch(() => setNeedsAudioGesture(true));
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

  // Build deterministic zero-lag GPU-composited GSAP Master Timeline
  useEffect(() => {
    const stage = stageRef.current;
    const world = worldRef.current;
    if (!stage || !world) return;

    // Context7 GSAP performance config: GPU layer promotion + battery-saving autoSleep + smooth lag compensation
    gsap.config({ force3D: true, autoSleep: 60, nullTargetWarn: false });
    gsap.ticker.lagSmoothing(500, 33);

    const q = (sel: string) => stage.querySelector<HTMLElement | SVGElement>(sel);
    const qa = (sel: string) => Array.from(stage.querySelectorAll<HTMLElement | SVGElement>(sel));

    // Cache DOM refs ONCE outside onUpdate (zero querySelector per frame!)
    const orbitRingEl = q("#bm-bg-orbit");
    const mcpNumEl = q("#bm-mcp-count");
    const recallEl = q("#bm-recall-val");
    const redisEl = q("#bm-redis-val");

    const CAM = { s: 1, fx: STAGE_W / 2, fy: STAGE_H / 2 };

    const applyCam = (t: number) => {
      const breath = 1 + 0.006 * Math.sin(t * 0.85);
      const s = CAM.s * breath;
      let tx = STAGE_W / 2 - CAM.fx * s;
      let ty = STAGE_H / 2 - CAM.fy * s;
      tx = Math.min(0, Math.max(STAGE_W - STAGE_W * s, tx));
      ty = Math.min(0, Math.max(STAGE_H - STAGE_H * s, ty));
      world.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;

      if (orbitRingEl) {
        orbitRingEl.style.transform = `rotate3d(0, 0, 1, ${(t * 5.0).toFixed(2)}deg)`;
      }
    };

    const syncHudRefs = (t: number) => {
      if (progressBarRef.current) {
        const ratio = Math.min(1, Math.max(0, t / TOTAL_DURATION));
        progressBarRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
      const wholeSec = Math.floor(t);
      if (wholeSec !== lastWholeSecRef.current) {
        lastWholeSecRef.current = wholeSec;
        if (clockRef.current) {
          clockRef.current.textContent = `${formatClock(t)} / ${formatClock(TOTAL_DURATION)}`;
        }
      }
    };

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const t = tl.time();
        applyCam(t);
        syncHudRefs(t);

        // Only trigger React state update when crossing one of the 6 beat boundaries (0 per-frame renders!)
        const idx = VO_BEATS.findIndex((b) => t >= b.start && t < b.end);
        if (idx !== -1 && idx !== lastBeatIdxRef.current) {
          lastBeatIdxRef.current = idx;
          setActiveBeatIdx(idx);
        }

        // Keep American Female VO tightly locked to GSAP timeline
        const audio = audioRef.current;
        if (audio && !audio.paused && !tl.paused()) {
          if (Math.abs(audio.currentTime - t) > 0.24) {
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

    // Reset all views cleanly at t = 0 — inactive views use display:none (6x less paint area!)
    tl.set(CAM, { s: 1.05, fx: 480, fy: 270 }, 0);
    tl.set(["#bm-v2", "#bm-v3", "#bm-v4", "#bm-v5", "#bm-v6"], { autoAlpha: 0, display: "none" }, 0);
    tl.set("#bm-v1", { display: "flex", autoAlpha: 1 }, 0);
    tl.set("#bm-wipe", { scaleX: 0, transformOrigin: "0% 50%" }, 0);

    // =========================================================================
    // VIEW 1 (0.00s – 7.76s): HOOK — AI-AUGMENTED ENGINEERING CORE (Obsidian)
    // =========================================================================
    shot(0, 1.35, 1.0, 480, 270, "power3.out");
    tl.fromTo(
      "#bm-v1-kicker",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" },
      0.12
    );
    // Pure GPU directional velocity entry (skewY/scaleY snap — zero CPU filter blur!)
    tl.fromTo(
      "#bm-v1-title-1",
      { opacity: 0, y: 76, scaleY: 1.18 },
      { opacity: 1, y: 0, scaleY: 1, duration: 0.78, ease: "power4.out" },
      0.42
    );

    // Highlight box draws right when narrator speaks "AI-Augmented Engineering" (1.86s)
    tl.fromTo(
      "#bm-v1-title-2",
      { opacity: 0, x: -72, skewX: -8, scaleX: 1.08 },
      { opacity: 1, x: 0, skewX: 0, scaleX: 1, duration: 0.78, ease: "power4.out" },
      1.75
    );
    tl.fromTo(
      "#bm-v1-box-stroke",
      { strokeDashoffset: 1900 },
      { strokeDashoffset: 0, duration: 0.85, ease: "power3.out" },
      1.86
    );

    // Deterministic architecture conduit activates right at 3.34s
    tl.fromTo(
      "#bm-v1-rail",
      { scaleX: 0, transformOrigin: "0% 50%" },
      { scaleX: 1, duration: 0.95, ease: "power3.out" },
      3.3
    );
    tl.fromTo(
      qa("#bm-v1-nodes .bm-pill"),
      { opacity: 0, y: 32, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.14, ease: "back.out(1.6)" },
      3.95
    );
    shot(4.8, 2.5, 1.08, 490, 278, "sine.inOut");

    // Precision Shutter Wipe Transition (Obsidian → Warm Blueprint Ivory) at 7.42s
    tl.set("#bm-wipe", { transformOrigin: "0% 50%", scaleX: 0, backgroundColor: "#c8f53c" }, 7.38);
    tl.to("#bm-wipe", { scaleX: 1, duration: 0.34, ease: "power3.in" }, 7.38);
    tl.set("#bm-v1", { autoAlpha: 0, display: "none" }, 7.73);
    tl.set("#bm-v2", { display: "block", autoAlpha: 1 }, 7.73);
    tl.set(CAM, { s: 1.22, fx: 310, fy: 230 }, 7.73);
    tl.set("#bm-wipe", { transformOrigin: "100% 50%" }, 7.74);
    tl.to("#bm-wipe", { scaleX: 0, duration: 0.4, ease: "power3.out" }, 7.74);

    // =========================================================================
    // VIEW 2 (7.76s – 22.64s): DETERMINISTIC PRDs · BUILDFLOW ERP · 21 AGENT SKILLS
    // =========================================================================
    shot(7.76, 1.25, 1.14, 310, 240, "power2.out");
    tl.fromTo(
      "#bm-v2-head",
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
      7.85
    );
    tl.fromTo(
      qa("#bm-v2-blueprint path, #bm-v2-blueprint rect"),
      { strokeDashoffset: 900, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.05, stagger: 0.14, ease: "power2.out" },
      9.2
    );
    // Contract locks (ERD, OpenAPI, BuildFlow 12 Modules) land at 12.2–16.0s
    tl.fromTo(
      qa("#bm-v2-locks .bm-lock"),
      { opacity: 0, scale: 0.8, y: 28 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.45, ease: "back.out(1.7)" },
      12.3
    );

    // Camera glides right to 21 Modular Agent Skills right as narrator speaks it (18.2–19.5s)
    shot(17.6, 1.4, 1.14, 670, 280, "power2.inOut");
    tl.fromTo(
      "#bm-v2-skills-panel",
      { opacity: 0, x: 84 },
      { opacity: 1, x: 0, duration: 0.72, ease: "power4.out" },
      18.1
    );
    tl.fromTo(
      qa("#bm-v2-skill-chips .bm-chip"),
      { opacity: 0, scale: 0.76 },
      { opacity: 1, scale: 1, duration: 0.34, stagger: 0.08, ease: "back.out(1.7)" },
      18.9
    );
    shot(20.6, 1.25, 1.0, 480, 270, "power2.inOut");

    // 3D Motivated Push-Through Dive into Obsidian Multi-Agent Core (22.2s → 22.64s)
    shot(22.18, 0.46, 2.0, 480, 270, "power2.in");
    tl.to("#bm-v2", { autoAlpha: 0, duration: 0.2 }, 22.44);
    tl.set("#bm-v2", { display: "none" }, 22.64);
    tl.set("#bm-v3", { display: "block", autoAlpha: 1 }, 22.63);
    tl.set(CAM, { s: 1.38, fx: 480, fy: 270 }, 22.63);
    shot(22.64, 0.92, 1.0, 480, 270, "power3.out");

    // =========================================================================
    // VIEW 3 (22.64s – 39.88s): CLAUDE CODE · ANTIGRAVITY · CRAFTRIG MCP (45+ TOOLS)
    // =========================================================================
    tl.fromTo(
      "#bm-v3-claude",
      { opacity: 0, x: -100, rotateY: -20 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.78, ease: "power4.out" },
      22.64
    );
    tl.fromTo(
      "#bm-v3-antigravity",
      { opacity: 0, x: 100, rotateY: 20 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.78, ease: "power4.out" },
      23.95
    );

    tl.fromTo(
      qa("#bm-v3-conduits path"),
      { strokeDashoffset: 680 },
      { strokeDashoffset: 0, duration: 1.15, stagger: 0.2, ease: "power2.out" },
      26.2
    );

    // Craftrig MCP Core rises right when narrator says "Craftrig MCP" (29.86s)
    shot(29.2, 1.15, 1.12, 480, 340, "power2.inOut");
    tl.fromTo(
      "#bm-v3-mcp-core",
      { opacity: 0, y: 72, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power4.out" },
      29.65
    );

    const mcpCounter = { v: 0 };
    let lastMcpInt = -1;
    tl.to(
      mcpCounter,
      {
        v: 45,
        duration: 1.35,
        ease: "power2.out",
        onUpdate: () => {
          const val = Math.round(mcpCounter.v);
          if (val !== lastMcpInt && mcpNumEl) {
            lastMcpInt = val;
            mcpNumEl.textContent = `${val}+`;
          }
        },
      },
      30.4
    );

    // Topological DAGs, Exclusive File Locks, Evidence Gates ignite right at 34.8s
    tl.fromTo(
      qa("#bm-v3-gates .bm-gate"),
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.52, stagger: 0.52, ease: "power3.out" },
      34.6
    );
    shot(37.6, 1.4, 1.0, 480, 270, "power2.inOut");

    // GPU-Composited Directional Whip-Pan (View 3 → View 4) at 39.55s (zero SVG blur!)
    tl.to("#bm-v3", { x: -160, skewX: -6, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 39.56);
    tl.set("#bm-v3", { display: "none" }, 39.87);
    tl.set("#bm-v4", { display: "block", autoAlpha: 1, x: 160, skewX: 6 }, 39.87);
    tl.to("#bm-v4", { x: 0, skewX: 0, duration: 0.48, ease: "power3.out" }, 39.87);

    // =========================================================================
    // VIEW 4 (39.88s – 57.92s): HYBRID & AGENTIC RAG TELEMETRY ENGINE
    // =========================================================================
    tl.fromTo(
      "#bm-v4-head",
      { opacity: 0, y: 38 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" },
      40.0
    );
    tl.fromTo(
      "#bm-v4-pgvector",
      { opacity: 0, x: -84 },
      { opacity: 1, x: 0, duration: 0.68, ease: "power4.out" },
      42.45
    );
    tl.fromTo(
      "#bm-v4-bm25",
      { opacity: 0, x: -84 },
      { opacity: 1, x: 0, duration: 0.68, ease: "power4.out" },
      43.85
    );
    tl.fromTo(
      qa("#bm-v4-fusion-paths path"),
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 0.95, stagger: 0.14, ease: "power2.out" },
      45.8
    );
    tl.fromTo(
      "#bm-v4-wrrf",
      { opacity: 0, scale: 0.78 },
      { opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.6)" },
      46.4
    );

    // Camera focuses right onto Telemetry Odometer: 75.00% → 91.67% Recall (48.66s)
    shot(47.9, 1.05, 1.15, 670, 240, "power2.inOut");
    tl.fromTo(
      "#bm-v4-metrics",
      { opacity: 0, y: 38 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      48.2
    );
    const recallObj = { v: 75.0 };
    tl.to(
      recallObj,
      {
        v: 91.67,
        duration: 1.55,
        ease: "power2.out",
        onUpdate: () => {
          if (recallEl) recallEl.textContent = `${recallObj.v.toFixed(2)}%`;
        },
      },
      48.6
    );

    // Redis Cache 18.3s → 694ms Speedometer sweep right at 53.5–55.0s
    const redisObj = { v: 18300 };
    tl.to(
      redisObj,
      {
        v: 694,
        duration: 1.35,
        ease: "power3.out",
        onUpdate: () => {
          if (redisEl) redisEl.textContent = `${Math.round(redisObj.v)}ms`;
        },
      },
      53.6
    );
    tl.fromTo(
      "#bm-redis-bar",
      { scaleX: 1, transformOrigin: "0% 50%" },
      { scaleX: 0.08, duration: 1.35, ease: "power3.out" },
      53.6
    );

    // Multi-Hop Self-Critic Grounding Loop ignites right at 55.9s
    shot(55.4, 0.95, 1.0, 480, 270, "power2.inOut");
    tl.fromTo(
      "#bm-v4-critic",
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      55.9
    );

    // Precision Shutter Wipe Transition (View 4 → View 5 Full-Stack Matrix) at 57.58s
    tl.set("#bm-wipe", { transformOrigin: "0% 50%", scaleX: 0, backgroundColor: "#56ccf2" }, 57.58);
    tl.to("#bm-wipe", { scaleX: 1, duration: 0.3, ease: "power3.in" }, 57.58);
    tl.set("#bm-v4", { autoAlpha: 0, display: "none" }, 57.9);
    tl.set("#bm-v5", { display: "block", autoAlpha: 1 }, 57.9);
    tl.set(CAM, { s: 1.14, fx: 270, fy: 210 }, 57.9);
    tl.set("#bm-wipe", { transformOrigin: "100% 50%" }, 57.92);
    tl.to("#bm-wipe", { scaleX: 0, duration: 0.36, ease: "power3.out" }, 57.92);

    // =========================================================================
    // VIEW 5 (57.92s – 80.96s): FULL-STACK PRODUCTION MATRIX (4 Connected Layers)
    // =========================================================================
    tl.fromTo(
      "#bm-stack-fe",
      { opacity: 0, y: 46 },
      { opacity: 1, y: 0, duration: 0.68, ease: "power4.out" },
      58.7
    );
    shot(64.6, 1.15, 1.14, 690, 210, "power2.inOut");
    tl.fromTo(
      "#bm-stack-be",
      { opacity: 0, y: 46 },
      { opacity: 1, y: 0, duration: 0.68, ease: "power4.out" },
      65.2
    );
    shot(68.4, 1.15, 1.14, 270, 380, "power2.inOut");
    tl.fromTo(
      "#bm-stack-db",
      { opacity: 0, y: 46 },
      { opacity: 1, y: 0, duration: 0.68, ease: "power4.out" },
      68.9
    );
    shot(75.0, 1.15, 1.14, 690, 380, "power2.inOut");
    tl.fromTo(
      "#bm-stack-lang",
      { opacity: 0, y: 46 },
      { opacity: 1, y: 0, duration: 0.68, ease: "power4.out" },
      75.6
    );
    shot(78.6, 1.35, 1.0, 480, 270, "power2.inOut");

    // Motivated Push-Through into Verification & Global Edge Ship (80.62s → 80.96s)
    tl.to("#bm-v5", { scale: 0.92, autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 80.62);
    tl.set("#bm-v5", { display: "none" }, 80.95);
    tl.set("#bm-v6", { display: "block", autoAlpha: 1, scale: 1.08 }, 80.95);
    tl.to("#bm-v6", { scale: 1, duration: 0.6, ease: "power3.out" }, 80.95);

    // =========================================================================
    // VIEW 6 (80.96s – 94.75s): CRAFTRIG 13-VP PLAYWRIGHT QA & GRAND FINALE
    // =========================================================================
    tl.fromTo(
      "#bm-v6-tests",
      { opacity: 0, y: 38 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" },
      81.2
    );
    tl.fromTo(
      qa("#bm-v6-viewports .bm-vp"),
      { opacity: 0.15, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 0.24, stagger: 0.11, ease: "back.out(1.7)" },
      84.8
    );
    tl.fromTo(
      "#bm-v6-deploy",
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
      87.8
    );
    tl.fromTo(
      "#bm-v6-finale",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
      90.6
    );
    shot(90.8, 3.8, 1.06, 480, 280, "sine.inOut");
    tl.to({}, { duration: 0.01 }, TOTAL_DURATION);

    tlRef.current = tl;
    // Crisp poster frame at t = 5.2s so paused/idle preview always looks sharp
    tl.pause(5.2, true);
    applyCam(5.2);
    syncHudRefs(5.2);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [scrollTo]);

  // Trigger smooth automatic playback ONLY after scrolling rests (`scrollend`) so fast wheel flings never stall!
  useEffect(() => {
    if (!portalReady || hasAutoPlayedRef.current || userPausedRef.current) return;
    return scheduleWhenScrollIdle(() => {
      if (hasAutoPlayedRef.current || userPausedRef.current) return;
      const box = viewportBoxRef.current;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      if (rect.bottom < 80 || rect.top > window.innerHeight - 80) return;
      hasAutoPlayedRef.current = true;
      startPlayback(true);
    }, 280);
  }, [portalReady, startPlayback]);

  // Pause cleanly when scrolling away from the theater or switching browser tabs
  useEffect(() => {
    const target = viewportBoxRef.current;
    if (!target) return;

    const pauseAll = () => {
      const tl = tlRef.current;
      const audio = audioRef.current;
      if (tl && !tl.paused()) {
        tl.pause();
        setIsPlaying(false);
      }
      if (audio && !audio.paused) audio.pause();
    };

    const onVisChange = () => {
      if (document.hidden) pauseAll();
    };
    document.addEventListener("visibilitychange", onVisChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) {
          pauseAll();
        }
      },
      { threshold: [0.05] }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, []);

  const handleTogglePlay = () => {
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

  const handleSeekBeat = (startSec: number, idx: number) => {
    const tl = tlRef.current;
    const audio = audioRef.current;
    if (!tl) return;
    lastBeatIdxRef.current = idx;
    setActiveBeatIdx(idx);
    tl.time(startSec);
    if (audio) audio.currentTime = startSec;
    if (tl.paused()) {
      startPlayback(false);
    }
  };

  const currentBeat = VO_BEATS[activeBeatIdx] ?? VO_BEATS[0];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-3 px-4 sm:px-6 lg:px-8">
      {/* Compact Header Bar above Cinema Frame */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>04 / AI-Augmented Engineering &amp; Technical Stack Film</span>
          </div>
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl leading-tight">
            How AI-Augmented Software Engineering Works
          </h2>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("#education-credentials", -84)}
          className="inline-flex min-h-10 items-center gap-2 border border-border-strong bg-surface px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary cursor-pointer"
        >
          <span>Skip to Education &amp; Certs</span>
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Synced American English Female Voice-Over Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
        aria-label="American English female voice-over narration explaining AI-Augmented Engineering and Technical Stack"
      />

      {/* Widescreen 16:9 Cinema Frame — Responsively bounded so it ALWAYS clears the Navbar & fits cleanly inside 100dvh! */}
      <div
        className="isolate-stage relative mx-auto w-full overflow-hidden border border-border-strong bg-[#080b0f]"
        style={{
          maxWidth: "min(100%, calc((100dvh - 280px) * 16 / 9))",
        }}
      >
        {/* One-Click Voice-Over Unlock Pill */}
        {needsAudioGesture && !isMuted ? (
          <div className="absolute top-3 right-3 z-40">
            <button
              type="button"
              onClick={handleUnlockAudioClick}
              className="inline-flex min-h-10 items-center gap-2 bg-[#c8f53c] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#080b0f] shadow-xl hover:bg-[#d8fa6a] cursor-pointer"
            >
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              <span>Enable Voice Over</span>
            </button>
          </div>
        ) : null}

        {/* Completion Auto-Scroll Notice */}
        {isCompleted ? (
          <div className="absolute inset-x-0 bottom-4 z-40 flex justify-center px-4">
            <div className="inline-flex items-center gap-3 border border-[#c8f53c] bg-[#080b0f]/95 px-4 py-2 font-mono text-xs font-semibold text-[#c8f53c] shadow-2xl">
              <span>Film Complete — Scrolling to Education &amp; Google AI Certifications ↓</span>
            </div>
          </div>
        ) : null}

        <div
          ref={viewportBoxRef}
          className="relative aspect-video w-full overflow-hidden bg-[#080b0f]"
        >
          {/* Fixed 1920x1080 Bang-Motion Stage (lean GPU promotion — only worldRef promotes while active) */}
          <div
            ref={stageRef}
            style={{
              width: STAGE_W,
              height: STAGE_H,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate3d(-50%, -50%, 0) scale(1)",
              transformOrigin: "center center",
            }}
            className="overflow-hidden bg-[#080b0f] text-[#f3f5f2] select-none"
          >
            {/* Continuous GPU Camera Rig (#bm-world) */}
            <div
              ref={worldRef}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "0 0",
              }}
            >
              {/* Clean Architectural Backdrop (single lightweight layer — zero heavy multi-gradient raster stall) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, #06090d 0%, #0b1117 100%)",
                }}
              />
              {/* Slowly Rotating Architectural Blueprint Compass (solid paths — zero dashed-path Skia tessellation!) */}
              <svg
                id="bm-bg-orbit"
                viewBox="0 0 1920 1080"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 960,
                  height: 540,
                  opacity: 0.12,
                  transformOrigin: "480px 270px",
                }}
              >
                <circle cx="960" cy="540" r="460" fill="none" stroke="#c8f53c" strokeWidth="1.5" />
                <circle cx="960" cy="540" r="680" fill="none" stroke="#56ccf2" strokeWidth="1.2" />
                <line x1="0" y1="540" x2="1920" y2="540" stroke="#f3f5f2" strokeWidth="1" opacity="0.25" />
                <line x1="960" y1="0" x2="960" y2="1080" stroke="#f3f5f2" strokeWidth="1" opacity="0.25" />
              </svg>

              {/* VIEW 1: HOOK — AI-AUGMENTED ENGINEERING CORE */}
              <div
                id="bm-v1"
                style={{ position: "absolute", inset: 0 }}
                className="flex flex-col items-center justify-center px-14"
              >
                <div
                  id="bm-v1-kicker"
                  style={{ fontSize: 17, letterSpacing: "0.24em" }}
                  className="mb-4 inline-flex items-center gap-3 font-mono font-semibold uppercase text-[#56ccf2]"
                >
                  <BrandLogo size={34} tone="dark" className="shrink-0" />
                  <span>BEYOND RAW CHAT PROMPTING</span>
                </div>

                <div
                  id="bm-v1-title-1"
                  style={{ fontSize: 48, lineHeight: 1.08 }}
                  className="font-heading font-medium text-[#cfd7dc]"
                >
                  Deterministic Architecture ×
                </div>

                <div id="bm-v1-title-2" className="relative mt-4 inline-block px-2.5 py-2">
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
                    style={{ fontSize: 60, lineHeight: 1.04 }}
                    className="relative font-heading font-semibold tracking-tight text-white"
                  >
                    AI-Augmented Engineering
                  </div>
                </div>

                <div
                  id="bm-v1-rail"
                  className="mt-3.5 h-[4px] w-[620px] bg-gradient-to-r from-[#c8f53c] via-[#56ccf2] to-[#4ade80]"
                />

                <div id="bm-v1-nodes" className="mt-2.5 flex items-center gap-2">
                  {["Deterministic PRDs", "Craftrig MCP", "Autonomous Agents", "Verified Delivery"].map(
                    (item) => (
                      <div
                        key={item}
                        style={{ fontSize: 16 }}
                        className="bm-pill border border-white/20 bg-[#121820]/95 px-3.5 py-1.5 font-mono font-semibold text-[#f3f5f2]"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* VIEW 2: WARM ARCHITECTURAL IVORY — DETERMINISTIC PRDs · BUILDFLOW ERP · 21 AGENT SKILLS */}
              <div
                id="bm-v2"
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "38px 52px",
                  display: "none",
                  background:
                    "radial-gradient(60% 50% at 80% 18%, rgba(24,92,55,0.14), transparent 65%), linear-gradient(155deg, #f6f3eb 0%, #ede8dc 62%, #e6e0d1 100%)",
                  color: "#0e151a",
                }}
              >
                <div id="bm-v2-head" className="mb-5 flex items-end justify-between border-b-2 border-[#0e151a]/20 pb-3">
                  <div>
                    <div style={{ fontSize: 16, letterSpacing: "0.18em" }} className="font-mono font-bold uppercase text-[#185c37]">
                      PHASE 01 // SPECIFICATION LOCK
                    </div>
                    <div style={{ fontSize: 39, lineHeight: 1.05 }} className="mt-2 font-heading font-bold tracking-tight text-[#0e151a]">
                      Deterministic PRDs &amp; 21 Agent Skills
                    </div>
                  </div>
                  <div style={{ fontSize: 16 }} className="bg-[#185c37] px-3 py-1.5 font-mono font-bold text-white">
                    BUILDFLOW ERP · 12 MODULES
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3 pt-4">
                  <div className="col-span-6 space-y-3">
                    <svg
                      id="bm-v2-blueprint"
                      viewBox="0 0 760 360"
                      className="w-full border-2 border-[#0e151a]/20 bg-white/85 p-4"
                    >
                      <rect x="20" y="20" width="720" height="320" fill="none" stroke="#185c37" strokeWidth="3" strokeDasharray="900" />
                      <path d="M20 95 L740 95" stroke="#0e151a" strokeWidth="2" strokeDasharray="900" />
                      <path d="M260 95 L260 340" stroke="#035e8c" strokeWidth="2" strokeDasharray="900" />
                      <path d="M510 95 L510 340" stroke="#035e8c" strokeWidth="2" strokeDasharray="900" />
                      <text x="44" y="68" fill="#185c37" fontSize="28" fontFamily="monospace" fontWeight="700">
                        FULLSTACK_BUILDFLOW-ERP.BLUEPRINT.YAML
                      </text>
                      <text x="44" y="160" fill="#0e151a" fontSize="28" fontFamily="monospace" fontWeight="700">
                        RELATIONAL ERD
                      </text>
                      <text x="44" y="210" fill="#455159" fontSize="24" fontFamily="monospace">
                        12 Vertical Slices
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
                        Outbox &amp; 3-Way
                      </text>
                    </svg>

                    <div id="bm-v2-locks" className="grid grid-cols-3 gap-2.5">
                      {[
                        { tag: "ERD LOCKED", sub: "Schema Invariants" },
                        { tag: "OPENAPI", sub: "End-to-End Types" },
                        { tag: "BUILDFLOW", sub: "12 ERP Modules" },
                      ].map((lock) => (
                        <div
                          key={lock.tag}
                          className="bm-lock border-2 border-[#185c37] bg-white px-2.5 py-1"
                        >
                          <div style={{ fontSize: 15 }} className="font-mono font-bold text-[#185c37]">
                            {lock.tag}
                          </div>
                          <div style={{ fontSize: 12 }} className="mt-1 font-body text-[#252e35]">
                            {lock.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div id="bm-v2-skills-panel" className="col-span-6 border-2 border-[#0e151a]/25 bg-[#0f161c] p-4 text-white">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                      <span style={{ fontSize: 17 }} className="font-heading font-bold text-[#c8f53c]">
                        Agent Skills Prompt Engineering
                      </span>
                      <span style={{ fontSize: 18 }} className="font-mono font-bold text-white tabular-nums">
                        21 SKILLS
                      </span>
                    </div>

                    <div id="bm-v2-skill-chips" className="mt-3.5 grid grid-cols-2 gap-2">
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
                          style={{ fontSize: 14 }}
                          className="bm-chip border border-white/15 bg-white/[0.06] px-2.5 py-2 font-mono font-semibold text-[#f3f5f2]"
                        >
                          ▸ {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* VIEW 3: CLAUDE CODE · GOOGLE ANTIGRAVITY · CRAFTRIG MCP (vickyymosafan/mcp-craftrig) */}
              <div
                id="bm-v3"
                style={{ position: "absolute", inset: 0, padding: "43px 55px", perspective: 1400, display: "none" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div style={{ fontSize: 16, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#56ccf2]">
                    PHASE 02 // PARALLEL MULTI-AGENT ORCHESTRATION
                  </div>
                  <div style={{ fontSize: 15 }} className="font-mono font-bold text-[#c8f53c]">
                    GITHUB: VICKYYMOSAFAN/MCP-CRAFTRIG
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div
                    id="bm-v3-claude"
                    className="border-2 border-[#c8f53c]/70 bg-[#10161c]/95 p-4"
                  >
                    <div style={{ fontSize: 14 }} className="font-mono font-bold uppercase text-[#c8f53c]">
                      AGENT ENGINE A
                    </div>
                    <div style={{ fontSize: 32 }} className="mt-1 font-heading font-bold text-white">
                      Claude Code
                    </div>
                    <div style={{ fontSize: 15 }} className="mt-2 font-mono text-[#cfd7dc]">
                      Autonomous Refactor · Backend &amp; Tests
                    </div>
                  </div>

                  <div
                    id="bm-v3-antigravity"
                    className="border-2 border-[#56ccf2]/70 bg-[#10161c]/95 p-4"
                  >
                    <div style={{ fontSize: 14 }} className="font-mono font-bold uppercase text-[#56ccf2]">
                      AGENT ENGINE B
                    </div>
                    <div style={{ fontSize: 32 }} className="mt-1 font-heading font-bold text-white">
                      Google Antigravity
                    </div>
                    <div style={{ fontSize: 15 }} className="mt-2 font-mono text-[#cfd7dc]">
                      Parallel Subagents · UI &amp; Browser QA
                    </div>
                  </div>
                </div>

                <svg id="bm-v3-conduits" viewBox="0 0 1700 130" className="my-2 h-[58px] w-full">
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

                <div
                  id="bm-v3-mcp-core"
                  className="border-2 border-white/25 bg-[#0e141b]/95 p-4"
                >
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <div>
                      <div style={{ fontSize: 15 }} className="font-mono uppercase tracking-[0.16em] text-[#f5b942]">
                        CUSTOM TYPESCRIPT MCP SERVER DEVELOPMENT · SDK v2
                      </div>
                      <div style={{ fontSize: 28 }} className="mt-1 font-heading font-bold text-white">
                        Craftrig MCP &amp; Three.js Visual QA
                      </div>
                    </div>
                    <div className="bg-[#c8f53c] px-4 py-2 text-center text-[#080b0f]">
                      <div
                        id="bm-mcp-count"
                        style={{ fontSize: 36, lineHeight: 1 }}
                        className="min-w-[3.2ch] font-heading font-extrabold tabular-nums"
                      >
                        45+
                      </div>
                      <div style={{ fontSize: 12 }} className="font-mono font-bold uppercase">
                        MCP TOOLS
                      </div>
                    </div>
                  </div>

                  <div id="bm-v3-gates" className="mt-3.5 grid grid-cols-3 gap-3">
                    {[
                      { title: "Topological DAG", detail: "Kahn algorithm & critical-path waves", accent: "#c8f53c" },
                      { title: "Exclusive File Locks", detail: "Path write locks + stale recovery", accent: "#56ccf2" },
                      { title: "Evidence Quality Gates", detail: "SQLite WAL + Playwright proof", accent: "#4ade80" },
                    ].map((g) => (
                      <div
                        key={g.title}
                        style={{ borderTopColor: g.accent }}
                        className="bm-gate border border-white/15 border-t-4 bg-white/[0.04] p-3"
                      >
                        <div style={{ fontSize: 17, color: g.accent }} className="font-heading font-bold">
                          {g.title}
                        </div>
                        <div style={{ fontSize: 13 }} className="mt-2 font-body text-[#cfd7dc]">
                          {g.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* VIEW 4: HYBRID & AGENTIC RAG TELEMETRY ENGINE */}
              <div id="bm-v4" style={{ position: "absolute", inset: 0, padding: "42px 54px", display: "none" }}>
                <div id="bm-v4-head" className="mb-4 flex items-end justify-between border-b border-white/15 pb-2.5">
                  <div>
                    <div style={{ fontSize: 15, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#56ccf2]">
                      PHASE 03 // INTELLIGENT RETRIEVAL ENGINE
                    </div>
                    <div style={{ fontSize: 37, lineHeight: 1.04 }} className="mt-1 font-heading font-bold text-white">
                      Hybrid &amp; Agentic RAG Pipeline
                    </div>
                  </div>
                  <div style={{ fontSize: 15 }} className="border border-[#c8f53c]/60 bg-[#c8f53c]/10 px-3 py-1 font-mono font-bold text-[#c8f53c]">
                    WEIGHTED RRF · SELF-CRITIC
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-4 space-y-3">
                    <div id="bm-v4-pgvector" className="border-2 border-[#56ccf2]/70 bg-[#101820] p-3.5">
                      <div style={{ fontSize: 13 }} className="font-mono font-bold text-[#56ccf2]">
                        DENSE SEMANTIC SEARCH
                      </div>
                      <div style={{ fontSize: 22 }} className="mt-1 font-heading font-bold text-white">
                        Supabase pgvector
                      </div>
                      <div style={{ fontSize: 14 }} className="mt-2 font-mono text-[#cfd7dc]">
                        Gemini Embeddings · Top-50 Chunks
                      </div>
                    </div>

                    <div id="bm-v4-bm25" className="border-2 border-[#f5b942]/70 bg-[#101820] p-3.5">
                      <div style={{ fontSize: 13 }} className="font-mono font-bold text-[#f5b942]">
                        SPARSE LEXICAL RERANK
                      </div>
                      <div style={{ fontSize: 22 }} className="mt-1 font-heading font-bold text-white">
                        BM25 Exact Match
                      </div>
                      <div style={{ fontSize: 14 }} className="mt-2 font-mono text-[#cfd7dc]">
                        Course Codes &amp; Policy Clauses
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 flex flex-col items-center">
                    <svg id="bm-v4-fusion-paths" viewBox="0 0 380 120" className="w-full">
                      <path d="M 0 20 C 120 20, 140 60, 380 60" fill="none" stroke="#56ccf2" strokeWidth="5" strokeDasharray="600" strokeDashoffset="600" />
                      <path d="M 0 100 C 120 100, 140 60, 380 60" fill="none" stroke="#f5b942" strokeWidth="5" strokeDasharray="600" strokeDashoffset="600" />
                    </svg>
                    <div
                      id="bm-v4-wrrf"
                      className="my-3 w-full border-2 border-[#c8f53c] bg-[#c8f53c]/15 px-3 py-2 text-center"
                    >
                      <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#c8f53c]">
                        FUSION ENGINE
                      </div>
                      <div style={{ fontSize: 27 }} className="mt-1 font-heading font-extrabold text-white">
                        wRRF
                      </div>
                      <div style={{ fontSize: 13 }} className="mt-1 font-mono text-[#cfd7dc]">
                        Top-5 Grounded Context
                      </div>
                    </div>
                  </div>

                  <div id="bm-v4-metrics" className="col-span-5 space-y-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="border border-white/20 bg-[#0e151c] p-3">
                        <div style={{ fontSize: 12 }} className="font-mono uppercase text-[#9aa7b0]">
                          RECALL SCORE
                        </div>
                        <div
                          id="bm-recall-val"
                          style={{ fontSize: 36, lineHeight: 1.05 }}
                          className="mt-2 min-w-[6ch] font-heading font-extrabold text-[#c8f53c] tabular-nums"
                        >
                          91.67%
                        </div>
                        <div style={{ fontSize: 12 }} className="mt-1 font-mono text-[#4ade80]">
                          ▲ up from 75.0%
                        </div>
                      </div>

                      <div className="border border-white/20 bg-[#0e151c] p-3">
                        <div style={{ fontSize: 12 }} className="font-mono uppercase text-[#9aa7b0]">
                          RANK PRECISION
                        </div>
                        <div
                          style={{ fontSize: 36, lineHeight: 1.05 }}
                          className="mt-2 font-heading font-extrabold text-[#56ccf2] tabular-nums"
                        >
                          1.00
                        </div>
                        <div style={{ fontSize: 12 }} className="mt-1 font-mono text-[#cfd7dc]">
                          MRR (up from 0.71)
                        </div>
                      </div>
                    </div>

                    <div className="border border-white/20 bg-[#0e151c] p-3">
                      <div className="flex items-baseline justify-between">
                        <span style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#f5b942]">
                          REDIS CACHE · 26× FASTER
                        </span>
                        <span
                          id="bm-redis-val"
                          style={{ fontSize: 26 }}
                          className="min-w-[5.5ch] text-right font-heading font-extrabold text-white tabular-nums"
                        >
                          694ms
                        </span>
                      </div>
                      <div className="mt-4 h-5 w-full bg-white/10">
                        <div id="bm-redis-bar" className="h-full w-full bg-gradient-to-r from-[#4ade80] to-[#c8f53c]" />
                      </div>
                      <div style={{ fontSize: 11 }} className="mt-2 flex justify-between font-mono text-[#9aa7b0]">
                        <span>694ms Cached Fast Path</span>
                        <span>vs 18,300ms Uncached</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="bm-v4-critic"
                  className="mt-4 flex items-center justify-between border-2 border-[#4ade80]/60 bg-[#0e1815] px-4 py-1"
                >
                  <div style={{ fontSize: 17 }} className="font-heading font-bold text-[#4ade80]">
                    Agentic Multi-Hop Self-Critic Grounding Loop
                  </div>
                  <div style={{ fontSize: 14 }} className="font-mono text-white">
                    Cloudflare Workers · Gemini → Groq → Cohere → OpenRouter
                  </div>
                </div>
              </div>

              {/* VIEW 5: FULL-STACK PRODUCTION MATRIX */}
              <div id="bm-v5" style={{ position: "absolute", inset: 0, padding: "37px 48px", display: "none" }}>
                <div className="mb-4 flex items-end justify-between border-b border-white/15 pb-4">
                  <div>
                    <div style={{ fontSize: 14, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#c8f53c]">
                      PHASE 04 // COMPLETE TECHNICAL STACK
                    </div>
                    <div style={{ fontSize: 34, lineHeight: 1.05 }} className="mt-1 font-heading font-bold text-white">
                      Full-Stack Production Architecture
                    </div>
                  </div>
                  <div style={{ fontSize: 14 }} className="font-mono text-[#56ccf2]">
                    END-TO-END TYPED BOUNDARIES
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div id="bm-stack-fe" className="border-2 border-[#c8f53c]/60 bg-[#0f151b]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#c8f53c]">
                      01 // FRONTEND ARCHITECTURE
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["React 19", "Next.js 16", "Vue.js", "Tailwind CSS 4", "Framer Motion", "PWA & Recharts"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 15 }} className="border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div id="bm-stack-be" className="border-2 border-[#56ccf2]/60 bg-[#0f151b]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#56ccf2]">
                      02 // BACKEND &amp; EDGE APIS
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["Node.js", "NestJS", "Express.js", "Hono", "Laravel", "OpenAPI & RBAC"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 15 }} className="border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div id="bm-stack-db" className="border-2 border-[#4ade80]/60 bg-[#0f151b]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#4ade80]">
                      03 // DATABASE, VECTOR &amp; CACHE
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {["PostgreSQL", "MySQL", "Prisma ORM", "Supabase pgvector", "Neon", "Redis + BullMQ", "Dexie Offline"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 14 }} className="border border-white/20 bg-white/[0.06] px-4 py-2 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div id="bm-stack-lang" className="border-2 border-[#f5b942]/60 bg-[#0f151b]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#f5b942]">
                      04 // POLYGLOT LANGUAGES
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["TypeScript", "JavaScript", "Python", "PHP", "Kotlin", "MQL5", "HTML / CSS"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 15 }} className="border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* VIEW 6: CRAFTRIG 13-VP PLAYWRIGHT QA & GRAND FINALE */}
              <div id="bm-v6" style={{ position: "absolute", inset: 0, padding: "43px 55px", display: "none" }}>
                <div id="bm-v6-tests" className="flex items-end justify-between border-b border-white/15 pb-3">
                  <div>
                    <div style={{ fontSize: 15, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#4ade80]">
                      PHASE 05 // CRAFTRIG VERIFICATION &amp; EDGE SHIP
                    </div>
                    <div style={{ fontSize: 34, lineHeight: 1.05 }} className="mt-1 font-heading font-bold text-white">
                      Jest · Supertest · Craftrig 13-Viewport QA
                    </div>
                  </div>
                  <div style={{ fontSize: 16 }} className="bg-[#4ade80] px-3 py-1 font-mono font-bold text-[#080b0f]">
                    50/50 PASS
                  </div>
                </div>

                <div
                  id="bm-v6-viewports"
                  className="mt-4 grid gap-3"
                  style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
                >
                  {VIEWPORT_PROFILES.map((vp) => (
                    <div
                      key={vp}
                      className="bm-vp border-2 border-[#4ade80] bg-[#4ade80]/15 py-1 text-center"
                    >
                      <div style={{ fontSize: 13 }} className="font-mono font-bold text-[#4ade80] tabular-nums">
                        {vp}
                      </div>
                      <div style={{ fontSize: 10 }} className="mt-1 font-mono text-white">
                        OK
                      </div>
                    </div>
                  ))}
                </div>

                <div id="bm-v6-deploy" className="mt-4 grid grid-cols-4 gap-3">
                  {["GitHub Actions CI/CD", "Vercel Edge", "Cloudflare Workers", "Hostinger & Railway"].map(
                    (dep) => (
                      <div
                        key={dep}
                        style={{ fontSize: 15 }}
                        className="border border-[#56ccf2]/55 bg-[#101820] px-3 py-1 text-center font-mono font-semibold text-[#f3f5f2]"
                      >
                        {dep}
                      </div>
                    )
                  )}
                </div>

                <div id="bm-v6-finale" className="mt-6 text-center">
                  <div style={{ fontSize: 46, lineHeight: 1.05 }} className="font-heading font-bold tracking-tight text-white">
                    Engineered to ship.{" "}
                    <span className="text-[#c8f53c]">Verified to last.</span>
                  </div>
                  <div style={{ fontSize: 16, letterSpacing: "0.2em" }} className="mt-2.5 inline-flex items-center justify-center gap-2.5 font-mono uppercase text-[#9aa7b0]">
                    <BrandLogo size={30} tone="dark" className="shrink-0" />
                    <span>M. VICKY MOSAFAN · FULL-STACK &amp; AI-AUGMENTED ENGINEER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GPU Precision Shutter Wipe Blade */}
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
          </div>
        </div>
      </div>

      {/* Slim Below-Frame Cinema Controls & Chapter Scrubber (Zero Per-Frame React Renders) */}
      <div className="border border-border bg-surface/95 p-3 sm:p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              data-testid="bang-motion-play-toggle"
              className="inline-flex min-h-10 items-center gap-2 bg-primary px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-hover cursor-pointer"
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
              aria-label={isMuted ? "Unmute American English voice over" : "Mute American English voice over"}
              className="inline-flex min-h-10 items-center gap-1.5 border border-border-strong bg-surface-elevated px-3 py-1.5 font-mono text-xs font-medium text-foreground hover:border-primary hover:text-primary cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span>VO · US Female</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => startPlayback(true)}
              aria-label="Restart explainer video from beginning"
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 border border-border bg-background px-3 py-1.5 font-mono text-xs font-medium text-ink-secondary hover:border-primary hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
            <span className="hidden font-semibold text-foreground md:inline">
              {currentBeat.label}
            </span>
            <span ref={clockRef} className="tabular-nums text-foreground">
              00:05 / {formatClock(TOTAL_DURATION)}
            </span>
          </div>
        </div>

        {/* Direct-DOM-Updated Progress Rail */}
        <div className="mt-2.5 h-1.5 w-full overflow-hidden bg-surface-elevated">
          <div
            ref={progressBarRef}
            className="h-full origin-left bg-primary"
            style={{ transform: "scaleX(0.05)" }}
          />
        </div>

        {/* Interactive Chapter Jump Rail */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
          {VO_BEATS.map((beat, idx) => {
            const active = idx === activeBeatIdx;
            return (
              <button
                key={beat.id}
                type="button"
                onClick={() => handleSeekBeat(beat.start, idx)}
                className={`min-h-10 truncate border px-2.5 py-2 text-left font-mono text-[11px] transition-colors cursor-pointer ${
                  active
                    ? "border-primary bg-primary-soft font-bold text-primary"
                    : "border-border bg-background text-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                {beat.label.replace(/^\d+\s*\/\/\s*/, `0${idx + 1} · `)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
