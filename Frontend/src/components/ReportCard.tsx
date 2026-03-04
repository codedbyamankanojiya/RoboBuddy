type Props = {
  report: {
    finalScore: number;
    feedback: string;
  };
};

export function ReportCard({ report }: Props) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-zinc-700">Coaching report</div>
        <div className="text-sm font-semibold text-zinc-800">{report.finalScore}</div>
      </div>
      <div className="text-sm text-zinc-700">{report.feedback}</div>
    </div>
  );
}
