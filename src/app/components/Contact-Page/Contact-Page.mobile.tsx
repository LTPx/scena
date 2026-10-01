"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactPageWp } from "../../_interfaces/wordpress-components";
import GlassButton from "../GlassButton";

interface Props {
  data: ContactPageWp;
}

export default function ContactPageMobile({ data }: Props) {
  const t = useTranslations("Contact");
  const tf = useTranslations("Footer");

  return (
    <div className="relative isolate z-0 flex min-h-dvh flex-col overflow-hidden px-[15px] pb-[20px] pt-[30px] font-sans text-white">
      <Image
        src={data.background_image.url}
        alt={data.background_image.alt || ""}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <h2 className="color-text-footer w-[80%] font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%]">
        {t("ctaTitle")}
      </h2>
      <a href="/contact" className="btn-gellix mt-6 w-fit">
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
        <button type="submit" className="btn-gellix mt-[20px] cursor-pointer">
          {t("send")}
        </button>
      </form>

      <div
        className="
          -mx-[15px] mt-[50px] flex snap-x snap-mandatory gap-8 overflow-x-auto px-[15px]
          scroll-pl-[15px] [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {data.offices.map((office) => (
          <div key={office.label} className="w-[70%] flex-shrink-0 snap-start">
            <GlassButton as="span" variant="light">
              {office.label}
            </GlassButton>
            <p className="mt-[15px] font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#F6F5F1]">
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
        <div className="text-[#F6F5F1]">
          <p className="font-[Gellix] text-[14px] font-normal leading-[150%]">
            {t("followUs")}
          </p>
          <p className="font-[Gellix] text-[20px] font-normal leading-[120%]">
            <a href="#">{t("instagram")}</a> | <a href="#">{t("linkedin")}</a>
          </p>
        </div>

        <div className="paragraph-final-footer">
          <p>{tf("privacyPolicy")}</p>
          <p>{tf("cookies")}</p>
          <p className="mt-4">{tf("designBy")} Positive</p>
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
    </div>
  );
}
