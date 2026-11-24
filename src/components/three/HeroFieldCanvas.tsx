"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

interface HeroFieldCanvasProps {
  paused: boolean;
}

/**
 * Lightweight architectural WebGL wireframe wave & telemetry node lattice
 * behind the Hero section. Strictly GPU-friendly, theme-aware, pointer-reactive,
 * respects Pause toggle & prefers-reduced-motion, and cleanly disposes all GPU resources.
 */
export function HeroFieldCanvas({ paused }: HeroFieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

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
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initW = Math.max(1, container.clientWidth);
    const initH = Math.max(1, container.clientHeight);
    const camera = new THREE.PerspectiveCamera(48, initW / initH, 0.1, 100);
    camera.position.set(0, 1.4, initW < 640 ? 11.5 : 8.2);
    camera.lookAt(0, 0, 0);

    // Architectural procedural blueprint plane (tall enough to cover portrait mobile & landscape desktop)
    const planeGeo = new THREE.PlaneGeometry(22, 26, 36, 40);
    const baseZ = new Float32Array(planeGeo.attributes.position.count);
    for (let i = 0; i < planeGeo.attributes.position.count; i++) {
      baseZ[i] = planeGeo.attributes.position.getZ(i);
    }

    const wireMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === "dark" ? 0xc8f53c : 0x185c37,
      wireframe: true,
      transparent: true,
      opacity: themeRef.current === "dark" ? 0.16 : 0.16,
    });
    const terrain = new THREE.Mesh(planeGeo, wireMat);
    terrain.rotation.x = -Math.PI * 0.22;
    terrain.position.y = 0;
    scene.add(terrain);

    // Floating telemetry nodes (deterministic positions across full portrait & landscape frustum)
    const nodeCount = 96;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const phi = (i * 1.61803398875) % 1;
      const x = (phi - 0.5) * 10.5;
      const y = ((i / nodeCount) - 0.5) * 11.5;
      const z = Math.cos(i * 1.37) * 2.8 - 1.0;
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: themeRef.current === "dark" ? 0x56ccf2 : 0x035e8c,
      size: 0.15,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // Architectural floating gyro rings (responsive X so visible on mobile & desktop)
    const ringGeo = new THREE.TorusGeometry(1.75, 0.032, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === "dark" ? 0xc8f53c : 0x185c37,
      transparent: true,
      opacity: 0.34,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(initW < 640 ? 0.0 : 3.0, 0.2, -1.2);
    scene.add(ring);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.tx = nx * 0.45;
      pointer.ty = ny * 0.28;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      if (!container) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 11.5 : 8.2;
      ring.position.x = w < 640 ? 0.2 : 3.0;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rafId = 0;
    let simTime = 0;
    let lastTs = performance.now();

    const renderFrame = (ts: number) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      // Sync theme colors cleanly
      const isDark = themeRef.current === "dark";
      wireMat.color.setHex(isDark ? 0xc8f53c : 0x185c37);
      wireMat.opacity = isDark ? 0.11 : 0.11;
      pointsMat.color.setHex(isDark ? 0x56ccf2 : 0x035e8c);
      ringMat.color.setHex(isDark ? 0xc8f53c : 0x185c37);

      if (!pausedRef.current) {
        simTime += prefersReduced ? dt * 0.45 : dt;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const posAttr = planeGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const px = posAttr.getX(i);
        const py = posAttr.getY(i);
        const wave =
          Math.sin(px * 0.48 + simTime * 0.9) * 0.28 +
          Math.cos(py * 0.55 - simTime * 0.7) * 0.22;
        posAttr.setZ(i, baseZ[i] + wave);
      }
      posAttr.needsUpdate = true;

      points.rotation.y = simTime * 0.05 + pointer.x * 0.15;
      ring.rotation.x = 0.4 + Math.sin(simTime * 0.4) * 0.2 + pointer.y * 0.3;
      ring.rotation.y = simTime * 0.18 + pointer.x * 0.35;

      camera.position.x = pointer.x * 0.65;
      camera.position.y = 2.2 - pointer.y * 0.35;
      camera.lookAt(0, -0.1, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      planeGeo.dispose();
      wireMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-90"
    />
  );
}
