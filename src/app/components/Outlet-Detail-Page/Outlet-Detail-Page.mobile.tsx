"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { OutletDetailProps, useOutletDetail } from "./useOutletDetail";

const SWIPE_THRESHOLD_PX = 40;

export default function OutletDetailPageMobile(props: OutletDetailProps) {
  const {
    product,
    gallery,
    activeImage,
    galleryIndex,
    setGalleryIndex,
    goToGallery,
    goNext,
  } = useOutletDetail(props);

  const touchStartX = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || gallery.length <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goToGallery(delta < 0 ? 1 : -1);
  }

  return (
    <div
      data-header-theme="light"
      className="relative min-h-dvh px-[14px] pb-[60px] pt-[200px]"
    >
      {/* Título + flecha */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[Gellix] text-[32px] font-normal leading-[100%] text-[#A89572]">
          {product.name}
        </h1>

        {props.products.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente producto"
            className="flex h-[36px] w-[48px] flex-shrink-0 items-center justify-center rounded-full bg-white font-[Gellix] text-[14px] text-[#A89572]"
          >
            →
          </button>
        )}
      </div>

      {/* Imagen */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mt-[20px] flex aspect-[366/420] w-full items-center justify-center bg-white"
      >
        <div className="relative h-[65%] w-[65%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage.url}
                alt={activeImage.alt || product.name}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {gallery.length > 1 && (
          <div className="absolute bottom-[16px] left-1/2 flex -translate-x-1/2 gap-2">
            {gallery.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => setGalleryIndex(dotIndex)}
                aria-label={`Ver foto ${dotIndex + 1}`}
                className={`h-2 w-2 rounded-full border border-[#A89572] transition-colors duration-300 ${
                  dotIndex === galleryIndex ? "bg-[#A89572]" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-[60px] flex flex-col gap-[28px]">
        {product.color_name && (
          <p className="font-[Gellix] text-[16px] leading-[135%] text-[#A89572]">
            {product.color_name}
          </p>
        )}

        {product.description && (
          <p className="font-[Gellix] text-[16px] leading-[135%] text-[#A89572]">
            {product.description}
          </p>
        )}

        {product.note && (
          <p className="font-[Gellix] text-[16px] leading-[135%] text-[#A89572]">
            {product.note}
          </p>
        )}

        <p className="font-[Gellix] text-[32px] leading-[100%] text-[#A89572]">
          <span className="line-through">RRP: {product.original_price}</span> |
          Outlet: {product.outlet_price}
        </p>

        <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1">
          <button type="button" className="btn-gellix btn-gellix-active">
            Comprar ahora
          </button>
          <button
            type="button"
            className="btn-gellix bg-transparent hover:bg-[#A89572] hover:text-white"
          >
            Solicitar información
          </button>
        </div>
      </div>
    </div>
  );
}
