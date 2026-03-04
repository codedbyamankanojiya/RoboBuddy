export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-zinc-200/80 ${className}`}
      aria-hidden
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50">
      <Skeleton className="mb-4 h-4 w-32" />
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-3/4" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 3 }: { cols?: number }) {
  return (
    <div className="flex gap-4 rounded-xl bg-white p-3 ring-1 ring-zinc-200">
      {Array.from({ length: cols }, (_, i) => (
        <Skeleton key={i} className="h-5 flex-1" />
      ))}
    </div>
  );
}
