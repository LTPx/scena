"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { OutletPageWp } from "../../_interfaces/wordpress-components";
import { Link } from "@/navigation";

interface Props {
  data: OutletPageWp;
}

export default function OutletPageMobile({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return data.products;
    return data.products.filter((p) => p.category === activeCategory);
  }, [activeCategory, data.products]);

  return (
    <div data-header-theme="light" className="pb-16 pt-[220px]">
      <div className="px-[15px]">
        <h1 className="whitespace-pre-line font-sans text-[30px] font-normal not-italic leading-[100%] tracking-normal text-[#A89572]">
          {data.title}
        </h1>

        <p className="mt-8 whitespace-pre-line font-sans text-[16px] font-normal not-italic leading-[135%] tracking-normal text-[#A89572]">
          {data.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {data.categories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() =>
                  setActiveCategory(isActive ? null : category.slug)
                }
                className={`btn-gellix ${
                  isActive ? "btn-gellix-active" : "btn-gellix-default"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carrusel con el dedo */}
      <div
        className="
          hide-scrollbar mt-6 flex snap-x snap-mandatory gap-2
          overflow-x-auto overscroll-x-contain px-[15px] scroll-pl-[15px]
        "
      >
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/outlet/${product.slug}`}
            className="flex w-[85vw] max-w-[420px] flex-shrink-0 snap-start flex-col bg-white pb-5"
          >
            <div className="relative h-[384px] w-full">
              <Image
                src={product.image.url}
                alt={product.image.alt || product.name}
                fill
                sizes="85vw"
                className="object-contain p-8"
              />
            </div>

            <div className="mt-4 flex flex-col gap-1 px-[18px]">
              <p className="font-sans text-[14px] font-normal not-italic leading-[135%] text-[#A89572]">
                {product.name}
              </p>
              <p className="font-sans text-[14px] font-normal not-italic leading-[135%] text-[#A89572]/50">
                <span className="line-through">
                  Precio original {product.original_price}
                </span>{" "}
                | precio Outlet {product.outlet_price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
