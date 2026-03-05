import Lenis from "lenis";

export type LenisInstance = Lenis;

export function createLenis(params: { reducedMotion: boolean }) {
  const { reducedMotion } = params;

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || (navigator as any).maxTouchPoints > 0 || window.matchMedia?.("(pointer: coarse)")?.matches);

  // On touch devices, forcing smoothWheel can feel laggy because the browser already has momentum scrolling.
  // Keep scrolling responsive by relying on native touch behavior.
  const enableWheelSmoothing = !reducedMotion && !isTouch;

  const lenis = new Lenis({
    smoothWheel: enableWheelSmoothing,
    syncTouch: true,
    // Smaller lerp = smoother but can feel delayed. Bump it a bit to reduce lag.
    lerp: reducedMotion ? 1 : enableWheelSmoothing ? 0.14 : 0.22,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    // Let Lenis manage RAF timing internally for smoother scheduling.
    autoRaf: true,
  });

  return lenis;
}
