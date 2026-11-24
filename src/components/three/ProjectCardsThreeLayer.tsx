"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "@/components/providers/ThemeProvider";

export interface CardSlotHandle {
  id: string;
  getElement: () => HTMLDivElement | null;
  getPointer: () => { x: number; y: number; hovered: boolean };
}

interface ProjectCardsThreeLayerProps {
  slotsRef: React.MutableRefObject<Map<string, CardSlotHandle>>;
  projectIds: string[];
}

function createProjectSculpture(
  projectId: string,
  primaryHex: number,
  accentHex: number,
  metalHex: number
): THREE.Group {
  const root = new THREE.Group();

  // Lightweight PBR MeshStandardMaterial with RoomEnvironment IBL (~3x faster fragment shader than MeshPhysicalMaterial)
  const primaryMat = new THREE.MeshStandardMaterial({
    color: primaryHex,
    roughness: 0.24,
    metalness: 0.58,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.22,
    metalness: 0.65,
  });

  const bodyMat = new THREE.MeshStandardMaterial({
    color: metalHex,
    roughness: 0.34,
    metalness: 0.78,
  });

  const wireMat = new THREE.MeshBasicMaterial({
    color: primaryHex,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });

  // Base architectural beveled plinth ring
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.08, 24), bodyMat);
  plinth.position.y = -0.92;
  root.add(plinth);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.02, 10, 36), primaryMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.87;
  root.add(rim);

  switch (projectId) {
    case "hybrid-rag-thesis": {
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.56, 1), primaryMat);
      root.add(core);
      const outerCage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 0), wireMat);
      root.add(outerCage);
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.032, 12, 40), accentMat);
      r1.rotation.x = Math.PI * 0.34;
      root.add(r1);
      const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.025, 12, 36), bodyMat);
      r2.rotation.y = Math.PI * 0.4;
      r2.rotation.x = -Math.PI * 0.25;
      root.add(r2);
      const nodeGeo = new THREE.SphereGeometry(0.085, 12, 12);
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? primaryMat : accentMat);
        node.position.set(Math.cos(ang) * 0.95, Math.sin(ang) * 0.42, Math.sin(ang) * 0.58);
        root.add(node);
      }
      break;
    }
    case "beyond-rag": {
      const icosa = new THREE.Mesh(new THREE.DodecahedronGeometry(0.52, 0), accentMat);
      root.add(icosa);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.036, 12, 42), primaryMat);
      halo.rotation.x = Math.PI * 0.42;
      halo.rotation.y = 0.28;
      root.add(halo);
      const satGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
      const satelliteOffsets: [number, number, number][] = [
        [-0.78, 0.45, 0.35],
        [0.82, 0.3, -0.3],
        [0.12, -0.52, 0.72],
        [-0.35, -0.38, -0.68],
      ];
      satelliteOffsets.forEach(([x, y, z], i) => {
        const sat = new THREE.Mesh(satGeo, i === 0 ? primaryMat : bodyMat);
        sat.position.set(x, y, z);
        sat.rotation.set(0.4, 0.6, 0.2);
        root.add(sat);
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z));
        const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 4, 0.018, 6, false), accentMat);
        root.add(tube);
      });
      break;
    }
    case "mcp-craftrig":
    case "mcp-servers": {
      // Craftrig MCP: Topological DAG Nodes + Exclusive Lock Ring + Parallel Conduit
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

      const link = new THREE.Mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.34, 0.16, 0.12),
            new THREE.Vector3(0.02, 0.54, 0.22),
            new THREE.Vector3(0.38, -0.1, -0.14),
          ]),
          16,
          0.032,
          8,
          false
        ),
        accentMat
      );
      root.add(link);

      const frame = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.022, 8, 36), wireMat);
      frame.rotation.y = Math.PI * 0.2;
      root.add(frame);
      break;
    }
    case "buildflow-erp": {
      // BuildFlow ERP: 12-Module Construction Modular Monolith Stacked Blocks
      let idx = 0;
      for (let y = 0; y < 3; y++) {
        for (let x = -1; x <= 1; x += 2) {
          for (let z = -1; z <= 1; z += 2) {
            const h = 0.22 + (idx % 3) * 0.06;
            const mat = idx % 4 === 0 ? primaryMat : idx % 3 === 0 ? accentMat : bodyMat;
            const block = new THREE.Mesh(new THREE.BoxGeometry(0.42, h, 0.42), mat);
            block.position.set(x * 0.28, -0.45 + y * 0.36, z * 0.28);
            root.add(block);
            idx++;
          }
        }
      }
      break;
    }
    case "arven-ecommerce": {
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.48, 0.14, 64, 12, 2, 3), primaryMat);
      root.add(knot);
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.026, 10, 36), accentMat);
      collar.rotation.x = Math.PI * 0.48;
      root.add(collar);
      break;
    }
    case "digital-posyandu": {
      const strandPtsA: THREE.Vector3[] = [];
      const strandPtsB: THREE.Vector3[] = [];
      for (let i = 0; i <= 14; i++) {
        const t = (i / 14) * Math.PI * 2.2;
        const y = -0.68 + (i / 14) * 1.38;
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
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandPtsA), 28, 0.042, 8, false), primaryMat)
      );
      root.add(
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandPtsB), 28, 0.042, 8, false), accentMat)
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
      const arc = new THREE.Mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.78, -0.35, 0.28),
            new THREE.Vector3(-0.1, 0.12, 0.32),
            new THREE.Vector3(0.75, 0.56, 0.25),
          ]),
          18,
          0.028,
          8,
          false
        ),
        primaryMat
      );
      root.add(arc);
      break;
    }
  }

  return root;
}

