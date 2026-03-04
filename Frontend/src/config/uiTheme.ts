import type { CinematicBackgroundProps, CinematicTheme, TimeOfDay } from "@/components/CinematicBackground";

export function getTimeOfDay(now: Date = new Date()): TimeOfDay {
  const h = now.getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

export function getThemeForPath(pathname: string): CinematicTheme {
  if (pathname.startsWith("/practice")) return "practice";
  if (pathname.startsWith("/analytics")) return "analytics";
  if (pathname.startsWith("/community")) return "community";
  return "study";
}

export function getBackgroundForPath(pathname: string, now: Date = new Date()): CinematicBackgroundProps {
  const theme = getThemeForPath(pathname);
  const timeOfDay = getTimeOfDay(now);

  const base: Pick<
    CinematicBackgroundProps,
    "theme" | "timeOfDay" | "robotDensity" | "neuralActivity" | "particleIntensity"
  > = {
    theme,
    timeOfDay,
    robotDensity: 0.5,
    neuralActivity: 0.55,
    particleIntensity: 0.45,
  };

  if (theme === "practice") {
    return { ...base, robotDensity: 0.85, neuralActivity: 0.6, particleIntensity: 0.65 };
  }
  if (theme === "analytics") {
    return { ...base, robotDensity: 0.55, neuralActivity: 0.92, particleIntensity: 0.55 };
  }
  if (theme === "community") {
    return { ...base, robotDensity: 0.45, neuralActivity: 0.6, particleIntensity: 0.7 };
  }

  return base;
}
