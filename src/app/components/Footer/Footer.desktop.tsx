"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Grid, { COLS, colSpanWidth } from "../layout/Grid";
import GlassButton from "../GlassButton";
import { OFFICES } from "./offices";

const LOGO_RATIO = 600 / 122;

const SCALE = "min(1px, calc(100vw / 1440), calc(100dvh / 800))";
const px = (n: number) => `calc(var(--s) * ${n})`;

const FOOTER_UNIT = `min(${px(105)}, calc(${colSpanWidth(4)} / ${LOGO_RATIO}))`;

const TAGLINE_SCALE = 0.61;

const CTA_LONGEST_LINE_EM = 15;

type FontMetrics = {
  xH: number;
  capH: number;
  asc: number;
  fa: number;
  fd: number;
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

function Tagline() {
  const [ref, H] = useElementHeight<HTMLDivElement>();
  const m = useFontMetrics("Quadrant Text");
  const ready = !!m && H > 0;

  const fs = H * TAGLINE_SCALE;
  const lh = fs;
  const metrics = m ?? FALLBACK;

  const base2 = H;

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

function RightInfo() {
  const t = useTranslations("Footer");
  const [ref, H] = useElementHeight<HTMLDivElement>();
  const m = useFontMetrics("Gellix");
  const ready = !!m && H > 0;
  const metrics = m ?? FALLBACK;
  const fs = 14;
  const lh = Math.min(fs * 1.5, (H - metrics.capH * fs) / 2.8);
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
        <a
          href="https://bypositive.es/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links"
          style={{ pointerEvents: "auto" }}
        >
          {t("designBy")} Positive
        </a>
      </p>
    </div>
  );
}

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
        className="h-full grid-rows-[minmax(0,1fr)_auto]"
        style={{
          ["--s" as string]: SCALE,
          ["--u" as string]: FOOTER_UNIT,
          rowGap: px(48),
        }}
      >
        <div
          className={`${COLS.footerCta} row-start-1 flex min-h-0 flex-col self-start`}
          style={{ gap: px(140) }}
        >
          <div>
            <h2
              className="headline-3 whitespace-pre text-[#F6F5F1] mt-[-8px]"
              style={{
                fontSize: `min(${px(34)}, calc(${colSpanWidth(4)} / ${CTA_LONGEST_LINE_EM}))`,
              }}
            >
              {t("ctaTitle")}
            </h2>
            <a
              href="/contacto"
              className="btn-gellix"
              style={{ marginTop: px(20) }}
            >
              {t("ctaButton")}
            </a>
          </div>

          <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <p
              className="color-text-footer"
              style={{ fontSize: `max(14px, ${px(20)})`, marginBottom: px(12) }}
            >
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
          className="col-start-10 col-span-3 row-start-1 flex min-h-0 flex-col self-start"
          style={{ gap: px(50) }}
        >
          {OFFICES.map((office) => (
            <div key={office.label}>
              <GlassButton as="span" variant="light">
                {office.label}
              </GlassButton>
              <p
                className="paragraph-footer whitespace-nowrap"
                style={{
                  marginTop: px(14),
                  fontSize: `max(11px, ${px(16)})`,
                }}
              >
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

        <div className={`${COLS.footerCta} row-start-2`}>
          <Tagline />
        </div>

        <div className={`${COLS.footerOffices} row-start-2`}>
          <RightInfo />
        </div>
      </Grid>
    </footer>
  );
}
