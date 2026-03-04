import { useCallback, useState } from "react";
import { CameraFeed } from "@/components/CameraFeed";
import { FocusMeter } from "@/components/FocusMeter";
import { SpeechStats } from "@/components/SpeechStats";
import { useSpeechWebSocket } from "@/lib/useSpeechWebSocket";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function PracticePage() {
  const [focusPercent, setFocusPercent] = useState(0);
  const [sessionId] = useState(() => crypto.randomUUID());

  const { status, transcript, metrics, start, stop } = useSpeechWebSocket();

  const running = status === "running";

  const onFocus = useCallback((p: number) => {
    setFocusPercent(p);
  }, []);

  return (
    <AppShell title="Practice">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Card variant="glass" className="px-4 py-3">
          <div className="text-xs text-zinc-500">Session</div>
          <div
            className="text-sm font-semibold text-zinc-800 truncate max-w-[200px] sm:max-w-none"
            title={sessionId}
          >
            {sessionId}
          </div>
        </Card>

        <div className="flex gap-2">
          <Button variant="primary" size="md" onClick={start} disabled={running}>
            Start
          </Button>
          <Button variant="secondary" size="md" onClick={stop} disabled={!running}>
            Stop
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <CameraFeed onFocus={onFocus} />
        </div>
        <div className="space-y-5 lg:col-span-5">
          <FocusMeter value={focusPercent} />
          <SpeechStats status={status} transcript={transcript} metrics={metrics} />
        </div>
      </div>
    </AppShell>
  );
}
