"use client";

import { createResponsive } from "../layout/createResponsive";
import WhereWeMakeDifferenceDesktop from "./WhereWeMakeDifference.desktop";
import WhereWeMakeDifferenceMobile from "./WhereWeMakeDifference.mobile";

export default createResponsive(
  WhereWeMakeDifferenceDesktop,
  WhereWeMakeDifferenceMobile,
);
