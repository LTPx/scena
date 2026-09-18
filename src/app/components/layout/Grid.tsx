/**
 * Grid de 12 columnas del sistema de diseño (Figma):
 * margen 40px, gutter 24px, 12 columnas.
 *
 * Usar SIEMPRE este componente para posicionar contenido en el layout
 * en vez de reimplementar "grid grid-cols-12 gap-x-6 px-10" a mano en
 * cada componente — así el margen/gutter queda en un solo lugar.
 */
import { ElementType, ComponentPropsWithoutRef, forwardRef, JSX } from "react";

// Clases reutilizables por si algún componente necesita anidar
// otro nivel de grid dentro de una celda (ver ejemplo en OurServices).
export const GRID_COLS = "grid-cols-12";
export const GRID_GAP = "gap-x-6"; // 24px = gutter
export const GRID_MARGIN = "px-10"; // 40px = margen

// Valores numéricos (mismos que arriba, pero como números) para poder
// calcular anchos de elementos que viven FUERA del grid CSS nativo,
// como un track de scroll horizontal con overflow (ver
// WhereWeMakeDifference).
export const GRID_MARGIN_PX = 40;
export const GRID_GUTTER_PX = 24;
export const GRID_COLS_COUNT = 12;

/** Ancho de UNA columna del grid, como expresión CSS calc() reutilizable. */
export const COL_WIDTH_CALC = `((100vw - ${2 * GRID_MARGIN_PX}px - ${
  (GRID_COLS_COUNT - 1) * GRID_GUTTER_PX
}px) / ${GRID_COLS_COUNT})`;

/**
 * Ancho de un bloque que ocupa `span` columnas consecutivas (incluye
 * los gutters internos entre esas columnas). Úsalo para elementos que
 * necesitan un ancho explícito en px/vw fuera de un grid nativo
 * (p.ej. cards en un carrusel de scroll horizontal).
 */
export function colSpanWidth(span: number) {
  return `calc(${COL_WIDTH_CALC} * ${span} + ${(span - 1) * GRID_GUTTER_PX}px)`;
}

/**
 * Distancia desde el borde izquierdo de la pantalla hasta el INICIO
 * de `startCol` (1-indexed). offsetForColumn(3) = distancia hasta el
 * borde izquierdo de la columna 3, o sea, margen + columnas 1-2 + sus
 * gutters. Úsalo como padding-left de un contenedor con overflow para
 * que su primer hijo arranque exactamente en esa columna.
 */
export function offsetForColumn(startCol: number) {
  const colsBefore = startCol - 1;
  if (colsBefore === 0) return `${GRID_MARGIN_PX}px`;
  return `calc(${GRID_MARGIN_PX}px + ${COL_WIDTH_CALC} * ${colsBefore} + ${
    colsBefore * GRID_GUTTER_PX
  }px)`;
}

