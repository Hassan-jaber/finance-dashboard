import { FileDown, FileSpreadsheet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface MonthlyReportProps {
  totalIncomeILS: number;
  totalIncomeEUR: number;
  totalExpensesILS: number;
  totalExpensesEUR: number;
  expensesByCategory: Record<string, number>;
  month: string;
}

export function MonthlyReport({
  totalIncomeILS,
  totalIncomeEUR,
  totalExpensesILS,
  totalExpensesEUR,
  expensesByCategory,
  month,
}: MonthlyReportProps) {
  const netILS = totalIncomeILS - totalExpensesILS;
  const netEUR = totalIncomeEUR - totalExpensesEUR;

  const categoryData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Monthly Financial Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Period: ${month}`, 20, 35);

    doc.text("Income:", 20, 50);
    doc.text(`ILS: ${totalIncomeILS.toFixed(2)} ₪`, 30, 60);
    doc.text(`EUR: ${totalIncomeEUR.toFixed(2)} €`, 30, 70);

    doc.text("Expenses:", 20, 85);
    doc.text(`ILS: ${totalExpensesILS.toFixed(2)} ₪`, 30, 95);
    doc.text(`EUR: ${totalExpensesEUR.toFixed(2)} €`, 30, 105);

    doc.text("Net Profit:", 20, 120);
    doc.text(`ILS: ${netILS.toFixed(2)} ₪`, 30, 130);
    doc.text(`EUR: ${netEUR.toFixed(2)} €`, 30, 140);

    let yPos = 160;
    doc.text("Expenses by Category:", 20, yPos);
    categoryData.forEach(({ name, value }) => {
      yPos += 10;
      doc.text(`${name}: ${value.toFixed(2)} ₪`, 30, yPos);
    });

    doc.save(`financial-report-${month}.pdf`);
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    const summaryData = [
      ["Monthly Financial Report"],
      ["Period", month],
      [],
      ["Income (ILS)", totalIncomeILS.toFixed(2)],
      ["Income (EUR)", totalIncomeEUR.toFixed(2)],
      [],
      ["Expenses (ILS)", totalExpensesILS.toFixed(2)],
      ["Expenses (EUR)", totalExpensesEUR.toFixed(2)],
      [],
      ["Net Profit (ILS)", netILS.toFixed(2)],
      ["Net Profit (EUR)", netEUR.toFixed(2)],
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");

    const categorySheet = XLSX.utils.json_to_sheet(categoryData);
    XLSX.utils.book_append_sheet(wb, categorySheet, "Expenses by Category");

    XLSX.writeFile(wb, `financial-report-${month}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4">Monthly Report - {month}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-emerald-500" />
              <span className="text-sm text-muted-foreground">Total Income</span>
            </div>
            <p className="text-2xl text-emerald-500 mb-1">{totalIncomeILS.toFixed(2)} ₪</p>
            <p className="text-sm text-muted-foreground">{totalIncomeEUR.toFixed(2)} €</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={20} className="text-red-500" />
              <span className="text-sm text-muted-foreground">Total Expenses</span>
            </div>
            <p className="text-2xl text-red-500 mb-1">{totalExpensesILS.toFixed(2)} ₪</p>
            <p className="text-sm text-muted-foreground">{totalExpensesEUR.toFixed(2)} €</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-br ${
              netILS >= 0 ? 'from-blue-500/10 to-blue-500/5 border-blue-500/20' : 'from-orange-500/10 to-orange-500/5 border-orange-500/20'
            } border rounded-lg p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className={netILS >= 0 ? 'text-blue-500' : 'text-orange-500'} />
              <span className="text-sm text-muted-foreground">Net Profit</span>
            </div>
            <p className={`text-2xl mb-1 ${netILS >= 0 ? 'text-blue-500' : 'text-orange-500'}`}>
              {netILS >= 0 ? '+' : ''}{netILS.toFixed(2)} ₪
            </p>
            <p className="text-sm text-muted-foreground">
              {netEUR >= 0 ? '+' : ''}{netEUR.toFixed(2)} €
            </p>
          </motion.div>
        </div>

        {categoryData.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="mb-4">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#ef4444" opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportPDF}
            className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-accent border border-border rounded-lg py-3 transition-colors"
          >
            <FileDown size={20} />
            <span>Export as PDF</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportExcel}
            className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-accent border border-border rounded-lg py-3 transition-colors"
          >
            <FileSpreadsheet size={20} />
            <span>Export as Excel</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
