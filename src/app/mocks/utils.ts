import { ImageAcf } from "../_interfaces/wordpress-page";

/**
 * Helper para datos de mock: arma un objeto ImageAcf "mínimo" a partir
 * de solo url + alt, sin tener que completar a mano los ~20 campos
 * que devuelve un campo Image real de ACF (ID, filename, sizes, etc).
 *
 * Solo se usa en mocks/desarrollo — nunca en datos reales de WordPress,
 * que sí vienen con el shape completo desde la API.
 */
export function mockImage(url: string, alt: string): ImageAcf {
  return { url, alt } as unknown as ImageAcf;
}