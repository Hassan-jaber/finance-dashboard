import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  currency: "ILS" | "EUR";
  category?: string;
  note?: string;
  timestamp: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  limit?: number;
}

export function RecentTransactions({ transactions, limit = 5 }: RecentTransactionsProps) {
  const recent = transactions.slice(0, limit);

  if (recent.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
          Recent Activity
        </h3>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground">No transactions yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start by adding income or expenses
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
        Recent Activity
      </h3>

      <div className="space-y-2">
        {recent.map((transaction) => {
          const isIncome = transaction.type === "income";
          const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;
          const colorClass = isIncome ? "text-emerald-500" : "text-red-500";
          const bgClass = isIncome
            ? "bg-emerald-500/10 border-emerald-500/20"
            : "bg-red-500/10 border-red-500/20";

          return (
            <div
              key={transaction.id}
              className={`${bgClass} border rounded-xl p-4 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={colorClass} />
                <div>
                  <p className="text-sm">
                    {transaction.category || (isIncome ? "Income" : "Expense")}
                  </p>
                  {transaction.note && (
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {transaction.note}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {format(transaction.timestamp, "MMM dd, HH:mm")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`${colorClass}`}>
                  {isIncome ? "+" : "-"}
                  {transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.currency === "ILS" ? "₪" : "€"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
