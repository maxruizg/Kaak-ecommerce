import { cn } from "~/lib/utils";

interface GlyphAccentProps {
  children: React.ReactNode;
  className?: string;
}

export function GlyphAccent({ children, className }: GlyphAccentProps) {
  return (
    <div className={cn("glyph-accent", className)}>
      {children}
    </div>
  );
}
