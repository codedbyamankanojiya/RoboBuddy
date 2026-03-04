import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, action, className = "" }: Props) {
  const reducedMotion = useReducedMotion();

  const content = (
    <div className={`rounded-2xl bg-white/80 p-8 text-center shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50 ${className}`}>
      {icon && (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100/80 text-violet-600 ring-1 ring-primary/20">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-800">{title}</h3>
      <p className="mt-2 max-w-sm mx-auto text-sm text-zinc-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );

  if (reducedMotion) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
    >
      {content}
    </motion.div>
  );
}
