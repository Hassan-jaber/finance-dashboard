import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";

interface Expense {
  id: string;
  amount: number;
  currency: "ILS" | "EUR";
  category: string;
  timestamp: number;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No expenses yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <motion.div
          key={expense.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors group"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div>
                <p className="font-medium">
                  {expense.amount.toFixed(2)} {expense.currency === "ILS" ? "₪" : "€"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {expense.category} • {format(expense.timestamp, "MMM dd, HH:mm")}
                </p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDeleteExpense(expense.id)}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
