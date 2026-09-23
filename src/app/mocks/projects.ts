import { ProjectsPageWp } from "../_interfaces/wordpress-components";

export const projectsMock: ProjectsPageWp = {
  title: "Proyectos",
  filters: [
    { label: "All", slug: "all" },
    { label: "Engineering", slug: "engineering" },
    { label: "Audio & Video", slug: "audio-video" },
    { label: "Home Automation", slug: "home-automation" },
    { label: "Lighting Design", slug: "lighting-design" },
    { label: "MEP", slug: "mep" },
  ],
  projects: [
    {
      project: "1",
      slug: "villa-calatrava",
      title: "Villa Calatrava",
      feature_image: {
        url: "/images/hero-1.png",
        alt: "Villa Calatrava",
      } as any,
      categories: [
        { id: 1, name: "Audio & Video", slug: "audio-video" },
        { id: 2, name: "Engineering", slug: "engineering" },
      ],
    },
    {
      project: "2",
      slug: "casa-nocturna",
      title: "Casa Nocturna",
      feature_image: {
        url: "/images/hero-2.png",
        alt: "Casa Nocturna",
      } as any,
      categories: [
        { id: 3, name: "Lighting Design", slug: "lighting-design" },
        { id: 4, name: "Home Automation", slug: "home-automation" },
      ],
    },
    {
      project: "3",
      slug: "villa-calatrava",
      title: "Residencia MEP",
      feature_image: {
        url: "/images/hero-3.png",
        alt: "Residencia MEP",
      } as any,
      categories: [{ id: 5, name: "MEP", slug: "mep" }],
    },
    {
      project: "4",
      slug: "villa-calatrava",
      title: "Estudio Audio",
      feature_image: {
        url: "/images/gallery-1.png",
        alt: "Estudio Audio",
      } as any,
      categories: [
        { id: 1, name: "Audio & Video", slug: "audio-video" },
        { id: 3, name: "Lighting Design", slug: "lighting-design" },
      ],
    },
  ],
};