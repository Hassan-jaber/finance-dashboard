import { useState } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

const QUICK_PRESETS = [5, 10, 20, 50, 100, 200];

interface AddIncomeSheetProps {
  onAddIncome: (income: {
    amount: number;
    currency: "ILS" | "EUR";
    note: string;
  }) => void;
  onClose: () => void;
}

export function AddIncomeSheet({ onAddIncome, onClose }: AddIncomeSheetProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"ILS" | "EUR">("ILS");
  const [note, setNote] = useState("");

  const handlePresetClick = (value: number) => {
    setAmount(value.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    onAddIncome({
      amount: numAmount,
      currency,
      note,
    });

    setAmount("");
    setNote("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quick Presets */}
      <div>
        <label className="block text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <Zap size={16} className="text-emerald-500" />
          Quick Add Presets
        </label>
        <div className="grid grid-cols-3 gap-3">
          {QUICK_PRESETS.map((preset) => (
            <motion.button
              key={preset}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePresetClick(preset)}
              className={`py-3 rounded-xl transition-all ${
                amount === preset.toString()
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-background border border-border hover:bg-accent"
              }`}
            >
              {preset} ₪
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Custom Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-background border border-border rounded-xl px-4 py-4 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Currency Selector */}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Currency</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setCurrency("ILS")}
            className={`py-3 rounded-xl transition-all ${
              currency === "ILS"
                ? "bg-primary text-primary-foreground"
                : "bg-background border border-border hover:bg-accent"
            }`}
          >
            ₪ ILS
          </button>
          <button
            type="button"
            onClick={() => setCurrency("EUR")}
            className={`py-3 rounded-xl transition-all ${
              currency === "EUR"
                ? "bg-primary text-primary-foreground"
                : "bg-background border border-border hover:bg-accent"
            }`}
          >
            € EUR
          </button>
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
          rows={3}
          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
      >
        Add Income
      </motion.button>
    </form>
  );
}
