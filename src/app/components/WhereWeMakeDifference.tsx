"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface DifferenceCard {
  number: string;
  title: string;
  description: string;
}

const CARDS: DifferenceCard[] = [
  {
    number: "01",
    title: "Ingeniería propia",
    description: "Diseñamos e integramos cada sistema a medida del espacio.",
  },
  {
    number: "02",
    title: "Instalación certificada",
    description: "Equipo técnico especializado en marcas premium de audio y video.",
  },
  {
    number: "03",
    title: "Soporte continuo",
    description: "Mantenimiento y actualización de los sistemas post-entrega.",
  },
  {
    number: "04",
    title: "Diseño a medida",
    description: "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
    {
    number: "05",
    title: "Diseño a medida",
    description: "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
    {
    number: "06",
    title: "Diseño a medida",
    description: "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
    {
    number: "07",
    title: "Diseño a medida",
    description: "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
];

const CARD_WIDTH_CLASS = "w-[85vw] sm:w-[420px]";
const VH_PER_100VW_TRAVEL = 60;

export default function WhereWeMakeDifference() {
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const trackX = useTransform(smoothProgress, [0, 1], [0, -travelDistance]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight ? `${wrapperHeight}px` : "150vh" }}
      className="relative bg-[#231F1A]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2 className="mb-12 px-8 font-[Gellix] text-3xl text-[#F6F5F1] md:text-4xl">
          Donde marcamos la diferencia
        </h2>

        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="flex gap-6 pl-8 pr-[10vw]"
        >
          {CARDS.map((card) => (
            <div
              key={card.number}
              className={`flex-shrink-0 rounded-2xl bg-[#2E2A24] p-8 ${CARD_WIDTH_CLASS}`}
            >
              <span className="text-sm text-[#A89572]">{card.number}</span>
              <h3 className="mt-6 font-[Gellix] text-xl text-[#F6F5F1]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#F6F5F1]/70">
                {card.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}