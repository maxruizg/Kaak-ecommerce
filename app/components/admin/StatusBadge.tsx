import { Badge } from "~/components/ui/Badge";

const statusConfig: Record<string, { label: string; variant: "jade" | "ember" | "fire" | "crimson" | "obsidian" | "default" }> = {
  pending: { label: "Pendiente", variant: "ember" },
  confirmed: { label: "Confirmado", variant: "fire" },
  processing: { label: "Procesando", variant: "fire" },
  shipped: { label: "Enviado", variant: "default" },
  delivered: { label: "Entregado", variant: "jade" },
  cancelled: { label: "Cancelado", variant: "crimson" },
  refunded: { label: "Reembolsado", variant: "obsidian" },
  completed: { label: "Completado", variant: "jade" },
  paid: { label: "Pagado", variant: "jade" },
  failed: { label: "Fallido", variant: "crimson" },
};

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "default" as const };
  return <Badge variant={config.variant} size={size}>{config.label}</Badge>;
}
