/**
 * Silky, interruptible requestAnimationFrame smooth scroll engine.
 * Respects prefers-reduced-motion and yields immediately on user wheel/touch input.
 */
let activeRafId = null;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function smoothScrollTo(targetY, duration = 680) {
  if (typeof window === "undefined") return;

  if (activeRafId) {
    cancelAnimationFrame(activeRafId);
    activeRafId = null;
  }

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clampedTarget = Math.max(
    0,
    Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight)
  );

  if (prefersReduced || duration <= 0) {
    window.scrollTo(0, clampedTarget);
    return;
  }

  const startY = window.scrollY;
  const distance = clampedTarget - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  const cancelOnUserInput = () => {
    if (activeRafId) {
      cancelAnimationFrame(activeRafId);
      activeRafId = null;
    }
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("wheel", cancelOnUserInput);
    window.removeEventListener("touchstart", cancelOnUserInput);
  };

  window.addEventListener("wheel", cancelOnUserInput, { passive: true, once: true });
  window.addEventListener("touchstart", cancelOnUserInput, { passive: true, once: true });

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));

    if (progress < 1) {
      activeRafId = requestAnimationFrame(step);
    } else {
      activeRafId = null;
      cleanup();
    }
  };

  activeRafId = requestAnimationFrame(step);
}

export function smoothScrollToId(id, offset = 84, duration = 700) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
  smoothScrollTo(targetY, duration);
  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }
  return true;
}

export function smoothScrollToTop(duration = 620) {
  smoothScrollTo(0, duration);
  if (typeof window !== "undefined" && window.history?.replaceState) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}
