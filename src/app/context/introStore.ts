import { useSyncExternalStore } from "react";

let introPlaying = false;
const listeners = new Set<() => void>();

export function setIntroPlaying(value: boolean) {
  if (introPlaying === value) return;
  introPlaying = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useIntroPlaying() {
  return useSyncExternalStore(
    subscribe,
    () => introPlaying,
    () => false,
  );
}

export const INTRO_REVEAL_TRANSITION = {
  duration: 2.2,
  ease: [0.22, 1, 0.36, 1] as const,
};
