"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, type LucideIcon } from "lucide-react";

/* ============================================================================
   1. Pointer-Origin GPU Ripple Effect (Micro-Interaction)
   ============================================================================ */

interface RippleWave {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function useRipple() {
  const shouldReduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<RippleWave[]>([]);
  const nextIdRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, []);

  const spawnAt = useCallback(
    (el: HTMLElement, clientX?: number, clientY?: number) => {
      if (shouldReduceMotion) return;
      const rect = el.getBoundingClientRect();
      const x = typeof clientX === "number" ? clientX - rect.left : rect.width / 2;
      const y = typeof clientY === "number" ? clientY - rect.top : rect.height / 2;
      const size = Math.max(48, Math.ceil(Math.hypot(rect.width, rect.height) * 2.05));
      const id = ++nextIdRef.current;

      setRipples((prev) => [...prev.slice(-3), { id, x, y, size }]);
      const timer = window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== id));
      }, 620);
      timersRef.current.push(timer);
    },
    [shouldReduceMotion]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      spawnAt(e.currentTarget, e.clientX, e.clientY);
    },
    [spawnAt]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        spawnAt(e.currentTarget);
      }
    },
    [spawnAt]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { ripples, onPointerDown, onKeyDown, removeRipple };
}

export function RippleLayer({
  ripples,
  onDone,
}: {
  ripples: RippleWave[];
  onDone: (id: number) => void;
}) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      {ripples.map((wave) => (
        <span
          key={wave.id}
          onAnimationEnd={() => onDone(wave.id)}
          className="ripple-wave"
          style={{
            left: `${wave.x}px`,
            top: `${wave.y}px`,
            width: `${wave.size}px`,
            height: `${wave.size}px`,
          }}
        />
      ))}
    </span>
  );
}

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RippleButton({
  children,
  className,
  onPointerDown: userPointerDown,
  onKeyDown: userKeyDown,
  type = "button",
  ...rest
}: RippleButtonProps) {
  const { ripples, onPointerDown, onKeyDown, removeRipple } = useRipple();

  return (
    <button
      type={type}
      {...rest}
      onPointerDown={(e) => {
        onPointerDown(e);
        userPointerDown?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown(e);
        userKeyDown?.(e);
      }}
      className={`relative ${className ?? ""}`}
    >
      <RippleLayer ripples={ripples} onDone={removeRipple} />
      {children}
    </button>
  );
}

type RippleLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function RippleLink({
  children,
  className,
  onPointerDown: userPointerDown,
  onKeyDown: userKeyDown,
  ...rest
}: RippleLinkProps) {
  const { ripples, onPointerDown, onKeyDown, removeRipple } = useRipple();

  return (
    <a
      {...rest}
      onPointerDown={(e) => {
        onPointerDown(e);
        userPointerDown?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown(e);
        userKeyDown?.(e);
      }}
      className={`relative ${className ?? ""}`}
    >
      <RippleLayer ripples={ripples} onDone={removeRipple} />
      {children}
    </a>
  );
}

/* ============================================================================
   2. Pointer-Tracking Studio Spotlight Hook (interactive-content-reveal)
   Caches bounding rect via ResizeObserver so pointermove performs 0 layout reads.
   ============================================================================ */

