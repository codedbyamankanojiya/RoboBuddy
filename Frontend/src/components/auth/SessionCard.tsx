import type { SessionInfo } from "@/services/authService";

type Props = {
    session: SessionInfo;
    onRevoke: () => void;
};

const deviceIcons: Record<string, React.ReactNode> = {
    Desktop: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Mobile: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ),
};

export function SessionCard({ session, onRevoke }: Props) {
    const timeAgo = getTimeAgo(session.lastActive);

    return (
        <div
            className={`flex items-center justify-between rounded-xl p-4 transition-colors ${session.isCurrent
                    ? "bg-violet-500/10 border border-violet-500/20"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${session.isCurrent ? "bg-violet-500/20 text-violet-400" : "bg-white/10 text-white/50"}`}>
                    {deviceIcons[session.device] ?? deviceIcons.Desktop}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                            {session.browser} on {session.device}
                        </span>
                        {session.isCurrent && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                Current
                            </span>
                        )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-white/40">
                        <span>{session.ip}</span>
                        <span>·</span>
                        <span>{timeAgo}</span>
                    </div>
                </div>
            </div>

            {!session.isCurrent && (
                <button
                    onClick={onRevoke}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                >
                    Revoke
                </button>
            )}
        </div>
    );
}

function getTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}
