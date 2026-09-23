"use client";

import { createResponsive } from "../layout/createResponsive";
import HeaderDesktop from "./Header.desktop";
import HeaderMobile from "./Header.mobile";

export default createResponsive(HeaderDesktop, HeaderMobile);
