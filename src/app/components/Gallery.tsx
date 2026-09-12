"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt?: string;
  aspect?: "landscape" | "portrait" | "square";
}

const IMAGES: GalleryImage[] = [
  { src: "/images/gallery-1.png", aspect: "landscape" },
  { src: "/images/gallery-2.png", aspect: "portrait" },
  { src: "/images/gallery-3.png", aspect: "landscape" },
];

const ASPECT_WIDTH_CLASS: Record<string, string> = {
  landscape: "w-[70vw] md:w-[55vw]",
  portrait: "w-[45vw] md:w-[32vw]",
  square: "w-[55vw] md:w-[40vw]",
};

// Cuánto scroll "extra" (en vh) se le da por cada 100vw que debe recorrer el track.
// Más alto = gesto de scroll más largo para recorrer toda la galería.
const VH_PER_100VW_TRAVEL = 60;

export default function Gallery({ title = "Galería" }: { title?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(trackWidth - viewportWidth, 0);
      setTravelDistance(distance);

      const vh = window.innerHeight;
      const extraScroll = (distance / viewportWidth) * (VH_PER_100VW_TRAVEL / 100) * vh;
      setWrapperHeight(vh + extraScroll);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const trackX = useTransform(smoothProgress, [0, 1], [0, -travelDistance]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight ? `${wrapperHeight}px` : "150vh" }}
      className="relative bg-[#F6F1EA]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <h2 className="absolute left-8 top-10 z-10 font-[Gellix] text-2xl text-[#A89572]">
          {title}
        </h2>

        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="flex h-full items-center gap-6 pl-8 pr-[10vw]"
        >
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`relative h-[70vh] flex-shrink-0 overflow-hidden rounded-md ${
                ASPECT_WIDTH_CLASS[img.aspect ?? "landscape"]
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt ?? ""}
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