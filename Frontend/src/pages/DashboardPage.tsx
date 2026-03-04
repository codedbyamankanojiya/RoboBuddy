import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function DashboardPage() {
  const reducedMotion = useReducedMotion();

  return (
    <AppShell title="Dashboard">
      <motion.div
        className="grid grid-cols-1 gap-5 lg:grid-cols-12"
        variants={reducedMotion ? undefined : staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.section className="lg:col-span-5" variants={reducedMotion ? undefined : staggerItem}>
          <Card variant="glass" className="p-4 sm:p-5">
            <div className="text-sm font-semibold text-zinc-700">My Interview & Progress</div>
            <div className="mt-3 grid grid-cols-1 gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-violet-900 p-5 text-white ring-1 ring-white/10">
                <div className="text-sm opacity-90">Your Interview Persona</div>
                <div className="mt-1 text-lg font-semibold">Confident Communicator</div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs opacity-80">Score</div>
                    <div className="text-3xl font-bold">190</div>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs">Beginner</div>
                </div>
                <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden />
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-zinc-700">Performance Trend</div>
                  <div className="text-xs text-zinc-500">This week</div>
                </div>
                <div className="mt-3 h-32 rounded-xl bg-gradient-to-b from-violet-100 to-white ring-1 ring-zinc-200" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
                  <div className="text-xs text-zinc-500">Speech</div>
                  <div className="mt-1 text-lg font-semibold">Fluency</div>
                  <div className="mt-2 text-sm text-zinc-600">Reduce fillers + pauses</div>
                </div>
                <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
                  <div className="text-xs text-zinc-500">Focus</div>
                  <div className="mt-1 text-lg font-semibold">Eye contact</div>
                  <div className="mt-2 text-sm text-zinc-600">Maintain steady gaze</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        <motion.section className="lg:col-span-4" variants={reducedMotion ? undefined : staggerItem}>
          <Card variant="glass" className="p-4 sm:p-5">
            <div className="text-sm font-semibold text-zinc-700">Today’s Learning Path</div>
            <div className="mt-3 space-y-3">
              <LearningCard title="Mock Interview" desc="Quick test to warm up" cta="Start" href="/practice?mode=mock" />
              <LearningCard title="Viva Prep" desc="Practice structured answers" cta="Continue" href="/practice?mode=viva" />
              <LearningCard title="Challenge" desc="Answer under time pressure" cta="Start" href="/practice?mode=challenge" />
            </div>
          </Card>
        </motion.section>

        <motion.section className="lg:col-span-3" variants={reducedMotion ? undefined : staggerItem}>
          <Card variant="glass" className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-zinc-700">This Week’s Leaderboard</div>
              <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 ring-1 ring-zinc-200 shrink-0">
                This week
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {["Rayna", "Neon", "Brimstone", "Sage", "Phoenix"].map((name, i) => (
                <div key={name} className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-zinc-200">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-zinc-100 text-xs font-semibold ring-1 ring-zinc-200">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{name}</div>
                      <div className="text-xs text-zinc-500">Score</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-zinc-800 shrink-0">{10000 - i * 800}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </AppShell>
  );
}

function LearningCard({
  title,
  desc,
  cta,
  href,
}: {
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <Card href={href} variant="default">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <div className="text-sm font-semibold text-zinc-800">{title}</div>
          <div className="text-xs text-zinc-500">{desc}</div>
          <div className="mt-2 text-xs text-zinc-500">5 mins</div>
        </div>
        <span className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-glow-sm">
          {cta}
        </span>
      </div>
    </Card>
  );
}
