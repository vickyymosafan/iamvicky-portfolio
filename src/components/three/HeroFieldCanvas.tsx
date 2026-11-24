"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

interface HeroFieldCanvasProps {
  paused: boolean;
}

const WAVE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  void main() {
    vec3 pos = position;
    pos.z += sin(pos.x * 0.48 + uTime * 0.9) * 0.28 + cos(pos.y * 0.55 - uTime * 0.7) * 0.22;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const WAVE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

/**
 * Persistent Zero-Freeze GPU-Shader WebGL Field behind Hero:
 * - Initializes ONCE during idle time after Hero LCP paints and NEVER destroys/recreates WebGL during scroll!
 * - Strictly pauses/resumes rAF via IntersectionObserver & visibilitychange (0% GPU/CPU when scrolled past Hero).
 * - Pre-compiles shaders via `compileAsync()` and uses a pure GLSL vertex shader wave (0ms CPU loop).
 */
export function HeroFieldCanvas({ paused }: HeroFieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const syncThemeRef = useRef<(() => void) | null>(null);
  const resumeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) resumeRef.current?.();
  }, [paused]);

  useEffect(() => {
    themeRef.current = theme;
    syncThemeRef.current?.();
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    const initWebGL = () => {
      if (cancelled || !container) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      renderer.setPixelRatio(dpr);
      const initW = Math.max(1, container.clientWidth);
      const initH = Math.max(1, container.clientHeight);
      renderer.setSize(initW, initH);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, initW / initH, 0.1, 100);
      camera.position.set(0, 1.4, initW < 640 ? 11.5 : 8.2);
      camera.lookAt(0, 0, 0);

      const planeGeo = new THREE.PlaneGeometry(22, 26, 26, 28);
      const wireMat = new THREE.ShaderMaterial({
        vertexShader: WAVE_VERTEX_SHADER,
        fragmentShader: WAVE_FRAGMENT_SHADER,
        wireframe: true,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(themeRef.current === "dark" ? 0xc8f53c : 0x185c37) },
          uOpacity: { value: 0.12 },
        },
      });
      const terrain = new THREE.Mesh(planeGeo, wireMat);
      terrain.rotation.x = -Math.PI * 0.22;
      scene.add(terrain);

      const nodeCount = 80;
      const nodePositions = new Float32Array(nodeCount * 3);
      for (let i = 0; i < nodeCount; i++) {
        const phi = (i * 1.61803398875) % 1;
        nodePositions[i * 3] = (phi - 0.5) * 10.5;
        nodePositions[i * 3 + 1] = (i / nodeCount - 0.5) * 11.5;
        nodePositions[i * 3 + 2] = Math.cos(i * 1.37) * 2.8 - 1.0;
      }
      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
      const pointsMat = new THREE.PointsMaterial({
        color: themeRef.current === "dark" ? 0x56ccf2 : 0x035e8c,
        size: 0.15,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(pointsGeo, pointsMat);
      scene.add(points);

      const ringGeo = new THREE.TorusGeometry(1.75, 0.03, 10, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: themeRef.current === "dark" ? 0xc8f53c : 0x185c37,
        transparent: true,
        opacity: 0.32,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(initW < 640 ? 0.0 : 3.0, 0.2, -1.2);
      scene.add(ring);

      let isInView = true;
      let isPageVisible = !document.hidden;
      let rafId = 0;
      let simTime = 0;
      let lastTs = performance.now();
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

      const drawOnce = () => {
        wireMat.uniforms.uTime.value = simTime;
        points.rotation.y = simTime * 0.05 + pointer.x * 0.15;
        ring.rotation.x = 0.4 + Math.sin(simTime * 0.4) * 0.2 + pointer.y * 0.3;
        ring.rotation.y = simTime * 0.18 + pointer.x * 0.35;
        camera.position.x = pointer.x * 0.65;
        camera.position.y = 2.2 - pointer.y * 0.35;
        camera.lookAt(0, -0.1, 0);
        renderer.render(scene, camera);
      };

      const renderFrame = (ts: number) => {
        rafId = 0;
        if (!isInView || !isPageVisible) return;

        const dt = Math.min(0.05, (ts - lastTs) / 1000);
        lastTs = ts;

        if (!pausedRef.current) {
          simTime += prefersReduced ? dt * 0.4 : dt;
        }

        const dx = pointer.tx - pointer.x;
        const dy = pointer.ty - pointer.y;
        pointer.x += dx * 0.06;
        pointer.y += dy * 0.06;

        drawOnce();

        if (pausedRef.current && Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return;
        rafId = requestAnimationFrame(renderFrame);
      };

      const ensureRunning = () => {
        if (rafId === 0 && isInView && isPageVisible) {
          lastTs = performance.now();
          rafId = requestAnimationFrame(renderFrame);
        }
      };

      resumeRef.current = ensureRunning;

      syncThemeRef.current = () => {
        const isDark = themeRef.current === "dark";
        wireMat.uniforms.uColor.value.setHex(isDark ? 0xc8f53c : 0x185c37);
        pointsMat.color.setHex(isDark ? 0x56ccf2 : 0x035e8c);
        ringMat.color.setHex(isDark ? 0xc8f53c : 0x185c37);
        drawOnce();
      };

      const onPointerMove = (e: PointerEvent) => {
        if (pausedRef.current || !isInView) return;
        pointer.tx = ((e.clientX / window.innerWidth) * 2 - 1) * 0.45;
        pointer.ty = ((e.clientY / window.innerHeight) * 2 - 1) * 0.28;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      const onVisChange = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) ensureRunning();
        else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };
      document.addEventListener("visibilitychange", onVisChange);

      // Pause/resume rAF strictly via IntersectionObserver — NEVER destroys WebGL during scroll!
      const io = new IntersectionObserver(
        (entries) => {
          isInView = entries.some((e) => e.isIntersecting);
          if (isInView) {
            ensureRunning();
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        },
        { rootMargin: "120px 0px" }
      );
      io.observe(container);

      const resize = () => {
        if (!container) return;
        const w = Math.max(1, container.clientWidth);
        const h = Math.max(1, container.clientHeight);
        camera.aspect = w / h;
        camera.position.z = w < 640 ? 11.5 : 8.2;
        ring.position.x = w < 640 ? 0.2 : 3.0;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (isInView) drawOnce();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      const startRendering = () => {
        if (cancelled) return;
        drawOnce();
        ensureRunning();
      };

      if (typeof renderer.compileAsync === "function") {
        void renderer.compileAsync(scene, camera).then(startRendering);
      } else {
        startRendering();
      }

      cleanupFn = () => {
        syncThemeRef.current = null;
        resumeRef.current = null;
        if (rafId) cancelAnimationFrame(rafId);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisChange);
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
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timeoutId = 0;
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(initWebGL, { timeout: 180 });
    } else {
      timeoutId = window.setTimeout(initWebGL, 40);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      cleanupFn?.();
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
