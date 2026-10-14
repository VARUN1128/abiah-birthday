"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import EnvelopeScreen  from "@/components/EnvelopeScreen";
import IntroScreen     from "@/components/IntroScreen";
import WishJar         from "@/components/WishJar";
import BirthdayCake    from "@/components/BirthdayCake";
import EndingScreen    from "@/components/EndingScreen";
import ProgressDots    from "@/components/ui/ProgressDots";
import MusicPlayer     from "@/components/MusicPlayer";

// 5 screens: 0=Envelope 1=Intro 2=WishJar 3=Cake 4=Ending
type ScreenId = 0 | 1 | 2 | 3 | 4;

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.35, ease: "easeIn" as const } },
};

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>(0);

  const goTo = useCallback((s: number) => {
    setScreen(s as ScreenId);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const next = useCallback((current: ScreenId) => goTo(current + 1), [goTo]);

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === 0 && (
          <motion.div key="envelope" {...pageVariants}>
            <EnvelopeScreen onOpen={() => next(0)} />
          </motion.div>
        )}
        {screen === 1 && (
          <motion.div key="intro" {...pageVariants}>
            <IntroScreen onNext={() => next(1)} />
          </motion.div>
        )}
        {screen === 2 && (
          <motion.div key="wishjar" {...pageVariants}>
            <WishJar onNext={() => next(2)} />
          </motion.div>
        )}
        {screen === 3 && (
          <motion.div key="cake" {...pageVariants}>
            <BirthdayCake onNext={() => next(3)} />
          </motion.div>
        )}
        {screen === 4 && (
          <motion.div key="ending" {...pageVariants}>
            <EndingScreen onReplay={() => goTo(0)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress navigation — hidden on envelope screen & on mobile */}
      {screen > 0 && (
        <ProgressDots current={screen} onNavigate={goTo} />
      )}

      {/* Persistent music player */}
      <MusicPlayer />
    </>
  );
}
