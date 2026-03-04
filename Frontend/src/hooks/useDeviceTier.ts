import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type DeviceTier = "low" | "mid" | "high";

function getDeviceTierSnapshot(): DeviceTier {
  if (typeof window === "undefined") return "mid";

  const hc = navigator.hardwareConcurrency ?? 4;
  const dm = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (hc <= 4 || dm <= 4) return "low";
  if (hc <= 8 || dm <= 8) return "mid";
  return "high";
}

export function useDeviceTier(): DeviceTier {
  const reducedMotion = useReducedMotion();
  const [tier, setTier] = useState<DeviceTier>(() => getDeviceTierSnapshot());

  useEffect(() => {
    setTier(getDeviceTierSnapshot());
  }, []);

  return useMemo(() => {
    if (reducedMotion) return "low";
    return tier;
  }, [reducedMotion, tier]);
}
