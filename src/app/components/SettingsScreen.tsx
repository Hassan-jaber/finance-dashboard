import { useState } from "react";
import { Target, Download, Trash2, Info } from "lucide-react";
import { motion } from "motion/react";

interface SettingsScreenProps {
  targetILS: number;
  targetEUR: number;
  onUpdateTarget: (ils: number, eur: number) => void;
  onClearAllData: () => void;
}

export function SettingsScreen({
  targetILS,
  targetEUR,
  onUpdateTarget,
  onClearAllData,
}: SettingsScreenProps) {
  const [editingTarget, setEditingTarget] = useState(false);
  const [newTargetILS, setNewTargetILS] = useState(targetILS.toString());
  const [newTargetEUR, setNewTargetEUR] = useState(targetEUR.toString());

  const handleSaveTarget = () => {
    const ils = parseFloat(newTargetILS);
    const eur = parseFloat(newTargetEUR);

    if (!isNaN(ils) && !isNaN(eur) && ils > 0 && eur > 0) {
      onUpdateTarget(ils, eur);
      setEditingTarget(false);
    }
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      onClearAllData();
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">Settings</h2>
        <p className="text-muted-foreground">Manage your finance tracker</p>
      </div>

      {/* Monthly Target Settings */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Target size={20} className="text-blue-500" />
          </div>
          <div>
            <h3>Monthly Target</h3>
            <p className="text-sm text-muted-foreground">
              Set your income goal for each month
            </p>
          </div>
        </div>

        {!editingTarget ? (
          <div className="bg-background/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Target (ILS)</span>
              <span className="text-xl">{targetILS.toFixed(0)} ₪</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Target (EUR)</span>
              <span className="text-xl">{targetEUR.toFixed(0)} €</span>
            </div>
            <button
              onClick={() => setEditingTarget(true)}
              className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit Target
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Target (ILS ₪)
              </label>
              <input
                type="number"
                value={newTargetILS}
                onChange={(e) => setNewTargetILS(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Target (EUR €)
              </label>
              <input
                type="number"
                value={newTargetEUR}
                onChange={(e) => setNewTargetEUR(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveTarget}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingTarget(false);
                  setNewTargetILS(targetILS.toString());
                  setNewTargetEUR(targetEUR.toString());
                }}
                className="flex-1 bg-card border border-border py-3 rounded-xl hover:bg-accent transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Storage Info */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500/10 p-2 rounded-lg">
            <Info size={20} className="text-purple-500" />
          </div>
          <div>
            <h3>Data Storage</h3>
            <p className="text-sm text-muted-foreground">
              Your data is stored locally in your browser
            </p>
          </div>
        </div>

        <div className="bg-background/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            This app uses <span className="text-foreground font-medium">localStorage</span> to
            save your financial data directly on your device. Your data never leaves your
            browser and works completely offline.
          </p>
        </div>
      </div>

      {/* Quick Add Values (Info Only) */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="mb-2">Quick Add Values</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Default quick-add buttons on home screen
          </p>
        </div>

        <div className="bg-background/50 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Primary:</span>
              <span className="text-emerald-500">+5 ₪</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Secondary:</span>
              <span className="text-emerald-500">+10 ₪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/10 p-2 rounded-lg">
            <Trash2 size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-red-500">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete all your data
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClearData}
          className="w-full bg-red-500/20 border border-red-500/30 text-red-500 py-3 rounded-xl hover:bg-red-500/30 transition-colors"
        >
          Clear All Data
        </motion.button>
      </div>
    </div>
  );
}
