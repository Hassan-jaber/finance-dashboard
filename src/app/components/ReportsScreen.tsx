import { FileDown, TrendingUp, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface ReportsScreenProps {
  month: string;
  totalIncomeILS: number;
  totalIncomeEUR: number;
  totalExpensesILS: number;
  totalExpensesEUR: number;
  expensesByCategory: Record<string, number>;
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
];

export function ReportsScreen({
  month,
  totalIncomeILS,
  totalIncomeEUR,
  totalExpensesILS,
  totalExpensesEUR,
  expensesByCategory,
}: ReportsScreenProps) {
  const netILS = totalIncomeILS - totalExpensesILS;
  const netEUR = totalIncomeEUR - totalExpensesEUR;

  const categoryData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const comparisonData = [
    { name: "Income", value: totalIncomeILS },
    { name: "Expenses", value: totalExpensesILS },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Monthly Financial Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Month: ${month}`, 20, 35);

    doc.setFontSize(14);
    doc.text("Summary", 20, 50);

    doc.setFontSize(11);
    doc.text(`Total Income (ILS): ${totalIncomeILS.toFixed(2)} ₪`, 20, 60);
    doc.text(`Total Income (EUR): ${totalIncomeEUR.toFixed(2)} €`, 20, 68);
    doc.text(`Total Expenses (ILS): ${totalExpensesILS.toFixed(2)} ₪`, 20, 76);
    doc.text(`Total Expenses (EUR): ${totalExpensesEUR.toFixed(2)} €`, 20, 84);
    doc.text(`Net Profit (ILS): ${netILS.toFixed(2)} ₪`, 20, 92);
    doc.text(`Net Profit (EUR): ${netEUR.toFixed(2)} €`, 20, 100);

    if (categoryData.length > 0) {
      doc.setFontSize(14);
      doc.text("Expenses by Category", 20, 115);

      doc.setFontSize(11);
      let y = 125;
      categoryData.forEach((cat) => {
        doc.text(`${cat.name}: ${cat.value.toFixed(2)} ₪`, 20, y);
        y += 8;
      });
    }

    doc.save(`finance-report-${month.replace(" ", "-")}.pdf`);
  };

  const handleExportExcel = () => {
    const summaryData = [
      { Metric: "Total Income (ILS)", Value: totalIncomeILS.toFixed(2) },
      { Metric: "Total Income (EUR)", Value: totalIncomeEUR.toFixed(2) },
      { Metric: "Total Expenses (ILS)", Value: totalExpensesILS.toFixed(2) },
      { Metric: "Total Expenses (EUR)", Value: totalExpensesEUR.toFixed(2) },
      { Metric: "Net Profit (ILS)", Value: netILS.toFixed(2) },
      { Metric: "Net Profit (EUR)", Value: netEUR.toFixed(2) },
    ];

    const categoryExportData = categoryData.map((cat) => ({
      Category: cat.name,
      Amount: cat.value.toFixed(2),
    }));

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(summaryData);
    const ws2 = XLSX.utils.json_to_sheet(categoryExportData);

    XLSX.utils.book_append_sheet(wb, ws1, "Summary");
    XLSX.utils.book_append_sheet(wb, ws2, "Categories");

    XLSX.writeFile(wb, `finance-report-${month.replace(" ", "-")}.xlsx`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">Monthly Report</h2>
        <p className="text-muted-foreground">{month}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={24} className="text-emerald-500" />
            <span className="text-sm text-muted-foreground">Total Income</span>
          </div>
          <p className="text-3xl text-emerald-500">{totalIncomeILS.toFixed(2)} ₪</p>
          <p className="text-muted-foreground mt-1">{totalIncomeEUR.toFixed(2)} €</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Wallet size={24} className="text-red-500" />
            <span className="text-sm text-muted-foreground">Total Expenses</span>
          </div>
          <p className="text-3xl text-red-500">{totalExpensesILS.toFixed(2)} ₪</p>
          <p className="text-muted-foreground mt-1">{totalExpensesEUR.toFixed(2)} €</p>
        </div>

        <div
          className={`bg-gradient-to-br ${
            netILS >= 0
              ? "from-blue-500/20 to-blue-500/10 border-blue-500/30"
              : "from-orange-500/20 to-orange-500/10 border-orange-500/30"
          } border rounded-2xl p-6`}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp
              size={24}
              className={netILS >= 0 ? "text-blue-500" : "text-orange-500"}
            />
            <span className="text-sm text-muted-foreground">Net Result</span>
          </div>
          <p className={`text-3xl ${netILS >= 0 ? "text-blue-500" : "text-orange-500"}`}>
            {netILS.toFixed(2)} ₪
          </p>
          <p className="text-muted-foreground mt-1">{netEUR.toFixed(2)} €</p>
        </div>
      </div>

      {/* Income vs Expenses Chart */}
      {comparisonData.some((d) => d.value > 0) && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#27272a",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Breakdown */}
      {categoryData.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#27272a",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {categoryData.map((cat, index) => (
              <div
                key={cat.name}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="text-muted-foreground">{cat.value.toFixed(2)} ₪</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
          Export Report
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleExportPDF}
            className="bg-card border border-border rounded-xl p-4 hover:bg-accent transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <FileDown size={24} className="text-red-500" />
              <span className="text-sm">Export PDF</span>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleExportExcel}
            className="bg-card border border-border rounded-xl p-4 hover:bg-accent transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <FileDown size={24} className="text-emerald-500" />
              <span className="text-sm">Export Excel</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
