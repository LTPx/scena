import { ElementType, ComponentPropsWithoutRef, forwardRef, JSX } from "react";

export const GRID_COLS = "grid-cols-12";
export const GRID_GAP = "gap-x-6";
export const GRID_MARGIN = "px-10";
export const GRID_MARGIN_PX = 40;
export const GRID_GUTTER_PX = 24;
export const GRID_COLS_COUNT = 12;

export const COL_WIDTH_CALC = `((100vw - ${2 * GRID_MARGIN_PX}px - ${
  (GRID_COLS_COUNT - 1) * GRID_GUTTER_PX
}px) / ${GRID_COLS_COUNT})`;

export function colSpanWidth(span: number) {
  return `calc(${COL_WIDTH_CALC} * ${span} + ${(span - 1) * GRID_GUTTER_PX}px)`;
}

export function offsetForColumn(startCol: number) {
  const colsBefore = startCol - 1;
  if (colsBefore === 0) return `${GRID_MARGIN_PX}px`;
  return `calc(${GRID_MARGIN_PX}px + ${COL_WIDTH_CALC} * ${colsBefore} + ${
    colsBefore * GRID_GUTTER_PX
  }px)`;
}

type GridOwnProps<T extends ElementType> = {
  as?: T;
  fullHeight?: boolean;
};

type GridProps<T extends ElementType> = GridOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GridOwnProps<T>>;

const Grid = forwardRef<HTMLElement, GridProps<ElementType>>(
  ({ as, className = "", fullHeight = false, children, ...props }, ref) => {
    const Tag = as || "div";
    return (
      <Tag
        ref={ref}
        className={`grid ${GRID_COLS} ${GRID_GAP} ${GRID_MARGIN} ${
          fullHeight ? "h-screen" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </Tag>
    );
  },
) as <T extends ElementType = "div">(
  props: GridProps<T> & { ref?: React.Ref<Element> },
) => JSX.Element;

// @ts-expect-error — asignar displayName al componente polimórfico
Grid.displayName = "Grid";

export default Grid;

export const COLS = {
  logo: "col-start-1 col-span-2",
  list: "col-start-1 col-span-2",
  navMain: "col-start-3 col-span-2",
  navSub: "col-start-6 col-span-4",
  content: "col-start-3 col-span-4",
  titleCard: "col-start-3 col-span-8",
  wideText: "col-start-3 col-span-7",
  wideTextIntro: "col-start-3 col-end-13",
  wideTextFull: "col-start-3 col-end-13",
  newsList: "col-start-7 col-end-13",
  projectsTitle: "col-start-3 col-span-3",
  projectFilters: "col-start-6 col-end-13",
  newsItemGrid: "grid-cols-6 gap-x-6",
  newsNumber: "col-start-1 col-end-2 text-right",
  newsTitle: "col-start-2 col-end-6",
  media: "col-start-7 col-span-6",
  locale: "col-start-11 col-span-1",
  close: "col-start-12 col-span-1",
  pressCategory: "col-start-3 col-span-2",
  pressNumber: "col-start-5 col-span-1",
  pressTitle: "col-start-6 col-span-5",
  pressMedia: "col-start-3 col-span-10",
  pressContent: "col-start-6 col-span-5",
  footerTagline: "col-start-1 col-span-4",
  footerCta: "col-start-6 col-span-3",
  footerOffices: "col-start-10 col-span-2",
  projectMeta: "col-start-3 col-span-3",
  projectContent: "col-start-6 col-span-6",
  teamList: "col-start-8 col-end-13",
  aboutTitle: "col-start-3 col-end-11",
  aboutDescription: "col-start-3 col-end-8",
  aboutPartnersDescription: "col-start-3 col-end-11",
  outletLabel: "col-start-3 col-span-2",
  outletContent: "col-start-6 col-end-13",
  outletDetailTitle: "col-start-6 col-end-13",
  outletDetailImage: "col-start-1 col-end-6",
  outletDetailContent: "col-start-6 col-span-5",
  outletDetailNext: "col-start-12 col-span-1",
  heroTitle: "col-start-3 col-end-9",
  galleryTitle: "col-start-3 col-end-7",
} as const;

export function trackCardWidth(
  totalCols: number,
  cardCount: number,
  gapPx: number,
) {
  const totalWidth = `calc(${COL_WIDTH_CALC} * ${totalCols} + ${
    (totalCols - 1) * GRID_GUTTER_PX
  }px)`;
  return `calc((${totalWidth} - ${(cardCount - 1) * gapPx}px) / ${cardCount})`;
}

export const PROJECT_IMAGE_SPAN = {
  vertical: 5,
  horizontal: 10,
} as const;

export const PROJECT_IMAGE_ASPECT = {
  vertical: "673 / 1009",
  horizontal: "1369 / 913",
} as const;

export type ProjectImageOrientation = keyof typeof PROJECT_IMAGE_SPAN;

export function maxStartColFor(orientation: ProjectImageOrientation) {
  return GRID_COLS_COUNT - PROJECT_IMAGE_SPAN[orientation] + 1;
}

export function clampStartCol(
  startCol: number,
  orientation: ProjectImageOrientation,
) {
  const max = maxStartColFor(orientation);
  return Math.min(Math.max(Math.round(startCol) || 1, 1), max);
}
