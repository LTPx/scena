"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IMAGES = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
];

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 a 1
  const rafId = useRef<number | null>(null);

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

  const trackX = -progress * (IMAGES.length - 1) * 100; // en vw

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${IMAGES.length * 100}vh` }}
      className="relative bg-[#F6F1EA]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          style={{
            transform: `translateX(${trackX}vw)`,
            width: `${IMAGES.length * 100}vw`,
            willChange: "transform",
          }}
          className="flex h-full"
        >
          {IMAGES.map((src, i) => (
            <div key={src} className="relative h-full w-screen flex-shrink-0">
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
