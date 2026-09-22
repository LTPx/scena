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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Hero({ heroPage }: HeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [titleHideProgress, setTitleHideProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const introPlaying = useIntroPlaying();

  useEffect(() => {
    function calcProgress() {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Distancia de scroll que dura el recorrido del carrusel (todas las imágenes/videos)
      const heroImageScrollDistance = (heroPage.length - 1) * vh;

      let raw =
        heroImageScrollDistance > 0 ? -rect.top / heroImageScrollDistance : 1;
      raw = clamp(raw, 0, 1);
      setProgress(raw);

      const scrolled = -rect.top;

      const hideRaw = (scrolled - heroImageScrollDistance) / vh;
      setTitleHideProgress(clamp(hideRaw, 0, 1));
    }

    function onScroll() {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        calcProgress();
        rafId.current = null;
      });
    }

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    calcProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [heroPage.length]);

  if (!heroPage?.length) return null;

  const trackX = -progress * (heroPage.length - 1) * 100;

  return (
    <section
      ref={wrapperRef}
      data-header-theme="dark"
      className="relative z-0"
      style={{
        height: `${(heroPage.length + 1) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen">
        <div className="relative h-full w-full overflow-hidden">
          {/* Título ahora vive DENTRO del contenedor sticky,
              así queda fijo el mismo tiempo que el carrusel */}
          <Grid className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-[40px]">
            <motion.div
              initial={false}
              animate={{
                y: introPlaying ? "-150%" : "0%",
              }}
              transition={
                introPlaying ? { duration: 0 } : INTRO_REVEAL_TRANSITION
              }
              className={COLS.heroTitle}
            >
              <h1
                className="hero-title"
                style={{
                  transform: `translateY(${-150 * titleHideProgress}%)`,
                }}
              >
                The art of living
                <br />
                technology
              </h1>
            </motion.div>
          </Grid>

          <div
            className="flex h-full"
            style={{
              width: `${heroPage.length * 100}vw`,
              transform: `translate3d(${trackX}vw, 0, 0)`,
              willChange: "transform",
            }}
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
        </div>
      </div>
    </section>
  );
}
