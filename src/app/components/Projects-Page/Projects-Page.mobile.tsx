"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { ProjectsPageProps, useProjectsFilter } from "./useProjectsFilter";
import { useVerticalToHorizontalScroll } from "./useVerticalToHorizontalScroll";
import { getAspectRatioNumber } from "../Gallery/aspect";

const IMAGE_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 67.85%, rgba(0, 0, 0, 0.4) 100%)";

const HIDE_SCROLLBAR =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const IMAGE_HEIGHT_PX = 520;
const GAP_PX = 6;

export default function ProjectsPageMobile({
  data,
  initialFilter,
}: ProjectsPageProps) {
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectsFilter(
    data,
    initialFilter,
  );

  const filtersRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useVerticalToHorizontalScroll(scrollerRef, [filteredProjects]);

  useEffect(() => {
    const container = filtersRef.current;
    const chip = chipRefs.current[activeFilter];
    if (!container || !chip) return;

    const left =
      chip.offsetLeft - (container.clientWidth - chip.offsetWidth) / 2;

    container.scrollTo({
      left: Math.max(0, left),
      behavior: firstRender.current ? "auto" : "smooth",
    });
    firstRender.current = false;
  }, [activeFilter]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [activeFilter]);

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 pb-[40px] pt-[220px]"
    >
      <h1 className="pointer-events-none absolute left-[130px] top-[5px] font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89F82]">
        Projects
      </h1>

      <div
        ref={filtersRef}
        className={`relative flex items-center gap-2 overflow-x-auto px-[16px] pb-[16px] ${HIDE_SCROLLBAR}`}
      >
        {data.filters.map((filter) => {
          const isActive = activeFilter === filter.slug;
          return (
            <button
              key={filter.slug}
              ref={(node) => {
                chipRefs.current[filter.slug] = node;
              }}
              type="button"
              onClick={() => setActiveFilter(filter.slug)}
              className={`btn-gellix flex-shrink-0 whitespace-nowrap ${
                isActive ? "btn-gellix-active" : "btn-gellix-default"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div
        ref={scrollerRef}
        data-header-theme="dark"
        className={`flex overflow-x-auto overscroll-x-contain px-[16px] ${HIDE_SCROLLBAR}`}
        style={{ gap: GAP_PX }}
      >
        {filteredProjects.map((item, index) => {
          const image = item.feature_image;
          if (!image?.url) return null;

          const ratio = getAspectRatioNumber(image, (item as any).aspect);
          const width = Math.round(IMAGE_HEIGHT_PX * ratio);

          return (
            <Link
              key={item.project}
              href={`/projects/${item.slug}`}
              className="relative block flex-shrink-0 overflow-hidden"
              style={{ height: IMAGE_HEIGHT_PX, width }}
            >
              <Image
                src={image.url}
                alt={image.alt || item.title}
                fill
                sizes={`${width}px`}
                priority={index === 0}
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: IMAGE_OVERLAY_GRADIENT }}
              />

              <h2 className="absolute bottom-[16px] left-[14px] font-[Gellix] text-[32px] font-normal not-italic leading-[100%] tracking-[0%] text-white">
                {item.title}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
