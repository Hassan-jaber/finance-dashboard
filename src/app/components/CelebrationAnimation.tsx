import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";

interface CelebrationAnimationProps {
  onClose: () => void;
}

export function CelebrationAnimation({ onClose }: CelebrationAnimationProps) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#10b981", "#3b82f6", "#8b5cf6"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#10b981", "#3b82f6", "#8b5cf6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl p-12 text-center shadow-2xl"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Trophy size={80} className="text-white mx-auto mb-4" />
        </motion.div>
        <h2 className="text-4xl text-white mb-2">Target Reached! 🎉</h2>
        <p className="text-xl text-white/90">Congratulations on reaching your monthly goal!</p>
      </motion.div>
    </motion.div>
  );
}
