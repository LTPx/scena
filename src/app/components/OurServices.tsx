"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { ServiceWp } from "../_interfaces/wordpress-components";

interface OurServicesProps {
  services: ServiceWp[];
}

const VH_PER_STEP = 100;

const SLIDE_TRANSITION = {
  duration: 0.85,
  ease: [0.76, 0, 0.24, 1] as const,
};

// Mismo grid de 12 columnas que Header y PressDetailPage
const HEADING_COLS = "col-start-3 col-span-4";
const LIST_COLS = "col-start-1 col-span-2";
const CONTENT_COLS = "col-start-3 col-span-4";
const IMAGE_COLS = "col-start-7 col-span-6";

export default function OurServices({
  services,
}: OurServicesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [layers, setLayers] = useState <
    {
      index: number;
      id: number | "initial";
      direction: "down" | "up";
    }[]
  >([
    {
      index: 0,
      id: "initial",
      direction: "down",
    },
  ]);

  const layerIdRef = useRef(0);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!services.length) return;

    const index = Math.min(
      services.length - 1,
      Math.floor(latest * services.length),
    );

    setActiveIndex(index);
  });

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;

    const direction: "down" | "up" =
      activeIndex > prevIndexRef.current ? "down" : "up";

    prevIndexRef.current = activeIndex;

    layerIdRef.current += 1;

    const newLayer = {
      index: activeIndex,
      id: layerIdRef.current,
      direction,
    };

    setLayers((prev) => [...prev, newLayer]);
  }, [activeIndex]);

  if (!services.length) {
    return null;
  }

  const active = services[activeIndex];

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${VH_PER_STEP * services.length}vh`,
      }}
      className="relative"
    >
      <div className="sticky top-0 grid h-screen grid-cols-12 grid-rows-[auto_1fr] gap-x-6 overflow-hidden px-10 py-14">
        {/* Heading — col 3 a 6 */}
        <h2 className={`${HEADING_COLS} row-start-1 pt-2 font-[Gellix] text-3xl text-[#A89572]`}>
          Nuestros servicios
        </h2>

        {/* SERVICES LIST — col 1 a 2 */}
        <ul className={`${LIST_COLS} row-start-2 flex flex-col gap-2 self-center`}>
          {services.map((service, index) => (
            <li
              key={service.label}
              className={`cursor-default font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-500 ${
                index === activeIndex ? "opacity-100" : "opacity-40"
              }`}
            >
              {service.label}
            </li>
          ))}
        </ul>

        {/* CONTENT — col 3 a 6 */}
        <div className={`${CONTENT_COLS} row-start-2 self-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="font-[Gellix] text-[40px] font-normal not-italic leading-[120%] tracking-[0%] text-[#A89572]">
                {active.title}
              </h3>

              <p className="mt-6 font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]/80">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-6">
            <button className="rounded-full bg-[#A89572] px-6 py-2 font-[Gellix] text-sm text-[#F6F1EA] transition-opacity hover:opacity-90">
              know more
            </button>

            <button className="font-[Gellix] text-sm text-[#A89572] underline-offset-4 hover:underline">
              See Projects
            </button>
          </div>
        </div>

        {/* DIVIDER — sigue centrado, justo en el gutter entre col 6 y col 7 */}
        <div className="absolute left-1/2 top-1/2 z-10 h-6 w-px -translate-x-1/2 -translate-y-1/2 border-l border-dashed border-[#A89572]/50" />

        {/* IMAGEN — col 7 a 12, full-bleed: cancela el padding del grid para llegar al borde real */}
        <div className={`${IMAGE_COLS} relative row-start-1 row-end-3 -my-14 -mr-10 overflow-hidden`}>
          {layers.map((layer, index) => {
            const isTopLayer = index === layers.length - 1;
            const isInitial = layer.id === "initial";

            const enterFrom = layer.direction === "down" ? "100%" : "-100%";

            return (
              <motion.div
                key={layer.id}
                className="absolute inset-0"
                style={{ zIndex: index }}
                initial={isInitial ? false : { y: enterFrom }}
                animate={{ y: "0%" }}
                transition={SLIDE_TRANSITION}
                onAnimationComplete={() => {
                  if (!isTopLayer) return;

                  setLayers((current) => {
                    const stillTop =
                      current.length > 0 &&
                      current[current.length - 1].id === layer.id;

                    if (!stillTop || current.length === 1) {
                      return current;
                    }

                    return [current[current.length - 1]];
                  });
                }}
              >
                <Image
                  src={services[layer.index].image.url}
                  alt={
                    services[layer.index].image.alt ||
                    services[layer.index].title
                  }
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={layer.index === 0}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}