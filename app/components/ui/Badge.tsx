import { cn } from "~/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "fire" | "ember" | "jade" | "crimson" | "obsidian";
  size?: "sm" | "md";
}

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  const variants = {
    default: "bg-obsidian-100 text-obsidian-700",
    fire: "bg-fire-100 text-fire-700",
    ember: "bg-ember-100 text-ember-700",
    jade: "bg-jade-400/20 text-jade-700",
    crimson: "bg-crimson-400/20 text-crimson-700",
    obsidian: "bg-obsidian-800 text-white",
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
