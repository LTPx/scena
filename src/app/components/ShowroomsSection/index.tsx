"use client";

import { createResponsive } from "../layout/createResponsive";
import ShowroomsSectionDesktop from "./ShowroomsSection.desktop";
import ShowroomsSectionMobile from "./ShowroomsSection.mobile";

export default createResponsive(
  ShowroomsSectionDesktop,
  ShowroomsSectionMobile,
);
