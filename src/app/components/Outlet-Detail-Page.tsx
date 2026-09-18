"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { OutletProductWp } from "../_interfaces/wordpress-components";
import Grid, {
  COLS,
  offsetForColumn,
  colSpanWidth,
  GRID_GUTTER_PX,
} from "./layout/Grid";

interface Props {
  products: OutletProductWp[];
  initialSlug: string;
}

const PEEK_PX = 64;
const IMAGE_OFFSET = offsetForColumn(1);
const IMAGE_WIDTH = colSpanWidth(5);
const CONTENT_WIDTH = colSpanWidth(5);
const NEXT_ARROW_LEFT = offsetForColumn(12);
const PREV_ARROW_LEFT = `calc(${offsetForColumn(11)} + 40px)`;

// Actualiza SOLO la barra de direcciones (para que el link sea
// compartible), sin pasar por el router de Next. router.replace()
// dispara un fetch del Server Component por el nuevo slug, y mientras
// esa respuesta llega, React puede suspender el árbol y cortar la
// animación en curso -> eso era el parpadeo. history.replaceState
// no toca React ni el servidor en absoluto: es invisible para
// framer-motion.
function updateUrlSilently(slug: string) {
  if (typeof window === "undefined") return;
  const segments = window.location.pathname.split("/");
  segments[segments.length - 1] = slug;
  window.history.replaceState(window.history.state, "", segments.join("/"));
}

export default function OutletDetailPage({ products, initialSlug }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.max(
      products.findIndex((p) => p.slug === initialSlug),
      0,
    ),
  );
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const product = products[currentIndex];
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const activeImage = gallery[galleryIndex];

  useEffect(() => {
    const measure = () => setSlideWidth(window.innerWidth - PEEK_PX);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function goTo(nextIndex: number) {
    if (isTransitioning) return;
    if (nextIndex < 0 || nextIndex >= products.length) return;

    setIsTransitioning(true);
    setCurrentIndex(nextIndex);
    setGalleryIndex(0);
    updateUrlSilently(products[nextIndex].slug);
  }

  function goNext() {
    goTo((currentIndex + 1) % products.length);
  }

  function goPrev() {
    goTo(currentIndex - 1);
  }

  const hasPrev = currentIndex > 0;

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 flex h-dvh flex-col overflow-hidden py-10 md:py-[clamp(24px,6vh,60px)]"
    >
      <Grid className="flex-shrink-0">
        <span
          className={`${COLS.outletLabel} font-[Gellix] text-[24px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          Outlet
        </span>

        <h1
          className={`${COLS.outletDetailTitle} font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          {product.name}
        </h1>
      </Grid>

      {hasPrev && (
        <button
          type="button"
          onClick={goPrev}
          disabled={isTransitioning}
          aria-label="Producto anterior"
          style={{ left: PREV_ARROW_LEFT }}
          className="absolute top-[clamp(24px,6vh,60px)] z-10 mt-16 font-[Gellix] text-[28px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] disabled:opacity-40"
        >
          ←
        </button>
      )}

      {products.length > 1 && (
        <button
          type="button"
          onClick={goNext}
          disabled={isTransitioning}
          aria-label="Siguiente producto"
          style={{ left: NEXT_ARROW_LEFT }}
          className="absolute top-[clamp(24px,6vh,60px)] z-10 mt-16 font-[Gellix] text-[28px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] disabled:opacity-40"
        >
          →
        </button>
      )}

      <div ref={wrapperRef} className="mt-16 min-h-0 flex-1 overflow-hidden">
        <motion.div
          animate={{ x: -currentIndex * slideWidth }}
          transition={{
            type: "tween",
            duration: 0.6,
            ease: [0.65, 0, 0.35, 1],
          }}
          onAnimationComplete={() => setIsTransitioning(false)}
          className="flex h-full"
        >
          {products.map((p, index) => {
            const isActive = index === currentIndex;
            const slideImage = isActive ? activeImage : p.image;

            return (
              <div
                key={p.slug}
                style={{ width: slideWidth || "100vw" }}
                className="relative h-full flex-shrink-0 overflow-hidden"
              >
                <div
                  style={{
                    paddingLeft: IMAGE_OFFSET,
                    gap: `${GRID_GUTTER_PX}px`,
                  }}
                  className="flex h-full"
                >
                  <div
                    style={{ width: IMAGE_WIDTH }}
                    className="relative h-full flex-shrink-0"
                  >
                    <Image
                      src={slideImage.url}
                      alt={slideImage.alt || p.name}
                      fill
                      sizes="40vw"
                      className="object-contain"
                    />

                    {isActive && gallery.length > 1 && (
                      <div className="absolute bottom-6 left-0 flex gap-2">
                        {gallery.map((_, dotIndex) => {
                          const isDotActive = dotIndex === galleryIndex;
                          return (
                            <button
                              key={dotIndex}
                              type="button"
                              onClick={() => setGalleryIndex(dotIndex)}
                              aria-label={`Ver foto ${dotIndex + 1}`}
                              className={`h-2 w-2 rounded-full border border-[#A89572] transition-colors duration-300 ${
                                isDotActive ? "bg-[#A89572]" : "bg-transparent"
                              }`}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div
                    style={{ width: CONTENT_WIDTH }}
                    className="flex h-full flex-shrink-0 flex-col justify-between"
                  >
                    <div className="flex flex-col gap-6">
                      {p.color_name && (
                        <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                          {p.color_name}
                        </p>
                      )}

                      {p.description && (
                        <p className="max-w-[440px] font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                          {p.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      {p.note && (
                        <p className="font-[Gellix] text-[13px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                          {p.note}
                        </p>
                      )}

                      <p className="font-[Gellix] text-[24px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                        <span className="line-through opacity-50">
                          RRP: {p.original_price}
                        </span>{" "}
                        | Outlet: {p.outlet_price}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          className="rounded-full bg-[#A89572] px-6 py-3 font-[Gellix] text-[13px] text-white"
                        >
                          Comprar ahora
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-[#A89572]/50 px-6 py-3 font-[Gellix] text-[13px] text-[#A89572]"
                        >
                          Solicitar información
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
