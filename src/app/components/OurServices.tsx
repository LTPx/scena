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

const GROUP_TRANSITION = {
  duration: 0.6,
  ease: [0.76, 0, 0.24, 1] as const,
};

const CTA_TRANSITION = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1] as const,
};

export default function OurServices({ services }: OurServicesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [seeProjects, setSeeProjects] = useState(false);

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
        {/* Header: "Nuestros servicios" <-> "Servicios" */}
        <div className={`${COLS.content} row-start-1 overflow-hidden`}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={seeProjects ? "servicios" : "nuestros-servicios"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]"
            >
              {seeProjects ? "Servicios" : "Nuestros servicios"}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Lista + título: se centra (colapsado) o sube arriba (expandido) */}
        <motion.div
          layout
          transition={GROUP_TRANSITION}
          className={`col-start-1 col-span-6 row-start-2 grid grid-cols-6 items-start gap-x-6 ${
            seeProjects ? "self-start mt-[50px]" : "self-center"
          }`}
        >
          <ul className={`${COLS.list} flex flex-col gap-2`}>
            {services.map((service, index) => (
              <li
                key={service.label}
                onClick={() => seeProjects && setActiveIndex(index)}
                className={`font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-500 ${
                  seeProjects ? "cursor-pointer" : "cursor-default"
                } ${index === activeIndex ? "opacity-100" : "opacity-40"}`}
              >
                {service.label}
              </li>
            ))}
          </ul>

          <div className={COLS.content}>
            <AnimatePresence mode="wait">
              <motion.h3
                key={
                  seeProjects
                    ? `label-${active.label}`
                    : `title-${active.title}`
                }
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-[Gellix] text-[40px] font-normal not-italic leading-[120%] tracking-[0%] text-[#A89572]"
              >
                {seeProjects ? active.label : active.title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Descripción / contenido expandido: fila propia, pegada abajo */}
        <div className={`${COLS.content} row-start-3 flex flex-col`}>
          <AnimatePresence mode="wait">
            {!seeProjects ? (
              <motion.p
                key="short-desc"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]/80"
              >
                {active.description}
              </motion.p>
            ) : (
              // key incluye active.label: así se re-dispara el exit/enter
              // cada vez que cambia el servicio activo, no solo al abrir/cerrar
              <motion.div
                key={`expanded-${active.label}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-h-[70vh] overflow-y-auto pr-2"
              >
                <p className="font-[Gellix] text-[40px] font-normal not-italic leading-[120%] tracking-[0%] text-[#A89572] mb-6">
                  {active.title}
                </p>
                <div
                  className="service-expanded-content"
                  dangerouslySetInnerHTML={{
                    __html: active.expanded_content,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Par "know more" / "See Projects": solo en modo colapsado,
              vive dentro de la columna de contenido, debajo del párrafo */}
          <AnimatePresence>
            {!seeProjects && (
              <motion.div
                layoutId="services-cta"
                layout
                transition={CTA_TRANSITION}
                className="mt-[30px] inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1"
                exit={{ opacity: 0 }}
              >
                <button className="btn-gellix btn-gellix-active">
                  know more
                </button>
                <button
                  onClick={() => setSeeProjects(true)}
                  className="btn-gellix bg-transparent hover:bg-[#A89572] hover:text-white"
                >
                  See Projects
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botón "Cerrar": solo en modo expandido, columna 1 (bajo la lista),
            MISMO layoutId que el bloque de arriba -> Framer anima el salto
            de posición automáticamente (magic move) */}
        <AnimatePresence>
          {seeProjects && (
            <motion.div
              layoutId="services-cta"
              layout
              transition={CTA_TRANSITION}
              className="col-start-1 col-span-2 row-start-3 self-end w-fit"
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setSeeProjects(false)}
                className="btn-gellix bg-white text-[#A89572] hover:bg-[#A89572] hover:text-white"
              >
                Cerrar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
