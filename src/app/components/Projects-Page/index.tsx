"use client";

import { createResponsive } from "../layout/createResponsive";
import ProjectsPageDesktop from "./Projects-Page.desktop";
import ProjectsPageMobile from "./Projects-Page.mobile";

export default createResponsive(ProjectsPageDesktop, ProjectsPageMobile);
