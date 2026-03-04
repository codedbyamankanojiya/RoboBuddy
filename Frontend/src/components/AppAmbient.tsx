import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CinematicBackground } from "@/components/CinematicBackground";
import { PageTransition } from "@/components/PageTransition";
import { getBackgroundForPath, getThemeForPath, getTimeOfDay } from "@/config/uiTheme";
import { useDeviceTier, type DeviceTier } from "@/hooks/useDeviceTier";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type AppAmbientValue = {
  pathname: string;
  now: Date;
  theme: ReturnType<typeof getThemeForPath>;
  timeOfDay: ReturnType<typeof getTimeOfDay>;
  background: ReturnType<typeof getBackgroundForPath>;
  deviceTier: DeviceTier;
  reducedMotion: boolean;
};

export const AppAmbientContext = createContext<AppAmbientValue | null>(null);

export function AppAmbient({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [now, setNow] = useState(() => new Date());
  const deviceTier = useDeviceTier();
  const reducedMotion = useReducedMotion();

  // Update time-of-day cheaply (once per minute).
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const bg = useMemo(() => getBackgroundForPath(pathname, now), [pathname, now]);
  const theme = useMemo(() => getThemeForPath(pathname), [pathname]);
  const timeOfDay = useMemo(() => getTimeOfDay(now), [now]);

  const ctx = useMemo(
    () => ({ pathname, now, theme, timeOfDay, background: bg, deviceTier, reducedMotion }) satisfies AppAmbientValue,
    [bg, deviceTier, now, pathname, reducedMotion, theme, timeOfDay],
  );

  return (
    <AppAmbientContext.Provider value={ctx}>
      <CinematicBackground {...bg}>
        <PageTransition>{children}</PageTransition>
      </CinematicBackground>
    </AppAmbientContext.Provider>
  );
}
