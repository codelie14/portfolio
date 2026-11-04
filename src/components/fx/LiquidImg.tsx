import { ImgHTMLAttributes, useEffect, useId, useRef } from 'react';

/**
 * Image qui ondule comme un liquide quand le curseur la traverse
 * (filtre SVG turbulence + déplacement, piloté par la vitesse du pointeur).
 */
export default function LiquidImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const id = useId().replace(/:/g, '');
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = img.current?.parentElement;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    let scale = 0, target = 0, lx = 0, ly = 0, raf = 0, t = 0;
    const tick = () => {
      t += 0.01;
      scale += (target - scale) * 0.12;
      target *= 0.92;
      disp.current?.setAttribute('scale', scale.toFixed(1));
      turb.current?.setAttribute('baseFrequency', `${0.008 + Math.sin(t) * 0.002} ${0.012 + Math.cos(t) * 0.002}`);
      if (img.current) img.current.style.filter = scale > 0.5 ? `url(#liq-${id})` : 'none';
      if (scale > 0.3 || target > 0.3) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const move = (e: PointerEvent) => {
      const v = Math.hypot(e.clientX - lx, e.clientY - ly);
      lx = e.clientX;
      ly = e.clientY;
      target = Math.min(70, target + v * 0.9);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [id]);

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id={`liq-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <img ref={img} {...props} />
    </>
  );
}
