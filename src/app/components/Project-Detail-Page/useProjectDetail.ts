"use client";

import { useEffect } from "react";
import { ProjectDetailWp } from "@/app/_interfaces/wordpress-components";
import { useLenis } from "../SmoothScrollProvider";

export interface ProjectDetailProps {
  data: ProjectDetailWp;
}

export function useProjectDetail(data: ProjectDetailWp) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis, data.title]);
}
