"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";
import { attachArchitecturalLights } from "@/components/three/architecturalLights";

interface ExperienceStoryCanvasProps {
  activeIndex: number;
  chapterLabel: string;
  chapterPeriod: string;
}

function createExperienceMaterials(isDark: boolean) {
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
  const amberMat = new THREE.MeshStandardMaterial({
    color: isDark ? 0xf5b942 : 0x8a5600,
    roughness: 0.24,
    metalness: 0.66,
  });
  const slateMat = new THREE.MeshStandardMaterial({
    color: isDark ? 0x26313b : 0x3b4954,
    roughness: 0.36,
    metalness: 0.72,
  });
  const wireMat = new THREE.MeshBasicMaterial({
    color: isDark ? 0xc8f53c : 0x185c37,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });
  return { primaryMat, accentMat, amberMat, slateMat, wireMat };
}

function createChapterGroup(
  idx: number,
  mats: ReturnType<typeof createExperienceMaterials>
): THREE.Group {
  const g = new THREE.Group();
  const { primaryMat, accentMat, amberMat, slateMat, wireMat } = mats;

  switch (idx) {
    case 0: {
      const bars = [0.48, 0.76, 0.58, 0.94, 1.24];
      bars.forEach((h, i) => {
        const x = (i - 2) * 0.36;
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(0.18, h, 0.18),
          i === 4 ? primaryMat : i % 2 === 0 ? accentMat : slateMat
        );
        body.position.set(x, -0.7 + h / 2, 0);
        g.add(body);
        const wick = new THREE.Mesh(
          new THREE.CylinderGeometry(0.018, 0.018, h + 0.34, 6),
          slateMat
        );
        wick.position.set(x, -0.7 + h / 2, 0);
        g.add(wick);
      });
      g.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-0.85, -0.32, 0.32),
              new THREE.Vector3(-0.1, 0.14, 0.38),
              new THREE.Vector3(0.84, 0.66, 0.28),
            ]),
            18,
            0.032,
            8,
            false
          ),
          primaryMat
        )
      );
      break;
    }
    case 1: {
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), amberMat));
      const gyro1 = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.024, 10, 38), primaryMat);
      gyro1.rotation.x = Math.PI * 0.38;
      g.add(gyro1);
      const gyro2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.02, 10, 34), accentMat);
      gyro2.rotation.y = Math.PI * 0.45;
      g.add(gyro2);

      const dodecGeo = new THREE.DodecahedronGeometry(0.11, 0);
      const boxGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      for (let i = 0; i < 11; i++) {
        const angle = (i / 11) * Math.PI * 2;
        const radius = i < 2 ? 0.62 : 1.02;
        const mod = new THREE.Mesh(
          i < 2 ? dodecGeo : boxGeo,
          i < 2 ? primaryMat : i % 2 === 0 ? accentMat : slateMat
        );
        mod.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.26,
          Math.sin(angle) * radius
        );
        g.add(mod);
      }
      break;
    }
    case 2: {
      const ptsA: THREE.Vector3[] = [];
      const ptsB: THREE.Vector3[] = [];
      for (let i = 0; i <= 12; i++) {
        const a = (i / 12) * Math.PI * 2.4;
        const y = -0.78 + (i / 12) * 1.56;
        ptsA.push(new THREE.Vector3(Math.cos(a) * 0.46, y, Math.sin(a) * 0.46));
        ptsB.push(new THREE.Vector3(Math.cos(a + Math.PI) * 0.46, y, Math.sin(a + Math.PI) * 0.46));
        if (i % 3 === 0) {
          g.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(new THREE.LineCurve3(ptsA[i], ptsB[i]), 2, 0.022, 6, false),
              slateMat
            )
          );
        }
      }
      g.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsA), 24, 0.044, 8, false),
          primaryMat
        )
      );
      g.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsB), 24, 0.044, 8, false),
          accentMat
        )
      );
      const syncHalo = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.02, 8, 32), wireMat);
      syncHalo.rotation.x = Math.PI / 2;
      g.add(syncHalo);
      break;
    }
    case 3: {
      const slab1 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.14, 1.05), slateMat);
      slab1.position.y = -0.62;
      g.add(slab1);

      const coreTower = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.12, 0.56), slateMat);
      coreTower.position.set(-0.22, -0.02, -0.08);
      g.add(coreTower);

      const glassWing = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.74, 0.48), accentMat);
      glassWing.position.set(0.32, -0.2, 0.12);
      g.add(glassWing);

      const crown = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.1, 0.72), primaryMat);
      crown.position.set(0.02, 0.56, 0.02);
      g.add(crown);

      const cage = new THREE.Mesh(new THREE.BoxGeometry(1.44, 1.48, 1.18), wireMat);
      cage.position.y = 0.02;
      g.add(cage);
      break;
    }
    default: {
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.32, 0.1), slateMat);
      g.add(chassis);
      const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.14, 0.03), accentMat);
      screenFrame.position.z = 0.055;
      g.add(screenFrame);

      [0.34, 0.0, -0.34].forEach((y, i) => {
        const card = new THREE.Mesh(
          new THREE.BoxGeometry(0.58, 0.24, 0.04),
          i === 0 ? primaryMat : i === 1 ? amberMat : slateMat
        );
        card.position.set(0.12 + i * 0.05, y, 0.2 + i * 0.06);
        g.add(card);
      });
      break;
    }
  }

  return g;
}

