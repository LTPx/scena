"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import Grid, { COLS, offsetForColumn } from "../layout/Grid";
import GlassButton from "../GlassButton";
import { useLenis } from "../SmoothScrollProvider";
import { ProjectsPageProps, useProjectsFilter } from "./useProjectsFilter";

const NEXT_PROJECT_PEEK_PX = 85;

const IMAGE_START_COL = 3;
const CATEGORIES_START_COL = 6;
const CATEGORIES_LEFT_OFFSET = `calc(${offsetForColumn(
  CATEGORIES_START_COL,
)} - ${offsetForColumn(IMAGE_START_COL)})`;

const IMAGE_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 67.85%, rgba(0, 0, 0, 0.4) 100%)";

export default function ProjectsPageDesktop({
  data,
  initialFilter,
}: ProjectsPageProps) {
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectsFilter(
    data,
    initialFilter,
  );

  const lenis = useLenis();

  const stickyRef = useRef<HTMLDivElement>(null);
  const [projectHeight, setProjectHeight] = useState<number | null>(null);

  const handleFilterChange = (slug: string) => {
    if (slug === activeFilter) return;
    setActiveFilter(slug);

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    const measure = () => {
      const headerHeight = stickyEl.offsetHeight;
      const vh = window.innerHeight;
      setProjectHeight(Math.max(vh - headerHeight - NEXT_PROJECT_PEEK_PX, 0));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stickyEl);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div data-header-theme="light" className="relative isolate z-0">
      <div
        ref={stickyRef}
        className="sticky top-0 z-100 pb-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(246,245,241,0) 0%, rgba(246,245,241,0.03) 4.97%, rgba(246,245,241,0.10) 9.93%, rgba(246,245,241,0.22) 14.9%, rgba(246,245,241,0.35) 19.86%, rgba(246,245,241,0.50) 24.83%, rgba(246,245,241,0.65) 29.79%, rgba(246,245,241,0.78) 34.76%, rgba(246,245,241,0.90) 39.72%, rgba(246,245,241,0.97) 44.69%, #F6F5F1 49.65%)",
        }}
      >
        <Grid className="items-start">
          <div className={COLS.projectsTitle}>
            <h1
              className="mt-[30px] headline-2 text-[#A89572]"
              style={{ lineHeight: "100%", letterSpacing: "0%" }}
            >
              Projects
            </h1>
          </div>

          <div
            className={`${COLS.projectFilters} mt-[37px] flex flex-wrap items-center gap-2`}
          >
            {data.filters.map((filter) => {
              const isActive = activeFilter === filter.slug;
              return (
                <button
                  key={filter.slug}
                  type="button"
                  onClick={() => handleFilterChange(filter.slug)}
                  className={`btn-gellix ${
                    isActive ? "btn-gellix-active" : "btn-gellix-default"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Grid>
      </div>

      <div className="flex flex-col gap-[6px] pb-[40px]">
        {filteredProjects.map((item) => (
          <Grid key={item.project}>
            <div
              style={{ height: projectHeight ? `${projectHeight}px` : "70vh" }}
              className={`${COLS.pressMedia} group relative block w-full overflow-hidden`}
            >
              <Link
                href={`/projects/${item.slug}`}
                aria-label={item.title}
                className="absolute inset-0 block"
              >
                <Image
                  src={item.feature_image.url}
                  alt={item.feature_image.alt || item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="83vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: IMAGE_OVERLAY_GRADIENT }}
                />
              </Link>

              <h2 className="pointer-events-none absolute bottom-8 left-8 font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-white">
                {item.title}
              </h2>

              <div
                className="pointer-events-none absolute bottom-8 right-8 z-10 flex flex-wrap items-center gap-2"
                style={{ left: CATEGORIES_LEFT_OFFSET }}
              >
                {item.categories.map((cat) => (
                  <GlassButton
                    key={cat.id}
                    className="pointer-events-auto"
                    onClick={() => handleFilterChange(cat.slug)}
                  >
                    {cat.name}
                  </GlassButton>
                ))}
              </div>
            </div>
          </Grid>
        ))}
      </div>
    </div>
  );
}
