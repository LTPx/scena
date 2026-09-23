"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let instance: Lenis | null = null;
    let rafId = 0;

    const start = () => {
      if (instance) return;
      const created = new Lenis({
        lerp: 0.06,
        wheelMultiplier: 0.75,
        touchMultiplier: 1.2,
        smoothWheel: true,
      });
      instance = created;
      setLenis(created);

      const raf = (time: number) => {
        created.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (!instance) return;
      cancelAnimationFrame(rafId);
      instance.destroy();
      instance = null;
      setLenis(null);
    };

    const sync = () => (mq.matches ? start() : stop());

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
