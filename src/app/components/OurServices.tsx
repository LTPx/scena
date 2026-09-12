"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    label: "Engineering",
    title: "Engineering",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/service-engineering.jpg",
  },
  {
    label: "Audio & Video",
    title: "Tratamos el sonido y la imagen como lenguajes del lujo universal.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/service-audio-video.jpg",
  },
  {
    label: "Home Automation",
    title: "Home Automation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/service-automation.jpg",
  },
  {
    label: "Lighting Design",
    title: "Lighting Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/service-lighting.jpg",
  },
  {
    label: "MEP",
    title: "Mechanical, Electrical & Plumbing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/service-mep.jpg",
  },
];

// Cuántas "pantallas" de scroll dura la sección completa.
// Más alto = transición más lenta entre tabs.
const VH_PER_STEP = 100;

export default function OurServices() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      SERVICES.length - 1,
      Math.floor(latest * SERVICES.length)
    );
    setActiveIndex(index);
  });

  const active = SERVICES[activeIndex];

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${VH_PER_STEP * SERVICES.length}vh` }}
      className="relative"
    >
      {/* Este div se queda pegado (sticky) mientras se hace scroll dentro del wrapper alto */}
      <div className="sticky top-0 flex h-screen overflow-hidden bg-[#F6F1EA]">
        {/* Columna izquierda: título + tabs */}
        <div className="flex w-1/2 flex-col justify-center gap-12 px-16">
          <h2 className="font-[Gellix] text-3xl text-[#A89572]">Our services</h2>

          <ul className="space-y-2">
            {SERVICES.map((s, i) => (
              <li
                key={s.label}
                className={`cursor-default font-[Gellix] text-sm transition-opacity duration-300 ${
                  i === activeIndex ? "opacity-100 text-[#A89572]" : "opacity-40 text-[#A89572]"
                }`}
              >
                {s.label}
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="mb-4 max-w-md font-[Gellix] text-2xl text-[#A89572]">
                {active.title}
              </h3>
              <p className="max-w-sm font-[Gellix] text-sm text-[#A89572]/80">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Columna derecha: imagen que cambia con crossfade */}
        <div className="relative w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image src={active.image} alt={active.title} fill className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}