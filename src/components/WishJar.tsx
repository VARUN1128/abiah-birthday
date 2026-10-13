"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { abiah } from "@/data/abiah";

interface Props {
  onNext: () => void;
}

export default function WishJar({ onNext }: Props) {
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shownIndices, setShownIndices] = useState<number[]>([]);
  const lastIndex = useRef<number>(-1);

  const pickWish = useCallback(() => {
    if (isAnimating) return;

    // Build pool: exclude last used, prefer unseen
    const available = abiah.wishes.map((_, i) => i).filter(
      (i) => i !== lastIndex.current
    );
    const unseen = available.filter((i) => !shownIndices.includes(i));
    const pool = unseen.length > 0 ? unseen : available;
    const idx = pool[Math.floor(Math.random() * pool.length)];

    setIsAnimating(true);
    setCurrentWish(null);

    setTimeout(() => {
      setCurrentWish(abiah.wishes[idx]);
      setShownIndices((prev) => {
        const next = [...prev, idx];
        return next.length >= abiah.wishes.length ? [idx] : next;
      });
      lastIndex.current = idx;
      setIsAnimating(false);
    }, 350);
  }, [isAnimating, shownIndices]);

  return (
    <div
      className="screen-wrap min-h-screen paper-texture"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ color: "var(--cherry)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.3em" }}
          >
            ✦ Screen IV ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--berry)",
            }}
          >
            The Wish Jar
          </h2>
          <p
            className="mt-2"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "1.3rem", color: "var(--cherry)" }}
          >
            tap the jar to draw a wish ♡
          </p>
        </motion.div>

        {/* Jar SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 200 }}
          className="relative cursor-pointer mb-8"
          onClick={pickWish}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && pickWish()}
          aria-label="Tap to draw a wish from the jar"
          style={{ userSelect: "none" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: [-2, 2, -2, 0] }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "clamp(180px, 35vw, 260px)" }}>
              {/* Jar lid */}
              <rect x="52" y="20" width="96" height="24" rx="6" fill="#B92E45"/>
              <rect x="46" y="30" width="108" height="14" rx="5" fill="#4C2834"/>

              {/* Jar body */}
              <path d="M30 50 Q28 80 26 120 Q24 170 28 220 Q32 250 100 252 Q168 250 172 220 Q176 170 174 120 Q172 80 170 50 Z"
                fill="white" fillOpacity="0.85" stroke="#ECA6BA" strokeWidth="2"/>

              {/* Paper notes inside jar */}
              {[...Array(8)].map((_, i) => {
                const x = 45 + (i % 4) * 30;
                const y = 180 - Math.floor(i / 4) * 40;
                const rot = [-8, 12, -5, 15, -10, 8, -3, 14][i];
                const colors = ["#F7DDE5", "#ECA6BA", "#FFF8F0", "#F7DDE5", "#ECA6BA", "#FFF8F0", "#F7DDE5", "#ECA6BA"];
                return (
                  <motion.rect
                    key={i}
                    x={x} y={y} width="26" height="32" rx="2"
                    fill={colors[i]}
                    stroke="rgba(236,166,186,0.4)" strokeWidth="0.5"
                    style={{ transformOrigin: `${x + 13}px ${y + 16}px`, transform: `rotate(${rot}deg)` }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                );
              })}

              {/* Jar shine */}
              <ellipse cx="70" cy="120" rx="8" ry="30" fill="white" fillOpacity="0.3"/>
              <ellipse cx="60" cy="80" rx="4" ry="12" fill="white" fillOpacity="0.4"/>

              {/* Lid bow */}
              <text x="100" y="18" textAnchor="middle" fontSize="18" fill="#B92E45">🎀</text>
            </svg>
          </motion.div>

          {/* Shimmer hint */}
          {!currentWish && !isAnimating && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs"
              style={{ fontFamily: "var(--font-dancing)", color: "var(--rose)", fontSize: "1rem", whiteSpace: "nowrap" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              tap me ✨
            </motion.div>
          )}
        </motion.div>

        {/* Wish note display */}
        <div className="w-full min-h-32 flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            {isAnimating && (
              <motion.div
                key="picking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🎀
                </motion.span>
              </motion.div>
            )}
            {currentWish && !isAnimating && (
              <motion.div
                key={currentWish}
                initial={{ opacity: 0, scale: 0.85, y: 20, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="wish-note max-w-sm w-full"
                style={{ transform: "rotate(-1deg)" }}
              >
                <p
                  className="text-center leading-relaxed"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.35rem",
                    fontStyle: "italic",
                    color: "var(--berry)",
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{currentWish}&rdquo;
                </p>
                <p className="text-right mt-3" style={{ fontFamily: "var(--font-dancing)", color: "var(--rose)", fontSize: "0.95rem" }}>
                  — from your jar ♡
                </p>
              </motion.div>
            )}
            {!currentWish && !isAnimating && (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-center"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--rose)", fontSize: "0.9rem" }}
              >
                {shownIndices.length > 0
                  ? "Tap again for another wish ✨"
                  : "Your birthday wishes are waiting inside…"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Counter */}
        {shownIndices.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="mt-6 text-xs"
            style={{ fontFamily: "var(--font-dm-sans)", color: "var(--rose)" }}
          >
            {shownIndices.length} of {abiah.wishes.length} wishes discovered
          </motion.p>
        )}

        {/* Next */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="mt-12 px-10 py-3.5 rounded-full text-sm font-medium tracking-wide"
          style={{
            background: "var(--cherry)",
            color: "#fff",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
          }}
          aria-label="Continue to hidden surprises"
        >
          Find the hidden surprises →
        </motion.button>
      </div>
    </div>
  );
}
