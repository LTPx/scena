"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MediaFileWp } from "../_interfaces/wordpress-components";
import Grid, { COLS } from "./layout/Grid";
import {
  INTRO_REVEAL_TRANSITION,
  useIntroPlaying,
} from "../context/introStore";
import { motion } from "framer-motion";

interface HeroProps {
  heroPage: MediaFileWp[];
}

export default function Hero({ heroPage }: HeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const introPlaying = useIntroPlaying();

  useEffect(() => {
    function calcProgress() {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;

      let raw = total > 0 ? -rect.top / total : 0;
      raw = Math.min(Math.max(raw, 0), 1);

      setProgress(raw);
    }

    function onScroll() {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        calcProgress();
        rafId.current = null;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    calcProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!heroPage?.length) return null;

  const trackX = -progress * (heroPage.length - 1) * 100;

  return (
    <section
      ref={wrapperRef}
      data-header-theme="dark"
      style={{ height: `${heroPage.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          style={{
            width: `${heroPage.length * 100}vw`,
            transform: `translateX(${trackX}vw)`,
            willChange: "transform",
          }}
          className="flex h-full"
        >
          {heroPage.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="relative h-screen w-screen flex-shrink-0"
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <Grid className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-[40px]">
          <motion.h1
            initial={false}
            animate={{ y: introPlaying ? "-150%" : "0%" }}
            transition={
              introPlaying ? { duration: 0 } : INTRO_REVEAL_TRANSITION
            }
            className={`${COLS.heroTitle} hero-title`}
          >
            The art of living
            <br />
            technology
          </motion.h1>
        </Grid>
      </div>
    </section>
  );
}
