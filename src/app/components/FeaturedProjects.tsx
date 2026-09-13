"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Project {
  name: string;
  image: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  { name: "Villa Calatrava", image: "/images/project-villa-calatrava.jpg", tags: ["Audio & Video", "Engineering"] },
  { name: "Delphinus", image: "/images/project-delphinus.jpg", tags: ["Audio & Video", "Lighting Design"] },
  { name: "Cygnus", image: "/images/project-cygnus.jpg", tags: ["Audio & Video", "Home Automation", "Lighting Design"] },
];

const CARD_WIDTH_CLASS = "w-[90vw] lg:w-[85vw]";
const VH_PER_100VW_TRAVEL = 90;

// Cuánto scroll extra (en vh) se reserva al final para que el Footer suba y cubra la sección
const REVEAL_BUFFER_VH = 100;

export default function FeaturedProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [trackFraction, setTrackFraction] = useState(1); // % del wrapper dedicado a mover imágenes
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const distance = Math.max(trackWidth - viewportWidth, 0);
      setTravelDistance(distance);

      const extraScrollForTravel =
        (distance / viewportWidth) * (VH_PER_100WW_SAFE(VH_PER_100VW_TRAVEL) / 100) * viewportHeight;

      const baseHeight = viewportHeight + extraScrollForTravel; // altura dedicada a mover imágenes
      const bufferHeight = (REVEAL_BUFFER_VH / 100) * viewportHeight; // altura dedicada al reveal
      const totalHeight = baseHeight + bufferHeight;

      setWrapperHeight(totalHeight);
      setTrackFraction(baseHeight / totalHeight); // en qué % del scroll total termina el movimiento
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Framer clampea por defecto: después de trackFraction, el valor se queda fijo en -travelDistance
  const trackX = useTransform(scrollYProgress, [0, trackFraction], [0, -travelDistance]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight ? `${wrapperHeight}px` : "250vh" }}
      className="relative z-0 bg-[#F6F1EA]"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-10">
        <h2 className="mb-8 px-8 font-[Gellix] text-2xl text-[#A89572]">
          Proyectos destacados
        </h2>

        <motion.div ref={trackRef} style={{ x: trackX }} className="flex flex-1 gap-6 px-8">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className={`relative h-full flex-shrink-0 overflow-hidden rounded-md ${CARD_WIDTH_CLASS}`}
            >
              <Image src={project.image} alt={project.name} fill priority={i === 0} className="object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-8 left-8 font-[Gellix] text-2xl text-[#F6F5F1]">
                {project.name}
              </span>
              <div className="absolute bottom-8 right-8 flex gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="btn-office">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Helper trivial solo para que TypeScript no se queje si luego lo parametrizas
function VH_PER_100WW_SAFE(v: number) {
  return v;
}