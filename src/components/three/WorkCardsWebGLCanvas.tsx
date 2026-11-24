"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  attachArchitecturalLights,
  type CardPointerState,
} from "@/components/three/architecturalLights";

export interface CardSlotRegistration {
  id: string;
  getElement: () => HTMLDivElement | null;
  getPointer: () => CardPointerState;
}

interface WorkCardsWebGLCanvasProps {
  slotsRef: React.MutableRefObject<Map<string, CardSlotRegistration>>;
  projectIds: string[];
  xMotionValue: MotionValue<number>;
}

function buildCardSculpture(projectId: string, isDark: boolean) {
  const root = new THREE.Group();

  const primaryMat = new THREE.MeshStandardMaterial({
    color: isDark ? 0xc8f53c : 0x185c37,
    roughness: 0.24,
    metalness: 0.56,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: isDark ? 0x56ccf2 : 0x035e8c,
    roughness: 0.22,
    metalness: 0.62,
  });

  const bodyMat = new THREE.MeshStandardMaterial({
    color: isDark ? 0x26313b : 0x3b4954,
    roughness: 0.34,
    metalness: 0.72,
  });

  const wireMat = new THREE.MeshBasicMaterial({
    color: isDark ? 0xc8f53c : 0x185c37,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });

  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.08, 20), bodyMat);
  plinth.position.y = -0.92;
  root.add(plinth);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.02, 8, 32), primaryMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.87;
  root.add(rim);

  switch (projectId) {
    case "hybrid-rag-thesis": {
      root.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.56, 1), primaryMat));
      root.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 0), wireMat));
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.032, 10, 34), accentMat);
      r1.rotation.x = Math.PI * 0.34;
      root.add(r1);
      const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.025, 10, 30), bodyMat);
      r2.rotation.y = Math.PI * 0.4;
      r2.rotation.x = -Math.PI * 0.25;
      root.add(r2);
      const nodeGeo = new THREE.SphereGeometry(0.085, 10, 10);
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? primaryMat : accentMat);
        node.position.set(Math.cos(ang) * 0.95, Math.sin(ang) * 0.42, Math.sin(ang) * 0.58);
        root.add(node);
      }
      break;
    }
    case "beyond-rag": {
      root.add(new THREE.Mesh(new THREE.DodecahedronGeometry(0.52, 0), accentMat));
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.036, 10, 36), primaryMat);
      halo.rotation.x = Math.PI * 0.42;
      halo.rotation.y = 0.28;
      root.add(halo);
      const satGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
      const offsets: [number, number, number][] = [
        [-0.78, 0.45, 0.35],
        [0.82, 0.3, -0.3],
        [0.12, -0.52, 0.72],
        [-0.35, -0.38, -0.68],
      ];
      offsets.forEach(([x, y, z], i) => {
        const sat = new THREE.Mesh(satGeo, i === 0 ? primaryMat : bodyMat);
        sat.position.set(x, y, z);
        sat.rotation.set(0.4, 0.6, 0.2);
        root.add(sat);
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z));
        root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 3, 0.018, 6, false), accentMat));
      });
      break;
    }
    case "mcp-craftrig":
    case "mcp-servers": {
      const hubA = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.54, 0.54), bodyMat);
      hubA.position.set(-0.34, 0.16, 0.12);
      hubA.rotation.set(0.35, 0.5, 0);
      root.add(hubA);

      const hubB = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.46), primaryMat);
      hubB.position.set(0.38, -0.1, -0.14);
      hubB.rotation.set(-0.25, 0.7, 0.3);
      root.add(hubB);

      const hubC = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 0), accentMat);
      hubC.position.set(0.02, 0.54, 0.22);
      root.add(hubC);

      root.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-0.34, 0.16, 0.12),
              new THREE.Vector3(0.02, 0.54, 0.22),
              new THREE.Vector3(0.38, -0.1, -0.14),
            ]),
            14,
            0.032,
            8,
            false
          ),
          accentMat
        )
      );

      const frame = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.022, 8, 32), wireMat);
      frame.rotation.y = Math.PI * 0.2;
      root.add(frame);
      break;
    }
    case "buildflow-erp": {
      let idx = 0;
      const boxGeos = [
        new THREE.BoxGeometry(0.42, 0.22, 0.42),
        new THREE.BoxGeometry(0.42, 0.28, 0.42),
        new THREE.BoxGeometry(0.42, 0.34, 0.42),
      ];
      for (let y = 0; y < 3; y++) {
        for (let x = -1; x <= 1; x += 2) {
          for (let z = -1; z <= 1; z += 2) {
            const mat = idx % 4 === 0 ? primaryMat : idx % 3 === 0 ? accentMat : bodyMat;
            const block = new THREE.Mesh(boxGeos[idx % 3], mat);
            block.position.set(x * 0.28, -0.45 + y * 0.36, z * 0.28);
            root.add(block);
            idx++;
          }
        }
      }
      break;
    }
    case "arven-ecommerce": {
      root.add(new THREE.Mesh(new THREE.TorusKnotGeometry(0.48, 0.14, 56, 10, 2, 3), primaryMat));
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.026, 8, 32), accentMat);
      collar.rotation.x = Math.PI * 0.48;
      root.add(collar);
      break;
    }
    case "digital-posyandu": {
      const strandPtsA: THREE.Vector3[] = [];
      const strandPtsB: THREE.Vector3[] = [];
      for (let i = 0; i <= 12; i++) {
        const t = (i / 12) * Math.PI * 2.2;
        const y = -0.68 + (i / 12) * 1.38;
        strandPtsA.push(new THREE.Vector3(Math.cos(t) * 0.44, y, Math.sin(t) * 0.44));
        strandPtsB.push(new THREE.Vector3(Math.cos(t + Math.PI) * 0.44, y, Math.sin(t + Math.PI) * 0.44));
        if (i % 3 === 0) {
          root.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(new THREE.LineCurve3(strandPtsA[i], strandPtsB[i]), 2, 0.02, 6, false),
              bodyMat
            )
          );
        }
      }
      root.add(
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandPtsA), 24, 0.042, 8, false), primaryMat)
      );
      root.add(
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandPtsB), 24, 0.042, 8, false), accentMat)
      );
      break;
    }
    default: {
      const heights = [0.42, 0.68, 0.52, 0.88, 1.08];
      heights.forEach((h, i) => {
        const x = (i - 2) * 0.34;
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(0.18, h, 0.18),
          i === 4 ? primaryMat : i % 2 === 0 ? accentMat : bodyMat
        );
        bar.position.set(x, -0.68 + h / 2, 0);
        root.add(bar);
        const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, h + 0.34, 6), bodyMat);
        wick.position.set(x, -0.68 + h / 2, 0);
        root.add(wick);
      });
      root.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-0.78, -0.35, 0.28),
              new THREE.Vector3(-0.1, 0.12, 0.32),
              new THREE.Vector3(0.75, 0.56, 0.25),
            ]),
            16,
            0.028,
            8,
            false
          ),
          primaryMat
        )
      );
      break;
    }
  }

  return {
    root,
    updateTheme(nextDark: boolean) {
      const p = nextDark ? 0xc8f53c : 0x185c37;
      const a = nextDark ? 0x56ccf2 : 0x035e8c;
      const b = nextDark ? 0x26313b : 0x3b4954;
      primaryMat.color.setHex(p);
      accentMat.color.setHex(a);
      bodyMat.color.setHex(b);
      wireMat.color.setHex(p);
    },
    dispose() {
      const geos = new Set<THREE.BufferGeometry>();
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh && !geos.has(obj.geometry)) {
          geos.add(obj.geometry);
          obj.geometry.dispose();
        }
      });
      primaryMat.dispose();
      accentMat.dispose();
      bodyMat.dispose();
      wireMat.dispose();
    },
  };
}

