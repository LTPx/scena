"use client";

import { createResponsive } from "../layout/createResponsive";
import ContactPageDesktop from "./Contact-Page.desktop";
import ContactPageMobile from "./Contact-Page.mobile";

export default createResponsive(ContactPageDesktop, ContactPageMobile);
