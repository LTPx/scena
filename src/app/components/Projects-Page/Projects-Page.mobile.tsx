"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { ProjectsPageProps, useProjectsFilter } from "./useProjectsFilter";
import { useStickyHorizontal } from "./useStickyHorizontal";
import { getAspectRatioNumber } from "../Gallery/aspect";

const IMAGE_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 67.85%, rgba(0, 0, 0, 0.4) 100%)";

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

  const isFirstFilterRun = useRef(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useStickyHorizontal(
    wrapperRef,
    stickyRef,
    trackRef,
    null,
    [filteredProjects],
    { speed: 0.9, center: true },
  );

  useEffect(() => {
    if (isFirstFilterRun.current) {
      isFirstFilterRun.current = false;
      return;
    }

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return;

    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const target = Math.max(0, wrapperTop - stickyTop);

    if (window.scrollY > target) {
      window.scrollTo({ top: target, behavior: "auto" });
    }
  }, [activeFilter]);

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 pb-[40px] pt-[220px]"
    >
      <h1 className="pointer-events-none absolute left-[130px] top-[18px] flex h-[18px] items-center font-[Gellix] text-[36px] font-normal not-italic leading-none tracking-[0%] text-[#A89572]">
        Projects
      </h1>

      <div className="relative flex flex-wrap items-center gap-2 px-[16px] pb-[16px]">
        {data.filters.map((filter) => {
          const isActive = activeFilter === filter.slug;
          return (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setActiveFilter(filter.slug)}
              className={`btn-gellix whitespace-nowrap ${
                isActive ? "btn-gellix-active" : "btn-gellix-default"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div ref={wrapperRef} className="relative">
        <div ref={stickyRef} className="sticky">
          <div
            data-header-theme="dark"
            className="overflow-hidden"
            style={{ height: IMAGE_HEIGHT_PX }}
          >
            <div
              ref={trackRef}
              className="flex px-[16px] will-change-transform"
              style={{ gap: GAP_PX, width: "max-content" }}
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
        </div>
      </div>
    </div>
  );
}