/**
 * Direct-Swapchain Zero-Stall Shared WebGL Scissor Layer for Section 01:
 * - Renders directly to ONE persistent WebGL swapchain (ZERO `ctx2d.drawImage` GPU pipeline stalls!).
 * - ZERO `PMREMGenerator` / `RoomEnvironment` baking (uses crisp 3-point lighting + `compileAsync()`).
 * - ZERO per-frame `getBoundingClientRect()` layout reads! Caches each card slot's base layout
 *   relative to the canvas ONCE on mount/resize and adds `xMotionValue.get()` in pure O(1) math!
 * - Initializes ONCE during idle after Hero paint and strictly pauses/resumes rAF off-screen (never destroys WebGL mid-scroll).
 */
export function WorkCardsWebGLCanvas({
  slotsRef,
  projectIds,
  xMotionValue,
}: WorkCardsWebGLCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const syncThemeRef = useRef<(() => void) | null>(null);
  const remeasureRef = useRef<(() => void) | null>(null);
  const projectIdsRef = useRef(projectIds);

  useEffect(() => {
    themeRef.current = theme;
    syncThemeRef.current?.();
  }, [theme]);

  useEffect(() => {
    projectIdsRef.current = projectIds;
    remeasureRef.current?.();
  }, [projectIds]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    const init = () => {
      if (cancelled || !host) return;

      const canvas = document.createElement("canvas");
      canvas.className = "pointer-events-none block h-full w-full";
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: dpr < 1.5,
          alpha: true,
          stencil: false,
          powerPreference: "high-performance",
        });
      } catch {
        if (canvas.parentNode === host) host.removeChild(canvas);
        return;
      }

      renderer.setPixelRatio(dpr);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.setClearColor(0x000000, 0);

      type Entry = {
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        lights: ReturnType<typeof attachArchitecturalLights>;
        sculpture: ReturnType<typeof buildCardSculpture>;
        rotY: number;
        rotX: number;
        lastAspect: number;
      };

      const entries = new Map<string, Entry>();
      const allIds = [
        "hybrid-rag-thesis",
        "beyond-rag",
        "mcp-craftrig",
        "buildflow-erp",
        "arven-ecommerce",
        "digital-posyandu",
        "destino-copytrade",
      ];

      const isDarkInit = themeRef.current === "dark";
      for (const id of allIds) {
        const scene = new THREE.Scene();
        const lights = attachArchitecturalLights(scene, isDarkInit);
        const camera = new THREE.PerspectiveCamera(36, 2.2, 0.1, 30);
        camera.position.set(0, 0.35, 3.85);
        camera.lookAt(0, -0.05, 0);
        const sculpture = buildCardSculpture(id, isDarkInit);
        scene.add(sculpture.root);
        entries.set(id, {
          scene,
          camera,
          lights,
          sculpture,
          rotY: 0,
          rotX: 0,
          lastAspect: 2.2,
        });
      }

      // Cached layout positions relative to host with x = 0 (ZERO per-frame getBoundingClientRect!)
      type CachedSlotBox = {
        id: string;
        baseLeft: number;
        bottom: number;
        width: number;
        height: number;
      };
      let cachedCanvasW = 1;
      let cachedCanvasH = 200;
      let cachedBoxes: CachedSlotBox[] = [];

      const measureLayout = () => {
        const hostRect = host.getBoundingClientRect();
        cachedCanvasW = Math.max(1, Math.round(hostRect.width));
        cachedCanvasH = Math.max(1, Math.round(hostRect.height));
        renderer.setSize(cachedCanvasW, cachedCanvasH, false);

        const currentX = xMotionValue.get();
        const nextBoxes: CachedSlotBox[] = [];

        slotsRef.current.forEach((slot) => {
          const el = slot.getElement();
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.width < 10 || r.height < 10) return;
          nextBoxes.push({
            id: slot.id,
            // Subtract currentX so baseLeft is exact position at x === 0!
            baseLeft: r.left - hostRect.left - currentX,
            bottom: hostRect.bottom - r.bottom,
            width: r.width,
            height: r.height,
          });
        });
        cachedBoxes = nextBoxes;
      };

      remeasureRef.current = () => {
        requestAnimationFrame(() => {
          measureLayout();
          drawFrame(simTime);
        });
      };

      const scratchScale = new THREE.Vector3(1, 1, 1);
      let isInView = false;
      let isPageVisible = !document.hidden;
      let rafId = 0;
      let simTime = 0;
      let lastTs = performance.now();

      const drawFrame = (t: number) => {
        if (cachedCanvasW < 10 || cachedCanvasH < 10) return;
        if (cachedBoxes.length === 0) measureLayout();

        const currentX = xMotionValue.get();
        renderer.setScissorTest(false);
        renderer.setClearColor(0x000000, 0);
        renderer.clear();
        renderer.setScissorTest(true);

        for (let i = 0; i < cachedBoxes.length; i++) {
          const box = cachedBoxes[i];
          const left = box.baseLeft + currentX;
          if (left + box.width < -8 || left > cachedCanvasW + 8) continue;

          const entry = entries.get(box.id);
          const slot = slotsRef.current.get(box.id);
          if (!entry || !slot) continue;

          renderer.setViewport(left, box.bottom, box.width, box.height);
          renderer.setScissor(left, box.bottom, box.width, box.height);

          const aspect = box.width / box.height;
          if (Math.abs(aspect - entry.lastAspect) > 0.01) {
            entry.lastAspect = aspect;
            entry.camera.aspect = aspect;
            entry.camera.updateProjectionMatrix();
          }

          const ptr = slot.getPointer();
          const targetRotY = ptr.hovered ? ptr.x * 1.45 : t * 0.42;
          const targetRotX = ptr.hovered ? -ptr.y * 0.72 : Math.sin(t * 0.65) * 0.12;
          const targetScale = ptr.hovered ? 1.08 : 1.0;

          entry.rotY += (targetRotY - entry.rotY) * (ptr.hovered ? 0.14 : 0.05);
          entry.rotX += (targetRotX - entry.rotX) * 0.1;

          entry.sculpture.root.rotation.y = entry.rotY;
          entry.sculpture.root.rotation.x = entry.rotX;
          entry.sculpture.root.position.y = Math.sin(t * 1.1) * 0.06;
          scratchScale.setScalar(targetScale);
          entry.sculpture.root.scale.lerp(scratchScale, 0.12);

          renderer.render(entry.scene, entry.camera);
        }
      };

      const tick = (ts: number) => {
        rafId = 0;
        if (!isInView || !isPageVisible) return;
        const dt = Math.min(0.05, Math.max(0, (ts - lastTs) / 1000));
        lastTs = ts;
        simTime += prefersReduced ? dt * 0.45 : dt;
        drawFrame(simTime);
        rafId = requestAnimationFrame(tick);
      };

      const ensureRunning = () => {
        if (rafId === 0 && isInView && isPageVisible) {
          lastTs = performance.now();
          rafId = requestAnimationFrame(tick);
        }
      };

      syncThemeRef.current = () => {
        const nextDark = themeRef.current === "dark";
        entries.forEach((entry) => {
          entry.lights.updateTheme(nextDark);
          entry.sculpture.updateTheme(nextDark);
        });
        if (isInView) drawFrame(simTime);
      };

      const ro = new ResizeObserver(() => {
        measureLayout();
        if (isInView) drawFrame(simTime);
      });
      ro.observe(host);

      const io = new IntersectionObserver(
        (obsEntries) => {
          isInView = obsEntries.some((e) => e.isIntersecting);
          if (isInView) {
            if (cachedBoxes.length === 0) measureLayout();
            drawFrame(simTime);
            ensureRunning();
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        },
        { rootMargin: "240px 0px" }
      );
      io.observe(host);

      const onVis = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) ensureRunning();
        else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };
      document.addEventListener("visibilitychange", onVis);

      measureLayout();

      // Precompile shaders asynchronously off the scroll path via KHR_parallel_shader_compile!
      const firstEntry = entries.values().next().value;
      if (firstEntry && typeof renderer.compileAsync === "function") {
        void renderer.compileAsync(firstEntry.scene, firstEntry.camera).then(() => {
          if (!cancelled) drawFrame(simTime);
        });
      } else {
        drawFrame(simTime);
      }

      cleanupFn = () => {
        syncThemeRef.current = null;
        remeasureRef.current = null;
        if (rafId) cancelAnimationFrame(rafId);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        entries.forEach((entry) => entry.sculpture.dispose());
        entries.clear();
        renderer.dispose();
        if (canvas.parentNode === host) host.removeChild(canvas);
      };
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timerId = 0;
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(init, { timeout: 550 });
    } else {
      timerId = window.setTimeout(init, 250);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timerId) window.clearTimeout(timerId);
      cleanupFn?.();
    };
  }, [slotsRef, xMotionValue]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[200px] w-full"
    />
  );
}
