import { AboutPageWp } from "../_interfaces/wordpress-components";
import { mockImage } from "./utils";

export const aboutMock: AboutPageWp = {
  title:
    "Con más de 10 años de experiencia en el sector de la ingeniería en Mallorca, en Scena hemos llevado el valor de la innovación y la mejora continua en nuestro ADN.",
  description:
    "Hemos pasado de ser un equipo pequeño a ser un conjunto multidisciplinar, cohesionado y altamente cualificado, con una gran vocación por la tecnología y la innovación. Estamos comprometidos con la pasión por lo que hacemos, la inquietud para innovar y el ánimo para seguir mejorando día a día. Hemos crecido junto a nuestros clientes, y hoy en día somos el referente nacional e internacional en el sector de la domótica en Palma.",
  gallery: [
    {
      image: mockImage("/images/gallery-1.png", "Oficina Scena"),
      aspect: "landscape",
    },
    {
      image: mockImage("/images/gallery-2.png", "Equipo Scena"),
      aspect: "portrait",
    },
    {
      image: mockImage("/images/gallery-3.jpg", "Proyecto Scena"),
      aspect: "square",
    },
  ],
  team_gallery: [
    {
      image: mockImage("/images/gallery-1.png", "Oficina Scena"),
      aspect: "landscape",
    },
    {
      image: mockImage("/images/gallery-2.png", "Equipo trabajando"),
      aspect: "landscape",
    },
    {
      image: mockImage("/images/gallery-3.jpg", "Espacio de trabajo"),
      aspect: "landscape",
    },
  ],
  team: {
    description:
      "La grandeza de nuestra empresa se basa en la calidad y el esfuerzo de nuestro equipo que está formado por:",
    positions: [
      { id: 1, title: "Engineering Director" },
      { id: 2, title: "Sales Director" },
      { id: 3, title: "Engineering Consultant Manager" },
      { id: 4, title: "Engineer" },
      { id: 5, title: "Business Developer" },
      { id: 6, title: "HR Manager" },
      { id: 7, title: "Engineering Consultant Engineer" },
      { id: 8, title: "Project Development" },
      { id: 9, title: "Project Manager" },
      { id: 10, title: "Purchasing Administrator" },
      { id: 11, title: "Pre-Sales Technician" },
      { id: 12, title: "Plumber & Refrigeration Technician" },
      { id: 13, title: "Electrician" },
      { id: 14, title: "Plumber" },
      { id: 15, title: "Bang & Olufsen Store Manager" },
      { id: 16, title: "Pre-Sales technician" },
      { id: 17, title: "Specialized technician" },
      { id: 18, title: "B&O Specialist" },
      { id: 19, title: "Lighting designer" },
      { id: 20, title: "Specialized technician" },
      { id: 21, title: "Sales" },
      { id: 22, title: "Managing Director" },
    ],
    cta_title:
      "¿Te apasiona la tecnología y su integración en la arquitectura?",
    cta_label: "Únete a nuestro equipo",
  },
  differentiators: {
    title: "Donde marcamos\nla diferencia",
    cards: [
      {
        title: "Líneas\nde negocio",
        description:
          "Ingeniería, Iluminación, Domótica, Audio & Video y MEP son nuestras cinco áreas, integradas en un servicio All-In-One con un único punto de contacto para diseñar, gestionar y ejecutar cada proyecto.",
        icon: mockImage(
          "/images/icons/lineas-negocio.svg",
          "Líneas de negocio",
        ),
      },
      {
        title: "Equipo y\nespecialización",
        description:
          "Creemos que los equipos más eficientes son aquellos donde cada miembro tiene una función específica. Un especialista por área forma un grupo cohesionado capaz de responder a cualquier proyecto.",
        icon: mockImage("/images/icons/equipo.svg", "Equipo y especialización"),
      },
      {
        title: "Última\ntecnología",
        description:
          "Guiados por la tecnología y sus aplicaciones. Nuestros proyectos se basan en seleccionar e implementar soluciones tecnológicas para responder creativamente a las necesidades de nuestros clientes.",
        icon: mockImage("/images/icons/tecnologia.svg", "Última tecnología"),
      },
      {
        title: "Orientación\nal proyecto",
        description:
          "Uniendo máxima funcionalidad y lujo en cada experiencia que creamos para nuestros clientes.",
        icon: mockImage(
          "/images/icons/proyecto.svg",
          "Orientación al proyecto",
        ),
      },
    ],
  },
  partners: {
    description:
      "En escena trabajamos con arquitectos y promotores con los que compartimos una misma visión, creando juntos proyectos cuidados y de alta calidad.",
    partners: [
      {
        id: 1,
        name: "Partner 1",
        logo: mockImage("/images/partners/partner-1.svg", "Partner 1"),
      },
      {
        id: 2,
        name: "Partner 2",
        logo: mockImage("/images/partners/partner-2.svg", "Partner 2"),
      },
      {
        id: 3,
        name: "Partner 3",
        logo: mockImage("/images/partners/partner-3.svg", "Partner 3"),
      },
      {
        id: 4,
        name: "Partner 4",
        logo: mockImage("/images/partners/partner-4.svg", "Partner 4"),
      },
      {
        id: 5,
        name: "Partner 5",
        logo: mockImage("/images/partners/partner-5.svg", "Partner 5"),
      },
      {
        id: 6,
        name: "Partner 6",
        logo: mockImage("/images/partners/partner-6.svg", "Partner 6"),
      },
      {
        id: 7,
        name: "Partner 7",
        logo: mockImage("/images/partners/partner-7.svg", "Partner 7"),
      },
    ],
  },
};
