import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color: "green" | "red" | "blue";
  trend?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  const colorClasses = {
    green: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
    red: "from-red-500/10 to-red-500/5 border-red-500/20",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
  };

  const iconColorClasses = {
    green: "text-emerald-500",
    red: "text-red-500",
    blue: "text-blue-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-3xl tracking-tight mb-1">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className="text-xs text-muted-foreground mt-2">{trend}</p>
          )}
        </div>
        <div className={`rounded-lg bg-card/50 p-3 ${iconColorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}
