"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactPageWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import GlassButton from "../GlassButton";

interface Props {
  data: ContactPageWp;
}

const SCALE = "min(1px, calc(100vw / 1440), calc(100dvh / 800))";
const px = (n: number) => `calc(var(--s) * ${n})`;

const PAGE_PAD = "clamp(20px, 4vw, 40px)";

const span = (n: number) =>
  `calc((100vw - 2 * ${PAGE_PAD} - 264px) / 12 * ${n} + ${(n - 1) * 24}px)`;

const CTA_LONGEST_LINE_EM = 15;

type FontMetrics = { fa: number; fd: number; capH: number };
const FALLBACK: FontMetrics = { fa: 0.95, fd: 0.3, capH: 0.7 };

function measureFont(family: string): FontMetrics {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return FALLBACK;
  const S = 200;
  ctx.font = `${S}px "${family}"`;
  const x = ctx.measureText("x");
  const H = ctx.measureText("H");
  return {
    capH: H.actualBoundingBoxAscent / S || FALLBACK.capH,
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

function baselineFromBottom(
  lineHeight: number,
  fontSize: number,
  m: FontMetrics,
) {
  return (lineHeight - (m.fa + m.fd) * fontSize) / 2 + m.fd * fontSize;
}

const TITLE_LINE_HEIGHT = 1.2;

function CtaTitle({ text }: { text: string }) {
  const [ref, H] = useElementHeight<HTMLHeadingElement>();
  const m = useFontMetrics("Gellix");
  const ready = !!m && H > 0;
  const metrics = m ?? FALLBACK;

  const lines = text.split("\n").length;
  const lh = H / lines;
  const fs = lh / TITLE_LINE_HEIGHT;

  const capTop =
    (lh - (metrics.fa + metrics.fd) * fs) / 2 +
    (metrics.fa - metrics.capH) * fs;

  return (
    <h2
      ref={ref}
      className="headline-1 whitespace-pre text-[#F6F5F1]"
      style={{
        fontSize: `min(${px(38)}, calc(${span(4)} / ${CTA_LONGEST_LINE_EM}))`,
        lineHeight: TITLE_LINE_HEIGHT,
        marginTop: ready ? -capTop : 0,
      }}
    >
      {text}
    </h2>
  );
}

const FOLLOW_FONT = 14;
const FOLLOW_LINE = FOLLOW_FONT * 1.5;
const TAGLINE_LINES = 2;

function BottomRow({
  tagline,
  followUs,
  instagram,
  linkedin,
}: {
  tagline: React.ReactNode;
  followUs: string;
  instagram: string;
  linkedin: string;
}) {
  const [tagRef, tagH] = useElementHeight<HTMLSpanElement>();
  const quad = useFontMetrics("Quadrant Text");
  const gellix = useFontMetrics("Gellix");
  const ready = !!quad && !!gellix && tagH > 0;

  const q = quad ?? FALLBACK;
  const g = gellix ?? FALLBACK;
  const fsT = tagH / TAGLINE_LINES;
  const dTag = baselineFromBottom(fsT, fsT, q);
  const dSmall = baselineFromBottom(FOLLOW_LINE, FOLLOW_FONT, g);

  const shift = dSmall - dTag;

  return (
    <>
      <div className={`${COLS.footerTagline} row-start-3 flex items-end`}>
        <span
          ref={tagRef}
          className="block font-quadrant font-normal not-italic tracking-[0%] color-text-footer"
          style={{ fontSize: px(80), lineHeight: 1, opacity: ready ? 1 : 0 }}
        >
          {tagline}
        </span>
      </div>

      <div className={`${COLS.footerCta} row-start-3 flex items-end`}>
        <div
          className="paragraph-final-footer"
          style={{
            transform: `translateY(${shift}px)`,
            opacity: ready ? 1 : 0,
          }}
        >
          <p>{followUs}</p>
          <p className="footer-links">
            <a href="#">{instagram}</a> | <a href="#">{linkedin}</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default function ContactPageDesktop({ data }: Props) {
  const t = useTranslations("Contact");

  return (
    <div
      className="relative font-sans isolate z-0 overflow-hidden text-white h-dvh px-[clamp(20px,4vw,40px)] py-[40px]"
      style={{ ["--s" as string]: SCALE }}
    >
      <Image
        src={data.background_image.url}
        alt={data.background_image.alt || ""}
        fill
        priority={false}
        className="-z-10 object-cover"
      />

      <Grid
        className="!px-0 h-full grid-rows-[auto_1fr_auto]"
        style={{ rowGap: px(24) }}
      >
        <div
          className={`${COLS.footerCta} row-start-1 flex min-h-0 flex-col justify-between`}
          style={{ gap: px(80) }}
        >
          <div>
            <CtaTitle text={t("ctaTitle")} />
            <a
              href="/contact"
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
          className="col-start-10 col-span-3 row-start-1 flex min-h-0 flex-col justify-between"
          style={{ gap: px(35) }}
        >
          {data.offices.map((office) => (
            <div key={office.label}>
              <GlassButton as="span" variant="light">
                {office.label}
              </GlassButton>
              <p
                className="paragraph-footer whitespace-nowrap"
                style={{ marginTop: px(14), fontSize: `max(11px, ${px(16)})` }}
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

        <BottomRow
          tagline={t.rich("tagline", { br: () => <br /> })}
          followUs={t("followUs")}
          instagram={t("instagram")}
          linkedin={t("linkedin")}
        />
      </Grid>
    </div>
  );
}
