"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import GlassButton from "../GlassButton";
import { OFFICES } from "./offices";

export default function FooterMobile() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative isolate flex min-h-[850px] flex-col overflow-hidden px-[15px] pb-[20px] pt-[30px] font-sans text-white">
      <Image
        src="/footer-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <h2 className="color-text-footer font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%]">
        {t("ctaTitle")}
      </h2>
      <a href="/contacto" className="btn-gellix mt-6 w-fit">
        {t("ctaButton")}
      </a>

      <form className="mt-[50px]" onSubmit={(e) => e.preventDefault()}>
        <p className="color-text-footer mb-3 font-[Gellix] text-[20px] font-normal not-italic leading-[100%] tracking-[0%]">
          {t("newsletterLabel")}
        </p>
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="w-full border-b border-white/60 bg-transparent pb-2 font-[Gellix] text-[12px] font-normal not-italic leading-[100%] tracking-[0%] placeholder-white/70 outline-none focus:border-white"
        />
        <button
          type="submit"
          className="btn-gellix mt-[20px] cursor-pointer text-btn-footer-mobile"
        >
          {t("send")}
        </button>
      </form>

      <div
        className="
          -mx-5 mt-[50px] flex snap-x snap-mandatory gap-8 overflow-x-auto px-5
          scroll-pl-5 [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {OFFICES.map((office) => (
          <div key={office.label} className="w-[70%] flex-shrink-0 snap-start">
            <GlassButton as="span" variant="light">
              {office.label}
            </GlassButton>
            <p className="paragraph-footer-mobile mt-[15px]">
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
        <div aria-hidden className="w-1 flex-shrink-0" />
      </div>

      <div className="mt-[50px] grid grid-cols-[1fr_35%] gap-4">
        <div className="paragraph-final-footer-mobile">
          <p>{t("followUs")}</p>
          <p className="text-[20px] leading-[27px]">
            <a href="#">Instagram</a> | <a href="#">Linkedin</a>
          </p>
        </div>

        <div className="paragraph-final-footer">
          <p>{t("privacyPolicy")}</p>
          <p>{t("cookies")}</p>
          <p className="mt-4">{t("designBy")} Positive</p>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-[1fr_35%] items-end gap-4 pt-16">
        <Image
          src="/logo-footer.svg"
          alt="Scena"
          width={220}
          height={122}
          className="h-[40px] w-auto"
        />
        <span className="color-text-footer font-quadrant text-[21.58px] font-normal not-italic leading-[100%] tracking-[0%]">
          living
          <br />
          technology
        </span>
      </div>
    </footer>
  );
}
