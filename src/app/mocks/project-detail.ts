import { ProjectDetailWp } from "../_interfaces/wordpress-components";

export const projectDetailMock: Record<string, ProjectDetailWp> = {
  "villa-calatrava": {
    slug: "villa-calatrava",
    title: "Villa Calatrava",
    categories: [
      { id: 1, name: "Audio & Video", slug: "audio-video" },
      { id: 2, name: "Engineering", slug: "engineering" },
    ],
    hero_image: {
      url: "/images/gallery-1.png",
      alt: "Sala de estar de Villa Calatrava",
    } as any,
    meta: [
      { label: "Diseño", value: "Arquitectos Vidal" },
      { label: "Promotor", value: "Swiss Project Group" },
      { label: "Ubicación", value: "Mallorca" },
    ],
    headline:
      "Innovación y elegancia en el corazón de Palma. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    content: [
      {
        type: "image",
        orientation: "horizontal",
        start_col: 1,
        image: {
          url: "/images/gallery-1.png",
          alt: "Sala principal con vigas de madera",
        } as any,
      },
      {
        type: "image",
        orientation: "vertical",
        start_col: 1,
        image: {
          url: "/images/gallery-2.png",
          alt: "Pasillo con ducha al fondo",
        } as any,
      },
      {
        type: "image",
        orientation: "horizontal",
        start_col: 1,
        image: {
          url: "/images/gallery-3.jpg",
          alt: "Comedor con vinoteca integrada",
        } as any,
      },
    ],
  },

  "casa-nocturna": {
    slug: "casa-nocturna",
    title: "Casa Nocturna",
    categories: [
      { id: 3, name: "Lighting Design", slug: "lighting-design" },
      { id: 4, name: "Home Automation", slug: "home-automation" },
    ],
    hero_image: {
      url: "/images/hero-2.png",
      alt: "Fachada de Casa Nocturna iluminada",
    } as any,
    meta: [
      { label: "Diseño", value: "Estudio Lumen" },
      { label: "Promotor", value: "Coastal Living Group" },
      { label: "Ubicación", value: "Ibiza" },
    ],
    headline:
      "Una atmósfera nocturna diseñada a medida. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content: [
      {
        type: "image",
        orientation: "vertical",
        start_col: 3,
        image: {
          url: "/images/hero-3.png",
          alt: "Terraza al atardecer",
        } as any,
      },
      {
        type: "image",
        orientation: "horizontal",
        start_col: 1,
        image: {
          url: "/images/service-audio.jpg",
          alt: "Detalle de iluminación exterior",
        } as any,
      },
    ],
  },
};

export function getProjectDetailBySlug(
  slug: string,
): ProjectDetailWp | undefined {
  return projectDetailMock[slug];
}
