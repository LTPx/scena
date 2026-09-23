"use client";

import { createResponsive } from "../layout/createResponsive";
import OurServicesDesktop from "./OurServices.desktop";
import OurServicesMobile from "./OurServices.mobile";

export default createResponsive(OurServicesDesktop, OurServicesMobile);
