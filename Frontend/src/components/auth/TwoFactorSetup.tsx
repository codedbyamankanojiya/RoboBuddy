import { useState } from "react";

type Method = "totp" | "sms" | "email";

type Props = {
    enabled: boolean;
    onToggle: (method: Method) => void;
};

export function TwoFactorSetup({ enabled, onToggle }: Props) {
    const [method, setMethod] = useState<Method>("totp");
    const [backupCodes] = useState(() =>
        Array.from({ length: 8 }, () =>
            Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
        ),
    );
    const [showBackup, setShowBackup] = useState(false);

    const methods: { key: Method; title: string; desc: string; icon: React.ReactNode }[] = [
        {
            key: "totp",
            title: "Authenticator App",
            desc: "Google Authenticator or similar",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            key: "sms",
            title: "SMS",
            desc: "Receive codes via text",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            key: "email",
            title: "Email",
            desc: "Receive codes via email",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-semibold text-zinc-800">Two-Factor Authentication</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Add an extra layer of security</p>
                </div>
                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${enabled ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                        }`}
                >
                    {enabled ? "Enabled" : "Disabled"}
                </span>
            </div>

            {/* Method cards */}
            <div className="grid grid-cols-3 gap-3">
                {methods.map((m) => (
                    <button
                        key={m.key}
                        type="button"
                        onClick={() => setMethod(m.key)}
                        className={`rounded-xl p-3 text-center border transition-all ${method === m.key
                                ? "border-violet-300 bg-violet-50 shadow-sm"
                                : "border-zinc-200 bg-white hover:border-violet-200 hover:bg-violet-50/50"
                            }`}
                    >
                        <div className={`mx-auto mb-1.5 ${method === m.key ? "text-violet-600" : "text-zinc-400"}`}>
                            {m.icon}
                        </div>
                        <div className="text-xs font-semibold text-zinc-700">{m.title}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{m.desc}</div>
                    </button>
                ))}
            </div>

            {/* Enable / Disable */}
            <button
                type="button"
                onClick={() => onToggle(method)}
                className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${enabled
                        ? "bg-red-50 text-red-600 hover:bg-red-100 ring-1 ring-red-200"
                        : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg"
                    }`}
            >
                {enabled ? "Disable 2FA" : `Enable ${methods.find((m) => m.key === method)?.title ?? "2FA"}`}
            </button>

            {/* Backup codes */}
            {enabled && (
                <div>
                    <button
                        type="button"
                        onClick={() => setShowBackup(!showBackup)}
                        className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                    >
                        {showBackup ? "Hide backup codes" : "View backup codes"}
                    </button>
                    {showBackup && (
                        <div className="mt-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                            <p className="text-[10px] text-zinc-500 mb-2">
                                Save these codes somewhere safe. Each can be used once.
                            </p>
                            <div className="grid grid-cols-2 gap-1.5">
                                {backupCodes.map((code, i) => (
                                    <code key={i} className="rounded bg-white px-2 py-1 text-xs font-mono text-zinc-700 ring-1 ring-zinc-200">
                                        {code}
                                    </code>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
