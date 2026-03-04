import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/Button";

export function AnalyticsPage() {
  return (
    <AppShell title="Analytics">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card variant="glass" className="p-5">
            <div className="text-sm font-semibold text-zinc-700">Overview</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Stat label="Avg Focus" value="—" />
              <Stat label="Avg Fillers" value="—" />
              <Stat label="Avg Correctness" value="—" />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <EmptyState
            title="No analytics yet"
            description="Analytics will populate after sessions are stored in the backend. Run a practice session to see your metrics."
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            action={
              <Button href="/practice" variant="primary" size="md">
                Start practice
              </Button>
            }
          />
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-zinc-800">{value}</div>
    </div>
  );
}
