import { cn } from "~/lib/utils";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-obsidian-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full rounded-lg border border-obsidian-600/50 bg-obsidian-800/60 px-4 py-2.5 text-obsidian-100 placeholder:text-obsidian-500 transition-colors resize-y min-h-[100px]",
          "focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/20",
          error && "border-crimson-500 focus:border-crimson-500 focus:ring-crimson-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-crimson-600">{error}</p>}
    </div>
  );
}
