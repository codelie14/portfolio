import { useEffect, useState } from 'react';

let booted = false;
const listeners = new Set<() => void>();

export function markBooted() {
  booted = true;
  listeners.forEach((l) => l());
}

/** Vrai une fois l'écran de démarrage terminé : les intros attendent ce signal. */
export function useBooted() {
  const [b, setB] = useState(booted);
  useEffect(() => {
    if (booted) return setB(true);
    const l = () => setB(true);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return b;
}
