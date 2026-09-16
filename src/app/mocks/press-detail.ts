import { NewsDetailWp } from "../_interfaces/wordpress-components";

export const pressDetailMock: Record<string, NewsDetailWp> = {
  "art-of-sound-1": {
    id: 1,
    slug: "art-of-sound-1",
    category: "Noticias",
    number: "01",
    title:
      'Scena crea una atmósfera sonora única en "The Art of Sound" de la mano de Bang & Olufsen',
    hero_image: {
      url: "/images/gallery-1.png",
      alt: "Reflejo de un móvil fotografiando un altavoz Beolab",
    },
    content: [
      {
        type: "paragraph",
        text: "El pasado viernes Scena tuvo el privilegio de dar forma a una experiencia única: The Art of Sound. Una velada donde el sonido se convirtió en lenguaje y el arte, en atmósfera. La colaboración con Bang & Olufsen, Gallery Red, La Vinoteca y Private Dining Mallorca hizo posible un encuentro donde cada elemento —la obra visual, la alta gastronomía, el champagne y el diseño sonoro— dialogaba para crear una experiencia sensorial completa.",
      },
      {
        type: "paragraph",
        text: "La propuesta se articuló en tres estaciones cuidadosamente coreografiadas, donde el visitante no solo contemplaba, sino que recorría un trayecto emocional a través del arte, el gusto y el oído.",
      },
      {
        type: "paragraph",
        text: "En la primera estación, las esculturas luminosas de Max Patté vibraban en sintonía con la elegancia acústica de los altavoces Beolab 28. El ambiente se completaba con un Delamotte Brut Rosé y un delicado bocado de aguacate, gamba, clementina y caviar.",
      },
      {
        type: "paragraph",
        text: "La segunda estación nos llevó a la precisión sonora de Iván Montaña, con un maridaje de Jacques Lassaigne Blanc de Blancs. Finalmente, las icónicas piezas de Basquiat se alzaban como grito contemporáneo, mientras los Beolab 90 proyectaban su potencia escultural.",
      },
      {
        type: "image",
        image: {
          url: "/images/gallery-2.png",
          alt: "Obra de Basquiat junto a altavoces Beolab de forma geométrica",
        },
      },
      {
        type: "paragraph",
        text: "Cada estación fue una muestra de cómo el sonido, cuando se cuida al detalle, puede trascender su función técnica y convertirse en emoción. En Scena creemos que no se trata solo de escuchar, sino de sentir.",
      },
      {
        type: "quote",
        text: "The Art of Sound no fue un evento.\nFue una composición.\nY el sonido, su hilo invisible.",
      },
      {
        type: "video",
        video: {
          url: "/videos/intro-scena.mp4",
          poster: {
            url: "/images/gallery-3.jpg",
            alt: "Fachada de Gallery Red con el logotipo Scena en el escaparate",
          },
        },
      },
    ],
  },
};

export function getPressDetailBySlug(slug: string): NewsDetailWp | undefined {
  return pressDetailMock[slug];
}