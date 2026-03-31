import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

interface DailySummaryProps {
  income: number;
  expenses: number;
  currency: string;
}

export function DailySummary({ income, expenses, currency }: DailySummaryProps) {
  const net = income - expenses;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-muted-foreground" />
        <h3>Today's Summary</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <p className="text-xl text-emerald-500">
            +{income.toFixed(2)} {currency}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-red-500/10 rounded-lg p-4 border border-red-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-red-500" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
          <p className="text-xl text-red-500">
            -{expenses.toFixed(2)} {currency}
          </p>
        </motion.div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Net</span>
          <span className={`text-lg ${net >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {net >= 0 ? '+' : ''}{net.toFixed(2)} {currency}
          </span>
        </div>
      </div>
    </div>
  );
}
