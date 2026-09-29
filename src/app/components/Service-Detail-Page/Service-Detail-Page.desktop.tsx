"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { ServiceDetailWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import { ALIGN_TOP } from "./servicesLayout";

interface Props {
  data: ServiceDetailWp;
}

export default function ServiceDetailPageDesktop({ data }: Props) {
  return (
    <div data-header-theme="light" className="relative min-h-screen">
      <Grid
        fullHeight
        className="grid-rows-[1fr] pt-[27px] pb-[40px] overflow-hidden"
      >
        {/* Navegadores: FIJOS, misma posición que en Our Services */}
        <div className="pointer-events-none col-start-1 col-span-6 row-start-1 grid grid-cols-6 gap-x-6 self-start">
          <ul
            className={`${COLS.list} pointer-events-auto flex flex-col gap-2`}
            style={{ marginTop: ALIGN_TOP }}
          >
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
        </div>

        {/* Área que hace scroll como un solo bloque (zona roja) */}
        <div
          data-lenis-prevent
          className={`${COLS.content} row-start-1 h-full min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {/* Columna que ocupa como mínimo todo el alto visible */}
          <div className="flex min-h-full flex-col">
            {/* Cabecera con altura fija: la descripción empieza en la línea de los navegadores */}
            <div
              className="flex shrink-0 flex-col gap-6"
              style={{ height: ALIGN_TOP }}
            >
              <h2 className="headline-1 text-[#A89572]">Servicios</h2>
              <h3 className="headline-1 font-quadrant text-[#A89572]">
                {data.label}
              </h3>
            </div>

            {/* Descripción: texto grande */}
            <div
              className="headline-1 shrink-0 text-[#A89572]"
              dangerouslySetInnerHTML={{
                __html: data.description.replace(/<\/?p[^>]*>/g, "").trim(),
              }}
            />

            {/* Contenido expandido:
                - sin scroll: mt-auto lo pega al margen inferior
                - con scroll: pt-10 mantiene la separación y el texto se corta abajo */}
            <div
              className="service-expanded-content mt-auto shrink-0 pt-10"
              dangerouslySetInnerHTML={{ __html: data.expanded_content }}
            />
          </div>
        </div>

        {/* Botón fijo: esquina inferior izquierda */}
        <div className="pointer-events-none col-start-1 col-span-6 row-start-1 grid grid-cols-6 gap-x-6 self-end">
          <div className={`${COLS.list} pointer-events-auto`}>
            <Link href="/projects" className="btn-gellix">
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