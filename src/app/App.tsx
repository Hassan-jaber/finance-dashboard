import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { format, isToday } from "date-fns";
import { AnimatePresence } from "motion/react";
import { BottomNavigation } from "./components/BottomNavigation";
import { TopSummary } from "./components/TopSummary";
import { QuickActions } from "./components/QuickActions";
import { TodaySummary } from "./components/TodaySummary";
import { RecentTransactions } from "./components/RecentTransactions";
import { Insights } from "./components/Insights";
import { BottomSheet } from "./components/BottomSheet";
import { AddExpenseSheet } from "./components/AddExpenseSheet";
import { AddIncomeSheet } from "./components/AddIncomeSheet";
import { TransactionsScreen } from "./components/TransactionsScreen";
import { ReportsScreen } from "./components/ReportsScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { Celebration } from "./components/Celebration";

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

interface AppData {
  transactions: Transaction[];
  targetILS: number;
  targetEUR: number;
  lastActivity: string;
  quickIncomeClicks: { date: string; count: number }[];
}

export default function App() {
  const [data, setData] = useState<AppData>({
    transactions: [],
    targetILS: 10000,
    targetEUR: 2500,
    lastActivity: "",
    quickIncomeClicks: [],
  });

  const [activeTab, setActiveTab] = useState<"home" | "transactions" | "reports" | "settings">(
    "home"
  );
  const [showExpenseSheet, setShowExpenseSheet] = useState(false);
  const [showIncomeSheet, setShowIncomeSheet] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("financeTrackerData");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored data", e);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("financeTrackerData", JSON.stringify(data));
  }, [data]);

  // Calculate metrics
  const currentMonth = format(new Date(), "yyyy-MM");
  const monthTransactions = data.transactions.filter((t) => t.date.startsWith(currentMonth));

  const totalIncomeILS = monthTransactions
    .filter((t) => t.type === "income" && t.currency === "ILS")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncomeEUR = monthTransactions
    .filter((t) => t.type === "income" && t.currency === "EUR")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpensesILS = monthTransactions
    .filter((t) => t.type === "expense" && t.currency === "ILS")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpensesEUR = monthTransactions
    .filter((t) => t.type === "expense" && t.currency === "EUR")
    .reduce((sum, t) => sum + t.amount, 0);

  const todayTransactions = data.transactions.filter((t) => isToday(t.timestamp));

  const todayIncomeILS = todayTransactions
    .filter((t) => t.type === "income" && t.currency === "ILS")
    .reduce((sum, t) => sum + t.amount, 0);

  const todayExpensesILS = todayTransactions
    .filter((t) => t.type === "expense" && t.currency === "ILS")
    .reduce((sum, t) => sum + t.amount, 0);

  const todayClickCount =
    data.quickIncomeClicks.find((c) => c.date === format(new Date(), "yyyy-MM-dd"))?.count || 0;

  const netBalance = totalIncomeILS - totalExpensesILS;
  const progressPercentage = (totalIncomeILS / data.targetILS) * 100;
  const remaining = Math.max(0, data.targetILS - totalIncomeILS);

  // Calculate expenses by category
  const expensesByCategory = monthTransactions
    .filter((t) => t.type === "expense" && t.currency === "ILS")
    .reduce((acc, t) => {
      const cat = t.category || "Other";
      acc[cat] = (acc[cat] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Calculate insights
  const topCategory = Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a)[0];

  const incomeByDay = monthTransactions
    .filter((t) => t.type === "income" && t.currency === "ILS")
    .reduce((acc, t) => {
      const day = format(t.timestamp, "MMM dd");
      acc[day] = (acc[day] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const bestIncomeDay = Object.entries(incomeByDay).sort(([, a], [, b]) => b - a)[0];

  const uniqueDays = new Set(data.transactions.map((t) => format(t.timestamp, "yyyy-MM-dd")));
  const streak = uniqueDays.size;

  // Check if target reached
  useEffect(() => {
    if (totalIncomeILS >= data.targetILS && !hasReachedTarget) {
      setShowCelebration(true);
      setHasReachedTarget(true);
    }
  }, [totalIncomeILS, data.targetILS, hasReachedTarget]);

  const addQuickIncome = (amount: number) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: "income",
      amount,
      currency: "ILS",
      timestamp: Date.now(),
      date: today,
    };

    setData((prev) => {
      const clicks = [...prev.quickIncomeClicks];
      const clickIndex = clicks.findIndex((c) => c.date === today);

      if (clickIndex >= 0) {
        clicks[clickIndex].count += 1;
      } else {
        clicks.push({ date: today, count: 1 });
      }

      return {
        ...prev,
        transactions: [transaction, ...prev.transactions],
        quickIncomeClicks: clicks,
        lastActivity: today,
      };
    });
  };

  const addExpense = (expense: {
    amount: number;
    currency: "ILS" | "EUR";
    category: string;
    note: string;
  }) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: "expense",
      amount: expense.amount,
      currency: expense.currency,
      category: expense.category,
      note: expense.note || undefined,
      timestamp: Date.now(),
      date: today,
    };

    setData((prev) => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
      lastActivity: today,
    }));
  };

  const addIncome = (income: { amount: number; currency: "ILS" | "EUR"; note: string }) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: "income",
      amount: income.amount,
      currency: income.currency,
      note: income.note || undefined,
      timestamp: Date.now(),
      date: today,
    };

    setData((prev) => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
      lastActivity: today,
    }));
  };

  const deleteTransaction = (id: string) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  };

  const updateTarget = (ils: number, eur: number) => {
    setData((prev) => ({
      ...prev,
      targetILS: ils,
      targetEUR: eur,
    }));
    setHasReachedTarget(false);
  };

  const clearAllData = () => {
    setData({
      transactions: [],
      targetILS: 10000,
      targetEUR: 2500,
      lastActivity: "",
      quickIncomeClicks: [],
    });
    setHasReachedTarget(false);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header - Only on Home */}
        {activeTab === "home" && (
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-2.5 rounded-xl">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl">Finance Tracker</h1>
                <p className="text-sm text-muted-foreground">Your personal money manager</p>
              </div>
            </div>
          </div>
        )}

        {/* Home Screen */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <TopSummary
              month={format(new Date(), "MMMM yyyy")}
              netBalance={netBalance}
              targetILS={data.targetILS}
              targetEUR={data.targetEUR}
              progress={progressPercentage}
              remaining={remaining}
            />

            <QuickActions
              onAddFive={() => addQuickIncome(5)}
              onAddTen={() => addQuickIncome(10)}
              onAddExpense={() => setShowExpenseSheet(true)}
              onAddCustomIncome={() => setShowIncomeSheet(true)}
              todayClickCount={todayClickCount}
            />

            <TodaySummary income={todayIncomeILS} expenses={todayExpensesILS} />

            <RecentTransactions transactions={data.transactions} limit={5} />

            <Insights
              topCategory={topCategory ? { name: topCategory[0], amount: topCategory[1] } : null}
              bestIncomeDay={
                bestIncomeDay ? { date: bestIncomeDay[0], amount: bestIncomeDay[1] } : null
              }
              streak={streak}
            />
          </div>
        )}

        {/* Transactions Screen */}
        {activeTab === "transactions" && (
          <TransactionsScreen
            transactions={data.transactions}
            onDeleteTransaction={deleteTransaction}
          />
        )}

        {/* Reports Screen */}
        {activeTab === "reports" && (
          <ReportsScreen
            month={format(new Date(), "MMMM yyyy")}
            totalIncomeILS={totalIncomeILS}
            totalIncomeEUR={totalIncomeEUR}
            totalExpensesILS={totalExpensesILS}
            totalExpensesEUR={totalExpensesEUR}
            expensesByCategory={expensesByCategory}
          />
        )}

        {/* Settings Screen */}
        {activeTab === "settings" && (
          <SettingsScreen
            targetILS={data.targetILS}
            targetEUR={data.targetEUR}
            onUpdateTarget={updateTarget}
            onClearAllData={clearAllData}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Bottom Sheets */}
      <BottomSheet
        isOpen={showExpenseSheet}
        onClose={() => setShowExpenseSheet(false)}
        title="Add Expense"
      >
        <AddExpenseSheet onAddExpense={addExpense} onClose={() => setShowExpenseSheet(false)} />
      </BottomSheet>

      <BottomSheet
        isOpen={showIncomeSheet}
        onClose={() => setShowIncomeSheet(false)}
        title="Add Income"
      >
        <AddIncomeSheet onAddIncome={addIncome} onClose={() => setShowIncomeSheet(false)} />
      </BottomSheet>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && <Celebration onClose={() => setShowCelebration(false)} />}
      </AnimatePresence>
    </div>
  );
}