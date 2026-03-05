import { useId, useState } from "react";

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function ToggleSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  className,
}: Props) {
  const id = useId();
  const isControlled = typeof checked === "boolean";
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const value = isControlled ? (checked as boolean) : uncontrolled;

  function setValue(next: boolean) {
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  }

  const base =
    "relative h-7 w-12 shrink-0 rounded-full ring-1 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2";
  const state = value
    ? "bg-violet-600 ring-violet-600"
    : "bg-zinc-200 ring-zinc-300";
  const dis = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  const trackFx = value ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]" : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]";

  return (
    <button
      id={label ? `${id}-switch` : undefined}
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        setValue(!value);
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setValue(!value);
        }
      }}
      className={[base, state, trackFx, dis, className].filter(Boolean).join(" ")}
    >
      <span
        className={`absolute left-0.5 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-transform duration-200 ${
          value ? "translate-x-[20px]" : "translate-x-0"
        }`}
        aria-hidden
      />
    </button>
  );
}
