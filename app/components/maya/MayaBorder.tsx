import { cn } from "~/lib/utils";

interface MayaBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function MayaBorder({ children, className }: MayaBorderProps) {
  return (
    <div className={cn("maya-border", className)}>
      {children}
    </div>
  );
}
