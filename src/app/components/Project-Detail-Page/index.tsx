"use client";

import { createResponsive } from "../layout/createResponsive";
import ProjectDetailPageDesktop from "./Project-Detail-Page.desktop";
import ProjectDetailPageMobile from "./Project-Detail-Page.mobile";

export default createResponsive(
  ProjectDetailPageDesktop,
  ProjectDetailPageMobile,
);
