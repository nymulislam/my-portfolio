/**
 * Silky, interruptible requestAnimationFrame smooth scroll engine.
 * Uses distance-scaled easeInOutCubic for natural momentum and respects prefers-reduced-motion.
 */
let activeRafId = null;
let activeCleanup = null;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function smoothScrollTo(targetY, duration, onComplete) {
  if (typeof window === "undefined") return;

  if (activeRafId) {
    cancelAnimationFrame(activeRafId);
    activeRafId = null;
  }
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampedTarget = Math.max(0, Math.min(targetY, maxScroll));
  const startY = window.scrollY;
  const distance = clampedTarget - startY;

  if (prefersReduced || Math.abs(distance) < 2) {
    window.scrollTo({ top: clampedTarget, left: 0, behavior: "instant" });
    onComplete?.(false);
    return;
  }

  // Distance-scaled duration: snappy for short hops (~420ms), graceful for long jumps (~760ms)
  const resolvedDuration =
    typeof duration === "number"
      ? duration
      : Math.round(Math.min(760, Math.max(420, Math.abs(distance) * 0.26 + 300)));

  const startTime = performance.now();

  const finish = (interrupted = false) => {
    if (activeRafId) {
      cancelAnimationFrame(activeRafId);
      activeRafId = null;
    }
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }
    onComplete?.(interrupted);
  };

  const onInterrupt = () => finish(true);

  const cleanup = () => {
    window.removeEventListener("wheel", onInterrupt);
    window.removeEventListener("touchstart", onInterrupt);
    window.removeEventListener("keydown", onKeyInterrupt);
  };

  const onKeyInterrupt = (e) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"].includes(e.code)) {
      finish(true);
    }
  };

  activeCleanup = cleanup;
  window.addEventListener("wheel", onInterrupt, { passive: true, once: true });
  window.addEventListener("touchstart", onInterrupt, { passive: true, once: true });
  window.addEventListener("keydown", onKeyInterrupt, { passive: true });

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / resolvedDuration, 1);
    window.scrollTo({
      top: startY + distance * easeInOutCubic(progress),
      left: 0,
      behavior: "instant",
    });

    if (progress < 1) {
      activeRafId = requestAnimationFrame(step);
    } else {
      finish(false);
    }
  };

  activeRafId = requestAnimationFrame(step);
}

export function smoothScrollToId(id, offset = 88, duration, onComplete) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) {
    onComplete?.();
    return false;
  }
  const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }
  smoothScrollTo(targetY, duration, onComplete);
  return true;
}

export function smoothScrollToTop(duration, onComplete) {
  if (typeof window !== "undefined" && window.history?.replaceState) {
    window.history.replaceState(null, "", window.location.pathname);
  }
  smoothScrollTo(0, duration, onComplete);
}
