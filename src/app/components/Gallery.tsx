"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt?: string;
  aspect?: "landscape" | "portrait" | "square";
}

const IMAGES: GalleryImage[] = [
  { src: "/images/gallery-1.png", aspect: "portrait" },
  { src: "/images/gallery-2.png", aspect: "landscape" },
  { src: "/images/gallery-3.jpg", aspect: "square" },
  { src: "/images/gallery-4.jpg", aspect: "landscape" },
  { src: "/images/gallery-5.jpg", aspect: "portrait" },
];

// Ancho relativo de cada imagen, siempre a h-full (100vh)
const ASPECT_WIDTH_CLASS: Record<string, string> = {
  landscape: "w-[85vw] md:w-[65vw]",
  portrait: "w-[50vw] md:w-[32vw]",
  square: "w-[70vw] md:w-[50vw]",
};

const VH_PER_100VW_TRAVEL = 130;

export default function Gallery() {
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

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight ? `${wrapperHeight}px` : "150vh" }}
      className="relative bg-[#F6F1EA]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="flex h-full items-center gap-4"
        >
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`relative h-full flex-shrink-0 ${
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