export function usePointerSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldReduceMotion) return;

    const updateRect = () => {
      rectRef.current = el.getBoundingClientRect();
    };
    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const onPointerEnter = useCallback(() => {
    if (shouldReduceMotion || !ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  }, [shouldReduceMotion]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (shouldReduceMotion || e.pointerType === "touch") return;
      const el = ref.current;
      if (!el) return;
      const rect = rectRef.current ?? el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x.toFixed(1)}%`);
      el.style.setProperty("--mouse-y", `${y.toFixed(1)}%`);
    },
    [shouldReduceMotion]
  );

  return { ref, onPointerEnter, onPointerMove };
}

export function SpotlightOverlay() {
  return <span aria-hidden="true" className="studio-spotlight-layer" />;
}

interface HoverSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function HoverSpotlightCard({
  children,
  className,
  onPointerEnter: userEnter,
  onPointerMove: userMove,
  ...rest
}: HoverSpotlightCardProps) {
  const { ref, onPointerEnter, onPointerMove } = usePointerSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      {...rest}
      onPointerEnter={(e) => {
        onPointerEnter();
        userEnter?.(e);
      }}
      onPointerMove={(e) => {
        onPointerMove(e);
        userMove?.(e);
      }}
      className={`studio-spotlight-card ${className ?? ""}`}
    >
      <SpotlightOverlay />
      {children}
    </div>
  );
}

/* ============================================================================
   3. Infinite Marquee / Ticker (WCAG 2.2.2 Visible Pause/Play Control)
   ============================================================================ */

export interface MarqueeItem {
  label: string;
  meta?: string;
  icon?: LucideIcon;
}

interface InfiniteMarqueeProps {
  items: readonly MarqueeItem[];
  label: string;
  direction?: "left" | "right";
  durationSeconds?: number;
  className?: string;
}

export function InfiniteMarquee({
  items,
  label,
  direction = "left",
  durationSeconds = 36,
  className,
}: InfiniteMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const renderChip = (item: MarqueeItem, key: string) => {
    const Icon = item.icon;
    return (
      <span
        key={key}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface/90 px-3.5 py-1.5 font-mono text-xs text-foreground shadow-xs"
      >
        {Icon ? (
          <Icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        ) : (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
        )}
        <span className="font-semibold">{item.label}</span>
        {item.meta ? (
          <span className="text-[11px] text-muted">{item.meta}</span>
        ) : null}
      </span>
    );
  };

  return (
    <div
      role="region"
      aria-label={label}
      className={`relative flex items-center gap-3 rounded-2xl border border-border bg-surface/75 px-3 py-2.5 backdrop-blur-xs sm:px-4 ${className ?? ""}`}
    >
      <div
        data-paused={paused || shouldReduceMotion ? "true" : "false"}
        className="marquee-viewport min-w-0 flex-1 py-0.5"
      >
        <div
          className="marquee-track"
          data-direction={direction}
          style={
            {
              "--marquee-duration": `${durationSeconds}s`,
            } as React.CSSProperties
          }
        >
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            {items.map((item, idx) => renderChip(item, `a-${item.label}-${idx}`))}
          </div>
          <div
            aria-hidden="true"
            className="marquee-duplicate flex shrink-0 items-center gap-2.5 sm:gap-3"
          >
            {items.map((item, idx) => renderChip(item, `b-${item.label}-${idx}`))}
          </div>
        </div>
      </div>

      {!shouldReduceMotion ? (
        <RippleButton
          onClick={() => setPaused((prev) => !prev)}
          aria-label={paused ? `Play ${label}` : `Pause ${label}`}
          className="inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated px-3 py-1 font-mono text-[11px] font-semibold text-foreground hover:border-primary hover:text-primary"
        >
          {paused ? (
            <>
              <Play className="h-3 w-3 fill-current text-primary" aria-hidden="true" />
              <span className="hidden sm:inline">Play</span>
            </>
          ) : (
            <>
              <Pause className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="hidden sm:inline">Pause</span>
            </>
          )}
        </RippleButton>
      ) : null}
    </div>
  );
}

/* ============================================================================
   4. Accessible Zero-CLS Typewriter Effect (Rotating & One-Shot Terminal)
   ============================================================================ */

interface TypewriterTextProps {
  phrases: readonly string[];
  prefix?: string;
  className?: string;
}

export function TypewriterText({ phrases, prefix, className }: TypewriterTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(() => phrases[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  const currentPhrase = phrases[phraseIndex] ?? "";

  useEffect(() => {
    if (shouldReduceMotion || paused || phrases.length <= 1) return;

    let delay = deleting ? 26 : 44;
    if (!deleting && charCount === currentPhrase.length) {
      delay = 2400;
    } else if (deleting && charCount === 0) {
      delay = 320;
    }

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (charCount < currentPhrase.length) {
          setCharCount((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else if (charCount > 0) {
        setCharCount((c) => c - 1);
      } else {
        setDeleting(false);
        setPhraseIndex((idx) => (idx + 1) % phrases.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, currentPhrase.length, deleting, paused, phrases.length, shouldReduceMotion]);

  const visibleText = shouldReduceMotion
    ? phrases[0] ?? ""
    : currentPhrase.slice(0, charCount);

  return (
    <div
      role="note"
      aria-label={`Current engineering focus: ${phrases.join(", ")}`}
      className={`inline-flex min-h-10 max-w-full flex-wrap items-center gap-2 rounded-2xl border border-border-strong bg-surface/90 px-3.5 py-1.5 font-mono text-xs text-foreground ${className ?? ""}`}
    >
      {prefix ? (
        <span className="shrink-0 font-bold text-primary">{prefix}</span>
      ) : null}
      <span
        aria-live="off"
        title={phrases.join(" · ")}
        className="min-w-0 truncate text-ink-secondary"
      >
        <span>{visibleText}</span>
        {!shouldReduceMotion && !paused ? (
          <span aria-hidden="true" className="typewriter-caret ml-1" />
        ) : null}
      </span>
      {!shouldReduceMotion && phrases.length > 1 ? (
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          aria-label={paused ? "Play live role ticker" : "Pause live role ticker"}
          className="ml-auto inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface-elevated text-muted hover:border-primary hover:text-primary"
        >
          {paused ? (
            <Play className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
          ) : (
            <Pause className="h-2.5 w-2.5" aria-hidden="true" />
          )}
        </button>
      ) : null}
    </div>
  );
}

export function OneShotTypewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [state, setState] = useState<{ source: string; count: number }>({
    source: text,
    count: text.length,
  });

  const activeCount = state.source === text ? state.count : shouldReduceMotion ? text.length : 0;

  useEffect(() => {
    if (shouldReduceMotion) return;

    let current = 0;
    const interval = window.setInterval(() => {
      current += 2;
      if (current >= text.length) {
        setState({ source: text, count: text.length });
        window.clearInterval(interval);
      } else {
        setState({ source: text, count: current });
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [text, shouldReduceMotion]);

  const rendered = shouldReduceMotion ? text : text.slice(0, activeCount);
  const done = rendered.length >= text.length;

  return (
    <span aria-label={text} title={text} className={className}>
      <span>
        {rendered}
        {!shouldReduceMotion && !done ? (
          <span aria-hidden="true" className="typewriter-caret ml-0.5" />
        ) : null}
      </span>
    </span>
  );
}
