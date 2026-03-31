import { useState } from "react";
import { motion } from "motion/react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Tools",
  "Software",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

interface AddExpenseSheetProps {
  onAddExpense: (expense: {
    amount: number;
    currency: "ILS" | "EUR";
    category: string;
    note: string;
  }) => void;
  onClose: () => void;
}

export function AddExpenseSheet({ onAddExpense, onClose }: AddExpenseSheetProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"ILS" | "EUR">("ILS");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    onAddExpense({
      amount: numAmount,
      currency,
      category,
      note,
    });

    setAmount("");
    setNote("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount */}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-background border border-border rounded-xl px-4 py-4 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-red-500"
          autoFocus
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

      {/* Category */}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Category</label>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`py-2 px-3 rounded-lg text-sm transition-all ${
                category === cat
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-background border border-border hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
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
          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full bg-red-500 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
      >
        Add Expense
      </motion.button>
    </form>
  );
}
