"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  // Try autoplay; browsers usually block it until a user gesture
  useEffect(() => {
    const audio = new Audio("/Christian_Lalama_-_Those_Eyes_New_West_Cover_(mp3.pm).mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // Attempt silent autoplay
    audio.play().then(() => {
      setPlaying(true);
      setStarted(true);
    }).catch(() => {
      // Blocked — wait for first user gesture
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Play on first user interaction if autoplay was blocked
  useEffect(() => {
    if (started) return;
    const unlock = () => {
      if (started) return;
      audioRef.current?.play().then(() => {
        setPlaying(true);
        setStarted(true);
      }).catch(() => {});
    };
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [started]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div
      className="fixed z-50 flex flex-col items-center gap-2"
      style={{
        bottom: "max(1.5rem, calc(1rem + env(safe-area-inset-bottom, 0px)))",
        right: "max(1.5rem, calc(1rem + env(safe-area-inset-right, 0px)))",
      }}
    >
      {/* Mute toggle */}
      <AnimatePresence>
        {playing && (
          <motion.button
            key="mute"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={toggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            title={muted ? "Unmute music" : "Mute music"}
            style={{
              width: "2.2rem",
              height: "2.2rem",
              borderRadius: "50%",
              border: "1.5px solid var(--rose)",
              background: "var(--cream)",
              color: "var(--berry)",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(185,46,69,0.12)",
            }}
          >
            {muted ? "🔇" : "🔊"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Play/Pause button */}
      <motion.button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
        animate={playing && !muted ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={playing && !muted ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}}
        style={{
          width: "2.8rem",
          height: "2.8rem",
          borderRadius: "50%",
          border: "2px solid var(--rose)",
          background: playing ? "var(--cherry)" : "var(--cream)",
          color: playing ? "#fff" : "var(--berry)",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: playing
            ? "0 4px 18px rgba(185,46,69,0.35)"
            : "0 2px 10px rgba(185,46,69,0.12)",
          transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
        }}
      >
        {playing ? "♫" : "♪"}
      </motion.button>
    </div>
  );
}
