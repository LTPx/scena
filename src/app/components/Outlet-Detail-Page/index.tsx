"use client";

import { createResponsive } from "../layout/createResponsive";
import OutletDetailPageDesktop from "./Outlet-Detail-Page.desktop";
import OutletDetailPageMobile from "./Outlet-Detail-Page.mobile";

export default createResponsive(
  OutletDetailPageDesktop,
  OutletDetailPageMobile,
);
