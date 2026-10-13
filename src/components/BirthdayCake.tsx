"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// canvas-confetti is loaded dynamically to avoid SSR issues
let confettiLoaded = false;
async function fireConfetti() {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let confetti: any;
  if (!confettiLoaded) {
    const mod = await import("canvas-confetti");
    confetti = mod.default;
    confettiLoaded = true;
  } else {
    const mod = await import("canvas-confetti");
    confetti = mod.default;
  }
  // Burst from centre
  confetti({
    particleCount: 160,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#ECA6BA", "#B92E45", "#F7DDE5", "#FFF8F0", "#4C2834", "#FFD700"],
    scalar: 1.1,
  });
  setTimeout(() =>
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.55, x: 0.3 }, colors: ["#ECA6BA", "#B92E45"] }),
    250
  );
  setTimeout(() =>
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.55, x: 0.7 }, colors: ["#FFF8F0", "#FFD700"] }),
    400
  );
}

interface CandleState {
  lit: boolean;
}

const NUM_CANDLES = 5;
const CANDLE_COLORS = ["#B92E45", "#ECA6BA", "#4C2834", "#B92E45", "#ECA6BA"];
const FLAME_COLORS = ["#FFD700", "#FF8C00", "#FFD700", "#FF8C00", "#FFD700"];

interface Props {
  onNext: () => void;
}

