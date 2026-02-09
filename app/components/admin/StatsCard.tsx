import { cn } from "~/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-obsidian-200 p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-obsidian-500">{title}</p>
          <p className="mt-2 text-3xl font-heading font-bold text-obsidian-900">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-obsidian-400">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                trend.value >= 0 ? "text-jade-600" : "text-crimson-600"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-fire-50 text-fire-600 rounded-lg">{icon}</div>
        )}
      </div>
    </div>
  );
}
