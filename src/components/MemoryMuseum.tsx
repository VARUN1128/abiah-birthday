"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { abiah, type Memory } from "@/data/abiah";

interface Props {
  onNext: () => void;
}

export default function MemoryMuseum({ onNext }: Props) {
  const [selected, setSelected] = useState<Memory | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const openMemory = useCallback((m: Memory) => setSelected(m), []);
  const closeMemory = useCallback(() => setSelected(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!selected) return;
      const idx = abiah.memories.findIndex((m) => m.id === selected.id);
      const next = abiah.memories[(idx + dir + abiah.memories.length) % abiah.memories.length];
      setSelected(next);
    },
    [selected]
  );

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) navigate(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  const rotations = [-3, 2, -1, 4, -2, 3];

  return (
    <div
      className="screen-wrap min-h-screen paper-texture"
      style={{ background: "var(--blush)" }}
    >
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ color: "var(--cherry)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.3em" }}
          >
            ✦ Screen III ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "var(--berry)",
              lineHeight: 1.1,
            }}
          >
            The Memory Museum
          </h2>
          <p
            className="mt-3"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "1.3rem", color: "var(--cherry)", transform: "rotate(-1.5deg)", display: "block" }}
          >
            tap any photo to remember ♡
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {abiah.memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40, rotate: rotations[i] }}
              animate={{ opacity: 1, y: 0, rotate: rotations[i] }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="polaroid"
              style={{ transform: `rotate(${rotations[i]}deg)` }}
              onClick={() => openMemory(memory)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openMemory(memory)}
              aria-label={`Open memory: ${memory.caption}`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={memory.src}
                  alt={memory.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 30vw"
                />
              </div>
              <p
                className="mt-2 text-center"
                style={{ fontFamily: "var(--font-dancing)", color: "var(--berry)", fontSize: "0.95rem", lineHeight: 1.3 }}
              >
                {memory.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Next button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="px-10 py-3.5 rounded-full text-sm font-medium tracking-wide"
            style={{
              background: "var(--cherry)",
              color: "#fff",
              fontFamily: "var(--font-dm-sans)",
              letterSpacing: "0.1em",
              boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
            }}
            aria-label="Continue to Wish Jar"
          >
            Continue to the Wish Jar →
          </motion.button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(76,40,52,0.85)", backdropFilter: "blur(8px)" }}
            onClick={closeMemory}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={`Memory: ${selected.caption}`}
          >
            <motion.div
              key={selected.id}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="polaroid max-w-md w-full relative"
              style={{ transform: "rotate(0deg)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeMemory}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm z-10 shadow-lg"
                style={{ background: "var(--cherry)" }}
                aria-label="Close lightbox"
              >
                ✕
              </button>

              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={selected.src}
                  alt={selected.caption}
                  fill
                  className="object-cover"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Caption */}
              <p
                className="mt-3 text-center"
                style={{ fontFamily: "var(--font-dancing)", color: "var(--berry)", fontSize: "1.1rem" }}
              >
                {selected.caption}
              </p>

              {/* Memory text */}
              <p
                className="mt-3 text-center leading-relaxed pb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--berry)", fontSize: "0.9rem", opacity: 0.85 }}
              >
                {selected.memoryText}
              </p>

              {/* Nav arrows */}
              <div className="absolute -left-5 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: "var(--cream)", color: "var(--cherry)", fontSize: "1.2rem" }}
                  aria-label="Previous memory"
                >‹</button>
              </div>
              <div className="absolute -right-5 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(1); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: "var(--cream)", color: "var(--cherry)", fontSize: "1.2rem" }}
                  aria-label="Next memory"
                >›</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
