import { useState } from "react";
import { Search, Filter, ArrowUpCircle, ArrowDownCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { motion } from "motion/react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  currency: "ILS" | "EUR";
  category?: string;
  note?: string;
  timestamp: number;
  date: string;
}

interface TransactionsScreenProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export function TransactionsScreen({
  transactions,
  onDeleteTransaction,
}: TransactionsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [filterCurrency, setFilterCurrency] = useState<"all" | "ILS" | "EUR">("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesCurrency = filterCurrency === "all" || t.currency === filterCurrency;
    const matchesSearch =
      !searchQuery ||
      t.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.note?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesCurrency && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">All Transactions</h2>
        <p className="text-muted-foreground">{filteredTransactions.length} transactions</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filters</span>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType("income")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterType === "income"
                ? "bg-emerald-500 text-white"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilterType("expense")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterType === "expense"
                ? "bg-red-500 text-white"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            Expenses
          </button>
        </div>

        {/* Currency Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterCurrency("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterCurrency === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            All Currencies
          </button>
          <button
            onClick={() => setFilterCurrency("ILS")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterCurrency === "ILS"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            ₪ ILS
          </button>
          <button
            onClick={() => setFilterCurrency("EUR")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterCurrency === "EUR"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            € EUR
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;
            const colorClass = isIncome ? "text-emerald-500" : "text-red-500";
            const bgClass = isIncome
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-red-500/10 border-red-500/20";

            return (
              <motion.div
                key={transaction.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`${bgClass} border rounded-xl p-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon size={20} className={colorClass} />
                    <div className="flex-1">
                      <p className="font-medium">
                        {transaction.category || (isIncome ? "Income" : "Expense")}
                      </p>
                      {transaction.note && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {transaction.note}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(transaction.timestamp, "MMM dd, yyyy • HH:mm")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`${colorClass}`}>
                        {isIncome ? "+" : "-"}
                        {transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.currency === "ILS" ? "₪" : "€"}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm("Delete this transaction?")) {
                          onDeleteTransaction(transaction.id);
                        }
                      }}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
