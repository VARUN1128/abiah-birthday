"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { abiah } from "@/data/abiah";

interface Props {
  onNext: () => void;
}

const floatingItems = [
  { emoji: "⭐", top: "8%", left: "4%", delay: 0, rot: "-8deg" },
  { emoji: "🍒", top: "6%", right: "6%", delay: 0.3, rot: "10deg" },
  { emoji: "🌸", bottom: "20%", left: "5%", delay: 0.7, rot: "-5deg" },
  { emoji: "🎀", bottom: "15%", right: "4%", delay: 0.5, rot: "8deg" },
  { emoji: "⭐", top: "40%", left: "2%", delay: 1, rot: "3deg" },
];

export default function IntroScreen({ onNext }: Props) {
  return (
    <div
      className="screen-wrap min-h-screen paper-texture"
      style={{ background: "var(--cream)" }}
    >
      {/* Floating decorations */}
      {floatingItems.map((item, i) => (
        <motion.span
          key={i}
          className="fixed text-3xl select-none pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          } as React.CSSProperties}
          animate={{ y: [0, -8, 0], rotate: [parseFloat(item.rot), parseFloat(item.rot) + 3, parseFloat(item.rot)] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* ── Hero Section ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-10 relative">
        {/* Gingham ribbon bar at top */}
        <div
          className="fixed top-0 left-0 right-0 h-3 z-50"
          style={{ background: "repeating-linear-gradient(90deg, var(--blush) 0, var(--blush) 10px, var(--rose) 10px, var(--rose) 20px)" }}
        />

        {/* Editorial headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <p
            className="uppercase tracking-widest text-xs mb-4"
            style={{ color: "var(--rose)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.3em" }}
          >
            ✦ Birthday Edition ✦
          </p>
          <h1
            className="leading-none mb-2"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 300,
              color: "var(--berry)",
              lineHeight: 0.9,
            }}
          >
            Happy
          </h1>
          <h1
            className="leading-none italic"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 600,
              color: "var(--cherry)",
              lineHeight: 0.95,
            }}
          >
            Birthday,
          </h1>
          <h1
            className="leading-none mt-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: 300,
              color: "var(--berry)",
              lineHeight: 0.9,
            }}
          >
            {abiah.name}
          </h1>
        </motion.div>

        {/* Handwritten annotation */}
        <motion.p
          initial={{ opacity: 0, rotate: -2 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center mb-10"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "1.5rem",
            color: "var(--cherry)",
            transform: "rotate(-2deg)",
          }}
        >
          today is your day ♡
        </motion.p>

        {/* Photo collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full max-w-2xl h-72 md:h-96 mb-12"
        >
          {/* Photo 1 — left, rotated */}
          <div
            className="polaroid absolute"
            style={{ width: "38%", left: "2%", top: "5%", transform: "rotate(-4deg)" }}
          >
            <Image
              src="/photos/memory_cafe.png"
              alt="A favourite memory"
              width={300} height={250}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p className="mt-2 text-center text-xs" style={{ fontFamily: "var(--font-dancing)", color: "var(--berry)", fontSize: "0.9rem" }}>
              the best afternoons
            </p>
          </div>

          {/* Photo 2 — centre, slight right tilt */}
          <div
            className="polaroid absolute"
            style={{ width: "42%", left: "30%", top: "0%", transform: "rotate(2deg)", zIndex: 2 }}
          >
            <Image
              src="/photos/memory_flowers.png"
              alt="Favourite flowers"
              width={300} height={250}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p className="mt-2 text-center text-xs" style={{ fontFamily: "var(--font-dancing)", color: "var(--berry)", fontSize: "0.9rem" }}>
              your little garden
            </p>
          </div>

          {/* Photo 3 — right */}
          <div
            className="polaroid absolute"
            style={{ width: "36%", right: "0%", top: "15%", transform: "rotate(5deg)" }}
          >
            <Image
              src="/photos/memory_sunset.png"
              alt="Golden hour"
              width={300} height={250}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p className="mt-2 text-center text-xs" style={{ fontFamily: "var(--font-dancing)", color: "var(--berry)", fontSize: "0.9rem" }}>
              golden hours
            </p>
          </div>

          {/* Washi tape strips */}
          <div className="washi absolute" style={{ background: "rgba(236,166,186,0.55)", width: "60px", top: "-4px", left: "18%", transform: "rotate(-3deg)" }} />
          <div className="washi absolute" style={{ background: "rgba(185,46,69,0.25)", width: "50px", top: "2px", left: "58%", transform: "rotate(5deg)" }} />
          <div className="washi absolute" style={{ background: "rgba(247,221,229,0.8)", width: "45px", top: "10px", right: "3%", transform: "rotate(-7deg)" }} />

          {/* Handwritten note card */}
          <motion.div
            className="absolute -bottom-4 right-12"
            style={{ transform: "rotate(3deg)", zIndex: 5 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div
              className="px-4 py-3 rounded-sm shadow-md"
              style={{ background: "#fff", border: "1px solid var(--blush)", minWidth: 140 }}
            >
              <p style={{ fontFamily: "var(--font-dancing)", color: "var(--cherry)", fontSize: "1.1rem" }}>
                scroll down ↓
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="max-w-md text-center leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-dm-sans)", color: "var(--berry)", opacity: 0.85, fontSize: "1.05rem" }}
        >
          I made you a little world — full of memories, wishes, hidden messages
          and all the things I&apos;d want you to know on your birthday.
        </motion.p>

        {/* Next button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={onNext}
          className="px-10 py-3.5 rounded-full text-sm font-medium tracking-wide"
          style={{
            background: "var(--cherry)",
            color: "#fff",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
          }}
          whileHover={{ scale: 1.04, boxShadow: "0 6px 28px rgba(185,46,69,0.38)" }}
          whileTap={{ scale: 0.97 }}
          aria-label="Continue to Memory Museum"
        >
          Explore your little world →
        </motion.button>
      </section>

      {/* Torn paper bottom edge */}
      <div className="torn-bottom h-8 w-full" style={{ background: "var(--blush)" }} />
    </div>
  );
}
