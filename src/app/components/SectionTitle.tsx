"use client";

import Grid from "./layout/Grid";
import TypewriterText from "./TypewriterText";

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
        className={`${colsClassName} ${colorClassName} font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%]`}
      >
        <TypewriterText text={text} play={visible} />
      </h2>
    </Grid>
  );
}
