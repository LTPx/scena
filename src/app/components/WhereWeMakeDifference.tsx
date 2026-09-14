"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface DifferenceCard {
  number: string;
  title: string;
  description: string;
}

function GlobeNetworkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Globo */}
      <circle cx="60" cy="80" r="46" stroke="currentColor" strokeWidth="1.4" />
      <line
        x1="14"
        y1="80"
        x2="106"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <line
        x1="60"
        y1="34"
        x2="60"
        y2="126"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M60 34C42 50 42 110 60 126"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M60 34C78 50 78 110 60 126"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Ramas hacia los nodos */}
      <path d="M60 80H92" stroke="currentColor" strokeWidth="1.4" />
      <path d="M92 80V58" stroke="currentColor" strokeWidth="1.4" />
      <path d="M92 80V102" stroke="currentColor" strokeWidth="1.4" />
      <path d="M92 58H124" stroke="currentColor" strokeWidth="1.4" />
      <path d="M92 102H124" stroke="currentColor" strokeWidth="1.4" />
      <path d="M92 80H124" stroke="currentColor" strokeWidth="1.4" />
      {/* Nodos */}
      <circle cx="124" cy="58" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="124" cy="80" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="124" cy="102" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="106" cy="122" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M92 102L106 122" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SignalWavesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Línea con 3 nodos */}
      <line
        x1="40"
        y1="80"
        x2="120"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="40" cy="80" r="9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="80" cy="80" r="9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="120" cy="80" r="9" stroke="currentColor" strokeWidth="1.4" />
      {/* Ondas izquierda */}
      <path
        d="M22 62C10 72 10 88 22 98"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 50C-10 66 -10 94 8 110"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Ondas derecha */}
      <path
        d="M138 62C150 72 150 88 138 98"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M152 50C170 66 170 94 152 110"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function TeamCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Centro */}
      <circle cx="80" cy="80" r="24" stroke="currentColor" strokeWidth="1.4" />
      {/* Arcos conectores */}
      <path d="M80 44V16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M80 116V144" stroke="currentColor" strokeWidth="1.4" />
      <path d="M44 80H16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M116 80H144" stroke="currentColor" strokeWidth="1.4" />
      {/* Personas arriba / abajo */}
      <g>
        <circle
          cx="80"
          cy="16"
          r="10"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M64 6C64 -2 96 -2 96 6"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </g>
      <g>
        <circle
          cx="80"
          cy="144"
          r="10"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M64 154C64 162 96 162 96 154"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </g>
      {/* Nodos izquierda / derecha */}
      <circle cx="16" cy="80" r="10" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="144" cy="80" r="10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function OrbitIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="80" cy="80" r="18" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="80"
        cy="80"
        rx="60"
        ry="24"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse
        cx="80"
        cy="80"
        rx="24"
        ry="60"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="140" cy="80" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="80" cy="20" r="7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const ICONS = [GlobeNetworkIcon, SignalWavesIcon, TeamCircleIcon, OrbitIcon];

const CARDS: DifferenceCard[] = [
  {
    number: "01",
    title: "Ingeniería propia",
    description: "Diseñamos e integramos cada sistema a medida del espacio.",
  },
  {
    number: "02",
    title: "Instalación certificada",
    description:
      "Equipo técnico especializado en marcas premium de audio y video.",
  },
  {
    number: "03",
    title: "Soporte continuo",
    description: "Mantenimiento y actualización de los sistemas post-entrega.",
  },
  {
    number: "04",
    title: "Diseño a medida",
    description:
      "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
  {
    number: "05",
    title: "Diseño a medida",
    description:
      "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
  {
    number: "06",
    title: "Diseño a medida",
    description:
      "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
  {
    number: "07",
    title: "Diseño a medida",
    description:
      "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
  },
];

const CARD_WIDTH_CLASS = "w-[85vw] sm:w-[420px]";
const VH_PER_100VW_TRAVEL = 100;

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
      const extraScroll =
        (distance / viewportWidth) * (VH_PER_100VW_TRAVEL / 100) * vh;
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
      className="relative bg-[#F6F1EA]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2 className="mb-12 whitespace-pre-line px-8 font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] md:px-16">
          {"Donde marcamos\nla diferencia"}
        </h2>
        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="flex gap-6 px-8 pr-[10vw] md:px-16"
        >
          {CARDS.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={card.title}
                className={`flex flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-[20px] ${CARD_WIDTH_CLASS}`}
                style={{ height: "540px" }}
              >
                <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[35px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                  {card.title}
                </h3>

                <div className="flex flex-1 items-center justify-center">
                  <Icon className="h-36 w-36 text-[#A89572]" />
                </div>

                <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
