import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { jobInterviewTopics, type JobInterviewTopic } from "@/pages/practice/practiceCatalog";

type MockFormat = "quick" | "full";

export function MockTestPage() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [format, setFormat] = useState<MockFormat>("quick");

  const mockOptions = useMemo(() => {
    const base = [...jobInterviewTopics];
    const duration = format === "quick" ? 20 : 45;
    return base.map((t) => ({
      ...t,
      duration,
      difficulty: format === "quick" ? ("beginner" as const) : t.difficulty,
    }));
  }, [format]);

  return (
    <AppShell title="Mock Test">
      <motion.div variants={reducedMotion ? undefined : staggerContainer} initial="initial" animate="animate">
        <motion.section variants={reducedMotion ? undefined : staggerItem} className="relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur-md border border-white/50 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-100/60 via-transparent to-indigo-100/40" aria-hidden />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold text-violet-700">Practice · Mock Tests</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">Pick a mock test to start</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                Choose a role-based mock interview. You’ll configure camera/mic and session preferences on the next step.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href="/practice" variant="secondary" size="md">
                Back to Practice
              </Button>
              <Button href="/dashboard" variant="ghost" size="md">
                Dashboard
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section variants={reducedMotion ? undefined : staggerItem} className="mt-5">
          <Card variant="glass" className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-zinc-700">Mock test format</div>
                <div className="mt-1 text-xs text-zinc-500">Choose quick practice or a full-length mock.</div>
              </div>
              <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FormatButton
                  active={format === "quick"}
                  title="Quick Mock"
                  desc="20 minutes · warm-up"
                  onClick={() => setFormat("quick")}
                />
                <FormatButton
                  active={format === "full"}
                  title="Full Mock"
                  desc="45 minutes · realistic"
                  onClick={() => setFormat("full")}
                />
              </div>
            </div>
          </Card>
        </motion.section>

        <motion.section variants={reducedMotion ? undefined : staggerItem} className="mt-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mockOptions.map((t) => (
              <MockCard
                key={t.id}
                topic={t}
                onSelect={() => navigate(`/practice/job-interview/${t.id}`)}
              />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </AppShell>
  );
}

function FormatButton({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-2xl px-4 py-3 text-left ring-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
        active ? "bg-violet-50 ring-primary/25" : "bg-white hover:bg-zinc-50 ring-zinc-200"
      }`}
      aria-pressed={active}
    >
      <div className="text-sm font-semibold text-zinc-900">{title}</div>
      <div className="mt-1 text-xs text-zinc-600">{desc}</div>
    </button>
  );
}

function MockCard({ topic, onSelect }: { topic: JobInterviewTopic; onSelect: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div whileHover={reducedMotion ? undefined : { scale: 1.02, y: -4 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }} className="h-full">
      <Card variant="glass" className="p-0 h-full">
        <button
          type="button"
          onClick={onSelect}
          className="block w-full h-full text-left p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-2xl"
          aria-label={`Start ${topic.title} mock test`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="text-4xl leading-none">{topic.icon}</div>
            <div className="text-right">
              <div className="text-xs text-zinc-500">{topic.duration} min</div>
              <div className="mt-1 inline-flex rounded-full bg-white/70 px-2.5 py-1 text-[11px] text-zinc-700 ring-1 ring-zinc-200">
                {topic.difficulty}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg font-semibold text-zinc-900">{topic.title}</div>
            <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{topic.description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {topic.skills.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-white/70 px-2.5 py-1 text-xs text-zinc-700 ring-1 ring-zinc-200">
                {tag}
              </span>
            ))}
            {topic.skills.length > 4 ? (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 ring-1 ring-zinc-200">+{topic.skills.length - 4}</span>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-zinc-500">Ready when you are</div>
            <motion.div whileHover={reducedMotion ? undefined : { x: 4 }} className="text-sm font-semibold text-violet-700">
              Start
            </motion.div>
          </div>
        </button>
      </Card>
    </motion.div>
  );
}
