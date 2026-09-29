"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { ServiceDetailWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";

interface Props {
  data: ServiceDetailWp;
}

export default function ServiceDetailPageDesktop({ data }: Props) {
  return (
    <div data-header-theme="light" className="relative min-h-screen">
      <Grid
        fullHeight
        className="grid-rows-[auto_1fr_auto] pt-[27px] pb-[40px] overflow-hidden"
      >
        <div className={`${COLS.content} row-start-1`}>
          <h2 className="headline-1 text-[#A89572]">Servicios</h2>
        </div>

        <div className="col-start-1 col-span-6 row-start-2 grid grid-cols-6 items-start gap-x-6 self-center">
          <ul className={`${COLS.list} flex flex-col gap-2`}>
            {data.services_nav.map((service) => {
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

          <div className={COLS.content}>
            <h3 className="headline-1 font-quadrant text-[#A89572]">
              {data.label}
            </h3>
          </div>
        </div>

        <div className={`${COLS.content} row-start-3 flex flex-col`}>
          <p
            className="mb-6 font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]/80"
            dangerouslySetInnerHTML={{
              __html: data.description.replace(/<\/?p[^>]*>/g, "").trim(),
            }}
          />

          <div
            className="service-expanded-content max-h-[45vh] overflow-y-auto pr-2"
            dangerouslySetInnerHTML={{ __html: data.expanded_content }}
          />

          <Link
            href="/projects"
            className="btn-gellix mt-[30px] w-fit bg-white text-[#A89572] hover:bg-[#A89572] hover:text-white"
          >
            See Projects
          </Link>
        </div>

        <div
          data-header-theme="dark"
          className={`${COLS.media} relative row-start-1 row-end-4 -my-14 -mr-10 overflow-hidden`}
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
