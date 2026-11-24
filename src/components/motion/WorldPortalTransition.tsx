"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Special Smooth Dimensional Scroll Portal Transition ("Inner World → Outer World")
 * between Section 03 (3D Experience Timeline) and Section 04 (Bang-Motion Stack Theater).
 *
 * Scrubbed smoothly 1:1 via Lenis + Framer Motion spring + Three.js architectural depth corridor:
 * - 0.00–0.38: Inside the obsidian Inner World chamber approaching the dimensional aperture.
 * - 0.38–0.78: Smooth camera dive through the glowing aperture (scale expansion + corridor warp).
 * - 0.78–1.00: Emerging smoothly into the expansive Outer World Cinema Theater with zero stutter.
 */
export function WorldPortalTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [outerReached, setOuterReached] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    mass: 0.3,
  });

  useMotionValueEvent(smoothProgress, "change", (val) => {
    progressRef.current = val;
    setOuterReached((prev) => {
      const next = val >= 0.62;
      return prev === next ? prev : next;
    });
  });

  // Compositor-only smooth DOM portal framing transforms
  const frameScale = useTransform(smoothProgress, [0, 0.55, 0.88, 1], [1, 2.35, 7.5, 11]);
  const innerTitleOpacity = useTransform(smoothProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const innerTitleScale = useTransform(smoothProgress, [0, 0.45], [1, 1.35]);

  const horizonGlowOpacity = useTransform(smoothProgress, [0.35, 0.65, 0.92, 1], [0.15, 0.85, 0.35, 0]);
  const outerRevealOpacity = useTransform(smoothProgress, [0.58, 0.82, 1], [0, 1, 1]);
  const outerRevealY = useTransform(smoothProgress, [0.58, 0.9], [28, 0]);

  // Lightweight Three.js depth tunnel synced directly to smoothProgress (zero scroll stutter)
  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x070a0d, 1);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a0d, 0.042);

    const camera = new THREE.PerspectiveCamera(
      54,
      Math.max(1, host.clientWidth) / Math.max(1, host.clientHeight),
      0.1,
      90
    );
    camera.position.set(0, 0, 12);

    // Architectural concentric portal frames receding along -Z (Inner World corridor)
    const ringCount = 14;
    const rings: THREE.LineSegments[] = [];
    const ringGeos: THREE.EdgesGeometry[] = [];
    const ringMats: THREE.LineBasicMaterial[] = [];

    for (let i = 0; i < ringCount; i++) {
      const box = new THREE.BoxGeometry(7.2, 4.2, 0.08);
      const edges = new THREE.EdgesGeometry(box);
      box.dispose();
      const mat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xc8f53c : 0x56ccf2,
        transparent: true,
        opacity: 0.25 + (i / ringCount) * 0.45,
      });
      const seg = new THREE.LineSegments(edges, mat);
      seg.position.z = 8 - i * 2.4;
      scene.add(seg);
      rings.push(seg);
      ringGeos.push(edges);
      ringMats.push(mat);
    }

    // Outer-World luminous portal aperture ring at far end of tunnel
    const portalGeo = new THREE.RingGeometry(1.4, 1.56, 64);
    const portalMat = new THREE.MeshBasicMaterial({
      color: 0xc8f53c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const portalRing = new THREE.Mesh(portalGeo, portalMat);
    portalRing.position.z = -24;
    scene.add(portalRing);

    // Deterministic outer-world starlight particles
    const starCount = 160;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const angle = i * 2.3999632;
      const rad = 2.6 + ((i * 7) % 100) * 0.14;
      starPos[i * 3] = Math.cos(angle) * rad;
      starPos[i * 3 + 1] = Math.sin(angle) * rad * 0.65;
      starPos[i * 3 + 2] = 6 - (i / starCount) * 44;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0x56ccf2,
      size: 0.09,
      transparent: true,
      opacity: 0.72,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    const resize = () => {
      if (!host) return;
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let rafId = 0;
    const renderFrame = () => {
      const p = progressRef.current;

      // Smoothly fly camera through the inner architectural corridor into the outer expanse
      camera.position.z = 12 - p * 34;
      camera.rotation.z = p * 0.16;

      portalRing.scale.setScalar(1 + Math.pow(p, 2.2) * 5.2);
      portalMat.opacity = Math.max(0.05, 0.88 - Math.max(0, p - 0.68) * 2.4);

      rings.forEach((r, i) => {
        r.rotation.z = (i * 0.025) + p * 0.25;
      });
      stars.rotation.z = -p * 0.22;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      ringGeos.forEach((g) => g.dispose());
      ringMats.forEach((m) => m.dispose());
      portalGeo.dispose();
      portalMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Dimensional portal transition from Experience Timeline to AI-Augmented Stack Theater"
      className="relative h-[165vh] w-full bg-[#070a0d]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#070a0d] text-white">
        {/* Three.js Inner→Outer Corridor WebGL Layer */}
        <div ref={canvasHostRef} aria-hidden="true" className="absolute inset-0" />

        {/* Atmospheric Horizon Veil during Portal Breach */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: horizonGlowOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(200,245,60,0.34) 0%, rgba(86,204,242,0.18) 38%, transparent 72%)",
            }}
          />
        </motion.div>

        {/* Expanding Architectural Aperture Frame */}
        <motion.div
          aria-hidden="true"
          style={{ scale: frameScale }}
          className="pointer-events-none absolute h-[54vh] w-[72vw] max-w-4xl border border-[#c8f53c]/50 shadow-[0_0_80px_rgba(200,245,60,0.18)]"
        />

        {/* Phase 1 Label: Leaving Inner World */}
        <motion.div
          style={{ opacity: innerTitleOpacity, scale: innerTitleScale }}
          className="relative z-10 max-w-2xl px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 border border-white/20 bg-black/55 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8f53c] backdrop-blur-md">
            <span>03 → 04 // INNER WORLD TO OUTER WORLD</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Stepping Beyond Execution Into the AI-Augmented Architecture
          </h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">
            Keep scrolling smoothly to breach the aperture ↓
          </p>
        </motion.div>

        {/* Phase 2 Label: Rendered only once portal approaches Outer World (prevents zero-opacity contrast flags) */}
        {outerReached ? (
          <motion.div
            style={{ opacity: outerRevealOpacity, y: outerRevealY }}
            className="pointer-events-none absolute inset-x-0 bottom-14 z-10 px-6 text-center"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#c8f53c]">
              OUTER WORLD REACHED // INITIALIZING BANG-MOTION EXPLAINER FILM
            </p>
            <p className="mt-1.5 font-heading text-lg font-medium text-zinc-100 sm:text-xl">
              Technical Stack &amp; AI-Augmented Engineering — English Voice Over Ready
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
