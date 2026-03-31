import { Plus, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface QuickIncomeButtonProps {
  onAddIncome: (amount: number) => void;
  clickCount: number;
}

export function QuickIncomeButton({ onAddIncome, clickCount }: QuickIncomeButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-50">
      {/* Click counter */}
      {clickCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
        >
          <TrendingUp size={16} className="text-emerald-500" />
          <span className="text-sm">+{clickCount} today</span>
        </motion.div>
      )}

      {/* Optional +10 button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAddIncome(10)}
        className="bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-full px-6 py-3 shadow-lg backdrop-blur-sm border border-emerald-500/30 transition-colors"
      >
        +10 ₪
      </motion.button>

      {/* Primary +5 button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onAddIncome(5)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-colors group relative"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Plus size={32} strokeWidth={3} />
        </motion.div>
        <span className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-md">
          5₪
        </span>
      </motion.button>
    </div>
  );
}
