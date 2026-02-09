import { cn } from "~/lib/utils";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  compact?: boolean;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  compact,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || props.name;

  return (
    <div className={compact ? "space-y-0.5" : "space-y-1"}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "block font-medium text-obsidian-300",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-lg border border-obsidian-600/50 bg-obsidian-800/60 px-3 text-obsidian-100 transition-colors appearance-none",
          "focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/20",
          error && "border-crimson-500 focus:border-crimson-500 focus:ring-crimson-500/20",
          compact ? "py-1.5 text-sm" : "py-2.5 px-4",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className={cn("text-crimson-600", compact ? "text-xs" : "text-sm")}>{error}</p>}
    </div>
  );
}