/**
 * Single shared WebGLRenderer rendering interactive PBR Three.js scenes via setScissor:
 * - Completely halts rAF when Section 01 is off-screen or tab is hidden (zero background GPU cost).
 * - Batches DOM rect reads before WebGL draws, caches aspect ratio, zero per-frame allocations.
 * - Zero synchronous scroll double-rendering and zero preserveDrawingBuffer overhead.
 */
export function ProjectCardsThreeLayer({
  slotsRef,
  projectIds,
}: ProjectCardsThreeLayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const [inView, setInView] = React.useState(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Acquire WebGL context strictly while Section 01 is near viewport, and release cleanly when scrolled away!
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (obsEntries) => {
        const visible = obsEntries.some((e) => e.isIntersecting);
        setInView((prev) => (prev === visible ? prev : visible));
      },
      { rootMargin: "260px 0px" }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const host = hostRef.current;
    if (!host) return;

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
    renderer.toneMappingExposure = 1.1;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);

    type SceneEntry = {
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      group: THREE.Group;
      rotY: number;
      rotX: number;
      lastAspect: number;
    };

    const entries = new Map<string, SceneEntry>();

    const disposeEntries = () => {
      const disposedGeos = new Set<THREE.BufferGeometry>();
      const disposedMats = new Set<THREE.Material>();
      entries.forEach((entry) => {
        entry.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            if (!disposedGeos.has(obj.geometry)) {
              disposedGeos.add(obj.geometry);
              obj.geometry.dispose();
            }
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => {
              if (!disposedMats.has(m)) {
                disposedMats.add(m);
                m.dispose();
              }
            });
          }
        });
      });
      entries.clear();
    };

    const buildEntries = (isDark: boolean) => {
      disposeEntries();

      const primaryHex = isDark ? 0xc8f53c : 0x185c37;
      const accentHex = isDark ? 0x56ccf2 : 0x035e8c;
      const metalHex = isDark ? 0x26313b : 0x3b4954;

      projectIds.forEach((id) => {
        const scene = new THREE.Scene();
        scene.environment = envTarget.texture;

        const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 1.8 : 2.1);
        keyLight.position.set(3.2, 4.2, 4.5);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(accentHex, isDark ? 1.4 : 1.1);
        rimLight.position.set(-3.5, 1.8, -2.5);
        scene.add(rimLight);

        const amb = new THREE.AmbientLight(0xffffff, isDark ? 0.35 : 0.6);
        scene.add(amb);

        const camera = new THREE.PerspectiveCamera(36, 2.2, 0.1, 30);
        camera.position.set(0, 0.35, 3.85);
        camera.lookAt(0, -0.05, 0);

        const group = createProjectSculpture(id, primaryHex, accentHex, metalHex);
        scene.add(group);

        entries.set(id, { scene, camera, group, rotY: 0, rotX: 0, lastAspect: 2.2 });
      });
    };

    let currentIsDark = themeRef.current === "dark";
    buildEntries(currentIsDark);

    // Pre-allocated scratch vector & batch list (zero per-frame heap allocations)
    const scratchScale = new THREE.Vector3(1, 1, 1);
    const visibleDrawList: Array<{
      slot: CardSlotHandle;
      entry: SceneEntry;
      left: number;
      bottom: number;
      width: number;
      height: number;
    }> = [];

    let rafId = 0;
    let simTime = 0;
    let lastTs = performance.now();
    let isPageVisible = !document.hidden;

    const resize = () => {
      const w = Math.max(1, canvas.clientWidth || canvas.parentElement?.clientWidth || 320);
      const h = Math.max(1, canvas.clientHeight || 200);
      renderer.setSize(w, h, false);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const paintSlots = (t: number) => {
      const wantDark = themeRef.current === "dark";
      if (wantDark !== currentIsDark) {
        currentIsDark = wantDark;
        buildEntries(currentIsDark);
      }

      // Phase 1: Batch all DOM layout reads first (zero interleaving)
      const canvasRect = canvas.getBoundingClientRect();
      if (canvasRect.width < 10 || canvasRect.height < 10) return;

      visibleDrawList.length = 0;
      slotsRef.current.forEach((slot) => {
        const el = slot.getElement();
        const entry = entries.get(slot.id);
        if (!el || !entry) return;

        const r = el.getBoundingClientRect();
        if (
          r.width < 10 ||
          r.height < 10 ||
          r.right < canvasRect.left ||
          r.left > canvasRect.right ||
          r.bottom < canvasRect.top ||
          r.top > canvasRect.bottom
        ) {
          return;
        }

        visibleDrawList.push({
          slot,
          entry,
          left: r.left - canvasRect.left,
          bottom: canvasRect.bottom - r.bottom,
          width: r.width,
          height: r.height,
        });
      });

      if (visibleDrawList.length === 0) return;

      // Phase 2: Pure GPU scissor pass
      renderer.setScissorTest(false);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      renderer.setScissorTest(true);

      for (let i = 0; i < visibleDrawList.length; i++) {
        const item = visibleDrawList[i];
        const { slot, entry, left, bottom, width, height } = item;

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);

        const nextAspect = width / height;
        if (Math.abs(nextAspect - entry.lastAspect) > 0.01) {
          entry.lastAspect = nextAspect;
          entry.camera.aspect = nextAspect;
          entry.camera.updateProjectionMatrix();
        }

        const ptr = slot.getPointer();
        const targetRotY = ptr.hovered ? ptr.x * 1.45 : t * 0.42;
        const targetRotX = ptr.hovered ? -ptr.y * 0.72 : Math.sin(t * 0.65) * 0.12;
        const targetScale = ptr.hovered ? 1.08 : 1.0;

        entry.rotY += (targetRotY - entry.rotY) * (ptr.hovered ? 0.14 : 0.05);
        entry.rotX += (targetRotX - entry.rotX) * 0.1;

        entry.group.rotation.y = entry.rotY;
        entry.group.rotation.x = entry.rotX;
        entry.group.position.y = Math.sin(t * 1.1) * 0.06;
        scratchScale.setScalar(targetScale);
        entry.group.scale.lerp(scratchScale, 0.12);

        renderer.render(entry.scene, entry.camera);
      }
    };

    const renderLoop = (ts: number) => {
      rafId = 0;
      if (!isPageVisible) return;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      simTime += prefersReduced ? dt * 0.45 : dt;
      paintSlots(simTime);
      rafId = requestAnimationFrame(renderLoop);
    };

    const ensureRunning = () => {
      if (rafId === 0 && isPageVisible) {
        lastTs = performance.now();
        rafId = requestAnimationFrame(renderLoop);
      }
    };

    const onVisChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) ensureRunning();
      else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisChange);

    ensureRunning();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
      disposeEntries();
      envTarget.dispose();
      roomEnv.dispose();
      pmrem.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      if (canvas.parentNode === host) {
        host.removeChild(canvas);
      }
    };
  }, [inView, projectIds, slotsRef]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[200px] w-full"
    />
  );
}
