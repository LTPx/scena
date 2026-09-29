"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { ServiceDetailWp } from "../../_interfaces/wordpress-components";

interface Props {
  data: ServiceDetailWp;
}

export default function ServiceDetailPageMobile({ data }: Props) {
  return (
    <div
      data-header-theme="light"
      className="flex flex-col px-6 pb-10 pt-[27px]"
    >
      <h2 className="headline-1 mb-4 text-[#A89572]">Servicios</h2>
      <h3 className="headline-1 mb-4 font-quadrant text-[#A89572]">
        {data.label}
      </h3>

      <div className="relative mb-6 h-[50vh] w-full overflow-hidden rounded-[20px]">
        <Image
          src={data.image.url}
          alt={data.image.alt || data.label}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <p
        className="mb-6 font-[Gellix] text-[16px] leading-[135%] text-[#A89572]/80"
        dangerouslySetInnerHTML={{
          __html: data.description.replace(/<\/?p[^>]*>/g, "").trim(),
        }}
      />

      <div
        className="service-expanded-content"
        dangerouslySetInnerHTML={{ __html: data.expanded_content }}
      />

      <Link
        href="/projects"
        className="btn-gellix mt-[30px] w-fit bg-white text-[#A89572]"
      >
        See Projects
      </Link>
    </div>
  );
}
