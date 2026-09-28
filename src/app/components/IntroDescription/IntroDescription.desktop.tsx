"use client";

import { Link } from "@/navigation";
import Grid, { COLS } from "../layout/Grid";

interface Props {
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function IntroDescriptionDesktop({
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
            headline-1
            text-[#A89572]
          `}
        >
          <span dangerouslySetInnerHTML={{ __html: html }} />

          <Link href={buttonHref} className="btn-gellix ml-2 align-middle">
            {buttonLabel}
          </Link>
        </div>
      </Grid>
    </div>
  );
}
