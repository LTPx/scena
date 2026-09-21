"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setIntroPlaying } from "../context/introStore";

const EXIT_DURATION = 1;
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
const REVEAL_AT_PROGRESS = 0.1;

function bezier(p1: number, p2: number, s: number) {
  return 3 * (1 - s) ** 2 * s * p1 + 3 * (1 - s) * s ** 2 * p2 + s ** 3;
}

function timeAtProgress(progress: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bezier(EXIT_EASE[1], EXIT_EASE[3], mid) < progress) lo = mid;
    else hi = mid;
  }
  const s = (lo + hi) / 2;
  return bezier(EXIT_EASE[0], EXIT_EASE[2], s);
}

const REVEAL_DELAY_MS =
  timeAtProgress(REVEAL_AT_PROGRESS) * EXIT_DURATION * 1000;

export default function IntroLoader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isDone ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDone]);

  useEffect(() => {
    const fallback = setTimeout(() => setIsDone(true), 6000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    setIntroPlaying(true);
    return () => setIntroPlaying(false);
  }, []);

  useEffect(() => {
    if (!isDone) return;
    const t = setTimeout(() => setIntroPlaying(false), REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [isDone]);

  const handleEnded = () => setIsDone(true);

  if (!isMounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {!isDone && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: EXIT_DURATION, ease: EXIT_EASE }}
          onClick={() => setIsDone(true)}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="/videos/intro-scena.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            onError={() => setIsDone(true)}
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
