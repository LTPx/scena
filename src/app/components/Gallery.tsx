"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GalleryHomeWp } from "../_interfaces/wordpress-components";

interface GalleryProps {
  gallery: GalleryHomeWp[];
}

const ASPECT_WIDTH_CLASS: Record<GalleryHomeWp["aspect"], string> = {
  landscape: "w-[85vw] md:w-[65vw]",
  portrait: "w-[50vw] md:w-[32vw]",
  square: "w-[70vw] md:w-[50vw]",
};

const VH_PER_100VW_TRAVEL = 130;

export default function Gallery({ gallery }: GalleryProps) {
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

      const extraScroll =
        (distance / viewportWidth) * (VH_PER_100VW_TRAVEL / 100) * vh;

      setWrapperHeight(vh + extraScroll);
    };

    measure();

    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [gallery]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  if (!gallery?.length) {
    return null;
  }

  return (
    <section
      ref={wrapperRef}
      // Toda la galería es imagen -> ícono BLANCO (logo y menú).
      data-header-theme="dark"
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "150vh",
      }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
          }}
          className="flex h-full items-center gap-4"
        >
          {gallery.map((item, index) => {
            const image = item.image;

            return (
              <div
                key={`${image.url}-${index}`}
                className={`relative h-full flex-shrink-0 ${
                  ASPECT_WIDTH_CLASS[item.aspect]
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 85vw, 65vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
