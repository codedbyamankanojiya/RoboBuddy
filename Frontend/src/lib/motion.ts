/**
 * Motion design tokens and Framer Motion config.
 * Respect prefers-reduced-motion via useReducedMotion() in components.
 */

export const motionDuration = {
  fast: 0.12,
  normal: 0.18,
  slow: 0.24,
  slower: 0.32,
} as const;

export const motionEasing = {
  smooth: [0.4, 0, 0.2, 1] as const,
  out: [0, 0, 0.2, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const spring = {
  gentle: { type: "spring" as const, stiffness: 300, damping: 30 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 500, damping: 25 },
  robotic: { type: "spring" as const, stiffness: 650, damping: 40, mass: 0.7 },
  soft: { type: "spring" as const, stiffness: 240, damping: 28, mass: 1.1 },
} as const;

export const loop = {
  neuralPulse: {
    scale: [1, 1.03, 1],
    opacity: [0.55, 0.9, 0.55],
    transition: { duration: 2.4, repeat: Infinity, ease: motionEasing.smooth },
  },
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -4, filter: "blur(4px)" },
  transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
} as const;

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: 1,
    },
  },
} as const;

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
} as const;
