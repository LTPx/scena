"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  play: boolean;
  className?: string;
  delayPerChar?: number;
}

export default function TypewriterText({
  text,
  play,
  className,
  delayPerChar = 0.03,
}: Props) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
            delay: play ? i * delayPerChar : 0,
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