export default function BirthdayCake({ onNext }: Props) {
  const [candles, setCandles] = useState<CandleState[]>(
    Array(NUM_CANDLES).fill({ lit: true })
  );
  const [celebrated, setCelebrated] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const celebrationFired = useRef(false);

  const blowCandle = useCallback(
    async (idx: number) => {
      if (!candles[idx].lit || celebrating) return;

      const updated = candles.map((c, i) =>
        i === idx ? { ...c, lit: false } : c
      );
      setCandles(updated);

      if (updated.every((c) => !c.lit) && !celebrationFired.current) {
        celebrationFired.current = true;
        setCelebrating(true);
        await fireConfetti();
        setTimeout(() => {
          setCelebrated(true);
          setCelebrating(false);
        }, 800);
      }
    },
    [candles, celebrating]
  );

  const replay = useCallback(() => {
    setCandles(Array(NUM_CANDLES).fill({ lit: true }));
    setCelebrated(false);
    setCelebrating(false);
    celebrationFired.current = false;
  }, []);

  const allBlown = candles.every((c) => !c.lit);

  return (
    <div
      className="screen-wrap min-h-screen paper-texture flex flex-col items-center justify-center"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center w-full">
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
            ✦ Screen VI ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--berry)",
            }}
          >
            Make a Wish
          </h2>
          <p
            className="mt-2"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "1.3rem", color: "var(--cherry)" }}
          >
            {allBlown
              ? celebrated
                ? "wish granted ✨"
                : "blowing out…"
              : "tap each candle to blow it out 🕯️"}
          </p>
        </motion.div>

        {/* ── Cake SVG ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 180 }}
          className="relative"
          style={{ width: "clamp(260px, 50vw, 380px)" }}
        >
          <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            {/* Plate */}
            <ellipse cx="190" cy="295" rx="155" ry="16" fill="#ECA6BA" fillOpacity="0.4"/>

            {/* Bottom tier */}
            <rect x="55" y="210" width="270" height="80" rx="6" fill="#ECA6BA"/>
            <rect x="55" y="210" width="270" height="18" rx="6" fill="white" fillOpacity="0.5"/>
            {/* Bottom tier frosting drips */}
            {[80,120,160,200,240,280,310].map((x, i) => (
              <path key={i} d={`M${x} 210 Q${x+5} 230 ${x+10} 225`} stroke="white" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.6"/>
            ))}
            {/* Bottom tier decoration */}
            <text x="190" y="262" textAnchor="middle" fontSize="22" fill="white" fillOpacity="0.7">🎀</text>
            {/* Gingham border */}
            <rect x="55" y="282" width="270" height="8" rx="0" fill="#B92E45" fillOpacity="0.25"/>

            {/* Middle tier */}
            <rect x="90" y="140" width="200" height="74" rx="6" fill="#F7DDE5"/>
            <rect x="90" y="140" width="200" height="15" rx="6" fill="white" fillOpacity="0.5"/>
            {/* Middle drips */}
            {[110,145,180,215,250].map((x, i) => (
              <path key={i} d={`M${x} 140 Q${x+4} 157 ${x+8} 153`} stroke="white" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.6"/>
            ))}
            {/* Sprinkles */}
            {[[115,175],[145,168],[175,180],[205,165],[235,178],[155,158],[190,172]].map(([sx,sy],i)=>(
              <rect key={i} x={sx} y={sy} width="12" height="4" rx="2" fill={["#B92E45","#ECA6BA","#4C2834","#B92E45","#ECA6BA","#4C2834","#B92E45"][i]} transform={`rotate(${[-30,45,0,60,-45,30,15][i]} ${sx+6} ${sy+2})`}/>
            ))}

            {/* Top tier */}
            <rect x="130" y="84" width="120" height="58" rx="6" fill="#B92E45"/>
            <rect x="130" y="84" width="120" height="13" rx="6" fill="white" fillOpacity="0.45"/>
            {/* Top drips */}
            {[145,175,205,235].map((x,i)=>(
              <path key={i} d={`M${x} 84 Q${x+3} 98 ${x+7} 94`} stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.55"/>
            ))}
            <text x="190" y="128" textAnchor="middle" fontSize="18" fill="white" fillOpacity="0.6">♡</text>
          </svg>

          {/* ── Interactive candles ── */}
          <div
            className="absolute flex gap-3 md:gap-4 justify-center"
            style={{ top: "10px", left: "50%", transform: "translateX(-50%)" }}
          >
            {candles.map((candle, idx) => (
              <motion.button
                key={idx}
                onClick={() => blowCandle(idx)}
                aria-label={`Blow out candle ${idx + 1}`}
                disabled={!candle.lit}
                className="flex flex-col items-center"
                style={{ background: "none", border: "none", padding: 0, cursor: candle.lit ? "pointer" : "default" }}
                whileHover={candle.lit ? { scale: 1.15, y: -3 } : {}}
                whileTap={candle.lit ? { scale: 0.9 } : {}}
              >
                {/* Flame */}
                <AnimatePresence>
                  {candle.lit && (
                    <motion.div
                      key="flame"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="flame"
                      style={{ transformOrigin: "bottom center" }}
                    >
                      <svg viewBox="0 0 16 24" width="16" height="24">
                        <path
                          d="M8 22 C4 22 2 18 2 14 C2 10 5 8 6 4 C7 8 9 6 10 2 C12 6 14 10 14 14 C14 18 12 22 8 22 Z"
                          fill={FLAME_COLORS[idx]}
                        />
                        <path
                          d="M8 20 C6 20 5 17 5 15 C5 13 6.5 11.5 7 9 C7.5 11 9 10.5 9 8 C10 11 11 13 11 15 C11 17 10 20 8 20 Z"
                          fill="#FFF8F0"
                          fillOpacity="0.6"
                        />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle body */}
                <div
                  style={{
                    width: "14px",
                    height: "40px",
                    background: CANDLE_COLORS[idx],
                    borderRadius: "3px 3px 2px 2px",
                    position: "relative",
                    boxShadow: candle.lit ? `0 0 8px ${FLAME_COLORS[idx]}66` : "none",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  {/* Wax drip */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "2px",
                      width: "4px",
                      height: "10px",
                      background: "white",
                      borderRadius: "0 0 4px 4px",
                      opacity: 0.5,
                    }}
                  />
                  {/* Wick */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-6px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "2px",
                      height: "7px",
                      background: "#4C2834",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        {!allBlown && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="mt-6 text-center text-sm"
            style={{ fontFamily: "var(--font-dm-sans)", color: "var(--berry)" }}
          >
            {NUM_CANDLES - candles.filter((c) => !c.lit).length} candle
            {NUM_CANDLES - candles.filter((c) => !c.lit).length !== 1 ? "s" : ""} still glowing
          </motion.p>
        )}

        {/* Celebration message */}
        <AnimatePresence>
          {celebrated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="mt-8 text-center px-8 py-6 rounded-2xl"
              style={{ background: "var(--blush)", border: "1px solid var(--rose)", maxWidth: 360 }}
            >
              <p className="text-4xl mb-3">🎉🎂🎉</p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.8rem",
                  fontStyle: "italic",
                  color: "var(--berry)",
                }}
              >
                Happy Birthday, Abiah!
              </p>
              <p
                className="mt-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--cherry)", fontSize: "0.9rem" }}
              >
                May every single wish come true ♡
              </p>
              <button
                onClick={replay}
                className="mt-4 text-xs underline"
                style={{ color: "var(--rose)", fontFamily: "var(--font-dm-sans)", background: "none", border: "none", cursor: "pointer" }}
                aria-label="Relight candles"
              >
                relight the candles ↺
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="mt-10 px-10 py-3.5 rounded-full text-sm font-medium tracking-wide"
          style={{
            background: "var(--cherry)",
            color: "#fff",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 20px rgba(185,46,69,0.28)",
          }}
          aria-label="Read the birthday letter"
        >
          Read your letter →
        </motion.button>
      </div>
    </div>
  );
}
