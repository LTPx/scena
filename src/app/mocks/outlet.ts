import { OutletPageWp } from "../_interfaces/wordpress-components";

export const outletMock: OutletPageWp = {
  label: "Outlet",
  title:
    "Visita nuestro outlet de hi&fi, bang & olufsen y mobiliario. Diseño elegante y equipos de audio y Bang & Olufsen",
  description:
    "Nuestros mejores productos están expuestos en el outlet, son colecciones de temporada que retiramos para dar paso a las nuevas tendencias o avance de las siguientes colecciones. En general, es una gran oportunidad para adquirir todos estos muebles, auriculares, altavoces y complementos para tu hogar o despacho. En cada uno de los seis espacios de nuestra exposición encontrarás las piezas a las que les ofrecemos una segunda oportunidad: que te las lleves a casa.",
  categories: [
    { label: "Audio & Video", slug: "audio-video" },
    { label: "Lighting", slug: "lighting" },
    { label: "Furniture", slug: "furniture" },
  ],
  products: [
    {
      id: 1,
      slug: "beoplay-h100",
      name: "Beoplay Portal",
      category: "audio-video",
      original_price: "499€",
      outlet_price: "349€",
      image: { url: "/images/outlet-1.png", alt: "Beoplay Portal" },
      color_name: "Grey Mist",
      description:
        "Take your audio experience to the next level. The Beoplay Portal is much more than just a gaming headset; it's a luxurious piece of engineering designed to deliver flawless performance whether you're in the most intense gaming sessions, traveling, or at the office. Equipped with Dolby Atmos for Headphones technology, it offers 3D spatial audio that lets you pinpoint every footstep and gunshot with stunning clarity.",
      note: "*Iva, transporte e instalación incluido.",
      gallery: [
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist frontal",
        },
        {
          url: "/images/outlet-2.png",
          alt: "Beoplay Portal Grey Mist lateral",
        },
        {
          url: "/images/outlet-3.png",
          alt: "Beoplay Portal Grey Mist detalle almohadillas",
        },
        {
          url: "/images/outlet-4.png",
          alt: "Beoplay Portal Grey Mist logo B&O",
        },
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist estuche",
        },
      ],
    },
    {
      id: 2,
      slug: "beosound-a9",
      name: "Beosound A9",
      category: "audio-video",
      original_price: "3.499€",
      outlet_price: "2.399€",
      image: { url: "/images/outlet-2.png", alt: "Beosound A9" },
      color_name: "Natural Oak",
      description:
        "Beosound A9 is a powerful all-in-one speaker designed to be the centrepiece of your home. With 360-degree sound and a design that adapts to any room, it fills your space with rich, room-filling audio while doubling as a striking piece of furniture. Available with an optional wireless charging surface on top.",
      note: "*Iva, transporte e instalación incluido.",
      gallery: [
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist frontal",
        },
        {
          url: "/images/outlet-2.png",
          alt: "Beoplay Portal Grey Mist lateral",
        },
        {
          url: "/images/outlet-3.png",
          alt: "Beoplay Portal Grey Mist detalle almohadillas",
        },
        {
          url: "/images/outlet-4.png",
          alt: "Beoplay Portal Grey Mist logo B&O",
        },
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist estuche",
        },
      ],
    },
    {
      id: 3,
      slug: "beoplay-ex",
      name: "Beoplay EX",
      category: "audio-video",
      original_price: "329€",
      outlet_price: "219€",
      image: { url: "/images/outlet-3.png", alt: "Beoplay EX" },
      color_name: "Bronze Tone",
      description:
        "Beoplay EX are premium wireless earphones built for everyday use. With adaptive active noise cancellation, IP68 water and dust resistance, and up to 20 hours of battery life with the charging case, they're designed to keep up with your day without compromising on sound quality.",
      note: "*Iva y transporte incluido.",
      gallery: [
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist frontal",
        },
        {
          url: "/images/outlet-2.png",
          alt: "Beoplay Portal Grey Mist lateral",
        },
        {
          url: "/images/outlet-3.png",
          alt: "Beoplay Portal Grey Mist detalle almohadillas",
        },
        {
          url: "/images/outlet-4.png",
          alt: "Beoplay Portal Grey Mist logo B&O",
        },
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist estuche",
        },
      ],
    },
    {
      id: 4,
      slug: "lampara-pie",
      name: "Lámpara de pie Arc",
      category: "lighting",
      original_price: "890€",
      outlet_price: "590€",
      image: { url: "/images/outlet-4.png", alt: "Lámpara de pie Arc" },
      color_name: "Latón cepillado",
      description:
        "Diseño escultural que combina la calidez de la madera de roble con el acabado de latón cepillado. Su brazo articulado permite orientar la luz exactamente donde la necesitas, ideal como iluminación de lectura junto a un sofá o sillón de despacho.",
      note: "*Iva, transporte e instalación incluido.",
      gallery: [
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist frontal",
        },
        {
          url: "/images/outlet-2.png",
          alt: "Beoplay Portal Grey Mist lateral",
        },
        {
          url: "/images/outlet-3.png",
          alt: "Beoplay Portal Grey Mist detalle almohadillas",
        },
        {
          url: "/images/outlet-4.png",
          alt: "Beoplay Portal Grey Mist logo B&O",
        },
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist estuche",
        },
      ],
    },
    {
      id: 5,
      slug: "sofa-modular",
      name: "Sofá modular Dune",
      category: "furniture",
      original_price: "4.200€",
      outlet_price: "2.890€",
      image: { url: "/images/outlet-2.png", alt: "Sofá modular Dune" },
      color_name: "Boucle Arena",
      description:
        "Sistema modular que se adapta a cualquier configuración de salón. Tapizado en boucle color arena, con estructura interna de madera maciza y espuma de alta densidad que mantiene su forma con el paso del tiempo. Pieza única de outlet, unidad de exposición.",
      note: "*Iva, transporte e instalación incluido. Pieza de exposición, posibles marcas de uso.",
      gallery: [
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist frontal",
        },
        {
          url: "/images/outlet-2.png",
          alt: "Beoplay Portal Grey Mist lateral",
        },
        {
          url: "/images/outlet-3.png",
          alt: "Beoplay Portal Grey Mist detalle almohadillas",
        },
        {
          url: "/images/outlet-4.png",
          alt: "Beoplay Portal Grey Mist logo B&O",
        },
        {
          url: "/images/outlet-1.png",
          alt: "Beoplay Portal Grey Mist estuche",
        },
      ],
    },
  ],
};
