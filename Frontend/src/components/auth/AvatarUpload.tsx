import { useRef } from "react";

type Props = {
    currentAvatar: string | null;
    initials: string;
    onAvatarChange: (dataUrl: string) => void;
    size?: "md" | "lg" | "xl";
};

const sizes = {
    md: "h-14 w-14 text-lg",
    lg: "h-20 w-20 text-xl",
    xl: "h-28 w-28 text-2xl",
};

export function AvatarUpload({ currentAvatar, initials, onAvatarChange, size = "xl" }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                onAvatarChange(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="relative group">
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={`${sizes[size]} rounded-full overflow-hidden ring-2 ring-white/20 hover:ring-violet-400/40 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500`}
            >
                {currentAvatar ? (
                    <img src={currentAvatar} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-semibold text-white select-none">
                        {initials}
                    </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
                aria-label="Upload avatar"
            />
        </div>
    );
}
