"use client";

import Grid from "./layout/Grid";

interface SectionTitleProps {
  text: string;

  visible: boolean;

  colsClassName: string;

  colorClassName?: string;
}

export default function SectionTitle({
  text,
  visible,
  colsClassName,
  colorClassName = "text-[#F6F5F1]",
}: SectionTitleProps) {
  return (
    <Grid className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-[40px]">
      <h2
        style={{ visibility: visible ? "visible" : "hidden" }}
        className={`${colsClassName} ${colorClassName} font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%]`}
      >
        {text}
      </h2>
    </Grid>
  );
}
