"use client";

import Grid, { COLS } from "./layout/Grid";

interface Props {
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

function IntroDescription({
  description,
  buttonLabel = "Ver Proyectos",
  buttonHref = "/proyectos",
}: Props) {
  const html = description.replace(/\n/g, "<br />");

  return (
    <Grid className="py-[200px]">
      <div
        className={`
          ${COLS.wideTextFull}
          font-gellix font-normal
          text-[40px] leading-[100%] tracking-normal
          text-[#B4A78C]
          [&>p]:inline
        `}
      >
        <span dangerouslySetInnerHTML={{ __html: html }} />

        <a
          href={buttonHref}
          className="
            ml-2 align-middle
            inline-flex items-center justify-center gap-[10px]
            w-fit h-[35px]
            rounded-full
            bg-white
            pt-[5px] pr-4 pb-[5px] pl-4
            font-gellix font-normal text-[14px] leading-[100%] tracking-normal
            text-[#A89572]
            transition-colors duration-200
            hover:bg-[#A89572] hover:text-white
          "
        >
          {buttonLabel}
        </a>
      </div>
    </Grid>
  );
}

export default IntroDescription;
