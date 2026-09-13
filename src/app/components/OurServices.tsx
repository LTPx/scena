"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    label: "Engineering",
    title:
      "La ingeniería es el punto de partida que asegura precisión, armonía y visión de conjunto.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    image: "/images/service-engineering.jpg",
  },
  {
    label: "Audio & Video",
    title: "Tratamos el sonido y la imagen como lenguajes del lujo universal.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    image: "/images/service-audio.jpg",
  },
  {
    label: "Home Automation",
    title: "La automatización se vuelve invisible cuando está bien diseñada.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    image: "/images/service-engineering.jpg",
  },
  {
    label: "Lighting Design",
    title: "La luz define el carácter y el ritmo de cada espacio.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    image: "/images/service-engineering.jpg",
  },
  {
    label: "MEP",
    title:
      "Mechanical, Electrical & Plumbing: la base técnica que sostiene el diseño.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    image: "/images/service-engineering.jpg",
  },
];

// Cuántas "pantallas" de scroll dura la sección completa.
const VH_PER_STEP = 100;

// Duración y curva del deslizamiento de imagen entre servicios.
// La curva ease-in-out-quart da esa sensación "premium" de arranque/frenado suave.
const SLIDE_TRANSITION = { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const };

export default function OurServices() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Pila de capas de imagen. La primera se queda estática de por vida;
  // cada vez que cambia el servicio activo se apila una nueva encima,
  // que desliza desde abajo y tapa a la anterior. La anterior NO se
  // anima "para salir": se queda quieta y solo se retira del array
  // cuando la nueva termina de cubrirla del todo (onAnimationComplete),
  // así se garantiza que la superposición dure la transición completa.
  const [layers, setLayers] = useState<
    { index: number; id: number | "initial" }[]
  >([{ index: 0, id: "initial" }]);
  const layerIdRef = useRef(0);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      SERVICES.length - 1,
      Math.floor(latest * SERVICES.length),
    );
    setActiveIndex(index);
  });

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;
    layerIdRef.current += 1;
    const newLayer = { index: activeIndex, id: layerIdRef.current };
    setLayers((prev) => [...prev, newLayer]);
  }, [activeIndex]);

  const active = SERVICES[activeIndex];

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${VH_PER_STEP * SERVICES.length}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen overflow-hidden bg-[#F6F1EA]">
        {/* Columna izquierda */}
        <div className="flex w-1/2 flex-col h-full px-16 py-14">
          <h2 className="font-[Gellix] text-3xl text-[#A89572] pt-2">
            Nuestros servicios
          </h2>

          <div className="flex flex-1 items-center">
            <div className="flex w-full items-start gap-10">
              {/* Tabs */}
              <ul className="flex w-32 flex-shrink-0 flex-col gap-2">
                {SERVICES.map((s, i) => (
                  <li
                    key={s.label}
                    className={`cursor-default font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-500 ${
                      i === activeIndex ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    {s.label}
                  </li>
                ))}
              </ul>

              {/* Título + descripción + botones */}
              <div className="max-w-md">
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
                    <p className="mt-6 max-w-sm font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]/80">
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
            </div>
          </div>
        </div>

        {/* Línea divisoria punteada */}
        <div className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 border-l border-dashed border-[#A89572]/50 z-10" />

        {/* Columna derecha: cada imagen nueva se APILA y se desliza por
            encima de la anterior. La anterior permanece fija, visible,
            y solo se elimina del DOM cuando la nueva termina de cubrirla
            (ver onAnimationComplete) — así la superposición dura toda
            la transición, no un instante. */}
        <div className="relative w-1/2 h-full overflow-hidden">
          {layers.map((layer, i) => {
            const isTopLayer = i === layers.length - 1;
            const isInitial = layer.id === "initial";

            return (
              <motion.div
                key={layer.id}
                className="absolute inset-0"
                style={{ zIndex: i }}
                initial={isInitial ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={SLIDE_TRANSITION}
                onAnimationComplete={() => {
                  // Cuando la capa de arriba termina de deslizarse,
                  // descartamos todo lo que quedó debajo (ya tapado).
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
                  src={SERVICES[layer.index].image}
                  alt={SERVICES[layer.index].title}
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
