"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setIntroPlaying } from "../context/introStore";

const EXIT_DURATION = 1;
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
const REVEAL_AT_PROGRESS = 0.1;
const INTRO_SESSION_KEY = "scena-intro-played";
const VIDEO_SRC = "/videos/intro-scena.mp4";

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
  const [shouldSkip, setShouldSkip] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useLayoutEffect(() => {
    const alreadyPlayed =
      typeof window !== "undefined" &&
      sessionStorage.getItem(INTRO_SESSION_KEY) === "1";

    if (alreadyPlayed) {
      setShouldSkip(true);
      setIsDone(true);
      setIsMounted(false);
      setIntroPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (shouldSkip) return;
    document.body.style.overflow = isDone ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDone, shouldSkip]);

  useEffect(() => {
    if (shouldSkip) return;
    const duration = videoRef.current?.duration;
    const ms =
      videoReady && Number.isFinite(duration)
        ? (duration as number) * 1000 + 1500
        : 8000;
    const fallback = setTimeout(() => setIsDone(true), ms);
    return () => clearTimeout(fallback);
  }, [shouldSkip, videoReady]);

  useEffect(() => {
    if (shouldSkip) return;
    setIntroPlaying(true);
    return () => setIntroPlaying(false);
  }, [shouldSkip]);

  useEffect(() => {
    if (!isDone || shouldSkip) return;
    const t = setTimeout(() => {
      setIntroPlaying(false);
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    }, REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [isDone, shouldSkip]);

  const handleEnded = () => setIsDone(true);

  if (!isMounted || shouldSkip) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {!isDone && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: EXIT_DURATION, ease: EXIT_EASE }}
          onClick={() => setIsDone(true)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            onError={() => setIsDone(true)}
            onLoadedData={() => setVideoReady(true)}
            className={`h-full w-full object-contain lg:object-cover transition-opacity duration-300 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
