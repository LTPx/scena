"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactPageWp } from "../_interfaces/wordpress-components";
import Grid, { COLS } from "./layout/Grid";

interface Props {
  data: ContactPageWp;
}

export default function ContactPage({ data }: Props) {
  const t = useTranslations("Contact");

  return (
    <div className="relative isolate z-0 overflow-hidden text-white h-dvh px-[clamp(20px,4vw,40px)] py-[clamp(16px,4vh,45px)]">
      <Image
        src={data.background_image.url}
        alt={data.background_image.alt || ""}
        fill
        priority={false}
        className="-z-10 object-cover"
      />
      <Grid className="!px-0 h-full gap-y-[clamp(16px,4vh,48px)]">
        <div
          className={`${COLS.footerTagline} row-start-1 flex min-h-0 flex-col justify-end`}
        >
          <div className="flex items-baseline gap-4">
            <span className="color-text-footer font-serif text-[clamp(28px,5vh,66px)] italic leading-none">
              {t.rich("tagline", {
                br: (chunks) => <br />,
              })}
            </span>
          </div>
        </div>

        <div
          className={`${COLS.footerCta} row-start-1 flex min-h-0 flex-col justify-between`}
        >
          <div className="flex flex-col gap-[clamp(24px,8vh,95px)]">
            <div>
              <h2 className="color-text-footer text-[clamp(20px,3.5vh,42px)] font-normal leading-tight">
                {t("ctaTitle")}
              </h2>
              <a href="/contacto" className="mt-4 btn-footer">
                {t("ctaButton")}
              </a>
            </div>

            <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
              <p className="color-text-footer mb-3 text-[clamp(14px,2vh,20px)]">
                {t("newsletterLabel")}
              </p>
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="w-full border-b border-white/60 bg-transparent pb-2 text-[12px] placeholder-white/70 outline-none focus:border-white"
              />
              <button type="submit" className="mt-4 btn-footer">
                {t("send")}
              </button>
            </form>
          </div>
          <div className="paragraph-final-footer">
            <p>{t("followUs")}</p>
            <p>
              <a href="#" className="uppercase">
                {t("instagram")}
              </a>{" "}
              |{" "}
              <a href="#" className="uppercase">
                {t("linkedin")}
              </a>
            </p>
          </div>
        </div>

        <div
          className={`${COLS.footerOffices} row-start-1 flex min-h-0 flex-col justify-start overflow-y-auto`}
        >
          <div className="flex flex-col gap-[clamp(12px,3.5vh,35px)]">
            {data.offices.map((office) => (
              <div key={office.label}>
                <span className="btn-office">{office.label}</span>
                <p className="mt-[clamp(6px,1.4vh,14px)] paragraph-footer">
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
        </div>
      </Grid>
    </div>
  );
}
