import { cn } from "~/lib/utils";

interface FireParticlesProps {
  children: React.ReactNode;
  className?: string;
}

export function FireParticles({ children, className }: FireParticlesProps) {
  return (
    <div className={cn("fire-particles", className)}>
      {children}
    </div>
  );
}
