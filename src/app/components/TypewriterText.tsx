"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  play: boolean;
  className?: string;
  delayPerChar?: number;
}

const LINE_BREAK_REGEX = /(<br\s*\/?>|\n)/gi;

export default function TypewriterText({
  text,
  play,
  className,
  delayPerChar = 0.03,
}: Props) {
  const tokens = text.split(LINE_BREAK_REGEX);

  let charIndex = 0;

  return (
    <span
      className={className}
      aria-label={text.replace(LINE_BREAK_REGEX, " ")}
    >
      {tokens.map((token, tokenI) => {
        if (!token) return null;

        if (LINE_BREAK_REGEX.test(token)) {
          LINE_BREAK_REGEX.lastIndex = 0;
          return <br key={`br-${tokenI}`} aria-hidden />;
        }

        return token.split("").map((char) => {
          const i = charIndex++;
          return (
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
          );
        });
      })}
    </span>
  );
}
