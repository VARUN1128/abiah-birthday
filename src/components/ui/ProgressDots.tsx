"use client";

import { motion } from "framer-motion";

const SCREENS = [
  { label: "Invitation" },
  { label: "Introduction" },
  { label: "Memories" },
  { label: "Wishes" },
  { label: "Surprises" },
  { label: "Cake" },
  { label: "Letter" },
  { label: "Ending" },
];

interface Props {
  current: number;
  onNavigate?: (index: number) => void;
}

export default function ProgressDots({ current, onNavigate }: Props) {
  return (
    <nav
      className="fixed left-1/2 z-50 hidden sm:block"
      style={{
        transform: "translateX(-50%)",
        bottom: "max(1.25rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))",
      }}
      aria-label="Progress navigation"
    >
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: "rgba(255,248,240,0.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(236,166,186,0.4)",
          boxShadow: "0 4px 20px rgba(76,40,52,0.1)",
        }}
      >
        {SCREENS.map((screen, i) => (
          <motion.button
            key={i}
            onClick={() => onNavigate?.(i)}
            aria-label={`Go to ${screen.label}`}
            aria-current={i === current ? "step" : undefined}
            title={screen.label}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            <motion.div
              animate={{
                width: i === current ? 20 : 8,
                background: i === current ? "#B92E45" : i < current ? "#ECA6BA" : "rgba(185,46,69,0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                height: 8,
                borderRadius: 4,
              }}
            />
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
