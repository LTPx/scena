"use client";

import { createResponsive } from "../layout/createResponsive";
import FooterDesktop from "./Footer.desktop";
import FooterMobile from "./Footer.mobile";

export default createResponsive(FooterDesktop, FooterMobile);
