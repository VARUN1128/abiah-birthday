"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { abiah } from "@/data/abiah";

interface Props {
  onNext: () => void;
}

export default function HiddenSurprises({ onNext }: Props) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const reveal = (id: string) =>
    setRevealed((prev) => new Set([...prev, id]));

  // Desktop: fixed positions for stickers across the canvas
  const positions = [
    { top: "18%", left: "12%", rot: -10 },
    { top: "10%", right: "15%", rot: 7 },
    { top: "52%", left: "6%", rot: -5 },
    { top: "60%", right: "8%", rot: 12 },
    { top: "35%", left: "42%", rot: -3 },
  ];

  return (
    <div
      className="screen-wrap min-h-screen paper-texture"
      style={{ background: "var(--blush)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ color: "var(--cherry)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.3em" }}
          >
            ✦ Screen V ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--berry)",
            }}
          >
            Hidden Surprises
          </h2>
          <p
            className="mt-2"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "clamp(1rem, 3vw, 1.3rem)", color: "var(--cherry)" }}
          >
            look carefully — something is hiding ✨
          </p>
        </motion.div>

        {/* Hint badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 px-5 py-2 rounded-full text-xs"
          style={{
            background: "rgba(185,46,69,0.1)",
            border: "1px solid rgba(185,46,69,0.2)",
            color: "var(--cherry)",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.1em",
          }}
        >
          {revealed.size} / {abiah.hiddenMessages.length} found
        </motion.div>

        {/* ── Mobile: Card Grid ── */}
        <div className="sm:hidden w-full grid grid-cols-1 gap-4 mb-10">
          {abiah.hiddenMessages.map((item, i) => {
            const isRevealed = revealed.has(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: "var(--cream)", border: "1px solid rgba(236,166,186,0.4)" }}
              >
                {!isRevealed ? (
                  <motion.button
                    className="w-full flex items-center gap-4 p-4"
                    onClick={() => reveal(item.id)}
                    whileTap={{ scale: 0.97 }}
                    style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", minHeight: "64px" }}
                    aria-label={`Discover hidden message ${i + 1}`}
                  >
                    <span className="text-4xl flex-shrink-0">{item.label}</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-dancing)", color: "var(--cherry)", fontSize: "1.1rem" }}>tap to reveal</p>
                      <motion.span
                        className="text-xs block mt-0.5"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--rose)", fontSize: "0.75rem", letterSpacing: "0.05em" }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✨ something is hiding here…
                      </motion.span>
                    </div>
                  </motion.button>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0 mt-0.5">{item.label}</span>
                        <p
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "1.1rem",
                            fontStyle: "italic",
                            color: "var(--berry)",
                            lineHeight: 1.55,
                          }}
                        >
                          {item.message}
                        </p>
                      </div>
                      <button
                        onClick={() => setRevealed((prev) => { const s = new Set(prev); s.delete(item.id); return s; })}
                        className="mt-2 text-xs"
                        style={{ color: "var(--rose)", fontFamily: "var(--font-dm-sans)", background: "none", border: "none", cursor: "pointer", minHeight: "32px" }}
                        aria-label="Dismiss this message"
                      >
                        hide ✕
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}

          {/* All found celebration */}
          <AnimatePresence>
            {revealed.size === abiah.hiddenMessages.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <p
                  style={{
                    fontFamily: "var(--font-dancing)",
                    fontSize: "1.6rem",
                    color: "var(--cherry)",
                  }}
                >
                  You found them all! ✨🎀✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Desktop: Canvas with absolute positions ── */}
        <div className="hidden sm:block relative w-full" style={{ minHeight: "520px" }}>
          {abiah.hiddenMessages.map((item, i) => {
            const pos = positions[i] ?? { top: `${20 + i * 15}%`, left: "50%", rot: 0 };
            const isRevealed = revealed.has(item.id);

            return (
              <motion.div
                key={item.id}
                className="absolute"
                style={{
                  top: pos.top,
                  left: (pos as { left?: string }).left,
                  right: (pos as { right?: string }).right,
                  transform: `rotate(${pos.rot}deg)`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 250 }}
              >
                {!isRevealed ? (
                  <motion.button
                    className="surprise-hint text-4xl md:text-5xl cursor-pointer select-none flex flex-col items-center gap-1"
                    onClick={() => reveal(item.id)}
                    aria-label={`Discover hidden message ${i + 1}`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ background: "none", border: "none", padding: "8px", minHeight: "56px", minWidth: "56px" }}
                  >
                    <span>{item.label}</span>
                    <motion.span
                      className="text-xs block"
                      style={{ fontFamily: "var(--font-dancing)", color: "var(--cherry)", fontSize: "0.85rem" }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      tap me
                    </motion.span>
                  </motion.button>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      key="revealed"
                      initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
                      animate={{ scale: 1, opacity: 1, rotate: pos.rot }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="wish-note"
                      style={{ maxWidth: "clamp(180px, 30vw, 260px)", minWidth: "160px" }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-2xl flex-shrink-0">{item.label}</span>
                        <p
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "1.05rem",
                            fontStyle: "italic",
                            color: "var(--berry)",
                            lineHeight: 1.45,
                          }}
                        >
                          {item.message}
                        </p>
                      </div>
                      <button
                        onClick={() => setRevealed((prev) => { const s = new Set(prev); s.delete(item.id); return s; })}
                        className="text-xs mt-1"
                        style={{ color: "var(--rose)", fontFamily: "var(--font-dm-sans)", background: "none", border: "none", cursor: "pointer" }}
                        aria-label="Dismiss this message"
                      >
                        hide ✕
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}

          {/* Decorative SVG lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 520"
            fill="none"
            style={{ opacity: 0.12 }}
          >
            <path d="M100 80 Q200 40 300 120 Q400 200 500 80 Q600 -20 700 100" stroke="#B92E45" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round"/>
            <path d="M50 300 Q150 350 250 280 Q350 200 450 320 Q550 420 700 350" stroke="#ECA6BA" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round"/>
            <circle cx="200" cy="200" r="60" stroke="#B92E45" strokeWidth="1" strokeDasharray="4 6"/>
            <circle cx="600" cy="350" r="40" stroke="#ECA6BA" strokeWidth="1" strokeDasharray="4 6"/>
          </svg>

          {/* All found celebration */}
          <AnimatePresence>
            {revealed.size === abiah.hiddenMessages.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
              >
                <p
                  style={{
                    fontFamily: "var(--font-dancing)",
                    fontSize: "1.8rem",
                    color: "var(--cherry)",
                  }}
                >
                  You found them all! ✨🎀✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="mt-8 sm:mt-12 px-8 sm:px-10 py-3.5 rounded-full text-sm font-medium tracking-wide"
          style={{
            background: "var(--cherry)",
            color: "#fff",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
            minHeight: "48px",
          }}
          aria-label="Continue to Birthday Cake"
        >
          Time for cake! 🎂 →
        </motion.button>
      </div>
    </div>
  );
}
