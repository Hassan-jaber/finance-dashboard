import { ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react";

interface TodaySummaryProps {
  income: number;
  expenses: number;
}

export function TodaySummary({ income, expenses }: TodaySummaryProps) {
  const net = income - expenses;

  return (
    <div className="space-y-3">
      <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Today</h3>

      <div className="grid grid-cols-3 gap-3">
        {/* Today Income */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpCircle size={16} className="text-emerald-500" />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <p className="text-emerald-500">{income.toFixed(2)} ₪</p>
        </div>

        {/* Today Expenses */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownCircle size={16} className="text-red-500" />
            <span className="text-xs text-muted-foreground">Expenses</span>
          </div>
          <p className="text-red-500">{expenses.toFixed(2)} ₪</p>
        </div>

        {/* Today Net */}
        <div
          className={`${
            net >= 0
              ? "bg-blue-500/10 border border-blue-500/20"
              : "bg-orange-500/10 border border-orange-500/20"
          } rounded-xl p-4`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp
              size={16}
              className={net >= 0 ? "text-blue-500" : "text-orange-500"}
            />
            <span className="text-xs text-muted-foreground">Net</span>
          </div>
          <p className={net >= 0 ? "text-blue-500" : "text-orange-500"}>
            {net.toFixed(2)} ₪
          </p>
        </div>
      </div>
    </div>
  );
}
