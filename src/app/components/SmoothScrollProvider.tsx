"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,           // interpolación por frame (más bajo = más "flotante"/suave)
      wheelMultiplier: 0.75, // reduce cuánto avanza cada "tick" de rueda del mouse
      touchMultiplier: 1.2,  // sensibilidad en trackpad/touch (ajusta aparte)
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}