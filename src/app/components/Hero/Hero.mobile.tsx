"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { MediaFileWp } from "../../_interfaces/wordpress-components";
import {
  INTRO_REVEAL_TRANSITION,
  useIntroPlaying,
} from "../../context/introStore";

interface HeroProps {
  heroPage: MediaFileWp[];
}

function SlideMedia({
  item,
  isActive,
  priority,
}: {
  item: MediaFileWp;
  isActive: boolean;
  priority: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Solo reproduce el video cuando su slide está activo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  if (item.type === "image") {
    return (
      <Image
        src={item.url}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={item.url}
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export default function HeroMobile({ heroPage }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const introPlaying = useIntroPlaying();

  if (!heroPage?.length) return null;

  return (
    <section
      data-header-theme="dark"
      className="relative z-0 h-[100svh] w-full overflow-hidden"
    >
      <Swiper
        className="h-full w-full"
        slidesPerView={1}
        speed={500}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {heroPage.map((item, index) => (
          <SwiperSlide key={`${item.url}-${index}`}>
            <div className="relative h-full w-full">
              <SlideMedia
                item={item}
                isActive={index === activeIndex}
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 top-[44%] z-10 px-5">
        <motion.div
          initial={false}
          animate={{
            y: introPlaying ? "150%" : "0%",
            opacity: introPlaying ? 0 : 1,
          }}
          transition={introPlaying ? { duration: 0 } : INTRO_REVEAL_TRANSITION}
        >
          <h1 className="hero-title-mobile">
            The art of living
            <br />
            technology
          </h1>
        </motion.div>
      </div>

      {heroPage.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
          {heroPage.map((_, i) => (
            <span
              key={i}
              className={`h-[3px] rounded-full bg-white transition-all duration-300 ${
                i === activeIndex ? "w-8 opacity-100" : "w-4 opacity-40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
