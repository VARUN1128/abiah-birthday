"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      setTimeout(onOpen, 500);
    }, 1200);
  };

  return (
    <div
      className="screen-wrap paper-texture flex flex-col items-center justify-center min-h-screen"
      style={{ background: "var(--cream)" }}
    >
      {/* Floating decorations */}
      <motion.span
        className="fixed text-4xl select-none pointer-events-none"
        style={{ top: "8%", left: "6%", "--rot": "-12deg" } as React.CSSProperties}
        animate={{ y: [0, -10, 0], rotate: [-12, -10, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >🍒</motion.span>
      <motion.span
        className="fixed text-3xl select-none pointer-events-none"
        style={{ top: "12%", right: "8%" } as React.CSSProperties}
        animate={{ y: [0, 8, 0], rotate: [8, 10, 8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >⭐</motion.span>
      <motion.span
        className="fixed text-2xl select-none pointer-events-none"
        style={{ bottom: "18%", left: "10%" } as React.CSSProperties}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >🎀</motion.span>
      <motion.span
        className="fixed text-3xl select-none pointer-events-none"
        style={{ bottom: "14%", right: "7%" } as React.CSSProperties}
        animate={{ y: [0, 7, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >🌸</motion.span>

      {/* Whisper text */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-10 text-sm tracking-widest uppercase"
        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--rose)", letterSpacing: "0.2em" }}
      >
        Psst… Abiah, this one's from a friend 🎀
      </motion.p>

      {/* Envelope SVG */}
      <motion.div
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        whileHover={{ scale: phase === "idle" ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ width: "clamp(280px, 40vw, 420px)" }}
        aria-label="Open the envelope"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-xl">
          {/* Envelope body */}
          <rect x="4" y="60" width="412" height="236" rx="8" fill="#fff" stroke="#ECA6BA" strokeWidth="2"/>
          {/* Bottom triangle */}
          <path d="M4 296 L210 165 L416 296 Z" fill="#FFF8F0" stroke="#ECA6BA" strokeWidth="1.5"/>
          {/* Side flaps */}
          <path d="M4 60 L210 175 L4 296" fill="#F7DDE5" stroke="#ECA6BA" strokeWidth="1"/>
          <path d="M416 60 L210 175 L416 296" fill="#F7DDE5" stroke="#ECA6BA" strokeWidth="1"/>

          {/* Top flap — animates open */}
          <motion.path
            d="M4 60 L210 185 L416 60 Q208 0 4 60 Z"
            fill={phase !== "idle" ? "#B92E45" : "#ECA6BA"}
            stroke="#B92E45"
            strokeWidth="1.5"
            style={{ transformOrigin: "210px 60px" }}
            animate={
              phase === "opening" || phase === "done"
                ? { rotateX: -165 }
                : { rotateX: 0 }
            }
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />

          {/* Wax seal */}
          <motion.circle
            cx="210" cy="190"
            r="22"
            fill="#B92E45"
            animate={phase !== "idle" ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.text
            x="210" y="196"
            textAnchor="middle"
            fontSize="18"
            fill="white"
            style={{ fontFamily: "serif" }}
            animate={phase !== "idle" ? { opacity: 0 } : { opacity: 1 }}
          >♡</motion.text>

          {/* Letter peek */}
          <AnimatePresence>
            {phase !== "idle" && (
              <motion.g
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <rect x="130" y="80" width="160" height="110" rx="4" fill="#FFF8F0" stroke="#ECA6BA" strokeWidth="1"/>
                <line x1="150" y1="110" x2="290" y2="110" stroke="#ECA6BA" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="150" y1="128" x2="290" y2="128" stroke="#ECA6BA" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="150" y1="146" x2="250" y2="146" stroke="#ECA6BA" strokeWidth="1.5" strokeDasharray="4 4"/>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Ribbon bow on top */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >🎀</motion.div>
      </motion.div>

      {/* CTA */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.button
            key="open-btn"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            onClick={handleClick}
            className="mt-12 px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all"
            style={{
              background: "var(--cherry)",
              color: "#fff",
              fontFamily: "var(--font-dm-sans)",
              letterSpacing: "0.12em",
              boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 6px 28px rgba(185,46,69,0.38)" }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open envelope"
          >
            Open your gift ♡
          </motion.button>
        )}
        {(phase === "opening" || phase === "done") && (
          <motion.p
            key="opening-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-sm"
            style={{ color: "var(--rose)", fontFamily: "var(--font-dancing)" }}
          >
            Just for you…
          </motion.p>
        )}
      </AnimatePresence>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="mt-8 text-center"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.8rem, 6vw, 5rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "var(--berry)",
          lineHeight: 1.1,
        }}
      >
        Abiah&apos;s Little World
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-3 text-center text-sm"
        style={{ color: "var(--rose)", fontFamily: "var(--font-dancing)", fontSize: "1.25rem" }}
      >
        A birthday surprise from your friend Shalom ✨
      </motion.p>
    </div>
  );
}
