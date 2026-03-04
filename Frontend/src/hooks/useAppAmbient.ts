import { useContext } from "react";
import { AppAmbientContext } from "@/components/AppAmbient";

export function useAppAmbient() {
  const v = useContext(AppAmbientContext);
  if (v === null) {
    throw new Error("useAppAmbient must be used within <AppAmbient>.");
  }
  return v;
}
