"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  onReplay: () => void;
}

export default function EndingScreen({ onReplay }: Props) {
  const [copied, setCopied] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "sharing" | "done">("idle");

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = useCallback(async () => {
    setShareStatus("sharing");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Abiah's Little World 🎀",
          text: "A special birthday gift — a little digital world just for you ♡",
          url: shareUrl,
        });
        setShareStatus("done");
      } catch {
        setShareStatus("idle");
      }
    } else {
      // Fallback: copy link
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setShareStatus("done");
        setTimeout(() => { setCopied(false); setShareStatus("idle"); }, 3000);
      } catch {
        setShareStatus("idle");
      }
    }
  }, [shareUrl]);

  return (
    <div
      className="screen-wrap min-h-screen paper-texture gingham flex flex-col items-center justify-center"
      style={{ background: "var(--blush)" }}
    >
      {/* Floating decorations */}
      {["🍒","⭐","🌸","🎀","⭐","🍒"].map((em, i) => (
        <motion.span
          key={i}
          className="fixed text-3xl select-none pointer-events-none"
          style={{
            top: `${8 + i * 14}%`,
            left: i % 2 === 0 ? `${4 + i * 2}%` : undefined,
            right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
          } as React.CSSProperties}
          animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 6 : -6, 0] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {em}
        </motion.span>
      ))}

      <div className="max-w-xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Animated hearts */}
        <div className="flex gap-2 mb-8">
          {[0,1,2,3,4].map((i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="text-2xl"
              style={{ color: "var(--cherry)" }}
            >
              ♡
            </motion.span>
          ))}
        </div>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--cherry)",
            lineHeight: 1.05,
          }}
        >
          Happy Birthday, Abiah! 🎂
        </motion.h2>

        {/* Handwritten note */}
        <motion.p
          initial={{ opacity: 0, rotate: -2 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-8 mb-2"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "1.4rem",
            color: "var(--berry)",
            transform: "rotate(-2deg)",
          }}
        >
          glad to be your friend 🎀
        </motion.p>

        {/* Small paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-6 leading-relaxed max-w-sm"
          style={{ fontFamily: "var(--font-dm-sans)", color: "var(--berry)", opacity: 0.8, fontSize: "0.95rem" }}
        >
          I hope this little world made you smile. From one friend to another — you're brilliant, and I hope this year treats you exactly as well as you deserve. ✨
        </motion.p>

        {/* Big bow */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 16 }}
          className="my-10 text-8xl"
        >
          🎀
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {/* Replay */}
          <button
            onClick={onReplay}
            className="px-8 py-3 rounded-full text-sm font-medium"
            style={{
              background: "var(--cream)",
              color: "var(--berry)",
              fontFamily: "var(--font-dm-sans)",
              border: "1px solid var(--rose)",
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--blush)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cream)")}
            aria-label="Start over from the beginning"
          >
            ↺ Start again
          </button>

          {/* Share */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            disabled={shareStatus === "sharing"}
            className="px-8 py-3 rounded-full text-sm font-medium"
            style={{
              background: "var(--cherry)",
              color: "#fff",
              fontFamily: "var(--font-dm-sans)",
              letterSpacing: "0.08em",
              boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
              cursor: shareStatus === "sharing" ? "wait" : "pointer",
              border: "none",
            }}
            aria-label="Share this page"
          >
            {copied
              ? "Link copied! ✓"
              : shareStatus === "done"
              ? "Shared! ✓"
              : shareStatus === "sharing"
              ? "Sharing…"
              : "Share this ♡"}
          </motion.button>
        </motion.div>

        {/* Year stamp */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.6 }}
          className="mt-14 text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-dm-sans)", color: "var(--berry)", letterSpacing: "0.25em" }}
        >
          Abiah&apos;s Little World
        </motion.p>
      </div>
    </div>
  );
}
