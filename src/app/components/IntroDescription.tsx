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
    <div data-header-theme="light">
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

          <a href={buttonHref} className="btn-gellix ml-2 align-middle">
            {buttonLabel}
          </a>
        </div>
      </Grid>
    </div>
  );
}

export default IntroDescription;
