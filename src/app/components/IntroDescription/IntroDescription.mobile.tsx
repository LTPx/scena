"use client";

interface Props {
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function IntroDescriptionMobile({
  description,
  buttonLabel = "Ver Proyectos",
  buttonHref = "/proyectos",
}: Props) {
  const html = description
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s*\n\s*/g, " ")
    .trim();

  return (
    <div data-header-theme="light" className="px-[15px] pt-[30px] pb-[10px]">
      <div
        className="
          font-sans font-normal not-italic
          text-[30px] leading-[100%] tracking-normal
          text-[#a89572]
          [&>p]:inline
        "
      >
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <a href={buttonHref} className="btn-gellix mt-6">
        {buttonLabel}
      </a>
    </div>
  );
}
