// AboutDifferentiatorsTrack/index.tsx
"use client";
import { createResponsive } from "../layout/createResponsive";
import AboutDifferentiatorsTrackDesktop from "./AboutDifferentiatorsTrack.desktop";
import AboutDifferentiatorsTrackMobile from "./AboutDifferentiatorsTrack.mobile";

export default createResponsive(
  AboutDifferentiatorsTrackDesktop,
  AboutDifferentiatorsTrackMobile,
);
