"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ProjectsPageWp } from "@/app/_interfaces/wordpress-components";
import { Link } from "@/navigation";
import Grid, { COLS, offsetForColumn } from "./layout/Grid";
import GlassButton from "./GlassButton";

interface Props {
  data: ProjectsPageWp;
}

const NEXT_PROJECT_PEEK_PX = 85;

const IMAGE_START_COL = 3;
const CATEGORIES_START_COL = 6;
const CATEGORIES_LEFT_OFFSET = `calc(${offsetForColumn(
  CATEGORIES_START_COL,
)} - ${offsetForColumn(IMAGE_START_COL)})`;

const IMAGE_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 67.85%, rgba(0, 0, 0, 0.4) 100%)";

export default function ProjectsPage({ data }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");
  const stickyRef = useRef<HTMLDivElement>(null);
  const [projectHeight, setProjectHeight] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return data.projects;
    return data.projects.filter((p) =>
      p.categories.some((c) => c.slug === activeFilter),
    );
  }, [activeFilter, data.projects]);

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
        className="sticky top-0 z-100 bg-[linear-gradient(0deg,rgba(246,245,241,0)_0%,#F6F5F1_49.65%)] pb-10"
      >
        <Grid className="items-center pt-10">
          <div className={COLS.projectsTitle}>
            <h1
              className="font-[Gellix] text-[40px] font-normal not-italic text-[#A89572]"
              style={{ lineHeight: "100%", letterSpacing: "0%" }}
            >
              {data.title}
            </h1>
          </div>

          <div
            className={`${COLS.projectFilters} flex flex-wrap items-center gap-2`}
          >
            {data.filters.map((filter) => {
              const isActive = activeFilter === filter.slug;

              return (
                <button
                  key={filter.slug}
                  type="button"
                  onClick={() => setActiveFilter(filter.slug)}
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

      <div className="flex flex-col gap-[6px] pb-24">
        {filteredProjects.map((item) => (
          <Grid key={item.project}>
            <Link
              href={`/projects/${item.slug}`}
              style={{
                height: projectHeight ? `${projectHeight}px` : "70vh",
              }}
              className={`${COLS.pressMedia} group relative block w-full overflow-hidden`}
            >
              <Image
                src={item.feature_image.url}
                alt={item.feature_image.alt || item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 83vw, 100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: IMAGE_OVERLAY_GRADIENT }}
              />

              <h2 className="absolute bottom-8 left-8 font-[Gellix] text-[32px] font-normal not-italic leading-[100%] tracking-[0%] text-white md:text-[40px]">
                {item.title}
              </h2>

              <div
                className="absolute bottom-8 right-8 flex flex-wrap items-center gap-2"
                style={{ left: CATEGORIES_LEFT_OFFSET }}
              >
                {item.categories.map((cat) => (
                  <GlassButton key={cat.id} as="span">
                    {cat.name}
                  </GlassButton>
                ))}
              </div>
            </Link>
          </Grid>
        ))}
      </div>
    </div>
  );
}
