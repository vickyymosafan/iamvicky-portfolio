/**
 * Main-thread yielding & scroll-idle scheduling helpers following Modern Web Guidance
 * (`performance` scheduler.yield + `defer-work-until-scroll-ends` scrollend).
 */

type SchedulerWithYield = {
  yield?: () => Promise<void>;
};

export function yieldToMain(): Promise<void> {
  if (typeof window !== "undefined") {
    const sched = (window as Window & { scheduler?: SchedulerWithYield }).scheduler;
    if (sched && typeof sched.yield === "function") {
      return sched.yield();
    }
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

let isScrollingNow = false;
let scrollIdleTimer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;
const idleWaiters = new Set<() => void>();

function flushIdleWaiters() {
  isScrollingNow = false;
  if (scrollIdleTimer !== null) {
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = null;
  }
  if (idleWaiters.size === 0) return;
  const pending = Array.from(idleWaiters);
  idleWaiters.clear();
  for (const fn of pending) fn();
}

function ensureScrollTracker() {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;

  const hasScrollEnd = "onscrollend" in window;

  const markScrolling = () => {
    isScrollingNow = true;
    if (scrollIdleTimer !== null) clearTimeout(scrollIdleTimer);
    // Safety fallback even when scrollend is supported (e.g. Lenis wheel without native scrollend yet)
    scrollIdleTimer = setTimeout(flushIdleWaiters, hasScrollEnd ? 260 : 180);
  };

  window.addEventListener("wheel", markScrolling, { passive: true });
  window.addEventListener("scroll", markScrolling, { passive: true });
  window.addEventListener("touchmove", markScrolling, { passive: true });
  if (hasScrollEnd) {
    window.addEventListener("scrollend", flushIdleWaiters, { passive: true });
  }
}

/**
 * Schedules `cb` after `delayMs` ONLY when the user is NOT actively scrolling.
 * If a scroll gesture is in progress when the timer/idle fires, waits until `scrollend`.
 */
export function scheduleWhenScrollIdle(cb: () => void, delayMs = 0): () => void {
  ensureScrollTracker();
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let idleId = 0;

  const runIfSafe = () => {
    if (cancelled) return;
    if (isScrollingNow) {
      idleWaiters.add(runIfSafe);
      return;
    }
    cb();
  };

  const kick = () => {
    if (cancelled) return;
    const win = window as Window & {
      requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(runIfSafe, { timeout: 600 });
    } else {
      runIfSafe();
    }
  };

  if (delayMs > 0) {
    timer = setTimeout(kick, delayMs);
  } else {
    kick();
  }

  return () => {
    cancelled = true;
    idleWaiters.delete(runIfSafe);
    if (timer !== null) clearTimeout(timer);
    if (idleId) {
      const win = window as Window & { cancelIdleCallback?: (id: number) => void };
      win.cancelIdleCallback?.(idleId);
    }
  };
}
