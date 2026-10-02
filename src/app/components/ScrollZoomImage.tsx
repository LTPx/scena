"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface Props {
  src: string;
  alt: string;
  startCol: number;
  span: number;
  aspectRatio: string;
  className?: string;
}

export default function ScrollZoomImage({
  src,
  alt,
  startCol,
  span,
  aspectRatio,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.15],
  );

  return (
    <div
      ref={ref}
      data-header-theme="dark"
      className={`relative w-full self-start overflow-hidden ${className}`}
      style={{
        gridColumn: `${startCol} / span ${span}`,
        aspectRatio,
      }}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${Math.round((span / 12) * 100)}vw`}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
