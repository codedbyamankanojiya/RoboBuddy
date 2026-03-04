import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function LearningPage() {
  return (
    <AppShell title="Learning Hub">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <Card variant="glass" className="p-5">
            <div className="text-sm font-semibold text-zinc-700">Recommended Modules</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <ModuleCard title="Behavioral" desc="STAR structure + clarity" href="/practice?mode=behavioral" />
              <ModuleCard title="System Design" desc="High-level design drills" href="/practice?mode=system" />
              <ModuleCard title="DSA" desc="Explain solutions clearly" href="/practice?mode=dsa" />
              <ModuleCard title="Resume Walkthrough" desc="Tell your story" href="/practice?mode=resume" />
            </div>
          </Card>
        </section>

        <section className="lg:col-span-4">
          <Card variant="glass" className="p-5">
            <div className="text-sm font-semibold text-zinc-700">Quick Actions</div>
            <div className="mt-4 space-y-3">
              <Button href="/practice?mode=mock" variant="primary" size="lg" className="w-full">
                Start Mock Interview
              </Button>
              <Button href="/dashboard" variant="secondary" size="lg" className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function ModuleCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Card href={href} variant="default">
      <div className="p-4">
        <div className="text-sm font-semibold text-zinc-800">{title}</div>
        <div className="mt-1 text-xs text-zinc-500">{desc}</div>
        <div className="mt-3 text-xs font-semibold text-violet-700">Open</div>
      </div>
    </Card>
  );
}
