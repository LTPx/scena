"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { OutletProductWp } from "../_interfaces/wordpress-components";
import Grid, {
  COLS,
  offsetForColumn,
  colSpanWidth,
  GRID_GUTTER_PX,
  GRID_MARGIN_PX,
  GRID_COLS_COUNT,
} from "./layout/Grid";

interface Props {
  products: OutletProductWp[];
  initialSlug: string;
}

const IMAGE_OFFSET = offsetForColumn(1);
const IMAGE_WIDTH = colSpanWidth(5);
const CONTENT_WIDTH = colSpanWidth(5);
const NEXT_ARROW_LEFT = offsetForColumn(12);

const WHEEL_THRESHOLD = 8;
const WHEEL_IDLE_RESET_MS = 180;
const GALLERY_FADE_DURATION = 0.35;

function updateUrlSilently(slug: string) {
  if (typeof window === "undefined") return;
  const segments = window.location.pathname.split("/");
  segments[segments.length - 1] = slug;
  window.history.replaceState(window.history.state, "", segments.join("/"));
}

export default function OutletDetailPage({ products, initialSlug }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryLockRef = useRef(false);
  const wheelIdleTimeoutRef = useRef<number | null>(null);

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
    const measure = () => {
      const viewportWidth = window.innerWidth;

      const colWidth =
        (viewportWidth -
          2 * GRID_MARGIN_PX -
          (GRID_COLS_COUNT - 1) * GRID_GUTTER_PX) /
        GRID_COLS_COUNT;
      const peek = GRID_MARGIN_PX + colWidth / 2;

      setSlideWidth(viewportWidth - peek);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (gallery.length <= 1) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      if (wheelIdleTimeoutRef.current !== null) {
        window.clearTimeout(wheelIdleTimeoutRef.current);
      }
      wheelIdleTimeoutRef.current = window.setTimeout(() => {
        galleryLockRef.current = false;
      }, WHEEL_IDLE_RESET_MS);

      if (galleryLockRef.current) return;

      galleryLockRef.current = true;

      setGalleryIndex((prev) => {
        const direction = e.deltaY > 0 ? 1 : -1;
        return (prev + direction + gallery.length) % gallery.length;
      });
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelIdleTimeoutRef.current !== null) {
        window.clearTimeout(wheelIdleTimeoutRef.current);
      }
    };
  }, [gallery.length]);

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

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 flex h-dvh flex-col overflow-hidden pb-[40px]"
    >
      <Grid className="mt-[27px] flex-shrink-0">
        <span
          className={`${COLS.outletLabel} font-sans text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          Outlet
        </span>

        <h1
          className={`${COLS.outletDetailTitle} font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          {product.name}
        </h1>
      </Grid>

      <div
        ref={wrapperRef}
        className="relative mt-[150px] min-h-0 flex-1 overflow-hidden"
      >
        {products.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            disabled={isTransitioning}
            aria-label="Siguiente producto"
            style={{ left: NEXT_ARROW_LEFT }}
            className="absolute top-0 z-10 font-[Gellix] text-[28px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] disabled:opacity-40"
          >
            →
          </button>
        )}

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
                    className="relative flex h-full flex-shrink-0 items-center justify-center bg-white"
                  >
                    <div className="relative h-[50%] w-[50%]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={slideImage.url}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: GALLERY_FADE_DURATION,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={slideImage.url}
                            alt={slideImage.alt || p.name}
                            fill
                            sizes="40vw"
                            className="object-contain"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {isActive && gallery.length > 1 && (
                      <div className="absolute bottom-[25px] left-1/2 flex -translate-x-1/2 gap-2">
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
                        <p className="font-sans text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                          {p.note}
                        </p>
                      )}

                      <p className="font-sans text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
                        <span className="line-through">
                          RRP: {p.original_price}
                        </span>{" "}
                        | Outlet: {p.outlet_price}
                      </p>

                      <div className="mt-[30px] inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1">
                        <button
                          type="button"
                          className="btn-gellix btn-gellix-active"
                        >
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
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
