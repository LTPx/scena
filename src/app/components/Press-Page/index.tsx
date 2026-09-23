"use client";

import { createResponsive } from "../layout/createResponsive";
import PressPageDesktop from "./Press-Page.desktop";
import PressPageMobile from "./Press-Page.mobile";

export default createResponsive(PressPageDesktop, PressPageMobile);
