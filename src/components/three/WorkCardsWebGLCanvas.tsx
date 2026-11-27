"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cancelFrame, frame, type MotionValue } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  attachArchitecturalLights,
  type CardPointerState,
} from "@/components/three/architecturalLights";
import { yieldToMain } from "@/lib/scrollIdle";

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

interface SharedMaterials {
  primaryMat: THREE.MeshPhongMaterial;
  accentMat: THREE.MeshPhongMaterial;
  bodyMat: THREE.MeshPhongMaterial;
  wireMat: THREE.MeshBasicMaterial;
}

function createSharedCardMaterials(isDark: boolean): SharedMaterials {
  const spec = isDark ? 0x67e8f9 : 0x2c6e58;
  return {
    primaryMat: new THREE.MeshPhongMaterial({
      color: isDark ? 0xc8f53c : 0x185c37,
      specular: spec,
      shininess: 68,
    }),
    accentMat: new THREE.MeshPhongMaterial({
      color: isDark ? 0x56ccf2 : 0x035e8c,
      specular: 0x9be7ff,
      shininess: 76,
    }),
    bodyMat: new THREE.MeshPhongMaterial({
      color: isDark ? 0x26313b : 0x3b4954,
      specular: 0x526473,
      shininess: 48,
    }),
    wireMat: new THREE.MeshBasicMaterial({
      color: isDark ? 0xc8f53c : 0x185c37,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    }),
  };
}

function buildCardSculptureGroup(
  projectId: string,
  mats: SharedMaterials,
  sharedPlinthGeo: THREE.BufferGeometry,
  sharedRimGeo: THREE.BufferGeometry
): THREE.Group {
  const { primaryMat, accentMat, bodyMat, wireMat } = mats;
  const root = new THREE.Group();

  const plinth = new THREE.Mesh(sharedPlinthGeo, bodyMat);
  plinth.position.y = -0.92;
  root.add(plinth);

  const rim = new THREE.Mesh(sharedRimGeo, primaryMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.87;
  root.add(rim);

  switch (projectId) {
    case "hybrid-rag-thesis": {
      root.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.56, 1), primaryMat));
      root.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 0), wireMat));
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.032, 8, 28), accentMat);
      r1.rotation.x = Math.PI * 0.34;
      root.add(r1);
      const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.025, 8, 24), bodyMat);
      r2.rotation.y = Math.PI * 0.4;
      r2.rotation.x = -Math.PI * 0.25;
      root.add(r2);
      const nodeGeo = new THREE.SphereGeometry(0.085, 8, 8);
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
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.036, 8, 30), primaryMat);
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
        root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 2, 0.018, 6, false), accentMat));
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
            12,
            0.032,
            6,
            false
          ),
          accentMat
        )
      );

      const frameRing = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.022, 8, 28), wireMat);
      frameRing.rotation.y = Math.PI * 0.2;
      root.add(frameRing);
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
      root.add(new THREE.Mesh(new THREE.TorusKnotGeometry(0.48, 0.14, 44, 8, 2, 3), primaryMat));
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.026, 8, 28), accentMat);
      collar.rotation.x = Math.PI * 0.48;
      root.add(collar);
      break;
    }
    case "digital-posyandu": {
      const strandPtsA: THREE.Vector3[] = [];
      const strandPtsB: THREE.Vector3[] = [];
      for (let i = 0; i <= 10; i++) {
        const t = (i / 10) * Math.PI * 2.2;
        const y = -0.68 + (i / 10) * 1.38;
        strandPtsA.push(new THREE.Vector3(Math.cos(t) * 0.44, y, Math.sin(t) * 0.44));
        strandPtsB.push(
          new THREE.Vector3(Math.cos(t + Math.PI) * 0.44, y, Math.sin(t + Math.PI) * 0.44)
        );
        if (i % 2 === 0) {
          root.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(new THREE.LineCurve3(strandPtsA[i], strandPtsB[i]), 2, 0.02, 6, false),
              bodyMat
            )
          );
        }
      }
      root.add(
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandPtsA), 20, 0.042, 6, false), primaryMat)
      );
      root.add(
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandPtsB), 20, 0.042, 6, false), accentMat)
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
            14,
            0.028,
            6,
            false
          ),
          primaryMat
        )
      );
      break;
    }
  }

  return root;
}

const ALL_PROJECT_IDS = [
  "hybrid-rag-thesis",
  "beyond-rag",
  "mcp-craftrig",
  "buildflow-erp",
  "arven-ecommerce",
  "digital-posyandu",
  "destino-copytrade",
] as const;

