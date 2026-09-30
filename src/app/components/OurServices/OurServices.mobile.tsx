"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import { ServiceWp } from "../../_interfaces/wordpress-components";
import {
  SERVICE_ORDER,
  subscribePendingService,
  getPendingServiceSnapshot,
  getPendingServiceServerSnapshot,
} from "../../context/pendingServiceStore";
import { sortServices } from "../Service-Detail-Page/servicesLayout";
import { getProjectsHref } from "../Service-Detail-Page/projectFilters";

interface Props {
  services: ServiceWp[];
}

function slugify(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function OurServicesMobile({ services: rawServices }: Props) {
  const services = useMemo(
    () => sortServices(rawServices, (s) => s.slug ?? slugify(s.label)),
    [rawServices],
  );

  const locale = useLocale();
  const wrapperRef = useRef<HTMLElement>(null);
  const lastHandledTokenRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const pendingRequest = useSyncExternalStore(
    subscribePendingService,
    getPendingServiceSnapshot,
    getPendingServiceServerSnapshot,
  );

  useEffect(() => {
    if (!pendingRequest) return;
    if (lastHandledTokenRef.current === pendingRequest.token) return;
    if (!services.length) return;

    lastHandledTokenRef.current = pendingRequest.token;

    const orderIndex = SERVICE_ORDER.indexOf(pendingRequest.key);
    const targetIndex = Math.min(Math.max(orderIndex, 0), services.length - 1);

    setActiveIndex(targetIndex);
    requestAnimationFrame(() => {
      wrapperRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [pendingRequest, services.length]);

  if (!services.length) return null;

  const active = services[activeIndex];
  const activeSlug = active.slug ?? slugify(active.label);
  const activeHref = `/services/${activeSlug}`;
  const projectsHref = getProjectsHref(activeSlug, locale);

  return (
    <section
      id="our-services"
      ref={wrapperRef}
      data-header-theme="light"
      className="px-[15px] pb-10 pt-[60px] text-[#A89572]"
    >
      <h2 className="font-[Gellix] text-[30px] font-normal leading-[100%] tracking-[0%]">
        Our Services
      </h2>

      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
        {services.map((service, index) => (
          <li key={service.label}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="font-[Gellix] text-[16px] font-normal leading-[135%] tracking-[0%] transition-opacity duration-300"
              style={{ opacity: index === activeIndex ? 1 : 0.4 }}
            >
              {service.label}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-10"
        >
          <h3 className="font-[Gellix] text-[30px] font-normal leading-[100%] tracking-[0%]">
            {active.title}
          </h3>

          <p
            className="mt-10 font-[Gellix] text-[16px] font-normal leading-[135%] tracking-[0%] text-[#A89572]"
            dangerouslySetInnerHTML={{
              __html: active.description.replace(/<\/?p[^>]*>/g, "").trim(),
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.image.url}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={active.image.url}
              alt={active.image.alt || active.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1">
        <Link
          href={activeHref}
          className="btn-gellix bg-transparent text-[#A89572] transition-colors duration-200 active:bg-[#A89572] active:text-white"
        >
          know more
        </Link>
        <Link
          href={projectsHref}
          className="btn-gellix bg-transparent text-[#A89572] transition-colors duration-200 active:bg-[#A89572] active:text-white"
        >
          See Projects
        </Link>
      </div>
    </section>
  );
}
