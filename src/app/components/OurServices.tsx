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
import Grid, { COLS } from "./layout/Grid";

interface OurServicesProps {
  services: ServiceWp[];
}

const VH_PER_STEP = 100;

const SLIDE_TRANSITION = {
  duration: 0.85,
  ease: [0.76, 0, 0.24, 1] as const,
};

export default function OurServices({ services }: OurServicesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [layers, setLayers] = useState<
    { index: number; id: number | "initial"; direction: "down" | "up" }[]
  >([{ index: 0, id: "initial", direction: "down" }]);

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

    setLayers((prev) => [
      ...prev,
      { index: activeIndex, id: layerIdRef.current, direction },
    ]);
  }, [activeIndex]);

  if (!services.length) {
    return null;
  }

  const active = services[activeIndex];

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${VH_PER_STEP * services.length}vh` }}
      className="relative"
    >
      <Grid
        fullHeight
        data-header-theme="light"
        className="sticky top-0 grid-rows-[auto_1fr_auto] py-[40px] overflow-hidden"
      >
        <h2
          className={`${COLS.content} row-start-1 font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          Nuestros servicios
        </h2>

        <div className="col-start-1 col-span-6 row-start-2 grid grid-cols-6 items-start gap-x-6 self-center">
          <ul className={`${COLS.list} flex flex-col gap-2`}>
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

          <div className={COLS.content}>
            <AnimatePresence mode="wait">
              <motion.h3
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-[Gellix] text-[40px] font-normal not-italic leading-[120%] tracking-[0%] text-[#A89572]"
              >
                {active.title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* descripción + botones: fila propia, siempre pegada abajo */}
        <div className={`${COLS.content} row-start-3 flex flex-col`}>
          <AnimatePresence mode="wait">
            <motion.p
              key={active.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]/80"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>

          <div className="mt-[30px] inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1">
            <button className="btn-gellix btn-gellix-active">know more</button>

            <button className="btn-gellix bg-transparent hover:bg-[#A89572] hover:text-white">
              See Projects
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 h-6 w-px -translate-x-1/2 -translate-y-1/2 border-l border-dashed border-[#A89572]/50" />

        <div
          data-header-theme="dark"
          className={`${COLS.media} relative row-start-1 row-end-4 -my-14 -mr-10 overflow-hidden`}
        >
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

                    if (!stillTop || current.length === 1) return current;
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
      </Grid>
    </div>
  );
}
