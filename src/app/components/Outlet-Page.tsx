"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { OutletPageWp } from "../_interfaces/wordpress-components";
import Grid, { COLS, offsetForColumn, trackCardWidth } from "./layout/Grid";

interface Props {
  data: OutletPageWp;
}

const CARD_GAP_PX = 24;
const TRACK_OFFSET = offsetForColumn(3);
// Igual criterio que WhereWeMakeDifference: 10 columnas de ancho
// disponible (col 3 a 12), ~3 tarjetas visibles a la vez.
const CARD_WIDTH = trackCardWidth(10, 3, CARD_GAP_PX);

export default function OutletPage({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return data.products;
    return data.products.filter((p) => p.category === activeCategory);
  }, [activeCategory, data.products]);

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 flex h-dvh flex-col overflow-hidden py-10 md:py-[clamp(24px,6vh,60px)]"
    >
      <Grid className="flex-shrink-0">
        <span
          className={`${COLS.outletLabel} font-[Gellix] text-[24px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          {data.label}
        </span>

        <div className={`${COLS.outletContent} flex flex-col gap-10`}>
          <h1 className="whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
            {data.title}
          </h1>

          <p className="whitespace-pre-line font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {data.categories.map((category) => {
              const isActive = activeCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() =>
                    setActiveCategory(isActive ? null : category.slug)
                  }
                  className={`rounded-full border border-[#A89572]/30 px-5 py-2 font-[Gellix] text-[14px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] transition-colors duration-300 ${
                    isActive ? "bg-white" : "bg-transparent"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </Grid>

      {/* Track de productos: scroll horizontal nativo, llena el resto
          del viewport (la página completa se mantiene en 100vh). */}
      <div className="mt-10 min-h-0 flex-1 overflow-x-auto">
        <div
          style={{
            paddingLeft: TRACK_OFFSET,
            gap: `${CARD_GAP_PX}px`,
          }}
          className="flex h-full pr-10"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{ width: CARD_WIDTH }}
              className="flex flex-shrink-0 flex-col"
            >
              <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden bg-white">
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.name}
                  fill
                  sizes="33vw"
                  className="object-contain p-8"
                />
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  {product.name}
                </p>
                <p className="font-[Gellix] text-[14px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  <span className="line-through opacity-50">
                    Precio original {product.original_price}
                  </span>{" "}
                  | precio Outlet {product.outlet_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}