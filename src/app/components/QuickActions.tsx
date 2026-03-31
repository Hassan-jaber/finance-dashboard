import { Plus, Zap, Wallet } from "lucide-react";
import { motion } from "motion/react";

interface QuickActionsProps {
  onAddFive: () => void;
  onAddTen: () => void;
  onAddExpense: () => void;
  onAddCustomIncome: () => void;
  todayClickCount: number;
}

export function QuickActions({
  onAddFive,
  onAddTen,
  onAddExpense,
  onAddCustomIncome,
  todayClickCount,
}: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
        {todayClickCount > 0 && (
          <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full">
            <Zap size={14} className="text-emerald-500" />
            <span className="text-xs text-emerald-500">
              {todayClickCount} {todayClickCount === 1 ? 'tap' : 'taps'} today
            </span>
          </div>
        )}
      </div>

      {/* Primary Action - +5₪ */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAddFive}
        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-6 rounded-2xl shadow-lg shadow-emerald-500/30 active:shadow-emerald-500/50 transition-shadow"
      >
        <div className="flex items-center justify-center gap-3">
          <Plus size={32} strokeWidth={3} />
          <span className="text-3xl">5 ₪</span>
        </div>
        <p className="text-emerald-100 text-sm mt-1">Tap to add income</p>
      </motion.button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddTen}
          className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-4 rounded-xl hover:bg-emerald-500/30 transition-colors"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">+10 ₪</span>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddExpense}
          className="bg-red-500/20 border border-red-500/30 text-red-400 py-4 rounded-xl hover:bg-red-500/30 transition-colors"
        >
          <div className="flex flex-col items-center gap-1">
            <Wallet size={20} />
            <span className="text-xs">Expense</span>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddCustomIncome}
          className="bg-blue-500/20 border border-blue-500/30 text-blue-400 py-4 rounded-xl hover:bg-blue-500/30 transition-colors"
        >
          <div className="flex flex-col items-center gap-1">
            <Plus size={20} />
            <span className="text-xs">Income</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
