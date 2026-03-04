import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { RoboticSceneFallback } from "@/components/hero/RoboticSceneFallback";

const RoboticScene = lazy(() => import("@/components/hero/RoboticScene").then((m) => ({ default: m.RoboticScene })));

export function HomePage() {
  const reducedMotion = useReducedMotion();
  const deviceTier = useDeviceTier();

  const allow3D = !reducedMotion && deviceTier !== "low";

  return (
    <main id="main-content" className="relative min-h-screen text-zinc-900" tabIndex={-1}>
      {/* Hero-only extra depth overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-100/40 via-transparent to-zinc-900/5 z-0"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <motion.div
          className="w-full"
          variants={reducedMotion ? undefined : staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            <motion.div
              variants={reducedMotion ? undefined : staggerItem}
              className="lg:col-span-7 rounded-3xl bg-white/80 p-8 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur-md border border-white/60 sm:p-10"
            >
              <header className="space-y-3">
                <motion.h1
                  className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl"
                  variants={reducedMotion ? undefined : staggerItem}
                >
                  Premium AI Learning Lab
                </motion.h1>
                <motion.p
                  className="max-w-xl text-zinc-600 text-base sm:text-lg"
                  variants={reducedMotion ? undefined : staggerItem}
                >
                  Train interview performance with a robotic research interface: live speech telemetry, focus analytics, and guided practice modules.
                </motion.p>
              </header>

              <motion.div className="mt-8 flex flex-wrap gap-3" variants={reducedMotion ? undefined : staggerItem}>
                <Button href="/practice" variant="primary" size="lg">
                  Start Practice
                </Button>
                <Button href="/learning" variant="secondary" size="lg">
                  Explore Learning Hub
                </Button>
                <Button href="/dashboard" variant="ghost" size="lg">
                  Dashboard
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={reducedMotion ? undefined : staggerItem} className="lg:col-span-5 hidden lg:block">
              {allow3D ? (
                <Suspense fallback={<RoboticSceneFallback className="h-[340px] w-full rounded-3xl" />}>
                  <RoboticScene className="h-[340px] w-full rounded-3xl" />
                </Suspense>
              ) : (
                <RoboticSceneFallback className="h-[340px] w-full rounded-3xl" />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