/**
 * Single-Scene Zero-Desync Direct-Swapchain WebGL Scissor Layer for Section 01:
 * - ONE shared THREE.Scene, ONE 4-light architectural rig, ONE set of 4 shared PBR materials
 *   across all 7 sculptures (cuts shader compilations 7× -> ZERO mid-scroll shader stalls!).
 * - Synced directly to Framer Motion's `frame.postRender` (AFTER Motion applies `x` to the DOM track)
 *   so 3D viewports align 1:1 with cards on the exact same animation frame (zero 1-frame rubber-band lag!).
 * - Full-rate lockstep rendering while scrolling or hovering; lightweight ~30fps idle spin when resting;
 *   0% GPU/CPU when scrolled off-screen or hidden.
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

  useEffect(() => {
    themeRef.current = theme;
    syncThemeRef.current?.();
  }, [theme]);

  useEffect(() => {
    remeasureRef.current?.();
  }, [projectIds]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    const initWebGL = () => {
      if (cancelled || !host) return;

      const canvas = document.createElement("canvas");
      canvas.className = "pointer-events-none block h-full w-full";
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isNarrow = window.innerWidth < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1.0 : 1.25);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: true,
          stencil: false,
          powerPreference: "high-performance",
        });
      } catch {
        if (canvas.parentNode === host) host.removeChild(canvas);
        return;
      }

    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const isDarkInit = themeRef.current === "dark";
    const scene = new THREE.Scene();
    const lights = attachArchitecturalLights(scene, isDarkInit);
    const sharedMats = createSharedCardMaterials(isDarkInit);
    const sharedPlinthGeo = new THREE.CylinderGeometry(1.15, 1.25, 0.08, 18);
    const sharedRimGeo = new THREE.TorusGeometry(1.18, 0.02, 8, 28);

    const camera = new THREE.PerspectiveCamera(36, 2.2, 0.1, 30);
    camera.position.set(0, 0.35, 3.85);
    camera.lookAt(0, -0.05, 0);
    let lastAspect = 2.2;

    type SculptureEntry = {
      root: THREE.Group;
      rotY: number;
      rotX: number;
      scale: number;
    };

    const entries = new Map<string, SculptureEntry>();

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
          baseLeft: r.left - hostRect.left - currentX,
          bottom: hostRect.bottom - r.bottom,
          width: r.width,
          height: r.height,
        });
      });
      cachedBoxes = nextBoxes;
    };

    let isInView = false;
    let isPageVisible = !document.hidden;
    let loopRunning = false;
    let simTime = 0;
    let lastDrawTs = performance.now();
    let lastRenderedX = Number.NaN;

    const drawFrame = (t: number) => {
      if (cachedCanvasW < 10 || cachedCanvasH < 10) return;
      if (cachedBoxes.length === 0) measureLayout();

      const currentX = xMotionValue.get();
      lastRenderedX = currentX;

      renderer.setScissorTest(false);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      renderer.setScissorTest(true);

      let anyHovered = false;

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
        if (Math.abs(aspect - lastAspect) > 0.01) {
          lastAspect = aspect;
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
        }

        const ptr = slot.getPointer();
        if (ptr.hovered) anyHovered = true;

        const targetRotY = ptr.hovered ? ptr.x * 1.45 : prefersReduced ? 0.35 : t * 0.42;
        const targetRotX = ptr.hovered
          ? -ptr.y * 0.72
          : prefersReduced
          ? 0.08
          : Math.sin(t * 0.65) * 0.12;
        const targetScale = ptr.hovered ? 1.08 : 1.0;

        entry.rotY += (targetRotY - entry.rotY) * (ptr.hovered ? 0.16 : 0.07);
        entry.rotX += (targetRotX - entry.rotX) * 0.12;
        entry.scale += (targetScale - entry.scale) * 0.14;

        entry.root.rotation.y = entry.rotY;
        entry.root.rotation.x = entry.rotX;
        entry.root.position.y = prefersReduced ? 0 : Math.sin(t * 1.1) * 0.05;
        entry.root.scale.setScalar(entry.scale);

        entry.root.visible = true;
        renderer.render(scene, camera);
        entry.root.visible = false;
      }

      return anyHovered;
    };

    // Synced directly into Motion's postRender phase (0-frame lag with x transform!)
    const onPostRender = (data: { timestamp: number }) => {
      if (!isInView || !isPageVisible) {
        stopLoop();
        return;
      }

      const currentX = xMotionValue.get();
      const xMoved = Math.abs(currentX - lastRenderedX) > 0.05;
      const elapsedMs = data.timestamp - lastDrawTs;

      // Full lockstep rate when track x moved; ~30fps when resting idle (or halted on reduced-motion)
      let anySlotHovered = false;
      if (!xMoved && elapsedMs < 33) {
        slotsRef.current.forEach((s) => {
          if (s.getPointer().hovered) anySlotHovered = true;
        });
        if (!anySlotHovered) return;
      }

      if (prefersReduced && !xMoved && !anySlotHovered) return;

      const dt = Math.min(0.06, Math.max(0, elapsedMs / 1000));
      lastDrawTs = data.timestamp;
      if (!prefersReduced) {
        simTime += dt;
      }
      drawFrame(simTime);
    };

    const startLoop = () => {
      if (!loopRunning && isInView && isPageVisible) {
        loopRunning = true;
        lastDrawTs = performance.now();
        frame.postRender(onPostRender, true);
      }
    };

    const stopLoop = () => {
      if (loopRunning) {
        loopRunning = false;
        cancelFrame(onPostRender);
      }
    };

    // Also wake immediately whenever xMotionValue changes (even under reduced-motion)
    const unsubX = xMotionValue.on("change", () => {
      if (isInView && isPageVisible) {
        if (!loopRunning) drawFrame(simTime);
      }
    });

    remeasureRef.current = () => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        measureLayout();
        if (isInView) drawFrame(simTime);
      });
    };

    syncThemeRef.current = () => {
      const nextDark = themeRef.current === "dark";
      lights.updateTheme(nextDark);
      const p = nextDark ? 0xc8f53c : 0x185c37;
      const a = nextDark ? 0x56ccf2 : 0x035e8c;
      const b = nextDark ? 0x26313b : 0x3b4954;
      sharedMats.primaryMat.color.setHex(p);
      sharedMats.accentMat.color.setHex(a);
      sharedMats.bodyMat.color.setHex(b);
      sharedMats.wireMat.color.setHex(p);
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
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "220px 0px" }
    );
    io.observe(host);

    const onVis = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVis);

    measureLayout();

    // Build sculpture geometries across yielded slices (scheduler.yield) so main thread never blocks > 50ms,
    // then compile ALL 7 sculptures in ONE single async batch (shared materials = 1 GPU shader program!).
    const buildAndCompile = async () => {
      for (let i = 0; i < ALL_PROJECT_IDS.length; i++) {
        if (cancelled) return;
        const id = ALL_PROJECT_IDS[i];
        const root = buildCardSculptureGroup(id, sharedMats, sharedPlinthGeo, sharedRimGeo);
        root.visible = true;
        scene.add(root);
        entries.set(id, { root, rotY: 0, rotX: 0, scale: 1 });
        if (i === 2 || i === 5) {
          await yieldToMain();
        }
      }
      if (cancelled) return;

      const finishCompile = () => {
        if (cancelled) return;
        // One warm-up draw during idle uploads all 7 VBOs & initializes GPU swapchain
        // BEFORE the user scrolls into Section 01 (eliminates first-draw mid-scroll stall!).
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, Math.max(1, cachedCanvasW), Math.max(1, cachedCanvasH));
        renderer.render(scene, camera);
        entries.forEach((e) => {
          e.root.visible = false;
        });
        renderer.clear();
        if (isInView) {
          drawFrame(simTime);
          startLoop();
        }
      };

      if (typeof renderer.compileAsync === "function") {
        await renderer.compileAsync(scene, camera);
        finishCompile();
      } else {
        renderer.compile(scene, camera);
        finishCompile();
      }
    };

    void buildAndCompile();

      cleanupFn = () => {
        syncThemeRef.current = null;
        remeasureRef.current = null;
        stopLoop();
        unsubX();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);

        const geos = new Set<THREE.BufferGeometry>([sharedPlinthGeo, sharedRimGeo]);
        entries.forEach((entry) => {
          entry.root.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              geos.add(obj.geometry);
            }
          });
        });
        geos.forEach((g) => g.dispose());
        entries.clear();

        sharedMats.primaryMat.dispose();
        sharedMats.accentMat.dispose();
        sharedMats.bodyMat.dispose();
        sharedMats.wireMat.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        if (canvas.parentNode === host) host.removeChild(canvas);
      };
    };

    const initRaf = requestAnimationFrame(initWebGL);

    return () => {
      cancelled = true;
      cancelAnimationFrame(initRaf);
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
