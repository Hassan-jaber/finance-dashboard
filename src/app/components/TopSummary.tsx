import { TrendingUp, Target as TargetIcon } from "lucide-react";
import { motion } from "motion/react";

interface TopSummaryProps {
  month: string;
  netBalance: number;
  targetILS: number;
  targetEUR: number;
  progress: number;
  remaining: number;
}

export function TopSummary({
  month,
  netBalance,
  targetILS,
  targetEUR,
  progress,
  remaining,
}: TopSummaryProps) {
  const progressPercentage = Math.min((progress / 100) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-6 space-y-4">
      {/* Month */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">{month}</p>
      </div>

      {/* Net Balance */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
        <div className="flex items-center justify-center gap-2">
          <TrendingUp
            size={28}
            className={netBalance >= 0 ? "text-emerald-500" : "text-red-500"}
          />
          <h2
            className={`text-4xl ${
              netBalance >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {netBalance.toFixed(2)} ₪
          </h2>
        </div>
      </div>

      {/* Monthly Target */}
      <div className="bg-background/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TargetIcon size={18} className="text-blue-500" />
            <span className="text-sm text-muted-foreground">Monthly Target</span>
          </div>
          <div className="text-right">
            <p className="text-sm">{targetILS.toFixed(0)} ₪</p>
            <p className="text-xs text-muted-foreground">{targetEUR.toFixed(0)} €</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute top-0 left-0 h-full rounded-full ${
                progressPercentage >= 100
                  ? "bg-gradient-to-r from-emerald-500 to-green-400"
                  : "bg-gradient-to-r from-blue-500 to-blue-400"
              }`}
            />
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{progress.toFixed(1)}%</span>
            {remaining > 0 ? (
              <span className="text-blue-400">{remaining.toFixed(0)} ₪ to go</span>
            ) : (
              <span className="text-emerald-400">Target reached! 🎉</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
