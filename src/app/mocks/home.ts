import { HomePageWp } from "../_interfaces/wordpress-components";

export const homeMock: HomePageWp = {
  hero_page: [
    {
      url: "/images/hero-1.png",
      type: "image",
    },
    {
      url: "/videos/intro-scena.mp4",
      type: "video",
    },
    {
      url: "/images/hero-3.png",
      type: "image",
    },
  ],

  intro_description: {
    description:
      "Design of intelligent and unique spaces. We transform\n sound, video, and lighting into memorable environments\n for your home or business.",
  },

  visit_us_description: {
    description:
      "Toca, siente, escucha, observa y deja que la magia de\n Scena inunde tus sentidos. Si quieres vivir lo que es una\n auténtica experiencia audiovisual, visita nuestro showroom\n de Palma de Mallorca.",
  },

  where_we_make_difference: {
    title: "Donde marcamos\nla diferencia",
    cards: [
      {
        number: "01",
        title: "Ingeniería propia",
        description:
          "Diseñamos e integramos cada sistema a medida del espacio.",
        icon: {
          url: "/icons/globe-network.svg",
          alt: "Ingeniería propia",
        },
      },
      {
        number: "02",
        title: "Instalación certificada",
        description:
          "Equipo técnico especializado en marcas premium de audio y video.",
        icon: {
          url: "/icons/signal-waves.svg",
          alt: "Instalación certificada",
        },
      },
      {
        number: "03",
        title: "Soporte continuo",
        description:
          "Mantenimiento y actualización de los sistemas post-entrega.",
        icon: {
          url: "/icons/team-circle.svg",
          alt: "Soporte continuo",
        },
      },
      {
        number: "04",
        title: "Diseño a medida",
        description:
          "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
        icon: {
          url: "/icons/orbit.svg",
          alt: "Diseño a medida",
        },
      },
      {
        number: "05",
        title: "Diseño a medida Nueva",
        description:
          "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
        icon: {
          url: "/icons/orbit.svg",
          alt: "Diseño a medida",
        },
      },
    ],
  },

  our_services: [
    {
      label: "Engineering",
      title:
        "La ingeniería es el punto de partida que asegura precisión, armonía y visión de conjunto.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: {
        url: "/images/service-engineering.jpg",
        alt: "Engineering",
      },
    },

    {
      label: "Audio & Video",
      title:
        "Tratamos el sonido y la imagen como lenguajes del lujo universal.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: {
        url: "/images/service-audio.jpg",
        alt: "Audio & Video",
      },
    },

    {
      label: "Home Automation",
      title: "La automatización se vuelve invisible cuando está bien diseñada.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: {
        url: "/images/service-engineering.jpg",
        alt: "Home Automation",
      },
    },

    {
      label: "Lighting Design",
      title: "La luz define el carácter y el ritmo de cada espacio.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: {
        url: "/images/service-engineering.jpg",
        alt: "Lighting Design",
      },
    },

    {
      label: "MEP",
      title:
        "Mechanical, Electrical & Plumbing: la base técnica que sostiene el diseño.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: {
        url: "/images/service-engineering.jpg",
        alt: "MEP",
      },
    },
  ],

  gallery: [
    {
      image: {
        url: "/images/gallery-1.png",
        alt: "Gallery image 1",
      },
      aspect: "portrait",
    },
    {
      image: {
        url: "/images/gallery-2.png",
        alt: "Gallery image 2",
      },
      aspect: "landscape",
    },
    {
      image: {
        url: "/images/gallery-3.jpg",
        alt: "Gallery image 3",
      },
      aspect: "square",
    },
    {
      image: {
        url: "/images/gallery-4.jpg",
        alt: "Gallery image 4",
      },
      aspect: "landscape",
    },
    {
      image: {
        url: "/images/gallery-5.jpg",
        alt: "Gallery image 5",
      },
      aspect: "portrait",
    },
  ],

  projects: [
    {
      project: "villa-calatrava",
      title: "Villa Calatrava",
      feature_image: {
        url: "/images/project-villa-calatrava.jpg",
        alt: "Villa Calatrava",
      },
      categories: [
        {
          id: 1,
          name: "Audio & Video",
          slug: "audio-video",
        },
        {
          id: 2,
          name: "Engineering",
          slug: "engineering",
        },
      ],
    },
    {
      project: "delphinus",
      title: "Delphinus",
      feature_image: {
        url: "/images/project-delphinus.jpg",
        alt: "Delphinus",
      },
      categories: [
        {
          id: 1,
          name: "Audio & Video",
          slug: "audio-video",
        },
        {
          id: 3,
          name: "Lighting Design",
          slug: "lighting-design",
        },
      ],
    },
    {
      project: "cygnus",
      title: "Cygnus",
      feature_image: {
        url: "/images/project-cygnus.jpg",
        alt: "Cygnus",
      },
      categories: [
        {
          id: 1,
          name: "Audio & Video",
          slug: "audio-video",
        },
        {
          id: 4,
          name: "Home Automation",
          slug: "home-automation",
        },
        {
          id: 3,
          name: "Lighting Design",
          slug: "lighting-design",
        },
      ],
    },
  ],
};
