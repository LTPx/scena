"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import { ServiceDetailWp } from "../../_interfaces/wordpress-components";
import { getProjectsHref } from "./projectFilters";
import { sortServices } from "./servicesLayout";

interface Props {
  data: ServiceDetailWp;
}

export default function ServiceDetailPageMobile({ data }: Props) {
  const locale = useLocale();

  return (
    <div data-header-theme="light" className="pb-16 pt-[100px]">
      <h1 className="pointer-events-none absolute left-[130px] top-[5px] font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89F82]">
        Services
      </h1>

      <nav aria-label="Services" className="ml-[130px]">
        <ul className="flex flex-col gap-[2px]">
          {sortServices(data.services_nav, (s) => s.slug).map((service) => {
            const isActive = service.slug === data.slug;
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`block font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {service.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-[120px] px-[15px]">
        <div
          data-header-theme="dark"
          className="relative aspect-[3/4] w-full overflow-hidden"
        >
          <Image
            src={data.image.url}
            alt={data.image.alt || data.label}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-10 px-[15px]">
        <h2 className="font-quadrant text-[48px] font-normal not-italic leading-[100%] tracking-normal text-[#A89572]">
          {data.label}
        </h2>

        <div
          className="mt-8 font-[Gellix] text-[30px] font-normal not-italic leading-[120%] tracking-[0%] text-[#A89572]"
          dangerouslySetInnerHTML={{
            __html: data.description.replace(/<\/?p[^>]*>/g, "").trim(),
          }}
        />

        <div
          className="mt-12 font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]"
          dangerouslySetInnerHTML={{ __html: data.expanded_content }}
        />

        <Link
          href={getProjectsHref(data.slug, locale)}
          className="btn-gellix mt-12 w-fit bg-white text-[#A89572]"
        >
          See Projects
        </Link>
      </div>
    </div>
  );
}
