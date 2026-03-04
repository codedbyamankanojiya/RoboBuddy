type SpeechStatus = "idle" | "connecting" | "running" | "closed" | "error";

type Props = {
  status: SpeechStatus;
  transcript: string;
  metrics: { filler_count: number; pause_seconds: number; total_words: number };
};

export function SpeechStats({ status, transcript, metrics }: Props) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-zinc-700">Speech</div>
        <div className="text-xs text-zinc-500">{status}</div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
          <div className="text-xs text-zinc-500">Fillers</div>
          <div className="text-lg font-semibold text-zinc-800">{metrics.filler_count}</div>
        </div>
        <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
          <div className="text-xs text-zinc-500">Pauses</div>
          <div className="text-lg font-semibold text-zinc-800">{metrics.pause_seconds}s</div>
        </div>
        <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
          <div className="text-xs text-zinc-500">Words</div>
          <div className="text-lg font-semibold text-zinc-800">{metrics.total_words}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-zinc-500">Live transcript</div>
        <div className="mt-2 min-h-20 rounded-2xl bg-white p-3 text-sm text-zinc-800 ring-1 ring-zinc-200">
          {transcript || "..."}
        </div>
      </div>
    </div>
  );
}
