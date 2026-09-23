"use client";

import { createResponsive } from "../layout/createResponsive";
import GalleryDesktop from "./Gallery.desktop";
import GalleryMobile from "./Gallery.mobile";

export default createResponsive(GalleryDesktop, GalleryMobile);
