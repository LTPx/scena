"use client";

import { ServiceDetailWp } from "../../_interfaces/wordpress-components";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import ServiceDetailPageDesktop from "./Service-Detail-Page.desktop";
import ServiceDetailPageMobile from "./Service-Detail-Page.mobile";

interface Props {
  data: ServiceDetailWp;
}

export default function ServiceDetailPage({ data }: Props) {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) return null;

  return isDesktop ? (
    <ServiceDetailPageDesktop data={data} />
  ) : (
    <ServiceDetailPageMobile data={data} />
  );
}
