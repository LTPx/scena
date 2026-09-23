// About-Page/index.tsx
"use client";
import { createResponsive } from "../layout/createResponsive";
import AboutPageDesktop from "./About-Page.desktop";
import AboutPageMobile from "./About-Page.mobile";

export default createResponsive(AboutPageDesktop, AboutPageMobile);
