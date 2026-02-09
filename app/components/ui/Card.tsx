import { cn } from "~/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-obsidian-900/60 backdrop-blur-sm rounded-xl border border-obsidian-700/50",
        hover && "transition-all duration-300 hover:shadow-fire-500/10 hover:shadow-md hover:border-obsidian-600/60 hover:-translate-y-1",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
