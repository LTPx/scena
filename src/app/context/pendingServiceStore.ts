export const SERVICE_ORDER = [
  "engineering",
  "audioVideo",
  "lightingDesign",
  "homeAutomation",
  "mep",
] as const;

export type ServiceKey = (typeof SERVICE_ORDER)[number];

let pendingServiceKey: ServiceKey | null = null;

/**
 * Guarda qué servicio se quiere destacar la próxima vez que se monte
 * <OurServices />. Se llama desde el Header al clickear un item del
 * submenú "Servicios", justo antes de navegar al home.
 */
export function setPendingService(key: ServiceKey) {
  pendingServiceKey = key;
}

/**
 * Lee y limpia (una sola vez) el servicio pendiente. OurServices lo
 * llama cuando ya está listo para calcular y ejecutar el scroll.
 */
export function takePendingService(): ServiceKey | null {
  const key = pendingServiceKey;
  pendingServiceKey = null;
  return key;
}
