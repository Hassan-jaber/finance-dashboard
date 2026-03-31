import { motion } from "motion/react";
import { Target } from "lucide-react";

interface ProgressBarProps {
  current: number;
  target: number;
  currency: string;
}

export function ProgressBar({ current, target, currency }: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="text-blue-500" size={20} />
          <h3>Monthly Target Progress</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {percentage.toFixed(1)}%
        </span>
      </div>

      <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-muted-foreground">Current: </span>
          <span className="font-medium">
            {current.toFixed(2)} {currency}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Remaining: </span>
          <span className="font-medium text-blue-500">
            {remaining.toFixed(2)} {currency}
          </span>
        </div>
      </div>
    </div>
  );
}
