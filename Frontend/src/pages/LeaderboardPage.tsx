import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";

export function LeaderboardPage() {
  return (
    <AppShell title="Leaderboard">
      <Card variant="glass" className="p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-zinc-700">This Week</div>
        </div>
        <div className="mt-4 space-y-2">
          {["Rayna", "Neon", "Brimstone", "Sage", "Phoenix"].map((name, i) => (
            <div key={name} className="flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-zinc-100 text-sm font-semibold ring-1 ring-zinc-200">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-800 truncate">{name}</div>
                  <div className="text-xs text-zinc-500">Practice streak</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-zinc-800 shrink-0">{10000 - i * 800}</div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
