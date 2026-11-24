"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ExperienceStoryCanvasProps {
  activeIndex: number;
  chapterLabel: string;
  chapterPeriod: string;
}

function createChapterGroup(
  idx: number,
  primaryHex: number,
  accentHex: number,
  amberHex: number,
  slateHex: number
): THREE.Group {
  const g = new THREE.Group();

  const primaryMat = new THREE.MeshStandardMaterial({
    color: primaryHex,
    roughness: 0.24,
    metalness: 0.58,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.22,
    metalness: 0.64,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: amberHex,
    roughness: 0.24,
    metalness: 0.68,
  });
  const slateMat = new THREE.MeshStandardMaterial({
    color: slateHex,
    roughness: 0.36,
    metalness: 0.74,
  });
  const wireMat = new THREE.MeshBasicMaterial({
    color: primaryHex,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });

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
        const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, h + 0.34, 6), slateMat);
        wick.position.set(x, -0.7 + h / 2, 0);
        g.add(wick);
      });
      const arc = new THREE.Mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.85, -0.32, 0.32),
            new THREE.Vector3(-0.1, 0.14, 0.38),
            new THREE.Vector3(0.84, 0.66, 0.28),
          ]),
          20,
          0.032,
          8,
          false
        ),
        primaryMat
      );
      g.add(arc);
      break;
    }
    case 1: {
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), amberMat);
      g.add(core);
      const gyro1 = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.024, 10, 42), primaryMat);
      gyro1.rotation.x = Math.PI * 0.38;
      g.add(gyro1);
      const gyro2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.02, 10, 36), accentMat);
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
        mod.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 0.26, Math.sin(angle) * radius);
        g.add(mod);
      }
      break;
    }
    case 2: {
      const ptsA: THREE.Vector3[] = [];
      const ptsB: THREE.Vector3[] = [];
      for (let i = 0; i <= 14; i++) {
        const a = (i / 14) * Math.PI * 2.4;
        const y = -0.78 + (i / 14) * 1.56;
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
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsA), 28, 0.044, 8, false), primaryMat)
      );
      g.add(
        new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsB), 28, 0.044, 8, false), accentMat)
      );
      const syncHalo = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.02, 8, 36), wireMat);
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
 * Interactive 3D Three.js Storytelling Stage docked in Section 03's sticky rail:
 * - Pauses rAF automatically via IntersectionObserver & visibilitychange when off-screen.
 * - Zero global pointermove getBoundingClientRect thrashing; drag listeners attach on-demand.
 * - MeshStandardMaterial + RoomEnvironment IBL + DPR <= 1.5 + zero preserveDrawingBuffer overhead.
 */
export function ExperienceStoryCanvas({
  activeIndex,
  chapterLabel,
  chapterPeriod,
}: ExperienceStoryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(activeIndex);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const [inView, setInView] = React.useState(false);

  useEffect(() => {
    activeIdxRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Acquire WebGL context strictly while Section 03 is near viewport, and release cleanly when scrolled away!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        setInView((prev) => (prev === visible ? prev : visible));
      },
      { rootMargin: "260px 0px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const container = containerRef.current;
    if (!container) return;

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

    renderer.setPixelRatio(dpr);
    renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);

    const scene = new THREE.Scene();
    scene.environment = envTarget.texture;

    const camera = new THREE.PerspectiveCamera(
      38,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      40
    );
    camera.position.set(0, 0.45, 3.85);
    camera.lookAt(0, -0.05, 0);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
    keyLight.position.set(3, 4.5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x56ccf2, 1.4);
    rimLight.position.set(-3.5, 2, -2.5);
    scene.add(rimLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambLight);

    const baseRingGeo = new THREE.TorusGeometry(1.26, 0.016, 10, 48);
    const baseRingMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === "dark" ? 0xc8f53c : 0x185c37,
      transparent: true,
      opacity: 0.4,
    });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -0.96;
    scene.add(baseRing);

    const stagePivot = new THREE.Group();
    scene.add(stagePivot);

    let chapters: THREE.Group[] = [];

    const disposeChapters = () => {
      const disposedGeos = new Set<THREE.BufferGeometry>();
      const disposedMats = new Set<THREE.Material>();
      chapters.forEach((grp) => {
        stagePivot.remove(grp);
        grp.traverse((obj) => {
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
      chapters = [];
    };

    const buildChapters = (isDark: boolean) => {
      disposeChapters();
      const primaryHex = isDark ? 0xc8f53c : 0x185c37;
      const accentHex = isDark ? 0x56ccf2 : 0x035e8c;
      const amberHex = isDark ? 0xf5b942 : 0x8a5600;
      const slateHex = isDark ? 0x26313b : 0x3b4954;
      baseRingMat.color.setHex(primaryHex);
      rimLight.color.setHex(accentHex);

      chapters = [0, 1, 2, 3, 4].map((idx) => {
        const grp = createChapterGroup(idx, primaryHex, accentHex, amberHex, slateHex);
        const isCurrent = idx === activeIdxRef.current;
        grp.scale.setScalar(isCurrent ? 1 : 0.001);
        grp.visible = isCurrent;
        stagePivot.add(grp);
        return grp;
      });
    };

    let isDarkCurrent = themeRef.current === "dark";
    buildChapters(isDarkCurrent);

    // Scoped pointer handling (zero global DOM rect reads while scrolling page)
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

    const resize = () => {
      if (!container) return;
      cachedRect = null;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rafId = 0;
    let simTime = 0;
    let lastTs = performance.now();
    let isPageVisible = !document.hidden;

    const animate = (ts: number) => {
      rafId = 0;
      if (!isPageVisible) return;

      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      simTime += prefersReduced ? dt * 0.45 : dt;

      const wantDark = themeRef.current === "dark";
      if (wantDark !== isDarkCurrent) {
        isDarkCurrent = wantDark;
        buildChapters(isDarkCurrent);
      }

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
      rafId = requestAnimationFrame(animate);
    };

    const ensureRunning = () => {
      if (rafId === 0 && isPageVisible) {
        lastTs = performance.now();
        rafId = requestAnimationFrame(animate);
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
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointerenter", onContainerEnter);
      container.removeEventListener("pointermove", onContainerMove);
      container.removeEventListener("pointerleave", onContainerLeave);
      window.removeEventListener("pointermove", onWindowDragMove);
      window.removeEventListener("pointerup", onUp);
      disposeChapters();
      baseRingGeo.dispose();
      baseRingMat.dispose();
      envTarget.dispose();
      roomEnv.dispose();
      pmrem.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [inView]);

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
}
