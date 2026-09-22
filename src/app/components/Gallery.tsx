"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GalleryHomeWp } from "../_interfaces/wordpress-components";
import { offsetForColumn, GRID_MARGIN_PX, COLS } from "./layout/Grid";
import SectionTitle from "./SectionTitle";

interface GalleryProps {
  gallery: GalleryHomeWp[];
  title?: string;
}

const ASPECT_WIDTH_CLASS: Record<GalleryHomeWp["aspect"], string> = {
  landscape: "w-[85vw] md:w-[65vw]",
  portrait: "w-[50vw] md:w-[32vw]",
  square: "w-[70vw] md:w-[50vw]",
};

const VH_PER_100VW_TRAVEL = 130;

const GALLERY_TRACK_OFFSET = offsetForColumn(1);

const GALLERY_GAP_PX = 10;
const END_SPACER_WIDTH = Math.max(GRID_MARGIN_PX - GALLERY_GAP_PX, 0);

export default function Gallery({ gallery, title }: GalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stickyRef, { once: true, amount: 0.9 });

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
      data-header-theme="dark"
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "150vh",
      }}
      className="relative"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
            paddingLeft: GALLERY_TRACK_OFFSET,
          }}
          className="flex h-full items-center gap-[10px]"
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

          <div
            aria-hidden
            style={{ width: `${END_SPACER_WIDTH}px` }}
            className="h-full flex-shrink-0"
          />
        </motion.div>

        {title && (
          <SectionTitle
            text={title}
            visible={isInView}
            colsClassName={COLS.galleryTitle}
          />
        )}
      </div>
    </section>
  );
}
