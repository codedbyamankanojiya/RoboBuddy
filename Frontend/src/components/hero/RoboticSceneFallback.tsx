export function RoboticSceneFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-3xl bg-white/55 backdrop-blur-md border border-white/60 ring-1 ring-primary/15 shadow-inner-glow" />
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.16),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.16),transparent_65%)]" />
      <div className="absolute inset-0 rounded-3xl opacity-[0.14] bg-[linear-gradient(rgba(6,182,212,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.18)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <svg className="relative h-full w-full" viewBox="0 0 400 260">
        <g fill="none" stroke="rgba(100,116,139,0.55)" strokeWidth="6" strokeLinecap="round">
          <path d="M50 210 H350" />
        </g>
        <g>
          <rect x="128" y="90" width="144" height="98" rx="22" fill="rgba(100,116,139,0.35)" />
          <rect x="150" y="55" width="100" height="54" rx="18" fill="rgba(100,116,139,0.32)" />
          <circle cx="184" cy="78" r="7" fill="rgba(6,182,212,0.8)" />
          <circle cx="216" cy="78" r="7" fill="rgba(6,182,212,0.8)" />
          <path d="M178 100 H222" stroke="rgba(99,102,241,0.55)" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g opacity="0.9">
          {Array.from({ length: 16 }, (_, i) => {
            const x = 70 + (i % 8) * 40;
            const y = 30 + Math.floor(i / 8) * 28;
            return <circle key={i} cx={x} cy={y} r={3.5} fill="rgba(6,182,212,0.45)" />;
          })}
        </g>
      </svg>
    </div>
  );
}
