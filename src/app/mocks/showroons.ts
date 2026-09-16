import { ShowroomPageWp } from "../_interfaces/wordpress-components";

function mockImage(url: string, alt: string, width: number, height: number) {
  return {
    ID: 0,
    id: 0,
    title: alt,
    filename: url,
    filesize: 0,
    url,
    link: url,
    alt,
    author: "",
    description: "",
    caption: "",
    name: alt,
    status: "inherit",
    uploaded_to: 0,
    date: new Date(),
    modified: new Date(),
    menu_order: 0,
    mime_type: "image/jpeg",
    type: "image",
    subtype: "jpeg",
    icon: "",
    width,
    height,
    sizes: {
      thumbnail: url,
      "thumbnail-width": 150,
      "thumbnail-height": 150,
      medium: url,
      "medium-width": 300,
      "medium-height": 300,
      medium_large: url,
      "medium_large-width": 768,
      "medium_large-height": 768,
      large: url,
      "large-width": 1024,
      "large-height": 1024,
      "1536x1536": url,
      "1536x1536-width": 1536,
      "1536x1536-height": 1536,
      "2048x2048": url,
      "2048x2048-width": 2048,
      "2048x2048-height": 2048,
    },
  };
}

export const mockShowroomsPage: ShowroomPageWp = {
  title: "Visit our showrooms",
  locations: [
    {
      label: "Experience Center",
      contact:
        "Fray Luís de León, 9 - 07011 Palma<br />+34 871 571 460<br />scena@e-scena.com",
    },
    {
      label: "B&O Mallorca",
      contact:
        "Calle Catalunya, 3 - 07011 Palma<br />+34 971 666 833<br />bangolufsen@e-scena.com",
    },
  ],
  description:
    "Tu tienda Bang & Olufsen en<br />Palma de Mallorca.Sumérgete en<br />una experiencia única de sonido<br />e imagen premium.",
  gallery: [
    mockImage("/images/hero-1.png", "Showroom", 2400, 1350),

    mockImage("/images/hero-1.png", "Showroom detalle 1", 1200, 1600),

    mockImage("/images/hero-2.png", "Showroom detalle 2", 1400, 1300),

    mockImage("/images/hero-3.png", "Showroom detalle 3", 2800, 1200),

    mockImage("/images/gallery-1.png", "Showroom detalle 4", 1000, 1600),

    mockImage("/images/gallery-2.png", "Showroom detalle 5", 1920, 1280),
  ],
};
