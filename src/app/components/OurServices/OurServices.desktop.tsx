import { ServiceWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import TypewriterText from "../TypewriterText";
import { useLenis } from "../SmoothScrollProvider";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import {
  SERVICE_ORDER,
  subscribePendingService,
  getPendingServiceSnapshot,
  getPendingServiceServerSnapshot,
} from "../../context/pendingServiceStore";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ALIGN_TOP, sortServices } from "../Service-Detail-Page/servicesLayout";
import { getProjectsHref } from "../Service-Detail-Page/projectFilters";

interface OurServicesProps {
  services: ServiceWp[];
}

const VH_PER_STEP = 100;

const STEP_DURATION = 0.9;

const STEP_LOCK_MS = 700;

const FRESH_GAP_MS = 100;

const MIN_DELTA = 4;

const SLIDE_TRANSITION = {
  duration: 0.85,
  ease: [0.76, 0, 0.24, 1] as const,
};

const CTA_TRANSITION = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1] as const,
};

function slugify(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function OurServicesDesktop({
  services: rawServices,
}: OurServicesProps) {
  const services = useMemo(
    () => sortServices(rawServices, (s) => s.slug ?? slugify(s.label)),
    [rawServices],
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [hasEntered, setHasEntered] = useState(false);

  const [layers, setLayers] = useState<
    { index: number; id: number | "initial"; direction: "down" | "up" }[]
  >([{ index: 0, id: "initial", direction: "down" }]);

  const layerIdRef = useRef(0);
  const prevIndexRef = useRef(0);
  const lastHandledTokenRef = useRef<number | null>(null);
  const [ctaHover, setCtaHover] = useState<"know" | "projects" | null>(null);

  const inZoneRef = useRef(false);
  const exitingRef = useRef(false);
  const lockedUntilRef = useRef(0);
  const waitFreshRef = useRef(false);
  const lastWheelRef = useRef({ time: 0, abs: 0 });

  const pendingRequest = useSyncExternalStore(
    subscribePendingService,
    getPendingServiceSnapshot,
    getPendingServiceServerSnapshot,
  );

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const count = services.length;

  const getMetrics = () => {
    const el = wrapperRef.current;
    if (!el || !lenis) return null;
    const top = el.getBoundingClientRect().top + lenis.scroll;
    const range = Math.max(el.offsetHeight - window.innerHeight, 0);
    return { top, range };
  };

  const stepScroll = (index: number) => {
    const m = getMetrics();
    if (!m) return null;
    return m.top + ((index + 0.5) / count) * m.range;
  };

  const goTo = (index: number, duration = STEP_DURATION) => {
    const target = stepScroll(index);
    if (target === null || !lenis) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
    lenis.scrollTo(target, { duration, force: true });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!count) return;

    if (latest > 0) setHasEntered(true);

    const inZone = latest > 0 && latest < 1;

    if (exitingRef.current) {
      if (!inZone) exitingRef.current = false;
      return;
    }

    if (inZone && !inZoneRef.current && lenis) {
      inZoneRef.current = true;
      lenis.stop();

      const idx = Math.min(count - 1, Math.floor(latest * count));
      lockedUntilRef.current = performance.now() + STEP_LOCK_MS;
      waitFreshRef.current = true;
      goTo(idx, 0.6);
    } else if (!inZone && inZoneRef.current) {
      inZoneRef.current = false;
      lenis?.start();
    }
  });

  useEffect(() => {
    if (scrollYProgress.get() > 0) setHasEntered(true);
  }, [scrollYProgress]);

  useEffect(() => {
    if (!lenis || !count) return;

    const exit = (target: number) => {
      inZoneRef.current = false;
      exitingRef.current = true;
      lenis.start();
      lenis.scrollTo(target, { duration: STEP_DURATION, force: true });
    };

    const onWheel = (e: WheelEvent) => {
      if (!inZoneRef.current) return;

      e.preventDefault();

      const now = performance.now();
      const abs = Math.abs(e.deltaY);
      const prev = lastWheelRef.current;
      const gap = now - prev.time;
      const fresh = gap > FRESH_GAP_MS || abs > prev.abs + 10;
      lastWheelRef.current = { time: now, abs };

      if (abs < MIN_DELTA) return;
      if (now < lockedUntilRef.current) return;

      if (waitFreshRef.current) {
        if (!fresh) return;
        waitFreshRef.current = false;
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = activeIndexRef.current + dir;

      lockedUntilRef.current = now + STEP_LOCK_MS;
      waitFreshRef.current = true;

      if (next < 0 || next >= count) {
        const m = getMetrics();
        if (!m) return;
        exit(next < 0 ? m.top - 2 : m.top + m.range + 2);
        return;
      }

      goTo(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (inZoneRef.current) lenis.start();
      inZoneRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, count]);

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
    if (!lenis || !wrapperRef.current || !count) return;

    lastHandledTokenRef.current = pendingRequest.token;

    const orderIndex = SERVICE_ORDER.indexOf(pendingRequest.key);
    const jumpIndex = Math.min(Math.max(orderIndex, 0), count - 1);

    const jump = () => {
      const target = stepScroll(jumpIndex);
      if (target === null) return;

      prevIndexRef.current = jumpIndex;
      activeIndexRef.current = jumpIndex;
      setActiveIndex(jumpIndex);
      setLayers([{ index: jumpIndex, id: "initial", direction: "down" }]);

      lockedUntilRef.current = performance.now() + STEP_LOCK_MS;
      waitFreshRef.current = true;

      lenis.scrollTo(target, { immediate: true, force: true });
    };

    requestAnimationFrame(() => requestAnimationFrame(jump));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRequest, lenis, count]);

  if (!count) {
    return null;
  }

  const active = services[activeIndex];
  const activeSlug = active.slug ?? slugify(active.label);
  const activeHref = `/services/${activeSlug}`;
  const projectsHref = getProjectsHref(activeSlug, locale);

  return (
    <div
      id="our-services"
      ref={wrapperRef}
      style={{ height: `${VH_PER_STEP * count}vh` }}
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
        <div className="pointer-events-none col-start-1 col-span-6 row-start-1 row-end-4 grid grid-cols-6 gap-x-6 self-start">
          <ul
            className={`${COLS.list} pointer-events-auto flex flex-col gap-2`}
            style={{ marginTop: ALIGN_TOP }}
          >
            {services.map((service, index) => (
              <motion.li
                key={service.label}
                onClick={() => goTo(index)}
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
        </div>

        <div className="pointer-events-none col-start-1 col-span-6 row-start-1 row-end-4 grid grid-cols-6 gap-x-6 self-start">
          <div
            className={`${COLS.content} pointer-events-auto`}
            style={{ marginTop: ALIGN_TOP }}
          >
            <AnimatePresence mode="wait">
              <motion.h3
                key={`title-${active.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="headline-1 font-sans text-[#A89572] mt-[-6px]"
              >
                {active.title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

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
            onMouseLeave={() => setCtaHover(null)}
            className="mt-[30px] inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1"
          >
            <Link
              href={activeHref}
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
            </Link>

            <Link
              href={projectsHref}
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