/**
 * Direct-Swapchain Persistent 3D Experience Storytelling Diorama:
 * - Initializes ONCE during idle after Hero paint (NEVER destroys/recreates WebGL during scroll!).
 * - Direct WebGL swapchain render (ZERO `ctx2d.drawImage` GPU-sync barrier, ZERO `PMREMGenerator` stall!).
 * - Uses `compileAsync()` and strictly pauses rAF when scrolled off-screen (0% idle CPU/GPU).
 */
export const ExperienceStoryCanvas = React.memo(function ExperienceStoryCanvas({
  activeIndex,
  chapterLabel,
  chapterPeriod,
}: ExperienceStoryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(activeIndex);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const syncThemeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeIdxRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    themeRef.current = theme;
    syncThemeRef.current?.();
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    const init = () => {
      if (cancelled || !container) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: dpr < 1.5,
          alpha: true,
          stencil: false,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      const initW = Math.max(1, container.clientWidth);
      const initH = Math.max(1, container.clientHeight);
      renderer.setPixelRatio(dpr);
      renderer.setSize(initW, initH);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.domElement.className = "pointer-events-none block h-full w-full";
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(renderer.domElement);

      const isDarkInit = themeRef.current === "dark";
      const scene = new THREE.Scene();
      const lights = attachArchitecturalLights(scene, isDarkInit);

      const camera = new THREE.PerspectiveCamera(38, initW / initH, 0.1, 40);
      camera.position.set(0, 0.45, 3.85);
      camera.lookAt(0, -0.05, 0);

      const mats = createExperienceMaterials(isDarkInit);

      const baseRingGeo = new THREE.TorusGeometry(1.26, 0.016, 8, 44);
      const baseRingMat = new THREE.MeshBasicMaterial({
        color: isDarkInit ? 0xc8f53c : 0x185c37,
        transparent: true,
        opacity: 0.4,
      });
      const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = -0.96;
      scene.add(baseRing);

      const stagePivot = new THREE.Group();
      scene.add(stagePivot);

      const chapters = [0, 1, 2, 3, 4].map((idx) => {
        const grp = createChapterGroup(idx, mats);
        const isCurrent = idx === activeIdxRef.current;
        grp.scale.setScalar(isCurrent ? 1 : 0.001);
        grp.visible = isCurrent;
        stagePivot.add(grp);
        return grp;
      });

      const orbit = { dragging: false, lastX: 0, lastY: 0, userY: 0, userX: 0, hoverX: 0, hoverY: 0 };
      let cachedRect: DOMRect | null = null;

      const onWindowDragMove = (e: PointerEvent) => {
        if (!orbit.dragging) return;
        orbit.userY += (e.clientX - orbit.lastX) * 0.01;
        orbit.userX = Math.max(-0.55, Math.min(0.55, orbit.userX + (e.clientY - orbit.lastY) * 0.008));
        orbit.lastX = e.clientX;
        orbit.lastY = e.clientY;
      };

      const onUp = () => {
        orbit.dragging = false;
        window.removeEventListener("pointermove", onWindowDragMove);
        window.removeEventListener("pointerup", onUp);
      };

      const onDown = (e: PointerEvent) => {
        orbit.dragging = true;
        orbit.lastX = e.clientX;
        orbit.lastY = e.clientY;
        window.addEventListener("pointermove", onWindowDragMove, { passive: true });
        window.addEventListener("pointerup", onUp, { once: true });
      };

      const onContainerEnter = () => {
        cachedRect = container.getBoundingClientRect();
      };

      const onContainerMove = (e: PointerEvent) => {
        if (!cachedRect) cachedRect = container.getBoundingClientRect();
        if (cachedRect.width > 0 && cachedRect.height > 0) {
          orbit.hoverX = ((e.clientX - cachedRect.left) / cachedRect.width - 0.5) * 0.9;
          orbit.hoverY = ((e.clientY - cachedRect.top) / cachedRect.height - 0.5) * 0.55;
        }
      };

      const onContainerLeave = () => {
        cachedRect = null;
        orbit.hoverX = 0;
        orbit.hoverY = 0;
      };

      container.addEventListener("pointerdown", onDown);
      container.addEventListener("pointerenter", onContainerEnter, { passive: true });
      container.addEventListener("pointermove", onContainerMove, { passive: true });
      container.addEventListener("pointerleave", onContainerLeave, { passive: true });

      let isInView = false;
      let isPageVisible = !document.hidden;
      let rafId = 0;
      let simTime = 0;
      let lastTs = performance.now();

      const drawOnce = () => {
        const targetIdx = activeIdxRef.current;
        for (let idx = 0; idx < chapters.length; idx++) {
          const grp = chapters[idx];
          const wantScale = idx === targetIdx ? 1 : 0.001;
          const cur = grp.scale.x;
          const next = cur + (wantScale - cur) * 0.14;
          grp.scale.setScalar(next);
          grp.visible = next > 0.02;
          if (grp.visible) {
            grp.position.y = Math.sin(simTime * 1.15 + idx) * 0.06;
          }
        }

        const targetRotY = (prefersReduced ? 0.35 : simTime * 0.35) + orbit.userY + orbit.hoverX * 0.4;
        const targetRotX = orbit.userX + orbit.hoverY * 0.35 + Math.sin(simTime * 0.5) * 0.07;

        stagePivot.rotation.y += (targetRotY - stagePivot.rotation.y) * 0.1;
        stagePivot.rotation.x += (targetRotX - stagePivot.rotation.x) * 0.1;
        baseRing.rotation.z = simTime * 0.18;

        renderer.render(scene, camera);
      };

      const tick = (ts: number) => {
        rafId = 0;
        if (!isInView || !isPageVisible) return;
        const dt = Math.min(0.05, Math.max(0, (ts - lastTs) / 1000));
        lastTs = ts;
        simTime += prefersReduced ? dt * 0.45 : dt;
        drawOnce();
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
        lights.updateTheme(nextDark);
        const p = nextDark ? 0xc8f53c : 0x185c37;
        const a = nextDark ? 0x56ccf2 : 0x035e8c;
        const am = nextDark ? 0xf5b942 : 0x8a5600;
        const s = nextDark ? 0x26313b : 0x3b4954;
        mats.primaryMat.color.setHex(p);
        mats.accentMat.color.setHex(a);
        mats.amberMat.color.setHex(am);
        mats.slateMat.color.setHex(s);
        mats.wireMat.color.setHex(p);
        baseRingMat.color.setHex(p);
        drawOnce();
      };

      const resize = () => {
        if (!container) return;
        cachedRect = null;
        const w = Math.max(1, container.clientWidth);
        const h = Math.max(1, container.clientHeight);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        drawOnce();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      const io = new IntersectionObserver(
        (entries) => {
          isInView = entries.some((e) => e.isIntersecting);
          if (isInView) {
            drawOnce();
            ensureRunning();
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        },
        { rootMargin: "220px 0px" }
      );
      io.observe(container);

      const onVis = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) ensureRunning();
        else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };
      document.addEventListener("visibilitychange", onVis);

      if (typeof renderer.compileAsync === "function") {
        void renderer.compileAsync(scene, camera).then(() => {
          if (!cancelled) drawOnce();
        });
      } else {
        drawOnce();
      }

      cleanupFn = () => {
        syncThemeRef.current = null;
        if (rafId) cancelAnimationFrame(rafId);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        container.removeEventListener("pointerdown", onDown);
        container.removeEventListener("pointerenter", onContainerEnter);
        container.removeEventListener("pointermove", onContainerMove);
        container.removeEventListener("pointerleave", onContainerLeave);
        window.removeEventListener("pointermove", onWindowDragMove);
        window.removeEventListener("pointerup", onUp);

        const geos = new Set<THREE.BufferGeometry>();
        chapters.forEach((grp) => {
          grp.traverse((obj) => {
            if (obj instanceof THREE.Mesh && !geos.has(obj.geometry)) {
              geos.add(obj.geometry);
              obj.geometry.dispose();
            }
          });
        });
        baseRingGeo.dispose();
        baseRingMat.dispose();
        mats.primaryMat.dispose();
        mats.accentMat.dispose();
        mats.amberMat.dispose();
        mats.slateMat.dispose();
        mats.wireMat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timerId = 0;
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(init, { timeout: 850 });
    } else {
      timerId = window.setTimeout(init, 450);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timerId) window.clearTimeout(timerId);
      cleanupFn?.();
    };
  }, []);

  return (
    <div className="border border-border-strong bg-surface/95">
      <div className="flex items-center justify-between border-b border-border bg-surface-elevated/75 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em]">
        <span className="font-bold text-primary">
          3D CHAPTER 0{activeIndex + 1} / 05
        </span>
        <span className="text-muted">Drag to Orbit</span>
      </div>

      <div
        ref={containerRef}
        role="img"
        aria-label={`Interactive 3D storytelling scene for ${chapterLabel} (${chapterPeriod})`}
        className="relative h-56 w-full cursor-grab active:cursor-grabbing"
        style={{
          background:
            "radial-gradient(circle at 50% 58%, var(--primary-soft) 0%, transparent 74%)",
        }}
      />

      <div className="flex items-center justify-between border-t border-border px-3.5 py-2.5 font-mono text-[11px]">
        <span className="truncate font-semibold text-foreground">{chapterLabel}</span>
        <span className="shrink-0 text-primary">{chapterPeriod}</span>
      </div>
    </div>
  );
});
