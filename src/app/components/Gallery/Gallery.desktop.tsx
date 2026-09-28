"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { GalleryHomeWp } from "../../_interfaces/wordpress-components";
import { offsetForColumn, GRID_MARGIN_PX, COLS } from "../layout/Grid";
import SectionTitle from "../SectionTitle";
import { resolveAspect, ResolvedAspect } from "./aspect";

interface GalleryProps {
  gallery: GalleryHomeWp[];
  title?: string;
}

const ASPECT_WIDTH_CLASS: Record<ResolvedAspect, string> = {
  landscape: "w-[85vw] md:w-[65vw]",
  portrait: "w-[50vw] md:w-[32vw]",
  square: "w-[70vw] md:w-[50vw]",
};

const ASPECT_SIZES: Record<ResolvedAspect, string> = {
  landscape: "(max-width: 768px) 85vw, 65vw",
  portrait: "(max-width: 768px) 50vw, 32vw",
  square: "(max-width: 768px) 70vw, 50vw",
};

const VH_PER_100VW_TRAVEL = 130;
const GALLERY_TRACK_OFFSET = offsetForColumn(1);
const GALLERY_GAP_PX = 10;
const END_SPACER_WIDTH = Math.max(GRID_MARGIN_PX - GALLERY_GAP_PX, 0);

export default function GalleryDesktop({ gallery, title }: GalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Se activa una sola vez cuando el sticky ya ocupa los 100vh
  const [hasEntered, setHasEntered] = useState(false);

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
    return () => window.removeEventListener("resize", measure);
  }, [gallery]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // El wrapper llegó al top del viewport => el sticky ocupa 100vh
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0) setHasEntered(true);
  });

  // Caso: recarga de página con el scroll ya dentro de la sección
  useEffect(() => {
    if (scrollYProgress.get() > 0) setHasEntered(true);
  }, [scrollYProgress]);

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  if (!gallery?.length) return null;

  return (
    <section
      ref={wrapperRef}
      data-header-theme="dark"
      style={{ height: wrapperHeight ? `${wrapperHeight}px` : "150vh" }}
      className="relative"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x: trackX, paddingLeft: GALLERY_TRACK_OFFSET }}
          className="flex h-full items-center gap-[10px]"
        >
          {gallery.map((item, index) => {
            const image = item.image;
            if (!image?.url) return null;

            const aspect = resolveAspect(image, item.aspect);

            return (
              <div
                key={`${image.url}-${index}`}
                className={`relative h-full flex-shrink-0 ${ASPECT_WIDTH_CLASS[aspect]}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  priority={index === 0}
                  sizes={ASPECT_SIZES[aspect]}
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
            visible={hasEntered}
            colsClassName={COLS.galleryTitle}
          />
        )}
      </div>
    </section>
  );
}
