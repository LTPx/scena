"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Grid, {
  COLS,
  offsetForColumn,
  colSpanWidth,
  GRID_GUTTER_PX,
  GRID_MARGIN_PX,
  GRID_COLS_COUNT,
} from "../layout/Grid";
import { OutletDetailProps, useOutletDetail } from "./useOutletDetail";
import { Link } from "@/navigation";

const IMAGE_OFFSET = offsetForColumn(1);
const IMAGE_WIDTH = colSpanWidth(5);
const CONTENT_WIDTH = colSpanWidth(5);
const NEXT_ARROW_LEFT = offsetForColumn(12);

const WHEEL_THRESHOLD = 8;
const WHEEL_IDLE_RESET_MS = 180;
const GALLERY_FADE_DURATION = 0.35;

const CTA_TRANSITION = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1] as const,
};

type CtaKey = "buy" | "info";

interface OutletCtasProps {
  canBuy: boolean;
  isAvailable: boolean;
  paymentLink?: string;
  hover: CtaKey | null;
  onHover: (value: CtaKey | null) => void;
}

function OutletCtas({
  canBuy,
  isAvailable,
  paymentLink,
  hover,
  onHover,
}: OutletCtasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const target: CtaKey = hover ?? (canBuy ? "buy" : "info");

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const el = container.querySelector<HTMLElement>(`[data-cta="${target}"]`);
      if (!el) return;
      const next = {
        x: el.offsetLeft,
        y: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
      };
      setRect((prev) =>
        prev &&
        prev.x === next.x &&
        prev.y === next.y &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next,
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    container
      .querySelectorAll("[data-cta]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => onHover(null)}
      className="relative mt-[30px] inline-flex w-fit items-center gap-1 rounded-full border border-white bg-white p-1"
    >
      {rect && (
        <motion.span
          aria-hidden
          initial={false}
          animate={{
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            opacity: hover ? 1 : 0.8,
          }}
          transition={CTA_TRANSITION}
          className="pointer-events-none absolute left-0 top-0 rounded-full bg-[#A89572]"
        />
      )}

      <a
        data-cta="buy"
        href={canBuy ? paymentLink : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!canBuy}
        onMouseEnter={() => canBuy && onHover("buy")}
        onClick={(e) => {
          if (!canBuy) e.preventDefault();
        }}
        className={`relative z-10 btn-gellix bg-transparent duration-300 delay-150 ${
          target === "buy" ? "text-white" : "text-[#A89572]"
        } ${!canBuy ? "pointer-events-none opacity-40" : ""}`}
      >
        {isAvailable ? "Comprar ahora" : "Agotado"}
      </a>

      <Link
        data-cta="info"
        href="/contact"
        onMouseEnter={() => onHover("info")}
        className={`relative z-10 btn-gellix bg-transparent duration-300 delay-150 ${
          target === "info" ? "text-white" : "text-[#A89572]"
        }`}
      >
        Solicitar información
      </Link>
    </div>
  );
}

export default function OutletDetailPageDesktop(props: OutletDetailPageProps) {
  const { products } = props;
  const {
    product,
    gallery,
    activeImage,
    currentIndex,
    galleryIndex,
    setGalleryIndex,
    goToGallery,
    goNext,
  } = useOutletDetail(props);

  const galleryLockRef = useRef(false);
  const wheelIdleTimeoutRef = useRef<number | null>(null);

  const [slideWidth, setSlideWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [trackIndex, setTrackIndex] = useState(currentIndex);
  const [snap, setSnap] = useState(false);
  const [ctaHover, setCtaHover] = useState<"buy" | "info" | null>(null);
  const [ready, setReady] = useState(false);

  const total = products.length;
  const slides = [...products, products[0]];

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
    if (!slideWidth) return;
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, [slideWidth]);

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

      goToGallery(e.deltaY > 0 ? 1 : -1);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelIdleTimeoutRef.current !== null) {
        window.clearTimeout(wheelIdleTimeoutRef.current);
      }
    };
  }, [gallery.length]);

  function handleNext() {
    if (isTransitioning || products.length <= 1) return;
    setIsTransitioning(true);
    setCtaHover(null);
    setTrackIndex((t) => t + 1);
    goNext();
  }

  return (
    <div
      data-header-theme="light"
      className="relative isolate z-0 flex h-dvh flex-col overflow-hidden pb-[40px]"
    >
      <Grid className="mt-[25px] flex-shrink-0">
        <Link
          href="/outlet"
          className={`${COLS.outletLabel} headline-1 text-[#A89572]`}
        >
          Outlet
        </Link>

        <h1 className={`${COLS.outletDetailTitle} headline-1 text-[#A89572]`}>
          {product.name}
        </h1>
      </Grid>

      <div className="relative mt-[150px] min-h-0 flex-1 overflow-hidden">
        {products.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label="Siguiente producto"
            style={{ left: NEXT_ARROW_LEFT }}
            className="cursor-pointer absolute top-0 z-10 font-[Gellix] text-[28px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] disabled:opacity-40"
          >
            →
          </button>
        )}

        <motion.div
          initial={false}
          animate={{ x: -trackIndex * slideWidth }}
          transition={
            snap || !ready
              ? { duration: 0 }
              : { type: "tween", duration: 0.6, ease: [0.65, 0, 0.35, 1] }
          }
          style={{ opacity: ready ? 1 : 0 }}
          onAnimationComplete={() => {
            if (trackIndex >= total) {
              setSnap(true);
              setTrackIndex(0);
            } else {
              setSnap(false);
              setIsTransitioning(false);
            }
          }}
          className="flex h-full"
        >
          {slides.map((p, index) => {
            const isActive = index === trackIndex;
            const slideImage = isActive ? activeImage : p.image;

            const canBuy = p.is_available && !!p.payment_link;

            return (
              <div
                key={index === total ? `${p.slug}-clone` : p.slug}
                style={{ width: slideWidth || "100vw" }}
                className="relative h-full flex-shrink-0 overflow-hidden"
              >
                <div
                  style={{
                    paddingLeft: index > trackIndex ? 0 : IMAGE_OFFSET,
                    gap: `${GRID_GUTTER_PX}px`,
                    transition: snap
                      ? "none"
                      : "padding-left 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
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
                        {gallery.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            type="button"
                            onClick={() => setGalleryIndex(dotIndex)}
                            aria-label={`Ver foto ${dotIndex + 1}`}
                            className={`h-2 w-2 rounded-full border border-[#A89572] transition-colors duration-300 ${
                              dotIndex === galleryIndex
                                ? "bg-[#A89572]"
                                : "bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    style={{ width: CONTENT_WIDTH }}
                    className="flex h-full flex-shrink-0 flex-col justify-between"
                  >
                    <div className="flex flex-col gap-6">
                      {p.color_name && (
                        <p className="font-[Gellix] text-[16px] leading-[135%] text-[#A89572]">
                          {p.color_name}
                        </p>
                      )}
                      {p.description && (
                        <p
                          className="font-[Gellix] text-[16px] leading-[135%] text-[#A89572]"
                          dangerouslySetInnerHTML={{ __html: p.description }}
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      {p.note && (
                        <p className="font-sans text-[16px] leading-[135%] text-[#A89572]">
                          {p.note}
                        </p>
                      )}

                      <p className="headline-1 text-[#A89572]">
                        <span className="line-through">
                          RRP: {p.original_price}
                        </span>{" "}
                        | Outlet: {p.outlet_price}
                      </p>

                      <OutletCtas
                        canBuy={canBuy}
                        isAvailable={p.is_available}
                        paymentLink={p.payment_link}
                        hover={isActive ? ctaHover : null}
                        onHover={setCtaHover}
                      />
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

type OutletDetailPageProps = OutletDetailProps;
