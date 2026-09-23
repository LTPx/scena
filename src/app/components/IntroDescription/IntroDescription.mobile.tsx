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
  const html = description.replace(/\n/g, "<br />");

  return (
    <div data-header-theme="light" className="px-[15px] py-[100px]">
      <div
        className="
          font-sans font-normal not-italic
          text-[30px] leading-[100%] tracking-normal
          text-[#B4A78C]
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
