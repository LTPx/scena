"use client";

import { useState } from "react";
import { AboutPageWp } from "../_interfaces/wordpress-components";
import Grid, { COLS, offsetForColumn, trackCardWidth } from "./layout/Grid";
import Gallery from "./Gallery";
import PartnersMarquee from "./PartnersMarquee";

interface Props {
  data: AboutPageWp;
}

type TabKey = "team" | "differentiators" | "partners";

const TABS: { key: TabKey; label: string }[] = [
  { key: "team", label: "Nuestro equipo" },
  { key: "differentiators", label: "Factores diferenciales" },
  { key: "partners", label: "Partners/Marques" },
];

const DIFF_CARD_GAP_PX = 24;
const DIFF_TRACK_OFFSET = offsetForColumn(3);
// 10 columnas de ancho disponible (col 3 a 12), tarjetas visibles
// simultáneamente ~3, igual criterio que WhereWeMakeDifference.
const DIFF_CARD_WIDTH = trackCardWidth(10, 3, DIFF_CARD_GAP_PX);

export default function AboutPage({ data }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("team");

  return (
    <div data-header-theme="light" className="relative">
      {/* Intro: título + descripción */}
      <Grid as="section" className="py-24">
        <h1
          className={`${COLS.aboutTitle} whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          {data.title}
        </h1>
        <p
          className={`${COLS.aboutDescription} mt-10 font-[Gellix] text-[14px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]`}
        >
          {data.description}
        </p>
      </Grid>

      {/* Carousel de imágenes: misma funcionalidad que Gallery de Home */}
      <Gallery gallery={data.gallery} />

      {/* Tabs: Nuestro equipo / Factores diferenciales / Partners */}
      <Grid as="section" className="py-24">
        <nav className={`${COLS.list} flex flex-col gap-2`}>
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`text-left font-[Gellix] text-[14px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "team" && (
          <>
            <div className={`${COLS.content} relative h-full`}>
              <p className="whitespace-pre-line font-[Gellix] text-[28px] font-normal not-italic leading-[125%] tracking-[0%] text-[#A89572]">
                {data.team.description}
              </p>

              <div className="absolute bottom-0 left-0 w-full">
                <p className="mb-4 font-[Gellix] text-[24px] font-normal not-italic leading-[125%] tracking-[0%] text-[#A89572]">
                  {data.team.cta_title}
                </p>
                <button
                  type="button"
                  className="rounded-full border border-[#A89572]/50 px-6 py-3 font-[Gellix] text-[13px] text-[#A89572]"
                >
                  {data.team.cta_label}
                </button>
              </div>
            </div>

            <ul className={`${COLS.teamList} flex flex-col gap-2`}>
              {data.team.positions.map((position) => (
                <li
                  key={position.id}
                  className="font-[Gellix] text-[18px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]"
                >
                  {position.title}
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "differentiators" && (
          <>
            <h2
              className={`${COLS.content} whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
            >
              {data.differentiators.title}
            </h2>

            <div
              style={{
                gridColumn: "1 / -1",
                paddingLeft: DIFF_TRACK_OFFSET,
                gap: `${DIFF_CARD_GAP_PX}px`,
              }}
              className="mt-12 flex overflow-x-auto pb-4"
            >
              {data.differentiators.cards.map((card, i) => (
                <div
                  key={`${card.title}-${i}`}
                  style={{ width: DIFF_CARD_WIDTH }}
                  className="flex flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-[20px]"
                >
                  <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[35px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                    {card.title}
                  </h3>

                  {/* Icon: reemplazar por <Image src={card.icon.url} .../> cuando venga de WP */}
                  <div className="flex flex-1 items-center justify-center py-8">
                    <div className="h-36 w-36 rounded-full border border-[#A89572]/40" />
                  </div>

                  <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "partners" && (
          <>
            <p
              className={`${COLS.aboutPartnersDescription} font-[Gellix] text-[24px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]`}
            >
              {data.partners.description}
            </p>
            <div style={{ gridColumn: "1 / -1" }} className="mt-12">
              <PartnersMarquee partners={data.partners.partners} />
            </div>
          </>
        )}
      </Grid>
    </div>
  );
}
