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

/**
 * GPU-Composited 6-Chapter Engineering Process Walkthrough Film:
 * - Zero React state updates per frame (progress bar and clock update via DOM refs).
 * - User-initiated playback so browser audio unlocks cleanly on click and scroll stays 100% lag-free.
 * - Obsidian + Electric Amber-Gold + Glacier Sky-Blue visual system (zero green, zero pink).
 * - Synced to American English female voice-over narration.
 */
export function BangMotionStackExplainer() {
  const { scrollTo } = useSmoothScroll();

  const viewportBoxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasStartedOnceRef = useRef(false);
  const blobUrlRef = useRef<string | null>(null);
  const audioLoadedRef = useRef(false);
  const lastWholeSecRef = useRef(-1);
  const lastBeatIdxRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsAudioGesture, setNeedsAudioGesture] = useState(false);
  const [activeBeatIdx, setActiveBeatIdx] = useState(0);

  // Lazy-load English Female Voice-Over MP3 into an in-memory Blob URL on playback start
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

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  // Scale internal 960x540 stage crisply to container
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

      hasStartedOnceRef.current = true;
      setIsCompleted(false);

      if (fromStart) {
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

  // Build GPU-composited GSAP master timeline
  useEffect(() => {
    const stage = stageRef.current;
    const world = worldRef.current;
    if (!stage || !world) return;

    gsap.config({ force3D: true, autoSleep: 60, nullTargetWarn: false });
    gsap.ticker.lagSmoothing(500, 33);

    const q = (sel: string) => stage.querySelector<HTMLElement | SVGElement>(sel);
    const qa = (sel: string) => Array.from(stage.querySelectorAll<HTMLElement | SVGElement>(sel));

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

        const idx = VO_BEATS.findIndex((b) => t >= b.start && t < b.end);
        if (idx !== -1 && idx !== lastBeatIdxRef.current) {
          lastBeatIdxRef.current = idx;
          setActiveBeatIdx(idx);
        }

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
      },
    });

    const shot = (at: number, dur: number, s: number, fx: number, fy: number, ease = "power2.inOut") => {
      tl.to(CAM, { s, fx, fy, duration: dur, ease }, at);
    };

    tl.set(CAM, { s: 1.05, fx: 480, fy: 270 }, 0);
    tl.set(["#bm-v2", "#bm-v3", "#bm-v4", "#bm-v5", "#bm-v6"], { autoAlpha: 0, display: "none" }, 0);
    tl.set("#bm-v1", { display: "flex", autoAlpha: 1 }, 0);
    tl.set("#bm-wipe", { scaleX: 0, transformOrigin: "0% 50%" }, 0);

    // VIEW 1 (0.00s – 7.76s): HOOK — AI-AUGMENTED ENGINEERING CORE
    shot(0, 1.35, 1.0, 480, 270, "power3.out");
    tl.fromTo(
      "#bm-v1-kicker",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" },
      0.12
    );
    tl.fromTo(
      "#bm-v1-title-1",
      { opacity: 0, y: 76, scaleY: 1.18 },
      { opacity: 1, y: 0, scaleY: 1, duration: 0.78, ease: "power4.out" },
      0.42
    );
    tl.fromTo(
      "#bm-v1-title-2",
      { opacity: 0, x: -72, skewX: -8, scaleX: 1.08 },
      { opacity: 1, x: 0, skewX: 0, scaleX: 1, duration: 0.78, ease: "power4.out" },
      1.75
    );
    tl.fromTo(
      "#bm-v1-box-stroke",
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.85, ease: "power3.out" },
      1.86
    );
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

    // Shutter Wipe (Obsidian -> Warm Blueprint Ivory) at 7.38s
    tl.set("#bm-wipe", { transformOrigin: "0% 50%", scaleX: 0, backgroundColor: "#f5a623" }, 7.38);
    tl.to("#bm-wipe", { scaleX: 1, duration: 0.34, ease: "power3.in" }, 7.38);
    tl.set("#bm-v1", { autoAlpha: 0, display: "none" }, 7.73);
    tl.set("#bm-v2", { display: "block", autoAlpha: 1 }, 7.73);
    tl.set(CAM, { s: 1.22, fx: 310, fy: 230 }, 7.73);
    tl.set("#bm-wipe", { transformOrigin: "100% 50%" }, 7.74);
    tl.to("#bm-wipe", { scaleX: 0, duration: 0.4, ease: "power3.out" }, 7.74);

    // VIEW 2 (7.76s – 22.64s): DETERMINISTIC PRDs · BUILDFLOW ERP · 21 AGENT SKILLS
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
    tl.fromTo(
      qa("#bm-v2-locks .bm-lock"),
      { opacity: 0, scale: 0.8, y: 28 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.45, ease: "back.out(1.7)" },
      12.3
    );

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

    // Push-Through into Multi-Agent Orchestration (22.18s -> 22.64s)
    shot(22.18, 0.46, 2.0, 480, 270, "power2.in");
    tl.to("#bm-v2", { autoAlpha: 0, duration: 0.2 }, 22.44);
    tl.set("#bm-v2", { display: "none" }, 22.64);
    tl.set("#bm-v3", { display: "block", autoAlpha: 1 }, 22.63);
    tl.set(CAM, { s: 1.38, fx: 480, fy: 270 }, 22.63);
    shot(22.64, 0.92, 1.0, 480, 270, "power3.out");

    // VIEW 3 (22.64s – 39.88s): CLAUDE CODE · ANTIGRAVITY · CRAFTRIG MCP
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

    tl.fromTo(
      qa("#bm-v3-gates .bm-gate"),
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.52, stagger: 0.52, ease: "power3.out" },
      34.6
    );
    shot(37.6, 1.4, 1.0, 480, 270, "power2.inOut");

    // Directional Whip-Pan (View 3 -> View 4)
    tl.to("#bm-v3", { x: -160, skewX: -6, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 39.56);
    tl.set("#bm-v3", { display: "none" }, 39.87);
    tl.set("#bm-v4", { display: "block", autoAlpha: 1, x: 160, skewX: 6 }, 39.87);
    tl.to("#bm-v4", { x: 0, skewX: 0, duration: 0.48, ease: "power3.out" }, 39.87);

    // VIEW 4 (39.88s – 57.92s): HYBRID & AGENTIC RAG TELEMETRY ENGINE
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

    shot(55.4, 0.95, 1.0, 480, 270, "power2.inOut");
    tl.fromTo(
      "#bm-v4-critic",
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      55.9
    );

    // Shutter Wipe (View 4 -> View 5 Full-Stack Matrix)
    tl.set("#bm-wipe", { transformOrigin: "0% 50%", scaleX: 0, backgroundColor: "#38bdf8" }, 57.58);
    tl.to("#bm-wipe", { scaleX: 1, duration: 0.3, ease: "power3.in" }, 57.58);
    tl.set("#bm-v4", { autoAlpha: 0, display: "none" }, 57.9);
    tl.set("#bm-v5", { display: "block", autoAlpha: 1 }, 57.9);
    tl.set(CAM, { s: 1.14, fx: 270, fy: 210 }, 57.9);
    tl.set("#bm-wipe", { transformOrigin: "100% 50%" }, 57.92);
    tl.to("#bm-wipe", { scaleX: 0, duration: 0.36, ease: "power3.out" }, 57.92);

    // VIEW 5 (57.92s – 80.96s): FULL-STACK PRODUCTION MATRIX
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

    // Push-Through into Verification & Global Edge Ship
    tl.to("#bm-v5", { scale: 0.92, autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 80.62);
    tl.set("#bm-v5", { display: "none" }, 80.95);
    tl.set("#bm-v6", { display: "block", autoAlpha: 1, scale: 1.08 }, 80.95);
    tl.to("#bm-v6", { scale: 1, duration: 0.6, ease: "power3.out" }, 80.95);

    // VIEW 6 (80.96s – 94.75s): CRAFTRIG 13-VP PLAYWRIGHT QA & GRAND FINALE
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
    tl.pause(5.2, true);
    applyCam(5.2);
    syncHudRefs(5.2);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  // Pause cleanly when scrolling away or switching browser tabs
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
        if (entry && !entry.isIntersecting) {
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
    hasStartedOnceRef.current = true;
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
    <div className="w-full space-y-3">
      {/* Synced American English Female Voice-Over Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
        aria-label="American English female voice-over narration explaining AI-Augmented Engineering and Technical Stack"
      />

      {/* Widescreen 16:9 Cinema Frame */}
      <div className="isolate-stage relative w-full overflow-hidden rounded-2xl border border-white/12 bg-[#080a0f]">
        {/* One-Click Voice-Over Unlock Pill */}
        {needsAudioGesture && !isMuted ? (
          <div className="absolute top-3 right-3 z-40">
            <button
              type="button"
              onClick={handleUnlockAudioClick}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full bg-[#f5a623] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#080a0f] shadow-xl hover:bg-[#ffba42]"
            >
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              <span>Enable Voice Over</span>
            </button>
          </div>
        ) : null}

        {/* User-Initiated Next-Section Pill on Completion */}
        {isCompleted ? (
          <div className="absolute inset-x-0 bottom-4 z-40 flex justify-center px-4">
            <button
              type="button"
              onClick={() => scrollTo("#stack", -80)}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-[#f5a623]/70 bg-[#080a0f]/95 px-4 py-2 font-mono text-xs font-semibold text-[#f5a623] shadow-2xl hover:bg-[#f5a623] hover:text-[#080a0f]"
            >
              <span>Film Complete — Explore Full Technical Stack</span>
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <div
          ref={viewportBoxRef}
          className="relative aspect-video w-full overflow-hidden bg-[#080a0f]"
        >
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
            className="overflow-hidden bg-[#080a0f] text-[#f4f5f7] select-none"
          >
            {/* Continuous GPU Camera Rig */}
            <div
              ref={worldRef}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "0 0",
              }}
            >
              {/* Clean Obsidian Backdrop */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, #07090e 0%, #0d111a 100%)",
                }}
              />

              {/* Rotating Architectural Blueprint Compass */}
              <svg
                id="bm-bg-orbit"
                viewBox="0 0 1920 1080"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 960,
                  height: 540,
                  opacity: 0.14,
                  transformOrigin: "480px 270px",
                }}
              >
                <circle cx="960" cy="540" r="460" fill="none" stroke="#f5a623" strokeWidth="1.5" />
                <circle cx="960" cy="540" r="680" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="0" y1="540" x2="1920" y2="540" stroke="#f4f5f7" strokeWidth="1" opacity="0.22" />
                <line x1="960" y1="0" x2="960" y2="1080" stroke="#f4f5f7" strokeWidth="1" opacity="0.22" />
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
                  className="mb-4 inline-flex items-center gap-3 font-mono font-semibold uppercase text-[#38bdf8]"
                >
                  <BrandLogo size={34} tone="dark" className="shrink-0" />
                  <span>BEYOND RAW CHAT PROMPTING</span>
                </div>

                <div
                  id="bm-v1-title-1"
                  style={{ fontSize: 48, lineHeight: 1.08 }}
                  className="font-heading font-medium text-[#d1d7e0]"
                >
                  Deterministic Architecture ×
                </div>

                <div id="bm-v1-title-2" className="relative mt-4 inline-block px-6 py-3">
                  <svg
                    viewBox="0 0 1000 160"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
                  >
                    <rect
                      id="bm-v1-box-stroke"
                      x="4"
                      y="4"
                      width="992"
                      height="152"
                      rx="18"
                      pathLength={100}
                      fill="rgba(245,166,35,0.10)"
                      stroke="#f5a623"
                      strokeWidth="4"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                    />
                  </svg>
                  <div
                    style={{ fontSize: 56, lineHeight: 1.04 }}
                    className="relative font-heading font-semibold tracking-tight text-white"
                  >
                    AI-Augmented Engineering
                  </div>
                </div>

                <div
                  id="bm-v1-rail"
                  className="mt-4 h-[4px] w-[620px] rounded-full bg-gradient-to-r from-[#f5a623] via-[#ffba42] to-[#38bdf8]"
                />

                <div id="bm-v1-nodes" className="mt-4 flex items-center gap-2.5">
                  {["Deterministic PRDs", "Craftrig MCP", "Autonomous Agents", "Verified Delivery"].map(
                    (item) => (
                      <div
                        key={item}
                        style={{ fontSize: 15 }}
                        className="bm-pill rounded-full border border-white/20 bg-[#121722]/95 px-4 py-1.5 font-mono font-semibold text-[#f4f5f7]"
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
                    "radial-gradient(60% 50% at 80% 18%, rgba(180,83,9,0.14), transparent 65%), linear-gradient(155deg, #f8f6f0 0%, #f0ece2 62%, #e8e2d5 100%)",
                  color: "#11141a",
                }}
              >
                <div id="bm-v2-head" className="mb-5 flex items-end justify-between border-b-2 border-[#11141a]/20 pb-3">
                  <div>
                    <div style={{ fontSize: 16, letterSpacing: "0.18em" }} className="font-mono font-bold uppercase text-[#b45309]">
                      PHASE 01 // SPECIFICATION LOCK
                    </div>
                    <div style={{ fontSize: 39, lineHeight: 1.05 }} className="mt-2 font-heading font-bold tracking-tight text-[#11141a]">
                      Deterministic PRDs &amp; 21 Agent Skills
                    </div>
                  </div>
                  <div style={{ fontSize: 16 }} className="rounded-lg bg-[#b45309] px-3.5 py-1.5 font-mono font-bold text-white">
                    BUILDFLOW ERP · 12 MODULES
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3 pt-4">
                  <div className="col-span-6 space-y-3">
                    <svg
                      id="bm-v2-blueprint"
                      viewBox="0 0 760 360"
                      className="w-full rounded-xl border-2 border-[#11141a]/20 bg-white/90 p-4"
                    >
                      <rect x="20" y="20" width="720" height="320" fill="none" stroke="#b45309" strokeWidth="3" strokeDasharray="900" />
                      <path d="M20 95 L740 95" stroke="#11141a" strokeWidth="2" strokeDasharray="900" />
                      <path d="M260 95 L260 340" stroke="#0369a1" strokeWidth="2" strokeDasharray="900" />
                      <path d="M510 95 L510 340" stroke="#0369a1" strokeWidth="2" strokeDasharray="900" />
                      <text x="44" y="68" fill="#b45309" fontSize="28" fontFamily="monospace" fontWeight="700">
                        FULLSTACK_BUILDFLOW-ERP.BLUEPRINT.YAML
                      </text>
                      <text x="44" y="160" fill="#11141a" fontSize="28" fontFamily="monospace" fontWeight="700">
                        RELATIONAL ERD
                      </text>
                      <text x="44" y="210" fill="#4b5563" fontSize="24" fontFamily="monospace">
                        12 Vertical Slices
                      </text>
                      <text x="284" y="160" fill="#0369a1" fontSize="28" fontFamily="monospace" fontWeight="700">
                        OPENAPI 3.1
                      </text>
                      <text x="284" y="210" fill="#4b5563" fontSize="24" fontFamily="monospace">
                        Typed Contracts
                      </text>
                      <text x="534" y="160" fill="#92400e" fontSize="28" fontFamily="monospace" fontWeight="700">
                        RBAC MATRIX
                      </text>
                      <text x="534" y="210" fill="#4b5563" fontSize="24" fontFamily="monospace">
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
                          className="bm-lock rounded-lg border-2 border-[#b45309] bg-white px-2.5 py-1.5"
                        >
                          <div style={{ fontSize: 15 }} className="font-mono font-bold text-[#b45309]">
                            {lock.tag}
                          </div>
                          <div style={{ fontSize: 12 }} className="mt-1 font-body text-[#374151]">
                            {lock.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div id="bm-v2-skills-panel" className="col-span-6 rounded-xl border-2 border-[#11141a]/25 bg-[#0f131c] p-4 text-white">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                      <span style={{ fontSize: 17 }} className="font-heading font-bold text-[#f5a623]">
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
                        "Visual & Layout QA",
                        "Motion & Physics",
                        "Security Review",
                        "Evidence Gates",
                      ].map((skill) => (
                        <div
                          key={skill}
                          style={{ fontSize: 14 }}
                          className="bm-chip rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-2 font-mono font-semibold text-[#f4f5f7]"
                        >
                          ▸ {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* VIEW 3: CLAUDE CODE · GOOGLE ANTIGRAVITY · CRAFTRIG MCP */}
              <div
                id="bm-v3"
                style={{ position: "absolute", inset: 0, padding: "43px 55px", perspective: 1400, display: "none" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div style={{ fontSize: 16, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#38bdf8]">
                    PHASE 02 // PARALLEL MULTI-AGENT ORCHESTRATION
                  </div>
                  <div style={{ fontSize: 15 }} className="font-mono font-bold text-[#f5a623]">
                    GITHUB: VICKYYMOSAFAN/MCP-CRAFTRIG
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    id="bm-v3-claude"
                    className="rounded-xl border-2 border-[#f5a623]/75 bg-[#101520]/95 p-4"
                  >
                    <div style={{ fontSize: 14 }} className="font-mono font-bold uppercase text-[#f5a623]">
                      AGENT ENGINE A
                    </div>
                    <div style={{ fontSize: 32 }} className="mt-1 font-heading font-bold text-white">
                      Claude Code
                    </div>
                    <div style={{ fontSize: 15 }} className="mt-2 font-mono text-[#d1d7e0]">
                      Autonomous Refactor · Backend &amp; Tests
                    </div>
                  </div>

                  <div
                    id="bm-v3-antigravity"
                    className="rounded-xl border-2 border-[#38bdf8]/75 bg-[#101520]/95 p-4"
                  >
                    <div style={{ fontSize: 14 }} className="font-mono font-bold uppercase text-[#38bdf8]">
                      AGENT ENGINE B
                    </div>
                    <div style={{ fontSize: 32 }} className="mt-1 font-heading font-bold text-white">
                      Google Antigravity
                    </div>
                    <div style={{ fontSize: 15 }} className="mt-2 font-mono text-[#d1d7e0]">
                      Parallel Subagents · UI &amp; Browser QA
                    </div>
                  </div>
                </div>

                <svg id="bm-v3-conduits" viewBox="0 0 1700 130" className="my-2 h-[58px] w-full">
                  <path
                    d="M 420 0 C 420 75, 850 55, 850 130"
                    fill="none"
                    stroke="#f5a623"
                    strokeWidth="6"
                    strokeDasharray="680"
                    strokeDashoffset="680"
                  />
                  <path
                    d="M 1280 0 C 1280 75, 850 55, 850 130"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeDasharray="680"
                    strokeDashoffset="680"
                  />
                </svg>

                <div
                  id="bm-v3-mcp-core"
                  className="rounded-xl border-2 border-white/20 bg-[#0e131d]/95 p-4"
                >
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <div>
                      <div style={{ fontSize: 15 }} className="font-mono uppercase tracking-[0.16em] text-[#ffba42]">
                        CUSTOM TYPESCRIPT MCP SERVER DEVELOPMENT · SDK v2
                      </div>
                      <div style={{ fontSize: 28 }} className="mt-1 font-heading font-bold text-white">
                        Craftrig MCP &amp; Visual QA Engine
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#f5a623] px-4 py-2 text-center text-[#080a0f]">
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
                      { title: "Topological DAG", detail: "Kahn algorithm & critical-path waves", accent: "#f5a623" },
                      { title: "Exclusive File Locks", detail: "Path write locks + stale recovery", accent: "#38bdf8" },
                      { title: "Evidence Quality Gates", detail: "SQLite WAL + Playwright proof", accent: "#fb923c" },
                    ].map((g) => (
                      <div
                        key={g.title}
                        style={{ borderTopColor: g.accent }}
                        className="bm-gate rounded-lg border border-white/15 border-t-4 bg-white/[0.04] p-3"
                      >
                        <div style={{ fontSize: 17, color: g.accent }} className="font-heading font-bold">
                          {g.title}
                        </div>
                        <div style={{ fontSize: 13 }} className="mt-2 font-body text-[#d1d7e0]">
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
                    <div style={{ fontSize: 15, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#38bdf8]">
                      PHASE 03 // INTELLIGENT RETRIEVAL ENGINE
                    </div>
                    <div style={{ fontSize: 37, lineHeight: 1.04 }} className="mt-1 font-heading font-bold text-white">
                      Hybrid &amp; Agentic RAG Pipeline
                    </div>
                  </div>
                  <div style={{ fontSize: 15 }} className="rounded-lg border border-[#f5a623]/60 bg-[#f5a623]/12 px-3 py-1 font-mono font-bold text-[#f5a623]">
                    WEIGHTED RRF · SELF-CRITIC
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-4 space-y-3">
                    <div id="bm-v4-pgvector" className="rounded-xl border-2 border-[#38bdf8]/70 bg-[#101622] p-3.5">
                      <div style={{ fontSize: 13 }} className="font-mono font-bold text-[#38bdf8]">
                        DENSE SEMANTIC SEARCH
                      </div>
                      <div style={{ fontSize: 22 }} className="mt-1 font-heading font-bold text-white">
                        Supabase pgvector
                      </div>
                      <div style={{ fontSize: 14 }} className="mt-2 font-mono text-[#d1d7e0]">
                        Gemini Embeddings · Top-50 Chunks
                      </div>
                    </div>

                    <div id="bm-v4-bm25" className="rounded-xl border-2 border-[#f5a623]/70 bg-[#101622] p-3.5">
                      <div style={{ fontSize: 13 }} className="font-mono font-bold text-[#f5a623]">
                        SPARSE LEXICAL RERANK
                      </div>
                      <div style={{ fontSize: 22 }} className="mt-1 font-heading font-bold text-white">
                        BM25 Exact Match
                      </div>
                      <div style={{ fontSize: 14 }} className="mt-2 font-mono text-[#d1d7e0]">
                        Course Codes &amp; Policy Clauses
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 flex flex-col items-center">
                    <svg id="bm-v4-fusion-paths" viewBox="0 0 380 120" className="w-full">
                      <path d="M 0 20 C 120 20, 140 60, 380 60" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="600" strokeDashoffset="600" />
                      <path d="M 0 100 C 120 100, 140 60, 380 60" fill="none" stroke="#f5a623" strokeWidth="5" strokeDasharray="600" strokeDashoffset="600" />
                    </svg>
                    <div
                      id="bm-v4-wrrf"
                      className="my-3 w-full rounded-xl border-2 border-[#f5a623] bg-[#f5a623]/15 px-3 py-2 text-center"
                    >
                      <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#f5a623]">
                        FUSION ENGINE
                      </div>
                      <div style={{ fontSize: 27 }} className="mt-1 font-heading font-extrabold text-white">
                        wRRF
                      </div>
                      <div style={{ fontSize: 13 }} className="mt-1 font-mono text-[#d1d7e0]">
                        Top-5 Grounded Context
                      </div>
                    </div>
                  </div>

                  <div id="bm-v4-metrics" className="col-span-5 space-y-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border border-white/20 bg-[#0e141f] p-3">
                        <div style={{ fontSize: 12 }} className="font-mono uppercase text-[#9aa5b6]">
                          RECALL SCORE
                        </div>
                        <div
                          id="bm-recall-val"
                          style={{ fontSize: 36, lineHeight: 1.05 }}
                          className="mt-2 min-w-[6ch] font-heading font-extrabold text-[#f5a623] tabular-nums"
                        >
                          91.67%
                        </div>
                        <div style={{ fontSize: 12 }} className="mt-1 font-mono text-[#38bdf8]">
                          ▲ up from 75.0%
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/20 bg-[#0e141f] p-3">
                        <div style={{ fontSize: 12 }} className="font-mono uppercase text-[#9aa5b6]">
                          RANK PRECISION
                        </div>
                        <div
                          style={{ fontSize: 36, lineHeight: 1.05 }}
                          className="mt-2 font-heading font-extrabold text-[#38bdf8] tabular-nums"
                        >
                          1.00
                        </div>
                        <div style={{ fontSize: 12 }} className="mt-1 font-mono text-[#d1d7e0]">
                          MRR (up from 0.71)
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/20 bg-[#0e141f] p-3">
                      <div className="flex items-baseline justify-between">
                        <span style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#f5a623]">
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
                      <div className="mt-4 h-5 w-full overflow-hidden rounded-full bg-white/10">
                        <div id="bm-redis-bar" className="h-full w-full bg-gradient-to-r from-[#38bdf8] to-[#f5a623]" />
                      </div>
                      <div style={{ fontSize: 11 }} className="mt-2 flex justify-between font-mono text-[#9aa5b6]">
                        <span>694ms Cached Fast Path</span>
                        <span>vs 18,300ms Uncached</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="bm-v4-critic"
                  className="mt-4 flex items-center justify-between rounded-xl border-2 border-[#38bdf8]/60 bg-[#0d1420] px-4 py-1.5"
                >
                  <div style={{ fontSize: 17 }} className="font-heading font-bold text-[#38bdf8]">
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
                    <div style={{ fontSize: 14, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#f5a623]">
                      PHASE 04 // COMPLETE TECHNICAL STACK
                    </div>
                    <div style={{ fontSize: 34, lineHeight: 1.05 }} className="mt-1 font-heading font-bold text-white">
                      Full-Stack Production Architecture
                    </div>
                  </div>
                  <div style={{ fontSize: 14 }} className="font-mono text-[#38bdf8]">
                    END-TO-END TYPED BOUNDARIES
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div id="bm-stack-fe" className="rounded-xl border-2 border-[#f5a623]/65 bg-[#0f141e]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#f5a623]">
                      01 // FRONTEND ARCHITECTURE
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["React 19", "Next.js 16", "Vue.js", "Tailwind CSS 4", "Framer Motion", "PWA & Recharts"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 15 }} className="rounded-md border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div id="bm-stack-be" className="rounded-xl border-2 border-[#38bdf8]/65 bg-[#0f141e]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#38bdf8]">
                      02 // BACKEND &amp; EDGE APIS
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["Node.js", "NestJS", "Express.js", "Hono", "Laravel", "OpenAPI & RBAC"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 15 }} className="rounded-md border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div id="bm-stack-db" className="rounded-xl border-2 border-[#fb923c]/65 bg-[#0f141e]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#fb923c]">
                      03 // DATABASE, VECTOR &amp; CACHE
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["PostgreSQL", "MySQL", "Prisma ORM", "Supabase pgvector", "Neon", "Redis + BullMQ", "Dexie Offline"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 14 }} className="rounded-md border border-white/20 bg-white/[0.06] px-3 py-1.5 font-mono font-semibold text-white">
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div id="bm-stack-lang" className="rounded-xl border-2 border-[#ffba42]/65 bg-[#0f141e]/95 p-3.5">
                    <div style={{ fontSize: 13 }} className="font-mono font-bold uppercase text-[#ffba42]">
                      04 // POLYGLOT LANGUAGES
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {["TypeScript", "JavaScript", "Python", "PHP", "Kotlin", "MQL5", "HTML / CSS"].map(
                        (s) => (
                          <span key={s} style={{ fontSize: 15 }} className="rounded-md border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono font-semibold text-white">
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
                    <div style={{ fontSize: 15, letterSpacing: "0.2em" }} className="font-mono font-bold uppercase text-[#38bdf8]">
                      PHASE 05 // CRAFTRIG VERIFICATION &amp; EDGE SHIP
                    </div>
                    <div style={{ fontSize: 34, lineHeight: 1.05 }} className="mt-1 font-heading font-bold text-white">
                      Jest · Supertest · Craftrig 13-Viewport QA
                    </div>
                  </div>
                  <div style={{ fontSize: 16 }} className="rounded-lg bg-[#f5a623] px-3.5 py-1 font-mono font-bold text-[#080a0f]">
                    50/50 PASS
                  </div>
                </div>

                <div
                  id="bm-v6-viewports"
                  className="mt-4 grid gap-2.5"
                  style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
                >
                  {VIEWPORT_PROFILES.map((vp) => (
                    <div
                      key={vp}
                      className="bm-vp rounded-lg border-2 border-[#38bdf8] bg-[#38bdf8]/15 py-1.5 text-center"
                    >
                      <div style={{ fontSize: 13 }} className="font-mono font-bold text-[#38bdf8] tabular-nums">
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
                        className="rounded-lg border border-[#38bdf8]/55 bg-[#101622] px-3 py-1.5 text-center font-mono font-semibold text-[#f4f5f7]"
                      >
                        {dep}
                      </div>
                    )
                  )}
                </div>

                <div id="bm-v6-finale" className="mt-6 text-center">
                  <div style={{ fontSize: 46, lineHeight: 1.05 }} className="font-heading font-bold tracking-tight text-white">
                    Engineered to ship.{" "}
                    <span className="text-[#f5a623]">Verified to last.</span>
                  </div>
                  <div style={{ fontSize: 16, letterSpacing: "0.2em" }} className="mt-2.5 inline-flex items-center justify-center gap-2.5 font-mono uppercase text-[#9aa5b6]">
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
                backgroundColor: "#f5a623",
                zIndex: 30,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Slim Rounded Below-Frame Cinema Controls & Chapter Scrubber */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1017] p-3.5 text-[#f4f5f7]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              data-testid="bang-motion-play-toggle"
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full bg-[#f5a623] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#080a0f] hover:bg-[#ffba42]"
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
              aria-label={isMuted ? "Muted — unmute voice over" : "VO · US Female — mute voice over"}
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-medium text-[#f4f5f7] hover:border-[#f5a623]/60 hover:text-[#f5a623]"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-[#fb923c]" aria-hidden="true" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-[#f5a623]" aria-hidden="true" />
                  <span>VO · US Female</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => startPlayback(true)}
              aria-label="Restart explainer video from beginning"
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-white/12 bg-transparent px-3.5 py-1.5 font-mono text-xs font-medium text-[#9aa5b6] hover:border-[#f5a623]/60 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-[#9aa5b6]">
            <span className="hidden font-semibold text-[#f4f5f7] md:inline">
              {currentBeat.label}
            </span>
            <span ref={clockRef} className="tabular-nums text-[#f4f5f7]">
              00:05 / {formatClock(TOTAL_DURATION)}
            </span>
          </div>
        </div>

        {/* Direct-DOM-Updated Progress Rail */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            ref={progressBarRef}
            className="h-full origin-left bg-gradient-to-r from-[#f5a623] to-[#38bdf8]"
            style={{ transform: "scaleX(0.05)" }}
          />
        </div>

        {/* Interactive Chapter Jump Rail */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
          {VO_BEATS.map((beat, idx) => {
            const active = idx === activeBeatIdx;
            return (
              <button
                key={beat.id}
                type="button"
                onClick={() => handleSeekBeat(beat.start, idx)}
                className={`min-h-10 cursor-pointer truncate rounded-xl border px-2.5 py-2 text-left font-mono text-[11px] transition-colors ${
                  active
                    ? "border-[#f5a623]/70 bg-[#f5a623]/15 font-bold text-[#f5a623]"
                    : "border-white/10 bg-white/[0.03] text-[#9aa5b6] hover:border-white/25 hover:text-white"
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
