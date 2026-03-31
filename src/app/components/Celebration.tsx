import { motion } from "motion/react";
import { Trophy, X } from "lucide-react";
import { useEffect } from "react";

interface CelebrationProps {
  onClose: () => void;
}

export function Celebration({ onClose }: CelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
        }}
        className="relative bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl p-8 max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="text-center text-white">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="inline-block mb-4"
          >
            <Trophy size={64} />
          </motion.div>

          <h2 className="text-3xl mb-2">Congratulations!</h2>
          <p className="text-emerald-100 text-lg mb-4">
            You've reached your monthly target! 🎉
          </p>

          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm text-emerald-50">
              Keep up the great work tracking your finances!
            </p>
          </div>
        </div>

        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100 + "%",
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: "120%",
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: [
                  "#fbbf24",
                  "#f59e0b",
                  "#ef4444",
                  "#ec4899",
                  "#8b5cf6",
                  "#3b82f6",
                  "#10b981",
                ][i % 7],
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
