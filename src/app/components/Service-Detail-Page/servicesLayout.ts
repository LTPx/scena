import { GRID_GUTTER_PX } from "../layout/Grid";

export const PARAGRAPH_TOP = "46vh";
export const GRID_PADDING_TOP = "27px";
export const NAV_OFFSET_UP = "40px";
export const ALIGN_TOP = `calc(${PARAGRAPH_TOP} - ${GRID_PADDING_TOP} - ${NAV_OFFSET_UP})`;
export const TEXT_IMAGE_GAP_PX = 75;
export const TEXT_PAD_RIGHT = `${TEXT_IMAGE_GAP_PX - GRID_GUTTER_PX}px`;

const SERVICE_RANK: Record<string, number> = {
  ingenieria: 0,
  engineering: 0,
  ingenieurwesen: 0,

  "audio-video": 1,

  domotica: 2,
  "home-automation": 2,
  hausautomation: 2,

  "diseno-iluminacion": 3,
  "lighting-design": 3,
  lichtdesign: 3,

  mep: 4,
};

export function sortServices<T>(
  items: T[],
  getSlug: (item: T) => string | undefined,
): T[] {
  const rank = (item: T) => SERVICE_RANK[getSlug(item) ?? ""] ?? 99;
  return [...items].sort((a, b) => rank(a) - rank(b));
}
