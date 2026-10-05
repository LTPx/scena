"use client";

import { Link } from "@/navigation";
import Grid, { COLS, GRID_COLS_COUNT } from "../layout/Grid";

const START_COL = 3;

interface Props {
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  textEndCol?: number;
}

export default function IntroDescriptionDesktop({
  description,
  buttonLabel = "Ver Proyectos",
  buttonHref = "/proyectos",
  textEndCol,
}: Props) {
  const html = description.replace(/\n/g, "<br />");

  const endCol =
    textEndCol === undefined
      ? undefined
      : Math.min(Math.max(Math.round(textEndCol), START_COL), GRID_COLS_COUNT);

  return (
    <div data-header-theme="light">
      <Grid className="py-[250px]">
        <div
          className={`
            ${COLS.wideTextIntro}
            headline-1
            text-[#A89572]
          `}
          style={
            endCol ? { gridColumn: `${START_COL} / ${endCol + 1}` } : undefined
          }
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
