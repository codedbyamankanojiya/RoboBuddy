type Props = {
  value: number;
};

export function FocusMeter({ value }: Props) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-zinc-700">Focus meter</div>
        <div className="text-sm font-semibold text-zinc-800">{value}%</div>
      </div>
      <div className="h-2 w-full rounded bg-zinc-100 ring-1 ring-zinc-200 overflow-hidden">
        <div
          className="h-2 rounded bg-gradient-to-r from-violet-500 to-indigo-500 transition-[width] duration-normal ease-out"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
