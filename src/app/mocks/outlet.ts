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
      name: "Nombre del producto",
      category: "audio-video",
      original_price: "XXXX€",
      outlet_price: "XXXX€",
      image: { url: "/images/outlet/beoplay-h100.png", alt: "Beoplay H100" },
    },
    {
      id: 2,
      slug: "beosound-a9",
      name: "Nombre del producto",
      category: "audio-video",
      original_price: "XXXX€",
      outlet_price: "XXXX€",
      image: { url: "/images/outlet/beosound-a9.png", alt: "Beosound A9" },
    },
    {
      id: 3,
      slug: "beoplay-ex",
      name: "Nombre del producto",
      category: "audio-video",
      original_price: "XXXX€",
      outlet_price: "XXXX€",
      image: { url: "/images/outlet/beoplay-ex.png", alt: "Beoplay EX" },
    },
    {
      id: 4,
      slug: "lampara-pie",
      name: "Nombre del producto",
      category: "lighting",
      original_price: "XXXX€",
      outlet_price: "XXXX€",
      image: { url: "/images/outlet/lampara-pie.png", alt: "Lámpara de pie" },
    },
    {
      id: 5,
      slug: "sofa-modular",
      name: "Nombre del producto",
      category: "furniture",
      original_price: "XXXX€",
      outlet_price: "XXXX€",
      image: { url: "/images/outlet/sofa-modular.png", alt: "Sofá modular" },
    },
  ],
};