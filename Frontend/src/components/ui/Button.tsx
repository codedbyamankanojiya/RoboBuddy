import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { spring } from "@/lib/motion";

type ButtonBase = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

type ButtonAsButton = ButtonBase & {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  href?: never;
};

type ButtonAsLink = ButtonBase & {
  href: string;
  onClick?: never;
  type?: never;
  loading?: never;
};

type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
  variant?: "primary" | "secondary" | "ghost" | "neural" | "robotic";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  holographic?: boolean;
  energyFlow?: boolean;
  soundEnabled?: boolean;
  robotic?: boolean;
};

const variantStyles = {
  primary:
    "bg-gradient-primary text-white shadow-glow-sm hover:shadow-glow focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-primary/20",
  secondary:
    "bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-zinc-300 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  neural:
    "text-zinc-900 bg-gradient-to-r from-neural/70 to-accent/70 shadow-glow-neural hover:shadow-glow focus-visible:ring-2 focus-visible:ring-neural focus-visible:ring-offset-2 border border-neural/30",
  robotic:
    "text-zinc-900 bg-gradient-to-r from-robotic/25 to-zinc-100 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-robotic focus-visible:ring-offset-2 border border-robotic/35",
} as const;

const sizeStyles = {
  xs: "px-3 py-1.5 text-xs rounded-lg",
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-2xl",
  xl: "px-7 py-3.5 text-base rounded-2xl",
} as const;

export function Button(props: ButtonProps) {
  const {
    children,
    className = "",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    holographic = false,
    energyFlow = false,
    soundEnabled = false,
    robotic: roboticFlag = false,
    ...rest
  } = props;
  const reducedMotion = useReducedMotion();
  const isLink = "href" in rest && rest.href != null;

  const baseClass =
    "group relative inline-flex items-center justify-center font-semibold transition-shadow duration-normal transition-colors duration-normal focus:outline-none focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none";
  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, variant === "robotic" || roboticFlag ? spring.robotic : spring.gentle);
  const y = useSpring(my, variant === "robotic" || roboticFlag ? spring.robotic : spring.gentle);

  const content = (
    <>
      <span className={`inline-flex items-center gap-2 ${loading ? "opacity-80" : ""}`}>
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        <span>{children}</span>
      </span>
    </>
  );

  const motionProps = reducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: variant === "robotic" || roboticFlag ? spring.robotic : spring.gentle,
      };

  const fxClass = holographic ? "overflow-hidden" : "";
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${fxClass} ${className}`.trim();

  const commonHandlers = reducedMotion
    ? {}
    : {
        onPointerMove: (e: React.PointerEvent) => {
          const el = e.currentTarget as HTMLElement;
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          const clamp = (n: number, c: number) => Math.max(-c, Math.min(c, n));
          const strength = variant === "robotic" || roboticFlag ? 6 : 8;
          mx.set(clamp(dx / 18, strength));
          my.set(clamp(dy / 18, strength));
        },
        onPointerLeave: () => {
          mx.set(0);
          my.set(0);
        },
      };

  const overlays = (
    <>
      {holographic && !reducedMotion ? (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-slow"
          style={{
            background:
              "linear-gradient(105deg, rgba(255,255,255,0.10), rgba(255,255,255,0.35), rgba(255,255,255,0.10))",
            backgroundSize: "200% 100%",
            animation: "shimmerX 1.8s linear infinite",
          }}
          aria-hidden
        />
      ) : null}
      {energyFlow && !reducedMotion ? (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            animation: "dataStream 1.4s linear infinite",
          }}
          aria-hidden
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/20" aria-hidden />
    </>
  );

  if (isLink) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    const linkDisabledClass = disabled ? "pointer-events-none opacity-50" : "";
    return (
      <motion.span {...(reducedMotion ? {} : motionProps)} className="inline-block" style={reducedMotion ? undefined : { x, y }}>
        <Link
          to={href}
          className={`${classes} ${linkDisabledClass}`.trim()}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          data-sound={soundEnabled ? "on" : undefined}
          data-robotic={roboticFlag ? "on" : undefined}
          {...(linkRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          {...commonHandlers}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (disabled) e.preventDefault();
          }}
        >
          {overlays}
          <span className="relative z-10">{content}</span>
        </Link>
      </motion.span>
    );
  }

  const { onClick, type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...buttonRest}
      {...(reducedMotion ? {} : motionProps)}
      {...commonHandlers}
      style={reducedMotion ? undefined : { x, y }}
      data-sound={soundEnabled ? "on" : undefined}
      data-robotic={roboticFlag ? "on" : undefined}
    >
      {overlays}
      <span className="relative z-10">{content}</span>
    </motion.button>
  );
}
