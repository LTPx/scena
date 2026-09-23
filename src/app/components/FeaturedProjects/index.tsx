"use client";

import { createResponsive } from "../layout/createResponsive";
import FeaturedProjectsDesktop from "./FeaturedProjects.desktop";
import FeaturedProjectsMobile from "./FeaturedProjects.mobile";

export default createResponsive(
  FeaturedProjectsDesktop,
  FeaturedProjectsMobile,
);
