import { useState } from "react";

type Props = {
    type?: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    error?: string;
    maxLength?: number;
    disabled?: boolean;
    autoComplete?: string;
};

export function FloatingInput({
    type = "text",
    label,
    value,
    onChange,
    icon,
    error,
    maxLength,
    disabled,
    autoComplete,
}: Props) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || value.length > 0;

    return (
        <div className="relative">
            <div
                className={`relative flex items-center rounded-xl border backdrop-blur-sm transition-all duration-200 ${error
                        ? "border-red-400/60 bg-red-500/5"
                        : focused
                            ? "border-violet-400/60 bg-white/15 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                            : "border-white/20 bg-white/10 hover:border-white/30"
                    }`}
            >
                {icon && (
                    <span
                        className={`pointer-events-none absolute left-3 transition-colors duration-200 ${focused ? "text-violet-400" : "text-white/40"
                            }`}
                    >
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    maxLength={maxLength}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={`peer w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder-transparent disabled:opacity-50 ${icon ? "pl-10" : ""
                        }`}
                    placeholder={label}
                    id={`input-${label.replace(/\s+/g, "-").toLowerCase()}`}
                />
                <label
                    htmlFor={`input-${label.replace(/\s+/g, "-").toLowerCase()}`}
                    className={`pointer-events-none absolute transition-all duration-200 ${icon ? "left-10" : "left-4"
                        } ${isActive
                            ? "-top-2.5 text-xs px-1 bg-zinc-900/80 rounded text-violet-400"
                            : "top-3 text-sm text-white/50"
                        }`}
                >
                    {label}
                </label>
            </div>
            {error && <p className="mt-1.5 text-xs text-red-400 pl-1">{error}</p>}
        </div>
    );
}
