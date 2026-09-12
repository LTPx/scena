"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const IMAGES = ["/images/hero-1.png", "/images/hero-2.png"];

// Cuánto scroll (en vh) le corresponde a CADA imagen.
// Bájalo si quieres que el snap dispare con gestos más cortos.
const VH_PER_STEP = 70;

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isSnapping = useRef(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Suaviza el movimiento mientras el usuario scrollea activamente
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(IMAGES.length - 1) * 100}vw`]
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // --- Lógica de snap: cuando el usuario deja de scrollear, completa el paso ---
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || isSnapping.current) return;

      const rect = wrapper.getBoundingClientRect();
      const isInsideWrapper = rect.top <= 0 && rect.bottom > window.innerHeight;
      if (!isInsideWrapper) return; // solo actuamos mientras el hero está "pineado"

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const progress = scrollYProgress.get();
        const totalSteps = IMAGES.length - 1;
        const nearestStep = Math.round(progress * totalSteps);
        const targetProgress = nearestStep / totalSteps;

        // Si ya estamos prácticamente en el paso, no hacemos nada
        if (Math.abs(progress - targetProgress) < 0.02) return;

        const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
        const targetY = wrapper.offsetTop + targetProgress * scrollableHeight;

        isSnapping.current = true;
        window.scrollTo({ top: targetY, behavior: "smooth" });

        // Libera el lock cuando el navegador terminó el smooth scroll
        setTimeout(() => {
          isSnapping.current = false;
        }, 500);
      }, 120); // tiempo de inactividad antes de disparar el snap
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [scrollYProgress]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${VH_PER_STEP * IMAGES.length}vh` }}
      className="relative bg-[#F6F1EA]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center px-8"
        >
          <p className="max-w-xl font-[Gellix] text-[#A89572]">
            Design of intelligent and unique spaces. We transform sound,
            video, and lighting into memorable environments for your home or
            business.
          </p>
        </motion.div>

        <motion.div
          style={{ x: trackX, width: `${IMAGES.length * 100}vw` }}
          className="flex h-full"
        >
          {IMAGES.map((src, i) => (
            <div key={src} className="relative h-full w-screen flex-shrink-0">
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}