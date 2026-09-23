"use client";

export const SERVICE_ORDER = [
  "engineering",
  "audioVideo",
  "lightingDesign",
  "homeAutomation",
  "mep",
] as const;

export type ServiceKey = (typeof SERVICE_ORDER)[number];

type PendingRequest = { key: ServiceKey; token: number } | null;

let pending: PendingRequest = null;
let tokenCounter = 0;
const listeners = new Set<() => void>();

/**
 * Guarda qué servicio se quiere destacar y notifica a los
 * suscriptores. Cada llamada genera un "token" nuevo, así que aunque
 * el valor de `key` sea el mismo que antes (ej. clickeás dos veces
 * "Engineering" seguidas), el efecto que escucha esto igual se
 * vuelve a disparar.
 */
export function setPendingService(key: ServiceKey) {
  tokenCounter += 1;
  pending = { key, token: tokenCounter };
  listeners.forEach((listener) => listener());
}

export function subscribePendingService(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPendingServiceSnapshot(): PendingRequest {
  return pending;
}

function getServerSnapshot(): PendingRequest {
  return null;
}

export { getServerSnapshot as getPendingServiceServerSnapshot };