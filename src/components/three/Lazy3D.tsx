import { ComponentType, lazy, ReactNode, Suspense, useEffect, useRef, useState } from 'react';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Charge un composant 3D (three.js) seulement quand il approche de l'écran.
 * Sans WebGL, affiche le repli.
 */
export function useLazy3D<P extends object>(loader: () => Promise<{ default: ComponentType<P> }>) {
  const [Comp] = useState(() => lazy(loader));
  return Comp;
}

export function Near({ children, fallback, margin = '600px' }: { children: ReactNode; fallback?: ReactNode; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [gl] = useState(hasWebGL);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [margin]);
  return (
    <div ref={ref} className="absolute inset-0">
      {near && gl ? <Suspense fallback={fallback ?? null}>{children}</Suspense> : fallback ?? null}
    </div>
  );
}
