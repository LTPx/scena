"use client";

import { createResponsive } from "../layout/createResponsive";
import HeroDesktop from "./Hero.desktop";
import HeroMobile from "./Hero.mobile";

export default createResponsive(HeroDesktop, HeroMobile);
