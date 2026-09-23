"use client";

import { createResponsive } from "../layout/createResponsive";
import OutletPageDesktop from "./Outlet-Page.desktop";
import OutletPageMobile from "./Outlet-Page.mobile";

export default createResponsive(OutletPageDesktop, OutletPageMobile);
