import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExpenseFormProps {
  onAddExpense: (expense: {
    amount: number;
    currency: "ILS" | "EUR";
    category: string;
  }) => void;
}

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

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"ILS" | "EUR">("ILS");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    onAddExpense({
      amount: parseFloat(amount),
      currency,
      category,
    });

    setAmount("");
    setIsOpen(false);
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 bg-card hover:bg-accent border border-border rounded-lg p-4 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Plus size={20} />}
        <span>{isOpen ? "Cancel" : "Add Expense"}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="mt-4 p-4 bg-card border border-border rounded-lg space-y-4">
              <div>
                <label className="block text-sm mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Currency</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrency("ILS")}
                    className={`flex-1 py-2 rounded-lg border transition-colors ${
                      currency === "ILS"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:bg-accent"
                    }`}
                  >
                    ₪ ILS
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("EUR")}
                    className={`flex-1 py-2 rounded-lg border transition-colors ${
                      currency === "EUR"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:bg-accent"
                    }`}
                  >
                    € EUR
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
              >
                Add Expense
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
