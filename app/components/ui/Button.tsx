import { cn } from "~/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-heading font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-950 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-fire-600 text-white hover:bg-fire-700 focus:ring-fire-500 active:bg-fire-800 shadow-md hover:shadow-lg",
    secondary:
      "bg-obsidian-800 text-white hover:bg-obsidian-900 focus:ring-obsidian-500 active:bg-obsidian-950",
    outline:
      "border-2 border-fire-500 text-fire-400 hover:bg-fire-500/10 focus:ring-fire-500 active:bg-fire-500/20",
    ghost:
      "text-obsidian-300 hover:bg-obsidian-800 focus:ring-obsidian-300 active:bg-obsidian-700",
    danger:
      "bg-crimson-600 text-white hover:bg-crimson-700 focus:ring-crimson-500 active:bg-crimson-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-lg gap-2",
    lg: "px-7 py-3.5 text-base rounded-lg gap-2.5",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
