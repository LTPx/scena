"use client";

import { createResponsive } from "../layout/createResponsive";
import PressDetailPageDesktop from "./Press-Detail-Page.desktop";
import PressDetailPageMobile from "./Press-Detail-Page.mobile";

export default createResponsive(PressDetailPageDesktop, PressDetailPageMobile);
