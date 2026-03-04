import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { spring } from "@/lib/motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "default" | "elevated" | "glass" | "neural" | "holographic";
  depth?: number;
  particleEffect?: boolean;
  dataFlow?: boolean;
  roboticBorder?: boolean;
};

const variantStyles = {
  default: "bg-white/80 shadow-sm ring-1 ring-zinc-200 backdrop-blur",
  elevated: "bg-white/90 shadow-md ring-1 ring-zinc-200/80 backdrop-blur-md",
  glass: "bg-white/70 shadow-sm ring-1 ring-primary/20 backdrop-blur border border-white/50",
  neural:
    "bg-white/65 shadow-sm ring-1 ring-neural/25 backdrop-blur border border-white/40 shadow-glow-neural",
  holographic:
    "bg-white/60 shadow-md ring-1 ring-primary/25 backdrop-blur-md border border-white/50 shadow-inner-glow",
} as const;

export function Card({
  children,
  className = "",
  href,
  variant = "default",
  depth = 2,
  particleEffect = false,
  dataFlow = false,
  roboticBorder = false,
}: CardProps) {
  const reducedMotion = useReducedMotion();
  const baseClass = `rounded-2xl overflow-hidden ${variantStyles[variant]} ${className}`.trim();

  const d = Math.max(0, Math.min(6, depth));

  const motionProps = reducedMotion
    ? {}
    : {
        whileHover: href ? { y: -d, transition: spring.gentle } : {},
        whileTap: href ? { scale: 0.995, transition: spring.gentle } : {},
      };

  const inner = (
    <motion.div className={`group relative ${baseClass} transition-shadow duration-normal`} {...motionProps}>
      {roboticBorder && (
        <>
          <span className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 rounded-sm bg-robotic/35 ring-1 ring-robotic/40" aria-hidden />
          <span className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-sm bg-robotic/35 ring-1 ring-robotic/40" aria-hidden />
          <span className="pointer-events-none absolute left-3 bottom-3 h-2.5 w-2.5 rounded-sm bg-robotic/35 ring-1 ring-robotic/40" aria-hidden />
          <span className="pointer-events-none absolute right-3 bottom-3 h-2.5 w-2.5 rounded-sm bg-robotic/35 ring-1 ring-robotic/40" aria-hidden />
        </>
      )}

      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-slow group-hover:opacity-100"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          aria-hidden
        />
      )}

      {variant === "holographic" && !reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-slow group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(105deg, rgba(6,182,212,0.06), rgba(168,85,247,0.10), rgba(255,255,255,0.08))",
            backgroundSize: "200% 100%",
            animation: "shimmerX 2.2s linear infinite",
          }}
          aria-hidden
        />
      )}

      {dataFlow && !reducedMotion && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden" aria-hidden>
          <div
            className="absolute top-1/2 h-px w-1/3 -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.8), transparent)",
              animation: "dataStream 1.9s linear infinite",
            }}
          />
        </div>
      )}

      {particleEffect && !reducedMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-neural/35"
              style={{
                left: `${(i * 19 + 11) % 100}%`,
                top: `${(i * 13 + 23) % 100}%`,
                animation: `particleFloat ${6.5 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-2xl"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
