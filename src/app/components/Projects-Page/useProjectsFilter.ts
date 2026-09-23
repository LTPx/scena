"use client";

import { useMemo, useState } from "react";
import { ProjectsPageWp } from "@/app/_interfaces/wordpress-components";

export interface ProjectsPageProps {
  data: ProjectsPageWp;
}

export function useProjectsFilter(data: ProjectsPageWp) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return data.projects;
    return data.projects.filter((p) =>
      p.categories.some((c) => c.slug === activeFilter),
    );
  }, [activeFilter, data.projects]);

  return { activeFilter, setActiveFilter, filteredProjects };
}
