import { HomePageWp } from "../_interfaces/wordpress-components";
import { mockImage } from "./utils";

export const homeMock: HomePageWp = {
  hero_page: [
    {
      url: "/images/hero-1.png",
      type: "image",
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
        icon: mockImage("/images/w-1.png", "Ingeniería propia"),
      },
      {
        number: "02",
        title: "Instalación certificada",
        description:
          "Equipo técnico especializado en marcas premium de audio y video.",
        icon: mockImage("/images/w-2.png", "Instalación certificada"),
      },
      {
        number: "03",
        title: "Soporte continuo",
        description:
          "Mantenimiento y actualización de los sistemas post-entrega.",
        icon: mockImage("/images/w-3.png", "Soporte continuo"),
      },
      {
        number: "04",
        title: "Diseño a medida",
        description:
          "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
        icon: mockImage("/images/w-1.png", "Diseño a medida"),
      },
      {
        number: "05",
        title: "Diseño a medida Nueva",
        description:
          "Cada proyecto responde a la arquitectura y estilo de vida del cliente.",
        icon: mockImage("/images/w-2.png", "Diseño a medida"),
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
      expanded_content: `
        <h4>Roadmap de Ingeniería</h4>
        <ul>
          <li>Conceptualización y definición de necesidades.</li>
          <li>Desarrollo técnico, planos y documentación de proyecto.</li>
          <li>Revisión y validación junto a cliente y equipo de arquitectura.</li>
          <li>Coordinación técnica con contratistas.</li>
          <li>Dirección de obra de las instalaciones y control de ejecución.</li>
          <li>Gestión de documentación, cumplimiento normativo y legalización.</li>
          <li>Puesta en marcha: pruebas, formación y entrega final.</li>
        </ul>
        <h4>Diferenciales scena en ingeniería</h4>
        <ul>
          <li>Visión integral y centralizada del proyecto.</li>
          <li>Experiencia real en obra como integradores e instaladores.</li>
          <li>Definición técnica basada en soluciones viables, no teóricas.</li>
          <li>Arquitectura e interiorismo traducidos a lenguaje técnico.</li>
        </ul>
      `,
      image: mockImage("/images/service-engineering.jpg", "Engineering"),
    },

    {
      label: "Audio & Video",
      title:
        "Tratamos el sonido y la imagen como lenguajes del lujo universal.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      expanded_content: `
        <h4>Roadmap de Audio & Video</h4>
        <ul>
          <li>Cines dedicados y salas de juego que transforman cualquier espacio en una experiencia inmersiva.</li>
          <li>Sistemas multiroom de alta calidad, de uso sencillo e intuitivo, diseñados para durar.</li>
          <li>Diseño acústico a medida según el volumen y los materiales del espacio.</li>
          <li>Integración de video, streaming y contenido bajo un único control.</li>
        </ul>
        <h4>Diferenciales scena en Audio & Video</h4>
        <ul>
          <li>Distribuidor exclusivo de Bang & Olufsen en Baleares, referente en excelencia acústica y diseño.</li>
          <li>Calibración profesional de cada sistema tras la instalación.</li>
          <li>Soporte técnico continuo y actualización de firmware/equipos.</li>
        </ul>
      `,
      image: mockImage("/images/service-audio.jpg", "Audio & Video"),
    },

    {
      label: "Home Automation",
      title: "La automatización se vuelve invisible cuando está bien diseñada.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      expanded_content: `
        <h4>Roadmap de Home Automation</h4>
        <ul>
          <li>Diseño de la experiencia de control: escenas, rutinas y automatizaciones.</li>
          <li>Integración de climatización, persianas, seguridad e iluminación en un solo sistema.</li>
          <li>Programación e instalación de paneles de control y sensores.</li>
          <li>Pruebas de usuario y ajuste fino de las automatizaciones.</li>
        </ul>
        <h4>Diferenciales scena en Home Automation</h4>
        <ul>
          <li>Sistemas donde todos los elementos de la vivienda funcionan como un conjunto, fluyendo en un todo coherente y sencillo.</li>
          <li>Interfaces intuitivas pensadas para todos los miembros del hogar.</li>
          <li>Compatibilidad y escalabilidad con nuevos dispositivos a futuro.</li>
        </ul>
      `,
      image: mockImage("/images/service-engineering.jpg", "Home Automation"),
    },

    {
      label: "Lighting Design",
      title: "La luz define el carácter y el ritmo de cada espacio.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      expanded_content: `
        <h4>Roadmap de Lighting Design</h4>
        <ul>
          <li>Análisis lumínico del espacio y sus usos a lo largo del día.</li>
          <li>Diseño de escenas de luz según ambiente y momento.</li>
          <li>Selección de luminarias y temperatura de color a medida.</li>
          <li>Instalación, programación y control centralizado.</li>
        </ul>
        <h4>Diferenciales scena en Lighting Design</h4>
        <ul>
          <li>Iluminación tratada como parte del diseño arquitectónico, no como un añadido.</li>
          <li>Control unificado junto a audio, video y domótica.</li>
          <li>Eficiencia energética sin renunciar a la estética.</li>
        </ul>
      `,
      image: mockImage("/images/service-engineering.jpg", "Lighting Design"),
    },

    {
      label: "MEP",
      title:
        "Mechanical, Electrical & Plumbing: la base técnica que sostiene el diseño.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      expanded_content: `
        <h4>Roadmap de MEP</h4>
        <ul>
          <li>Diseño de instalaciones mecánicas, eléctricas y de fontanería.</li>
          <li>Coordinación con arquitectura e interiorismo desde etapas tempranas.</li>
          <li>Cálculo de cargas, dimensionado y planos técnicos.</li>
          <li>Supervisión de obra y cumplimiento normativo.</li>
        </ul>
        <h4>Diferenciales scena en MEP</h4>
        <ul>
          <li>Ingeniería propia que anticipa conflictos entre sistemas antes de obra.</li>
          <li>Integración directa con los sistemas de audio, video y domótica.</li>
          <li>Documentación técnica clara para instaladores y mantenimiento futuro.</li>
        </ul>
      `,
      image: mockImage("/images/service-engineering.jpg", "MEP"),
    },
  ],

  gallery: [
    {
      image: mockImage("/images/gallery-1.png", "Gallery image 1"),
      aspect: "portrait",
    },
    {
      image: mockImage("/images/gallery-2.png", "Gallery image 2"),
      aspect: "landscape",
    },
    {
      image: mockImage("/images/gallery-3.jpg", "Gallery image 3"),
      aspect: "square",
    },
    {
      image: mockImage("/images/gallery-1.png", "Gallery image 4"),
      aspect: "landscape",
    },
    {
      image: mockImage("/images/gallery-2.png", "Gallery image 5"),
      aspect: "portrait",
    },
  ],

  projects: [
    {
      project: "villa-calatrava",
      slug: "villa-calatrava",
      title: "Villa Calatrava",
      feature_image: mockImage("/images/hero-1.png", "Villa Calatrava"),
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
      slug: "villa-calatrava",
      title: "Delphinus",
      feature_image: mockImage("/images/hero-1.png", "Delphinus"),
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
      slug: "villa-calatrava", // <- agregar
      feature_image: mockImage("/images/hero-1.png", "Cygnus"),
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