type GridOwnProps<T extends ElementType> = {
  /** Elemento HTML a renderizar (div, section, header...). Default: "div" */
  as?: T;
  /** Si el grid debe ocupar el alto del padre (útil en secciones sticky/full-screen) */
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

/**
 * Columnas reutilizadas por más de un componente (mantener acá para que
 * Header, OurServices, PressPage y PressDetailPage no diverjan del
 * mismo valor).
 */
export const COLS = {
  logo: "col-start-1 col-span-2",
  // Lista corta en la columna 1 (p.ej. lista de servicios en OurServices)
  list: "col-start-1 col-span-2",
  // Menú principal del Header, arranca en columna 3, ocupa cols 3-4
  navMain: "col-start-3 col-span-2",
  // Submenú del Header (Engineering, Audio & Video...) — arranca donde
  // termina navMain (línea 5) para quedar CONTIGUO al lado, no debajo.
  navSub: "col-start-6 col-span-4",
  // Bloque de "contenido angosto" (título/texto), col 3 a 6, usado en:
  // Header (submenu, versión anterior), OurServices (heading + content),
  // PressDetailPage (CONTENT_COLS)
  content: "col-start-3 col-span-4",
  // Texto corrido más ancho (p.ej. IntroDescription), col 3 a 9 — AJUSTAR
  // el span si en Figma el bloque termina en otra columna.
  wideText: "col-start-3 col-span-7",
  // Igual que wideText pero SIN ancho fijo: llega hasta el borde derecho
  // del grid (col 12). Úsalo cuando el texto trae sus propios saltos de
  // línea (del editor de WP) y no quieres que el grid le imponga un
  // ancho que reflowee el texto de forma distinta a como lo escribieron.
  wideTextFull: "col-start-3 col-end-13",
  // Lista/columna derecha, arranca donde termina "content" (col 6, línea 7)
  // y llega hasta el borde derecho del grid (col 12). Usado en PressPage.
  newsList: "col-start-7 col-end-13",
  projectsTitle: "col-start-3 col-span-3",
  projectFilters: "col-start-6 col-end-13",
  // Sub-grid DENTRO de newsList (6 columnas reales: 7 a 12, mismo gutter):
  // al ser una subdivisión de un tramo de columnas iguales del grid exterior
  // con la misma cantidad de columnas y el mismo gap, cada sub-columna mide
  // EXACTO lo mismo que su columna real correspondiente (sub-col 1 =
  // columna real 7, sub-col 2 = columna real 8, ... sub-col 6 = columna 12).
  newsItemGrid: "grid-cols-6 gap-x-6",
  // Número: sub-col 1 (= columna real 7), alineado a la derecha
  // para que termine justo en el borde de la columna 7.
  newsNumber: "col-start-1 col-end-2 text-right",
  // Título: sub-col 2 a 5 (= columnas reales 8-11). La sub-col 6
  // (columna real 12) queda sin usar, como espacio en blanco.
  newsTitle: "col-start-2 col-end-6",
  // Bloque "full-bleed" (media grande), col 7 a 12
  media: "col-start-7 col-span-6",
  locale: "col-start-11 col-span-1",
  close: "col-start-12 col-span-1",

  // --- PressDetailPage ---
  // "Noticias" / categoría — col 3 a 4
  pressCategory: "col-start-3 col-span-2",
  // Número (ej. "01") — col 5
  pressNumber: "col-start-5 col-span-1",
  // Título del detalle — col 6 a 10
  pressTitle: "col-start-6 col-span-5",
  // Bloque "full-bleed" (hero image, video) — col 3 a 12
  pressMedia: "col-start-3 col-span-10",
  // Bloque de contenido angosto (párrafo, imagen chica, quote) — col 6 a 10
  pressContent: "col-start-6 col-span-5",
  // --- ContactPage / Footer ---
  // "living technology" — bottom-left, col 1 a 4
  footerTagline: "col-start-1 col-span-4",
  // CTA + newsletter — col 6 a 8
  footerCta: "col-start-6 col-span-3",
  // Lista de oficinas — col 10 a 11
  footerOffices: "col-start-10 col-span-2",
  projectMeta: "col-start-3 col-span-2",
  // Headline + descripción del proyecto — col 6 a 11
  projectContent: "col-start-6 col-span-6",
  teamList: "col-start-8 col-end-13",
  aboutTitle: "col-start-3 col-end-11",
  // AboutPage: descripción intro debajo del título, col 3 a 8
  aboutDescription: "col-start-3 col-end-8",
  // AboutPage: descripción del tab Partners, col 3 a 11
  aboutPartnersDescription: "col-start-3 col-end-11",
  // OutletPage: label "Outlet", col 3-4 (mismo criterio que pressCategory)
  outletLabel: "col-start-3 col-span-2",
  // OutletPage: heading + descripción + filtros, col 6 hasta el borde
  // derecho del grid (col-end 13)
  outletContent: "col-start-6 col-end-13",
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

export const PROJECT_IMAGE_HEIGHT = {
  vertical: 1000,
  horizontal: 913,
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
