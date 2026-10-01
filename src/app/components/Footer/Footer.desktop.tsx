"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Grid, { COLS, colSpanWidth } from "../layout/Grid";
import GlassButton from "../GlassButton";
import { OFFICES } from "./offices";

/**
 * Proporción ancho/alto del logo. Debe coincidir con el viewBox de
 * logo-footer.svg (W / H). Con 600x122 = 4.92.
 */
const LOGO_RATIO = 600 / 122;

/**
 * Unidad base: alto del logo = alto de la fila inferior.
 * Máximo 105px, pero nunca más alto de lo que permitan las 4 columnas
 * (así el logo jamás se encoge ni se sale de su espacio).
 */
const FOOTER_UNIT = `min(105px, calc(${colSpanWidth(4)} / ${LOGO_RATIO}))`;

/** Tamaño del tagline relativo al alto del logo (en el diseño ≈ 0.61). */
const TAGLINE_SCALE = 0.61;
const CTA_LONGEST_LINE_EM = 15;
/* ------------------------------------------------------------------ */
/* Utilidades de alineación por baseline                               */
/* ------------------------------------------------------------------ */

type FontMetrics = {
  xH: number; // altura de la "x" (em)
  capH: number; // altura de mayúsculas (em)
  asc: number; // altura real de "living" (l, i con punto) (em)
  fa: number; // ascent de la fuente (em)
  fd: number; // descent de la fuente (em)
};

const FALLBACK: FontMetrics = {
  xH: 0.55,
  capH: 0.7,
  asc: 0.75,
  fa: 0.95,
  fd: 0.3,
};

function measureFont(family: string): FontMetrics {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return FALLBACK;
  const S = 200;
  ctx.font = `${S}px "${family}"`;
  const x = ctx.measureText("x");
  const H = ctx.measureText("H");
  const living = ctx.measureText("living");
  return {
    xH: x.actualBoundingBoxAscent / S || FALLBACK.xH,
    capH: H.actualBoundingBoxAscent / S || FALLBACK.capH,
    asc: living.actualBoundingBoxAscent / S || FALLBACK.asc,
    fa: x.fontBoundingBoxAscent ? x.fontBoundingBoxAscent / S : FALLBACK.fa,
    fd: x.fontBoundingBoxDescent ? x.fontBoundingBoxDescent / S : FALLBACK.fd,
  };
}

/** Mide la fuente cuando ya está cargada. Devuelve null mientras tanto. */
function useFontMetrics(family: string) {
  const [m, setM] = useState<FontMetrics | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await document.fonts.load(`100px "${family}"`);
        await document.fonts.ready;
      } catch {}
      if (alive) setM(measureFont(family));
    })();
    return () => {
      alive = false;
    };
  }, [family]);
  return m;
}

/** Alto en px de un elemento (se actualiza al redimensionar). */
function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setH(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, h] as const;
}

/** `top` que hay que darle a una línea para que su baseline caiga en `baselineY`. */
function topForBaseline(
  baselineY: number,
  fontSize: number,
  lineHeight: number,
  m: FontMetrics,
) {
  const baselineInBox =
    (lineHeight - (m.fa + m.fd) * fontSize) / 2 + m.fa * fontSize;
  return baselineY - baselineInBox;
}

/* ------------------------------------------------------------------ */
/* Tagline: "living / technology"                                      */
/* ------------------------------------------------------------------ */

