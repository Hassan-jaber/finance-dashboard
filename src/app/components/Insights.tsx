import { TrendingUp, Calendar, Award } from "lucide-react";

interface InsightsProps {
  topCategory: { name: string; amount: number } | null;
  bestIncomeDay: { date: string; amount: number } | null;
  streak: number;
}

export function Insights({ topCategory, bestIncomeDay, streak }: InsightsProps) {
  const hasAnyInsight = topCategory || bestIncomeDay || streak > 0;

  if (!hasAnyInsight) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Insights</h3>

      <div className="grid grid-cols-1 gap-3">
        {topCategory && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Top Spending</p>
                <p className="text-sm">
                  {topCategory.name} • {topCategory.amount.toFixed(2)} ₪
                </p>
              </div>
            </div>
          </div>
        )}

        {bestIncomeDay && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-emerald-500" />
              <div>
                <p className="text-xs text-muted-foreground">Best Income Day</p>
                <p className="text-sm">
                  {bestIncomeDay.date} • {bestIncomeDay.amount.toFixed(2)} ₪
                </p>
              </div>
            </div>
          </div>
        )}

        {streak > 0 && (
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Award size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Activity Streak</p>
                <p className="text-sm">
                  {streak} {streak === 1 ? "day" : "days"} 🔥
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
