import { cn } from "~/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "fire" | "ember" | "jade" | "crimson" | "obsidian";
  size?: "sm" | "md";
}

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  const variants = {
    default: "bg-obsidian-800 text-obsidian-300",
    fire: "bg-fire-900/40 text-fire-400 border border-fire-800/40",
    ember: "bg-ember-900/40 text-ember-400 border border-ember-800/40",
    jade: "bg-jade-400/15 text-jade-400",
    crimson: "bg-crimson-400/15 text-crimson-400",
    obsidian: "bg-obsidian-700 text-obsidian-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size]
      )}
    >
      {children}
    </span>
  );
}
