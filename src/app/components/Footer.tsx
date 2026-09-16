"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Grid, { COLS } from "./layout/Grid";

const OFFICES = [
  {
    label: "Experience Center",
    address: "Fray Luis de León, 9 - 07011 Palma",
    phone: "+34 871 571 460",
    email: "scena@e-scena.com",
  },
  {
    label: "Technical Office",
    address: "Gran Via Asima, 31 - 07009 Palma",
    phone: "+34 971 29 04 87",
    email: "scena@e-scena.com",
  },
  {
    label: "B&O Mallorca",
    address: "Calle Catalunya, 3 - 07011 Palma",
    phone: "+34 971 666 833",
    email: "bangolufsen@e-scena.com",
  },
];

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative isolate z-0 overflow-hidden py-10 text-white h-[calc(100vh)] md:py-[45px]">
      <Image
        src="/footer-bg.png"
        alt=""
        fill
        priority={false}
        className="-z-10 object-cover"
      />

      <Grid className="h-full gap-y-12">
        <div
          className={`${COLS.footerTagline} row-start-1 flex min-h-0 flex-col justify-end`}
        >
          <div className="flex items-baseline gap-4">
            <Image
              src="/logo-footer.svg"
              alt="Scena"
              width={220}
              height={122}
              className="h-[122px] w-auto"
            />
          </div>
        </div>

        <div
          className={`${COLS.footerCta} row-start-1 flex min-h-0 flex-col justify-between`}
        >
          <div className="flex flex-col gap-[95px]">
            <div>
              <h2 className="color-text-footer text-3xl font-normal leading-[50px] md:text-[42px]">
                {t("ctaTitle")}
              </h2>
              <a href="/contacto" className="mt-4 btn-footer">
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
              <button type="submit" className="mt-4 btn-footer">
                {t("send")}
              </button>
            </form>
          </div>

          <span className="color-text-footer font-serif text-[40px] italic leading-none md:text-[66px]">
            living
            <br />
            technology
          </span>
        </div>

        <div
          className={`${COLS.footerOffices} row-start-1 flex min-h-0 flex-col justify-between overflow-y-auto`}
        >
          <div className="flex flex-col gap-[35px]">
            {OFFICES.map((office) => (
              <div key={office.label}>
                <span className="btn-office">{office.label}</span>
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

          <div>
            <div className="paragraph-final-footer">
              <p>{t("followUs")}</p>
              <p>
                <a href="#">INSTAGRAM</a> | <a href="#">LINKEDIN</a>
              </p>
            </div>

            <div className="mt-4 paragraph-final-footer">
              <p>
                {t("privacyPolicy")} | {t("cookies")}
              </p>
              <p>{t("designBy")} Positive</p>
            </div>
          </div>
        </div>
      </Grid>
    </footer>
  );
}
