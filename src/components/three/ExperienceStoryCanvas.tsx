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

  const primaryMat = new THREE.MeshPhysicalMaterial({
    color: primaryHex,
    roughness: 0.24,
    metalness: 0.55,
    clearcoat: 0.85,
  });
  const accentMat = new THREE.MeshPhysicalMaterial({
    color: accentHex,
    roughness: 0.22,
    metalness: 0.62,
    clearcoat: 0.85,
  });
  const amberMat = new THREE.MeshPhysicalMaterial({
    color: amberHex,
    roughness: 0.25,
    metalness: 0.68,
    clearcoat: 0.9,
  });
  const slateMat = new THREE.MeshPhysicalMaterial({
    color: slateHex,
    roughness: 0.38,
    metalness: 0.72,
    clearcoat: 0.45,
  });
  const wireMat = new THREE.MeshBasicMaterial({
    color: primaryHex,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });

  switch (idx) {
    case 0: {
      // Destino Copytrade: 3D Candlestick Matrix + Harmonic Trajectory Arc
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
          new THREE.CylinderGeometry(0.018, 0.018, h + 0.34, 8),
          slateMat
        );
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
          28,
          0.032,
          10,
          false
        ),
        primaryMat
      );
      g.add(arc);
      break;
    }
    case 1: {
      // MQL5 Market: 11 Published Algorithmic Modules Orbiting a 5.0★ Golden Core
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), amberMat);
      g.add(core);
      const gyro1 = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.024, 12, 56), primaryMat);
      gyro1.rotation.x = Math.PI * 0.38;
      g.add(gyro1);
      const gyro2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.02, 12, 48), accentMat);
      gyro2.rotation.y = Math.PI * 0.45;
      g.add(gyro2);

      for (let i = 0; i < 11; i++) {
        const angle = (i / 11) * Math.PI * 2;
        const radius = i < 2 ? 0.62 : 1.02;
        const mod = new THREE.Mesh(
          i < 2
            ? new THREE.DodecahedronGeometry(0.11, 0)
            : new THREE.BoxGeometry(0.12, 0.12, 0.12),
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
      // Digital Posyandu: Biometric Health Double-Helix + Offline Sync Ring
      const ptsA: THREE.Vector3[] = [];
      const ptsB: THREE.Vector3[] = [];
      for (let i = 0; i <= 16; i++) {
        const a = (i / 16) * Math.PI * 2.4;
        const y = -0.78 + (i / 16) * 1.56;
        ptsA.push(new THREE.Vector3(Math.cos(a) * 0.46, y, Math.sin(a) * 0.46));
        ptsB.push(new THREE.Vector3(Math.cos(a + Math.PI) * 0.46, y, Math.sin(a + Math.PI) * 0.46));
        if (i % 3 === 0) {
          g.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(new THREE.LineCurve3(ptsA[i], ptsB[i]), 4, 0.022, 8, false),
              slateMat
            )
          );
        }
      }
      g.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsA), 40, 0.044, 10, false),
          primaryMat
        )
      );
      g.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsB), 40, 0.044, 10, false),
          accentMat
        )
      );
      const syncHalo = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.02, 10, 48), wireMat);
      syncHalo.rotation.x = Math.PI / 2;
      g.add(syncHalo);
      break;
    }
    case 3: {
      // PT Antosa Architect: Structural Architectural Elevation & Blueprint Frame
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
      // Bank Mandiri × Rakamin: Chamfered Mobile Chassis + Floating Layered News Cards
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.32, 0.1), slateMat);
      g.add(chassis);
      const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.14, 0.03), accentMat);
      screenFrame.position.z = 0.055;
      g.add(screenFrame);

      const cardY = [0.34, 0.0, -0.34];
      cardY.forEach((y, i) => {
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
 * Interactive 3D Three.js Storytelling Stage docked in Section 03's sticky rail.
 * Dynamically morphs its camera, PBR sculpture, and orbital parallax across all 5 career chapters.
 * Supports pointer hover & drag orbit and cleans up all GPU allocations on unmount.
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

  useEffect(() => {
    activeIdxRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
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

    // Base architectural stage ring
    const baseRingGeo = new THREE.TorusGeometry(1.26, 0.016, 12, 64);
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

    const buildChapters = (isDark: boolean) => {
      chapters.forEach((grp) => {
        stagePivot.remove(grp);
        grp.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      });

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

    // Interactive orbit pointer handling
    const orbit = { dragging: false, lastX: 0, lastY: 0, userY: 0, userX: 0, hoverX: 0, hoverY: 0 };

    const onDown = (e: PointerEvent) => {
      orbit.dragging = true;
      orbit.lastX = e.clientX;
      orbit.lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      orbit.hoverX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.9;
      orbit.hoverY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.55;
      if (orbit.dragging) {
        orbit.userY += (e.clientX - orbit.lastX) * 0.01;
        orbit.userX = Math.max(-0.55, Math.min(0.55, orbit.userX + (e.clientY - orbit.lastY) * 0.008));
        orbit.lastX = e.clientX;
        orbit.lastY = e.clientY;
      }
    };
    const onUp = () => {
      orbit.dragging = false;
    };

    container.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);

    const resize = () => {
      if (!container) return;
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

    const animate = (ts: number) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      simTime += prefersReduced ? dt * 0.45 : dt;

      const wantDark = themeRef.current === "dark";
      if (wantDark !== isDarkCurrent) {
        isDarkCurrent = wantDark;
        buildChapters(isDarkCurrent);
      }

      const targetIdx = activeIdxRef.current;
      chapters.forEach((grp, idx) => {
        const wantScale = idx === targetIdx ? 1 : 0.001;
        const cur = grp.scale.x;
        const next = cur + (wantScale - cur) * 0.14;
        grp.scale.setScalar(next);
        grp.visible = next > 0.02;
        if (grp.visible) {
          grp.position.y = Math.sin(simTime * 1.15 + idx) * 0.06;
        }
      });

      const targetRotY = (prefersReduced ? 0.35 : simTime * 0.35) + orbit.userY + orbit.hoverX * 0.4;
      const targetRotX = orbit.userX + orbit.hoverY * 0.35 + Math.sin(simTime * 0.5) * 0.07;

      stagePivot.rotation.y += (targetRotY - stagePivot.rotation.y) * 0.1;
      stagePivot.rotation.x += (targetRotX - stagePivot.rotation.x) * 0.1;
      baseRing.rotation.z = simTime * 0.18;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      chapters.forEach((grp) => {
        grp.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      });
      baseRingGeo.dispose();
      baseRingMat.dispose();
      envTarget.dispose();
      roomEnv.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
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
}
