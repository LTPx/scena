"use client";

import { AboutPageWp } from "../../_interfaces/wordpress-components";
import Gallery from "../Gallery";
import PartnersMarquee from "../PartnersMarquee";
import AboutDifferentiatorsTrack from "../AboutDifferentiatorsTrack";

interface Props {
  data: AboutPageWp;
}

const LABEL_CLASS =
  "font-[Gellix] text-[16px] font-normal not-italic leading-[135%] text-[#A89572]";
const BIG_TEXT_CLASS =
  "whitespace-pre-line font-[Gellix] text-[30px] font-normal not-italic leading-[100%] text-[#A89572]";

export default function AboutPageMobile({ data }: Props) {
  return (
    <div data-header-theme="light" className="relative">
      <section className="px-[15px] pb-10 pt-[220px]">
        <h1 className={BIG_TEXT_CLASS}>{data.title}</h1>
        <p className="mt-6 font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
          {data.description}
        </p>
      </section>

      <Gallery gallery={data.gallery} />

      <section className="px-[15px] py-12">
        <p className={LABEL_CLASS}>Nuestro equipo</p>

        <p className={`${BIG_TEXT_CLASS} mt-6`}>{data.team.description}</p>

        <ul className="mt-10 flex flex-col">
          {data.team.positions.map((position) => (
            <li
              key={position.id}
              className="font-[Gellix] text-[20px] font-normal not-italic leading-[130%] tracking-[0%] text-[#A89572]"
            >
              {position.title}
            </li>
          ))}
        </ul>

        <p className={`${BIG_TEXT_CLASS} mt-16 mb-4`}>{data.team.cta_title}</p>
        <button type="button" className="btn-gellix mt-[10px]">
          {data.team.cta_label}
        </button>
      </section>

      <Gallery gallery={data.team_gallery} />

      <AboutDifferentiatorsTrack data={data.differentiators} />

      <section className="pb-20 pt-6">
        <div className="px-[15px]">
          <p className={LABEL_CLASS}>Partners/Marcas</p>
          <p className={`${BIG_TEXT_CLASS} mt-6`}>
            {data.partners.description}
          </p>
        </div>

        <div className="mt-10">
          <PartnersMarquee partners={data.partners.partners} />
        </div>
      </section>
    </div>
  );
}
