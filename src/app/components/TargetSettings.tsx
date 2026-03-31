import { useState } from "react";
import { Target, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TargetSettingsProps {
  targetILS: number;
  targetEUR: number;
  onUpdateTarget: (ils: number, eur: number) => void;
}

export function TargetSettings({ targetILS, targetEUR, onUpdateTarget }: TargetSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ils, setIls] = useState(targetILS.toString());
  const [eur, setEur] = useState(targetEUR.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ilsValue = parseFloat(ils) || 0;
    const eurValue = parseFloat(eur) || 0;
    onUpdateTarget(ilsValue, eurValue);
    setIsOpen(false);
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Target size={20} />}
        <span>{isOpen ? "Cancel" : "Set Monthly Target"}</span>
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
                <label className="block text-sm mb-2">Target in ILS (₪)</label>
                <input
                  type="number"
                  step="0.01"
                  value={ils}
                  onChange={(e) => setIls(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Target in EUR (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={eur}
                  onChange={(e) => setEur(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.00"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Update Target
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
