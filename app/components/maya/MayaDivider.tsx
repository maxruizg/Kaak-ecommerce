import { cn } from "~/lib/utils";

interface MayaDividerProps {
  variant?: "default" | "thick" | "accent" | "fireEdge";
  className?: string;
}

export function MayaDivider({ variant = "default", className }: MayaDividerProps) {
  const variants = {
    default: "maya-divider",
    thick: "maya-divider-thick",
    accent: "h-1 bg-gradient-to-r from-fire-600 via-ember-500 to-fire-600",
    fireEdge: "fire-edge-top h-1 bg-gradient-to-r from-fire-600 via-cenote-500 to-fire-600",
  };

  return <div className={cn(variants[variant], "w-full", className)} role="separator" />;
}
