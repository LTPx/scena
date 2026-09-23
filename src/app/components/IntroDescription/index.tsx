"use client";

import { createResponsive } from "../layout/createResponsive";
import IntroDescriptionDesktop from "./IntroDescription.desktop";
import IntroDescriptionMobile from "./IntroDescription.mobile";

export default createResponsive(
  IntroDescriptionDesktop,
  IntroDescriptionMobile,
);
