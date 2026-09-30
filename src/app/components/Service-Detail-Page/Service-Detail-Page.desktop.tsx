"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import { ServiceDetailWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import { ALIGN_TOP, sortServices } from "./servicesLayout";
import { getProjectsHref } from "./projectFilters";

interface Props {
  data: ServiceDetailWp;
}

export default function ServiceDetailPageDesktop({ data }: Props) {
  const locale = useLocale();

  return (
    <div data-header-theme="light" className="relative min-h-screen">
      <Grid
        fullHeight
        className="grid-rows-[1fr] pt-[27px] pb-[40px] overflow-hidden"
      >
        <div className="pointer-events-none col-start-1 col-span-6 row-start-1 grid grid-cols-6 gap-x-6 self-start">
          <ul
            className={`${COLS.list} pointer-events-auto flex flex-col gap-2`}
            style={{ marginTop: ALIGN_TOP }}
          >
            {sortServices(data.services_nav, (s) => s.slug).map((service) => {
              const isActive = service.slug === data.slug;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`block font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {service.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          data-lenis-prevent
          className={`${COLS.content} row-start-1 h-full min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          <div className="flex min-h-full flex-col">
            <div
              className="flex shrink-0 flex-col gap-[50px]"
              style={{ height: ALIGN_TOP }}
            >
              <h2 className="headline-1 text-[#A89572]">Servicios</h2>
              <h3 className="font-quadrant text-[66px] font-normal not-italic leading-[110%] tracking-[0%] text-[#A89572]">
                {data.label}
              </h3>
            </div>

            <h2 className="headline-1 text-[#A89572] mt-[-6px]">
              {data.title}
            </h2>
            <div
              className="service-expanded-content mt-auto shrink-0 pt-10"
              dangerouslySetInnerHTML={{ __html: data.expanded_content }}
            />
          </div>
        </div>

        <div className="pointer-events-none col-start-1 col-span-6 row-start-1 grid grid-cols-6 gap-x-6 self-end">
          <div className={`${COLS.list} pointer-events-auto`}>
            <Link
              href={getProjectsHref(data.slug, locale)}
              className="btn-gellix"
            >
              See Projects
            </Link>
          </div>
        </div>

        <div
          data-header-theme="dark"
          className={`${COLS.media} relative row-start-1 row-end-2 -my-14 -mr-10 overflow-hidden`}
        >
          <Image
            src={data.image.url}
            alt={data.image.alt || data.label}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
      </Grid>
    </div>
  );
}