function Tagline() {
  const [ref, H] = useElementHeight<HTMLDivElement>();
  const m = useFontMetrics("Quadrant Text");
  const ready = !!m && H > 0;

  const fs = H * TAGLINE_SCALE;
  const lh = fs; // alto de caja de cada línea
  const metrics = m ?? FALLBACK;

  // baseline de "technology" = borde inferior del logo
  const base2 = H;
  // tope de la "l" / punto de la "i" de "living" = borde superior del logo
  const base1 = metrics.asc * fs;

  const common = {
    position: "absolute" as const,
    left: 0,
    fontSize: fs,
    lineHeight: `${lh}px`,
    whiteSpace: "nowrap" as const,
  };

  return (
    <div
      ref={ref}
      className="relative h-[var(--u)] w-full"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <p
        className="color-text-footer font-quadrant font-normal not-italic tracking-[0%]"
        aria-label="living technology"
      >
        <span
          aria-hidden
          style={{ ...common, top: topForBaseline(base1, fs, lh, metrics) }}
        >
          living
        </span>
        <span
          aria-hidden
          style={{ ...common, top: topForBaseline(base2, fs, lh, metrics) }}
        >
          technology
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Columna derecha: Síguenos / Privacy / Design by                     */
/* ------------------------------------------------------------------ */

function RightInfo() {
  const t = useTranslations("Footer");
  const [ref, H] = useElementHeight<HTMLDivElement>();
  const m = useFontMetrics("Gellix");
  const ready = !!m && H > 0;
  const metrics = m ?? FALLBACK;

  const fs = Math.min(14, Math.max(12, H * 0.133));
  const lh = fs * 1.5;

  // Mayúsculas de la 1ª línea tocan el borde superior;
  // baseline de la última línea toca el borde inferior.
  const b1 = metrics.capH * fs;
  const b2 = b1 + lh;
  const b4 = H;
  const b3 = H - lh;

  const line = (baseline: number): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: topForBaseline(baseline, fs, lh, metrics),
    fontSize: fs,
    lineHeight: `${lh}px`,
    whiteSpace: "nowrap",
  });

  return (
    <div
      ref={ref}
      className="paragraph-final-footer relative h-[var(--u)] w-full"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <p style={line(b1)}>{t("followUs")}</p>
      <p className="footer-links" style={line(b2)}>
        <a href="#">Instagram</a> | <a href="#">Linkedin</a>
      </p>
      <p className="footer-links" style={line(b3)}>
        <a href="#">{t("privacyPolicy")}</a> | <a href="#">{t("cookies")}</a>
      </p>
      <p style={line(b4)}>
        {t("designBy")}{" "}
        <a
          href="https://bypositive.es/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links"
        >
          Positive
        </a>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export default function FooterDesktop() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative h-[100dvh] overflow-hidden py-10 text-white md:py-[40px] font-sans">
      <Image
        src="/footer-bg.png"
        alt=""
        fill
        priority={false}
        className="-z-10 object-cover"
      />
      <Grid
        className="h-full grid-rows-[minmax(0,1fr)_auto] gap-y-12"
        style={{ ["--u" as string]: FOOTER_UNIT }}
      >
        {/* ---------- FILA SUPERIOR ---------- */}
        <div
          className={`${COLS.footerCta} row-start-1 flex min-h-0 flex-col gap-[80px]`}
        >
          <div>
            <h2
              className="headline-3 whitespace-pre text-[#F6F5F1] mt-[-8px]"
              style={{
                // nunca más grande que 34px (diseño), y nunca más ancho que las 4 columnas
                fontSize: `min(34px, calc(${colSpanWidth(4)} / ${CTA_LONGEST_LINE_EM}))`,
              }}
            >
              {t("ctaTitle")}
            </h2>
            <a href="/contacto" className="mt-[80px] btn-gellix">
              {t("ctaButton")}
            </a>
          </div>

          <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <p className="color-text-footer mb-3 text-[20px]">
              {t("newsletterLabel")}
            </p>
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="w-full border-b border-white/60 bg-transparent pb-2 text-[12px] placeholder-white/70 outline-none focus:border-white"
            />
            <button type="submit" className="cursor-pointer mt-4 btn-gellix">
              {t("send")}
            </button>
          </form>
        </div>

        <div
          className={`${COLS.footerOffices} row-start-1 flex min-h-0 flex-col gap-[50px] overflow-y-auto`}
        >
          {OFFICES.map((office) => (
            <div key={office.label}>
              <GlassButton as="span" variant="light">
                {office.label}
              </GlassButton>
              <p className="mt-[14px] paragraph-footer">
                {office.address}
                <br />
                {office.phone}
                <br />
                <a href={`mailto:${office.email}`} className="underline">
                  {office.email}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* ---------- FILA INFERIOR (todo se alinea al alto del logo) ---------- */}

        {/* LOGO */}
        <div
          className={`${COLS.footerTagline} row-start-2 flex items-end`}
          style={{ height: "var(--u)" }}
        >
          <Image
            src="/logo-footer.svg"
            alt="Scena"
            width={600}
            height={122}
            className="flex-none"
            style={{
              height: "var(--u)",
              width: `calc(var(--u) * ${LOGO_RATIO})`,
              maxWidth: "none",
            }}
          />
        </div>

        {/* TAGLINE */}
        <div className={`${COLS.footerCta} row-start-2`}>
          <Tagline />
        </div>

        {/* SÍGUENOS / PRIVACY / DESIGN BY */}
        <div className={`${COLS.footerOffices} row-start-2`}>
          <RightInfo />
        </div>
      </Grid>
    </footer>
  );
}
