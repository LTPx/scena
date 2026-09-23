// PartnersMarquee/index.tsx
"use client";
import { createResponsive } from "../layout/createResponsive";
import PartnersMarqueeDesktop from "./PartnersMarquee.desktop";
import PartnersMarqueeMobile from "./PartnersMarquee.mobile";

export default createResponsive(PartnersMarqueeDesktop, PartnersMarqueeMobile);
