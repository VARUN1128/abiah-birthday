"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { abiah } from "@/data/abiah";

interface Props {
  onNext: () => void;
}

const TYPING_SPEED = 28; // ms per character

export default function FinalLetter({ onNext }: Props) {
  const { salutation, body, closing, signature } = abiah.letter;
  // Build full text as paragraphs
  const paragraphs = [salutation, ...body, closing, signature];

  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentPara, setCurrentPara] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const skipToEnd = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayed(paragraphs);
    setCurrentPara(paragraphs.length);
    setDone(true);
    setSkipped(true);
  }, [paragraphs]);

  useEffect(() => {
    if (done || skipped) return;
    if (currentPara >= paragraphs.length) {
      setDone(true);
      return;
    }

    const para = paragraphs[currentPara];
    intervalRef.current = setInterval(() => {
      setCurrentChar((prev) => {
        if (prev >= para.length) {
          clearInterval(intervalRef.current!);
          // Move to next paragraph after short pause
          setTimeout(() => {
            setDisplayed((d) => [...d, para]);
            setCurrentPara((p) => p + 1);
            setCurrentChar(0);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_SPEED);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [currentPara, done, skipped, paragraphs]);

  const isTyping = !done && currentPara < paragraphs.length;
  const currentTypingText = isTyping ? paragraphs[currentPara].slice(0, currentChar) : "";

  return (
    <div
      className="screen-wrap min-h-screen paper-texture flex flex-col items-center justify-center"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-16 w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ color: "var(--cherry)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.3em" }}
          >
            ✦ Screen VII ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--berry)",
            }}
          >
            A Letter For You
          </h2>
        </motion.div>

        {/* Letter paper */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -0.5 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full relative"
          style={{
            background: "#FFFDF8",
            border: "1px solid rgba(236,166,186,0.35)",
            borderRadius: "2px",
            padding: "clamp(1rem, 5vw, 3rem)",
            boxShadow: "0 8px 40px rgba(76,40,52,0.1), 4px 4px 0 rgba(236,166,186,0.2)",
            minHeight: "380px",
            transform: "rotate(-0.5deg)",
          }}
        >
          {/* Lined paper effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 35px, rgba(236,166,186,0.15) 35px, rgba(236,166,186,0.15) 36px)",
              backgroundPositionY: "52px",
              borderRadius: "2px",
            }}
          />

          {/* Red margin line — only on wider screens */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none hidden sm:block"
            style={{ left: "52px", width: "1px", background: "rgba(185,46,69,0.2)" }}
          />

          {/* Washi tape top decoration */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            style={{
              width: "80px",
              height: "22px",
              background: "rgba(236,166,186,0.6)",
              borderRadius: "2px",
              transform: "translateX(-50%) rotate(-1deg)",
            }}
          />

          {/* Letter content */}
          <div className="relative sm:pl-6">
            {/* Already-typed paragraphs */}
            {displayed.map((para, i) => {
              const isSignature = i === paragraphs.length - 1;
              const isClosing = i === paragraphs.length - 2;
              const isSalutation = i === 0;
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${isSalutation ? "mb-4" : isClosing || isSignature ? "mt-4 mb-0" : "mb-4"}`}
                  style={{
                    fontFamily: isSignature
                      ? "var(--font-dancing)"
                      : isSalutation
                      ? "var(--font-cormorant)"
                      : "var(--font-dm-sans)",
                    fontSize: isSignature
                      ? "1.6rem"
                      : isSalutation
                      ? "1.3rem"
                      : "1rem",
                    fontStyle: isSalutation ? "italic" : "normal",
                    fontWeight: isSalutation ? 600 : "normal",
                    color: isSignature ? "var(--cherry)" : "var(--berry)",
                    lineHeight: 1.75,
                    textAlign: isClosing || isSignature ? "right" : "left",
                  }}
                >
                  {para}
                </motion.p>
              );
            })}

            {/* Currently typing paragraph */}
            {isTyping && (
              <p
                style={{
                  fontFamily:
                    currentPara === 0
                      ? "var(--font-cormorant)"
                      : currentPara >= paragraphs.length - 2
                      ? currentPara === paragraphs.length - 1
                        ? "var(--font-dancing)"
                        : "var(--font-dm-sans)"
                      : "var(--font-dm-sans)",
                  fontSize:
                    currentPara === paragraphs.length - 1 ? "1.6rem" : currentPara === 0 ? "1.3rem" : "1rem",
                  fontStyle: currentPara === 0 ? "italic" : "normal",
                  fontWeight: currentPara === 0 ? 600 : "normal",
                  color:
                    currentPara === paragraphs.length - 1 ? "var(--cherry)" : "var(--berry)",
                  lineHeight: 1.75,
                  textAlign: currentPara >= paragraphs.length - 2 ? "right" : "left",
                  marginBottom: "1rem",
                }}
              >
                {currentTypingText}
                <span className="typewriter-cursor" />
              </p>
            )}
          </div>
        </motion.div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {!done && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={skipToEnd}
              className="px-6 py-2.5 rounded-full text-sm"
              style={{
                background: "var(--blush)",
                color: "var(--berry)",
                fontFamily: "var(--font-dm-sans)",
                border: "1px solid var(--rose)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Reveal full letter"
            >
              Reveal full letter →
            </motion.button>
          )}

          <AnimatePresence>
            {done && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
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
                aria-label="Go to the ending"
              >
                One more thing… →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
