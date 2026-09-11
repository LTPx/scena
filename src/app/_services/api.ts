const WP_URL = process.env.WORDPRESS_API_URL; // ej: https://cms.scena.com

if (!WP_URL) {
  throw new Error("Falta WORDPRESS_API_URL en tus variables de entorno");
}

/**
 * Trae una pagina de WordPress por slug, en el idioma indicado.
 * Ajusta el query param `lang` segun el plugin multi-idioma que uses
 * (Polylang usa `lang`, WPML puede variar segun tu config).
 */
export async function getPage(slug: string, locale: string) {
  const res = await fetch(
    `${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}`,
    { next: { revalidate: 60 } } // ISR: revalida cada 60s
  );

  if (!res.ok) {
    throw new Error(`Error al obtener la pagina "${slug}": ${res.status}`);
  }

  const data = await res.json();
  return data[0] ?? null;
}

export async function getProjects(locale: string) {
  const res = await fetch(
    `${WP_URL}/wp-json/wp/v2/proyectos?lang=${locale}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Error al obtener proyectos: ${res.status}`);
  }

  return res.json();
}
