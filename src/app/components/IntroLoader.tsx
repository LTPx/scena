"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleEnded = () => setIsDone(true);

  if (!isMounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {!isDone && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F6F1EA]"
        >
          <video
            ref={videoRef}
            src="/videos/intro-scena.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}