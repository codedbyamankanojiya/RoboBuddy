import { getPasswordStrength } from "@/lib/validation";

type Props = { password: string };

export function PasswordStrengthMeter({ password }: Props) {
    const { score, label, color } = getPasswordStrength(password);

    if (!password) return null;

    return (
        <div className="space-y-1.5">
            {/* Segments */}
            <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: i < score ? color : "rgba(255,255,255,0.1)",
                        }}
                    />
                ))}
            </div>
            {/* Label */}
            <p className="text-xs transition-colors duration-200" style={{ color }}>
                {label}
            </p>
        </div>
    );
}
