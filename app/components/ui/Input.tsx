import { forwardRef } from "react";
import { cn } from "~/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  compact?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, compact, className, id, ...props }, ref) {
    const inputId = id || props.name;

    return (
      <div className={compact ? "space-y-0.5" : "space-y-1"}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block font-medium text-obsidian-300",
              compact ? "text-xs" : "text-sm"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-obsidian-600/50 bg-obsidian-800/60 px-3 text-obsidian-100 placeholder:text-obsidian-500 transition-colors",
            "focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/20",
            error && "border-crimson-500 focus:border-crimson-500 focus:ring-crimson-500/20",
            compact ? "py-1.5 text-sm" : "py-2.5 px-4",
            className
          )}
          {...props}
        />
        {error && <p className={cn("text-crimson-600", compact ? "text-xs" : "text-sm")}>{error}</p>}
      </div>
    );
  }
);
