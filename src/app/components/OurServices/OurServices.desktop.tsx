import { ServiceWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import TypewriterText from "../TypewriterText";
import { useLenis } from "../SmoothScrollProvider";
import Image from "next/image";
import { Link } from "@/navigation";
import {
  SERVICE_ORDER,
  subscribePendingService,
  getPendingServiceSnapshot,
  getPendingServiceServerSnapshot,
} from "../../context/pendingServiceStore";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

interface OurServicesProps {
  services: ServiceWp[];
}

const VH_PER_STEP = 100;

const SLIDE_TRANSITION = {
  duration: 0.85,
  ease: [0.76, 0, 0.24, 1] as const,
};

const CTA_TRANSITION = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1] as const,
};

// Respaldo por si un servicio todavía no trae `slug` desde WP.
// Lo ideal es que el slug venga siempre del backend.
function slugify(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function OurServicesDesktop({ services }: OurServicesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [hasEntered, setHasEntered] = useState(false);

  const [layers, setLayers] = useState<
    { index: number; id: number | "initial"; direction: "down" | "up" }[]
  >([{ index: 0, id: "initial", direction: "down" }]);

  const layerIdRef = useRef(0);
  const prevIndexRef = useRef(0);
  const lastHandledTokenRef = useRef<number | null>(null);
  const [ctaHover, setCtaHover] = useState<"know" | "projects">("know");

  const pendingRequest = useSyncExternalStore(
    subscribePendingService,
    getPendingServiceSnapshot,
    getPendingServiceServerSnapshot,
  );

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!services.length) return;

    if (latest > 0) setHasEntered(true);

    const index = Math.min(
      services.length - 1,
      Math.floor(latest * services.length),
    );

    setActiveIndex(index);
  });

  useEffect(() => {
    if (scrollYProgress.get() > 0) setHasEntered(true);
  }, [scrollYProgress]);

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

  useEffect(() => {
    if (!pendingRequest) return;
    if (lastHandledTokenRef.current === pendingRequest.token) return;
    if (!lenis || !wrapperRef.current || !services.length) return;

    lastHandledTokenRef.current = pendingRequest.token;

    const orderIndex = SERVICE_ORDER.indexOf(pendingRequest.key);
    const targetIndex = Math.min(Math.max(orderIndex, 0), services.length - 1);

    const jump = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const currentScroll = lenis.scroll;
      const elementTop = rect.top + currentScroll;
      const elementHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress = (targetIndex + 0.5) / services.length;
      const targetScroll =
        elementTop + progress * Math.max(elementHeight - viewportHeight, 0);

      prevIndexRef.current = targetIndex;
      setActiveIndex(targetIndex);
      setLayers([{ index: targetIndex, id: "initial", direction: "down" }]);

      lenis.scrollTo(targetScroll, { immediate: true });
    };

    requestAnimationFrame(() => requestAnimationFrame(jump));
  }, [pendingRequest, lenis, services.length]);

  if (!services.length) {
    return null;
  }

  const active = services[activeIndex];
  const activeHref = `/services/${active.slug ?? slugify(active.label)}`;

  return (
    <div
      id="our-services"
      ref={wrapperRef}
      style={{ height: `${VH_PER_STEP * services.length}vh` }}
      className="relative"
    >
      <Grid
        ref={sectionRef}
        fullHeight
        data-header-theme="light"
        className="sticky top-0 grid-rows-[auto_1fr_auto] pt-[27px] pb-[40px] overflow-hidden"
      >
        <div className={`${COLS.content} row-start-1 overflow-hidden`}>
          <h2 className="headline-1 text-[#A89572]">
            <TypewriterText text="Nuestros servicios" play={hasEntered} />
          </h2>
        </div>

        <motion.div
          layout
          className="col-start-1 col-span-6 row-start-2 grid grid-cols-6 items-start gap-x-6 self-center"
        >
          <ul className={`${COLS.list} flex flex-col gap-2`}>
            {services.map((service, index) => (
              <motion.li
                key={service.label}
                onClick={() => setActiveIndex(index)}
                initial={{ x: -100, opacity: 0 }}
                animate={
                  hasEntered ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
                }
                transition={{
                  duration: 1,
                  delay: index * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="cursor-pointer font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]"
              >
                <motion.span
                  className="block"
                  animate={{ opacity: index === activeIndex ? 1 : 0.4 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.label}
                </motion.span>
              </motion.li>
            ))}
          </ul>

          <div className={COLS.content}>
            <AnimatePresence mode="wait">
              <motion.h3
                key={`title-${active.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="headline-1 font-sans text-[#A89572]"
              >
                {active.title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className={`${COLS.content} row-start-3 flex flex-col`}>
          <AnimatePresence mode="wait">
            <motion.p
              key="short-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]/80"
              dangerouslySetInnerHTML={{
                __html: active.description.replace(/<\/?p[^>]*>/g, "").trim(),
              }}
            />
          </AnimatePresence>

          <motion.div
            layout
            transition={CTA_TRANSITION}
            className="mt-[30px] inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1"
          >
            <button
              onMouseEnter={() => setCtaHover("know")}
              className={`relative z-10 btn-gellix ${
                ctaHover === "know" ? "text-white" : "text-[#A89572]"
              }`}
            >
              {ctaHover === "know" && (
                <motion.span
                  layoutId="cta-pill"
                  className="absolute inset-0 rounded-full bg-[#A89572]"
                  transition={CTA_TRANSITION}
                />
              )}
              <span className="relative z-10">know more</span>
            </button>

            {/* Ya no expande en el sitio: navega al detalle del servicio */}
            <Link
              href={activeHref}
              onMouseEnter={() => setCtaHover("projects")}
              className={`relative z-10 btn-gellix bg-transparent ${
                ctaHover === "projects" ? "text-white" : "text-[#A89572]"
              }`}
            >
              {ctaHover === "projects" && (
                <motion.span
                  layoutId="cta-pill"
                  className="absolute inset-0 rounded-full bg-[#A89572]"
                  transition={CTA_TRANSITION}
                />
              )}
              <span className="relative z-10">See Projects</span>
            </Link>
          </motion.div>
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
