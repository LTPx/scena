"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProjectsPageWp } from "@/app/_interfaces/wordpress-components";
import { Link } from "@/navigation";
import Grid, { COLS } from "./layout/Grid";

interface Props {
  data: ProjectsPageWp;
}

export default function ProjectsPage({ data }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return data.projects;
    return data.projects.filter((p) =>
      p.categories.some((c) => c.slug === activeFilter),
    );
  }, [activeFilter, data.projects]);

  return (
    <div data-header-theme="light" className="relative isolate z-0">
      <div className="sticky top-0 z-100 bg-[linear-gradient(0deg,rgba(246,245,241,0)_0%,#F6F5F1_49.65%)] pb-10">
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

      <div className="flex flex-col gap-6 pb-24 pt-6 md:gap-10 md:pt-10">
        {filteredProjects.map((item) => (
          <Grid key={item.project}>
            <Link
              href={`/projects/${item.slug}`}
              className={`${COLS.pressMedia} group relative block h-[70vh] w-full overflow-hidden md:h-[85vh]`}
            >
              <Image
                src={item.feature_image.url}
                alt={item.feature_image.alt || item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 83vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-8">
                <h2 className="font-[Gellix] text-[32px] font-normal not-italic leading-[100%] tracking-[0%] text-white md:text-[40px]">
                  {item.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {item.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 font-[Gellix] text-[14px] text-white backdrop-blur-sm"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Grid>
        ))}
      </div>
    </div>
  );
}
