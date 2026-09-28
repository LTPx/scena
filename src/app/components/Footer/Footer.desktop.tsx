"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Grid, { COLS, colSpanWidth } from "../layout/Grid";
import GlassButton from "../GlassButton";
import { OFFICES } from "./offices";

const BOTTOM_ROW_HEIGHT_PX = 105;

export default function FooterDesktop() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative h-[calc(100vh)] overflow-hidden py-10 text-white md:py-[40px] font-sans">
      <Image
        src="/footer-bg.png"
        alt=""
        fill
        priority={false}
        className="-z-10 object-cover"
      />
      <Grid className="h-full grid-rows-[minmax(0,1fr)_auto] gap-y-12">
        <div
          className={`${COLS.footerCta} row-start-1 flex min-h-0 flex-col gap-[80px]`}
        >
          <div>
            <h2
              className="color-text-footer font-normal mt-[-10px]"
              style={{
                width: colSpanWidth(4),

                fontSize: `calc(${colSpanWidth(4)} / 12.6)`,
                lineHeight: 1.2,
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

        <div
          className={`${COLS.footerTagline} row-start-2 flex items-end`}
          style={{ height: `${BOTTOM_ROW_HEIGHT_PX}px` }}
        >
          <Image
            src="/logo-footer.svg"
            alt="Scena"
            width={220}
            height={122}
            className="w-auto"
            style={{ height: `${BOTTOM_ROW_HEIGHT_PX}px` }}
          />
        </div>

        <div
          className={`${COLS.footerCta} row-start-2 flex items-end`}
          style={{ height: `${BOTTOM_ROW_HEIGHT_PX}px` }}
        >
          <span className="color-text-footer font-quadrant text-[57px] font-normal not-italic leading-[100%] tracking-[0%]">
            living
            <br />
            technology
          </span>
        </div>

        <div
          className={`${COLS.footerOffices} row-start-2 flex flex-col justify-between`}
          style={{ height: `${BOTTOM_ROW_HEIGHT_PX}px` }}
        >
          <div className="paragraph-final-footer">
            <p>{t("followUs")}</p>
            <p>
              <a href="#">Instagram</a> | <a href="#">Linkedin</a>
            </p>
          </div>

          <div className="paragraph-final-footer">
            <p>
              {t("privacyPolicy")} | {t("cookies")}
            </p>
            <p>{t("designBy")} Positive</p>
          </div>
        </div>
      </Grid>
    </footer>
  );
}
