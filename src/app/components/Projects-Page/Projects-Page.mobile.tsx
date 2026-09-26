"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { ProjectsPageProps, useProjectsFilter } from "./useProjectsFilter";

const IMAGE_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 67.85%, rgba(0, 0, 0, 0.4) 100%)";

const HIDE_SCROLLBAR =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export default function ProjectsPageMobile({
  data,
  initialFilter,
}: ProjectsPageProps) {
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectsFilter(
    data,
    initialFilter,
  );

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 pb-[40px] pt-[200px]"
    >
      <div
        className={`flex items-center gap-2 overflow-x-auto px-[16px] pb-[16px] ${HIDE_SCROLLBAR}`}
      >
        {data.filters.map((filter) => {
          const isActive = activeFilter === filter.slug;
          return (
            <button
              key={filter.slug}
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
        key={activeFilter}
        className={`flex snap-x snap-mandatory gap-[6px] overflow-x-auto scroll-pl-[16px] px-[16px] ${HIDE_SCROLLBAR}`}
      >
        {filteredProjects.map((item, index) => (
          <Link
            key={item.project}
            href={`/projects/${item.slug}`}
            className="relative block h-[520px] w-[calc(100vw-48px)] flex-shrink-0 snap-start overflow-hidden"
          >
            <Image
              src={item.feature_image.url}
              alt={item.feature_image.alt || item.title}
              fill
              sizes="100vw"
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
        ))}
      </div>
    </div>
  );
}
